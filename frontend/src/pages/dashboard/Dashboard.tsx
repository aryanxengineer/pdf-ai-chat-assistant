import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "./components/UploadBox";
import DocumentList from "./components/DocumentList";
import Chat from "../chat/Chat";
import api from "../../api/axios";
import { Menu, FileText, LogOut, User, Sparkles } from "lucide-react";

export default function Dashboard() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); // 🔥 backend call
      navigate("/login");
    } catch (err) {
      console.log("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[180px]" />

      <div className="relative z-10 flex h-screen">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
        fixed lg:relative
        inset-y-0 left-0
        z-50
        w-[320px]
        lg:w-85
        bg-white/3
        backdrop-blur-2xl
        border-r border-white/10
        transform transition-all duration-300

        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
        >
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="px-6 py-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className="
              w-12 h-12
              rounded-2xl
              bg-indigo-600
              flex items-center justify-center
              shadow-lg shadow-indigo-500/20
            "
                >
                  <Sparkles size={20} />
                </div>

                <div>
                  <h1 className="font-semibold text-lg">PDF AI</h1>

                  <p className="text-xs text-slate-400">
                    Chat with your documents
                  </p>
                </div>
              </div>
            </div>

            {/* Upload */}
            <div className="p-5 border-b border-white/10">
              <div
                className="
            rounded-2xl
            bg-white/3
            border border-white/10
            p-4
          "
              >
                <UploadBox />
              </div>
            </div>

            {/* Documents */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="px-5 pt-5 pb-2">
                <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                  Documents
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto px-3 pb-4">
                <DocumentList
                  selectedDoc={selectedDoc}
                  setSelectedDoc={setSelectedDoc}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <header
            className="
    relative
    z-50

    h-20
    border-b border-white/10
    bg-slate-950/60
    backdrop-blur-xl

    flex items-center justify-between
    px-4 sm:px-6
  "
          >
            {/* Left Side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="
        lg:hidden
        w-10 h-10
        rounded-xl
        bg-white/5
        border border-white/10
        flex items-center justify-center
        hover:bg-white/10
        transition
      "
              >
                <Menu size={18} />
              </button>

              <div>
                <h2 className="font-semibold text-lg">AI Document Assistant</h2>

                <p className="text-xs text-slate-400">
                  Ask questions from your PDFs
                </p>
              </div>
            </div>

            {/* Profile */}
            <div className="relative z-60">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="
        flex items-center gap-3
        px-3 py-2
        rounded-2xl

        bg-white/5
        border border-white/10

        hover:bg-white/10
        transition-all duration-200
      "
              >
                <div
                  className="
          w-9 h-9
          rounded-xl
          bg-indigo-600

          flex items-center justify-center
          shadow-lg shadow-indigo-500/20
        "
                >
                  <User size={16} />
                </div>

                <span className="hidden sm:block text-sm">Account</span>
              </button>

              {/* Dropdown */}
              {openMenu && (
                <div
                  className="
          absolute
          right-0
          top-full
          mt-3

          w-56

          z-999

          rounded-2xl
          border border-white/10

          bg-slate-900/95
          backdrop-blur-2xl

          shadow-2xl
          overflow-hidden

          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
                >
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="
              w-full

              flex items-center gap-3

              px-4 py-3
              rounded-xl

              text-red-400

              hover:bg-red-500/10

              transition-all
            "
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Chat Area */}
          <section className="flex-1 overflow-hidden">
            {selectedDoc ? (
              <Chat documentId={selectedDoc} />
            ) : (
              <div className="h-full flex items-center justify-center p-6">
                <div className="max-w-lg text-center">
                  <div
                    className="
                  w-24 h-24
                  mx-auto
                  rounded-3xl
                  bg-indigo-600/10
                  border border-indigo-500/20
                  flex items-center justify-center
                  mb-6
                "
                  >
                    <FileText size={42} className="text-indigo-400" />
                  </div>

                  <h2 className="text-3xl font-bold mb-3">
                    Start a Conversation
                  </h2>

                  <p className="text-slate-400 leading-relaxed">
                    Upload a PDF document and ask questions, summarize content,
                    extract insights, and chat naturally with your files.
                  </p>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
