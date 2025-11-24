"use client";

// Imports
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef } from "react";
import { ChatMessage } from "./_components/chat-message";
import { ChatHeader } from "./_components/chat-header";
import { ChatInput } from "@/app/chat/_components/chat-input";

const WELCOME_MESSAGE = `Olá! Sou o <strong>Agenda.ai</strong>, seu assistente pessoal.

Estou aqui para te auxiliar a agendar seu corte ou barba, encontrar as barbearias disponíveis perto de você e responder às suas dúvidas.`;

export default function ChatPage() {
  // Inicialização do chat
  const initializeRef = useRef(false); // Evita múltiplas inicializações;
  const { messages, sendMessage, setMessages } = useChat({
    // Chama a rota de API do chat
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null); // Referência para o final da lista de mensagens
  const messagesContainerRef = useRef<HTMLDivElement>(null); // Referência para o container das mensagens

  const scrollToBottom = () => {
    // Rola para o final da lista de mensagens
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!initializeRef.current && messages.length === 0) {
      initializeRef.current = true;
      setMessages(
        // Verifica se a conversa já foi inicializada e adiciona a mensagem de boas-vindas
        [
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
        ],
      );
    }
  }, [messages.length, setMessages]); // Executa apenas na montagem inicial

  useEffect(() => {
    // Rola para o final sempre que as mensagens mudam
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    sendMessage(
      // Envia a mensagem do usuário
      {
        text,
      },
    );
  };

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader />
      {/* Conteudo do chat */}
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
