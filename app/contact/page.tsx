'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Anton } from 'next/font/google';
import Footer from './Footer';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 12 16.5 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 12 14.5 2.5 2.5 0 0 0 12 9.5ZM17.75 6.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v6h4v-6h3.2l.8-4h-4V9c0-.7.3-1 1-1Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 3c.4 2.5 1.8 4 4 4.4V11c-1.7-.1-3.1-.6-4.3-1.5v6.4c0 3.4-2.4 5.8-5.8 5.8A5.6 5.6 0 0 1 4 16.1c0-3.4 2.6-5.8 6.1-5.8.4 0 .8 0 1.2.1v3.7a3 3 0 0 0-1.2-.2 2.1 2.1 0 1 0 2.1 2.1V3h3.8Z" />
    </svg>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });

  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (status !== 'idle') {
      setStatus('idle');
      setErrorMessage('');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || 'The message could not be sent.'
        );
      }

      setStatus('success');

      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* NAVBAR */}
      <header className="fixed left-0 top-0 z-[999] w-full bg-white/5 backdrop-blur-3xl">
        <div className="flex h-[88px] items-center justify-between border-b border-white/10 px-10">
          <a href="/">
            <img
              src="/logos/logo-yellow.svg"
              className="h-[122px]"
              alt="Food Dreamers"
            />
          </a>

          <nav className={`hidden gap-8 md:flex ${anton.className}`}>
            <a href="/" className="hover:text-[#FFE3AC]">
              HOME
            </a>

            <a href="/#ecosystem" className="hover:text-[#FFE3AC]">
              SERVICES
            </a>

            <a href="/#ai-lab" className="hover:text-[#FFE3AC]">
              AI LAB
            </a>

            <a href="/work" className="hover:text-[#FFE3AC]">
              OUR WORK
            </a>

            <a href="/about" className="hover:text-[#FFE3AC]">
              ABOUT
            </a>

            <a href="/contact" className="text-[#FFE3AC]">
              CONTACT
            </a>
          </nav>

          <div className="flex gap-5">
            <InstagramIcon />
            <FacebookIcon />
            <TikTokIcon />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto flex min-h-screen w-full max-w-[1512px] items-center justify-between px-[6vw] pt-[120px]">
        {/* LEFT */}
        <div className="max-w-[620px]">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={`text-[150px] leading-[0.88] tracking-[-0.06em] ${anton.className}`}
          >
            START
            <br />
            YOUR
            <br />
            PROJECT
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-[480px] text-[22px] leading-relaxed text-white/65"
          >
            Tell us about your idea.
            <br />
            We&apos;ll take care of the rest.
          </motion.p>
        </div>

        {/* RIGHT */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-[520px] space-y-6"
          onSubmit={handleSubmit}
        >
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
            maxLength={100}
            className={`w-full border-b border-white/15 bg-transparent py-5 text-[22px] outline-none transition focus:border-[#FFE3AC] placeholder:text-white/30 ${anton.className}`}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
            maxLength={150}
            className={`w-full border-b border-white/15 bg-transparent py-5 text-[22px] outline-none transition focus:border-[#FFE3AC] placeholder:text-white/30 ${anton.className}`}
          />

          <input
            name="company"
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            autoComplete="organization"
            maxLength={150}
            className={`w-full border-b border-white/15 bg-transparent py-5 text-[22px] outline-none transition focus:border-[#FFE3AC] placeholder:text-white/30 ${anton.className}`}
          />

          <input
            name="projectType"
            type="text"
            placeholder="Project Type"
            value={formData.projectType}
            onChange={handleChange}
            maxLength={150}
            className={`w-full border-b border-white/15 bg-transparent py-5 text-[22px] outline-none transition focus:border-[#FFE3AC] placeholder:text-white/30 ${anton.className}`}
          />

          <textarea
            name="message"
            placeholder="Tell us about your project..."
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            maxLength={3000}
            className="w-full resize-none border-b border-white/15 bg-transparent py-5 text-[22px] outline-none transition focus:border-[#FFE3AC] placeholder:text-white/30"
          />

          <button
            type="submit"
            disabled={status === 'sending'}
            className={`mt-6 rounded-[18px] bg-[#FFE3AC] px-10 py-5 text-[24px] uppercase text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 ${anton.className}`}
          >
            {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
          </button>

          <div aria-live="polite" className="min-h-[28px]">
            {status === 'success' && (
              <p className="text-[17px] text-[#FFE3AC]">
                Thank you. Your inquiry has been sent successfully.
              </p>
            )}

            {status === 'error' && (
              <p className="text-[17px] text-red-400">
                {errorMessage}
              </p>
            )}
          </div>
        </motion.form>
      </section>

      <Footer />
    </main>
  );
}