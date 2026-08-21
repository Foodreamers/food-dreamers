'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { motion } from 'framer-motion';
import { Anton } from 'next/font/google';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

/* =========================================================
   TYPES
========================================================= */

type WorkAspect =
  | 'vertical'
  | 'square'
  | 'horizontal'
  | 'tall';

type WorkItem =
  | {
      type: 'video';
      src: string;
      title?: string;
      category?: string;
      aspect?: WorkAspect;
    }
  | {
      type: 'image';
      src: string;
      title?: string;
      category?: string;
      aspect?: WorkAspect;
    }
  | {
      type: 'gallery';
      images: string[];
      title?: string;
      category?: string;
      aspect?: WorkAspect;
    };

/* =========================================================
   WORK CONTENT
========================================================= */

const workItems: WorkItem[] = [
  /* =====================================================
      FEATURED — SIEMPRE ARRIBA
  ===================================================== */

  {
    type: 'video',
    src: '/videos web/principal/ai-reel.mp4',
    title: 'AI Reel',
    category: 'Featured Reel',
    aspect: 'horizontal',
  },

  {
    type: 'video',
    src: '/videos web/principal/estudio_tour.mp4',
    title: 'Studio Tour',
    category: 'Featured Reel',
    aspect: 'horizontal',
  },

  {
    type: 'video',
    src: '/videos web/principal/reel_platos.mp4',
    title: 'Food Reel',
    category: 'Featured Reel',
    aspect: 'horizontal',
  },

  {
    type: 'video',
    src: '/videos web/principal/best_moments.mp4',
    title: 'Best Moments',
    category: 'Featured Reel',
    aspect: 'horizontal',
  },

  /* =====================================================
      DESDE AQUÍ — VIDEO + PHOTOGRAPHY MEZCLADOS
  ===================================================== */

  {
    type: 'video',
    src: '/videos web/horizontal/bernina.mp4',
    title: 'Bernina',
    category: 'Commercial',
    aspect: 'horizontal',
  },

  {
    type: 'gallery',
    title: 'Alpura',
    category: 'Photography',
    aspect: 'horizontal',
    images: [
      '/fotos web/alpura/Dip de Chile.jpg',
      '/fotos web/alpura/Dip de Elote 16X9.jpg',
      '/fotos web/alpura/Quesabirrias 1x1.jpg',
      '/fotos web/alpura/Sliders 16X9.jpg',
    ],
  },

  {
    type: 'video',
    src: '/videos web/vertical/margarita de piña.mp4',
    title: 'DEFOODPEOPLE',
    category: 'Social Content',
    aspect: 'vertical',
  },

  {
    type: 'video',
    src: '/videos web/horizontal/duncan_hines.mp4',
    title: 'Duncan Hines',
    category: 'Commercial',
    aspect: 'horizontal',
  },

  {
    type: 'gallery',
    title: 'PM Cacahuate',
    category: 'Photography',
    aspect: 'vertical',
    images: [
      '/fotos web/cacahuate/Cacahuates_2.jpg',
      '/fotos web/cacahuate/Cacahuates.jpg',
      '/fotos web/cacahuate/encacahuatados_V.jpg',
    ],
  },

  {
    type: 'video',
    src: '/videos web/vertical/toque gourmet.mp4',
    title: 'TANGAMANGA',
    category: 'Social Content',
    aspect: 'vertical',
  },

  {
    type: 'video',
    src: '/videos web/horizontal/mahatma_ia.mp4',
    title: 'Mahatma',
    category: 'AI + Food',
    aspect: 'horizontal',
  },

  {
    type: 'gallery',
    title: 'Food Anxiety',
    category: 'Photography',
    aspect: 'vertical',
    images: [
      '/fotos web/food anxiety/Food anxiety0094 1 1.jpg',
      '/fotos web/food anxiety/Food anxiety0148 1.jpg',
      '/fotos web/food anxiety/Food anxiety0204 1 1.jpg',
    ],
  },

  {
    type: 'video',
    src: '/videos web/vertical/pollo y arroz.mp4',
    title: 'Campbell´s',
    category: 'Social Content',
    aspect: 'vertical',
  },

  {
    type: 'video',
    src: '/videos web/horizontal/frappe_mazapan.mp4',
    title: 'NESCAFÉ',
    category: 'Food Film',
    aspect: 'horizontal',
  },

  {
    type: 'gallery',
    title: 'JARDINES',
    category: 'Photography',
    aspect: 'vertical',
    images: [
      '/fotos web/jardines/Otoño.jpg',
      '/fotos web/jardines/Primavera.jpg',
      '/fotos web/jardines/Verano.jpg',
    ],
  },

  {
    type: 'video',
    src: '/videos web/vertical/tequila cask.mp4',
    title: 'TOAK',
    category: 'Social Content',
    aspect: 'vertical',
  },

  {
    type: 'video',
    src: '/videos web/horizontal/walmart_carolina.mp4',
    title: 'MAHATMA',
    category: 'Commercial',
    aspect: 'horizontal',
  },

  {
    type: 'gallery',
    title: 'Ligerittas',
    category: 'Photography',
    aspect: 'tall',
    images: [
      '/fotos web/ligerittas/Empaque_2.jpg',
      '/fotos web/ligerittas/Picnic.jpg',
      '/fotos web/ligerittas/Reloj.jpg',
      '/fotos web/ligerittas/texturas_2.jpg',
      '/fotos web/ligerittas/texturas.jpg',
      '/fotos web/ligerittas/Torre jenga .jpg',
      '/fotos web/ligerittas/Torre maizligeritas.jpg',
      '/fotos web/ligerittas/una ligeritta rota.jpg',
    ],
  },

  {
    type: 'video',
    src: '/videos web/vertical/tablas y tapas.mp4',
    title: 'TANGAMANGA',
    category: 'Social Content',
    aspect: 'vertical',
  },

  {
    type: 'video',
    src: '/videos web/horizontal/isadora.mp4',
    title: 'Isadora',
    category: 'Commercial',
    aspect: 'horizontal',
  },

  {
    type: 'gallery',
    title: 'Mahatma',
    category: 'Photography',
    aspect: 'horizontal',
    images: [
      '/fotos web/mahatma/Chicken biryani_5.jpg',
      '/fotos web/mahatma/red beans & rice_7.jpg',
      '/fotos web/mahatma/red beans & rice_8.jpg',
    ],
  },

  {
    type: 'video',
    src: '/videos web/middle ring/nespresso.mp4',
    title: 'Nespresso',
    category: 'Branded Content',
    aspect: 'vertical',
  },

  {
    type: 'video',
    src: '/videos web/horizontal/mckormick.mp4',
    title: 'McCormick',
    category: 'Commercial',
    aspect: 'horizontal',
  },

  {
    type: 'gallery',
    title: 'Verde Valle',
    category: 'Photography',
    aspect: 'horizontal',
    images: [
      '/fotos web/mesas verde valle/mesa_1.jpg',
      '/fotos web/mesas verde valle/mesa_2.jpg',
    ],
  },

  {
    type: 'video',
    src: '/videos web/middle ring/quaker.mp4',
    title: 'Quaker',
    category: 'Branded Content',
    aspect: 'vertical',
  },

  {
    type: 'video',
    src: '/videos web/horizontal/turmix_ia.mp4',
    title: 'Turmix',
    category: 'AI + Food',
    aspect: 'horizontal',
  },

  {
    type: 'gallery',
    title: 'Nestlé',
    category: 'Photography',
    aspect: 'horizontal',
    images: [
      '/fotos web/nestle/Nestle_1.jpg',
      '/fotos web/nestle/Nestle_2.jpg',
      '/fotos web/nestle/Nestle_3.jpg',
    ],
  },

  {
    type: 'video',
    src: '/videos web/vertical/momento improvisado.mp4',
    title: 'TANGAMANGA',
    category: 'Social Content',
    aspect: 'vertical',
  },

  {
    type: 'video',
    src: '/videos web/horizontal/vino.mp4',
    title: 'Wine',
    category: 'Food Film',
    aspect: 'horizontal',
  },

  {
    type: 'gallery',
    title: 'Peñafiel',
    category: 'Photography',
    aspect: 'vertical',
    images: [
      '/fotos web/peñafiel/Manzana asado.jpg',
      '/fotos web/peñafiel/Multi mix.jpg',
      '/fotos web/peñafiel/Sangria botana.jpg',
      '/fotos web/peñafiel/Toronja bella.jpg',
      '/fotos web/peñafiel/Toronja wraps.jpg',
    ],
  },

  {
    type: 'video',
    src: '/videos web/middle ring/te_chai_asmr.mp4',
    title: 'NATURES HEART',
    category: 'ASMR',
    aspect: 'vertical',
  },

  {
    type: 'video',
    src: '/videos web/horizontal/cereales.mp4',
    title: 'Cereales-Nestlé',
    category: 'Food Film',
    aspect: 'horizontal',
  },

  {
    type: 'gallery',
    title: 'Recetario Gamer',
    category: 'Photography',
    aspect: 'horizontal',
    images: [
      '/fotos web/recetario gamer/Carlota_1.jpg',
      '/fotos web/recetario gamer/Cheesecake_1.jpg',
      '/fotos web/recetario gamer/Lasaña en taza_1.jpg',
      '/fotos web/recetario gamer/Tarta de uva_1.jpg',
    ],
  },

  {
    type: 'video',
    src: '/videos web/vertical/afilar con piedra.mp4',
    title: 'viral content',
    category: 'Social Content',
    aspect: 'vertical',
  },

  {
    type: 'video',
    src: '/videos web/middle ring/campbells.mp4',
    title: "Campbell's",
    category: 'Branded Content',
    aspect: 'vertical',
  },

  {
    type: 'gallery',
    title: 'Tangamanga',
    category: 'Photography',
    aspect: 'vertical',
    images: [
      '/fotos web/tangamanga/CENA ROMANTICA.jpg',
      '/fotos web/tangamanga/CHORIZO EXTRA 1.jpg',
      '/fotos web/tangamanga/Foto_horizontal_m.jpg',
      '/fotos web/tangamanga/Foto_vertical_m.jpg',
    ],
  },

  {
    type: 'video',
    src: '/videos web/horizontal/mahatma_ia2.mp4',
    title: 'Mahatma AI',
    category: 'AI + Food',
    aspect: 'horizontal',
  },

  {
    type: 'video',
    src: '/videos web/middle ring/momentos_magicos.mp4',
    title: 'Tangamanga',
    category: 'Branded Content',
    aspect: 'vertical',
  },

  {
    type: 'gallery',
    title: 'Verde Valle',
    category: 'Photography',
    aspect: 'vertical',
    images: [
      '/fotos web/verdevalle/Bowl de Frijoles.jpg',
      '/fotos web/verdevalle/Chiles anchos.jpg',
      '/fotos web/verdevalle/Ensalada de arroz.jpg',
      '/fotos web/verdevalle/Medio aguacate.jpg',
      '/fotos web/verdevalle/Pollo asiático.jpg',
      '/fotos web/verdevalle/Salpicón de barbacoa.jpg',
      '/fotos web/verdevalle/Sushi en molde.jpg',
    ],
  },

  {
    type: 'video',
    src: '/timeline/tiktok.mp4',
    title: 'verde valle',
    category: 'Social Content',
    aspect: 'vertical',
  },

  {
    type: 'video',
    src: '/timeline/branded-content.mp4',
    title: 'peñafiel',
    category: 'Branded Content',
    aspect: 'horizontal',
  },

  {
    type: 'video',
    src: '/timeline/reel.mp4',
    title: 'herbal essences',
    category: 'Social Content',
    aspect: 'vertical',
  },


  {
    type: 'video',
    src: '/videos web/principal/reel_bebidas.mp4',
    title: 'Beverage Reel',
    category: 'Food Film',
    aspect: 'horizontal',
  },
];
const featuredItems = workItems.slice(0, 4);
const portfolioItems = workItems.slice(4);
/* =========================================================
   ASPECT RATIOS
========================================================= */

function getAspectClass(
  aspect?: WorkAspect
) {
  switch (aspect) {
    case 'horizontal':
      return 'aspect-[16/10]';

    case 'square':
      return 'aspect-square';

    case 'tall':
      return 'aspect-[3/5]';

    case 'vertical':
    default:
      return 'aspect-[4/5]';
  }
}

/* =========================================================
   SOCIAL ICONS
========================================================= */

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
      <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v6h4v-6h3.2l.8-4h-4V9c0-.7.3-1 1-1Z" />
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
      <path d="M16 3c.4 2.5 1.8 4 4 4.4V11c-1.7-.1-3.1-.6-4.3-1.5v6.4c0 3.4-2.4 5.8-5.8 5.8A5.6 5.6 0 0 1 4 16.1c0-3.4 2.6-5.8 6.1-5.8.4 0 .8 0 1.2.1v3.7a3 3 0 0 0-1.2-.2 2.1 2.1 0 1 0 2.1 2.1V3h3.8Z" />
    </svg>
  );
}

/* =========================================================
   SMART VIDEO
========================================================= */

function SmartWorkVideo({
  src,
}: {
  src: string;
}) {
  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const observer =
      new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (
            entry.isIntersecting &&
            entry.intersectionRatio > 0.15
          ) {
            video
              .play()
              .catch(() => {});
          } else {
            video.pause();
          }
        },
        {
          root: null,
          rootMargin: '150px 0px',
          threshold: [
            0,
            0.15,
            0.5,
          ],
        }
      );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      controlsList="nodownload noremoteplayback"
      disablePictureInPicture
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
  );
}

/* =========================================================
   PHOTO GALLERY CARD
========================================================= */

/* =========================================================
   PHOTO GALLERY CARD
   AUTO-PLAY EVERY 2 SECONDS
========================================================= */

function PhotoGalleryCard({
  item,
}: {
  item: Extract<
    WorkItem,
    { type: 'gallery' }
  >;
}) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const touchStartX =
    useRef<number | null>(null);

  const hasImages =
    item.images.length > 0;

  /* =====================================================
      AUTOMATIC CAROUSEL
      CHANGES EVERY 2 SECONDS
      INFINITE LOOP
  ===================================================== */

  useEffect(() => {
    if (item.images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((current) =>
        (current + 1) %
        item.images.length
      );
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [item.images.length]);

  /* =====================================================
      MANUAL CONTROLS
  ===================================================== */

  const previousImage = () => {
    if (!hasImages) return;

    setActiveIndex((current) =>
      current === 0
        ? item.images.length - 1
        : current - 1
    );
  };

  const nextImage = () => {
    if (!hasImages) return;

    setActiveIndex((current) =>
      current ===
      item.images.length - 1
        ? 0
        : current + 1
    );
  };

  /* =====================================================
      MOBILE SWIPE
  ===================================================== */

  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current =
      e.touches[0].clientX;
  };

  const handleTouchEnd = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    if (
      touchStartX.current === null
    ) {
      return;
    }

    const difference =
      e.changedTouches[0].clientX -
      touchStartX.current;

    if (difference > 45) {
      previousImage();
    }

    if (difference < -45) {
      nextImage();
    }

    touchStartX.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`group/gallery relative overflow-hidden rounded-[18px] border border-white/10 bg-[#111] shadow-[0_20px_55px_rgba(0,0,0,0.32)] sm:rounded-[22px] ${getAspectClass(
        item.aspect
      )}`}
    >
      {hasImages ? (
        <>
          {/* IMAGE */}
          <motion.img
            key={
              item.images[activeIndex]
            }
            src={
              item.images[activeIndex]
            }
            alt={
              item.title ||
              'Food Dreamers photography'
            }
            draggable={false}
            loading="lazy"
            decoding="async"
            initial={{
              opacity: 0,
              scale: 1.015,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.45,
              ease: 'easeOut',
            }}
            className="h-full w-full object-cover"
          />

          {/* DEPTH */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-35 transition-opacity duration-300 lg:group-hover/gallery:opacity-70" />

          {/* PREVIOUS */}
          {item.images.length > 1 && (
            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-[20px] text-white backdrop-blur-xl transition hover:bg-black/45 lg:opacity-0 lg:group-hover/gallery:opacity-100"
            >
              ‹
            </button>
          )}

          {/* NEXT */}
          {item.images.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-[20px] text-white backdrop-blur-xl transition hover:bg-black/45 lg:opacity-0 lg:group-hover/gallery:opacity-100"
            >
              ›
            </button>
          )}

          {/* COUNTER */}
          <div
            className={`absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[10px] tracking-[0.15em] text-white/80 backdrop-blur-md ${anton.className}`}
          >
            {String(
              activeIndex + 1
            ).padStart(2, '0')}
            {' / '}
            {String(
              item.images.length
            ).padStart(2, '0')}
          </div>
        </>
      ) : (
        /* EMPTY PLACEHOLDER */
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_40%,rgba(255,227,172,0.09),transparent_45%)] px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#FFE3AC]/25 text-[26px] text-[#FFE3AC]">
            +
          </div>

          <p
            className={`mt-5 text-[11px] uppercase tracking-[0.2em] text-[#FFE3AC]/70 ${anton.className}`}
          >
            Photography
          </p>

          <h3
            className={`mt-3 text-[28px] uppercase leading-none text-white/70 ${anton.className}`}
          >
            {item.title}
          </h3>

          <p className="mt-3 text-[12px] uppercase tracking-[0.16em] text-white/25">
            Photos coming soon
          </p>
        </div>
      )}

      {/* TITLE */}
      {hasImages &&
        (item.title ||
          item.category) && (
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-20 text-white sm:bottom-5 sm:left-5 sm:right-5 lg:translate-y-4 lg:opacity-0 lg:transition-all lg:duration-300 lg:group-hover/gallery:translate-y-0 lg:group-hover/gallery:opacity-100">
            {item.category && (
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#FFE3AC] sm:text-[11px]">
                {item.category}
              </p>
            )}

            {item.title && (
              <h2
                className={`mt-2 text-[24px] uppercase leading-none sm:text-[27px] ${anton.className}`}
              >
                {item.title}
              </h2>
            )}
          </div>
        )}
    </div>
  );
}
/* =========================================================
   WORK CARD
========================================================= */

function WorkCard({
  item,
  index,
  onOpenVideo,
}: {
  item: WorkItem;
  index: number;
  onOpenVideo: (
    src: string
  ) => void;
}) {
  const aspectClass =
    getAspectClass(item.aspect);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 28,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.65,
        delay: Math.min(
          (index % 4) * 0.03,
          0.12
        ),
        ease: 'easeOut',
      }}
      viewport={{
        once: true,
        amount: 0.08,
      }}
      className="group mb-4 break-inside-avoid sm:mb-5"
    >
      {/* VIDEO */}
      {item.type === 'video' && (
        <button
          type="button"
          onClick={() =>
            onOpenVideo(item.src)
          }
          aria-label={`Play ${
            item.title || 'video'
          }`}
          className={`relative block w-full overflow-hidden rounded-[18px] border border-white/10 bg-black text-left shadow-[0_20px_55px_rgba(0,0,0,0.32)] sm:rounded-[22px] ${aspectClass}`}
        >
          <SmartWorkVideo
            src={item.src}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-45 transition-opacity duration-300 lg:group-hover:opacity-80" />

          <div className="absolute left-1/2 top-1/2 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-[16px] text-white backdrop-blur-xl transition-all duration-300 sm:h-[62px] sm:w-[62px] sm:text-[18px] lg:scale-90 lg:opacity-0 lg:group-hover:scale-100 lg:group-hover:opacity-100">
            ▶
          </div>

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 backdrop-blur-md">
            <span className="h-[6px] w-[6px] rounded-full bg-[#FFE3AC]" />

            <span
              className={`text-[9px] uppercase tracking-[0.16em] text-white/70 ${anton.className}`}
            >
              Video
            </span>
          </div>

          {(item.title ||
            item.category) && (
              <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-5 sm:left-5 sm:right-5 lg:translate-y-4 lg:opacity-0 lg:transition-all lg:duration-300 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                {item.category && (
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#FFE3AC] sm:text-[11px]">
                    {item.category}
                  </p>
                )}

                {item.title && (
                  <h2
                    className={`mt-2 text-[24px] uppercase leading-none sm:text-[27px] ${anton.className}`}
                  >
                    {item.title}
                  </h2>
                )}
              </div>
            )}
        </button>
      )}

      {/* IMAGE */}
      {item.type === 'image' && (
        <div
          className={`relative overflow-hidden rounded-[18px] border border-white/10 bg-[#111] shadow-[0_20px_55px_rgba(0,0,0,0.32)] sm:rounded-[22px] ${aspectClass}`}
        >
          <img
            src={item.src}
            alt={
              item.title ||
              'Food Dreamers work'
            }
            draggable={false}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 lg:group-hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-20 transition-opacity duration-300 lg:group-hover:opacity-75" />
        </div>
      )}

      {/* PHOTO GALLERY */}
      {item.type === 'gallery' && (
        <PhotoGalleryCard
          item={item}
        />
      )}
    </motion.article>
  );
}

/* =========================================================
   BOOK PAGE
========================================================= */

export default function BookPage() {
  const [
    activeVideo,
    setActiveVideo,
  ] = useState<string | null>(
    null
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      {/* NAVBAR */}
      <header className="fixed left-0 top-0 z-[999] w-full border-b border-white/10 bg-black/20 backdrop-blur-3xl">
        <div className="flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:h-[88px] lg:px-10">
          <motion.a
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            href="/"
            className="relative z-[120] flex cursor-pointer items-center"
          >
            <img
              src="/logos/logo-yellow.svg"
              alt="Food Dreamers"
              draggable={false}
              className="h-[72px] w-auto select-none lg:h-[106px]"
            />
          </motion.a>

          <nav
            className={`hidden items-center gap-6 md:flex xl:gap-8 ${anton.className}`}
          >
            <motion.a
              whileHover={{ y: -2 }}
              href="/"
              className="text-base tracking-wide transition-colors hover:text-[#FFE3AC] xl:text-lg"
            >
              HOME
            </motion.a>

            <motion.a
              whileHover={{ y: -2 }}
              href="/work"
              className="text-base tracking-wide transition-colors hover:text-[#FFE3AC] xl:text-lg"
            >
              SERVICES
            </motion.a>

            <motion.a
              whileHover={{ y: -2 }}
              href="/Book"
              className="text-base tracking-wide text-[#FFE3AC] xl:text-lg"
            >
              OUR WORK
            </motion.a>

            <motion.a
              whileHover={{ y: -2 }}
              href="/about"
              className="text-base tracking-wide transition-colors hover:text-[#FFE3AC] xl:text-lg"
            >
              ABOUT US
            </motion.a>

            <motion.a
              whileHover={{ y: -2 }}
              href="/contact"
              className="text-base tracking-wide transition-colors hover:text-[#FFE3AC] xl:text-lg"
            >
              CONTACT
            </motion.a>
          </nav>

          <div className="hidden items-center gap-5 text-white md:flex">
            <motion.a
              href="#"
              whileHover={{
                scale: 1.15,
                y: -2,
              }}
              aria-label="Instagram"
            >
              <InstagramIcon />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{
                scale: 1.15,
                y: -2,
              }}
              aria-label="Facebook"
            >
              <FacebookIcon />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{
                scale: 1.15,
                y: -2,
              }}
              aria-label="TikTok"
            >
              <TikTokIcon />
            </motion.a>
          </div>
        </div>
      </header>

      {/* =====================================================
    HERO
===================================================== */}
<section className="relative flex min-h-[68vh] items-end overflow-hidden px-5 pb-16 pt-[140px] sm:px-8 lg:min-h-[76vh] lg:px-[6vw] lg:pb-24">

  {/* BACKGROUND VIDEO */}
  <video
    src="/videos web/principal/reel_platos.mp4"
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    controlsList="nodownload noremoteplayback"
    disablePictureInPicture
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* DARK DEPTH */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

  {/* BOTTOM DEPTH */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-black/20" />

  {/* WARM LIGHT */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,227,172,0.12),transparent_32%)]" />

  <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#FFE3AC]/5 blur-[140px]" />

  {/* CONTENT */}
  <div className="relative z-10 mx-auto w-full max-w-[1512px]">
    <motion.p
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className={`text-[12px] uppercase tracking-[0.28em] text-[#FFE3AC]/70 sm:text-[14px] ${anton.className}`}
    >
      Selected Work
    </motion.p>

    <motion.h1
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
        delay: 0.1,
        ease: 'easeOut',
      }}
      className={`mt-5 text-[72px] uppercase leading-[0.88] tracking-[-0.06em] sm:text-[100px] lg:text-[150px] ${anton.className}`}
    >
      OUR
      <br />
      WORK
    </motion.h1>

    <motion.p
      initial={{
        opacity: 0,
        y: 22,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.3,
      }}
      className="mt-7 max-w-[620px] text-[17px] leading-relaxed text-white/70 sm:text-[19px] lg:mt-8 lg:text-[21px]"
    >
      A visual book of food stories, films, campaigns,
      photography and everything we create along the way.
    </motion.p>

    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.45,
      }}
      className="mt-9 flex items-center gap-4"
    >
      <div className="h-[1px] w-12 bg-[#FFE3AC]/40" />

      <p
        className={`text-[11px] uppercase tracking-[0.22em] text-white/45 ${anton.className}`}
      >
        Scroll to explore
      </p>
    </motion.div>
  </div>
</section>

     {/* =====================================================
    OUR WORK
===================================================== */}
<section className="px-5 pb-28 sm:px-8 lg:px-[6vw]">
  <div className="mx-auto w-full max-w-[1512px]">

    {/* =====================================================
        FEATURED REELS — HORIZONTAL ROW
    ===================================================== */}
    <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
      {featuredItems.map((item, index) => (
        <WorkCard
          key={`featured-${
            item.type === 'gallery'
              ? item.title
              : item.src
          }-${index}`}
          item={item}
          index={index}
          onOpenVideo={setActiveVideo}
        />
      ))}
    </div>

    {/* =====================================================
        REST OF PORTFOLIO — MASONRY
    ===================================================== */}
    <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3 xl:columns-4">
      {portfolioItems.map((item, index) => (
        <WorkCard
          key={`portfolio-${
            item.type === 'gallery'
              ? item.title
              : item.src
          }-${index}`}
          item={item}
          index={index + 4}
          onOpenVideo={setActiveVideo}
        />
      ))}
    </div>

  </div>
</section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/10 px-5 py-24 text-center sm:px-8 lg:px-[6vw] lg:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,227,172,0.09),transparent_32%)]" />

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            ease: 'easeOut',
          }}
          className="relative z-10 mx-auto max-w-[1000px]"
        >
          <p
            className={`text-[13px] uppercase tracking-[0.24em] text-[#FFE3AC] sm:text-[16px] ${anton.className}`}
          >
            Your project could be next
          </p>

          <h2
            className={`mt-6 text-[52px] uppercase leading-[0.92] tracking-[-0.04em] text-white sm:text-[72px] lg:text-[100px] ${anton.className}`}
          >
            LET&apos;S ADD
            <br />
            YOUR PROJECT
          </h2>

          <a
            href="/contact"
            className={`mt-10 inline-flex rounded-[16px] bg-[#FFE3AC] px-9 py-4 text-[21px] uppercase text-black transition hover:scale-105 sm:px-10 sm:py-5 sm:text-[24px] ${anton.className}`}
          >
            I&apos;M READY
          </a>
        </motion.div>
      </section>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/90 px-5 backdrop-blur-md">
          <button
            type="button"
            onClick={() =>
              setActiveVideo(null)
            }
            className="absolute right-5 top-5 z-[1201] rounded-full border border-white/20 bg-white/10 px-5 py-3 text-[15px] uppercase text-white backdrop-blur-md transition hover:bg-white/20 sm:right-8 sm:top-8"
            style={{
              fontFamily:
                'Anton, sans-serif',
            }}
          >
            Close
          </button>

          <video
            src={activeVideo}
            controls
            controlsList="nodownload"
            disablePictureInPicture
            autoPlay
            playsInline
            className="max-h-[86vh] max-w-[94vw] rounded-[22px] shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
          />
        </div>
      )}
    </main>
  );
}