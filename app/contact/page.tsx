"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, MessageCircle, Send, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FadeIn,
  SlideUp,
  StaggerChildren,
  StaggerItem,
} from "@/components/motion";

// ── Types ─────────────────────────────────────────────────────────────────────

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// ── Contact Info Block ────────────────────────────────────────────────────────

function ContactBlock({
  icon,
  label,
  value,
  href,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  delay?: number;
}) {
  return (
    <FadeIn direction="left" delay={delay}>
      <div className="group flex items-start gap-4 py-6 border-b border-border last:border-b-0">
        {/* Gold icon circle */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                        border border-gold/30 bg-gold/5 text-gold
                        group-hover:bg-gold group-hover:text-white transition-all duration-300"
        >
          {icon}
        </div>

        <div className="space-y-0.5">
          <p className="font-display text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {label}
          </p>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-foreground hover:text-gold transition-colors duration-200"
            >
              {value}
            </a>
          ) : (
            <p className="font-sans text-sm text-foreground">{value}</p>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

// ── Elegant Input ─────────────────────────────────────────────────────────────

function ElegantInput({
  label,
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className={cn(
          "block font-display text-xs uppercase tracking-[0.12em] mb-2 transition-colors duration-200",
          focused ? "text-gold" : "text-muted-foreground",
        )}
      >
        {label}
      </label>
      <input
        id={id}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "w-full bg-transparent text-sm text-foreground py-3 px-0",
          "border-0 border-b outline-none transition-all duration-300",
          "placeholder:text-muted-foreground/50",
          focused ? "border-b-gold" : "border-b-border",
        )}
        {...props}
      />
      {/* Gold underline grow animation */}
      <span
        className={cn(
          "absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ease-out",
          focused ? "w-full" : "w-0",
        )}
      />
    </div>
  );
}

// ── Elegant Textarea ──────────────────────────────────────────────────────────

function ElegantTextarea({
  label,
  id,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={cn(
          "block font-display text-xs uppercase tracking-[0.12em] mb-2 transition-colors duration-200",
          focused ? "text-gold" : "text-muted-foreground",
        )}
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "w-full bg-transparent text-sm text-foreground py-3 px-0 resize-none",
          "border-0 border-b outline-none transition-all duration-300",
          "placeholder:text-muted-foreground/50",
          focused ? "border-b-gold" : "border-b-border",
        )}
        {...props}
      />
      <span
        className={cn(
          "absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ease-out",
          focused ? "w-full" : "w-0",
        )}
      />
    </div>
  );
}

// ── Elegant Select ────────────────────────────────────────────────────────────

function ElegantSelect({
  label,
  id,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  options: { value: string; label: string }[];
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={cn(
          "block font-display text-xs uppercase tracking-[0.12em] mb-2 transition-colors duration-200",
          focused ? "text-gold" : "text-muted-foreground",
        )}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full bg-transparent text-sm text-foreground py-3 px-0 pr-8",
            "border-0 border-b outline-none appearance-none cursor-pointer transition-all duration-300",
            "placeholder:text-muted-foreground/50",
            focused ? "border-b-gold" : "border-b-border",
          )}
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-background">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className={cn(
            "absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors duration-200",
            focused ? "text-gold" : "text-muted-foreground",
          )}
        />
      </div>
      <span
        className={cn(
          "absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ease-out",
          focused ? "w-full" : "w-0",
        )}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-80px" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main
      className="min-h-screen bg-background"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      {/* ── Thin gold top bar ──────────────────────────────────────────────── */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative px-6 pt-24 pb-20 text-center overflow-hidden">
        {/* Decorative background motif */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 40%, #C9A84C 0%, transparent 60%)",
          }}
        />

        <FadeIn direction="up" delay={0}>
          <p className="font-display text-xs uppercase tracking-[0.25em] text-gold mb-5">
            Velvet Spark · Concierge
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight max-w-3xl mx-auto">
            We&apos;re Here to{" "}
            <span className="text-gradient-gold">Assist You</span>
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Experience the world of Velvet Spark with personalized assistance.
            Our concierge team is ready to guide you.
          </p>
        </FadeIn>

        {/* Divider */}
        <FadeIn direction="up" delay={0.3}>
          <hr className="divider-gold max-w-xs mx-auto mt-10" />
        </FadeIn>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          TWO-COLUMN: CONTACT INFO + FORM
      ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* ── LEFT: Contact Info (2/5) ──────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-0">
            <FadeIn direction="left" delay={0}>
              <h2 className="font-display text-xl font-bold text-foreground mb-1">
                Get in Touch
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Multiple ways to reach our team.
              </p>
            </FadeIn>

            <ContactBlock
              delay={0.1}
              icon={<Mail className="w-4 h-4" />}
              label="Email Us"
              value="support@velvetspark.com"
              href="mailto:support@velvetspark.com"
            />
            <ContactBlock
              delay={0.2}
              icon={<MapPin className="w-4 h-4" />}
              label="Visit Us"
              value="Model Town, Yamuna Nagar, Haryana 135001, India"
            />
            <ContactBlock
              delay={0.3}
              icon={<MessageCircle className="w-4 h-4" />}
              label="WhatsApp / Call"
              value="Chat with us on WhatsApp"
              href="https://wa.me/919876543210?text=Hello%2C%20I%27d%20like%20to%20know%20more%20about%20Velvet%20Spark."
            />

            {/* Subtle brand note */}
            <FadeIn direction="left" delay={0.4}>
              <div className="mt-10 p-5 rounded-xl border border-border bg-gold/[0.03]">
                <p className="font-display text-xs uppercase tracking-widest text-gold mb-2">
                  Hours
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monday – Saturday
                  <br />
                  10:00 AM – 7:00 PM IST
                </p>
              </div>
            </FadeIn>
          </div>

          {/* ── RIGHT: Inquiry Form (3/5) ─────────────────────────────────── */}
          <div className="lg:col-span-3">
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 48 }}
              animate={
                formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }
              }
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.15,
              }}
            >
              {submitted ? (
                /* ── Success State ───────────────────────────────────────── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center py-20 space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-2">
                    <Send className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Message Received
                  </h3>
                  <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                    Thank you for reaching out. Our concierge team will respond
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        subject: "general",
                        message: "",
                      });
                    }}
                    className="mt-4 text-xs font-display uppercase tracking-widest text-gold hover:text-gold/70 transition-colors underline underline-offset-4"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                /* ── Form ───────────────────────────────────────────────── */
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
                      Inquiry Form
                    </p>

                    <StaggerChildren stagger={0.07} delay={0.1}>
                      <StaggerItem>
                        <ElegantInput
                          label="Full Name"
                          id="name"
                          type="text"
                          placeholder="Your name"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </StaggerItem>

                      <StaggerItem className="mt-8">
                        <ElegantInput
                          label="Email Address"
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </StaggerItem>

                      <StaggerItem className="mt-8">
                        <ElegantSelect
                          label="Subject"
                          id="subject"
                          value={form.subject}
                          onChange={handleChange}
                          options={[
                            { value: "general", label: "General Inquiry" },
                            { value: "custom", label: "Custom Jewelry" },
                            { value: "order", label: "Order Status" },
                          ]}
                        />
                      </StaggerItem>

                      <StaggerItem className="mt-8">
                        <ElegantTextarea
                          label="Message"
                          id="message"
                          placeholder="Tell us how we can assist you..."
                          value={form.message}
                          onChange={handleChange}
                          required
                        />
                      </StaggerItem>
                    </StaggerChildren>
                  </div>

                  {/* Submit Button — Gold → Rose Gold on hover */}
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <button
                      type="submit"
                      disabled={loading}
                      className={cn(
                        "w-full h-12 font-display text-sm uppercase tracking-[0.15em] text-white rounded-lg",
                        "transition-all duration-300 ease-out",
                        "bg-gold hover:bg-gold-700 hover:border-gold-700 shadow-gold-sm hover:shadow-gold focus-visible:ring-gold",
                        "disabled:opacity-60 disabled:cursor-not-allowed",
                        "flex items-center justify-center gap-3",
                      )}
                      style={
                        {
                          // Fallback using raw CSS vars for safety
                          // bg-gold = #C9A84C, bg-rose-gold = #B76E79
                        }
                      }
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Inquiry
                        </>
                      )}
                    </button>
                  </motion.div>

                  <p className="text-xs text-muted-foreground text-center leading-relaxed">
                    We respect your privacy. Your information will never be
                    shared.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MAP / LOCATION SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <SlideUp delay={0.1}>
        <section className="px-6 pb-20 max-w-6xl mx-auto">
          <div className="mb-6 flex items-center gap-4">
            <hr className="divider-gold flex-1" />
            <p className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
              Our Location
            </p>
            <hr className="divider-gold flex-1" />
          </div>

          {/* Map placeholder — replace iframe src with real Google Maps embed URL */}
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-border"
            style={{ height: "420px" }}
          >
            {/* Placeholder visual until real map is integrated */}
            <div className="absolute inset-0 bg-gold/[0.04] flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <p className="font-display text-sm uppercase tracking-widest text-muted-foreground">
                Google Map
              </p>
              <p className="text-xs text-muted-foreground">
                Model Town, Yamuna Nagar, Haryana 135001
              </p>
            </div>

            {/*
              ── REAL MAP INTEGRATION ──────────────────────────────────────
              Replace the placeholder above with this iframe:

              <iframe
                src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "sepia(20%) hue-rotate(10deg) brightness(105%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            */}
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Model Town, Yamuna Nagar, Haryana 135001 · Open Mon–Sat, 10 AM – 7
            PM
          </p>
        </section>
      </SlideUp>

      {/* ── Footer thin bar ────────────────────────────────────────────────── */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      {/* <div className="py-6 text-center">
        <p className="text-xs text-muted-foreground font-display tracking-widest uppercase">
          © {new Date().getFullYear()} Velvet Spark · All Rights Reserved
        </p>
      </div> */}
    </main>
  );
}
