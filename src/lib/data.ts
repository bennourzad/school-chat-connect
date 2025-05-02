
import { User, UserRole, Message, MessageStatus, Conversation, MessageFile } from './types';

// بيانات المستخدمين
export const users: User[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    role: UserRole.TEACHER,
    avatar: '/placeholder.svg',
    email: 'ahmed@school.com',
    username: '@ahmed',
    bio: 'مدرس الرياضيات',
    phone: '+9661234567',
    online: true,
  },
  {
    id: '2',
    name: 'سارة أحمد',
    role: UserRole.TEACHER,
    avatar: '/placeholder.svg',
    email: 'sara@school.com',
    username: '@sara',
    bio: 'مدرسة اللغة العربية',
    phone: '+9661234568',
    online: false,
    lastActive: new Date(Date.now() - 15 * 60000), // 15 دقيقة مضت
  },
  {
    id: '3',
    name: 'محمد خالد',
    role: UserRole.SUPERVISOR,
    avatar: '/placeholder.svg',
    email: 'mohamed@school.com',
    username: '@mohamed',
    bio: 'مشرف الفصل الأول',
    phone: '+9661234569',
    online: true,
  },
  {
    id: '4',
    name: 'خالد عبدالله',
    role: UserRole.STUDENT,
    avatar: '/placeholder.svg',
    email: 'khaled@school.com',
    username: '@khaled',
    bio: 'طالب في الصف الثالث',
    online: true,
  },
  {
    id: '5',
    name: 'نورة محمد',
    role: UserRole.STUDENT,
    avatar: '/placeholder.svg',
    email: 'noora@school.com',
    username: '@noora',
    bio: 'طالبة في الصف الثاني',
    online: false,
    lastActive: new Date(Date.now() - 60 * 60000), // ساعة مضت
  },
  {
    id: '6',
    name: 'فهد عبدالعزيز',
    role: UserRole.STUDENT,
    avatar: '/placeholder.svg',
    email: 'fahad@school.com',
    username: '@fahad',
    bio: 'طالب في الصف الرابع',
    online: true,
  }
];

// قائمة بالملفات
export const files: MessageFile[] = [
  {
    id: 'file1',
    name: 'واجب_الرياضيات.pdf',
    size: 1024 * 1024 * 2.5, // 2.5 ميجابايت
    type: 'application/pdf',
    url: '/placeholder.svg',
  },
  {
    id: 'file2',
    name: 'صورة_توضيحية.jpg',
    size: 1024 * 500, // 500 كيلوبايت
    type: 'image/jpeg',
    url: '/placeholder.svg',
  },
  {
    id: 'file3',
    name: 'ملاحظات.docx',
    size: 1024 * 800, // 800 كيلوبايت
    type: 'application/docx',
    url: '/placeholder.svg',
  },
];

// بيانات المحادثات
export const conversations: Conversation[] = [
  {
    id: 'conv1',
    participantIds: ['1', '4'], // محادثة بين المعلم أحمد والطالب خالد
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60000), // منذ أسبوع
    updatedAt: new Date(Date.now() - 1 * 60 * 60000), // منذ ساعة
    unreadCount: 2,
  },
  {
    id: 'conv2',
    participantIds: ['1', '5'], // محادثة بين المعلم أحمد والطالبة نورة
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60000), // منذ أسبوعين
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60000), // منذ يومين
    unreadCount: 0,
  },
  {
    id: 'conv3',
    participantIds: ['2', '6'], // محادثة بين المعلمة سارة والطالب فهد
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60000), // منذ 5 أيام
    updatedAt: new Date(Date.now() - 6 * 60 * 60000), // منذ 6 ساعات
    unreadCount: 1,
  },
  {
    id: 'conv4',
    participantIds: ['3', '4'], // محادثة بين المشرف محمد والطالب خالد
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60000), // منذ 3 أيام
    updatedAt: new Date(Date.now() - 30 * 60000), // منذ 30 دقيقة
    unreadCount: 3,
  },
];

// بيانات الرسائل
export const messages: Message[] = [
  // محادثة 1: المعلم أحمد والطالب خالد
  {
    id: 'msg1',
    text: 'مرحبا يا أستاذ، هل يمكنني الحصول على مساعدة في الواجب؟',
    senderId: '4', // الطالب خالد
    receiverId: '1', // المعلم أحمد
    createdAt: new Date(Date.now() - 2 * 60 * 60000), // منذ ساعتين
    status: MessageStatus.SEEN,
    isRead: true,
  },
  {
    id: 'msg2',
    text: 'بالطبع، ما هو السؤال الذي تحتاج المساعدة فيه؟',
    senderId: '1', // المعلم أحمد
    receiverId: '4', // الطالب خالد
    createdAt: new Date(Date.now() - 1.5 * 60 * 60000), // منذ ساعة ونصف
    status: MessageStatus.SEEN,
    isRead: true,
  },
  {
    id: 'msg3',
    text: 'سؤال رقم 5 في صفحة 42',
    senderId: '4', // الطالب خالد
    receiverId: '1', // المعلم أحمد
    createdAt: new Date(Date.now() - 1.3 * 60 * 60000), // منذ ساعة و20 دقيقة
    status: MessageStatus.SEEN,
    isRead: true,
  },
  {
    id: 'msg4',
    text: 'أرفقت لك شرحًا تفصيليًا لهذا السؤال. يمكنك مراجعته والسؤال إذا كان لديك أي استفسار.',
    senderId: '1', // المعلم أحمد
    receiverId: '4', // الطالب خالد
    createdAt: new Date(Date.now() - 1 * 60 * 60000), // منذ ساعة
    status: MessageStatus.DELIVERED,
    isRead: false,
    files: [files[0]], // ملف واجب الرياضيات
  },
  {
    id: 'msg5',
    text: 'شكراً جزيلاً يا أستاذ!',
    senderId: '4', // الطالب خالد
    receiverId: '1', // المعلم أحمد
    createdAt: new Date(Date.now() - 30 * 60000), // منذ 30 دقيقة
    status: MessageStatus.DELIVERED,
    isRead: false,
  },
  
  // محادثة 2: المعلم أحمد والطالبة نورة
  {
    id: 'msg6',
    text: 'أستاذ، هل يمكنني تسليم المشروع يوم الثلاثاء بدلاً من الإثنين؟',
    senderId: '5', // الطالبة نورة
    receiverId: '1', // المعلم أحمد
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60000), // منذ 3 أيام
    status: MessageStatus.SEEN,
    isRead: true,
  },
  {
    id: 'msg7',
    text: 'نعم يمكنك ذلك، لكن لا تتأخري أكثر من ذلك.',
    senderId: '1', // المعلم أحمد
    receiverId: '5', // الطالبة نورة
    createdAt: new Date(Date.now() - 2.8 * 24 * 60 * 60000), // منذ يومين وبضع ساعات
    status: MessageStatus.SEEN,
    isRead: true,
  },
  {
    id: 'msg8',
    text: 'شكراً جزيلاً، سأسلمه في الموعد المحدد.',
    senderId: '5', // الطالبة نورة
    receiverId: '1', // المعلم أحمد
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60000), // منذ يومين
    status: MessageStatus.SEEN,
    isRead: true,
  },
  
  // محادثة 3: المعلمة سارة والطالب فهد
  {
    id: 'msg9',
    text: 'مرحبا أستاذة سارة، أرسلت لك ملخص الدرس.',
    senderId: '6', // الطالب فهد
    receiverId: '2', // المعلمة سارة
    createdAt: new Date(Date.now() - 10 * 60 * 60000), // منذ 10 ساعات
    status: MessageStatus.SEEN,
    isRead: true,
    files: [files[2]], // ملف ملاحظات
  },
  {
    id: 'msg10',
    text: 'شكراً فهد، سأراجعه وأعطيك ملاحظاتي.',
    senderId: '2', // المعلمة سارة
    receiverId: '6', // الطالب فهد
    createdAt: new Date(Date.now() - 8 * 60 * 60000), // منذ 8 ساعات
    status: MessageStatus.SEEN,
    isRead: true,
  },
  {
    id: 'msg11',
    text: 'ملاحظاتي على الملخص: يحتاج إلى توضيح أكثر في الجزء الثاني، وإضافة بعض الأمثلة في الجزء الثالث.',
    senderId: '2', // المعلمة سارة
    receiverId: '6', // الطالب فهد
    createdAt: new Date(Date.now() - 6 * 60 * 60000), // منذ 6 ساعات
    status: MessageStatus.DELIVERED,
    isRead: false,
  },
  
  // محادثة 4: المشرف محمد والطالب خالد
  {
    id: 'msg12',
    text: 'مرحبًا خالد، أريد التحدث معك بخصوص مشاركتك في المسابقة القادمة.',
    senderId: '3', // المشرف محمد
    receiverId: '4', // الطالب خالد
    createdAt: new Date(Date.now() - 5 * 60 * 60000), // منذ 5 ساعات
    status: MessageStatus.SEEN,
    isRead: true,
  },
  {
    id: 'msg13',
    text: 'حسناً أستاذ، متى يمكننا الاجتماع لمناقشة التفاصيل؟',
    senderId: '4', // الطالب خالد
    receiverId: '3', // المشرف محمد
    createdAt: new Date(Date.now() - 4.5 * 60 * 60000), // منذ 4.5 ساعات
    status: MessageStatus.SEEN,
    isRead: true,
  },
  {
    id: 'msg14',
    text: 'غداً بعد الحصة الثالثة في غرفة المشرفين.',
    senderId: '3', // المشرف محمد
    receiverId: '4', // الطالب خالد
    createdAt: new Date(Date.now() - 4 * 60 * 60000), // منذ 4 ساعات
    status: MessageStatus.SEEN,
    isRead: true,
  },
  {
    id: 'msg15',
    text: 'هذه صورة توضيحية للمشروع الذي سنقدمه في المسابقة.',
    senderId: '3', // المشرف محمد
    receiverId: '4', // الطالب خالد
    createdAt: new Date(Date.now() - 1 * 60 * 60000), // منذ ساعة
    status: MessageStatus.DELIVERED,
    isRead: false,
    files: [files[1]], // صورة توضيحية
  },
  {
    id: 'msg16',
    text: 'وهذه بعض المستندات التي ستحتاجها للمراجعة.',
    senderId: '3', // المشرف محمد
    receiverId: '4', // الطالب خالد
    createdAt: new Date(Date.now() - 45 * 60000), // منذ 45 دقيقة
    status: MessageStatus.DELIVERED,
    isRead: false,
    files: [files[0], files[2]], // عدة ملفات
  },
  {
    id: 'msg17',
    text: 'الرجاء مراجعتها قبل الاجتماع.',
    senderId: '3', // المشرف محمد
    receiverId: '4', // الطالب خالد
    createdAt: new Date(Date.now() - 30 * 60000), // منذ 30 دقيقة
    status: MessageStatus.SENT,
    isRead: false,
  },
];

// وظائف مساعدة للوصول إلى البيانات
export const getCurrentUser = (): User => users[0]; // افتراضياً، المستخدم الحالي هو المعلم أحمد

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getConversationById = (id: string): Conversation | undefined => {
  return conversations.find(conv => conv.id === id);
};

export const getMessagesByConversationId = (conversationId: string): Message[] => {
  const conversation = getConversationById(conversationId);
  if (!conversation) return [];
  
  const participantIds = conversation.participantIds;
  return messages.filter(
    msg => 
      (participantIds.includes(msg.senderId) && participantIds.includes(msg.receiverId))
  ).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
};

export const getUserConversations = (userId: string): Conversation[] => {
  return conversations
    .filter(conv => conv.participantIds.includes(userId))
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
};

export const getConversationByParticipants = (userId1: string, userId2: string): Conversation | undefined => {
  return conversations.find(conv => 
    conv.participantIds.includes(userId1) && conv.participantIds.includes(userId2)
  );
};

export const getConversationForUsers = (userOne: User, userTwo: User): Conversation | undefined => {
  return getConversationByParticipants(userOne.id, userTwo.id);
};

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  }
}

export function getLastMessage(conversationId: string): Message | undefined {
  const convMessages = getMessagesByConversationId(conversationId);
  if (convMessages.length === 0) return undefined;
  
  // ترتيب الرسائل حسب التاريخ (الأحدث أولاً) والحصول على آخر رسالة
  return [...convMessages].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
}

export function getUnreadCount(conversationId: string, userId: string): number {
  const convMessages = getMessagesByConversationId(conversationId);
  return convMessages.filter(msg => msg.receiverId === userId && !msg.isRead).length;
}

export const getStudents = (): User[] => {
  return users.filter(user => user.role === UserRole.STUDENT);
};

export const getTeachersAndSupervisors = (): User[] => {
  return users.filter(user => user.role === UserRole.TEACHER || user.role === UserRole.SUPERVISOR);
};

export const isTeacherOrSupervisor = (user: User): boolean => {
  return user.role === UserRole.TEACHER || user.role === UserRole.SUPERVISOR;
};

export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const formatDate = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'اليوم';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'الأمس';
  } else {
    return date.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
  }
};

export const getUserInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};
