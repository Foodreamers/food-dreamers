'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Anton } from 'next/font/google';
import Link from 'next/link';
import MobileMenu from '../components/MobileMenu';
import { SOCIAL_LINKS } from '../components/socialLinks';

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
      <path d="M6.5 8.5H3.5V18H6.5V8.5ZM5 3.8C4 3.8 3.2 4.6 3.2 5.6C3.2 6.6 4 7.4 5 7.4C6 7.4 6.8 6.6 6.8 5.6C6.8 4.6 6 3.8 5 3.8ZM11.5 8.5H8.6V18H11.6V13.3C11.6 12 11.8 10.8 13.4 10.8C15 10.8 15 12.3 15 13.4V18H18V12.8C18 10.2 17.4 8.2 14.4 8.2C13 8.2 12 9 11.5 9.8V8.5Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 5h7c3 0 4.7 1.3 4.7 3.6 0 1.5-.7 2.5-2 3.1 1.8.5 2.7 1.8 2.7 3.7C15.4 18.2 13.2 20 10 20H3V5Zm3 6h3.5c1.3 0 2.1-.6 2.1-1.7 0-1.2-.8-1.7-2.1-1.7H6V11Zm0 6.4h3.8c1.6 0 2.5-.7 2.5-2 0-1.4-.9-2.1-2.5-2.1H6v4.1ZM17 7h4v1.5h-4V7Zm5 7.8h-5.8c.1 1.8.9 2.7 2.4 2.7 1 0 1.8-.5 2.1-1.2h1.9c-.6 2-2 3-4.1 3-2.8 0-4.5-1.9-4.5-4.7 0-2.7 1.8-4.7 4.5-4.7 3 0 4.4 2.5 4.2 4.9H22Zm-5.8-1.6h3.7c-.2-1.3-.8-2-1.8-2-1.2 0-1.8.7-1.9 2Z" />
    </svg>
  );
}

/* =========================================================
   DESKTOP MANIFESTO
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
  progress: MotionValue<number>;
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
      style={{
        opacity,
        y,
        scale,
      }}
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

    <>
      Remote Production Studio
    </>,

    <>
      SPECIALIZED IN DIGITAL
      <br />
      AND COMMERCIAL PROJECTS.
    </>,

    <>
      FOR THE BIGGEST FOOD BRANDS
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
      className="relative h-[500vh] bg-transparent"
    >
      {/* DARK LAYER OVER GLOBAL VIDEO */}
      <div className="pointer-events-none absolute inset-0 bg-black/45" />

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
========================================================= */

function MobileManifestoSection() {
  const phrases = [
    <>All In One.</>,

    <>
      Remote Production Studio
    </>,

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

/* =========================================================
   ABOUT PAGE
========================================================= */

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

    mediaQuery.addEventListener(
      'change',
      updateDevice
    );

    return () => {
      mediaQuery.removeEventListener(
        'change',
        updateDevice
      );
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* =====================================================
          DESKTOP VERSION
          VIDEO BACKGROUND THROUGHOUT
      ===================================================== */}

      <div className="relative hidden md:block">

        {/* GLOBAL DESKTOP VIDEO */}
        <div className="fixed inset-0 z-0">
          <video
            src="/videos web/principal/estudio_tour.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controlsList="nodownload noremoteplayback"
            disablePictureInPicture
            className="h-full w-full object-cover"
          />

          {/* GLOBAL DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/60" />

          {/* GLOBAL DEPTH */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/65" />
        </div>

        {/* DESKTOP CONTENT */}
        <div className="relative z-10">

          {/* NAVBAR */}
          <header className="fixed left-0 top-0 z-[999] w-full bg-black/20 backdrop-blur-3xl">
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
                  whileHover={{
                    y: -2,
                  }}
                  href="/"
                  className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
                >
                  HOME
                </motion.a>

                <motion.a
                  whileHover={{
                    y: -2,
                  }}
                  href="/work"
                  className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
                >
                  SERVICES
                </motion.a>

                <motion.a
                  whileHover={{
                    y: -2,
                  }}
                  href="/Book"
                  className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
                >
                  OUR WORK
                </motion.a>

                <motion.a
                  whileHover={{
                    y: -2,
                  }}
                  href="/about"
                  className="text-lg tracking-wide text-[#FFE3AC]"
                >
                  ABOUT US
                </motion.a>

                <motion.a
                  whileHover={{
                    y: -2,
                  }}
                  href="/contact"
                  className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
                >
                  CONTACT
                </motion.a>
              </nav>

              <div className="ml-8 flex items-center gap-5 text-white">

                <motion.a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.15,
                    y: -2,
                  }}
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </motion.a>

                <motion.a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.15,
                    y: -2,
                  }}
                  aria-label="LinkedIn"
                >
                  <FacebookIcon />
                </motion.a>

                <motion.a
                  href={SOCIAL_LINKS.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.15,
                    y: -2,
                  }}
                  aria-label="Behance"
                >
                  <TikTokIcon />
                </motion.a>

              </div>
            </div>
          </header>

          {/* =====================================================
              DESKTOP HERO
          ===================================================== */}

          <section className="relative flex min-h-screen items-center overflow-hidden px-[6vw]">

            {/* LOCAL DEPTH */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-black/35" />

            <div className="relative z-10 mx-auto flex w-full max-w-[1512px] flex-col items-center text-center">

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 70,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
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
                initial={{
                  opacity: 0,
                  y: 26,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.25,
                }}
                className="mt-8 max-w-[620px] text-[24px] leading-relaxed text-white/75"
              >
                The Global Food Storytelling Brand.
              </motion.p>

            </div>
          </section>

          {/* =====================================================
              DESKTOP MANIFESTO
          ===================================================== */}

          <ManifestoSection />

          {/* =====================================================
              DESKTOP VISION
          ===================================================== */}

          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-[6vw] text-center">

            {/* LOCAL DEPTH */}
            <div className="pointer-events-none absolute inset-0 bg-black/30" />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,227,172,0.14),transparent_38%)]" />

            <div className="relative z-10 mx-auto max-w-[1200px]">

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 60,
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
                  amount: 0.45,
                }}
                className={`text-[120px] uppercase leading-[0.9] tracking-[-0.05em] ${anton.className}`}
              >
                LET&apos;S DREAM
                <br />
                TOGETHER!
              </motion.h2>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 26,
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
                  amount: 0.45,
                }}
                className="mx-auto mt-8 max-w-[620px] text-[24px] text-white/60"
              >
              </motion.p>

              <motion.a
                href="/contact"
                initial={{
                  opacity: 0,
                  y: 24,
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
                  amount: 0.45,
                }}
                className={`mt-12 inline-flex rounded-[18px] bg-[#FFE3AC] px-12 py-5 text-[24px] uppercase text-black transition hover:scale-105 ${anton.className}`}
              >
                CONTACT
              </motion.a>

            </div>
          </section>

        </div>
      </div>

      {/* =====================================================
          MOBILE VERSION
          SIN VIDEO
          SE CONSERVA COMO ESTABA
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
                aria-expanded={
                  mobileMenuOpen
                }
                aria-controls="mobile-navigation"
                aria-label="Open navigation menu"
                className="flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm uppercase text-white"
                style={{
                  fontFamily:
                    'Anton, sans-serif',
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

        {/* =====================================================
            MOBILE HERO
            NO VIDEO
        ===================================================== */}

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

        {/* =====================================================
            MOBILE VISION
            NO VIDEO
        ===================================================== */}

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
