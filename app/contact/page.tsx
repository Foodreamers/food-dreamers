'use client';

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { motion } from 'framer-motion';
import { Anton } from 'next/font/google';
import Link from 'next/link';
import Footer from './Footer';
import MobileMenu from '../components/MobileMenu';
import { SOCIAL_LINKS } from '../components/socialLinks';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 12 16.5 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 12 14.5 2.5 2.5 0 0 0 12 9.5ZM17.75 6.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M6.5 8.5H3.5V18H6.5V8.5ZM5 3.8C4 3.8 3.2 4.6 3.2 5.6C3.2 6.6 4 7.4 5 7.4C6 7.4 6.8 6.6 6.8 5.6C6.8 4.6 6 3.8 5 3.8ZM11.5 8.5H8.6V18H11.6V13.3C11.6 12 11.8 10.8 13.4 10.8C15 10.8 15 12.3 15 13.4V18H18V12.8C18 10.2 17.4 8.2 14.4 8.2C13 8.2 12 9 11.5 9.8V8.5Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M3 5h7c3 0 4.7 1.3 4.7 3.6 0 1.5-.7 2.5-2 3.1 1.8.5 2.7 1.8 2.7 3.7C15.4 18.2 13.2 20 10 20H3V5Zm3 6h3.5c1.3 0 2.1-.6 2.1-1.7 0-1.2-.8-1.7-2.1-1.7H6V11Zm0 6.4h3.8c1.6 0 2.5-.7 2.5-2 0-1.4-.9-2.1-2.5-2.1H6v4.1ZM17 7h4v1.5h-4V7Zm5 7.8h-5.8c.1 1.8.9 2.7 2.4 2.7 1 0 1.8-.5 2.1-1.2h1.9c-.6 2-2 3-4.1 3-2.8 0-4.5-1.9-4.5-4.7 0-2.7 1.8-4.7 4.5-4.7 3 0 4.4 2.5 4.2 4.9H22Zm-5.8-1.6h3.7c-.2-1.3-.8-2-1.8-2-1.2 0-1.8.7-1.9 2Z" />
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

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(max-width: 767px)'
    );

    const updateDevice = () => {
      setIsMobile(mediaQuery.matches);

      if (!mediaQuery.matches) {
        setMobileMenuOpen(false);
      }
    };

    updateDevice();

    mediaQuery.addEventListener('change', updateDevice);

    return () => {
      mediaQuery.removeEventListener(
        'change',
        updateDevice
      );
    };
  }, []);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
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

  async function handleSubmit(event: FormEvent) {
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
          result.error ||
            'The message could not be sent.'
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
      {/* =====================================================
          DESKTOP VERSION
          SE MANTIENE INTACTA
      ===================================================== */}

      <div className="hidden md:block">
        {/* NAVBAR */}
        <header className="fixed left-0 top-0 z-[999] w-full bg-white/5 backdrop-blur-3xl">
          <div className="flex h-[88px] items-center justify-between border-b border-white/10 px-10">
            <Link href="/">
              <img
                src="/logos/logo-yellow.svg"
                className="h-[122px]"
                alt="Food Dreamers"
              />
            </Link>

            <nav
              className={`hidden gap-8 md:flex ${anton.className}`}
            >
              <Link
                href="/"
                className="hover:text-[#FFE3AC]"
              >
                HOME
              </Link>

              <a
                href="/work"
                className="hover:text-[#FFE3AC]"
              >
                SERVICES
              </a>

              <a
                href="/Book"
                className="hover:text-[#FFE3AC]"
              >
                OUR WORK
              </a>

              <a
                href="/about"
                className="hover:text-[#FFE3AC]"
              >
                ABOUT US
              </a>

              <a
                href="/contact"
                className="text-[#FFE3AC]"
              >
                CONTACT
              </a>
            </nav>

            <div className="flex gap-5">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-[#FFE3AC]"
              >
                <InstagramIcon />
              </a>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-[#FFE3AC]"
              >
                <FacebookIcon />
              </a>

              <a
                href={SOCIAL_LINKS.behance}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Behance"
                className="transition-colors hover:text-[#FFE3AC]"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>
        </header>

        {/* DESKTOP HERO */}
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
              {status === 'sending'
                ? 'Sending...'
                : 'Send Inquiry'}
            </button>

            <div
              aria-live="polite"
              className="min-h-[28px]"
            >
              {status === 'success' && (
                <p className="text-[17px] text-[#FFE3AC]">
                  Thank you. Your inquiry has been sent
                  successfully.
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
      </div>

      {/* =====================================================
          MOBILE VERSION
          SOLO < 768px
      ===================================================== */}

      <div className="md:hidden">
        {/* MOBILE NAVBAR */}
        <header className="fixed left-0 top-0 z-[999] w-full border-b border-white/10 bg-black/20 backdrop-blur-3xl">
          <div className="flex h-20 items-center justify-between px-4">
            <Link
              href="/"
              className="flex items-center"
            >
              <img
                src="/logos/logo-yellow.svg"
                alt="Food Dreamers"
                draggable={false}
                className="h-[72px] w-auto select-none"
              />
            </Link>

            {isMobile && (
              <button
                type="button"
                onClick={() =>
                  setMobileMenuOpen(true)
                }
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label="Open navigation menu"
                className="flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm uppercase text-white"
                style={{
                  fontFamily: 'Anton, sans-serif',
                }}
              >
                MENU
              </button>
            )}
          </div>
        </header>

        <MobileMenu
          open={mobileMenuOpen}
          onClose={() =>
            setMobileMenuOpen(false)
          }
        />

        {/* MOBILE CONTACT */}
        <section className="relative px-5 pb-20 pt-[130px]">
          {/* MOBILE TITLE */}
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              ease: 'easeOut',
            }}
          >
            <h1
              className={`text-[72px] uppercase leading-[0.88] tracking-[-0.055em] text-white ${anton.className}`}
            >
              START
              <br />
              YOUR
              <br />
              PROJECT
            </h1>

            <p className="mt-6 max-w-[330px] text-[17px] leading-relaxed text-white/60">
              Tell us about your idea.
              <br />
              We&apos;ll take care of the rest.
            </p>
          </motion.div>

          {/* MOBILE FORM */}
          <motion.form
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: 'easeOut',
            }}
            onSubmit={handleSubmit}
            className="mt-14 w-full"
          >
            <div className="space-y-3">
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
                maxLength={100}
                className={`w-full border-b border-white/15 bg-transparent py-5 text-[20px] text-white outline-none transition focus:border-[#FFE3AC] placeholder:text-white/30 ${anton.className}`}
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
                className={`w-full border-b border-white/15 bg-transparent py-5 text-[20px] text-white outline-none transition focus:border-[#FFE3AC] placeholder:text-white/30 ${anton.className}`}
              />

              <input
                name="company"
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                autoComplete="organization"
                maxLength={150}
                className={`w-full border-b border-white/15 bg-transparent py-5 text-[20px] text-white outline-none transition focus:border-[#FFE3AC] placeholder:text-white/30 ${anton.className}`}
              />

              <input
                name="projectType"
                type="text"
                placeholder="Project Type"
                value={formData.projectType}
                onChange={handleChange}
                maxLength={150}
                className={`w-full border-b border-white/15 bg-transparent py-5 text-[20px] text-white outline-none transition focus:border-[#FFE3AC] placeholder:text-white/30 ${anton.className}`}
              />

              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                maxLength={3000}
                className="w-full resize-none border-b border-white/15 bg-transparent py-5 text-[18px] leading-relaxed text-white outline-none transition focus:border-[#FFE3AC] placeholder:text-white/30"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className={`mt-9 flex min-h-[60px] w-full items-center justify-center rounded-[16px] bg-[#FFE3AC] px-7 py-4 text-[21px] uppercase text-black transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${anton.className}`}
            >
              {status === 'sending'
                ? 'Sending...'
                : 'Send Inquiry'}
            </button>

            <div
              aria-live="polite"
              className="mt-5 min-h-[50px]"
            >
              {status === 'success' && (
                <p className="text-[16px] leading-relaxed text-[#FFE3AC]">
                  Thank you. Your inquiry has been sent
                  successfully.
                </p>
              )}

              {status === 'error' && (
                <p className="text-[16px] leading-relaxed text-red-400">
                  {errorMessage}
                </p>
              )}
            </div>
          </motion.form>

          {/* DIRECT EMAIL */}
          <div className="mt-10 border-t border-white/10 pt-8">
            <p
              className={`text-[13px] uppercase tracking-[0.2em] text-white/35 ${anton.className}`}
            >
              OR EMAIL US DIRECTLY
            </p>

            <a
              href="mailto:contacto@foodreamers.com"
              className={`mt-3 inline-block text-[20px] text-[#FFE3AC] ${anton.className}`}
            >
              contacto@foodreamers.com
            </a>
          </div>
        </section>
      </div>

      {/* SHARED FOOTER */}
      <Footer />
    </main>
  );
}
