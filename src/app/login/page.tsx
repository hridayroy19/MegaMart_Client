/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import Image from "next/image";
import logo from "@/assets/icons/webisteLogo.png";

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
          <Image
            src={logo}
            className="text-background bg-background"
            alt="logo"
            width={150}
            height={200}
          />
        </div>

        <div className="relative z-10">
          <p className="tracking-widest uppercase text-background mb-5">
            Trusted by 40,000+ teams
          </p>
          <h2 className="text-5xl text-background leading-snug mb-5">
            Where great work{" "}
            <span className="bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              begins
            </span>{" "}
            every morning.
          </h2>
          <p className="text-background/80 text-sm font-light leading-relaxed max-w-xs">
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
              <div className="text-xs text-background/70 uppercase tracking-widest mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="flex-1 flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-10">
            <p className="uppercase tracking-widest text-primary mb-3">
              Welcome back
            </p>
            <h1 className="text-3xl text-foreground leading-tight mb-2">
              Sign in to your account
            </h1>
            <p className="text-sm text-card-foreground font-light">
              Don&apos;t have one?{" "}
              <Link
                href="/register"
                className="text-primary font-medium  hover:text-primary/80 transition-colors duration-200"
              >
                Create for free
              </Link>
            </p>
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="flex items-start gap-3 bg-background border border-danger border-l-4 border-danger rounded-lg px-4 py-3 mb-7 text-sm text-danger">
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
                      ? "text-primary"
                      : "text-card-foreground/70"
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
                  className="w-full pl-10 pr-4 py-3 text-sm text-foreground  bg-background border border-border rounded-xl outline-none placeholder:text-slate-300 transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-widest text-card-foreground mb-2"
              >
                Password
              </label>
              <div className="relative">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "password"
                      ? "text-primary"
                      : "text-card-foreground/70"
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
                  className="w-full pl-10 pr-11 py-3 text-sm text-foreground  bg-background border border-border rounded-xl outline-none placeholder:text-slate-300 transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-card-foreground/70 hover:text-primary transition-colors duration-200 focus:outline-none"
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
              className="group w-full flex items-center justify-center gap-2 py-3.5 px-6 mt-2 text-sm font-semibold text-foreground bg-primary rounded-xl hover:bg-primary/90 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
          <p className="mt-8 text-center text-xs text-foreground leading-relaxed">
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
