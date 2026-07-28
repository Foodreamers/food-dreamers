'use client';

import { useEffect, useRef, useState } from 'react';
import { Anton } from 'next/font/google';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

function TypeAnimation() {
  const words = ['REAL', 'FASTER', 'BETTER', 'CREATIVE'];
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
  const currentWord = words[wordIndex];
  let timer: ReturnType<typeof setTimeout>;

  if (!deleting && text !== currentWord) {
    timer = setTimeout(() => {
      setText(currentWord.slice(0, text.length + 1));
    }, 90);
  } 
  else if (!deleting && text === currentWord) {
    timer = setTimeout(() => {
      setDeleting(true);
    }, 900);
  } 
  else if (deleting && text.length > 0) {
    timer = setTimeout(() => {
      setText(currentWord.slice(0, text.length - 1));
    }, 40);
  } 
  else if (deleting && text.length === 0) {
    setDeleting(false);
    setWordIndex((prev) => (prev + 1) % words.length);
  }

  return () => clearTimeout(timer);
}, [text, deleting, wordIndex]);
  return (
    <div className="flex items-baseline gap-6 whitespace-nowrap">
      <h2 className="text-[90px] font-regular text-white" style={{ fontFamily: 'Anton, sans-serif' }}>
        We make it
      </h2>

      <div className="text-[90px] font-black text-[#00471A]" style={{ fontFamily: 'Anton, sans-serif' }}>
        {text}
        <span className="animate-pulse">|</span>
      </div>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M14 8h2V4h-3c-3 0-5 2-5 5v3H6v4h2v4h4v-4h3l1-4h-4V9c0-.6.4-1 1-1h1z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M15 4c.4 2.5 1.8 4 4 4.3v3.4c-1.5 0-2.8-.4-4-1.2V16a5 5 0 1 1-5-5c.4 0 .7 0 1 .1v3.6a2 2 0 1 0 2 1.9V4h2z" />
    </svg>
  );
}
const ecosystemItems = [
  {
    title: 'COMMERCIALS',
    description: 'High-impact video campaigns built for food brands.',
    image: '/images/ecosystem/10.png',
  },
  {
    title: '',
    description: 'Story-driven content designed to connect with audiences.',
    image: '/images/ecosystem/4.png',
  },
  {
    title: '',
    description: 'Platform-ready content for daily brand visibility.',
    image: '/images/ecosystem/social_media.jpg',
  },
  {
    title: 'DOCUMENTARIES',
    description: 'Long-form stories with a cinematic food perspective.',
    image: '/images/ecosystem/documentaries.jpg',
  },
  {
    title: '',
    description: 'Premium food imagery for campaigns and brands.',
    image: '/images/ecosystem/5.png',
  },
  {
    title: '',
    description: 'Concepts, scripts, and campaign development.',
    image: '/images/ecosystem/creative.jpg',
  },
  {
    title: '',
    description: 'Visual styling that makes every dish camera-ready.',
    image: '/images/ecosystem/foodstyling.jpg',
  },
  {
    title: '',
    description: 'Strong visual direction for every production.',
    image: '/images/ecosystem/art_direction.jpg',
  },
  {
    title: '1M+ PROP WAREHOUSE',
    description: 'A massive library of props and set elements.',
    image: '/images/ecosystem/props.jpg',
  },
  {
    title: '',
    description: 'Editing, color, sound, and finishing.',
    image: '/images/ecosystem/9.png',
  },
];

const infiniteEcosystemItems = [
  ...ecosystemItems,
  ...ecosystemItems,
  ...ecosystemItems,
  ...ecosystemItems,
  ...ecosystemItems,
  
 
];
function SocialBubble({
  className,
  size = 'h-[92px] w-[92px]',
  thumbnail = '/images/social/thumb-01.jpg',
  videoSrc,
  label = 'Social Video',
  onClick,
}: {
  className: string;
  size?: string;
  thumbnail?: string;
  videoSrc?: string;
  label?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group pointer-events-auto relative z-[50] overflow-hidden rounded-full border border-white/20 shadow-[0_18px_50px_rgba(0,0,0,0.35)] ${size} ${className}`}
    >
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={thumbnail}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <img
          src={thumbnail}
          alt={label}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      )}

      <div className="absolute inset-0 rounded-full bg-black/20 transition-colors duration-300 group-hover:bg-black/38" />

      <div className="absolute left-1/2 top-1/2 flex h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-white/92 text-[12px] text-black opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
        ▶
      </div>
    </button>
  );
}
function OrbitPoint({
  angle,
  children,
}: {
  angle: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
        style={{ transform: `rotate(${-angle}deg)` }}
      >
        {children}
      </div>
    </div>
  );
}
function BouncingHeroIcon({
  onClick,
}: {
  onClick: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

const iconRef = useRef<HTMLButtonElement | null>(null);

useEffect(() => {
    let x = 120;
    let y = 160;

    let vx = 2.2;
    let vy = 1.8;

    const animate = () => {
      const container = containerRef.current;
      const icon = iconRef.current;

      if (!container || !icon) return;

      const bounds = container.getBoundingClientRect();

      const iconSize = 120;

      x += vx;
      y += vy;
const leftLimit = -30;
const rightLimit = -30;

if (x <= leftLimit) {
  x = leftLimit;
  vx *= -1;
}

if (x >= bounds.width - iconSize - rightLimit) {
  x = bounds.width - iconSize - rightLimit;
  vx *= -1;
}
     const topLimit = -25;
const bottomLimit = -35;

if (y <= topLimit) {
  y = topLimit;
  vy *= -1;
}

if (y >= bounds.height - iconSize - bottomLimit) {
  y = bounds.height - iconSize - bottomLimit;
  vy *= -1;
}

      icon.style.transform = `translate(${x}px, ${y}px)`;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[55]"
    >
      <button
        ref={iconRef}
        type="button"
        onClick={onClick}
        className="pointer-events-auto absolute left-0 top-0 h-[120px] w-[120px] cursor-pointer"
      >
        <img
          src="/pot.svg"
          alt="Floating video"
          draggable={false}
          className="h-full w-full drop-shadow-[0_18px_28px_rgba(0,0,0,0.35)]"
        />
      </button>
    </div>
  );
}
function JarvisCore({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2">
      {active && (
  <motion.p
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.18, 0.3, 0.22, 0.3, 0],
    }}
    transition={{
      duration: 2.6,
      times: [0, 0.2, 0.45, 0.7, 1],
      ease: 'easeInOut',
    }}
    className="
      absolute
      left-1/2
      top-[-58px]
      -translate-x-1/2
      text-[28px]
      uppercase
      tracking-[0.42em]
      text-[#E9D5FF]
      drop-shadow-[0_0_18px_rgba(233,213,255,0.22)]
    "
    style={{ fontFamily: 'Anton, sans-serif' }}
  >
    GENERATING...
  </motion.p>
)}
      <motion.div
        animate={
  active
    ? { opacity: [0.18, 0.3, 0.22, 0.3, 0] }
    : { opacity: 0 }
}
        transition={{
  duration: 2.6,
  times: [0, 0.2, 0.45, 0.7, 1],
  ease: 'easeInOut',
}}
        className="absolute left-1/2 top-1/2 h-[90px] w-[90px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C084FC] shadow-[0_0_35px_rgba(192,132,252,0.95),0_0_120px_rgba(168,85,247,0.75)]"
      />

      <motion.div
  animate={{
    rotate: 360,
    scale: [1, 1.03, 1],
  }}
  transition={{
    rotate: {
      duration: 8,
      ease: 'linear',
    },
    scale: {
      duration: 2.2,
      ease: 'easeInOut',
    },
  }}
 className="
  absolute
  inset-0
  rounded-full
  border
  border-[#C084FC]/20
  border-t-[#E9D5FF]
  border-r-[#C084FC]/70
  shadow-[0_0_45px_rgba(192,132,252,0.25)]
"
/>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[45px] rounded-full border border-dashed border-[#E9D5FF]/25"
      />

      <motion.div
        animate={{ scale: [0.8, 1.35], opacity: [0.7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        className="absolute inset-[70px] rounded-full border border-[#C084FC]/40"
      />

      <motion.div
  animate={{ rotate: -360 }}
  transition={{
    duration: 16,
    repeat: Infinity,
    ease: 'linear',
  }}
  className="absolute inset-0"
>
  {[...Array(18)].map((_, i) => (
    <span
      key={i}
      className="
        absolute
        left-1/2
        top-1/2
        h-[1px]
        w-[180px]
        origin-left
        bg-gradient-to-r
        from-[#C084FC]/70
        to-transparent
      "
      style={{
        transform: `rotate(${i * 20}deg)`,
      }}
    />
  ))}
</motion.div>
    </div>
  );
}
function AIRevealLens() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        setPosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative h-[620px] w-[620px]"
    >
  
      <div
        className="pointer-events-none absolute h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C084FC]/70 shadow-[0_0_40px_rgba(192,132,252,0.45),inset_0_0_30px_rgba(192,132,252,0.18)] transition-opacity duration-300"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          opacity: isHovering ? 1 : 0,
        }}
      />

      <div
        className={`pointer-events-none absolute -translate-x-1/2 translate-y-[125px] rounded-full bg-[#C084FC]/20 px-4 py-2 text-[12px] uppercase tracking-[0.22em] text-[#E9D5FF] backdrop-blur-md transition-opacity duration-300`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          opacity: isHovering ? 1 : 0,
          fontFamily: 'Anton, sans-serif',
        }}
      >
        AI Generated
      </div>
    </div>
  );
}
function BurgerBeforeAfter() {
  const [slider, setSlider] = useState(50);

  const updateSlider = (clientX: number, element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);

    setSlider(percent);
  };

  return (
    <div
      className="relative h-[560px] w-[560px] select-none overflow-hidden"
      onPointerMove={(e) => {
        updateSlider(e.clientX, e.currentTarget);
      }}
      onPointerDown={(e) => {
        updateSlider(e.clientX, e.currentTarget);
      }}
    >
      {/* REAL LEFT SIDE */}
      <img
        src="/burger-real.png"
        alt="Real Burger"
        draggable={false}
        className="absolute inset-0 h-full w-full object-contain"
        style={{
          clipPath: `inset(0 ${100 - slider}% 0 0)`,
        }}
      />

      {/* AI RIGHT SIDE */}
     <img
  src="/burger-ai.png"
  alt="AI Burger"
  draggable={false}
  className="absolute inset-0 h-full w-full object-contain"
  style={{
    clipPath: `inset(0 0 0 ${slider}%)`,
    transform: 'translateY(-18px)',
  }}
/>

      {/* DIVIDER LINE */}
      <div
        className="absolute top-0 z-20 h-full w-[2px] bg-[#C084FC] shadow-[0_0_24px_rgba(192,132,252,0.85)]"
        style={{ left: `${slider}%` }}
      />

      {/* HANDLE */}
      <button
        type="button"
        className="absolute top-1/2 z-30 flex h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C084FC]/60 bg-black/70 text-[#E9D5FF] shadow-[0_0_35px_rgba(192,132,252,0.55)] backdrop-blur-md"
        style={{ left: `${slider}%` }}
      >
        ↔
      </button>

      {/* LABELS */}
      <div className="pointer-events-none absolute left-4 top-4 z-30 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[12px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
        Real
      </div>

      <div className="pointer-events-none absolute right-4 top-4 z-30 rounded-full border border-[#C084FC]/40 bg-[#C084FC]/20 px-4 py-2 text-[12px] uppercase tracking-[0.2em] text-[#E9D5FF] backdrop-blur-md">
        AI
      </div>
    </div>
  );
}
export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [currentLogo, setCurrentLogo] = useState('/logos/logo-yellow.svg');
  const [activeSocialVideo, setActiveSocialVideo] = useState<string | null>(null);
  const [sequenceActive, setSequenceActive] = useState(false);

  const aiLabRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sequenceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const dragVelocity = useRef(0);
  const isDraggingCards = useRef(false);
  const lastInteractionTime = useRef(Date.now());
  const autoplayFrame = useRef<number | null>(null);
  const ecosystemRef = useRef<HTMLElement | null>(null);
  const hasPlayedEcosystemIntro = useRef(false);

  const cardsX = useMotionValue(0);
  const frameCount = 101;

  const aiLabInView = useInView(aiLabRef, {
    once: true,
    amount: 0.45,
  });

  const ecosystemInView = useInView(ecosystemRef, {
    once: true,
    amount: 0.35,
  });

  useEffect(() => {
    const sections = [
      { id: 'home', logo: '/logos/logo-yellow.svg' },
      { id: 'services', logo: '/logos/logo-green.svg' },
      { id: 'ai-lab', logo: '/logos/logo-purple.svg' },
      { id: 'ecosystem', logo: '/logos/logo-red.svg' },
      { id: 'sequence', logo: '/logos/logo-white.svg' },
      { id: 'selected-work', logo: '/logos/logo-orange.svg' },
    ];

    const handleScroll = () => {
      let currentSection = sections[0];

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 120) {
          currentSection = section;
        }
      }

      setCurrentLogo(currentSection.logo);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = sequenceCanvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const images: HTMLImageElement[] = [];

    const currentFrame = (index: number) =>
      `/frames/sequence/frame-${String(index).padStart(4, '0')}.jpg`;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const renderFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.complete) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const scale =
        Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        ) * 1;

      const x = canvas.width / 2 - (img.width / 2) * scale;
      const y = canvas.height / 2 - (img.height / 2) * scale;

      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    images[0].onload = () => renderFrame(0);

    const handleScroll = () => {
      const section = document.getElementById('sequence');
      if (!section) return;

      const rect = section.getBoundingClientRect();

      setSequenceActive(rect.top <= 0 && rect.bottom >= window.innerHeight);

      const scrollProgress = Math.min(
        Math.max(-rect.top / (section.offsetHeight - window.innerHeight), 0),
        1
      );

      const easedProgress = Math.pow(scrollProgress, 1.02);
      const rawIndex = Math.floor(easedProgress * (frameCount - 1));

      const frameIndex = Math.max(
        0,
        Math.min(frameCount - 1, rawIndex)
      );

      renderFrame(frameIndex);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const inactiveFor = now - lastInteractionTime.current;

      if (!isDraggingCards.current && inactiveFor > 1800) {
        cardsX.set(wrapAngle(cardsX.get() + 0.035));
      }

      autoplayFrame.current = requestAnimationFrame(tick);
    };

    autoplayFrame.current = requestAnimationFrame(tick);

    return () => {
      if (autoplayFrame.current) {
        cancelAnimationFrame(autoplayFrame.current);
      }
    };
  }, []);

  function wrapAngle(value: number) {
    const range = 288;
    return ((value % range) + range) % range;
  }

  useEffect(() => {
    if (!ecosystemInView || hasPlayedEcosystemIntro.current) return;

    hasPlayedEcosystemIntro.current = true;
    isDraggingCards.current = true;

    cardsX.set(-80);

    animate(cardsX, 0, {
      type: 'tween',
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => {
        isDraggingCards.current = false;
        lastInteractionTime.current = Date.now();
      },
    });
  }, [ecosystemInView]);

  function EcosystemCard({
    item,
    i,
    cardsX,
  }: {
    item: {
      title: string;
      description: string;
      image: string;
    };
    i: number;
    cardsX: any;
  }) {
    const baseAngle = (i - 5) * 8;

    const rotate = useTransform(cardsX, (latest: number) => baseAngle + latest);

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      duration: 0.8,
      delay: i * 0.05,
    }}
    className="absolute h-[380px] w-[260px]"
    style={{
      transformOrigin: '50% 2500px',
      y: 130,
      x: -125,
      rotate,
    }}
  >
    <motion.div
      whileHover={{
        scale: 1.08,
      
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 18,
      }}
className="group relative z-20 h-full w-full select-none overflow-hidden rounded-[18px] bg-[#A3FF5A] shadow-[0_20px_50px_rgba(0,0,0,0.35)] will-change-transform"    >
      {/* IMAGE PLACEHOLDER */}
     <img
  src={item.image}
  alt={item.title}
  draggable={false}
  className="absolute inset-0 h-full w-full select-none object-cover"
/>
      {/* HOVER GRADIENT */}
      <div className="absolute -inset-[1px] bottom-1 z-10 h-[120%] bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* HOVER CONTENT */}
      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-6 p-5 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="text-[18px] font-black uppercase leading-none">
          {item.title}
        </h3>

        <p className="mt-2 text-[12px] font-medium leading-snug text-white/80">
          {item.description}
        </p>
      </div>
    </motion.div>
  </motion.div>
);
}
  return (
    <main id="home"
     className="relative min-h-screen overflow-x-hidden bg-[#B00D0D] text-white">
      <header className="fixed left-0 top-0 z-[999] w-full bg-white/5 backdrop-blur-3xl">
  <div className="flex h-[88px] w-full items-center justify-between border-b border-white/10 px-10">
          <motion.button
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  onClick={() => {
    document
      .getElementById('home')
      ?.scrollIntoView({ behavior: 'smooth' });
  }}
  className="relative z-[120] flex cursor-pointer items-center"
>
  <img
    src={currentLogo}
    alt="Food Dreamers"
    draggable={false}
    className="h-[106px] w-auto select-none"
  />
</motion.button>

          <nav
  className="hidden items-center gap-8 md:flex"
  style={{ fontFamily: 'Anton, sans-serif' }}
>
  <motion.a
    whileHover={{ y: -2 }}
    href="#home"
    className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
  >
    HOME
  </motion.a>

  <motion.a
    whileHover={{ y: -2 }}
    href="#ecosystem"
    className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
  >
    SERVICES
  </motion.a>

  <motion.a
    whileHover={{ y: -2 }}
    href="#ai-lab"
    className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
  >
    AI LAB
  </motion.a>

  <motion.a
  whileHover={{ y: -2 }}
  href="/work"
  className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
>
  OUR WORK
</motion.a>

  <motion.a
    whileHover={{ y: -2 }}
    href="about"
    className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
  >
    ABOUT US
  </motion.a>

  <motion.a
    whileHover={{ y: -2 }}
    href="contact"
    className="text-lg tracking-wide transition-colors hover:text-[#FFE3AC]"
  >
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

      <section
  ref={heroRef}
  className="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-[72px]"
>
  <div className="relative mx-auto flex h-[92vh] w-full max-w-[1440px] items-center justify-center">
      
        <motion.div
          drag
          dragConstraints={{
            top: -550,
            left: -500,
            right: 1100,
            bottom: 550,
          }}
          dragElastic={0.08}
          dragMomentum={false}
         initial={{ opacity: 0, rotate: -25 }}
animate={{ opacity: 1, rotate: 0 }}
transition={{
  scale: {
    duration: 0.9,
    times: [0, 0.55, 0.8, 1],
    ease: 'easeOut',
  },
  opacity: {
    duration: 0.25,
  },
  rotate: {
    duration: 0.9,
    ease: 'easeOut',
  },
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          whileDrag={{ scale: 1.06 }}
          className="absolute z-40 cursor-grab active:cursor-grabbing"
          style={{
            left: 'calc(50% - 520px)',
            top: 'calc(50% - 209px)',
          }}
        >
          <motion.img
            src="/chile-final.svg"
            alt="Pepper"
            draggable={false}
            animate={{
              rotate: [-12, -10, -13, -11, -12],
              y: [0, -15, 2, -2, 0],
              
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-[260px] select-none drop-shadow-2xl"
            style={{
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="pointer-events-none relative flex flex-col items-center justify-center text-center"
        >
          <h1
            className="relative z-20 leading-[0.84] tracking-[-0.03em]"
            style={{ fontFamily: 'Futura, sans-serif' }}
          >
            <span className="block text-[135px] font-black text-white">FOOD</span>
            <span className="mt-2 block text-[122px] font-black text-[#FFE3AC]">DREAMERS</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.9 }}
            className="relative z-[70] mt-4 text-[30px] font-bold text-[#7a1a1a]"
            style={{ fontFamily: 'Futura, sans-serif' }}
          >
            The Global Food Storytelling Company
          </motion.p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.96 }}
            animate={{
              boxShadow: [
                '0 8px 20px rgba(0,0,0,.18)',
                '0 12px 28px rgba(0,0,0,.28)',
                '0 8px 20px rgba(0,0,0,.18)',
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            className="pointer-events-auto relative z-[60] mt-10 rounded-[18px] bg-[#FFE3AC] px-9 py-3 text-[34px] font-bold text-[#7A0808] shadow-xl"
            style={{ fontFamily: 'Futura, sans-serif' }}
          >
            LET&apos;S DREAM!
          </motion.a>
        </motion.div>
        <BouncingHeroIcon
  onClick={() => setActiveSocialVideo("/videos web/principal/reel_platos.mp4")}
/>
 </div>
      </section>
<section
  id="services"
  className="relative min-h-[500px] overflow-hidden bg-[#E6A523] px-[7vw] pb-[70px] pt-[145px]"
>
  <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,227,172,0.28),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(0,0,0,0.18),transparent_36%)]" />

  <div className="relative mx-auto min-h-[590px] w-full max-w-[1440px]">
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative z-20"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
      <h2 className="max-w-[800px] text-[80px] font-regular uppercase leading-[0.96] tracking-[-0.02em]">
        <span className="text-white">A </span>
        <span className="text-[#00471A]">FULL-SERVICE</span>
        <br />
        <span className="text-white">CREATIVE STUDIO</span>
        <br />
        <span className="text-[#00471A]">SPECIALIZED</span>
        <span className="text-white"> IN FOOD</span>
      </h2>

      <div className="mt-20 origin-left scale-[0.82]">
        <TypeAnimation />
      </div>

      <p className="mt-14 text-[50px] font-regular uppercase leading-none text-white">
        FOOD IS NOT THE END, ITS THE MEANS...
      </p>
    </motion.div>

    <motion.div
      drag
      dragConstraints={{
        top: -360,
        left: -700,
        right: 700,
        bottom: 450,
      }}
      dragElastic={0.08}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
      whileInView={{ opacity: 1, scale: 2.5, rotate: 0 }}
      whileHover={{ scale: 2.8 }}
      whileDrag={{ scale: 2.3 }}
      viewport={{ once: true, amount: 0.35 }}
      className="absolute left-[44%] top-[26%] z-40 cursor-grab active:cursor-grabbing"
    >
      <motion.img
        src="/lemon.svg"
        alt="Lemon"
        draggable={false}
        className="w-[150px] select-none drop-shadow-[0_55px_45px_rgba(0,0,0,0.35)]"
        animate={{
          rotate: [0, 5, -3, 2, 0],
          y: [0, -4, 3, -2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ pointerEvents: 'none' }}
      />
    </motion.div>

    {/* VIDEO CARD */}
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      viewport={{ once: true, amount: 0.35 }}
      className="group absolute right-[0] top-[1%] h-[500px] w-[390px] overflow-hidden rounded-[22px] bg-black"
    >
      <video
        ref={videoRef}
        src="/demo.mp4"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        className="relative z-0 h-full w-full object-cover"
      />

      <div className="pointer-events-auto absolute inset-0 z-[80] bg-gradient-to-b from-black/45 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute right-5 top-5 flex items-center gap-3">
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          <button
            onClick={() => videoRef.current?.requestFullscreen()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
            aria-label="Fullscreen video"
          >
            ⛶
          </button>
        </div>
      </div>
    </motion.div>

    <motion.button
      onClick={() => {
        document
          .getElementById('selected-work')
          ?.scrollIntoView({ behavior: 'smooth' });
      }}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.96 }}
      className="
  absolute
  right-[35px]
  top-[calc(1%+464px)]
        z-30
        h-[72px]
        w-[320px]
        cursor-pointer
        rounded-[14px]
        bg-[#FFE3AC]
        text-[40px]
        font-REGULAR
        text-[#00471A]
        shadow-lg
      "
      style={{ fontFamily: 'ANTON, sans-serif' }}
    >
      LET’S CREATE!
    </motion.button>
  </div>
</section>

<section
 ref={ecosystemRef}
  id="ecosystem"
 className="relative min-h-[120vh] overflow-hidden bg-[#0B5D1E] pt-[160px]"
>
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(163,255,90,0.16),transparent_28%),radial-gradient(circle_at_80%_75%,rgba(0,0,0,0.35),transparent_36%)]" />
 <div className="relative flex h-full w-full items-center justify-center">

  {/* TÍTULO CENTRAL */}
 <motion.h2
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{
    duration: 2.1,
    ease: 'easeOut',
  }}
  viewport={{ once: true, amount: 0.5 }}
  className="absolute top-[18%] z-20 text-center text-[90px] font-normal uppercase leading-[1] tracking-[-0.02em] text-white"
  style={{ fontFamily: 'Anton, sans-serif' }}
>
  A COMPLETE ECOSYSTEM
  
</motion.h2>

 {/* CARDS */}
<motion.div
  initial={{ opacity: 0 }}
  animate={ecosystemInView ? { opacity: 1 } : { opacity: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  className="absolute left-1/2 top-[60%] z-10 -translate-x-1/2 cursor-grab select-none active:cursor-grabbing"
  onPointerDown={(e) => {
    e.preventDefault();
  isDraggingCards.current = true;
  lastInteractionTime.current = Date.now();
  dragVelocity.current = 0;
  e.currentTarget.setPointerCapture(e.pointerId);
}}
onPointerMove={(e) => {
  if (e.buttons === 1) {
    const movement = e.movementX * 0.18;

    lastInteractionTime.current = Date.now();
    dragVelocity.current = movement;

    const next = wrapAngle(cardsX.get() + movement);
    cardsX.set(next);
  }
}}
onPointerUp={() => {
  const current = cardsX.get();

  lastInteractionTime.current = Date.now();

animate(cardsX, current + dragVelocity.current * 2, {
  type: 'inertia',
  velocity: dragVelocity.current * 50,
  power: 0.8,
  timeConstant: 100,
  restDelta: 0.01,
});

  setTimeout(() => {
    isDraggingCards.current = false;
    lastInteractionTime.current = Date.now();
  }, 900);
}}
>
  {infiniteEcosystemItems.map((item, i) => {
    return (
      <EcosystemCard
        key={i}
        item={item}
        i={i}
        cardsX={cardsX}
      />
    );
  })}
</motion.div>

<motion.button
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.9,
    delay: 0.2,
    ease: 'easeOut',
  }}
  viewport={{ once: true }}
  whileHover={{
    scale: 1.1,
    y: -3,
  }}
  whileTap={{
    scale: 0.96,
  }}
  className="
    absolute
    bottom-[-680px]
    left-1/2
    z-[40]
    -translate-x-1/2
    rounded-[16px]
    bg-[#A3FF5A]
    px-10
    py-4
    text-[30px]
    uppercase
    text-[#0B5D1E]
    shadow-[0_10px_35px_rgba(0,0,0,0.28)]
  "
  style={{ fontFamily: 'Anton, sans-serif' }}
>
  Explore Everything
</motion.button>

</div>
</section>
<section
  id="sequence"
  className="relative h-[190vh] overflow-hidden"
  style={{
    backgroundImage: "url('/frames/sequence/frame-0101.jpg')",
    backgroundSize: '100.04% auto',
backgroundPosition: 'center bottom',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black',
  }}
>
  <canvas
    ref={sequenceCanvasRef}
    className={
      sequenceActive
        ? 'fixed left-0 top-0 z-[50] block h-screen w-screen'
        : 'absolute left-0 top-0 block h-screen w-screen'
    }
  />
  <div className="relative mx-auto h-full w-full max-w-[1510px]">
  {/* LEFT GRADIENT */}
<div className="pointer-events-none absolute left-0 top-0 z-[60] h-full w-[32%] bg-gradient-to-r from-black/90 via-black/45 to-transparent" />

{/* RIGHT GRADIENT */}
<div className="pointer-events-none absolute right-0 top-0 z-[60] h-full w-[32%] bg-gradient-to-l from-black/90 via-black/45 to-transparent" />

{/* LEFT TEXT */}
<motion.div
  initial={{ opacity: 0, x: -80 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{
    duration: 1.2,
    ease: 'easeOut',
  }}
  viewport={{ once: true, amount: 0.4 }}
  className="absolute left-[6vw] top-1/2 z-[70] max-w-[420px] -translate-y-1/2"
>
  <h2
    className="text-[82px] uppercase leading-[0.92] tracking-[-0.03em] text-white"
    style={{ fontFamily: 'Anton, sans-serif' }}
  >
    WE BUILD
    <br />
    FOOD STORIES
  </h2>

  <p className="mt-6 text-[18px] leading-relaxed text-white/75">
    Cinematic visuals crafted to make food unforgettable.
  </p>
</motion.div>

{/* RIGHT TEXT */}
<motion.div
  initial={{ opacity: 0, x: 80 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{
    duration: 1.2,
    delay: 0.15,
    ease: 'easeOut',
  }}
  viewport={{ once: true, amount: 0.4 }}
  className="absolute right-[6vw] top-1/2 z-[70] max-w-[360px] -translate-y-1/2 text-right"
>
  <h3
    className="text-[42px] uppercase leading-[1] tracking-[-0.02em] text-[#FFE3AC]"
    style={{ fontFamily: 'Anton, sans-serif' }}
  >
    FRAME BY FRAME
  </h3>

  <p className="mt-5 text-[17px] leading-relaxed text-white/70">
    Designed to feel immersive, dynamic, and alive through motion.
  </p>
</motion.div>
<motion.button
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{
    duration: 1,
    delay: 0.35,
    ease: 'easeOut',
  }}
  viewport={{ once: true, amount: 0.4 }}
  whileHover={{
    scale: 1.05,
    y: -4,
  }}
  whileTap={{
    scale: 0.96,
  }}
  className="
    absolute
    bottom-[20%]
    left-1/2
    z-[80]
    -translate-x-1/2
    rounded-[18px]
    bg-white
    px-10
    py-4
    text-[28px]
    uppercase
    text-black
    shadow-[0_12px_40px_rgba(0,0,0,0.35)]
  "
  style={{ fontFamily: 'Anton, sans-serif' }}
>
  Watch The Story
</motion.button>
</div>
</section>
<section
  id="social-media"
  className="relative min-h-screen overflow-hidden bg-[#031B50] px-[6vw] py-[130px] text-white"
>
  
  {/* BACKGROUND DEPTH */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(79,163,255,0.24),transparent_34%),radial-gradient(circle_at_15%_80%,rgba(0,0,0,0.5),transparent_38%)]" />

  {/* LEFT GRADIENT FOR TEXT */}
<div className="pointer-events-none absolute left-0 top-0 z-[5] h-full w-[58%] bg-gradient-to-r from-[#031B50] via-[#031B50]/92 to-transparent" />

{/* GIANT SOCIAL ORBIT */}
<div className="absolute -right-[42vw] -top-[68vh] z-[20] h-[1500px] w-[1500px]">
  {/* STATIC ORBIT LABELS */}
  <svg
    className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
    viewBox="0 0 1500 1500"
    fill="none"
  >
    <defs>
      <path
        id="tiktokPath"
        d="M 235 520 A 530 580 0 0 0 490 1245"
      />

      <path
        id="instagramPath"
        d="M 410 455 A 245 390 0 0 0 735 1010"
      />

      <path
        id="youtubePath"
        d="M 555 530 A 135 205 0 0 0 900 790"
      />
    </defs>

    <text
      className="text-[32px] uppercase tracking-[0.45em] fill-white/12"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
      <textPath href="#youtubePath" startOffset="29%">
        YouTube
      </textPath>
    </text>

    <text
      className="text-[32px] uppercase tracking-[0.45em] fill-white/12"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
      <textPath href="#instagramPath" startOffset="40%">
        Instagram
      </textPath>
    </text>

    <text
      className="text-[32px] uppercase tracking-[0.45em] fill-white/12"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
      <textPath href="#tiktokPath" startOffset="48%">
        TikTok
      </textPath>
    </text>
  </svg>

  {/* CENTER CORE */}
<div className="group absolute left-1/2 top-1/2 z-[20] flex h-[96px] w-[96px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[radial-gradient(circle,#ffffff,#dfe8ff)] shadow-[0_0_70px_rgba(79,163,255,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(255,255,255,0.95),0_0_90px_rgba(79,163,255,0.55)]">
  <div className="flex flex-col items-center justify-center leading-none">
    <span
      className="text-[17px] uppercase tracking-[0.08em] text-[#031B50] transition-all duration-300 group-hover:text-[#0A2C78]"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
      YOUR
    </span>

    <span
      className="mt-1 text-[18px] uppercase tracking-[0.08em] text-[#031B50] transition-all duration-300 group-hover:text-[#0A2C78]"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
      BRAND
    </span>
  </div>
</div>

  {/* ORBIT 1 */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    }}
    className="pointer-events-none absolute left-1/2 top-1/2 z-[10] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)]"
  >
    <OrbitPoint angle={0}>
      <SocialBubble
        className=""
        size="h-[92px] w-[92px]"
         videoSrc="/videos web/horizontal/frappe_mazapan.mp4"
        onClick={() => setActiveSocialVideo("/videos web/horizontal/frappe_mazapan.mp4")}
      />
    </OrbitPoint>

    <OrbitPoint angle={120}>
      <SocialBubble
        className=""
        size="h-[82px] w-[82px]"
        videoSrc="/videos web/horizontal/mckormick.mp4"
        onClick={() => setActiveSocialVideo("/videos web/horizontal/mckormick.mp4")}
      />
    </OrbitPoint>

    <OrbitPoint angle={240}>
      <SocialBubble
        className=""
        size="h-[82px] w-[82px]"
        videoSrc="/videos web/horizontal/cereales.mp4"
        onClick={() => setActiveSocialVideo("/videos web/horizontal/cereales.mp4")}
      />
    </OrbitPoint>
  </motion.div>

  {/* ORBIT 2 */}
  <motion.div
    animate={{ rotate: -360 }}
    transition={{
      duration: 34,
      repeat: Infinity,
      ease: 'linear',
    }}
    className="pointer-events-none absolute left-1/2 top-1/2 z-[10] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/16 shadow-[inset_0_0_55px_rgba(255,255,255,0.04)]"
  >
    <OrbitPoint angle={0}>
      <SocialBubble
        className=""
        size="h-[88px] w-[88px]"
        videoSrc="/videos web/middle ring/campbells.mp4"
        onClick={() => setActiveSocialVideo("/videos web/middle ring/campbells.mp4")}
      />
    </OrbitPoint>

    <OrbitPoint angle={72}>
      <SocialBubble
        className=""
        size="h-[76px] w-[76px]"
        videoSrc="/videos web/middle ring/momentos_magicos.mp4"
        onClick={() => setActiveSocialVideo("/videos web/middle ring/momentos_magicos.mp4")}
      />
    </OrbitPoint>

    <OrbitPoint angle={144}>
      <SocialBubble
        className=""
        size="h-[76px] w-[76px]"
        videoSrc="/videos web/middle ring/nespresso.mp4"
        onClick={() => setActiveSocialVideo("/videos web/middle ring/nespresso.mp4")}
      />
    </OrbitPoint>

    <OrbitPoint angle={216}>
      <SocialBubble
        className=""
        size="h-[76px] w-[76px]"
         videoSrc="/videos web/middle ring/quaker.mp4"
        onClick={() => setActiveSocialVideo("/videos web/middle ring/quaker.mp4")}
      />
    </OrbitPoint>

    <OrbitPoint angle={288}>
      <SocialBubble
        className=""
        size="h-[76px] w-[76px]"
         videoSrc="/videos web/middle ring/te_chai_asmr.mp4"
        onClick={() => setActiveSocialVideo("/videos web/middle ring/te_chai_asmr.mp4")}
      />
    </OrbitPoint>
  </motion.div>

  {/* ORBIT 3 */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      duration: 50,
      repeat: Infinity,
      ease: 'linear',
    }}
    className="pointer-events-none absolute left-1/2 top-1/2 z-[10] h-[1120px] w-[1120px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12 shadow-[inset_0_0_70px_rgba(255,255,255,0.035)]"
  >
    <OrbitPoint angle={0}>
      <SocialBubble
        className=""
        size="h-[92px] w-[92px]"
         videoSrc="/videos web/vertical/afilar con piedra.mp4"
        onClick={() => setActiveSocialVideo("/videos web/vertical/afilar con piedra.mp4")}
      />
    </OrbitPoint>

    <OrbitPoint angle={72}>
      <SocialBubble
        className=""
        size="h-[92px] w-[92px]"
         videoSrc="/videos web/vertical/momento improvisado.mp4"
        onClick={() => setActiveSocialVideo("/videos web/vertical/momento improvisado.mp4")}
      />
    </OrbitPoint>

    <OrbitPoint angle={144}>
      <SocialBubble
        className=""
        size="h-[92px] w-[92px]"
         videoSrc="/videos web/vertical/margarita de piña.mp4"
        onClick={() => setActiveSocialVideo("/videos web/vertical/margarita de piña.mp4")}
      />
    </OrbitPoint>

    <OrbitPoint angle={216}>
      <SocialBubble
        className=""
        size="h-[92px] w-[92px]"
         videoSrc="/videos web/vertical/pollo y arroz.mp4"
        onClick={() => setActiveSocialVideo("/videos web/vertical/pollo y arroz.mp4")}
      />
    </OrbitPoint>

    <OrbitPoint angle={288}>
      <SocialBubble
        className=""
        size="h-[92px] w-[92px]"
         videoSrc="/videos web/vertical/tablas y tapas.mp4"
        onClick={() => setActiveSocialVideo("/videos web/vertical/tablas y tapas.mp4")}
      />
    </OrbitPoint>
  </motion.div>
</div>

  {/* TEXT CONTENT */}
  <div className="relative z-10 mx-auto w-full max-w-[1512px]">
  <div className="max-w-[760px]">

    <motion.h2
  initial={{ opacity: 0, y: 35 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: 'easeOut' }}
  viewport={{ once: true }}
  className="text-[150px] uppercase leading-[0.87] tracking-[0.01em] text-[#3F8DFF] transition-all duration-300 hover:text-[#6FB6FF] hover:[text-shadow:0_0_18px_rgba(79,163,255,0.75),0_0_46px_rgba(79,163,255,0.35)]"
  style={{ fontFamily: 'Anton, sans-serif' }}
>
  SOCIAL
  <br />
  MEDIA
</motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.15 }}
      viewport={{ once: true }}
      className="mt-8 text-[24px] font-bold uppercase text-white"
    >
      MULTI-PLATFORM CONTENT + SCROLL-STOPPING VIRALITY
    </motion.p>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35 }}
      viewport={{ once: true }}
      className="mt-8 max-w-[580px] text-[20px] leading-relaxed text-white/75"
    >
      We create platform-native food content designed for reach, retention,
      community, and conversion across the channels where culture moves fastest.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.45 }}
      viewport={{ once: true }}
      className="mt-10 flex flex-wrap gap-3"
    >
      
    </motion.div>

    <motion.button
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.05 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.09, y: -3 }}
      whileTap={{ scale: 0.96 }}
      className="mt-12 rounded-[14px] border border-[#3F8DFF] bg-[#3F8DFF]/10 px-9 py-4 text-[22px] uppercase text-white shadow-[0_0_35px_rgba(63,141,255,0.22)]"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
      LET’S CREATE VIRAL FOOD CONTENT
    </motion.button>
  </div>
  </div>
</section>
<section
  ref={aiLabRef}
  id="ai-lab"
  className="relative min-h-screen overflow-hidden bg-[#07010D] px-[6vw] py-[140px]"
>
  {/* BACKGROUND GLOW */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(168,85,247,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.10),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.08),transparent_30%)]" />

  <div className="relative mx-auto flex min-h-[85vh] w-full max-w-[1512px] items-center justify-between">
    
    {/* LEFT */}
    <div className="relative z-20 max-w-[320px]">

      <h2
        className="mt-6 text-[120px] uppercase leading-[0.88] tracking-[-0.05em] text-white"
        style={{ fontFamily: 'Anton, sans-serif' }}
      >
        <span className="text-[#C084FC]">
  AI
</span>

<br />

<span className="text-white">
  TASTE
</span>

<br />

<span className="text-white">
  LAB
</span>
      </h2>

      <p className="mt-8 text-[18px] leading-relaxed text-white/60">
        AI expands culinary storytelling.
      </p>

      <button
        className="
          mt-10
          rounded-[16px]
          border
          border-[#C084FC]/30
          bg-[#12071F]
          px-8
          py-4
          text-[20px]
          uppercase
          text-[#E9D5FF]
          transition
          hover:border-[#C084FC]
          hover:bg-[#1B0B2B]
        "
        style={{ fontFamily: 'Anton, sans-serif' }}
      >
        Explore The Lab
      </button>
    </div>

   {/* CENTER VISUAL */}
<div className="relative z-10 flex flex-1 flex-col items-center justify-center">
  <motion.div
    initial={{ opacity: 0, scale: 1.99, y: 40 }}
    animate={
      aiLabInView
        ? { opacity: 1, scale: 1, y: 0 }
        : { opacity: 0, scale: 2.92, y: 40 }
    }
    transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
  >
    <div className="mb-8 flex flex-col items-center">
      <span
        className={`text-[48px] uppercase tracking-[0.15em] text-[#C084FC] ${anton.className}`}
      >
        MIXED REALITY
      </span>

      <div className="mt-4 h-[1px] w-[180px] bg-gradient-to-r from-transparent via-[#C084FC]/70 to-transparent" />
    </div>

    <BurgerBeforeAfter />
  </motion.div>
</div>
   {/* RIGHT SIDE */}
<div className="relative z-20 flex w-[340px] flex-col gap-5">
  {[ 
    ['WE MAKE IT', '', 0.4],
    ['', 'Whatever', 0.95],
    ['', 'It Takes', 1.5],
  ].map(([title, text, delay], i) => (
    <motion.div
      key={`${title}-${text}-${i}`}
      initial={{
        borderColor: 'rgba(255,255,255,0.10)',
        boxShadow: '0 0 0 rgba(192,132,252,0)',
      }}
      animate={
        aiLabInView
          ? {
              borderColor: 'rgba(192,132,252,0.75)',
              boxShadow: '0 0 34px rgba(192,132,252,0.28)',
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: delay as number,
        ease: 'easeOut',
      }}
      className="relative rounded-[18px] border bg-white/[0.03] p-5 backdrop-blur-xl"
    >
      <motion.div
        className="pointer-events-none absolute -inset-[2px] rounded-[20px] border border-[#C084FC]/70"
        animate={
          aiLabInView
            ? {
                opacity: [0, 0.65, 0],
                boxShadow: [
                  '0 0 0 rgba(192,132,252,0)',
                  '0 0 38px rgba(192,132,252,0.42)',
                  '0 0 0 rgba(192,132,252,0)',
                ],
              }
            : { opacity: 0 }
        }
        transition={{
          duration: 2.2,
          delay: 2.4 + i * 0.25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

     <p
  className={`relative z-10 text-center text-[34px] uppercase tracking-[0.18em] text-[#C084FC] ${anton.className}`}
>
  {title}
</p>

<p
  className={`relative z-10 mt-1 text-center text-[38px] leading-relaxed text-white/80 ${anton.className}`}
>
  {text}
</p>
    </motion.div>
  ))}
</div>
  </div>
</section>
<footer
className="relative overflow-hidden bg-[#140824] px-[6vw] pb-10 pt-20 text-white">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.16),transparent_30%),radial-gradient(circle_at_80%_90%,rgba(163,255,90,0.08),transparent_30%)]" />
<div className="relative mx-auto w-full max-w-[1512px]">
  <div className="relative z-10 flex flex-col gap-20">
    {/* TOP */}
    <div className="flex flex-col justify-between gap-16 lg:flex-row">
      {/* LEFT */}
      <div className="max-w-[620px]">
        <p
          className="text-[18px] uppercase tracking-[0.22em] text-[#C084FC]"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          FOOD DREAMERS
        </p>

        <h2
          className="mt-5 text-[72px] uppercase leading-[0.98] tracking-[-0.04em] text-white"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          LET’S CREATE
          <br />
          SOMETHING
          <br />
          UNFORGETTABLE
        </h2>

      
        <motion.button
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.96 }}
          className="mt-10 rounded-[14px] bg-[#C084FC] px-9 py-4 text-[22px] uppercase text-black shadow-[0_12px_40px_rgba(79,163,255,0.28)]"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          START A PROJECT
        </motion.button>
      </div>

      {/* RIGHT */}
      <div className="grid grid-cols-2 gap-x-20 gap-y-12 text-[16px] uppercase">
        

        <div>
          <p className="mb-5 text-[#C084FC]">Social</p>

          <div className="flex flex-col gap-3 text-white/75">
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
            <a href="#">Facebook</a>
            <a href="#">YouTube</a>
          </div>
        </div>

        <div>
          <p className="mb-5 text-[#C084FC]">Contact</p>

          <div className="flex flex-col gap-3 text-white/75">
            <p>heldlo@fooddreamers.com</p>
            <p>MEXICO CITY, MX</p>
          </div>
        </div>

        <div>
          
          </div>
        </div>
      </div>
    </div>

    {/* BOTTOM */}
    <div className="flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 text-[14px] uppercase text-white/40 lg:flex-row lg:items-center">
      <p>© 2026 Food Dreamers. All Rights Reserved.</p>

      <div className="flex items-center gap-6">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms</a>
      </div>
    </div>
  </div>
  
</footer>
{activeSocialVideo && (
  <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 px-6 backdrop-blur-md">
    <button
      type="button"
      onClick={() => setActiveSocialVideo(null)}
      className="absolute right-8 top-8 z-[1001] rounded-full bg-white/15 px-5 py-3 text-[18px] text-white backdrop-blur-md hover:bg-white/25"
    >
      CLOSE
    </button>

    <video
      src={activeSocialVideo}
      controls
      controlsList="nodownload"
      disablePictureInPicture
      autoPlay
      playsInline
      className="max-h-[82vh] max-w-[90vw] rounded-[22px] shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
    />
  </div>
)}
</main>
  );
}
