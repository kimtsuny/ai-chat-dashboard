import React from "react";

const MessageList = ({ messages }: any) => {
  return (
    <div className="flex w-full flex-col flex-1 overflow-y-auto min-h-0">
      <div className="flex flex-col items-end mx-auto max-w-3xl w-full p-2 md:pt-1">

        {messages.map((msg: any) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={msg.id}
              className={`
                rounded-2xl
                px-4 py-2
                max-w-xl
                whitespace-pre-wrap
                leading-relaxed
                ${
                  isUser
                    ? "bg-black text-white"
                    : "text-black"
                }
              `}
            >
              {msg.content}
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default MessageList;
