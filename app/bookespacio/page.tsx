'use client';

import { useRef, useState } from 'react';

import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValueEvent,
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
  | 'triptych'
  | 'single-view'
  | 'dynamic-fade'
  | 'sticky-detail'
  | 'horizontal-three';

type SpaceSectionData = {
  id: string;
  folder: string;
  title: string;
  effect: EffectType;
  images: string[];
};

/* =========================================================
   OPTIMIZED IMAGE PATHS
========================================================= */

const sections: SpaceSectionData[] = [
  {
    id: 'photo-set',
    folder: 'photo-set',
    title: 'PHOTO SET',
    effect: 'triptych',
    images: [
      '/our-space/photo-set/01.webp',
      '/our-space/photo-set/02.webp',
      '/our-space/photo-set/03.webp',
    ],
  },

  {
    id: 'client-room',
    folder: 'client-room',
    title: 'CLIENT ROOM',
    effect: 'single-view',
    images: [
      '/our-space/client-room/01.webp',
    ],
  },

  {
  id: 'dynamic-space',
  folder: 'dynamic-space',
  title: 'DYNAMIC SPACE',
  effect: 'dynamic-fade',
  images: [
    '/our-space/dynamic-space/01.webp',
    '/our-space/dynamic-space/02.webp',
    '/our-space/dynamic-space/03.webp',
  ],
},

  {
    id: 'production-kitchen',
    folder: 'production-kitchen',
    title: 'PRODUCTION KITCHEN',
    effect: 'horizontal-three',
    images: [
      '/our-space/production-kitchen/01.webp',
      '/our-space/production-kitchen/02.webp',
      '/our-space/production-kitchen/03.webp',
    ],
  },

  {
    id: 'dark-kitchen',
    folder: 'dark-kitchen',
    title: 'DARK KITCHEN',
    effect: 'triptych',
    images: [
      '/our-space/dark-kitchen/01.webp',
      '/our-space/dark-kitchen/02.webp',
      '/our-space/dark-kitchen/03.webp',
    ],
  },

  {
    id: 'modular-kitchen',
    folder: 'modular-kitchen',
    title: 'MODULAR KITCHEN',
    effect: 'horizontal-three',
    images: [
      '/our-space/modular-kitchen/01.webp',
      '/our-space/modular-kitchen/02.webp',
      '/our-space/modular-kitchen/03.webp',
      '/our-space/modular-kitchen/04.webp',
      '/our-space/modular-kitchen/05.webp',
      '/our-space/modular-kitchen/06.webp',
      '/our-space/modular-kitchen/07.webp',
    ],
  },

  {
    id: 'white-kitchen',
    folder: 'white-kitchen',
    title: 'WHITE KITCHEN',
    effect: 'sticky-detail',
    images: [
      '/our-space/white-kitchen/01.webp',
      '/our-space/white-kitchen/02.webp',
      '/our-space/white-kitchen/03.webp',
    ],
  },

  {
    id: 'rustic-kitchen',
    folder: 'rustic-kitchen',
    title: 'RUSTIC KITCHEN',
    effect: 'horizontal-three',
    images: [
      '/our-space/rustic-kitchen/01.webp',
      '/our-space/rustic-kitchen/02.webp',
    ],
  },

  {
    id: 'outdoor-kitchen',
    folder: 'outdoor-kitchen',
    title: 'OUTDOOR KITCHEN',
    effect: 'triptych',
    images: [
      '/our-space/outdoor-kitchen/01.webp',
      '/our-space/outdoor-kitchen/02.webp',
      '/our-space/outdoor-kitchen/03.webp',
    ],
  },

  {
    id: 'prop-house',
    folder: 'prop-house',
    title: 'PROP HOUSE',
    effect: 'sticky-detail',
    images: [
      '/our-space/prop-house/01.webp',
      '/our-space/prop-house/02.webp',
      '/our-space/prop-house/03.webp',
    ],
  },

  {
    id: 'mobile-kitchen',
    folder: 'mobile-kitchen',
    title: 'MOBILE KITCHEN',
    effect: 'horizontal-three',
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
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[#090909] text-white">
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
   BIG TITLE
========================================================= */

function BigTitle({
  title,
  opacity,
}: {
  title: string;
  opacity?: MotionValue<number>;
}) {
  return (
    <motion.h2
      style={{
        opacity: opacity ?? 1,
      }}
      className={`pointer-events-none absolute left-[5vw] top-[6vh] z-[50] max-w-[70vw] text-[8vw] uppercase leading-[0.9] tracking-[-0.04em] text-white md:text-[5.5vw] ${anton.className}`}
    >
      {title}
    </motion.h2>
  );
}

/* =========================================================
   EFFECT 1
   TRIPTYCH
========================================================= */

function TriptychSection({
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

  const scale1 = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [0.86, 1, 1.08]
  );

  const scale2 = useTransform(
    scrollYProgress,
    [0.12, 0.65, 1],
    [0.82, 1, 1.05]
  );

  const scale3 = useTransform(
    scrollYProgress,
    [0.22, 0.72, 1],
    [0.82, 1, 1.06]
  );

  const y1 = useTransform(
    scrollYProgress,
    [0, 1],
    ['22vh', '-3vh']
  );

  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    ['38vh', '-8vh']
  );

  const y3 = useTransform(
    scrollYProgress,
    [0, 1],
    ['48vh', '-16vh']
  );

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="relative h-[300vh] bg-[#0A0A0A]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#151515] via-[#0b0b0b] to-black" />

        <BigTitle title={section.title} />

        <motion.div
          style={{
            y: y1,
            scale: scale1,
            top: 'calc(8vh + 30px)',
          }}
          className="absolute left-[7vw] z-10 h-[68vh] w-[54vw] overflow-hidden rounded-[28px] shadow-[0_40px_100px_rgba(0,0,0,.45)]"
        >
          <PhotoSurface
            src={section.images[0]}
            index={0}
            label="View 01"
          />
        </motion.div>

        <motion.div
          style={{
            y: y2,
            scale: scale2,
          }}
          className="absolute right-[7vw] top-[12vh] z-20 h-[38vh] w-[29vw] overflow-hidden rounded-[24px] shadow-[0_35px_80px_rgba(0,0,0,.45)]"
        >
          <PhotoSurface
            src={section.images[1]}
            index={1}
            label="View 02"
          />
        </motion.div>

        <motion.div
          style={{
            y: y3,
            scale: scale3,
          }}
          className="absolute bottom-[6vh] right-[14vw] z-30 h-[34vh] w-[25vw] overflow-hidden rounded-[24px] shadow-[0_35px_80px_rgba(0,0,0,.45)]"
        >
          <PhotoSurface
            src={section.images[2]}
            index={2}
            label="View 03"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   CLIENT ROOM
========================================================= */

function SingleViewSection({
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

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.86, 1, 1.12]
  );

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ['12vh', '-8vh']
  );

  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    ['8vh', '-10vh']
  );

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.78, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="relative h-[240vh] bg-[#E8E3DA]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.h2
          style={{
            y: titleY,
            opacity: titleOpacity,
          }}
          className={`absolute left-[5vw] top-[7vh] z-20 text-[11vw] uppercase leading-[0.85] tracking-[-0.05em] text-black ${anton.className}`}
        >
          CLIENT
          <br />
          ROOM
        </motion.h2>

        <motion.div
          style={{
            scale,
            y: imageY,
          }}
          className="absolute left-1/2 top-1/2 h-[70vh] w-[76vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[30px] shadow-[0_45px_110px_rgba(0,0,0,.25)]"
        >
          <PhotoSurface
            src={section.images[0]}
            index={1}
            label="Client Room"
          />
        </motion.div>
      </div>
    </section>
  );
}



/* =========================================================
   DYNAMIC SPACE

   NUEVO SISTEMA:
   UNA SOLA FOTO ACTIVA A LA VEZ.

   0%  - 33%  → FOTO 01
   33% - 66%  → FOTO 02
   66% - 100% → FOTO 03
========================================================= */

function DynamicSpaceSection({
  section,
}: {
  section: SpaceSectionData;
}) {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(
    scrollYProgress,
    'change',
    (value) => {
      let nextIndex = 0;

      if (value >= 0.66) {
        nextIndex = 2;
      } else if (value >= 0.33) {
        nextIndex = 1;
      }

      setActiveIndex((previous) =>
        previous === nextIndex
          ? previous
          : nextIndex
      );
    }
  );

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="relative h-[480vh] bg-[#0A0A0A]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* TITLE */}

        <h2
          className={`pointer-events-none absolute left-[5vw] top-[6vh] z-[50] max-w-[75vw] text-[8vw] uppercase leading-[0.9] tracking-[-0.04em] text-white md:text-[5.5vw] ${anton.className}`}
        >
          {section.title}
        </h2>

        {/* SUBTITLE */}

        <div className="absolute left-[5vw] top-[17vh] z-[50] text-[9px] uppercase tracking-[0.25em] text-white/55">
          One space · Endless configurations
        </div>

        {/* ===============================================
            FRAME FIJO
        ================================================ */}

        <div className="absolute left-1/2 top-1/2 h-[70vh] w-[82vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[30px] bg-black shadow-[0_45px_120px_rgba(0,0,0,.45)]">

          <AnimatePresence mode="sync">
            <motion.div
              key={activeIndex}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0"
            >
              <PhotoSurface
                src={
                  section.images[
                    activeIndex
                  ]
                }
                index={activeIndex}
                label={`Configuration ${String(
                  activeIndex + 1
                ).padStart(2, '0')}`}
              />
            </motion.div>
          </AnimatePresence>

        </div>

        {/* COUNTER */}

        <div className="absolute bottom-[5vh] right-[5vw] z-[60] text-[10px] uppercase tracking-[0.2em] text-white/60">
          {String(
            activeIndex + 1
          ).padStart(2, '0')}
          {' / '}
          {String(
            section.images.length
          ).padStart(2, '0')}
        </div>

      </div>
    </section>
  );
}
/* =========================================================
   STICKY DETAIL
========================================================= */

function StickyDetailSection({
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

  const mainScale = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [0.94, 1, 1.07]
  );

  const detail1X = useTransform(
    scrollYProgress,
    [0.12, 0.5],
    ['45vw', '0vw']
  );

  const detail2X = useTransform(
    scrollYProgress,
    [0.38, 0.74],
    ['-42vw', '0vw']
  );

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="relative h-[320vh] bg-[#E9E5DE]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <h2
          className={`absolute left-[5vw] top-[6vh] z-30 text-[9vw] uppercase leading-none tracking-[-0.05em] text-black ${anton.className}`}
        >
          {section.title}
        </h2>

        <motion.div
          style={{
            scale: mainScale,
          }}
          className="absolute left-1/2 top-1/2 h-[72vh] w-[72vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[30px] shadow-[0_40px_110px_rgba(0,0,0,.22)]"
        >
          <PhotoSurface
            src={section.images[0]}
            index={0}
            label="Main View"
          />
        </motion.div>

        <motion.div
          style={{
            x: detail1X,
          }}
          className="absolute right-[5vw] top-[20vh] z-20 h-[35vh] w-[27vw] overflow-hidden rounded-[22px] shadow-[0_30px_80px_rgba(0,0,0,.28)]"
        >
          <PhotoSurface
            src={section.images[1]}
            index={1}
            label="Detail 02"
          />
        </motion.div>

        <motion.div
          style={{
            x: detail2X,
          }}
          className="absolute bottom-[8vh] left-[7vw] z-30 h-[32vh] w-[24vw] overflow-hidden rounded-[22px] shadow-[0_30px_80px_rgba(0,0,0,.28)]"
        >
          <PhotoSurface
            src={section.images[2]}
            index={2}
            label="Detail 03"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   HORIZONTAL
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
      className="relative bg-[#111]"
      style={{
        height: `${sectionHeight}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
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
    case 'triptych':
      return (
        <TriptychSection
          section={section}
        />
      );

    case 'single-view':
      return (
        <SingleViewSection
          section={section}
        />
      );

    case 'dynamic-fade':
      return (
        <DynamicSpaceSection
          section={section}
        />
      );

    case 'sticky-detail':
      return (
        <StickyDetailSection
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