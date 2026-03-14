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

      <div className="flex flex-col gap-5 px-4 py-6 max-w-3xl mx-auto w-full">

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
                    : isUser
                      ? "bg-[#8b5cf6] text-white ml-auto"
                      : "bg-[#1e1e24] text-[#f3f4f6] border border-[#2e2e36]"
                )}
              >
                <span className="">{msg.content}</span>
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