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

function ProjectCard({
  project,
  i,
  total,
  scrollYProgress,
}: {
  project: {
    title: string;
    service: string;
    year: string;
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
  const y = useTransform(scrollYProgress, [start, end], ['0px', '900px']);
  const scale = useTransform(scrollYProgress, [start, end], [1, 1.14]);

  if (project.isAddCard) {
    return (
      <motion.div
        style={{ y: 0, scale: 1, zIndex: total - i }}
        className="absolute inset-0 overflow-hidden rounded-[30px] border border-dashed border-[#FFE3AC]/20 bg-[#050505]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,227,172,0.12),transparent_35%)]" />

        <div className="relative flex h-full flex-col items-center justify-center">
          <div className="mb-10 flex h-[160px] w-[170px] items-center justify-center rounded-[36px] border border-[#FFE3AC]/25 bg-white/[0.03] shadow-[0_0_80px_rgba(255,227,172,0.12)]">
            <div className="relative flex items-center justify-center">
              <div className="h-[90px] w-[5px] rounded-full bg-[#FFE3AC]" />
              <div className="absolute h-[5px] w-[90px] rounded-full bg-[#FFE3AC]" />
            </div>
          </div>

          <div className="mb-5 flex items-center gap-8">
            <div className="h-[1px] w-[120px] bg-[#FFE3AC]/30" />
            <p className={`text-[18px] uppercase tracking-[0.35em] text-[#FFE3AC] ${anton.className}`}>
              YOUR PROJECT
            </p>
            <div className="h-[1px] w-[120px] bg-[#FFE3AC]/30" />
          </div>

          <h2 className={`text-center text-[110px] uppercase leading-[0.9] tracking-[-0.04em] text-white ${anton.className}`}>
            COULD BE THE NEXT HERE
          </h2>

          <p className="mt-5 text-[22px] text-white/50">
            Let’s create something amazing together.
          </p>

          <a
            href="/#contact"
            className={`mt-10 rounded-[18px] bg-[#FFE3AC] px-12 py-5 text-[24px] uppercase text-black transition duration-300 hover:scale-105 ${anton.className}`}
          >
            Add My Project
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{ y, scale, zIndex: total - i }}
      className="absolute inset-0 overflow-hidden rounded-[30px] border border-white/10 bg-[#111] shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
    >
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,227,172,0.16),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />

      <div className="relative z-10 flex h-full items-end justify-between p-10">
        <div>
          <p className="text-[15px] uppercase tracking-[0.22em] text-[#FFE3AC]">
            {String(i + 1).padStart(2, '0')} / 
          </p>

          <h3 className={`mt-4 text-[82px] uppercase leading-none ${anton.className}`}>
            {project.title}
          </h3>

          <p className="mt-4 text-[20px] text-white/60">
            {project.service} · {project.year}
          </p>
        </div>

        <a
          href={project.href}
          className={`rounded-[14px] bg-white px-8 py-4 text-[20px] uppercase text-black transition hover:scale-105 ${anton.className}`}
        >
          View Project
        </a>
      </div>
    </motion.div>
  );
}

function ProjectStack() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const projects = [
    {
      title: 'Project 01',
      service: 'Commercial Production',
      year: '2026',
      href: '/work/project-01',
      image: '/work/project-01.jpg',
    },
    {
      title: 'Project 02',
      service: 'Social Campaign',
      year: '2026',
      href: '/work/project-02',
      image: '/work/project-02.jpg',
    },
    {
      title: 'Project 03',
      service: 'Brand Film',
      year: '2025',
      href: '/work/project-03',
      image: '/work/project-03.jpg',
    },
    {
      title: 'Project 04',
      service: 'Food Storytelling',
      year: '2025',
      href: '/work/project-04',
      image: '/work/project-04.jpg',
    },
    {
      title: '',
      service: '',
      year: '',
      href: '/#contact',
      isAddCard: true,
    },
  ];

  return (
    <section ref={sectionRef} className="relative h-[520vh] bg-[#050505] px-[6vw]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-visible">
        <div className="relative mx-auto h-[540px] w-full max-w-[1512px]">
          {projects.map((project, i) => (
            <ProjectCard
              key={`${project.title || 'add-card'}-${i}`}
              project={project}
              i={i}
              total={projects.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="fixed left-0 top-0 z-[999] w-full bg-white/5 backdrop-blur-3xl">
        <div className="flex h-[88px] w-full items-center justify-between border-b border-white/10 px-10">
          <motion.a
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
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

          <nav className={`hidden items-center gap-8 md:flex ${anton.className}`}>
            <motion.a whileHover={{ y: -2 }} href="/" className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]">
              HOME
            </motion.a>

            <motion.a whileHover={{ y: -2 }} href="/#ecosystem" className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]">
              SERVICES
            </motion.a>

            <motion.a whileHover={{ y: -2 }} href="/#ai-lab" className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]">
              AI LAB
            </motion.a>

            <motion.a whileHover={{ y: -2 }} href="/work" className="text-lg tracking-wide text-[#FFE3AC]">
              OUR WORK
            </motion.a>

            <motion.a whileHover={{ y: -2 }} href="/#about" className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]">
              ABOUT US
            </motion.a>

            <motion.a whileHover={{ y: -2 }} href="/#contact" className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]">
              CONTACT
            </motion.a>
          </nav>

          <div className="ml-8 flex items-center gap-5 text-white">
            <motion.a href="#" whileHover={{ scale: 1.15, y: -2 }} className="transition-colors hover:text-[#FFE3AC]">
              <InstagramIcon />
            </motion.a>

            <motion.a href="#" whileHover={{ scale: 1.15, y: -2 }} className="transition-colors hover:text-[#FFE3AC]">
              <FacebookIcon />
            </motion.a>

            <motion.a href="#" whileHover={{ scale: 1.15, y: -2 }} className="transition-colors hover:text-[#FFE3AC]">
              <TikTokIcon />
            </motion.a>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center overflow-hidden px-[6vw]">
        <video
          src="/work-reel.mp4"
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
            initial={{ opacity: 0, y: 55 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: 'easeOut' }}
            className={`mt-6 text-[180px] uppercase leading-[0.9] tracking-[-0.06em] ${anton.className}`}
          >
            OUR
            <br />
            WORK
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-8 max-w-[560px] text-[22px] leading-relaxed text-white/70"
          >
            Food stories, campaigns, social systems and cinematic visuals crafted for brands that want to be remembered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-12"
          >
            <a
              href="#projects"
              className={`inline-flex rounded-[16px] bg-white px-9 py-4 text-[22px] uppercase text-black transition hover:scale-105 ${anton.className}`}
            >
              View Projects
            </a>
          </motion.div>
        </div>
      </section>

      <div id="projects">
        <ProjectStack />
      </div>
    </main>
  );
}