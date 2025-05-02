
import { User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatTime, getUserInitials } from "@/lib/data";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserItemProps {
  user: User;
  active?: boolean;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  onClick?: () => void;
}

export function UserItem({ 
  user, 
  active = false, 
  lastMessage, 
  lastMessageTime,
  unreadCount = 0,
  onClick 
}: UserItemProps) {
  return (
    <div
      className={cn(
        "flex items-center p-3 gap-3 rounded-lg cursor-pointer hover:bg-chat-hover",
        active && "bg-chat-hover"
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getUserInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        {user.online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm truncate">{user.name}</h3>
          {lastMessageTime && (
            <span className="text-xs text-gray-500">
              {formatTime(lastMessageTime)}
            </span>
          )}
        </div>
        
        {lastMessage && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 truncate">{lastMessage}</p>
            {unreadCount > 0 && (
              <div className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {unreadCount}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
