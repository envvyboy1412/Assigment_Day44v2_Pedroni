"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Container } from "./Container";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a message.");
      return;
    }
    const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
    if (wa) {
      const text = encodeURIComponent(
        `Hello, I'm ${name || "a visitor"} (${email || "no email"}).\n\n${message}`
      );
      window.open(`https://wa.me/${wa.replace(/\D/g, "")}?text=${text}`, "_blank");
      toast.success("Opening WhatsApp…");
    } else {
      toast.success(
        "Thanks for your message. Add NEXT_PUBLIC_WHATSAPP_NUMBER in .env to open WhatsApp from here."
      );
    }
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Contact
          </h2>
          <p className="mt-3 text-stone-600">
            Tell us about quantity, timeline, and garment type — we&apos;ll respond with next steps.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-stone-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-amber-800 py-3 text-sm font-semibold text-white transition hover:bg-amber-900 sm:w-auto sm:px-10"
            >
              Send inquiry
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
