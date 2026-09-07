'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Anton } from 'next/font/google';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

/* =========================================================
   TYPES
========================================================= */

type VideoItem = {
  title: string;
  vertical?: boolean;
};

type VideoSection = {
  id: string;
  number: string;
  title: string;
  description: string;
  videos: VideoItem[];
};

/* =========================================================
   THE ESSENTIALS
========================================================= */

const essentials: VideoItem[] = [
  {
    title: 'Studio Tour',
  },
  {
    title: 'Showreel',
  },
  {
    title: 'Best Moments',
  },
];

/* =========================================================
   VIDEO SECTIONS
========================================================= */

const sections: VideoSection[] = [
  {
    id: 'tv-ads',
    number: '01',
    title: 'TV ADS',
    description:
      'Big ideas. Beautiful food. Stories made for the big screen.',
    videos: [
      { title: 'Video 01' },
      { title: 'Video 02' },
      { title: 'Video 03' },
      { title: 'Video 04' },
    ],
  },

  {
    id: 'social-media',
    number: '02',
    title: 'SOCIAL MEDIA',
    description:
      'Short-form content designed to stop thumbs and trigger cravings.',
    videos: [
      { title: 'Video 01', vertical: true },
      { title: 'Video 02', vertical: true },
      { title: 'Video 03', vertical: true },
      { title: 'Video 04', vertical: true },
    ],
  },

  {
    id: 'ugc',
    number: '03',
    title: 'UGC',
    description:
      'Human, spontaneous and social-first content built to feel real.',
    videos: [
      { title: 'Video 01' },
      { title: 'Video 02' },
      { title: 'Video 03' },
    ],
  },

  {
    id: 'long-form',
    number: '04',
    title: 'LONG FORM',
    description:
      'More time for stories, recipes, people and everything behind the food.',
    videos: [
      { title: 'Video 01' },
      { title: 'Video 02' },
      { title: 'Video 03' },
    ],
  },

  {
    id: 'shopper',
    number: '05',
    title: 'SHOPPER',
    description:
      'Retail-driven content made to turn attention into action.',
    videos: [
      { title: 'Video 01' },
      { title: 'Video 02' },
      { title: 'Video 03' },
    ],
  },

  {
    id: 'e-commerce',
    number: '06',
    title: 'E-COMMERCE',
    description:
      'Product-first films made to make every detail look irresistible.',
    videos: [
      { title: 'Video 01' },
      { title: 'Video 02' },
      { title: 'Video 03' },
    ],
  },

  {
    id: 'ai',
    number: '07',
    title: 'AI',
    description:
      'New tools. New possibilities. Same obsession with making food look incredible.',
    videos: [
      { title: 'Video 01' },
      { title: 'Video 02' },
      { title: 'Video 03' },
      { title: 'Video 04' },
    ],
  },
];

/* =========================================================
   VIDEO PLACEHOLDER
========================================================= */

function VideoPlayer({
  video,
  className = '',
}: {
  video: VideoItem;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center border border-white/10 bg-[#111] ${className}`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 text-[18px] text-white/70">
          ▶
        </div>

        <span className="text-[9px] uppercase tracking-[0.22em] text-white/35">
          {video.title}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   NAVIGATION / INDEX MENU
========================================================= */

function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed left-0 top-0 z-[100] flex w-full items-center justify-between px-5 py-5 text-white mix-blend-difference md:px-8 md:py-7">
        <a
          href="/"
          className="text-[11px] font-black uppercase tracking-[0.14em]"
        >
          Food Dreamers
        </a>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-[10px] uppercase tracking-[0.22em] text-white"
        >
          Index +
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[200] overflow-y-auto bg-black/95 px-[6vw] py-[8vh] text-white backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="fixed right-6 top-6 z-[210] text-[10px] uppercase tracking-[0.2em] text-white/70"
          >
            Close
          </button>

          <div className="flex min-h-full flex-col justify-center py-10">
            <a
              href="#essentials"
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-5 border-b border-white/10 py-3"
            >
              <span className="w-[34px] text-[10px] text-white/30">
                00
              </span>

              <span
                className={`${anton.className} text-[11vw] uppercase leading-[0.85] tracking-[-0.04em] text-white/80 transition-all duration-300 group-hover:translate-x-4 group-hover:text-white md:text-[6vw]`}
              >
                The Essentials
              </span>
            </a>

            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-5 border-b border-white/10 py-3"
              >
                <span className="w-[34px] text-[10px] text-white/30">
                  {section.number}
                </span>

                <span
                  className={`${anton.className} text-[11vw] uppercase leading-[0.85] tracking-[-0.04em] text-white/80 transition-all duration-300 group-hover:translate-x-4 group-hover:text-white md:text-[6vw]`}
                >
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
    <section className="relative flex min-h-screen items-end overflow-hidden bg-black px-[5vw] pb-[8vh] text-white">
      <div className="absolute inset-0 bg-[#111]" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30" />

      <div className="relative z-10 w-full">
        <div className="mb-5 text-[9px] uppercase tracking-[0.28em] text-white/55">
          Food Dreamers presents
        </div>

        <h1
          className={`${anton.className} whitespace-nowrap text-[20vw] uppercase leading-[0.72] tracking-[-0.055em] md:text-[15vw]`}
        >
          Video Book
        </h1>

        <div className="mt-8 flex flex-col gap-4 text-[10px] uppercase tracking-[0.18em] text-white/60 md:flex-row md:items-center md:justify-between">
          <span>
            Food films for a brighter appetite
          </span>

          <span>
            Scroll to explore ↓
          </span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   THE ESSENTIALS
========================================================= */

function Essentials() {
  return (
    <section
      id="essentials"
      className="bg-black px-[5vw] py-[14vh] text-white"
    >
      <div className="mb-[7vh] flex items-end justify-between">
        <div>
          <div className="mb-3 text-[9px] uppercase tracking-[0.28em] text-white/40">
            Start here
          </div>

          <h2
            className={`${anton.className} text-[16vw] uppercase leading-[0.75] tracking-[-0.05em] md:text-[9vw]`}
          >
            The Essentials
          </h2>
        </div>

        <div className="hidden max-w-[260px] text-right text-[10px] uppercase leading-[1.6] tracking-[0.15em] text-white/40 md:block">
          Three films.
          <br />
          Three ways to know us.
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {essentials.map((video, index) => (
          <article
            key={video.title}
            className="group"
          >
            <div className="relative aspect-video overflow-hidden rounded-[20px] bg-[#111]">
              <VideoPlayer video={video} />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <h3
                className={`${anton.className} text-[26px] uppercase`}
              >
                {video.title}
              </h3>

              <span className="text-[9px] tracking-[0.2em] text-white/35">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   CATEGORY
========================================================= */

function CategorySection({
  section,
}: {
  section: VideoSection;
}) {
  const firstVideo = section.videos[0];
  const remainingVideos = section.videos.slice(1);

  return (
    <section
      id={section.id}
      className="relative overflow-hidden border-t border-white/10 bg-black px-[5vw] py-[14vh] text-white"
    >
      {/* =====================================================
          TITLE
      ===================================================== */}

      <div className="mb-[8vh] grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
        <div>
          <div className="mb-3 text-[9px] tracking-[0.25em] text-white/35">
            {section.number}
          </div>

          <h2
            className={`${anton.className} whitespace-nowrap text-[18vw] uppercase leading-[0.72] tracking-[-0.055em] md:text-[10vw]`}
          >
            {section.title}
          </h2>
        </div>

        <p className="max-w-[440px] text-[11px] uppercase leading-[1.8] tracking-[0.12em] text-white/45 md:justify-self-end">
          {section.description}
        </p>
      </div>

      {/* =====================================================
          MAIN VIDEO — ALWAYS CENTERED
      ===================================================== */}

      <div className="mx-auto w-full max-w-[1100px]">
        <div className="aspect-video overflow-hidden rounded-[26px] bg-[#111]">
          <VideoPlayer video={firstVideo} />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <h3
            className={`${anton.className} text-[30px] uppercase md:text-[38px]`}
          >
            {firstVideo.title}
          </h3>

          <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
            Featured
          </span>
        </div>
      </div>

      {/* =====================================================
          SECONDARY VIDEOS
      ===================================================== */}

      {remainingVideos.length > 0 && (
        <div className="mx-auto mt-[7vh] grid w-full max-w-[1400px] gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {remainingVideos.map(
            (video, videoIndex) => (
              <article key={`${section.id}-${videoIndex}`}>
                <div
                  className={
                    video.vertical
                      ? 'mx-auto aspect-[9/16] max-h-[72vh] overflow-hidden rounded-[20px] bg-[#111]'
                      : 'aspect-video overflow-hidden rounded-[20px] bg-[#111]'
                  }
                >
                  <VideoPlayer video={video} />
                </div>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <h3
                    className={`${anton.className} text-[22px] uppercase leading-none`}
                  >
                    {video.title}
                  </h3>

                  <span className="shrink-0 text-[8px] tracking-[0.2em] text-white/25">
                    {String(videoIndex + 2).padStart(2, '0')}
                  </span>
                </div>
              </article>
            )
          )}
        </div>
      )}
    </section>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function FinalCTA() {
  return (
    <section className="flex min-h-[90vh] items-center justify-center bg-white px-6 py-20 text-center text-[#B02D27]">
      <div className="flex w-full flex-col items-center">
        <img
          src="/our-space/logos/food-creatives.webp"
          alt="Food Creatives"
          draggable={false}
          className="h-auto w-full max-w-[850px] object-contain"
        />

        <p
          className={`${anton.className} mt-12 text-[42px] uppercase leading-none sm:text-[68px]`}
        >
          Hungry for more?
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 text-[12px] font-bold uppercase tracking-[0.07em] sm:flex-row sm:gap-8">
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

export default function VideoBookPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black text-white">
      <Navigation />

      <Hero />

      <Essentials />

      {sections.map((section) => (
        <CategorySection
          key={section.id}
          section={section}
        />
      ))}

      <FinalCTA />
    </main>
  );
}