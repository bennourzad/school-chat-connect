
import { Message, MessageStatus } from "@/lib/types";
import { getUserById, formatTime, formatFileSize } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInitials } from "@/lib/data";

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
  showAvatar?: boolean;
}

export function MessageItem({ message, isCurrentUser, showAvatar = true }: MessageItemProps) {
  const user = getUserById(message.senderId);

  if (!user) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex gap-2 mb-4 max-w-[85%]",
        isCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto flex-row"
      )}
    >
      {showAvatar && (
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
          </Avatar>
        </div>
      )}

      <div className="flex flex-col gap-1 max-w-full">
        {message.text && (
          <div
            className={cn(
              "px-4 py-2 rounded-2xl max-w-full",
              isCurrentUser
                ? "bg-chat-primary text-white"
                : "bg-chat-received text-foreground border border-gray-100"
            )}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
          </div>
        )}

        {message.files && message.files.length > 0 && (
          <div className="flex flex-col gap-2">
            {message.files.map((file) => (
              <div
                key={file.id}
                className={cn(
                  "px-3 py-2 rounded-lg border flex items-center gap-2",
                  isCurrentUser
                    ? "bg-chat-primary/10 border-chat-primary/30"
                    : "bg-chat-received border-gray-200"
                )}
              >
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-xs">{file.name.split('.').pop()}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
                <a
                  href={file.url}
                  download={file.name}
                  className="text-xs font-medium hover:underline"
                >
                  تنزيل
                </a>
              </div>
            ))}
          </div>
        )}

        <div
          className={cn(
            "flex items-center text-xs text-gray-500",
            isCurrentUser ? "justify-end" : "justify-start"
          )}
        >
          <span>{formatTime(message.createdAt)}</span>
          {isCurrentUser && (
            <span className="mr-1">
              {message.status === MessageStatus.SENT && (
                <Check className="h-3 w-3 inline" />
              )}
              {message.status === MessageStatus.DELIVERED && (
                <CheckCheck className="h-3 w-3 inline" />
              )}
              {message.status === MessageStatus.SEEN && (
                <CheckCheck className="h-3 w-3 inline text-blue-500" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function MessageGroup({ 
  messages, 
  currentUserId 
}: { 
  messages: Message[]; 
  currentUserId: string 
}) {
  return (
    <div className="py-2">
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId !== currentUserId;
        const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;
        
        return (
          <MessageItem
            key={message.id}
            message={message}
            isCurrentUser={isCurrentUser}
            showAvatar={showAvatar}
          />
        );
      })}
    </div>
  );
}
