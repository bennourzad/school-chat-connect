
import { useState, useEffect, useRef } from "react";
import { UserItem } from "./UserItem";
import { MessageInput } from "./MessageInput";
import { MessageGroup } from "./MessageItem";
import { Search, Bell, UserIcon } from "lucide-react";
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

import {
  Conversation,
  Message,
  MessageStatus,
  User,
  UserRole,
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
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeTab, setActiveTab] = useState<string>("chats");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  
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
      } else {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }
  }, [selectedUserId, conversations, currentUser.id]);
  
  // التمرير إلى آخر رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = (text: string, files?: File[]) => {
    if (!selectedUserId || (!text.trim() && (!files || files.length === 0))) return;
    
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
    <div className="flex h-screen bg-chat-light overflow-hidden">
      {/* الشريط الجانبي */}
      <div className="w-80 border-l flex flex-col bg-white z-10">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{getUserInitials(currentUser.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-medium">{currentUser.name}</h2>
              <p className="text-xs text-muted-foreground">
                {currentUser.role === UserRole.TEACHER ? "معلم" : 
                 currentUser.role === UserRole.SUPERVISOR ? "مشرف" : "طالب"}
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="relative mt-4">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عن مستخدم..."
              className="pr-10 pl-4"
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
          <TabsList className="grid grid-cols-2 p-1 m-2">
            <TabsTrigger value="chats">المحادثات</TabsTrigger>
            <TabsTrigger value="users">المستخدمون</TabsTrigger>
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
                    <UserItem
                      key={conv.id}
                      user={otherParticipant}
                      active={selectedUserId === otherParticipantId}
                      lastMessage={lastMsg?.text || (lastMsg?.files && lastMsg.files.length > 0 ? "مرفقات" : undefined)}
                      lastMessageTime={lastMsg?.createdAt}
                      unreadCount={unreadCount}
                      onClick={() => setSelectedUserId(otherParticipantId)}
                    />
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
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* رأس المحادثة */}
            <div className="p-4 border-b bg-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback>{getUserInitials(selectedUser.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-medium">{selectedUser.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedUser.online ? "متصل الآن" : "غير متصل"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsUserProfileOpen(true)}
                >
                  معلومات المستخدم
                </Button>
              </div>
            </div>
            
            {/* محتوى المحادثة */}
            <ScrollArea className="flex-1 p-4">
              <div className="max-w-3xl mx-auto">
                {messages.length > 0 ? (
                  <MessageGroup 
                    messages={messages} 
                    currentUserId={currentUser.id} 
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <UserIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">ابدأ محادثة جديدة</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      لم يتم العثور على رسائل سابقة مع {selectedUser.name}
                    </p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {/* مدخل الرسائل */}
            <div className="mt-auto border-t">
              <div className="max-w-3xl mx-auto">
                <MessageInput
                  onSendMessage={handleSendMessage}
                  placeholder="اكتب رسالة..."
                />
              </div>
            </div>
            
            {/* نافذة معلومات المستخدم */}
            <Dialog open={isUserProfileOpen} onOpenChange={setIsUserProfileOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center">معلومات المستخدم</DialogTitle>
                </DialogHeader>
                {selectedUser && <UserProfile user={selectedUser} />}
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <UserIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">تطبيق الدردشة المدرسية</h2>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              اختر محادثة من القائمة الجانبية أو ابدأ محادثة جديدة مع أحد المستخدمين
            </p>
            <p className="text-sm text-muted-foreground">
              أنت مسجل دخول كـ {currentUser.role === UserRole.TEACHER ? "معلم" : 
                currentUser.role === UserRole.SUPERVISOR ? "مشرف" : "طالب"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
