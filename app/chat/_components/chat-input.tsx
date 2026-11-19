"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-muted bottom-0 left-0 flex w-full flex-col gap-2.5 p-5">
      <div className="flex w-full gap-2">
        <Input
          type="text"
          placeholder="Digite sua mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={handleKeyPress}
          className="bg-background flex-1 rounded-full px-4 py-3 text-sm"
        />
        <Button
          type="button"
          variant="default"
          onClick={handleSendMessage}
          size="icon"
          className="text-muted-foreground rounded-full p-5 hover:cursor-pointer"
        >
          <Send className="h-5 w-5 rounded-full text-white" />{" "}
        </Button>
      </div>
    </div>
  );
};
