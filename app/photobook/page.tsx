'use client';

import { useRef, useState } from 'react';
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Anton } from 'next/font/google';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

/* =========================================================
   FOOD DREAMERS — PHOTO BOOK

   false = placeholders
   true  = fotografías reales
========================================================= */

const USE_REAL_IMAGES = false;

/* =========================================================
   TYPES
========================================================= */

type EffectType =
  | 'vertical-rain'
  | 'horizontal-carousel'
  | 'horizontal-rain';

type PhotoBookSectionData = {
  id: string;
  title: string;
  effect: EffectType;
  background: string;
  images: string[];
};

/* =========================================================
   HELPERS
========================================================= */

function makeImages(
  folder: string,
  count: number
) {
  return Array.from(
    { length: count },
    (_, index) =>
      `/photo-book/${folder}/${String(
        index + 1
      ).padStart(2, '0')}.webp`
  );
}

/* =========================================================
   BOOK CONFIGURATION

   1 → Vertical Rain
   2 → Horizontal Carousel
   3 → Horizontal Rain
========================================================= */

const sections: PhotoBookSectionData[] = [
  {
    id: 'bebidas',
    title: 'BEBIDAS',
    effect: 'vertical-rain',
    background:
      '/photo-book/bebidas/back.webp',
    images: makeImages('bebidas', 11),
  },

  {
    id: 'salado',
    title: 'SALADO',
    effect: 'horizontal-carousel',
    background:
      '/photo-book/salado/back.webp',
    images: makeImages('salado', 23),
  },

  {
    id: 'dulce',
    title: 'DULCE',
    effect: 'horizontal-rain',
    background:
      '/photo-book/dulce/back.webp',
    images: makeImages('dulce', 14),
  },

  {
    id: 'con-producto',
    title: 'CON PRODUCTO',
    effect: 'vertical-rain',
    background:
      '/photo-book/con-producto/back.webp',
    images: makeImages(
      'con-producto',
      17
    ),
  },

  {
    id: 'kids',
    title: 'KIDS',
    effect: 'horizontal-carousel',
    background:
      '/photo-book/kids/back.webp',
    images: makeImages('kids', 6),
  },

  {
    id: 'temporalidades',
    title: 'TEMPORALIDADES',
    effect: 'horizontal-rain',
    background:
      '/photo-book/temporalidades/back.webp',
    images: makeImages(
      'temporalidades',
      18
    ),
  },

  {
    id: 'creativo',
    title: 'CREATIVO',
    effect: 'vertical-rain',
    background:
      '/photo-book/creativo/back.webp',
    images: makeImages('creativo', 12),
  },
];

/* =========================================================
   PLACEHOLDERS
========================================================= */

const gradients = [
  'linear-gradient(135deg,#44221e,#c97750 52%,#e3be82)',
  'linear-gradient(135deg,#143747,#4c9798 50%,#e7ca74)',
  'linear-gradient(135deg,#7b2432,#dd8294 52%,#e7c265)',
  'linear-gradient(135deg,#1c1c1c,#704b2f 52%,#cda16d)',
  'linear-gradient(135deg,#da9fae,#718f47 52%,#e0bd63)',
  'linear-gradient(135deg,#26365e,#788db8 52%,#d3b7a4)',
  'linear-gradient(135deg,#65386f,#af7599 52%,#dbb86f)',
  'linear-gradient(135deg,#35461d,#86aa54 52%,#d5c88a)',
];

const backgroundGradients = [
  'linear-gradient(135deg,#171717,#42231f 45%,#795d3d)',
  'linear-gradient(135deg,#15282a,#54736c 55%,#b39a70)',
  'linear-gradient(135deg,#351818,#772c31 55%,#a76048)',
  'linear-gradient(135deg,#243b38,#658477 55%,#c1a67c)',
];

/* =========================================================
   PHOTO SURFACE
========================================================= */

function PhotoSurface({
  src,
  index,
  label,
  className = '',
  background = false,
}: {
  src: string;
  index: number;
  label?: string;
  className?: string;
  background?: boolean;
}) {
  const [failed, setFailed] =
    useState(false);

  if (USE_REAL_IMAGES && !failed) {
    return (
      <img
        src={src}
        alt={
          label ||
          'Food Dreamers photography'
        }
        draggable={false}
        onError={() =>
          setFailed(true)
        }
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: background
          ? backgroundGradients[
              index %
                backgroundGradients.length
            ]
          : gradients[
              index % gradients.length
            ],
      }}
    >
      {!background && label && (
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

function BookNavigation() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-[100] flex w-full items-center justify-between p-5 text-white mix-blend-difference md:p-7">
        <div className="pointer-events-auto text-[12px] font-black tracking-[0.1em]">
          FOOD DREAMERS
        </div>

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
          className="fixed inset-0 z-[200] overflow-y-auto bg-[#080808]/95 px-[7vw] py-[10vh] text-white backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={() =>
              setOpen(false)
            }
            className="fixed right-6 top-6 rounded-full border border-white/30 px-4 py-2 text-[10px] uppercase tracking-[0.16em]"
          >
            Close
          </button>

          <div className="flex min-h-full flex-col justify-center">
            {sections.map(
              (section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() =>
                    setOpen(false)
                  }
                  className={`group flex items-baseline gap-5 border-b border-white/10 py-3 uppercase transition-opacity hover:opacity-100 ${anton.className}`}
                >
                  <span className="w-[34px] text-[13px] tracking-normal text-white/35">
                    {String(
                      index + 1
                    ).padStart(2, '0')}
                  </span>

                  <span className="text-[48px] leading-[0.9] text-white/80 transition-all duration-300 group-hover:translate-x-4 group-hover:text-[#FFC400] sm:text-[70px] md:text-[92px]">
                    {section.title}
                  </span>
                </a>
              )
            )}
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
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[#080808] text-white">
      <div className="absolute inset-0">
        <PhotoSurface
          src="/photo-book/hero/hero.webp"
          index={0}
          background
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/65" />
      </div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.94,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.3,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        className="relative z-10 text-center"
      >
        <h1
          className={`text-[27vw] uppercase leading-[0.72] tracking-[-0.05em] sm:text-[19vw] ${anton.className}`}
        >
          FOOD
          <br />
          DREAMERS
        </h1>

        <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-white/65">
          Photography Book
        </p>
      </motion.div>

      <div className="absolute bottom-8 z-10 text-[9px] uppercase tracking-[0.3em] text-white/60">
        Scroll to explore ↓
      </div>
    </section>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  title,
  opacity,
}: {
  title: string;
  opacity?: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{
        opacity: opacity ?? 0.12,
      }}
      className="pointer-events-none absolute inset-0 z-[2] flex items-center overflow-hidden"
    >
      <h2
        className={`whitespace-nowrap text-[30vw] uppercase leading-[0.7] tracking-[-0.055em] text-white ${anton.className}`}
      >
        {title}
      </h2>
    </motion.div>
  );
}

/* =========================================================
   EFFECT 1
   VERTICAL RAIN

   - movimiento vertical
   - composición irregular controlada
   - fotos grandes
   - pequeño overlap
   - crecimiento progresivo
========================================================= */

function VerticalRainSection({
  section,
}: {
  section: PhotoBookSectionData;
}) {
  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        'start start',
        'end end',
      ],
    });

  const desktopRows = Math.ceil(
    section.images.length / 3
  );

  const travelDistance =
    desktopRows * 72 + 120;

  /* MOVIMIENTO VERTICAL */

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [
      '105vh',
      `-${travelDistance}vh`,
    ]
  );

  /* NUEVO:
     CRECIMIENTO PROGRESIVO */

  const photoScale =
    useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [1, 1.06, 1.12]
    );

  const titleOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.08, 0.8, 1],
      [
        0.24,
        0.13,
        0.08,
        0,
      ]
    );

  const sectionHeight =
    240 +
    section.images.length * 35;

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="relative bg-[#090909]"
      style={{
        height: `${sectionHeight}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* BACKGROUND */}

        <div className="absolute inset-0">
          <PhotoSurface
            src={section.background}
            index={
              section.images.length
            }
            background
          />

          <div className="absolute inset-0 bg-black/65" />
        </div>

        {/* TITLE */}

        <SectionTitle
          title={section.title}
          opacity={titleOpacity}
        />

        {/* PHOTO TRACK */}

        <motion.div
          style={{
            y,
            scale: photoScale,
            transformOrigin:
              'center top',
          }}
          className="
            absolute
            left-1/2
            top-0
            z-10
            flex
            w-[92vw]
            -translate-x-1/2
            justify-between
            gap-[4vw]
            md:w-[90vw]
            md:gap-[3vw]
          "
        >
          {[0, 1, 2].map(
            (lane) => {
              const laneImages =
                section.images
                  .map(
                    (
                      src,
                      index
                    ) => ({
                      src,
                      index,
                    })
                  )
                  .filter(
                    ({
                      index,
                    }) =>
                      index %
                        3 ===
                      lane
                  );

              const laneTopOffset =
                [
                  '0vh',
                  '24vh',
                  '11vh',
                ][lane];

              return (
                <div
                  key={lane}
                  className="flex w-1/3 flex-col"
                  style={{
                    paddingTop:
                      laneTopOffset,
                  }}
                >
                  {laneImages.map(
                    ({
                      src,
                      index,
                    }) => {
                      /*
                        FOTOS MÁS GRANDES
                      */

                      const widths =
                        [
                          '108%',
                          '96%',
                          '114%',
                          '102%',
                          '110%',
                          '98%',
                        ];

                      /*
                        DIFERENTES PROPORCIONES
                      */

                      const ratios =
                        [
                          '4 / 5',
                          '3 / 4',
                          '1 / 1',
                          '4 / 5',
                          '3 / 2',
                          '4 / 5',
                        ];

                      /*
                        DESORDEN
                        CONTROLADO
                      */

                      const alignments =
                        [
                          'flex-start',
                          'flex-end',
                          'center',
                          'flex-start',
                          'center',
                          'flex-end',
                        ] as const;

                      /*
                        MENOS ESPACIO =
                        PEQUEÑO OVERLAP
                      */

                      const gaps = [
                        '4vh',
                        '8vh',
                        '5vh',
                        '10vh',
                        '6vh',
                        '3vh',
                      ];

                      const zIndexes = [
                        3,
                        1,
                        2,
                        4,
                        2,
                        3,
                      ];

                      return (
                        <div
                          key={src}
                          className="relative flex w-full"
                          style={{
                            justifyContent:
                              alignments[
                                index %
                                  alignments.length
                              ],

                            marginBottom:
                              gaps[
                                index %
                                  gaps.length
                              ],

                            zIndex:
                              zIndexes[
                                index %
                                  zIndexes.length
                              ],
                          }}
                        >
                          <div
                            className="
                              relative
                              overflow-hidden
                              rounded-[22px]
                              border
                              border-white/10
                              bg-black
                              shadow-[0_35px_90px_rgba(0,0,0,0.38)]
                            "
                            style={{
                              width:
                                widths[
                                  index %
                                    widths.length
                                ],

                              aspectRatio:
                                ratios[
                                  index %
                                    ratios.length
                                ],
                            }}
                          >
                            <PhotoSurface
                              src={
                                src
                              }
                              index={
                                index
                              }
                              label={`PHOTO ${String(
                                index +
                                  1
                              ).padStart(
                                2,
                                '0'
                              )}`}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              );
            }
          )}
        </motion.div>

        <div className="absolute bottom-6 left-6 z-30 text-[9px] uppercase tracking-[0.2em] text-white/50">
          {section.title} ·
          Vertical Rain
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EFFECT 2
   HORIZONTAL CAROUSEL

   RESTAURADO
========================================================= */

function HorizontalCarouselSection({
  section,
}: {
  section: PhotoBookSectionData;
}) {
  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        'start start',
        'end end',
      ],
    });

  /*
    Distancia horizontal proporcional
    al número de fotografías.
  */

  const estimatedTrackWidth =
    section.images.length * 44;

  const movement = Math.max(
    estimatedTrackWidth - 90,
    80
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [
      '0vw',
      `-${movement}vw`,
    ]
  );

  /*
    El título también se mueve
    muy ligeramente.
  */

  const titleX =
    useTransform(
      scrollYProgress,
      [0, 1],
      ['0vw', '-12vw']
    );

  /*
    Altura proporcional
    al número de fotografías.
  */

  const sectionHeight =
    180 +
    section.images.length * 22;

  /*
    Diferentes tamaños
    para evitar apariencia
    de carrusel genérico.
  */

  const widths = [
    54,
    36,
    46,
    31,
    58,
    40,
  ];

  const heights = [
    70,
    58,
    76,
    62,
    68,
    72,
  ];

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="relative bg-[#EEE8DD]"
      style={{
        height: `${sectionHeight}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* BACKGROUND */}

        <div className="absolute inset-0 opacity-[0.13]">
          <PhotoSurface
            src={section.background}
            index={1}
            background
          />
        </div>

        {/* TITLE */}

        <motion.h2
          style={{
            x: titleX,
          }}
         className={`pointer-events-none absolute left-[5vw] top-[8vh] z-20 whitespace-nowrap text-[13vw] uppercase leading-none tracking-[-0.045em] text-black md:text-[11vw] ${anton.className}`}
        >
          {section.title}
        </motion.h2>

        {/* CAROUSEL */}

        <motion.div
          style={{ x }}
          className="absolute left-[6vw] top-[27vh] z-10 flex items-center gap-[2vw]"
        >
          {section.images.map(
            (src, index) => (
              <motion.div
                key={src}
                whileHover={{
                  scale: 1.025,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="relative shrink-0 overflow-hidden rounded-[24px] bg-black shadow-[0_30px_75px_rgba(0,0,0,0.22)]"
                style={{
                  width: `clamp(250px, ${
                    widths[
                      index %
                        widths.length
                    ]
                  }vw, 850px)`,

                  height: `${
                    heights[
                      index %
                        heights.length
                    ]
                  }vh`,
                }}
              >
                <PhotoSurface
                  src={src}
                  index={index}
                  label={`${String(
                    index + 1
                  ).padStart(
                    2,
                    '0'
                  )} / ${String(
                    section.images
                      .length
                  ).padStart(
                    2,
                    '0'
                  )}`}
                />
              </motion.div>
            )
          )}
        </motion.div>

        <div className="absolute bottom-6 left-6 z-30 text-[9px] uppercase tracking-[0.2em] text-black/45">
          {section.title} ·
          Horizontal Carousel
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EFFECT 3
   HORIZONTAL RAIN

   - Movimiento únicamente horizontal
   - Izquierda → derecha
   - SOLO 2 líneas de fotografías
   - Sin rotaciones
   - Composición ordenada pero orgánica
   - Crecimiento progresivo con scroll
========================================================= */

function HorizontalRainSection({
  section,
}: {
  section: PhotoBookSectionData;
}) {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* ================================================
     SOLO 2 CARRILES
  ================================================= */

  const laneCount = 2;

  const longestLane = Math.ceil(
    section.images.length / laneCount
  );

  /* ================================================
     MOVIMIENTO HORIZONTAL
     IZQUIERDA → DERECHA
  ================================================= */

  const travelDistance =
    longestLane * 48 + 120;

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [
      `-${travelDistance}vw`,
      '105vw',
    ]
  );

  /* ================================================
     CRECIMIENTO PROGRESIVO
  ================================================= */

  const photoScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.06, 1.12]
  );

  /* ================================================
     TITLE
  ================================================= */

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.82, 1],
    [0.24, 0.13, 0.08, 0]
  );

  const titleX = useTransform(
    scrollYProgress,
    [0, 1],
    ['6vw', '-10vw']
  );

  /* ================================================
     DURACIÓN
  ================================================= */

  const sectionHeight =
    240 + section.images.length * 28;

  return (
    <section
      id={section.id}
      ref={sectionRef}
      className="relative bg-[#090909]"
      style={{
        height: `${sectionHeight}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* BACKGROUND */}

        <div className="absolute inset-0">
          <PhotoSurface
            src={section.background}
            index={3}
            background
          />

          <div className="absolute inset-0 bg-black/65" />
        </div>

        {/* BIG TITLE */}

        <motion.div
          style={{
            opacity: titleOpacity,
            x: titleX,
          }}
          className="pointer-events-none absolute inset-0 z-[2] flex items-center"
        >
          <h2
            className={`whitespace-nowrap text-[26vw] uppercase leading-[0.7] tracking-[-0.055em] text-white ${anton.className}`}
          >
            {section.title}
          </h2>
        </motion.div>

        {/* ================================================
            PHOTO TRACK
        ================================================= */}

        <motion.div
          style={{
            x,
            scale: photoScale,
            transformOrigin: 'center center',
          }}
          className="absolute inset-0 z-10"
        >
          {[0, 1].map((lane) => {
            /*
              Repartición:

              LÍNEA 1
              01 / 03 / 05 / 07 / 09...

              LÍNEA 2
              02 / 04 / 06 / 08 / 10...
            */

            const laneImages =
              section.images
                .map((src, index) => ({
                  src,
                  index,
                }))
                .filter(
                  ({ index }) =>
                    index % laneCount === lane
                );

            /*
              Más espacio vertical ahora
              que solo tenemos 2 líneas.
            */

            const laneTop = [
              '8vh',
              '53vh',
            ][lane];

            /*
              La segunda línea comienza
              desplazada para evitar
              columnas perfectas.
            */

            const laneOffset = [
              '0vw',
              '16vw',
            ][lane];

            return (
              <div
                key={lane}
                className="absolute left-0 flex items-center gap-[5vw]"
                style={{
                  top: laneTop,
                  paddingLeft: laneOffset,
                }}
              >
                {laneImages.map(
                  ({ src, index }) => {
                    /*
                      MANTENEMOS EL TAMAÑO
                      QUE YA TENÍAMOS
                    */

                    const widths = [
  '19vw',
  '18vw',
  '21vw',
  '18vw',
  '20vw',
  '17.5vw',
];

                    const ratios = [
                      '4 / 5',
                      '3 / 4',
                      '1 / 1',
                      '4 / 5',
                      '3 / 2',
                      '4 / 5',
                    ];

                    const margins = [
                      '0vw',
                      '2vw',
                      '5vw',
                      '1vw',
                      '4vw',
                      '2vw',
                    ];

                    return (
                      <div
                        key={src}
                        className="relative shrink-0"
                        style={{
                          marginRight:
                            margins[
                              index %
                                margins.length
                            ],
                        }}
                      >
                        <div
                          className="
                            relative
                            overflow-hidden
                            rounded-[22px]
                            border
                            border-white/10
                            bg-black
                            shadow-[0_35px_90px_rgba(0,0,0,0.38)]
                          "
                          style={{
                            width: `clamp(
  150px,
  ${
    widths[
      index %
        widths.length
    ]
  },
  300px
)`,

                            aspectRatio:
                              ratios[
                                index %
                                  ratios.length
                              ],
                          }}
                        >
                          <PhotoSurface
                            src={src}
                            index={index}
                            label={`PHOTO ${String(
                              index + 1
                            ).padStart(2, '0')}`}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            );
          })}
        </motion.div>

        {/* LABEL */}

        <div className="absolute bottom-6 left-6 z-30 text-[9px] uppercase tracking-[0.2em] text-white/50">
          {section.title} · Horizontal Rain
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION SWITCH
========================================================= */

function PhotoBookSection({
  section,
}: {
  section: PhotoBookSectionData;
}) {
  switch (section.effect) {
    case 'vertical-rain':
      return (
        <VerticalRainSection
          section={section}
        />
      );

    case 'horizontal-carousel':
      return (
        <HorizontalCarouselSection
          section={section}
        />
      );

    case 'horizontal-rain':
      return (
        <HorizontalRainSection
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
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-white px-6 py-20 text-center text-[#B02D27]">
      <div>
        <h2
          className={`text-[25vw] uppercase leading-[0.73] tracking-[-0.055em] sm:text-[17vw] ${anton.className}`}
        >
          FOOD
          <br />
          CREATIVES.
        </h2>

        <p
          className={`mt-12 text-[45px] uppercase leading-none sm:text-[70px] ${anton.className}`}
        >
          Hungry for more?
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-[13px] font-bold uppercase tracking-[0.08em] sm:flex-row sm:gap-8">
          <a
            href="tel:+525540991346"
            className="transition-opacity hover:opacity-55"
          >
            +52 55 4099 1346
          </a>

          <a
            href="mailto:contacto@foodreamers.com"
            className="transition-opacity hover:opacity-55"
          >
            contacto@foodreamers.com
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function PhotoBookPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black text-white">
      <BookNavigation />

      <Hero />

      {sections.map(
        (section) => (
          <PhotoBookSection
            key={section.id}
            section={section}
          />
        )
      )}

      <FinalCTA />
    </main>
  );
}