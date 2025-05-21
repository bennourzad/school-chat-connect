
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
