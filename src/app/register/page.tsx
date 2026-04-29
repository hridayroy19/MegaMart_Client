/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import Image from "next/image";
import logo from "@/assets/icons/webisteLogo.png";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!username || !email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      if (res.success) {
        router.push("/login?registered=true");
      } else {
        setErrorMsg(res.message || "Registration failed");
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
        <div className="relative z-10 flex items-center gap-3">
          <Image
            src={logo}
            className="text-background bg-background"
            alt="logo"
            width={150}
            height={200}
          />
        </div>

        {/* Center text */}
        <div className="relative z-10">
          <p className="tracking-widest uppercase text-background mb-5">
            Join 40,000+ teams
          </p>
          <h2 className="text-5xl text-background leading-snug mb-5">
            Your journey{" "}
            <span className="not-italic bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-transparent">
              starts{" "}
            </span>
            here.
          </h2>
          <p className="text-background/70 font-light leading-relaxed max-w-xs">
            Set up your free account in seconds and unlock a workspace built for
            focus, speed, and collaboration.
          </p>

          {/* Feature list */}
          <ul className="mt-8 space-y-3">
            {[
              "No credit card required",
              "Unlimited projects on free plan",
              "Invite your team for free",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-background/80"
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20  border flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-background"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 flex gap-10">
          {[
            { num: "Free", label: "To get started" },
            { num: "2 min", label: "Setup time" },
            { num: "24/7", label: "Support" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-2xl font-semibold text-background tracking-tight">
                {num}
              </div>
              <div className="text-xs text-background/90 uppercase tracking-widest mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex-1 flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-10">
            <p className="uppercase tracking-widest text-primary mb-3">
              Get started free
            </p>
            <h2 className=" text-foreground leading-tight mb-2">
              Create your account
            </h2>
            <p className=" text-foreground/80 font-light">
              Already have one?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:text-primary/80 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="flex items-start gap-3 bg-background border border-border border-l-4 border-l-danger rounded-lg px-4 py-3 mb-7 text-sm text-danger">
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
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2"
              >
                Username
              </label>
              <div className="relative">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "username"
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  <User className="w-4 h-4" />
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="johndoe"
                  className="w-full pl-10 pr-4 py-3 text-sm text-foreground bg-background border border-border rounded-xl outline-none placeholder:text-slate-300 transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "email"
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  <Mail className="w-4 h-4" />
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
                  className="w-full pl-10 pr-4 py-3 text-sm text-foreground bg-background  border border-border rounded-xl outline-none placeholder:text-background transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-widest text-foreground mb-2"
              >
                Password
              </label>
              <div className="relative">
                <span
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                    focusedField === "password"
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 text-sm text-foreground bg-background border border-border rounded-xl outline-none placeholder:text-background transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground hover:text-primary  transition-colors duration-200 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password strength hint */}
              {password.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        password.length >= level * 3
                          ? password.length >= 12
                            ? "bg-primary"
                            : password.length >= 8
                              ? "bg-primary"
                              : "bg-primary"
                          : "bg-border"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-foreground ml-1 whitespace-nowrap">
                    {password.length >= 12
                      ? "Strong"
                      : password.length >= 8
                        ? "Fair"
                        : "Weak"}
                  </span>
                </div>
              )}
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
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-foreground leading-relaxed">
            By creating an account you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
