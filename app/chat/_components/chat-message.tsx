import { UIMessage } from "ai";
import { MessageCircleMore } from "lucide-react";
import { Streamdown } from "streamdown";

interface ChatMessageProps {
  // Chamado de mensagem da interface de usuário AI
  message: UIMessage;
  isStreaming?: boolean;
}

export const ChatMessage = ({
  // Componente de mensagem de chat que renderiza diferentes tipos de mensagens com base no role
  message,
}: ChatMessageProps) => {
  // Determina se a mensagem é do usuário ou do sistema
  const isUserMessage = message.role === "user";
  const isSystemMessage = message.role === "system";

  const content = message.parts
    // Extrai o conteúdo de texto da mensagem
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");

  if (isSystemMessage) {
    // Chat de mensagem do sistema
    return (
      <div className="flex justify-start py-4">
        <div className="border-border text-muted-foreground max-w-xs rounded-lg border px-4 py-2 text-center text-sm">
          <p className="text-foreground break-word truncate text-sm leading-[1.4] font-normal whitespace-normal">
            {content}
          </p>
        </div>
      </div>
    );
  }

  if (isUserMessage) {
    // Chat de mensagem do usuário
    return (
      <div className="flex justify-end">
        <div className="bg-muted max-w-xs rounded-3xl px-4 py-2">
          <p className="text-foreground truncate text-sm leading-[1.4] font-normal wrap-break-word whitespace-normal">
            {content}
          </p>
        </div>
      </div>
    );
  }

  return (
    // Conteúdo do chat
    <div className="flex gap-3">
        <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
          <MessageCircleMore size="20" />
        </div>
      <div className="flex-1 max-w-xs">
        <Streamdown>{content}</Streamdown>
      </div>
    </div>
  );
};
