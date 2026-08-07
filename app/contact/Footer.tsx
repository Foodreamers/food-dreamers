'use client';

import { motion } from 'framer-motion';
import { Anton } from 'next/font/google';

export default function Footer() {
  return (
   <footer className="relative overflow-hidden bg-[#140824] px-5 pb-8 pt-16 text-white sm:px-8 lg:px-[6vw] lg:pb-10 lg:pt-20">
  {/* BACKGROUND */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.16),transparent_30%),radial-gradient(circle_at_80%_90%,rgba(163,255,90,0.08),transparent_30%)]" />

  <div className="relative mx-auto w-full max-w-[1512px]">
    <div className="relative z-10 flex flex-col gap-14 lg:gap-20">
      {/* TOP */}
      <div className="flex flex-col justify-between gap-14 lg:flex-row lg:gap-16">
        {/* LEFT */}
        <div className="max-w-[620px]">
          <p
            className="text-[15px] uppercase tracking-[0.22em] text-[#C084FC] sm:text-[18px]"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            FOOD DREAMERS
          </p>

          <h2
            className="mt-5 text-[48px] uppercase leading-[0.96] tracking-[-0.04em] text-white sm:text-[58px] md:text-[64px] lg:text-[72px] lg:leading-[0.98]"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            LET&apos;S CREATE
            <br />
            SOMETHING
            <br />
            UNFORGETTABLE
          </h2>

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 inline-flex min-h-[56px] items-center justify-center rounded-[14px] bg-[#C084FC] px-7 py-4 text-[19px] uppercase text-black shadow-[0_12px_40px_rgba(79,163,255,0.28)] sm:px-9 sm:text-[22px] lg:mt-10"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            START A PROJECT
          </motion.a>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-1 gap-10 text-[15px] uppercase sm:grid-cols-2 sm:gap-x-14 lg:gap-x-20 lg:gap-y-12 lg:text-[16px]">
          {/* SOCIAL */}
          <div>
            <p className="mb-5 text-[#C084FC]">Social</p>

            <div className="flex flex-col gap-3 text-white/75">
              <a
                href="#"
                className="w-fit transition-colors hover:text-white"
              >
                Instagram
              </a>

              <a
                href="#"
                className="w-fit transition-colors hover:text-white"
              >
                TikTok
              </a>

              <a
                href="#"
                className="w-fit transition-colors hover:text-white"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <p className="mb-5 text-[#C084FC]">Contact</p>

            <div className="flex flex-col gap-3 text-white/75">
              <a
                href="mailto:contacto@foodreamers.com"
                className="break-all normal-case transition-colors hover:text-white sm:break-normal"
              >
                contacto@foodreamers.com
              </a>

              <p>MEXICO CITY, MX</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-7 text-[12px] uppercase leading-relaxed text-white/40 sm:text-[14px] lg:flex-row lg:items-center lg:gap-6 lg:pt-8">
        <p>© 2026 Food Dreamers. All Rights Reserved.</p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="#"
            className="transition-colors hover:text-white/70"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="transition-colors hover:text-white/70"
          >
            Terms
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>
  );
}