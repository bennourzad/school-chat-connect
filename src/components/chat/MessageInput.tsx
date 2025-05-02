
import React, { useState, useRef } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MessageInputProps {
  onSendMessage: (text: string, files?: File[]) => void;
  placeholder?: string;
}

export function MessageInput({ 
  onSendMessage, 
  placeholder = "اكتب رسالتك هنا..." 
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || files.length > 0) {
      onSendMessage(message, files);
      setMessage("");
      setFiles([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // فحص حجم الملفات (الحد الأقصى 10 ميجابايت لكل ملف)
      const oversizedFiles = newFiles.filter(file => file.size > 10 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        toast.error("حجم الملف كبير جداً. الحد الأقصى هو 10 ميجابايت لكل ملف.");
        return;
      }
      
      // إضافة الملفات إلى القائمة
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      // مسح قيمة حقل الملفات لتتمكن من اختيار نفس الملف مرة أخرى
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 border-t">
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs"
            >
              <span className="truncate max-w-[100px]">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 resize-none bg-muted/50 border rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
          rows={1}
          style={{
            minHeight: "40px",
            maxHeight: "120px",
            height: "auto",
          }}
        />

        <Button
          type="submit"
          size="icon"
          className="bg-chat-primary text-white rounded-full hover:bg-chat-primary/90"
          disabled={!message.trim() && files.length === 0}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
