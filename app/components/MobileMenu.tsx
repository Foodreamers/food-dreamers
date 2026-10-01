'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { SOCIAL_LINKS } from './socialLinks';

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
      <path d="M6.5 8.5H3.5V18H6.5V8.5ZM5 3.8C4 3.8 3.2 4.6 3.2 5.6C3.2 6.6 4 7.4 5 7.4C6 7.4 6.8 6.6 6.8 5.6C6.8 4.6 6 3.8 5 3.8ZM11.5 8.5H8.6V18H11.6V13.3C11.6 12 11.8 10.8 13.4 10.8C15 10.8 15 12.3 15 13.4V18H18V12.8C18 10.2 17.4 8.2 14.4 8.2C13 8.2 12 9 11.5 9.8V8.5Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M3 5h7c3 0 4.7 1.3 4.7 3.6 0 1.5-.7 2.5-2 3.1 1.8.5 2.7 1.8 2.7 3.7C15.4 18.2 13.2 20 10 20H3V5Zm3 6h3.5c1.3 0 2.1-.6 2.1-1.7 0-1.2-.8-1.7-2.1-1.7H6V11Zm0 6.4h3.8c1.6 0 2.5-.7 2.5-2 0-1.4-.9-2.1-2.5-2.1H6v4.1ZM17 7h4v1.5h-4V7Zm5 7.8h-5.8c.1 1.8.9 2.7 2.4 2.7 1 0 1.8-.5 2.1-1.2h1.9c-.6 2-2 3-4.1 3-2.8 0-4.5-1.9-4.5-4.7 0-2.7 1.8-4.7 4.5-4.7 3 0 4.4 2.5 4.2 4.9H22Zm-5.8-1.6h3.7c-.2-1.3-.8-2-1.8-2-1.2 0-1.8.7-1.9 2Z" />
    </svg>
  );
}

export default function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

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
    if (!open) return;

    const dialog = dialogRef.current;
    const previousBodyOverflow = document.body.style.overflow;

    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (
        event.shiftKey &&
        (activeElement === firstElement || !dialog.contains(activeElement))
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === lastElement || !dialog.contains(activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      const previousElement = previouslyFocusedElementRef.current;
      if (previousElement?.isConnected) previousElement.focus();
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      ref={dialogRef}
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      tabIndex={-1}
      className="fixed inset-0 z-[2147483647] h-[100dvh] w-screen overflow-y-auto bg-[#7A0808]/88 text-white backdrop-blur-3xl"
    >
      <div className="sticky top-0 z-20 flex h-[96px] items-center justify-between border-b border-white/15 bg-[#B00D0D] px-6">
        <Link
          href="/"
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
        </Link>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
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
          <Link
            href="/"
            onClick={onClose}
            className="border-b border-white/20 py-3 text-[42px] uppercase leading-none"
          >
            Home
          </Link>

          <Link
            href="/work"
            onClick={onClose}
            className="border-b border-white/20 py-3 text-[42px] uppercase leading-none"
          >
            Services
          </Link>


          <Link
            href="/Book"
            onClick={onClose}
            className="border-b border-white/20 py-3 text-[42px] uppercase leading-none"
          >
            Our Work
          </Link>

          <Link
            href="/about"
            onClick={onClose}
            className="border-b border-white/20 py-3 text-[42px] uppercase leading-none"
          >
            About Us
          </Link>

          <Link
            href="/contact"
            onClick={onClose}
            className="border-b border-white/20 py-3 text-[42px] uppercase leading-none text-[#FFE3AC]"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center justify-between border-t border-white/20 pt-5">
          <p className="text-[18px] uppercase tracking-[0.18em] text-white/60">
            Follow us
          </p>

          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center"
            >
              <InstagramIcon />
            </a>

            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center"
            >
              <FacebookIcon />
            </a>

            <a
              href={SOCIAL_LINKS.behance}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              aria-label="Behance"
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
