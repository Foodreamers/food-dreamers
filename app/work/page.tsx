'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Anton } from 'next/font/google';

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
function ServiceCard({
  service,
  i,
  total,
  scrollYProgress,
}: {
  service: {
    title: string;
    href: string;
    image?: string;
    isAddCard?: boolean;
  };
  i: number;
  total: number;
  scrollYProgress: any;
}) {
  const start = i / total;
  const end = (i + 1) / total;

  const y = useTransform(
    scrollYProgress,
    [start, end],
    ['0px', '900px']
  );

  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [1, 1.14]
  );

  /* =====================================================
      FINAL CTA CARD
      ESTA CARD NO BAJA
  ===================================================== */
  if (service.isAddCard) {
    return (
      <motion.div
        style={{
          y: 0,
          scale: 1,
          zIndex: total - i,
        }}
        className="absolute inset-0 overflow-hidden rounded-[30px] border border-[#FFE3AC]/20 bg-[#050505] shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
      >
        {/* BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,227,172,0.13),transparent_38%)]" />

        {/* CONTENT */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-10 text-center">
          {/* PLUS */}
          <div className="mb-8 flex h-[130px] w-[140px] items-center justify-center rounded-[30px] border border-[#FFE3AC]/25 bg-white/[0.03] shadow-[0_0_80px_rgba(255,227,172,0.10)]">
            <div className="relative flex items-center justify-center">
              <div className="h-[70px] w-[4px] rounded-full bg-[#FFE3AC]" />

              <div className="absolute h-[4px] w-[70px] rounded-full bg-[#FFE3AC]" />
            </div>
          </div>

          {/* SMALL TITLE */}
          <p
            className={`text-[15px] uppercase tracking-[0.32em] text-[#FFE3AC] ${anton.className}`}
          >
            READY?
          </p>

          {/* MAIN TITLE */}
          <h2
            className={`mt-5 text-[88px] uppercase leading-[0.9] tracking-[-0.04em] text-white ${anton.className}`}
          >
            LET’S COOK UP
            <br />
            MY NEXT PROJECT
          </h2>

          {/* CONTACT BUTTON */}
          <a
            href="/contact"
            className={`relative z-20 mt-8 rounded-[16px] bg-[#FFE3AC] px-10 py-4 text-[22px] uppercase text-black transition duration-300 hover:scale-105 ${anton.className}`}
          >
            Start A Project
          </a>
        </div>
      </motion.div>
    );
  }

  /* =====================================================
      NORMAL SERVICE CARDS
      NO CAMBIAMOS SU ANIMACIÓN
  ===================================================== */
  return (
    <motion.div
      style={{
        y,
        scale,
        zIndex: total - i,
      }}
      className="absolute inset-0 overflow-hidden rounded-[30px] border border-white/10 bg-[#111] shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
    >
      {service.image && (
        <img
          src={service.image}
          alt={service.title}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </motion.div>
  );
}
function MobileServiceCard({
  service,
}: {
  service: {
    title: string;
    description?: string;
    href: string;
    image?: string;
    isAddCard?: boolean;
  };
}) {
  if (service.isAddCard) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 35,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: 'easeOut',
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="relative flex min-h-[430px] w-full flex-col items-center justify-center overflow-hidden rounded-[24px] border border-dashed border-[#FFE3AC]/25 bg-[#050505] px-6 py-12 text-center"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,227,172,0.12),transparent_42%)]" />

        <div className="relative z-10 flex h-[90px] w-[90px] items-center justify-center rounded-[24px] border border-[#FFE3AC]/25 bg-white/[0.03]">
          <div className="relative flex items-center justify-center">
            <div className="h-[46px] w-[3px] rounded-full bg-[#FFE3AC]" />
            <div className="absolute h-[3px] w-[46px] rounded-full bg-[#FFE3AC]" />
          </div>
        </div>

        <p
          className={`relative z-10 mt-8 text-[12px] uppercase tracking-[0.25em] text-[#FFE3AC] ${anton.className}`}
        >
          READY?
        </p>

        <h2
          className={`relative z-10 mt-5 text-[46px] uppercase leading-[0.92] tracking-[-0.04em] text-white ${anton.className}`}
        >
          LET&apos;S BUILD IT TOGETHER
        </h2>

        <p className="relative z-10 mt-5 max-w-[300px] text-[16px] leading-relaxed text-white/50">
          Whatever the story needs, we&apos;re ready to make it happen.
        </p>
        <a
  href="/contact"
  className={`relative z-20 mt-8 rounded-[16px] bg-[#FFE3AC] px-10 py-4 text-[22px] uppercase text-black transition duration-300 hover:scale-105 ${anton.className}`}
>
  Start A Project
</a>

        <a
          href="/contact"
          className={`relative z-10 mt-8 rounded-[14px] bg-[#FFE3AC] px-7 py-4 text-[18px] uppercase text-black ${anton.className}`}
        >
          Start A Project
        </a>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={service.href}
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        ease: 'easeOut',
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      className="relative block w-full overflow-hidden rounded-[24px]"
    >
      {service.image && (
        <img
          src={service.image}
          alt={service.title}
          draggable={false}
          loading="lazy"
          className="block h-auto w-full"
        />
      )}
    </motion.a>
  );
}

function ServiceStack() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

 const services = [
  {
    title: 'Food Styling',
    href: '/contact',
    image: '/services/3.png',
  },
  {
    title: 'Video Production',
    href: '/contact',
    image: '/services/5.png',
  },
  {
    title: 'Photography',
    href: '/contact',
    image: '/services/4.png',
  },
  {
    title: 'Prop House',
    href: '/contact',
    image: '/services/8.png',
  },
  {
    title: 'Social Media',
    href: '/contact',
    image: '/services/6.png',
  },
  {
    title: 'Documentaries',
    href: '/contact',
    image: '/services/7.png',
  },
  {
    title: 'Post Production',
    href: '/contact',
    image: '/services/9.png',
  },
  {
    title: 'Art Direction',
    href: '/contact',
    image: '/services/2.png',
  },
  {
    title: 'Creative Development',
    href: '/contact',
    image: '/services/1.png',
  },
  {
    title: "Let's Build My Project",
    href: '/contact',
    isAddCard: true,
  },
];

  return (
    <>
      {/* =====================================================
          MOBILE ONLY
      ===================================================== */}

     <section className="bg-[#050505] px-5 pb-24 pt-12 md:hidden">
  <div className="mx-auto flex w-full max-w-[430px] flex-col gap-5">
    {services.map((service, i) => (
      <MobileServiceCard
        key={`${service.title || 'add-card'}-mobile-${i}`}
        service={service}
      />
    ))}
  </div>
</section>

      {/* =====================================================
          DESKTOP ORIGINAL STACK
          NO CAMBIAR
      ===================================================== */}

      <section
  ref={sectionRef}
  className="relative hidden h-[520vh] bg-[#050505] px-[6vw] md:block"
>
  <div className="sticky top-0 flex h-screen items-center justify-center overflow-visible">
    <div className="relative mx-auto h-[540px] w-full max-w-[1512px]">
      {services.map((service, i) => (
        <ServiceCard
          key={`${service.title}-${i}`}
          service={service}
          i={i}
          total={services.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  </div>
</section>
    </>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* NAVBAR */}
      <header className="fixed left-0 top-0 z-[999] w-full bg-white/5 backdrop-blur-3xl">
        <div className="flex h-20 w-full items-center justify-between border-b border-white/10 px-4 sm:px-6 md:h-[88px] md:px-10">
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
              className="h-[72px] w-auto select-none md:h-[122px]"
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
              className="text-lg tracking-wide text-[#FFE3AC]"
            >
              SERVICES
            </motion.a>

            <motion.a
              whileHover={{ y: -2 }}
              href="/Book"
              className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
            >
              OUR WORK
            </motion.a>

            <motion.a
              whileHover={{ y: -2 }}
              href="/about"
              className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
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

          <div className="ml-8 hidden items-center gap-5 text-white md:flex">
            <motion.a
              href="#"
              whileHover={{
                scale: 1.15,
                y: -2,
              }}
              className="transition-colors hover:text-[#FFE3AC]"
            >
              <InstagramIcon />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{
                scale: 1.15,
                y: -2,
              }}
              className="transition-colors hover:text-[#FFE3AC]"
            >
              <FacebookIcon />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{
                scale: 1.15,
                y: -2,
              }}
              className="transition-colors hover:text-[#FFE3AC]"
            >
              <TikTokIcon />
            </motion.a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-20 sm:px-8 md:px-[6vw] md:pt-0">
        {/* IMPORTANT:
            SAME CURRENT VIDEO.
            DO NOT CHANGE YET.
        */}
        <video
          src="/videos web/principal/best_moments.mp4"
          autoPlay
          muted
          loop
          playsInline
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-[1512px]">
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
              delay: 0.15,
              ease: 'easeOut',
            }}
           className={`mt-6 text-[74px] uppercase leading-[0.88] tracking-[-0.05em] sm:text-[96px] md:text-[180px] md:leading-[0.9] md:tracking-[-0.06em] ${anton.className}`}
          >
        
            
            SERVICES
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
              delay: 0.35,
            }}
            className="mt-7 max-w-[340px] text-[17px] leading-relaxed text-white/70 sm:max-w-[460px] sm:text-[19px] md:mt-8 md:max-w-[600px] md:text-[22px]"
          >
            From first concept to the final cut.
          </motion.p>

          <motion.div
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
              delay: 0.55,
            }}
            className="mt-12"
          >
            <a
              href="#services"
              className={`inline-flex rounded-[14px] bg-white px-7 py-4 text-[18px] uppercase text-black transition md:rounded-[16px] md:px-9 md:text-[22px] md:hover:scale-105 ${anton.className}`}
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </section>

      {/* SERVICES STACK */}
      <div id="services">
        <ServiceStack />
      </div>
    </main>
  );
}