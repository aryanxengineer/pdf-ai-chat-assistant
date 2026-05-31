import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function ChatMessages({ messages }: any) {
  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);

    setCopied(index);

    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {messages.map((msg: any, idx: number) => {
        const isUser = msg.role === "user";

        return (
          <div
            key={idx}
            className={`
              flex gap-4
              ${isUser ? "justify-end" : "justify-start"}
            `}
          >
            {/* AI Avatar */}
            {!isUser && (
              <div
                className="
                  hidden sm:flex
                  shrink-0
                  w-10 h-10
                  rounded-2xl

                  bg-indigo-500/10
                  border border-indigo-500/20

                  items-center
                  justify-center
                "
              >
                <Bot size={18} className="text-indigo-300" />
              </div>
            )}

            {/* Content */}
            <div
              className={`
                relative group
                max-w-full sm:max-w-[85%]
                lg:max-w-[75%]
              `}
            >
              {/* Label */}
              <div
                className={`
                  mb-2 text-xs font-medium

                  ${isUser ? "text-right text-slate-500" : "text-slate-400"}
                `}
              >
                {isUser ? "You" : "AI Assistant"}
              </div>

              {/* Bubble */}
              <div
                className={`
                  relative

                  px-5 py-4
                  rounded-3xl

                  text-sm sm:text-[15px]
                  leading-7

                  border

                  transition-all

                  ${
                    isUser
                      ? `
                        bg-indigo-600
                        text-white
                        border-indigo-500/30
                        rounded-br-lg
                        shadow-lg
                        shadow-indigo-500/15
                      `
                      : `
                        bg-white/3
                        backdrop-blur-xl
                        border-white/10
                        text-slate-100
                        rounded-bl-lg
                      `
                  }
                `}
              >
                <div className="whitespace-pre-wrap wrap-break-word">
                  {msg.content}
                </div>

                {/* Copy Button */}
                {!isUser && (
                  <button
                    onClick={() => handleCopy(msg.content, idx)}
                    className="
                      absolute
                      top-3
                      right-3

                      opacity-0
                      group-hover:opacity-100

                      transition

                      w-8 h-8
                      rounded-xl

                      bg-white/5
                      border border-white/10

                      flex items-center justify-center

                      hover:bg-white/10
                    "
                  >
                    {copied === idx ? (
                      <Check size={14} className="text-green-400" />
                    ) : (
                      <Copy size={14} className="text-slate-400" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* User Avatar */}
            {isUser && (
              <div
                className="
                  hidden sm:flex
                  shrink-0
                  w-10 h-10
                  rounded-2xl

                  bg-white/5
                  border border-white/10

                  items-center
                  justify-center
                "
              >
                <User size={18} className="text-slate-300" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
