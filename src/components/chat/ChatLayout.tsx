
import React, { useState } from "react";
import { MessageInput } from "@/components/chat/MessageInput";
import { Lock } from "lucide-react";
import { ConversationStatus } from "@/lib/types";
import { conversations, users, getCurrentUser } from "@/lib/data";

export const ChatLayout = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  
  const handleSendMessage = (text: string, files?: File[]) => {
    // Logic for handling message sending
    console.log("Message sent:", text, files);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Chat messages would go here */}
      </div>

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
    </div>
  );
};
