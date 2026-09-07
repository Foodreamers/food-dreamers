'use client';

import { useRef, useState } from 'react';

import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

import { Anton } from 'next/font/google';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

/* =========================================================
   FOOD DREAMERS — OUR SPACE
========================================================= */

const USE_REAL_IMAGES = true;

/* =========================================================
   TYPES
========================================================= */

type EffectType =
  | 'slide-detail'
  | 'horizontal-three';

type SpaceSectionData = {
  id: string;
  title: string;
  effect: EffectType;
  images: string[];
};

/* =========================================================
   SECTIONS
========================================================= */

const sections: SpaceSectionData[] = [
  {
    id: 'photo-set',
    title: 'PHOTO SET',
    effect: 'slide-detail',
    images: [
      '/our-space/photo-set/01.webp',
      '/our-space/photo-set/02.webp',
      '/our-space/photo-set/03.webp',
    ],
  },

  {
    id: 'client-room',
    title: 'CLIENT ROOM',
    effect: 'slide-detail',
    images: [
      '/our-space/client-room/01.webp',
      '/our-space/client-room/02.webp',
    ],
  },


  {
    id: 'production-kitchen',
    title: 'PRODUCTION KITCHEN',
    effect: 'slide-detail',
    images: [
      '/our-space/production-kitchen/01.webp',
      '/our-space/production-kitchen/02.webp',
      '/our-space/production-kitchen/03.webp',
    ],
  },

  {
    id: 'dark-kitchen',
    title: 'DARK KITCHEN',
    effect: 'slide-detail',
    images: [
      '/our-space/dark-kitchen/01.webp',
      '/our-space/dark-kitchen/02.webp',
      '/our-space/dark-kitchen/03.webp',
    ],
  },

  {
    id: 'modular-kitchen',
    title: 'MODULAR KITCHEN',
    effect: 'horizontal-three',
    images: [
      '/our-space/modular-kitchen/01.webp',
      '/our-space/modular-kitchen/02.webp',
      '/our-space/modular-kitchen/03.webp',
      '/our-space/modular-kitchen/04.webp',
      '/our-space/modular-kitchen/05.webp',
      '/our-space/modular-kitchen/06.webp',
      
    ],
  },

  {
    id: 'white-kitchen',
    title: 'WHITE KITCHEN',
    effect: 'slide-detail',
    images: [
      '/our-space/white-kitchen/01.webp',
      '/our-space/white-kitchen/02.webp',
      '/our-space/white-kitchen/03.webp',
    ],
  },

  {
    id: 'rustic-kitchen',
    title: 'RUSTIC KITCHEN',
    effect: 'slide-detail',
    images: [
      '/our-space/rustic-kitchen/01.webp',
      '/our-space/rustic-kitchen/02.webp',
    ],
  },

  {
    id: 'outdoor-kitchen',
    title: 'OUTDOOR KITCHEN',
    effect: 'slide-detail',
    images: [
      '/our-space/outdoor-kitchen/01.webp',
      '/our-space/outdoor-kitchen/02.webp',
      '/our-space/outdoor-kitchen/03.webp',
    ],
  },

  {
    id: 'prop-house',
    title: 'PROP HOUSE',
    effect: 'slide-detail',
    images: [
      '/our-space/prop-house/01.webp',
      '/our-space/prop-house/02.webp',
      '/our-space/prop-house/03.webp',
    ],
  },

  {
    id: 'mobile-kitchen',
    title: 'MOBILE KITCHEN',
    effect: 'slide-detail',
    images: [
      '/our-space/mobile-kitchen/01.webp',
      '/our-space/mobile-kitchen/02.webp',
      '/our-space/mobile-kitchen/03.webp',
    ],
  },
];

/* =========================================================
   PLACEHOLDERS
========================================================= */

const gradients = [
  'linear-gradient(135deg,#171717,#575757 52%,#b9b0a1)',
  'linear-gradient(135deg,#20252a,#52616b 52%,#d1c6af)',
  'linear-gradient(135deg,#171c1a,#596a58 52%,#b9a98a)',
  'linear-gradient(135deg,#2a211c,#715848 52%,#d2b89d)',
  'linear-gradient(135deg,#171717,#3a4148 52%,#a8aaa7)',
  'linear-gradient(135deg,#292521,#77685c 52%,#cbb99e)',
  'linear-gradient(135deg,#24221c,#89806e 52%,#dfd4bf)',
];

/* =========================================================
   PHOTO SURFACE
========================================================= */

function PhotoSurface({
  src,
  index,
  label,
  className = '',
}: {
  src: string;
  index: number;
  label?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (USE_REAL_IMAGES && !failed) {
    return (
      <img
        src={src}
        alt={label || 'Food Dreamers Studio'}
        draggable={false}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background:
          gradients[index % gradients.length],
      }}
    >
      {label && (
        <div className="absolute bottom-4 left-4 rounded-full bg-black/45 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
          {label}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   NAVIGATION
========================================================= */

function SpaceNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-[100] flex w-full items-center justify-between p-5 text-white mix-blend-difference md:p-7">
        <a
          href="/"
          className="pointer-events-auto text-[12px] font-black tracking-[0.1em]"
        >
          FOOD DREAMERS
        </a>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="pointer-events-auto rounded-full border border-white/40 bg-black/10 px-4 py-2 text-[10px] uppercase tracking-[0.18em] backdrop-blur-md"
        >
          Index +
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[200] overflow-y-auto bg-[#080808]/95 px-[7vw] py-[9vh] text-white backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="fixed right-6 top-6 rounded-full border border-white/30 px-4 py-2 text-[10px] uppercase tracking-[0.16em]"
          >
            Close
          </button>

          <div className="flex min-h-full flex-col justify-center">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                className={`group flex items-baseline gap-5 border-b border-white/10 py-2 uppercase ${anton.className}`}
              >
                <span className="w-[34px] text-[12px] text-white/35">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="text-[38px] leading-[0.9] text-white/80 transition-all duration-300 group-hover:translate-x-4 group-hover:text-[#FFC400] sm:text-[55px] md:text-[72px]">
                  {section.title}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <PhotoSurface
          src="/our-space/hero/hero.webp"
          index={0}
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex w-full items-center justify-center px-[8vw]"
      >
        <img
          src="/our-space/logos/food-dreamers.webp"
          alt="Food Dreamers"
          draggable={false}
          className="h-auto w-full max-w-[850px] object-contain"
        />
      </motion.div>

      <div className="absolute bottom-8 z-10 text-[9px] uppercase tracking-[0.28em] text-white/55">
        Enter the space ↓
      </div>
    </section>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  section,
}: {
  section: SpaceSectionData;
}) {
  const isClientRoom =
    section.id === 'client-room';

  return (
    <h2
      className={`
        pointer-events-none
        absolute
        left-[5vw]
        top-[6vh]
        z-[50]
        whitespace-nowrap
        uppercase
        leading-[0.9]
        tracking-[-0.04em]
        text-white
        ${anton.className}
        ${
          isClientRoom
            ? 'text-[8vw] md:text-[5vw]'
            : 'text-[8vw] md:text-[5.5vw]'
        }
      `}
    >
      {section.title}
    </h2>
  );
}

/* =========================================================
   MAIN EFFECT
   MAIN PHOTO
   → LEFT PHOTO ENTERS
   → RIGHT PHOTO ENTERS
========================================================= */

function SlideDetailSection({
  section,
}: {
  section: SpaceSectionData;
}) {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* MAIN IMAGE */

  const mainScale = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [0.94, 1, 1.07]
  );

  /* SECOND IMAGE — ENTERS FROM LEFT */

  const leftX = useTransform(
    scrollYProgress,
    [0.12, 0.48],
    ['-45vw', '0vw']
  );

  /* THIRD IMAGE — ENTERS FROM RIGHT */

  const rightX = useTransform(
    scrollYProgress,
    [0.4, 0.76],
    ['45vw', '0vw']
  );

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="relative h-[320vh] bg-black"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black">

        <SectionTitle section={section} />

        {/* MAIN PHOTO */}

        <motion.div
          style={{
            scale: mainScale,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[72vh]
            w-[82vw]
            -translate-x-1/2
            -translate-y-1/2
            overflow-hidden
            rounded-[30px]
            shadow-[0_40px_110px_rgba(0,0,0,.55)]
            md:w-[72vw]
          "
        >
          <PhotoSurface
            src={section.images[0]}
            index={0}
            label="Main View"
          />
        </motion.div>

        {/* LEFT PHOTO */}

        {section.images[1] && (
          <motion.div
            style={{
              x: leftX,
            }}
            className="
              absolute
              bottom-[8vh]
              left-[5vw]
              z-20
              h-[32vh]
              w-[38vw]
              overflow-hidden
              rounded-[22px]
              shadow-[0_30px_80px_rgba(0,0,0,.5)]
              md:left-[7vw]
              md:h-[35vh]
              md:w-[27vw]
            "
          >
            <PhotoSurface
              src={section.images[1]}
              index={1}
              label="View 02"
            />
          </motion.div>
        )}

        {/* RIGHT PHOTO */}

        {section.images[2] && (
          <motion.div
            style={{
              x: rightX,
            }}
            className="
              absolute
              right-[5vw]
              top-[20vh]
              z-30
              h-[32vh]
              w-[38vw]
              overflow-hidden
              rounded-[22px]
              shadow-[0_30px_80px_rgba(0,0,0,.5)]
              md:h-[35vh]
              md:w-[27vw]
            "
          >
            <PhotoSurface
              src={section.images[2]}
              index={2}
              label="View 03"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   MODULAR KITCHEN
   ORIGINAL HORIZONTAL EFFECT
========================================================= */

function HorizontalThreeSection({
  section,
}: {
  section: SpaceSectionData;
}) {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const endX =
    21 -
    (section.images.length - 1) *
      62;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['8vw', `${endX}vw`]
  );

  const titleX = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', '-8vw']
  );

  const sectionHeight =
    150 +
    section.images.length * 60;

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="relative bg-black"
      style={{
        height: `${sectionHeight}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <motion.h2
          style={{
            x: titleX,
          }}
          className={`absolute left-[5vw] top-[7vh] z-20 whitespace-nowrap text-[10vw] uppercase leading-none tracking-[-0.05em] text-white ${anton.className}`}
        >
          {section.title}
        </motion.h2>

        <motion.div
          style={{ x }}
          className="absolute left-0 top-[24vh] flex items-center gap-[4vw]"
        >
          {section.images.map(
            (src, index) => (
              <motion.div
                key={src}
                className="relative h-[68vh] w-[58vw] shrink-0 overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,.4)]"
                whileHover={{
                  scale: 1.02,
                }}
              >
                <PhotoSurface
                  src={src}
                  index={index}
                  label={`View ${String(
                    index + 1
                  ).padStart(2, '0')}`}
                />
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION SWITCH
========================================================= */

function SpaceSection({
  section,
}: {
  section: SpaceSectionData;
}) {
  switch (section.effect) {
    case 'slide-detail':
      return (
        <SlideDetailSection
          section={section}
        />
      );

    case 'horizontal-three':
      return (
        <HorizontalThreeSection
          section={section}
        />
      );

    default:
      return null;
  }
}

/* =========================================================
   FINAL CTA
========================================================= */

function FinalCTA() {
  return (
    <section className="flex min-h-[85vh] items-center justify-center bg-white px-6 py-20 text-center text-[#B02D27]">
      <div className="flex w-full flex-col items-center">
        <img
          src="/our-space/logos/food-creatives.webp"
          alt="Food Creatives"
          draggable={false}
          className="h-auto w-full max-w-[850px] object-contain"
        />

        <p
          className={`mt-12 text-[38px] uppercase leading-none sm:text-[60px] ${anton.className}`}
        >
          Hungry for more?
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 text-[13px] font-bold uppercase tracking-[0.06em] sm:flex-row sm:justify-center sm:gap-8">
          <a
            href="tel:+525540991346"
            className="transition-opacity hover:opacity-50"
          >
            +52 55 4099 1346
          </a>

          <a
            href="mailto:contacto@foodreamers.com"
            className="transition-opacity hover:opacity-50"
          >
            contacto@foodreamers.com
          </a>

          <a
            href="/"
            className="transition-opacity hover:opacity-50"
          >
            WWW.FOODREAMERS.COM
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function OurSpacePage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black text-white">
      <SpaceNavigation />

      <Hero />

      {sections.map((section) => (
        <SpaceSection
          key={section.id}
          section={section}
        />
      ))}

      <FinalCTA />
    </main>
  );
}