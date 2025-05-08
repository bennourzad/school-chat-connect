
export enum UserRole {
  TEACHER = 'teacher',
  SUPERVISOR = 'supervisor',
  STUDENT = 'student'
}

export enum MessageStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  SEEN = 'seen'
}

export enum ConversationStatus {
  ACTIVE = 'active',
  CLOSED = 'closed'
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  role: UserRole;
  username: string;
  bio?: string;
  phone?: string;
  online?: boolean;
  lastActive?: Date;
}

export interface Message {
  id: string;
  text?: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  status: MessageStatus;
  files?: MessageFile[];
  isRead: boolean;
}

export interface MessageFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessageId?: string;
  createdAt: Date;
  updatedAt: Date;
  unreadCount: number;
  status: ConversationStatus;
}
