'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M14 8h2V4h-3c-3 0-5 2-5 5v3H6v4h2v4h4v-4h3l1-4h-4V9c0-.6.4-1 1-1h1z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M15 4c.4 2.5 1.8 4 4 4.3v3.4c-1.5 0-2.8-.4-4-1.2V16a5 5 0 1 1-5-5c.4 0 .7 0 1 .1v3.6a2 2 0 1 0 2 1.9V4h2z" />
    </svg>
  );
}

export default function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        onClose();
      }
    };

    if (mediaQuery.matches && open) {
      onClose();
    }

    mediaQuery.addEventListener('change', closeOnDesktop);

    return () => {
      mediaQuery.removeEventListener('change', closeOnDesktop);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeWithEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeWithEscape);
    };
  }, [open, onClose]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
  id="mobile-navigation"
  role="dialog"
  aria-modal="true"
  aria-label="Mobile navigation"
  className="fixed inset-0 z-[2147483647] h-[100dvh] w-screen overflow-y-auto bg-[#7A0808]/88 text-white backdrop-blur-3xl"
>
      <div className="sticky top-0 z-20 flex h-[96px] items-center justify-between border-b border-white/15 bg-[#B00D0D] px-6">
        <a
          href="#home"
          onClick={onClose}
          aria-label="Go to homepage"
          className="flex items-center"
        >
          <img
            src="/logos/logo-yellow.svg"
            alt="Food Dreamers"
            draggable={false}
            className="h-[72px] w-auto select-none"
          />
        </a>

        <button
          type="button"
          onClick={onClose}
          className="flex min-h-11 items-center justify-center rounded-full border border-white/30 px-6 text-[18px] uppercase text-white"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          Close
        </button>
      </div>

      <nav
        className="flex min-h-[calc(100dvh-96px)] flex-col px-6 pb-7"
        style={{ fontFamily: 'Anton, sans-serif' }}
      >
        <div className="flex flex-1 flex-col justify-center py-8">
          <a
            href="#home"
            onClick={onClose}
            className="border-b border-white/20 py-3 text-[42px] uppercase leading-none"
          >
            Home
          </a>

          <a
            href="work"
            onClick={onClose}
            className="border-b border-white/20 py-3 text-[42px] uppercase leading-none"
          >
            Services
          </a>


          <a
            href="/Book"
            onClick={onClose}
            className="border-b border-white/20 py-3 text-[42px] uppercase leading-none"
          >
            Our Work
          </a>

          <a
            href="/about"
            onClick={onClose}
            className="border-b border-white/20 py-3 text-[42px] uppercase leading-none"
          >
            About Us
          </a>

          <a
            href="/contact"
            onClick={onClose}
            className="border-b border-white/20 py-3 text-[42px] uppercase leading-none text-[#FFE3AC]"
          >
            Contact
          </a>
        </div>

        <div className="flex items-center justify-between border-t border-white/20 pt-5">
          <p className="text-[18px] uppercase tracking-[0.18em] text-white/60">
            Follow us
          </p>

          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center"
            >
              <InstagramIcon />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center"
            >
              <FacebookIcon />
            </a>

            <a
              href="#"
              aria-label="TikTok"
              className="flex h-11 w-11 items-center justify-center"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>
      </nav>
    </div>,
    document.body
  );
}