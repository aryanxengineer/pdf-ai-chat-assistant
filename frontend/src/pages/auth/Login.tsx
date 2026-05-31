import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("remember_email");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (rememberMe) {
        localStorage.setItem("remember_email", email);
      } else {
        localStorage.removeItem("remember_email");
      }

      setUser(res.data.data);
      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-600/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px]" />

      <div className="relative z-10 min-h-screen flex">
        {/* Desktop Branding */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-12">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 text-sm">
              ✨ Modern Authentication
            </div>

            <h1 className="mt-6 text-5xl font-bold text-white leading-tight">
              Welcome back to your dashboard.
            </h1>

            <p className="mt-6 text-lg text-slate-400">
              Manage projects, track analytics and collaborate
              seamlessly with your team.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full lg:w-120 flex items-center justify-center p-5 sm:p-8">
          <div className="w-full max-w-md">
            <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">

              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                  A
                </div>

                <h2 className="mt-4 text-3xl font-bold text-white">
                  Sign In
                </h2>

                <p className="text-slate-400 mt-2">
                  Continue to your account
                </p>
              </div>

              {/* Email */}
              <div className="space-y-5">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">
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
                        e.key === "Enter" && handleLogin()
                      }
                      className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
                      placeholder="••••••••"
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
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() =>
                        setRememberMe(!rememberMe)
                      }
                      className="accent-indigo-600"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-sm text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login */}
                <button
                  disabled={loading}
                  onClick={handleLogin}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {/* Register Navigation */}
                <div className="pt-4 border-t border-white/10 text-center">
                  <p className="text-sm text-slate-400">
                    Don't have an account?
                  </p>

                  <button
                    onClick={() => navigate("/register")}
                    className="mt-3 w-full py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-slate-500 mt-6">
              Secure authentication powered by JWT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}