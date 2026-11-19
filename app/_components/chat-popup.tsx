"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef } from "react";
import { ChatMessage } from "@/app/chat/_components/chat-message";
import { ChatInput } from "@/app/chat/_components/chat-input";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const WELCOME_MESSAGE = `Olá! Sou o <strong>Agenda.ai</strong>, seu assistente pessoal.

Estou aqui para te auxiliar a agendar seu corte ou barba, encontrar as barbearias disponíveis perto de você e responder às suas dúvidas.`;

interface ChatPopupProps {
  onClose: () => void;
}

export const ChatPopup = ({ onClose }: ChatPopupProps) => {
  const initializeRef = useRef(false);
  const { messages, sendMessage, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!initializeRef.current && messages.length === 0) {
      initializeRef.current = true;
      setMessages([
        {
          id: "welcome-message",
          role: "assistant",
          parts: [
            {
              type: "text" as const,
              text: WELCOME_MESSAGE,
            },
          ],
        },
      ]);
    }
  }, [messages.length, setMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    sendMessage({ text });
  };

  return (
    <div className="border-border bg-background fixed bottom-6 left-6 z-50 flex h-212.5 w-125 flex-col overflow-hidden rounded-2xl border shadow-2xl">
      <div className="flex w-full items-center justify-between border-b p-4">
        <div className="flex items-center gap-2 px-5">
          <h2 className="font-merriweather text-lg tracking-tight italic">
            Agenda.ai
          </h2>
        </div>
        <Button
          size="icon"
          onClick={onClose}
          className="bg-background hover:bg-background rounded-lg hover:cursor-pointer"
          aria-label="Fechar chat"
        >
          <X className="text-foreground size-5 shrink-0" />
        </Button>
      </div>

      <div
        ref={messagesContainerRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};
