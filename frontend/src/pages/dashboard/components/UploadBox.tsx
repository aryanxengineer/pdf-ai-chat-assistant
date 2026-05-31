import { useState } from "react";
import api from "../../../api/axios";
import { useQueryClient } from "@tanstack/react-query";
import { UploadCloud, FileText, CheckCircle2, Loader2 } from "lucide-react";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const queryClient = useQueryClient();

  const uploadFile = async () => {
    if (!file || uploading) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      await api.post("/documents/upload", formData);

      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });

      setFile(null);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <label className="block group cursor-pointer">
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <div
          className={`
          relative overflow-hidden
          rounded-3xl
          border border-dashed
          transition-all duration-300

          ${
            file
              ? `
                border-indigo-500/40
                bg-indigo-500/10
              `
              : `
                border-white/10
                bg-white/3
                group-hover:border-indigo-500/40
                group-hover:bg-indigo-500/5
              `
          }
        `}
        >
          {/* Glow */}
          <div
            className="
            absolute inset-0
            bg-linear-to-br
            from-indigo-500/5
            to-cyan-500/5
            opacity-0
            group-hover:opacity-100
            transition
          "
          />

          <div className="relative p-8 text-center">
            {!file ? (
              <>
                <div
                  className="
                  w-16 h-16
                  mx-auto mb-4
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  flex items-center justify-center
                "
                >
                  <UploadCloud size={28} className="text-indigo-400" />
                </div>

                <h3 className="font-semibold text-white">Upload PDF</h3>

                <p className="text-sm text-slate-400 mt-2">
                  Drag & drop your file here
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  or click to browse
                </p>

                <div className="mt-5">
                  <span
                    className="
                    px-3 py-1
                    rounded-full
                    text-xs
                    bg-white/5
                    border border-white/10
                    text-slate-400
                  "
                  >
                    PDF Documents
                  </span>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div
                  className="
                  w-16 h-16
                  mx-auto
                  rounded-2xl
                  bg-indigo-500/20
                  border border-indigo-500/20
                  flex items-center justify-center
                "
                >
                  <CheckCircle2 size={28} className="text-indigo-300" />
                </div>

                <div>
                  <div className="flex items-center justify-center gap-2">
                    <FileText size={16} className="text-indigo-300" />

                    <p className="text-sm font-medium text-white truncate max-w-55">
                      {file.name}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </label>

      {/* Upload Button */}
      <button
        onClick={uploadFile}
        disabled={!file || uploading}
        className="
        w-full
        h-12
        rounded-2xl

        bg-indigo-600
        hover:bg-indigo-500

        text-white
        font-medium

        flex items-center
        justify-center
        gap-2

        transition-all duration-300
        hover:scale-[1.01]
        active:scale-[0.99]

        disabled:opacity-50
        disabled:pointer-events-none
      "
      >
        {uploading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <UploadCloud size={18} />
            Upload Document
          </>
        )}
      </button>
    </div>
  );
}
