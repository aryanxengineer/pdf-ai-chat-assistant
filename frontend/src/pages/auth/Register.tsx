import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  // Persist draft
  useEffect(() => {
    const draft = localStorage.getItem("register_draft");

    if (draft) {
      const data = JSON.parse(draft);

      setName(data.name || "");
      setEmail(data.email || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "register_draft",
      JSON.stringify({
        name,
        email,
      })
    );
  }, [name, email]);

  const passwordStrength = () => {
    if (password.length < 6) return 25;
    if (password.length < 8) return 50;
    if (!/[A-Z]/.test(password)) return 75;
    return 100;
  };

  const handleRegister = async () => {
    if (!acceptTerms) {
      alert("Please accept terms and conditions");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.removeItem("register_draft");

      navigate("/login");
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-600/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

      <div className="relative z-10 min-h-screen flex">

        {/* Desktop Left Panel */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-12">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm">
              🚀 Start your journey
            </div>

            <h1 className="mt-6 text-5xl font-bold text-white leading-tight">
              Build, collaborate and grow faster.
            </h1>

            <p className="mt-6 text-lg text-slate-400">
              Create your account and unlock access to
              projects, analytics, and team collaboration.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="w-full lg:w-125 flex items-center justify-center p-5 sm:p-8">
          <div className="w-full max-w-md">

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">

              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                  A
                </div>

                <h2 className="mt-4 text-3xl font-bold text-white">
                  Create Account
                </h2>

                <p className="text-slate-400 mt-2">
                  Join thousands of users today
                </p>
              </div>

              <div className="space-y-5">

                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm text-slate-300">
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm text-slate-300">
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-2 text-sm text-slate-300">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      value={password}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleRegister()
                      }
                      placeholder="Create a strong password"
                      className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {/* Strength */}
                  <div className="mt-3">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength() < 50
                            ? "bg-red-500"
                            : passwordStrength() < 100
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width: `${passwordStrength()}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={() =>
                      setAcceptTerms(!acceptTerms)
                    }
                    className="mt-1 accent-indigo-600"
                  />

                  <span>
                    I agree to the Terms of Service and
                    Privacy Policy
                  </span>
                </label>

                {/* Register */}
                <button
                  disabled={loading}
                  onClick={handleRegister}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center justify-center gap-2 transition active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {/* Login Link */}
                <div className="pt-4 border-t border-white/10 text-center">
                  <p className="text-sm text-slate-400">
                    Already have an account?
                  </p>

                  <button
                    onClick={() => navigate("/login")}
                    className="mt-3 w-full py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
                  >
                    Sign In
                  </button>
                </div>

              </div>
            </div>

            <p className="text-center text-xs text-slate-500 mt-6">
              Secure account creation • Protected by JWT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}