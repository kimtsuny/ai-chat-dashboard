import React from "react";

const MessageList = ({ messages }: any) => {
  return (
    <div className="flex flex-col gap-3 overflow-hidden items-end mx-auto mt-3 md:mt-10 max-w-3xl w-full p-3 md:p-1">
      {messages.map((msg: any) => (
        <div
          key={msg.id}
          className="
            border border-border
            rounded-2xl
            px-4 py-3
            bg-background
            shadow-sm
            max-w-xl
            whitespace-pre-wrap
            leading-relaxed
          "
        >
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
