import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useRef, useEffect } from "react";

const MessageList = ({ messages }: any) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!messages.length) return;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === "user" || lastMessage.isTyping) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="flex w-full flex-col flex-1 overflow-y-auto min-h-0">

      <div className="flex flex-col gap-4 px-4 py-6 max-w-3xl mx-auto w-full">

        {messages.map((msg: any) => {
          const isUser = msg.role === "user";

          return (
            <div key={msg.id} className="w-full">

              <div
                className={cn(
                  "w-fit max-w-full px-4 py-3 rounded-2xl",
                  "whitespace-pre-wrap text-sm md:text-base leading-7",
                  "transition-all duration-200",

                  msg.isTyping
                    ? ""
                    : "px-4 py-3 rounded-2xl bg-gray-100 text-black",

                  isUser
                    ? "bg-black text-white ml-auto"
                    : " text-black"
                )}
              >
                {msg.isTyping ? (
                  <div className="flex items-center">
                    <span className="typing-dot" />
                    <style>
                      {`
  .typing-dot {
    width: 10px;
    height: 10px;
  background-color: #a855f7;
    border-radius: 9999px;
    animation: pulseDot 2s ease-in-out infinite;
    
  }

  @keyframes pulseDot {
    0%, 100% {
      transform: scale(1.1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.4);
      opacity: 1;
    }
  }
`}
                    </style>
                  </div>
                ) : (
                  <span>{msg.content}</span>
                )}
              </div>

            </div>
          );
        })}
        <div ref={bottomRef} />

      </div>

    </div>
  );
};

export default MessageList;