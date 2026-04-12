"use client";

// components/contact/SendMessage.tsx
import { useState } from "react";
import { Send } from "lucide-react";

export default function SendMessage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="mt-6">
      <h3 className=" mb-3">Send a Message</h3>
      {sent && <p className="mb-3">Message sent successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-border rounded-md px-3 py-2   focus:outline-none focus:ring-1 focus:ring-secondary placeholder:text-foreground"
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-border rounded-md px-3 py-2   focus:outline-none focus:ring-1 focus:ring-secondary placeholder:text-foreground"
        />
        <textarea
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border border-border rounded-md px-3 py-2   focus:outline-none focus:ring-1 focus:ring-secondary placeholder:text-foreground resize-none"
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-primary hover:bg-secondary text-background  px-4 py-2 rounded-md transition-colors"
        >
          <Send size={14} />
          Send Message
        </button>
      </form>
    </div>
  );
}
