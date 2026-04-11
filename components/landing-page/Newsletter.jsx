"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-beige py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/12 via-ivory to-rose-gold/10" />
          <div className="absolute inset-0 border border-gold/20 rounded-3xl" />

          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gold/8 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-rose-gold/8 blur-2xl" />

          <div className="relative z-10 py-16 md:py-20 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Left Text */}
            <div className="flex flex-col gap-4 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Sparkles size={16} className="text-gold" />
                <span className="font-jost text-xs tracking-[0.2em] uppercase text-gold font-medium">
                  Exclusive Offer
                </span>
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal leading-tight">
                Get <span className="text-gold italic">10% Off</span>
                <br />
                Your First Order
              </h2>
              <p className="font-jost text-sm text-charcoal/55 font-light max-w-sm">
                Subscribe to our newsletter and be the first to know about new
                arrivals, exclusive deals, and style inspiration.
              </p>
            </div>

            {/* Right Form */}
            <div className="w-full md:w-auto md:min-w-[380px]">
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.div whileFocus={{ scale: 1.01 }} className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="h-[50px] bg-ivory rounded-lg border border-gold/25  px-5 font-jost text-sm text-charcoal placeholder:text-charcoal/40 focus-visible:ring-1 focus-visible:ring-gold focus-visible:border-gold transition-all duration-200"
                    />
                  </motion.div>
                  {/* <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-ivory border border-gold/25 rounded-none px-5 py-4 font-jost text-sm text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:border-gold transition-colors duration-200"
                  /> */}
                  {/* <motion.button
                    type="submit"
                    whileHover={{ scale: 1.04, boxShadow: '0 6px 24px rgba(212,175,55,0.35)' }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 bg-gold text-white font-jost text-sm font-medium tracking-[0.1em] uppercase px-7 py-4 whitespace-nowrap transition-all duration-200"
                  >
                    Subscribe
                    <Send size={14} />
                  </motion.button> */}
                  <motion.div
                    whileHover={{
                      scale: 1.04,
                      boxShadow: "0 6px 24px rgba(212,175,55,0.35)",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      className="flex items-center gap-2 font-jost text-sm font-medium tracking-[0.1em] uppercase px-7 py-4"
                    >
                      Subscribe
                      <Send size={14} />
                    </Button>
                  </motion.div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-ivory border border-gold/30 rounded-xl px-8 py-6 text-center"
                >
                  <div className="text-2xl mb-2">✨</div>
                  <p className="font-playfair text-lg font-semibold text-charcoal">
                    You're In!
                  </p>
                  <p className="font-jost text-sm text-charcoal/55 mt-1">
                    Your 10% discount code has been sent to{" "}
                    <span className="text-gold">{email}</span>
                  </p>
                </motion.div>
              )}
              {!submitted && (
                <p className="font-jost text-xs text-charcoal/40 mt-3 text-center sm:text-left">
                  No spam, ever. Unsubscribe anytime. 🔒
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
