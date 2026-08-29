'use client';

import { useEffect, useRef, useState } from 'react';
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

   Fotografías reales optimizadas
========================================================= */

const USE_REAL_IMAGES = true;

/* =========================================================
   TYPES

   SOLO QUEDAN 2 EFECTOS
========================================================= */

type EffectType =
  | 'vertical-rain'
  | 'horizontal-carousel';

type PhotoBookSectionData = {
  id: string;
  title: string;
  effect: EffectType;
  background: string;
  images: string[];
};

/* =========================================================
   HELPERS

   Fotografías optimizadas:

   public/photo-book-final/
========================================================= */

function makeImages(
  folder: string,
  count: number
) {
  return Array.from(
    { length: count },
    (_, index) =>
      `/photo-book-final/${folder}/${String(
        index + 1
      ).padStart(2, '0')}.webp`
  );
}

/* =========================================================
   BOOK CONFIGURATION

   1 → Vertical Rain
   2 → Horizontal Carousel

   ALTERNAMOS LOS DOS EFECTOS
========================================================= */

const sections: PhotoBookSectionData[] = [
  {
    id: 'bebidas',
    title: 'BEBIDAS',
    effect: 'vertical-rain',
    background:
      '/photo-book/bebidas/back.webp',
    images: makeImages(
      'bebidas',
      12
    ),
  },

  {
    id: 'salado',
    title: 'SALADO',
    effect: 'horizontal-carousel',
    background:
      '/photo-book/salado/back.webp',
    images: makeImages(
      'salado',
      24
    ),
  },

  {
    id: 'dulce',
    title: 'DULCE',
    effect: 'vertical-rain',
    background:
      '/photo-book/dulce/back.webp',
    images: makeImages(
      'dulce',
      11
    ),
  },

  {
    id: 'con-producto',
    title: 'CON PRODUCTO',
    effect: 'horizontal-carousel',
    background:
      '/photo-book/con-producto/back.webp',
    images: makeImages(
      'con-producto',
      16
    ),
  },

  {
    id: 'kids',
    title: 'KIDS',
    effect: 'vertical-rain',
    background:
      '/photo-book/kids/back.webp',
    images: makeImages(
      'kids',
      5
    ),
  },

  {
    id: 'temporalidades',
    title: 'TEMPORALIDADES',
    effect: 'horizontal-carousel',
    background:
      '/photo-book/temporalidades/back.webp',
    images: makeImages(
      'temporalidades',
      7
    ),
  },

  {
    id: 'creativo',
    title: 'CREATIVO',
    effect: 'vertical-rain',
    background:
      '/photo-book/creativo/back.webp',
    images: makeImages(
      'creativo',
      12
    ),
  },
];

/* =========================================================
   PLACEHOLDERS

   Solo aparecen si una fotografía falla.
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

  if (
    USE_REAL_IMAGES &&
    !failed
  ) {
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
              index %
                gradients.length
            ],
      }}
    >
      {!background &&
        label && (
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
          onClick={() =>
            setOpen(true)
          }
          className="pointer-events-auto rounded-full border border-white/40 bg-black/10 px-4 py-2 text-[10px] uppercase tracking-[0.18em] backdrop-blur-md"
        >
          Index +
        </button>
      </div>

      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
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
              (
                section,
                index
              ) => (
                <a
                  key={
                    section.id
                  }
                  href={`#${section.id}`}
                  onClick={() =>
                    setOpen(
                      false
                    )
                  }
                  className={`group flex items-baseline gap-5 border-b border-white/10 py-3 uppercase transition-opacity hover:opacity-100 ${anton.className}`}
                >
                  <span className="w-[34px] text-[13px] tracking-normal text-white/35">
                    {String(
                      index +
                        1
                    ).padStart(
                      2,
                      '0'
                    )}
                  </span>

                  <span className="text-[48px] leading-[0.9] text-white/80 transition-all duration-300 group-hover:translate-x-4 group-hover:text-[#FFC400] sm:text-[70px] md:text-[92px]">
                    {
                      section.title
                    }
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

   MISMO HERO.

   Se elimina el texto gigante:
   FOOD
   DREAMERS

   y entra el logo.
========================================================= */

function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[#080808] text-white">
      <div className="absolute inset-0">
        <PhotoSurface
          src="/our-space/hero/hero.webp"
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
        className="relative z-10 flex w-full flex-col items-center justify-center px-[8vw] text-center"
      >
        <img
          src="/our-space/logos/food-dreamers.webp"
          alt="Food Dreamers"
          draggable={false}
          className="h-auto w-full max-w-[850px] object-contain"
        />

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
        opacity:
          opacity ??
          0.12,
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

   SE CONSERVA EL EFECTO ORIGINAL.

   - movimiento vertical
   - 3 columnas
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
    useRef<HTMLElement | null>(null);

  const trackRef =
    useRef<HTMLDivElement | null>(null);

  const [verticalRange, setVerticalRange] =
    useState({
      start: 0,
      end: 0,
    });

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        'start start',
        'end end',
      ],
    });

  const desktopRows =
    Math.ceil(
      section.images.length / 3
    );

  /* =======================================================
     MEDIMOS LA ALTURA REAL DE LAS 3 COLUMNAS

     Ya no calculamos una distancia aproximada.

     INICIO:
     fotos debajo de pantalla.

     FINAL:
     borde inferior del contenido coincide
     con el borde inferior de la pantalla.
  ======================================================= */

  useEffect(() => {
    const calculateRange = () => {
      if (!trackRef.current) {
        return;
      }

      const viewportHeight =
        window.innerHeight;

      const trackHeight =
        trackRef.current.scrollHeight;

      /*
        El scale termina en 1.12,
        por eso calculamos también
        la altura visual final.
      */

      const finalVisualHeight =
        trackHeight * 1.12;

      setVerticalRange({
        start:
          viewportHeight * 1.05,

        end:
          viewportHeight -
          finalVisualHeight,
      });
    };

    calculateRange();

    const resizeObserver =
      new ResizeObserver(
        calculateRange
      );

    if (trackRef.current) {
      resizeObserver.observe(
        trackRef.current
      );
    }

    window.addEventListener(
      'resize',
      calculateRange
    );

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener(
        'resize',
        calculateRange
      );
    };
  }, [
    section.images.length,
  ]);

  /* MOVIMIENTO VERTICAL */

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [
      verticalRange.start,
      verticalRange.end,
    ]
  );

  /* CRECIMIENTO PROGRESIVO */

  const photoScale =
    useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [
        1,
        1.06,
        1.12,
      ]
    );

  const titleOpacity =
    useTransform(
      scrollYProgress,
      [
        0,
        0.08,
        0.8,
        1,
      ],
      [
        0.24,
        0.13,
        0.08,
        0,
      ]
    );

  /*
    Conservamos la duración
    que ya teníamos.
  */

  const sectionHeight =
    240 +
    section.images.length *
      35;

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
            src={
              section.background
            }
            index={
              section.images
                .length
            }
            background
          />

          <div className="absolute inset-0 bg-black/65" />
        </div>

        {/* TITLE */}

        <SectionTitle
          title={
            section.title
          }
          opacity={
            titleOpacity
          }
        />

        {/* PHOTO TRACK */}

        <motion.div
          ref={trackRef}
          style={{
            y,
            scale:
              photoScale,
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
                      const widths =
                        [
                          '108%',
                          '96%',
                          '114%',
                          '102%',
                          '110%',
                          '98%',
                        ];

                      const ratios =
                        [
                          '4 / 5',
                          '3 / 4',
                          '1 / 1',
                          '4 / 5',
                          '3 / 2',
                          '4 / 5',
                        ];

                      const alignments =
                        [
                          'flex-start',
                          'flex-end',
                          'center',
                          'flex-start',
                          'center',
                          'flex-end',
                        ] as const;

                      const gaps =
                        [
                          '4vh',
                          '8vh',
                          '5vh',
                          '10vh',
                          '6vh',
                          '3vh',
                        ];

                      const zIndexes =
                        [
                          3,
                          1,
                          2,
                          4,
                          2,
                          3,
                        ];

                      return (
                        <div
                          key={
                            src
                          }
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

   SE CONSERVA EL EFECTO ORIGINAL.
========================================================= */

function HorizontalCarouselSection({
  section,
}: {
  section: PhotoBookSectionData;
}) {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const trackRef =
    useRef<HTMLDivElement | null>(null);

  const lastCardRef =
    useRef<HTMLDivElement | null>(null);

  const [endX, setEndX] =
    useState(0);

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        'start start',
        'end end',
      ],
    });

  /*
    Calculamos el punto final REAL.

    La última fotografía termina
    centrada exactamente cuando
    termina la sección.
  */

  useEffect(() => {
    const calculateEndX = () => {
      if (
        !trackRef.current ||
        !lastCardRef.current
      ) {
        return;
      }

      const viewportWidth =
        window.innerWidth;

      /*
        El track empieza en left-[6vw].
      */

      const trackLeft =
        viewportWidth * 0.06;

      const lastCard =
        lastCardRef.current;

      /*
        Centro real de la última tarjeta
        dentro del track.
      */

      const lastCardCenter =
        lastCard.offsetLeft +
        lastCard.offsetWidth / 2;

      /*
        Movimiento necesario para que
        ese centro quede en 50vw.
      */

      const finalX =
        viewportWidth / 2 -
        trackLeft -
        lastCardCenter;

      setEndX(finalX);
    };

    calculateEndX();

    const resizeObserver =
      new ResizeObserver(
        calculateEndX
      );

    if (trackRef.current) {
      resizeObserver.observe(
        trackRef.current
      );
    }

    if (lastCardRef.current) {
      resizeObserver.observe(
        lastCardRef.current
      );
    }

    window.addEventListener(
      'resize',
      calculateEndX
    );

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener(
        'resize',
        calculateEndX
      );
    };
  }, [
    section.images.length,
  ]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [
      0,
      endX,
    ]
  );

  /*
    El título conserva exactamente
    su movimiento anterior.
  */

  const titleX =
    useTransform(
      scrollYProgress,
      [0, 1],
      [
        '0vw',
        '-12vw',
      ]
    );

  /*
    Conservamos duración.
  */

  const sectionHeight =
    180 +
    section.images.length *
      22;

  /*
    Tamaños originales.
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
            src={
              section.background
            }
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
          ref={trackRef}
          style={{
            x,
          }}
          className="absolute left-[6vw] top-[27vh] z-10 flex items-center gap-[2vw]"
        >
          {section.images.map(
            (
              src,
              index
            ) => {
              const isLast =
                index ===
                section.images.length -
                  1;

              return (
                <motion.div
                  key={src}
                  ref={
                    isLast
                      ? lastCardRef
                      : undefined
                  }
                  whileHover={{
                    scale:
                      1.025,
                  }}
                  transition={{
                    duration:
                      0.35,
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
                    index={
                      index
                    }
                    label={`${String(
                      index +
                        1
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
              );
            }
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
   SECTION SWITCH

   SOLO 2 EFECTOS
========================================================= */

function PhotoBookSection({
  section,
}: {
  section: PhotoBookSectionData;
}) {
  switch (
    section.effect
  ) {
    case 'vertical-rain':
      return (
        <VerticalRainSection
          section={
            section
          }
        />
      );

    case 'horizontal-carousel':
      return (
        <HorizontalCarouselSection
          section={
            section
          }
        />
      );

    default:
      return null;
  }
}

/* =========================================================
   FINAL CTA

   MISMO CIERRE.

   Quitamos:
   FOOD
   CREATIVES.

   y entra el logo.
========================================================= */

function FinalCTA() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-white px-6 py-20 text-center text-[#B02D27]">
      <div className="flex w-full flex-col items-center">

        <img
          src="/our-space/logos/food-creatives.webp"
          alt="Food Creatives"
          draggable={false}
          className="h-auto w-full max-w-[850px] object-contain"
        />

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

          <a
            href="/"
            className="transition-opacity hover:opacity-55"
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

export default function PhotoBookPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black text-white">
      <BookNavigation />

      <Hero />

      {sections.map(
        (section) => (
          <PhotoBookSection
            key={
              section.id
            }
            section={
              section
            }
          />
        )
      )}

      <FinalCTA />
    </main>
  );
}