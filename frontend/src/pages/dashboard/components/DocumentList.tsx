import { useQuery } from "@tanstack/react-query";
import { FileText, Sparkles } from "lucide-react";
import api from "../../../api/axios";

export default function DocumentList({ selectedDoc, setSelectedDoc }: any) {
  const { data, isLoading } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const res = await api.get("/documents");
      return res.data.data;
    },
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-2 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Workspace
            </p>

            <h3 className="text-sm font-semibold text-white mt-1">Documents</h3>
          </div>

          {data?.length > 0 && (
            <div
              className="
              px-2 py-1
              rounded-lg
              bg-white/5
              border border-white/10
              text-xs text-slate-400
            "
            >
              {data.length}
            </div>
          )}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="
              h-16
              rounded-2xl
              bg-white/4
              border border-white/5
              animate-pulse
            "
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && data?.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-55">
            <div
              className="
              w-16 h-16
              mx-auto mb-4
              rounded-2xl
              bg-indigo-500/10
              border border-indigo-500/20
              flex items-center justify-center
            "
            >
              <Sparkles size={24} className="text-indigo-400" />
            </div>

            <h4 className="text-white font-medium">No documents yet</h4>

            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Upload your first PDF and start chatting with AI.
            </p>
          </div>
        </div>
      )}

      {/* Documents */}
      <div className="space-y-3 overflow-y-auto pr-1">
        {data?.map((doc: any) => {
          const isActive = selectedDoc === doc._id;

          return (
            <button
              key={doc._id}
              onClick={() => setSelectedDoc(doc._id)}
              className={`
              relative
              w-full
              text-left
              p-4
              rounded-2xl
              border
              transition-all
              duration-300
              overflow-hidden

              ${
                isActive
                  ? `
                    bg-indigo-500/10
                    border-indigo-500/30
                    shadow-lg
                    shadow-indigo-500/10
                  `
                  : `
                    bg-white/3
                    border-white/10
                    hover:bg-white/6
                    hover:border-white/20
                    hover:-translate-y-0.5
                  `
              }
            `}
            >
              {/* Glow */}
              {isActive && (
                <div
                  className="
                  absolute inset-0
                  bg-linear-to-r
                  from-indigo-500/10
                  to-cyan-500/5
                  pointer-events-none
                "
                />
              )}

              <div className="relative flex items-center gap-3">
                {/* Icon */}
                <div
                  className={`
                  shrink-0
                  w-11 h-11
                  rounded-xl
                  flex items-center justify-center
                  transition

                  ${
                    isActive
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "bg-white/5 text-slate-400"
                  }
                `}
                >
                  <FileText size={18} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`
                    text-sm font-medium truncate
                    ${isActive ? "text-white" : "text-slate-300"}
                  `}
                  >
                    {doc.originalName}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">Ready for chat</p>
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="flex flex-col items-center">
                    <div
                      className="
                      w-2.5 h-2.5
                      rounded-full
                      bg-indigo-400
                      shadow-[0_0_12px_rgba(99,102,241,1)]
                    "
                    />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
