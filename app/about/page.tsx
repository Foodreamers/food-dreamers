'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Anton } from 'next/font/google';
import MobileMenu from '../components/MobileMenu';

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

/* =========================================================
   DESKTOP MANIFESTO
   ESTA PARTE CONSERVA EL EFECTO ORIGINAL
========================================================= */

function ManifestoPhrase({
  text,
  index,
  total,
  progress,
}: {
  text: React.ReactNode;
  index: number;
  total: number;
  progress: any;
}) {
  const start = index / total;
  const middle = (index + 0.5) / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    progress,
    [start, middle, end],
    [0, 1, 0]
  );

  const y = useTransform(
    progress,
    [start, middle, end],
    [70, 0, -70]
  );

  const scale = useTransform(
    progress,
    [start, middle, end],
    [0.92, 1, 0.92]
  );

  return (
    <motion.h2
      style={{ opacity, y, scale }}
      className={`absolute text-center text-[120px] uppercase leading-[0.9] tracking-[-0.05em] text-white ${anton.className}`}
    >
      {text}
    </motion.h2>
  );
}

function ManifestoSection() {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const phrases = [
    <>All In One</>,
    <> Remote Production Studio</>,
    <>
      SPECIALIZED IN DIGITAL
      <br />
      AND COMMERCIAL PROJECTS.
    </>,
    <>FOR THE BIGGEST FOOD BRANDS
    <br />
     IN THE WORLD.
     </>,
    <>
      HUNGRY FOR MORE?
    </>,
  ];

  return (
    <section
      ref={ref}
      className="relative h-[500vh] bg-[#050505]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {phrases.map((phrase, i) => (
          <ManifestoPhrase
            key={i}
            text={phrase}
            index={i}
            total={phrases.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   MOBILE MANIFESTO
   SOLO EXISTE EN MÓVIL
========================================================= */

function MobileManifestoSection() {
  const phrases = [
    <>All In One.</>,
    <>Remote Production Studio</>,
    <>
      SPECIALIZED IN DIGITAL
      <br />
      AND COMMERCIAL PRIJECTS
    </>,
    <>
      FOR THE BIGGEST FOOD BRANDS
      <br />
      IN THE WORLD
    </>,
  ];

  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,227,172,0.06),transparent_45%)]" />

      <div className="relative z-10 mx-auto max-w-[620px]">
        <p
          className={`mb-12 text-center text-[13px] uppercase tracking-[0.28em] text-[#FFE3AC]/65 ${anton.className}`}
        >
          OUR MANIFESTO
        </p>

        {phrases.map((phrase, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 45,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            className="relative flex min-h-[42vh] items-center justify-center border-t border-white/10 py-12 first:border-t-0"
          >
            <span
              className={`absolute left-0 top-5 text-[12px] tracking-[0.22em] text-[#FFE3AC]/35 ${anton.className}`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <h2
              className={`text-center text-[50px] uppercase leading-[0.9] tracking-[-0.045em] text-white ${anton.className}`}
            >
              {phrase}
            </h2>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const updateDevice = () => {
      setIsMobile(mediaQuery.matches);

      if (!mediaQuery.matches) {
        setMobileMenuOpen(false);
      }
    };

    updateDevice();

    mediaQuery.addEventListener('change', updateDevice);

    return () => {
      mediaQuery.removeEventListener('change', updateDevice);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* =====================================================
          DESKTOP VERSION
          NO MODIFICAR
      ===================================================== */}

      <div className="hidden md:block">
        <header className="fixed left-0 top-0 z-[999] w-full bg-white/5 backdrop-blur-3xl">
          <div className="flex h-[88px] w-full items-center justify-between border-b border-white/10 px-10">
            <motion.a
              href="/"
              className="relative z-[120] flex cursor-pointer items-center"
            >
              <img
                src="/logos/logo-yellow.svg"
                alt="Food Dreamers"
                draggable={false}
                className="h-[122px] w-auto select-none"
              />
            </motion.a>

            <nav
              className={`hidden items-center gap-8 md:flex ${anton.className}`}
            >
              <motion.a
                whileHover={{ y: -2 }}
                href="/"
                className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
              >
                HOME
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                href="/work"
                className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
              >
                SERVICES
              </motion.a>

          

              <motion.a
                whileHover={{ y: -2 }}
                href="/Book-"
                className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
              >
                OUR WORK
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                href="/about"
                className="text-lg tracking-wide text-[#FFE3AC]"
              >
                ABOUT US
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                href="/contact"
                className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
              >
                CONTACT
              </motion.a>
            </nav>

            <div className="ml-8 flex items-center gap-5 text-white">
              <motion.a
                href="#"
                whileHover={{ scale: 1.15, y: -2 }}
              >
                <InstagramIcon />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.15, y: -2 }}
              >
                <FacebookIcon />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.15, y: -2 }}
              >
                <TikTokIcon />
              </motion.a>
            </div>
          </div>
        </header>

        {/* DESKTOP HERO */}
        <section className="relative flex min-h-screen items-center overflow-hidden bg-black px-[6vw]">
          <div className="relative z-10 mx-auto flex w-full max-w-[1512px] flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: 'easeOut',
              }}
              className={`text-[170px] uppercase leading-[0.88] tracking-[-0.06em] ${anton.className}`}
            >
              WE ARE
              <br />
              FOOD
              <br />
              DREAMERS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.25,
              }}
              className="mt-8 max-w-[620px] text-[24px] leading-relaxed text-white/70"
            >
              The Global Food Storytelling Brand.
            </motion.p>
          </div>
        </section>

        {/* DESKTOP MANIFESTO */}
        <ManifestoSection />

        {/* DESKTOP VISION */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090909] px-[6vw] text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,227,172,0.14),transparent_38%)]" />

          <div className="relative z-10 mx-auto max-w-[1200px]">
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: 'easeOut',
              }}
              viewport={{
                once: true,
                amount: 0.45,
              }}
              className={`text-[120px] uppercase leading-[0.9] tracking-[-0.05em] ${anton.className}`}
            >
              LET'S DREAM
              <br />
              TOGETHER!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
              }}
              viewport={{
                once: true,
                amount: 0.45,
              }}
              className="mx-auto mt-8 max-w-[620px] text-[24px] text-white/60"
            >
            </motion.p>

            <motion.a
              href="/contact"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.35,
              }}
              viewport={{
                once: true,
                amount: 0.45,
              }}
              className={`mt-12 inline-flex rounded-[18px] bg-[#FFE3AC] px-12 py-5 text-[24px] uppercase text-black transition hover:scale-105 ${anton.className}`}
            >
              CONTACT
            </motion.a>
          </div>
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
            <a
              href="/"
              className="flex items-center"
            >
              <img
                src="/logos/logo-yellow.svg"
                alt="Food Dreamers"
                draggable={false}
                className="h-[72px] w-auto select-none"
              />
            </a>

            {isMobile && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
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
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* MOBILE HERO */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 pb-16 pt-24 text-center">
          <div className="relative z-10 mx-auto w-full">
            <motion.h1
              initial={{
                opacity: 0,
                y: 55,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                ease: 'easeOut',
              }}
              className={`text-[74px] uppercase leading-[0.88] tracking-[-0.055em] ${anton.className}`}
            >
              WE ARE
              <br />
              FOOD
              <br />
              DREAMERS
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.25,
              }}
              className="mx-auto mt-7 max-w-[340px] text-[17px] leading-relaxed text-white/70"
            >
              Creative Studio + AI Lab for the next generation of food brands.
            </motion.p>
          </div>
        </section>

        {/* MOBILE MANIFESTO */}
        <MobileManifestoSection />

        {/* MOBILE VISION */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090909] px-5 py-24 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,227,172,0.14),transparent_38%)]" />

          <div className="relative z-10 mx-auto">
            <motion.h2
              initial={{
                opacity: 0,
                y: 45,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                ease: 'easeOut',
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              className={`text-[52px] uppercase leading-[0.9] tracking-[-0.045em] ${anton.className}`}
            >
              THE FUTURE OF
              <br />
              FOOD MARKETING
              <br />
              IS HUMAN + AI
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.2,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              className="mx-auto mt-7 max-w-[320px] text-[18px] text-white/60"
            >
              Ready to build something remarkable?
            </motion.p>

            <motion.a
              href="/contact"
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.35,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className={`mt-10 inline-flex min-h-[56px] items-center justify-center rounded-[16px] bg-[#FFE3AC] px-8 py-4 text-[20px] uppercase text-black ${anton.className}`}
            >
              Start A Project
            </motion.a>
          </div>
        </section>
      </div>
    </main>
  );
}