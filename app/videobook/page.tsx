'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Anton } from 'next/font/google';
import ViewportVideo from './ViewportVideo';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

/* =========================================================
   TYPES
========================================================= */

type VideoItem = {
  title: string;
  src?: string;
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
    title: 'Demo Reel',
    src: '/videos web/principal/Demo Reel.mp4',
  },
  {
    title: 'Studio Tour',
    src: '/videos web/principal/estudio_tour.mp4',
  },
  {
    title: 'Best Moments',
    src: '/videos web/principal/best_moments.mp4',
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
      {
        title: 'HBO × José Cuervo',
        src: '/videos web/horizontal/HBO.mp4',
      },
      {
        title: 'Cereales',
        src: '/videos web/horizontal/cereales.mp4',
      },
      {
        title: 'Duncan Hines',
        src: '/videos web/horizontal/duncan_hines.mp4',
      },
      {
        title: 'Del Monte',
        src: '/video-book/FX-Del_Monte_9.mp4',
      },
    ],
  },

  {
    id: 'social-media',
    number: '02',
    title: 'SOCIAL MEDIA',
    description:
      'Short-form content designed to stop thumbs and trigger cravings.',
    videos: [
      { title: 'Nestlé — Licuachela', src: '/video-book/nestle-licuachela.mp4', vertical: true },
      { title: 'Zucosos', src: '/video-book/zucosos.mp4', vertical: true },
      { title: 'Peñafiel — CLAMATO', src: '/video-book/penafiel-mundial.mp4', vertical: true },
      { title: 'Campbells', src: '/videos web/vertical/pollo y arroz.mp4', vertical: true },
      {
        title: 'Nature´s Heart - Té Chai ASMR',
        src: '/videos web/middle ring/te_chai_asmr.mp4',
        vertical: true,
      },
      { title: 'Toak - Tequila Cask', src: '/videos web/vertical/tequila cask.mp4', vertical: true },
    ],
  },

  {
    id: 'ugc',
    number: '03',
    title: 'UGC',
    description:
      'Human, spontaneous and social-first content built to feel real.',
    videos: [
      {
        title: 'Margarita de Piña',
        src: '/videos web/vertical/margarita de piña.mp4',
        vertical: true,
      },
      { title: 'Nespresso', src: '/videos web/middle ring/nespresso.mp4', vertical: true },
      
      { title: 'Lala — Sofía Niño de Rivera', src: '/video-book/lala-sofia.mp4', vertical: true },
      {
        title: 'Afilar con Piedra',
        src: '/videos web/vertical/afilar con piedra.mp4',
        vertical: true,
      },
      {
        title: 'Herbal Essences — Real or Fake',
        src: '/video-book/Real O Fake Herbal Essences.mp4',
        vertical: true,
      },
      { title: 'SAM´S CLUB - Margarita de Sandía', src: '/video-book/margarita-sandia.mp4', vertical: true },
      
    ],
  },

  {
    id: 'long-form',
    number: '04',
    title: 'LONG FORM',
    description:
      'More time for stories, recipes, people and everything behind the food.',
    videos: [
      { title: 'Matronas — Tráiler', src: '/video-book/matronas-trailer.mp4' },

      {
        title: 'Hotcakes - Nathaly Marcus',
        src: '/video-book/10 Hotcakes.mp4',
      },
      {
        title: 'Nestlé — Intro',
        src: '/video-book/nestle-intro.mp4',
      },
      {
        title: 'Capsula Navideña',
        src: '/video-book/Video 05.mp4',
      },
    ],
  },

  {
    id: 'shopper',
    number: '05',
    title: 'SHOPPER',
    description:
      'Retail-driven content made to turn attention into action.',
    videos: [
      {
  title: 'MAHATMA',
  src: '/video-book/02 Diwali.mp4',
},
      {
        title: 'McCormick',
        src: '/videos web/horizontal/mckormick.mp4',
      },
     {
  title: "Helena's - Hummus de Pimiento",
  src: '/video-book/helenas-hummus.mp4',
},
      {
        title: 'Menú - Isadora',
        src: '/video-book/menu-shopper.mp4',
      },
    ],
  },

  {
    id: 'e-commerce',
    number: '06',
    title: 'E-COMMERCE',
    description:
      'Product-first films made to make every detail look irresistible.',
    videos: [
      {
        title: 'Frappe Mazapan',
        src: '/videos web/horizontal/frappe_mazapan.mp4',
      },
      {
        title: 'Bernina',
        src: '/videos web/horizontal/bernina.mp4',
      },
      {
        title: 'Tablas y Tapas - Tangamanga',
        src: '/videos web/vertical/tablas y tapas.mp4',
      },
      {
        title: 'Isadora',
        src: '/videos web/horizontal/isadora.mp4',
      },
    ],
  },

  {
    id: 'ai',
    number: '07',
    title: 'AI TASTE LAB',
    description:
      'New tools. New possibilities. Same obsession with making food look incredible.',
    videos: [
      {
        title: 'AI Reel',
        src: '/videos web/principal/ai-reel.mp4',
      },
      {
        title: 'CAROLINA',
        src: '/video-book/Carolina 16.9.mp4',
      },
      {
        title: 'Turmix',
        src: '/videos web/horizontal/turmix_ia.mp4',
      },
      { title: 'Prego — HOGWARTS lEGACY', src: '/video-book/prego-harry-potter.mp4' },
    ],
  },
];

/* =========================================================
   VIDEO PLAYER / PLACEHOLDER
========================================================= */

function VideoPlayer({
  video,
  className = '',
}: {
  video: VideoItem;
  className?: string;
}) {
  if (video.src) {
    return (
      <ViewportVideo
        src={video.src}
        label={video.title}
        controls
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center border border-white/10 bg-[#111] ${className}`}
    >
      <div className="flex flex-col items-center gap-4">
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
        <Link
          href="/"
          className="text-[11px] font-black uppercase tracking-[0.14em]"
        >
          Food Dreamers
        </Link>

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
      <div className="absolute inset-0">
        <ViewportVideo
          src="/videos web/principal/Demo Reel.mp4"
          label="Food Dreamers Demo Reel"
          fullscreenButton
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10 w-full">
        <h1
          className={`${anton.className} whitespace-nowrap text-[20vw] uppercase leading-[0.72] tracking-[-0.01em] md:text-[10vw]`}
        >
          Video Book
        </h1>

        <div className="mt-8 flex justify-end text-[10px] uppercase tracking-[0.18em] text-white/60">
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
            className={`${anton.className} text-[16vw] uppercase leading-[0.75] tracking-[-0.01em] md:text-[9vw]`}
          >
            The Essentials
          </h2>
        </div>

        <div className="hidden max-w-[260px] text-right text-[16px] uppercase leading-[1.6] tracking-[0.15em] text-white/40 md:block">
          Three films.
          <br />
          Three ways to know us.
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {essentials.map((video) => (
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


            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   SOCIAL MEDIA / UGC
   6 VERTICAL VIDEOS
   NO FEATURED VIDEO
========================================================= */

function VerticalCategoryVideos({
  section,
}: {
  section: VideoSection;
}) {
  return (
    <div className="mx-auto grid w-full max-w-[1400px] grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3">
      {section.videos.map((video, videoIndex) => (
        <article
          key={`${section.id}-${videoIndex}`}
        >
          <div className="mx-auto aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-[#111]">
            <VideoPlayer video={video} />
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <h3
              className={`${anton.className} text-[22px] uppercase leading-none`}
            >
              {video.title}
            </h3>

            <span className="shrink-0 text-[8px] tracking-[0.2em] text-white/25">
              {String(videoIndex + 1).padStart(2, '0')}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

/* =========================================================
   STANDARD CATEGORY
========================================================= */

function StandardCategoryVideos({
  section,
}: {
  section: VideoSection;
}) {
  const firstVideo = section.videos[0];
  const remainingVideos =
    section.videos.slice(1);

  return (
    <>
      {/* MAIN VIDEO */}

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

      {/* SECONDARY VIDEOS */}

      {remainingVideos.length > 0 && (
        <div className="mx-auto mt-[7vh] grid w-full max-w-[1400px] gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {remainingVideos.map(
            (video, videoIndex) => (
              <article
                key={`${section.id}-${videoIndex}`}
              >
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
    </>
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
  const isVerticalGrid =
    section.id === 'social-media' || section.id === 'ugc';

  return (
    <section
      id={section.id}
      className="relative overflow-hidden border-t border-white/10 bg-black px-[5vw] py-[14vh] text-white"
    >
      {/* =====================================================
          TITLE
      ===================================================== */}

      <div className="mb-[8vh] grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-end">
        <div>
          <div className="mb-3 text-[9px] tracking-[0.25em] text-white/35">
            {section.number}
          </div>

          <h2
            className={`${anton.className} whitespace-nowrap text-[15vw] uppercase leading-[0.85] tracking-[0.015em] md:text-[8vw]`}
          >
            {section.title}
          </h2>
        </div>

        <p className="max-w-[440px] text-[14px] md:text-[16px] uppercase leading-[1.8] tracking-[0.12em] text-white/45 md:justify-self-end">
          {section.description}
        </p>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      {isVerticalGrid ? (
        <VerticalCategoryVideos
          section={section}
        />
      ) : (
        <StandardCategoryVideos
          section={section}
        />
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

          <Link
            href="/"
            className="transition-opacity hover:opacity-50"
          >
            WWW.FOODREAMERS.COM
          </Link>
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