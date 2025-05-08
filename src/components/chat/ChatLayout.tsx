
import { useState, useEffect, useRef } from "react";
import { UserItem } from "./UserItem";
import { MessageInput } from "./MessageInput";
import { MessageGroup } from "./MessageItem";
import { Search, Bell, UserIcon, Lock, LockOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserProfile } from "./UserProfile";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";

import {
  Conversation,
  Message,
  MessageStatus,
  User,
  UserRole,
  ConversationStatus,
} from "@/lib/types";
import {
  getCurrentUser,
  getUserById,
  getUserConversations,
  getMessagesByConversationId,
  getTeachersAndSupervisors,
  getStudents,
  getUserInitials,
  getLastMessage,
  getUnreadCount,
  isTeacherOrSupervisor,
  formatTime,
} from "@/lib/data";

export function ChatLayout() {
  const currentUser = getCurrentUser();
  const isCurrentUserStaff = isTeacherOrSupervisor(currentUser);
  const isSupervisor = currentUser.role === UserRole.SUPERVISOR;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeTab, setActiveTab] = useState<string>("chats");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // تحميل المحادثات عند تحميل الصفحة
  useEffect(() => {
    const userConversations = getUserConversations(currentUser.id);
    setConversations(userConversations);
    
    // اختيار المحادثة الأولى تلقائياً
    if (userConversations.length > 0) {
      const firstConversation = userConversations[0];
      const otherParticipant = firstConversation.participantIds.find(id => id !== currentUser.id);
      if (otherParticipant) {
        setSelectedUserId(otherParticipant);
        setSelectedConversation(firstConversation);
      }
    }
  }, [currentUser.id]);
  
  // تحميل رسائل المحادثة المحددة
  useEffect(() => {
    if (selectedUserId) {
      const conversation = conversations.find(c => 
        c.participantIds.includes(currentUser.id) && 
        c.participantIds.includes(selectedUserId)
      );
      
      if (conversation) {
        const conversationMessages = getMessagesByConversationId(conversation.id);
        setMessages(conversationMessages);
        setSelectedConversation(conversation);
      } else {
        setMessages([]);
        setSelectedConversation(null);
      }
    } else {
      setMessages([]);
      setSelectedConversation(null);
    }
  }, [selectedUserId, conversations, currentUser.id]);
  
  // التمرير إلى آخر رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = (text: string, files?: File[]) => {
    if (!selectedUserId || (!text.trim() && (!files || files.length === 0))) return;
    
    // التحقق إذا كانت المحادثة مغلقة
    if (selectedConversation?.status === ConversationStatus.CLOSED) {
      toast.error("لا يمكن إرسال رسائل في محادثة مغلقة");
      return;
    }
    
    // عرض الملفات المرفقة في رسالة توست
    if (files && files.length > 0) {
      toast.success(`تم إرفاق ${files.length} ملفات`, {
        description: files.map(f => f.name).join(", ")
      });
    }
    
    // إضافة الرسالة الجديدة إلى قائمة الرسائل (محاكاة)
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      text,
      senderId: currentUser.id,
      receiverId: selectedUserId,
      createdAt: new Date(),
      status: MessageStatus.SENT,
      isRead: false,
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
    
    // محاكاة تغيير حالة الرسالة بعد فترة
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMsg.id 
            ? { ...msg, status: MessageStatus.DELIVERED } 
            : msg
        )
      );
    }, 1000);
    
    // محاكاة رد تلقائي بعد فترة عشوائية
    const randomDelay = Math.floor(Math.random() * 3000) + 2000;
    setTimeout(() => {
      const receiver = getUserById(selectedUserId);
      if (!receiver) return;
      
      const autoReply: Message = {
        id: `reply-${Date.now()}`,
        text: `رد تلقائي من ${receiver.name}. شكراً للتواصل!`,
        senderId: selectedUserId,
        receiverId: currentUser.id,
        createdAt: new Date(),
        status: MessageStatus.DELIVERED,
        isRead: true,
      };
      
      setMessages(prev => [...prev, autoReply]);
      
      // تحديث حالة الرسالة السابقة إلى "تمت القراءة"
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMsg.id 
            ? { ...msg, status: MessageStatus.SEEN } 
            : msg
        )
      );
      
      toast.success("رسالة جديدة", {
        description: `${receiver.name}: ${autoReply.text}`,
      });
    }, randomDelay);
  };
  
  // دالة لتغيير حالة المحادثة (فتح/إغلاق)
  const toggleConversationStatus = () => {
    if (!selectedConversation) return;
    
    const newStatus = selectedConversation.status === ConversationStatus.ACTIVE
      ? ConversationStatus.CLOSED
      : ConversationStatus.ACTIVE;
    
    // تحديث حالة المحادثة
    const updatedConversations = conversations.map(conv => 
      conv.id === selectedConversation.id
        ? { ...conv, status: newStatus }
        : conv
    );
    
    setConversations(updatedConversations);
    
    // تحديث المحادثة المحددة
    const updatedConversation = { ...selectedConversation, status: newStatus };
    setSelectedConversation(updatedConversation);
    
    // عرض إشعار
    if (newStatus === ConversationStatus.CLOSED) {
      toast.success("تم إغلاق المحادثة");
    } else {
      toast.success("تم إعادة فتح المحادثة");
    }
  };
  
  // الحصول على قائمة المستخدمين المتاحين للمحادثة
  const getAvailableUsers = () => {
    if (isCurrentUserStaff) {
      // المعلمون والمشرفون يمكنهم مراسلة الطلاب فقط
      return getStudents();
    } else {
      // الطلاب يمكنهم مراسلة المعلمين والمشرفين فقط
      return getTeachersAndSupervisors();
    }
  };
  
  // فلترة المستخدمين وفقًا لمصطلح البحث
  const filteredUsers = getAvailableUsers().filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // الحصول على المستخدم المحدد
  const selectedUser = selectedUserId ? getUserById(selectedUserId) : null;
  
  return (
    <div className="flex h-screen bg-chat-light dark:bg-gray-900 overflow-hidden">
      {/* الشريط الجانبي */}
      <div className="w-80 border-l dark:border-gray-700 flex flex-col bg-white dark:bg-gray-800 z-10">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{getUserInitials(currentUser.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-medium dark:text-white">{currentUser.name}</h2>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                {currentUser.role === UserRole.TEACHER ? "معلم" : 
                 currentUser.role === UserRole.SUPERVISOR ? "مشرف" : "طالب"}
              </p>
            </div>
            <DarkModeToggle />
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="relative mt-4">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عن مستخدم..."
              className="pr-10 pl-4 dark:bg-gray-700 dark:border-gray-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs 
          defaultValue="chats" 
          value={activeTab}
          onValueChange={setActiveTab} 
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid grid-cols-2 p-1 m-2 dark:bg-gray-700">
            <TabsTrigger value="chats" className="dark:data-[state=active]:bg-gray-600">المحادثات</TabsTrigger>
            <TabsTrigger value="users" className="dark:data-[state=active]:bg-gray-600">المستخدمون</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chats" className="flex-1 flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {conversations.map((conv) => {
                  // الحصول على معرّف المشارك الآخر في المحادثة
                  const otherParticipantId = conv.participantIds.find(
                    (id) => id !== currentUser.id
                  );
                  if (!otherParticipantId) return null;
                  
                  const otherParticipant = getUserById(otherParticipantId);
                  if (!otherParticipant) return null;
                  
                  // الحصول على آخر رسالة والعدد غير المقروء
                  const lastMsg = getLastMessage(conv.id);
                  const unreadCount = getUnreadCount(conv.id, currentUser.id);
                  
                  return (
                    <div key={conv.id} className="relative">
                      <UserItem
                        user={otherParticipant}
                        active={selectedUserId === otherParticipantId}
                        lastMessage={lastMsg?.text || (lastMsg?.files && lastMsg.files.length > 0 ? "مرفقات" : undefined)}
                        lastMessageTime={lastMsg?.createdAt}
                        unreadCount={unreadCount}
                        onClick={() => setSelectedUserId(otherParticipantId)}
                      />
                      {/* إضافة مؤشر للمحادثات المغلقة */}
                      {conv.status === ConversationStatus.CLOSED && (
                        <div className="absolute left-2 top-2">
                          <Badge variant="outline" className="text-xs py-0 px-1.5 bg-gray-100 dark:bg-gray-700">
                            <Lock className="h-3 w-3 mr-1" /> مغلقة
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="users" className="flex-1 flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {filteredUsers.map((user) => (
                  <UserItem
                    key={user.id}
                    user={user}
                    active={selectedUserId === user.id}
                    onClick={() => setSelectedUserId(user.id)}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* منطقة المحادثة */}
      <div className="flex-1 flex flex-col dark:bg-gray-900">
        {selectedUser ? (
          <>
            {/* رأس المحادثة */}
            <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback>{getUserInitials(selectedUser.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium dark:text-white">{selectedUser.name}</h2>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">
                    {selectedUser.online ? "متصل الآن" : "غير متصل"}
                  </p>
                </div>
                {/* مؤشر حالة المحادثة */}
                {selectedConversation?.status === ConversationStatus.CLOSED && (
                  <Badge variant="outline" className="mr-2 bg-gray-100 dark:bg-gray-700">
                    <Lock className="h-3 w-3 ml-1" /> محادثة مغلقة
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {/* زر فتح/إغلاق المحادثة (متاح فقط للمشرفين) */}
                {isSupervisor && (
                  <Button 
                    variant={selectedConversation?.status === ConversationStatus.CLOSED ? "outline" : "destructive"} 
                    size="sm"
                    onClick={toggleConversationStatus}
                    className="ml-2"
                  >
                    {selectedConversation?.status === ConversationStatus.CLOSED ? (
                      <>
                        <LockOpen className="h-4 w-4 ml-1" /> 
                        إعادة فتح المحادثة
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 ml-1" /> 
                        إغلاق المحادثة
                      </>
                    )}
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsUserProfileOpen(true)}
                  className="dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  معلومات المستخدم
                </Button>
              </div>
            </div>
            
            {/* محتوى المحادثة */}
            <ScrollArea className="flex-1 p-4 dark:bg-gray-900">
              <div className="max-w-3xl mx-auto">
                {messages.length > 0 ? (
                  <MessageGroup 
                    messages={messages} 
                    currentUserId={currentUser.id} 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <div className="w-16 h-16 bg-muted dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <UserIcon className="h-8 w-8 text-muted-foreground dark:text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium dark:text-white">ابدأ محادثة جديدة</h3>
                    <p className="text-muted-foreground dark:text-gray-400 text-sm mt-1">
                      لم يتم العثور على رسائل سابقة مع {selectedUser.name}
                    </p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {/* مدخل الرسائل */}
            <div className="mt-auto border-t dark:border-gray-700">
              <div className="max-w-3xl mx-auto">
                <MessageInput
                  onSendMessage={handleSendMessage}
                  placeholder="اكتب رسالة..."
                  disabled={selectedConversation?.status === ConversationStatus.CLOSED}
                />
                {/* إظهار رسالة عندما تكون المحادثة مغلقة */}
                {selectedConversation?.status === ConversationStatus.CLOSED && (
                  <div className="text-center py-2 text-muted-foreground dark:text-gray-400 text-sm">
                    <Lock className="h-4 w-4 inline-block ml-1" />
                    هذه المحادثة مغلقة ولا يمكن إرسال رسائل جديدة
                  </div>
                )}
              </div>
            </div>
            
            {/* نافذة معلومات المستخدم */}
            <Dialog open={isUserProfileOpen} onOpenChange={setIsUserProfileOpen}>
              <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:text-white">
                <DialogHeader>
                  <DialogTitle className="text-center dark:text-white">معلومات المستخدم</DialogTitle>
                </DialogHeader>
                {selectedUser && <UserProfile user={selectedUser} />}
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="w-20 h-20 bg-muted dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <UserIcon className="h-10 w-10 text-muted-foreground dark:text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 dark:text-white">تطبيق الدردشة المدرسية</h2>
            <p className="text-muted-foreground dark:text-gray-400 text-center max-w-md mb-4">
              اختر محادثة من القائمة الجانبية أو ابدأ محادثة جديدة مع أحد المستخدمين
            </p>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              أنت مسجل دخول كـ {currentUser.role === UserRole.TEACHER ? "معلم" : 
                currentUser.role === UserRole.SUPERVISOR ? "مشرف" : "طالب"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
