import api from "../../../api/axios";

import { useRef, useState } from "react";
import { SendHorizontal, Sparkles, Loader2 } from "lucide-react";

export default function ChatInput({
  setMessages,
  setLoading,
  documentId,
}: any) {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    const textarea = e.target;

    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 180) + "px";
  };

  const sendMessage = async () => {
    if (!input.trim() || sending) return;

    const question = input;

    setMessages((prev: any) => [...prev, { role: "user", content: question }]);

    setInput("");
    setLoading(true);
    setSending(true);

    try {
      const res = await api.post("/chats/query", {
        question,
        documentId, // 🔥 FIX
      });

      console.log("chat response:", res.data);

      const answer =
        res.data?.data?.answer || res.data?.data?.content || "No response";

      setMessages((prev: any) => [
        ...prev,
        { role: "assistant", content: answer },
      ]);
    } catch (err) {
      console.log("chat error:", err);

      setMessages((prev: any) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong ❌",
        },
      ]);
    } finally {
      setLoading(false);
      setSending(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="
      px-3 sm:px-6
      pb-4 pt-3
      bg-linear-to-t
      from-slate-950
      via-slate-950/95
      to-transparent
      backdrop-blur-2xl
    "
    >
      {/* Composer */}
      <div className="max-w-5xl mx-auto">
        <div
          className="
          relative

          rounded-[28px]

          bg-white/4
          backdrop-blur-2xl

          border border-white/10

          shadow-[0_0_40px_rgba(0,0,0,0.3)]

          transition-all
          duration-300

          focus-within:border-indigo-500/40
          focus-within:shadow-indigo-500/10
        "
        >
          {/* Top Accent */}
          <div
            className="
            absolute inset-x-0 top-0 h-px
            bg-linear-to-r
            from-transparent
            via-indigo-500/50
            to-transparent
          "
          />

          <div className="flex items-end gap-3 p-3">
            {/* AI Icon */}
            <div
              className="
              hidden sm:flex

              w-11 h-11
              rounded-2xl

              bg-indigo-500/10
              border border-indigo-500/20

              items-center
              justify-center
              shrink-0
            "
            >
              <Sparkles size={18} className="text-indigo-300" />
            </div>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask anything about your document..."
              className="
              flex-1
              resize-none

              bg-transparent
              outline-none

              text-white
              placeholder:text-slate-500

              py-3

              max-h-45
              min-h-12
            "
            />

            {/* Send */}
            <button
              onClick={sendMessage}
              disabled={sending || !input.trim()}
              className="
              shrink-0

              w-12 h-12

              rounded-2xl

              bg-indigo-600
              hover:bg-indigo-500

              disabled:bg-white/10
              disabled:text-slate-500

              flex items-center
              justify-center

              transition-all
              duration-300

              hover:scale-105
              active:scale-95
            "
            >
              {sending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <SendHorizontal size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div
          className="
          mt-3
          text-center
          text-xs
          text-slate-500
        "
        >
          Press Enter to send • Shift + Enter for new line
        </div>
      </div>
    </div>
  );
}
