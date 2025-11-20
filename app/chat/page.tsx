"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef } from "react";
import { ChatMessage } from "./_components/chat-message";
import { ChatHeader } from "./_components/chat-header";
import { ChatInput } from "@/app/chat/_components/chat-input";

const WELCOME_MESSAGE = `Olá! Sou o Agenda.ai, seu assistente pessoal.

Estou aqui para te auxiliar a agendar seu corte ou barba, encontrar as barbearias disponíveis perto de você e responder às suas dúvidas.`;

export default function ChatPage() {
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
    sendMessage({
      text,
    });
  };

  return (

      <div className="flex h-screen flex-col">
        <ChatHeader />
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
}
