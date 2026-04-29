"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Layers,
} from "lucide-react";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      if (res.success) {
        dispatch(setUser({ user: res.data, token: res.token }));
        router.push("/");
      } else {
        setErrorMsg(res.message || "Login failed");
      }
    } catch (err: any) {
      setErrorMsg(
        err?.data?.message || "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-secondary flex-col justify-between p-14">
        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Layers className="w-5 h-5 text-background" />
          </div>
          <span className="text-background text-lg font-semibold tracking-tight">
            MegaMart
          </span>
        </div>

        {/* Center text */}
        <div className="relative z-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary-400 mb-5">
            Trusted by 40,000+ teams
          </p>
          <h2 className="text-5xl font-serif italic text-background leading-snug mb-5">
            Where great work{" "}
            <span className="not-italic bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              begins
            </span>{" "}
            every morning.
          </h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed max-w-xs">
            A unified workspace built for modern teams who move fast and build
            things that last.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex gap-10">
          {[
            { num: "40k+", label: "Teams" },
            { num: "99.9%", label: "Uptime" },
            { num: "150+", label: "Countries" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-2xl font-semibold text-background tracking-tight">
                {num}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="flex-1 flex items-center justify-center bg-stone-50 px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3">
              Welcome back
            </p>
            <h1 className="text-3xl font-serif text-slate-900 leading-tight mb-2">
              Sign in to your account
            </h1>
            <p className="text-sm text-slate-400 font-light">
              Don't have one?{" "}
              <Link
                href="/register"
                className="text-indigo-600 font-medium border-b border-indigo-300 hover:border-indigo-600 transition-colors duration-200"
              >
                Create for free
              </Link>
            </p>
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-lg px-4 py-3 mb-7 text-sm text-red-700">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "email"
                      ? "text-indigo-500"
                      : "text-slate-300"
                  }`}
                >
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 text-sm text-slate-800 bg-white border border-slate-200 rounded-xl outline-none placeholder:text-slate-300 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "password"
                      ? "text-indigo-500"
                      : "text-slate-300"
                  }`}
                >
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 text-sm text-slate-800 bg-white border border-slate-200 rounded-xl outline-none placeholder:text-slate-300 transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-500 transition-colors duration-200 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 rounded accent-primary cursor-pointer"
                />
                <span className="text-sm text-slate-500">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-primary font-medium hover:opacity-70 transition-opacity duration-200"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-2 py-3.5 px-6 mt-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-slate-400 leading-relaxed">
            By signing in you agree to our{" "}
            <a href="#" className="text-primary-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
