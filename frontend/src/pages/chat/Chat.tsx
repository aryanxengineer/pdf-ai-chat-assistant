import { useEffect, useRef, useState } from "react";
import api from "../../api/axios";
import { FileText, Loader2 } from "lucide-react";

import ChatMessages from "./ChatMessages";
import ChatInput from "./components/ChatInput";

export default function Chat({ documentId }: { documentId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🔥 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const fetchHistory = async () => {
      console.log("📡 Fetching history for:", documentId);

      try {
        const res = await api.get("/chats/history", {
          params: { documentId },
        });

        const allMessages =
          res.data?.data?.flatMap((chat: any) => chat.messages) || [];

        setMessages(allMessages);
      } catch (err) {
        console.log("❌ History error:", err);
      }
    };

    if (documentId) fetchHistory();
  }, [documentId]);

  return (
    <div className="h-full flex flex-col bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/10 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[180px]" />

      <div className="relative z-10 flex flex-col h-full">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            {/* Empty State */}
            {messages.length === 0 && !loading && (
              <div
                className="
                min-h-[70vh]
                flex
                items-center
                justify-center
              "
              >
                <div className="max-w-xl text-center">
                  <div
                    className="
                    w-24 h-24
                    mx-auto
                    rounded-3xl
                    bg-indigo-500/10
                    border border-indigo-500/20
                    flex items-center justify-center
                    mb-8
                  "
                  >
                    <FileText size={42} className="text-indigo-400" />
                  </div>

                  <h2 className="text-4xl font-bold text-white">
                    Start chatting with your PDF
                  </h2>

                  <p className="mt-4 text-slate-400 leading-relaxed text-lg">
                    Ask questions, generate summaries, extract key insights, and
                    explore your documents using AI.
                  </p>

                  <div className="mt-8 flex justify-center gap-3 flex-wrap">
                    <div
                      className="
                      px-4 py-2
                      rounded-full
                      bg-white/5
                      border border-white/10
                      text-sm text-slate-400
                    "
                    >
                      Summarize document
                    </div>

                    <div
                      className="
                      px-4 py-2
                      rounded-full
                      bg-white/5
                      border border-white/10
                      text-sm text-slate-400
                    "
                    >
                      Extract insights
                    </div>

                    <div
                      className="
                      px-4 py-2
                      rounded-full
                      bg-white/5
                      border border-white/10
                      text-sm text-slate-400
                    "
                    >
                      Ask questions
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <ChatMessages messages={messages} />

            {/* AI Thinking */}
            {loading && (
              <div className="max-w-4xl mt-6">
                <div
                  className="
                  inline-flex
                  items-center
                  gap-3
                  px-4 py-3
                  rounded-2xl
                  bg-white/3
                  border border-white/10
                "
                >
                  <Loader2
                    size={16}
                    className="
                    animate-spin
                    text-indigo-400
                  "
                  />

                  <span className="text-sm text-slate-300">
                    AI is analyzing your document...
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input Area */}
        <div
          className="
          sticky
          bottom-0
          border-t border-white/10
          bg-slate-950/90
          backdrop-blur-2xl
        "
        >
          <div className="max-w-5xl mx-auto">
            <ChatInput
              messages={messages}
              setMessages={setMessages}
              setLoading={setLoading}
              documentId={documentId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
