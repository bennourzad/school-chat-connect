import { User, UserRole, Message, Conversation, MessageStatus, ConversationStatus } from './types';

export const users: User[] = [
  {
    id: 'user1',
    name: 'أحمد محمد',
    username: 'ahmed.mohamed',
    email: 'ahmed.mohamed@example.com',
    role: UserRole.STUDENT,
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'طالب مجتهد يحب التعلم.',
    phone: '0555123456',
    online: true,
    lastActive: new Date(),
  },
  {
    id: 'user2',
    name: 'ليلى خالد',
    username: 'laila.khaled',
    email: 'laila.khaled@example.com',
    role: UserRole.TEACHER,
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'معلمة لغة عربية متفانية.',
    phone: '0555654321',
    online: false,
    lastActive: new Date(Date.now() - 3600000), // Last active 1 hour ago
  },
  {
    id: 'user3',
    name: 'سالم عبدالله',
    username: 'salem.abdullah',
    email: 'salem.abdullah@example.com',
    role: UserRole.SUPERVISOR,
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'مشرف تربوي ذو خبرة.',
    phone: '0555112233',
    online: true,
    lastActive: new Date(),
  },
  {
    id: 'user4',
    name: 'نورة علي',
    username: 'noura.ali',
    email: 'noura.ali@example.com',
    role: UserRole.STUDENT,
    avatar: 'https://i.pravatar.cc/150?img=4',
    bio: 'طالبة متفوقة في الرياضيات.',
    phone: '0555445566',
    online: false,
    lastActive: new Date(Date.now() - 7200000), // Last active 2 hours ago
  },
];

export const messages: Message[] = [
  {
    id: 'msg1',
    senderId: 'user1',
    receiverId: 'user2',
    text: 'السلام عليكم أستاذة ليلى، كيف حالك؟',
    createdAt: new Date('2025-05-06T09:00:00'),
    status: MessageStatus.SEEN,
    isRead: true,
  },
  {
    id: 'msg2',
    senderId: 'user2',
    receiverId: 'user1',
    text: 'وعليكم السلام يا أحمد، أنا بخير. كيف حال دراستك؟',
    createdAt: new Date('2025-05-06T09:05:00'),
    status: MessageStatus.SEEN,
    isRead: true,
  },
  {
    id: 'msg3',
    senderId: 'user1',
    receiverId: 'user2',
    text: 'الحمد لله، الأمور تسير بشكل جيد.',
    createdAt: new Date('2025-05-06T09:10:00'),
    status: MessageStatus.DELIVERED,
    isRead: true,
  },
  {
    id: 'msg4',
    senderId: 'user3',
    receiverId: 'user1',
    text: 'مرحبا أحمد، هل لديك أي أسئلة بخصوص المشروع؟',
    createdAt: new Date('2025-05-06T10:00:00'),
    status: MessageStatus.SEEN,
    isRead: true,
  },
  {
    id: 'msg5',
    senderId: 'user1',
    receiverId: 'user3',
    text: 'مرحبا أستاذ سالم، نعم لدي بعض الاستفسارات.',
    createdAt: new Date('2025-05-06T10:05:00'),
    status: MessageStatus.DELIVERED,
    isRead: true,
  },
  {
    id: 'msg6',
    senderId: 'user2',
    receiverId: 'user3',
    text: 'أستاذ سالم، هل يمكننا التحدث عن أداء الطلاب؟',
    createdAt: new Date('2025-05-06T11:00:00'),
    status: MessageStatus.SENT,
    isRead: false,
  },
  {
    id: 'msg7',
    senderId: 'user3',
    receiverId: 'user2',
    text: 'بالتأكيد أستاذة ليلى، تفضلي.',
    createdAt: new Date('2025-05-06T11:05:00'),
    status: MessageStatus.DELIVERED,
    isRead: false,
  },
  {
    id: 'msg8',
    senderId: 'user4',
    receiverId: 'user1',
    text: 'مرحبا أحمد، هل يمكن أن تساعدني في حل هذه المسألة؟',
    createdAt: new Date('2025-05-06T12:00:00'),
    status: MessageStatus.SENT,
    isRead: false,
  },
  {
    id: 'msg9',
    senderId: 'user1',
    receiverId: 'user4',
    text: 'مرحبا نورة، بالطبع يمكنني المساعدة.',
    createdAt: new Date('2025-05-06T12:05:00'),
    status: MessageStatus.DELIVERED,
    isRead: false,
  },
];

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    participantIds: ['user1', 'user2'],
    createdAt: new Date('2025-05-06T08:30:00'),
    updatedAt: new Date('2025-05-07T14:45:00'),
    unreadCount: 2,
    status: ConversationStatus.ACTIVE,
  },
  {
    id: 'conv2',
    participantIds: ['user1', 'user3'],
    createdAt: new Date('2025-05-05T10:15:00'),
    updatedAt: new Date('2025-05-07T09:20:00'),
    unreadCount: 0,
    status: ConversationStatus.ACTIVE,
  },
  {
    id: 'conv3',
    participantIds: ['user2', 'user3'],
    createdAt: new Date('2025-05-04T12:00:00'),
    updatedAt: new Date('2025-05-06T18:30:00'),
    unreadCount: 5,
    status: ConversationStatus.ACTIVE,
  },
  {
    id: 'conv4',
    participantIds: ['user4', 'user1'],
    createdAt: new Date('2025-05-03T15:45:00'),
    updatedAt: new Date('2025-05-05T11:10:00'),
    unreadCount: 1,
    status: ConversationStatus.ACTIVE,
  },
];

export const getCurrentUser = (): User => {
  // This is a mock implementation. In a real application,
  // you would fetch the current user from your authentication system.
  return users[0];
};

export const getUserById = (id: string): User | undefined => {
  return users.find((user) => user.id === id);
};

export const getUserInitials = (name: string): string => {
  const nameParts = name.split(' ');
  const initials = nameParts.map((part) => part.charAt(0).toUpperCase()).join('');
  return initials;
};

export const getUserConversations = (userId: string): Conversation[] => {
  return conversations.filter((conversation) =>
    conversation.participantIds.includes(userId)
  );
};

export const getMessagesByConversationId = (conversationId: string): Message[] => {
  const conversation = conversations.find((c) => c.id === conversationId);
  if (!conversation) return [];

  return messages.filter((message) =>
    conversation.participantIds.includes(message.senderId) &&
    conversation.participantIds.includes(message.receiverId) &&
    (conversations.find(c => c.id === conversationId)?.participantIds.includes(message.senderId) || false) &&
    (conversations.find(c => c.id === conversationId)?.participantIds.includes(message.receiverId) || false)
  ).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
};

export const getTeachersAndSupervisors = (): User[] => {
  return users.filter(
    (user) =>
      user.role === UserRole.TEACHER || user.role === UserRole.SUPERVISOR
  );
};

export const getStudents = (): User[] => {
  return users.filter((user) => user.role === UserRole.STUDENT);
};

export const getLastMessage = (conversationId: string): Message | undefined => {
  const conversationMessages = messages.filter((message) => {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (!conversation) return false;
    return conversation.participantIds.includes(message.senderId) &&
           conversation.participantIds.includes(message.receiverId);
  });
  
  if (conversationMessages.length === 0) {
    return undefined;
  }

  return conversationMessages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
};

export const getUnreadCount = (conversationId: string, userId: string): number => {
  return messages.filter(
    (message) =>
      message.receiverId === userId &&
      !message.isRead &&
      conversations.find(c => c.id === conversationId)?.participantIds.includes(message.senderId) &&
      conversations.find(c => c.id === conversationId)?.participantIds.includes(message.receiverId)
  ).length;
};

export const isTeacherOrSupervisor = (user: User): boolean => {
  return user.role === UserRole.TEACHER || user.role === UserRole.SUPERVISOR;
};

export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Add the missing formatFileSize function
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
