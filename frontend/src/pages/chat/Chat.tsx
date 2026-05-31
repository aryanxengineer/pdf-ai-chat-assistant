import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FileText, Loader2, ArrowLeft } from "lucide-react";

import ChatMessages from "./ChatMessages";
import ChatInput from "./components/ChatInput";

export default function Chat() {
  const { id: documentId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Fetch history
  useEffect(() => {
    if (!documentId) return;

    const fetchHistory = async () => {
      try {
        const res = await api.get("/chats/history", {
          params: { documentId },
        });

        const allMessages =
          res.data?.data?.flatMap((chat: any) => chat.messages) || [];

        setMessages(allMessages);
      } catch (err) {
        console.log("History error:", err);
      }
    };

    fetchHistory();
  }, [documentId]);

  if (!documentId) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Invalid document
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden relative">

      {/* Background glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/10 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[180px]" />

      {/* Main container */}
      <div className="relative z-10 flex flex-col h-full">

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">

          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            Dashboard
          </button>

          {/* Title */}
          <div className="flex items-center gap-2 text-slate-300 text-sm">
            <FileText size={16} className="text-indigo-400" />
            Chat Mode
          </div>

          {/* Spacer */}
          <div className="w-[80px]" />
        </div>

        {/* MESSAGES AREA (ONLY SCROLLABLE PART) */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">

            {messages.length === 0 && !loading && (
              <div className="h-[60vh] flex items-center justify-center text-center">
                <div>
                  <FileText size={42} className="text-indigo-400 mx-auto mb-4" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Start chatting with your PDF
                  </h2>
                  <p className="text-slate-400 mt-2 text-sm sm:text-base">
                    Ask questions, summarize or extract insights
                  </p>
                </div>
              </div>
            )}

            <ChatMessages messages={messages} />

            {loading && (
              <div className="mt-4 flex items-center gap-3 text-slate-300">
                <Loader2 className="animate-spin text-indigo-400" size={16} />
                AI is analyzing...
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* INPUT FIXED AREA */}
        <div className="border-t border-white/10 bg-slate-950/90 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
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