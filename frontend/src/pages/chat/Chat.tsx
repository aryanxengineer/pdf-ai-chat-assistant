import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { FileText, Loader2 } from "lucide-react";

import ChatMessages from "./ChatMessages";
import ChatInput from "./components/ChatInput";

export default function Chat() {
  const { id: documentId } = useParams<{ id: string }>();

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
      <div className="h-full flex items-center justify-center text-white">
        Invalid document
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/10 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[180px]" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-8">
            {messages.length === 0 && !loading && (
              <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center">
                  <FileText
                    size={42}
                    className="text-indigo-400 mx-auto mb-4"
                  />
                  <h2 className="text-3xl font-bold text-white">
                    Start chatting with your PDF
                  </h2>
                </div>
              </div>
            )}

            <ChatMessages messages={messages} />

            {loading && (
              <div className="mt-6 flex items-center gap-3 text-slate-300">
                <Loader2 className="animate-spin text-indigo-400" size={16} />
                AI is analyzing...
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-white/10 bg-slate-950/90 backdrop-blur-xl">
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
