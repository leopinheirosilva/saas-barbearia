import { UIMessage } from "ai";
import { MessageCircleMore } from "lucide-react";

export const ChatMessage = ({ message }: { message: UIMessage }) => {
  const isUserMessage = message.role === "user";
  const isSystemMessage = message.role === "system";

  if (isSystemMessage) {
    return (
      <div className="flex justify-center py-4">
        <div className="border-border text-muted-foreground max-w-xs rounded-lg border px-4 py-2 text-center text-sm">
          {message.parts.map((part) =>
            part.type === "text" ? (
              <span key={part.text}>{part.text}</span>
            ) : null,
          )}
        </div>
      </div>
    );
  }

  if (isUserMessage) {
    return (
      <div className="flex justify-end">
        <div className="bg-muted max-w-xs rounded-3xl px-4 py-2">
          {message.parts.map((part) =>
            part.type === "text" ? (
              <p key={part.text} className="text-foreground text-sm">
                {part.text}
              </p>
            ) : null,
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="shrink-0">
        <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full">
          <MessageCircleMore size="20"/>
        </div>
      </div>
      <div className="flex-1">
        {message.parts.map((part) =>
          part.type === "text" ? (
            <p key={part.text} className="text-foreground text-sm">
              {part.text}
            </p>
          ) : null,
        )}
      </div>
    </div>
  );
};
