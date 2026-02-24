import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { useAuth } from "../../hooks/useAuth";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../hooks/useLanguage";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // --- STATE ---
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  const prevURL = location.state?.previous || "/";

  // --- HANDLERS ---
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      navigate(prevURL, { replace: true });
    } catch (err) {
      console.error("Error login", err.message);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans overflow-hidden">
      {/* LEFT SIDE: FORM */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-16 z-10">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-left duration-700">
          <Link to="/" className="inline-block mb-12 group">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="h-16 group-hover:scale-110 transition-transform"
            />
          </Link>

          <h1 className="text-3xl md:text-4xl font-black text-text mb-2">
            Welcome Back
          </h1>
          <p className="text-text/50 font-bold mb-10 tracking-widest text-xs sm:text-sm">
            Login to your Japanese journey
          </p>

          {/* ERROR DISPLAY */}
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-2xl text-error text-xs sm:text-sm font-bold tracking-widest animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black  tracking-widest text-text/40 ml-1">
                {translations[language].email}
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text/30 group-focus-within:text-primary transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  required
                  className="w-full bg-surface border border-border rounded-2xl py-4 pl-12 pr-4 text-base text-text font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black  tracking-widest text-text/40">
                  {translations[language].password}
                </label>
                <Link
                  to="/forgot"
                  className="text-xs font-black text-primary hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text/30 group-focus-within:text-primary transition-colors"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-surface border border-border rounded-2xl py-4 pl-12 pr-12 text-base text-text font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text/30 hover:text-text transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-inverted py-4 rounded-2xl font-black text-sm sm:text-base tracking-widest flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex flex-col items-center gap-1">
                  <h2 className="text-sm md:text-base font-black  tracking-[0.2em] animate-pulse">
                    {translations[language].processing}
                    <span className="text-inverted/50">...</span>
                  </h2>
                </div>
              ) : (
                <>
                  {translations[language].login}{" "}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs  font-black">
              <span className="bg-background px-4 text-text/30">
                Or Continue With
              </span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-4 border border-border rounded-2xl font-black text-text text-sm tracking-widest hover:bg-surface transition-all active:scale-95">
            <SiGoogle size={18} /> Google
          </button>

          <p className="mt-10 text-center text-sm font-bold text-text/40  tracking-tight">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-black hover:underline ml-1"
            >
              Register Free
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: VISUAL */}
      <div className="hidden md:flex flex-1 bg-primary relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/world-d.svg"
            alt="Pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center text-inverted animate-in zoom-in duration-1000">
          <h2 className="text-5xl lg:text-7xl font-black mb-6 leading-none italic">
            扉を開けて
            <br />
            始めよう
          </h2>
          <p className="text-lg lg:text-xl font-bold opacity-80 max-w-sm mx-auto">
            "Open the door and let's begin."
          </p>
          <div className="mt-12 w-24 h-1 bg-inverted mx-auto rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
