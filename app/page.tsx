'use client';

import { useEffect, useRef, useState } from 'react';
import { Anton } from 'next/font/google';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import MobileMenu from './components/MobileMenu';


const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

function TypeAnimation() {
  const words = ['REAL', 'FASTER', 'BETTER', 'CREATIVE', 'ORGANIC', 'REMOTE', 'EFFICIENT', 'EASY'];
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
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  checkMobile();

  window.addEventListener('resize', checkMobile);

  return () => {
    window.removeEventListener('resize', checkMobile);
  };
}, []);
  const [slider, setSlider] = useState(50);

  const updateSlider = (clientX: number, element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);

    setSlider(percent);
  };

  return (
    <div
  className="relative aspect-square w-full max-w-[560px] select-none overflow-hidden"
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
  transform: `translateY(${isMobile ? '-10px' : '-18px'})`,
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
const storytellingFormats = [
  {
    title: 'TikTok',
    duration: '15–30 sec',
    video: '/timeline/tiktok-fixed.mp4',
  },
  {
    title: 'Reel',
    duration: '15–60 sec',
    video: '/timeline/reel.mp4',
  },
  {
    title: 'Campaign',
    duration: '30–90 sec',
    video: '/timeline/campaign.mp4',
  },
  {
    title: 'Branded Content',
    duration: '1–3 min',
    video: '/timeline/branded-content.mp4',
  },
  {
    title: 'TV Ads',
    duration: '15–60 sec',
    video: '/timeline/tv-ads.mp4',
  },
  {
    title: 'Brand Film',
    duration: '1–5 min',
    video: '/timeline/brand-film.mp4',
  },
  {
    title: 'Documentary',
    duration: 'Long Form',
    video: '/timeline/documentary.mp4',
  },
];
function ShareTypewriter() {
  const words = [
    'SHARE',
    'CONNECT',
    'INSPIRE',
    'ENTERTAIN',
    'EDUCATE',
    'MOVE',
    'REMEMBER',
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    let delay = isDeleting ? 55 : 85;

    // Cuando termina de escribir, pausa
    if (!isDeleting && displayText === currentWord) {
      delay = 1300;
    }

    // Cuando termina de borrar, pequeña pausa
    if (isDeleting && displayText === '') {
      delay = 250;
    }

    const timeout = window.setTimeout(() => {
      // TERMINÓ DE ESCRIBIR
      if (!isDeleting && displayText === currentWord) {
        setIsDeleting(true);
        return;
      }

      // TERMINÓ DE BORRAR
      if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
        return;
      }

      // ESCRIBIENDO
      if (!isDeleting) {
        setDisplayText(
          currentWord.slice(0, displayText.length + 1)
        );
        return;
      }

      // BORRANDO
      setDisplayText(
        currentWord.slice(0, displayText.length - 1)
      );
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <span className="inline-flex items-center whitespace-nowrap">
      {displayText}

      {/* CURSOR */}
      <motion.span
        animate={{
          opacity: [1, 1, 0, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="ml-[5px] inline-block h-[0.82em] w-[4px] bg-[#E6A523]"
      />
    </span>
  );
}
export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const [currentLogo, setCurrentLogo] = useState('/logos/logo-yellow.svg');
  const [activeSocialVideo, setActiveSocialVideo] = useState<string | null>(null);
  const [sequenceActive, setSequenceActive] = useState(false);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [isMobile, setIsMobile] = useState(false);
 const [activeFormat, setActiveFormat] = useState<number | null>(null);
 


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
const sequenceProgress = useMotionValue(0);

  const cardsX = useMotionValue(0);
  const frameCount = 120;

  const aiLabInView = useInView(aiLabRef, {
    once: true,
    amount: 0.45,
  });

  const ecosystemInView = useInView(ecosystemRef, {
    once: true,
    amount: 0.12,
  });
  useEffect(() => {
  const mediaQuery = window.matchMedia('(max-width: 767px)');

  const updateDevice = () => {
    setIsMobile(mediaQuery.matches);

    if (!mediaQuery.matches) {
      setMobileMenuOpen(false);
    }
  };

  updateDevice();

  mediaQuery.addEventListener('change', updateDevice);

  return () => {
    mediaQuery.removeEventListener('change', updateDevice);
  };
}, []);

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
  let currentIndex = 0;

  const getFrameSrc = (index: number) =>
    `/frames/sequence2/frame-${String(index + 1).padStart(4, '0')}.jpg`;

  const drawFrame = (index: number) => {
    const img = images[index];

    if (!img || !img.complete || !img.naturalWidth) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );

    const width = img.naturalWidth * scale;
    const height = img.naturalHeight * scale;

    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      img,
      x,
      y,
      width,
      height
    );
  };

  // PRELOAD
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();

    img.onload = () => {
      if (i === currentIndex) {
        drawFrame(i);
      }
    };

    img.src = getFrameSrc(i);
    images.push(img);
  }

  const handleScroll = () => {
  const section = document.getElementById('sequence');
  const viewport = document.getElementById('sequence-viewport');
  const content = document.getElementById('sequence-content');

 if (!section || !viewport || !content) return;

  const rect = section.getBoundingClientRect();

  const sectionHeight = section.offsetHeight;
  const viewportHeight = window.innerHeight;

  const availableScroll =
    sectionHeight - viewportHeight;

  if (availableScroll <= 0) return;

  // ==========================================
  // FRAME PROGRESS
  // ==========================================

  const progress = Math.min(
  Math.max(-rect.top / availableScroll, 0),
  1
);


const easedProgress = Math.pow(progress, 1.02);

currentIndex = Math.floor(
  easedProgress * (frameCount - 1)
);

currentIndex = Math.max(
  0,
  Math.min(frameCount - 1, currentIndex)
);

drawFrame(currentIndex);

// MOVE CONTENT UP
const contentY = progress * -420;

content.style.transform =
  `translate3d(0, ${contentY}px, 0)`;

// FADE CONTENT AT END
const contentOpacity =
  progress < 0.72
    ? 1
    : Math.max(
        0,
        1 - (progress - 0.72) / 0.28
      );

content.style.opacity =
  String(contentOpacity);
  // ==========================================
  // PIN THE VIEWPORT
  // ==========================================

  if (rect.top > 0) {
    // BEFORE SEQUENCE
    viewport.style.position = 'absolute';
    viewport.style.top = '0px';
    viewport.style.bottom = 'auto';
  } 
  
  else if (rect.bottom > viewportHeight) {
    // INSIDE SEQUENCE
    viewport.style.position = 'fixed';
    viewport.style.top = '0px';
    viewport.style.bottom = 'auto';
  } 
  
  else {
    // END OF SEQUENCE
    viewport.style.position = 'absolute';
    viewport.style.top = 'auto';
    viewport.style.bottom = '0px';
  }
};

const handleResize = () => {
  drawFrame(currentIndex);
};

window.addEventListener('scroll', handleScroll, {
  passive: true,
});

window.addEventListener('resize', handleResize);

if (images[0]) {
  images[0].onload = () => drawFrame(0);
}

handleScroll();

return () => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
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
     <header className="fixed left-0 top-0 z-[999] w-full border-b border-white/10 bg-black/10 backdrop-blur-3xl">
  <div className="flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:h-[88px] lg:px-10">
    {/* LOGO */}
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      type="button"
      onClick={() => {
        document
          .getElementById('home')
          ?.scrollIntoView({ behavior: 'smooth' });
      }}
      aria-label="Go to homepage"
      className="relative z-[120] flex cursor-pointer items-center"
    >
      <img
        src={currentLogo}
        alt="Food Dreamers"
        draggable={false}
        className="h-[72px] w-auto select-none lg:h-[106px]"
      />
    </motion.button>

    {/* DESKTOP NAVIGATION */}
    <nav
      className="hidden items-center gap-6 md:flex xl:gap-5"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
      <motion.a
        whileHover={{ y: -2 }}
        href="#home"
        className="text-base tracking-wide transition-colors hover:text-[#FFE3AC] xl:text-lg"
      >
        HOME
      </motion.a>

      <motion.a
        whileHover={{ y: -2 }}
        href="work"
        className="text-base tracking-wide transition-colors hover:text-[#FFE3AC] xl:text-lg"
      >
        SERVICES
      </motion.a>

      <motion.a
        whileHover={{ y: -2 }}
        href="/Book"
        className="text-base tracking-wide transition-colors hover:text-[#FFE3AC] xl:text-lg"
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

    {/* DESKTOP SOCIAL ICONS */}
    <div className="hidden items-center gap-4 text-white md:flex xl:gap-5">
      <motion.a
        href="#"
        whileHover={{ scale: 1.15, y: -2 }}
        aria-label="Instagram"
        className="transition-colors hover:text-[#FFE3AC]"
      >
        <InstagramIcon />
      </motion.a>

      <motion.a
        href="#"
        whileHover={{ scale: 1.15, y: -2 }}
        aria-label="Facebook"
        className="transition-colors hover:text-[#FFE3AC]"
      >
        <FacebookIcon />
      </motion.a>

      <motion.a
        href="#"
        whileHover={{ scale: 1.15, y: -2 }}
        aria-label="TikTok"
        className="transition-colors hover:text-[#FFE3AC]"
      >
        <TikTokIcon />
      </motion.a>
    </div>

{/* MOBILE MENU BUTTON */}
{isMobile && (
  <button
    type="button"
    onClick={() => setMobileMenuOpen(true)}
    aria-expanded={mobileMenuOpen}
    aria-controls="mobile-navigation"
    aria-label="Open navigation menu"
    className="flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm uppercase text-white"
    style={{ fontFamily: 'Anton, sans-serif' }}
  >
    MENU
  </button>
)}
  </div>
  <MobileMenu
  open={mobileMenuOpen}
  onClose={() => setMobileMenuOpen(false)}
/>
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
    left: isMobile ? '-20px' : 'calc(50% - 520px)',
    top: isMobile ? '125px' : 'calc(50% - 209px)',
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
    className="w-[118px] select-none drop-shadow-2xl md:w-[170px] lg:w-[260px]"
    style={{
      pointerEvents: 'none',
    }}
  />
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.1, ease: 'easeOut' }}
  className="pointer-events-none relative flex w-full flex-col items-center justify-center px-5 text-center sm:px-8"
>
  <h1
    className="relative z-20 leading-[0.84] tracking-[-0.03em]"
    style={{ fontFamily: 'Futura, sans-serif' }}
  >
    <span className="block text-[62px] font-black text-white sm:text-[76px] md:text-[94px] lg:text-[135px]">
      FOOD
    </span>

    <span className="mt-2 block text-[54px] font-black text-[#FFE3AC] sm:text-[68px] md:text-[86px] lg:text-[122px]">
      DREAMERS
    </span>
  </h1>

  <motion.p
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.35, duration: 0.9 }}
    className="relative z-[70] mt-5 max-w-[330px] text-[17px] font-bold leading-tight text-[#7a1a1a] sm:max-w-none sm:text-[20px] md:text-[24px] lg:mt-4 lg:text-[30px]"
    style={{ fontFamily: 'Futura, sans-serif' }}
  >
    The Global Food Storytelling Company
  </motion.p>

  <motion.a
    href="/contact"
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
    className="pointer-events-auto relative z-[60] mt-8 rounded-[14px] bg-[#FFE3AC] px-6 py-3 text-[20px] font-bold text-[#7A0808] shadow-xl sm:px-8 sm:text-[24px] md:text-[28px] lg:mt-10 lg:rounded-[18px] lg:px-9 lg:text-[34px]"
    style={{ fontFamily: 'Futura, sans-serif' }}
  >
    LET&apos;S DREAM!
  </motion.a>
</motion.div>

<BouncingHeroIcon
  onClick={() =>
    setActiveSocialVideo(
      '/videos web/principal/reel_platos.mp4'
    )
  }
/>
 </div>
      </section>
      
<section
  id="services"
  className="relative overflow-hidden bg-[#E6A523] px-5 pb-20 pt-28 sm:px-8 lg:min-h-[500px] lg:px-[7vw] lg:pb-[70px] lg:pt-[145px]"
>
  {/* BACKGROUND */}
  <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,227,172,0.28),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(0,0,0,0.18),transparent_36%)]" />

  <div className="relative z-10 mx-auto w-full max-w-[1440px] lg:min-h-[590px]">
    {/* TEXT CONTENT */}
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative z-20 lg:max-w-[800px]"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
      <h2 className="text-[46px] font-normal uppercase leading-[0.96] tracking-[-0.02em] sm:text-[58px] md:text-[68px] lg:max-w-[800px] lg:text-[80px]">
        <span className="text-white">A </span>
        <span className="text-[#00471A]">FULL-SERVICE</span>

        <br />

        <span className="text-white">CREATIVE STUDIO</span>

        <br />

        <span className="text-[#00471A]">SPECIALIZED</span>
        <span className="text-white"> IN FOOD</span>
      </h2>

      {/* TYPE ANIMATION */}
      <div className="mt-12 h-[92px] w-full overflow-hidden sm:mt-16 sm:h-[120px] lg:mt-20 lg:h-auto">
        <div className="origin-left scale-[0.42] sm:scale-[0.58] md:scale-[0.68] lg:scale-[0.82]">
          <TypeAnimation />
        </div>
      </div>

      <p className="mt-5 max-w-[360px] text-[28px] font-normal uppercase leading-[0.98] text-white sm:max-w-[520px] sm:text-[36px] lg:mt-14 lg:max-w-none lg:text-[50px]">
        FOOD IS NOT THE END, IT&apos;S THE MEANS...
      </p>
    </motion.div>

    {/* LEMON */}
    <motion.div
      drag={!isMobile}
      dragConstraints={{
        top: -360,
        left: -700,
        right: 700,
        bottom: 450,
      }}
      dragElastic={0.08}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
      whileInView={{
        opacity: 1,
        scale: isMobile ? 1.1 : 2.5,
        rotate: 0,
      }}
      whileHover={{
        scale: isMobile ? 1.1 : 2.8,
      }}
      whileDrag={{
        scale: isMobile ? 1.1 : 2.3,
      }}
      viewport={{ once: true, amount: 0.35 }}
      className="pointer-events-none absolute left-[255px] top-[30px] z-30 sm:left-[260px] sm:top-[70px] lg:pointer-events-auto lg:left-[48%] lg:right-auto lg:top-[26%] lg:cursor-grab lg:active:cursor-grabbing"
    >
      <motion.img
        src="/lemon.svg"
        alt="Lemon"
        draggable={false}
        className="w-[130px] select-none drop-shadow-[0_28px_28px_rgba(0,0,0,0.3)] sm:w-[100px] lg:w-[140px] lg:drop-shadow-[0_55px_45px_rgba(0,0,0,0.35)]"
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

    {/* MOBILE/DESKTOP VIDEO COLUMN */}
    <div className="relative z-20 mt-14 flex w-full flex-col items-center sm:mt-16 lg:absolute lg:right-0 lg:top-[1%] lg:mt-0 lg:w-[390px]">
      {/* VIDEO CARD */}
      <motion.div
        initial={{
          opacity: 0,
          x: isMobile ? 0 : 80,
          y: isMobile ? 35 : 0,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 1,
          ease: 'easeOut',
          delay: 0.2,
        }}
        viewport={{ once: true, amount: 0.25 }}
        className="group relative aspect-[4/5] w-full max-w-[430px] overflow-hidden rounded-[20px] bg-black shadow-[0_25px_70px_rgba(0,0,0,0.28)] lg:h-[500px] lg:w-[390px] lg:max-w-none lg:rounded-[22px]"
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

        {/* CONTROLS */}
        <div className="pointer-events-auto absolute inset-0 z-[80] bg-gradient-to-b from-black/45 via-transparent to-transparent opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
          <div className="absolute right-4 top-4 flex items-center gap-3 lg:right-5 lg:top-5">
            <button
              type="button"
              onClick={() => setIsMuted((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md transition hover:bg-black/50"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>

            <button
              type="button"
              onClick={() => videoRef.current?.requestFullscreen()}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md transition hover:bg-black/50"
              aria-label="Fullscreen video"
            >
              ⛶
            </button>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.button
        type="button"
        onClick={() => {
          window.location.href = '/contact';
        }}
        whileHover={{ scale: 1.08, y: -3 }}
        whileTap={{ scale: 0.96 }}
        className="relative z-30 mt-5 flex h-[58px] w-full max-w-[320px] cursor-pointer items-center justify-center rounded-[14px] bg-[#FFE3AC] text-[28px] font-normal text-[#00471A] shadow-lg sm:text-[32px] lg:h-[72px] lg:w-[320px] lg:text-[40px]"
        style={{ fontFamily: 'Anton, sans-serif' }}
      >
        LET&apos;S CREATE!
      </motion.button>
    </div>
  </div>
</section>
{/* =========================================================
    TO SHARE — STORYTELLING FORMATS
========================================================= */}
<section
  id="storytelling-formats"
  className="relative overflow-hidden bg-[#F05A24] text-white"
>
  {/* BACKGROUND DEPTH */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(163,255,90,0.20),transparent_38%)]" />

  <div className="pointer-events-none absolute left-[-15%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#A3FF5A]/10 blur-[140px]" />

  <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-black/20 blur-[120px]" />

  {/* =====================================================
      DESKTOP
  ===================================================== */}
  <div className="relative z-10 hidden min-h-screen flex-col justify-center px-[6vw] py-[120px] lg:flex">

    {/* TITLE */}
    <div className="mx-auto w-full max-w-[1512px] text-center">
      

      <div className="flex min-h-[150px] items-center justify-center gap-6 lg:translate-x-[70px]">
        <span
          className="text-[100px] uppercase leading-none tracking-[-0.04em] text-white"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          THE MEANS TO
        </span>

       <div className="relative flex h-[150px] min-w-[720px] items-center justify-start overflow-hidden">
  <span
    className="text-[130px] uppercase leading-none tracking-[-0.04em] text-[#17752C]"
    style={{ fontFamily: 'Anton, sans-serif' }}
  >
    <ShareTypewriter />
  </span>
</div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
        viewport={{ once: true }}
        className="mx-auto mt-5 max-w-[760px] text-[22px] leading-relaxed text-white/65"
      >
        From a 15-second scroll stopper to a full documentary.
      </motion.p>
    </div>

    {/* =====================================================
    TIMELINE — DESKTOP
===================================================== */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{
    duration: 1,
    delay: 0.25,
    ease: 'easeOut',
  }}
  viewport={{
    once: true,
    amount: 0.3,
  }}
  className="relative mx-auto mt-24 w-full max-w-[1380px]"
>
  {/* SHORT / LONG FORM */}
  <div
    className="mb-8 flex items-center justify-between text-[14px] uppercase tracking-[0.24em] text-white/45"
    style={{ fontFamily: 'Anton, sans-serif' }}
  >
    <span>Short Form</span>

    <div className="mx-8 h-[1px] flex-1 bg-gradient-to-r from-white/10 via-[#A3FF5A]/50 to-white/10" />

    <span>Long Form</span>
  </div>

  {/* VIDEO TIMELINE */}
  <div className="relative">
    {/* LINE BEHIND CARDS */}
    <div className="absolute left-[7%] right-[7%] top-[112px] z-0 h-[2px] bg-white/15" />

    <div className="absolute left-[7%] right-[7%] top-[112px] z-0 h-[1px] bg-gradient-to-r from-[#A3FF5A]/20 via-[#A3FF5A] to-white/30 shadow-[0_0_18px_rgba(163,255,90,0.35)]" />

    <div className="relative z-10 grid grid-cols-7 gap-3">
      {storytellingFormats.map((item, index) => {
        const isActive = activeFormat === index;

        return (
          <div
            key={item.title}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setActiveFormat(index)}
            onMouseLeave={() => setActiveFormat(null)}
          >
            {/* VIDEO PREVIEW */}
            <motion.button
              type="button"
              onClick={() =>
                setActiveSocialVideo(item.video)
              }
              animate={{
                scale: isActive ? 1.12 : 1,
                y: isActive ? -10 : 0,
              }}
              transition={{
                duration: 0.35,
                ease: 'easeOut',
              }}
              className="group relative h-[190px] w-[150px] overflow-hidden rounded-[18px] border border-white/15 bg-black shadow-[0_18px_45px_rgba(0,0,0,0.30)]"
              aria-label={`Play ${item.title}`}
            >
              {/* LOOPING PREVIEW */}
              <video
                src={item.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* DARK DEPTH */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

              {/* LIVE INDICATOR */}
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 backdrop-blur-md">
                <motion.span
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    scale: [0.85, 1, 0.85],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="h-[6px] w-[6px] rounded-full bg-[#A3FF5A] shadow-[0_0_10px_rgba(163,255,90,0.8)]"
                />

                <span
                  className="text-[9px] uppercase tracking-[0.18em] text-white/75"
                  style={{
                    fontFamily: 'Anton, sans-serif',
                  }}
                >
                  Preview
                </span>
              </div>

              {/* PLAY ON HOVER */}
              <motion.div
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 0.75,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/20"
              >
                <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full border border-white/35 bg-white/15 text-[18px] text-white shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                  ▶
                </div>
              </motion.div>

              {/* FORMAT INSIDE VIDEO */}
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p
                  className="text-[16px] uppercase leading-none text-white"
                  style={{
                    fontFamily: 'Anton, sans-serif',
                  }}
                >
                  
                </p>
              </div>
            </motion.button>

            {/* TIMELINE CONNECTOR */}
            <div className="relative mt-3 flex h-[27px] items-center justify-center">
              <div className="absolute top-0 h-[14px] w-[1px] bg-white/25" />

              <motion.div
                animate={{
                  scale: isActive ? 1.45 : 1,
                  backgroundColor: isActive
                    ? '#A3FF5A'
                    : '#FFFFFF',
                  boxShadow: isActive
                    ? '0 0 28px rgba(163,255,90,0.9)'
                    : '0 0 0 rgba(163,255,90,0)',
                }}
                transition={{
                  duration: 0.3,
                }}
                className="absolute bottom-0 h-[13px] w-[13px] rounded-full border-[3px] border-[#0B5D1E]"
              />
            </div>

            {/* LABEL */}
            <motion.div
              animate={{
                opacity:
                  activeFormat === null || isActive
                    ? 1
                    : 0.4,
                y: isActive ? 3 : 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="mt-3 text-center"
            >
              <p
                className="text-[17px] uppercase leading-tight text-white"
                style={{
                  fontFamily: 'Anton, sans-serif',
                }}
              >
                {item.title}
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-white/40">
                {item.duration}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  </div>

  
</motion.div>
  </div>

  {/* =====================================================
      MOBILE
  ===================================================== */}
  <div className="relative z-10 px-5 py-14 lg:hidden">

    {/* MOBILE TITLE */}
    <div className="text-center">

      <div className="mt-4 flex min-h-[86px] items-center justify-center gap-2 overflow-hidden">
        <span
          className="text-[22px] uppercase leading-none text-white"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          THE MEANS TO
        </span>

       <div className="relative flex h-[76px] min-w-[245px] items-center">
  <span
    className="text-[52px] uppercase leading-none text-[#17752C]"
    style={{ fontFamily: 'Anton, sans-serif' }}
  >
    <ShareTypewriter />
  </span>
</div>
      </div>

      <p className="mx-auto mt-5 max-w-[330px] text-[16px] leading-relaxed text-white/60">
        From a 15-second scroll stopper to a full documentary.
      </p>
    </div>

    {/* MOBILE RANGE */}
    <div
      className="mt-14 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/40"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
      <span>Short Form</span>

      <span>Swipe →</span>

      <span>Long Form</span>
    </div>

    {/* MOBILE CAROUSEL */}
    <div className="-mx-5 mt-6 overflow-x-auto px-5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-4">
        {storytellingFormats.map((item, index) => (
          <motion.button
            key={item.title}
            type="button"
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              setActiveSocialVideo(item.video)
            }
            className="relative h-[360px] w-[245px] shrink-0 overflow-hidden rounded-[22px] border border-white/15 bg-black text-left"
          >
            <video
              src={item.video}
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

            {/* NUMBER */}
            <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-[12px] text-white backdrop-blur-md">
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* PLAY */}
            <div className="absolute left-1/2 top-1/2 flex h-[56px] w-[56px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-[18px] backdrop-blur-xl">
              ▶
            </div>

            {/* TEXT */}
            <div className="absolute bottom-5 left-5 right-5">
              <p
                className="text-[28px] uppercase leading-none text-white"
                style={{
                  fontFamily: 'Anton, sans-serif',
                }}
              >
                {item.title}
              </p>

              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/50">
                {item.duration}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  </div>
</section>
<section
  ref={ecosystemRef}
  id="ecosystem"
  className="relative overflow-hidden bg-[#0B5D1E] px-5 pb-20 pt-28 sm:px-8 lg:min-h-[120vh] lg:px-0 lg:pb-0 lg:pt-[160px]"
>
  {/* BACKGROUND */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(163,255,90,0.16),transparent_28%),radial-gradient(circle_at_80%_75%,rgba(0,0,0,0.35),transparent_36%)]" />

  <div className="relative mx-auto w-full max-w-[1512px] lg:flex lg:h-full lg:items-center lg:justify-center">
    {/* TITLE */}
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: 'easeOut',
      }}
      viewport={{ once: true, amount: 0.15 }}
      className="relative z-20 text-center text-[46px] font-normal uppercase leading-[0.95] tracking-[-0.02em] text-white sm:text-[58px] md:text-[68px] lg:absolute lg:top-[18%] lg:text-[90px]"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
      A COMPLETE
      <br className="sm:hidden" />
      <span className="sm:ml-3">ECOSYSTEM</span>
    </motion.h2>

    {/* MOBILE CARDS */}
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.15,
        ease: 'easeOut',
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative z-20 mt-12 lg:hidden"
    >
      <div className="-mx-5 overflow-x-auto px-5 pb-6 sm:-mx-8 sm:px-8">
        <div className="flex w-max snap-x snap-mandatory gap-4">
          {ecosystemItems.map((item, i) => (
            <article
              key={`${item.image}-${i}`}
              className="relative h-[390px] w-[270px] flex-none snap-center overflow-hidden rounded-[20px] bg-[#A3FF5A] shadow-[0_24px_65px_rgba(0,0,0,0.32)] sm:h-[430px] sm:w-[300px]"
            >
              <img
                src={item.image}
                alt={item.title || item.description}
                draggable={false}
                className="absolute inset-0 h-full w-full select-none object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 z-10 p-5 text-white sm:p-6">
                {item.title && (
                  <h3
                    className="text-[27px] uppercase leading-[0.95]"
                    style={{ fontFamily: 'Anton, sans-serif' }}
                  >
                    {item.title}
                  </h3>
                )}

                <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                  {item.description}
                </p>
              </div>

              <div
                className="absolute right-4 top-4 flex h-9 min-w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 px-3 text-[12px] text-white/75 backdrop-blur-md"
                style={{ fontFamily: 'Anton, sans-serif' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-3">
        <div className="h-[1px] w-10 bg-[#A3FF5A]/45" />

        <p
          className="text-[13px] uppercase tracking-[0.2em] text-white/60"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          Swipe to explore
        </p>

        <div className="h-[1px] w-10 bg-[#A3FF5A]/45" />
      </div>
    </motion.div>

    {/* DESKTOP ORBIT */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={
        ecosystemInView
          ? { opacity: 1 }
          : { opacity: 0 }
      }
      transition={{
        duration: 0.6,
        ease: 'easeOut',
      }}
      className="absolute left-1/2 top-[60%] z-10 hidden -translate-x-1/2 cursor-grab select-none active:cursor-grabbing lg:block"
      onPointerDown={(e) => {
        e.preventDefault();

        isDraggingCards.current = true;
        lastInteractionTime.current = Date.now();
        dragVelocity.current = 0;

        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (e.buttons !== 1) return;

        const movement = e.movementX * 0.18;

        lastInteractionTime.current = Date.now();
        dragVelocity.current = movement;

        const next = wrapAngle(
          cardsX.get() + movement
        );

        cardsX.set(next);
      }}
      onPointerUp={() => {
        const current = cardsX.get();

        lastInteractionTime.current = Date.now();

        animate(
          cardsX,
          current + dragVelocity.current * 2,
          {
            type: 'inertia',
            velocity: dragVelocity.current * 50,
            power: 0.8,
            timeConstant: 100,
            restDelta: 0.01,
          }
        );

        setTimeout(() => {
          isDraggingCards.current = false;
          lastInteractionTime.current = Date.now();
        }, 900);
      }}
    >
      {infiniteEcosystemItems.map((item, i) => (
        <EcosystemCard
          key={`${item.image}-${i}`}
          item={item}
          i={i}
          cardsX={cardsX}
        />
      ))}
    </motion.div>

    {/* CTA */}
    <motion.a
      href="/work"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.2,
        ease: 'easeOut',
      }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.08,
        y: -3,
      }}
      whileTap={{
        scale: 0.96,
      }}
      className="relative z-40 mx-auto mt-10 flex w-full max-w-[310px] items-center justify-center rounded-[16px] bg-[#A3FF5A] px-8 py-4 text-center text-[25px] uppercase text-[#0B5D1E] shadow-[0_10px_35px_rgba(0,0,0,0.28)] sm:text-[28px] lg:absolute lg:bottom-[-680px] lg:left-1/2 lg:mt-0 lg:w-auto lg:max-w-none lg:-translate-x-1/2 lg:px-10 lg:text-[30px]"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
      Explore Everything
    </motion.a>
  </div>
</section>
<section
  id="sequence"
  className="relative min-h-screen bg-black md:h-[240vh]"
>
  {/* =====================================================
      MOBILE
      SE QUEDA ESTÁTICO
  ===================================================== */}

  <div className="relative min-h-screen overflow-hidden md:hidden">
    {/* MOBILE STATIC IMAGE */}
    <img
      src="/frames/sequence2/frame-0001.jpg"
      alt=""
      aria-hidden="true"
      draggable={false}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
    />

    {/* MOBILE DARK OVERLAY */}
    <div className="pointer-events-none absolute inset-0 z-[55] bg-black/60" />

    <div className="relative z-[65] flex min-h-screen flex-col justify-center px-5 pb-20 pt-28">
      {/* MOBILE LEFT TEXT */}
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
          duration: 1.2,
          ease: 'easeOut',
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="relative z-[70] max-w-[420px]"
      >
        <h2
          className="text-[54px] uppercase leading-[0.92] tracking-[-0.03em] text-white sm:text-[66px]"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          OUR
          <br />
          CREATIVE HUB
        </h2>

        <p className="mt-6 max-w-[340px] text-[17px] leading-relaxed text-white/75 sm:text-[18px]">
          Integrated prop house, prelight kitchen sets.
        </p>
      </motion.div>

      {/* MOBILE RIGHT TEXT */}
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
          duration: 1.2,
          delay: 0.15,
          ease: 'easeOut',
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        className="relative z-[70] mt-12 max-w-[360px] text-left"
      >
        <h3
          className="text-[32px] uppercase leading-[1] tracking-[-0.02em] text-[#FFE3AC] sm:text-[36px]"
          style={{ fontFamily: 'Anton, sans-serif' }}
        >
          15+ MODULAR KITCHENS
        </h3>

        <p className="mt-5 text-[17px] leading-relaxed text-white/70">
          All-in-One Remote Production Studio.
        </p>
      </motion.div>

      {/* MOBILE CTA */}
      <motion.button
        type="button"
        onClick={() =>
          setActiveSocialVideo(
            '/videos/creative-hub.mp4'
          )
        }
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 0.35,
          ease: 'easeOut',
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        whileTap={{
          scale: 0.96,
        }}
        className="relative z-[80] mx-auto mt-14 flex w-fit items-center justify-center rounded-[18px] bg-white px-8 py-4 text-[24px] uppercase text-black shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
        style={{ fontFamily: 'Anton, sans-serif' }}
      >
        Welcome to our Space
      </motion.button>
    </div>
  </div>

  {/* =====================================================
    DESKTOP SEQUENCE VIEWPORT
===================================================== */}
<div
  id="sequence-viewport"
  className="pointer-events-none absolute left-0 top-0 hidden h-screen w-full overflow-hidden md:block"
>
  {/* CANVAS */}
  <canvas
    ref={sequenceCanvasRef}
    className="absolute inset-0 z-[50] h-full w-full"
  />

  {/* DEPTH */}
  <div className="pointer-events-none absolute inset-0 z-[55] bg-black/10" />

  {/* LEFT GRADIENT */}
  <div className="pointer-events-none absolute left-0 top-0 z-[60] h-full w-[34%] bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

  {/* RIGHT GRADIENT */}
  <div className="pointer-events-none absolute right-0 top-0 z-[60] h-full w-[34%] bg-gradient-to-l from-black/85 via-black/40 to-transparent" />

  {/* =====================================================
      MOVING CONTENT
  ===================================================== */}
  <div
    id="sequence-content"
    className="absolute inset-0 z-[70]"
  >
    {/* LEFT TEXT */}
    <div className="absolute left-[6vw] top-[82%] max-w-[420px] -translate-y-1/2">
      <h2
        className="text-[82px] uppercase leading-[0.9] tracking-[-0.04em] text-white"
        style={{ fontFamily: 'Anton, sans-serif' }}
      >
        OUR
        <br />
        CREATIVE HUB
      </h2>

      <p className="mt-6 max-w-[340px] text-[18px] leading-relaxed text-white/75">
        Integrated prop house, prelight kitchen sets.
      </p>
    </div>

    {/* RIGHT TEXT */}
    <div className="absolute right-[6vw] top-[82%] max-w-[380px] -translate-y-1/2 text-right">
      <h3
        className="text-[56px] uppercase leading-[0.95] tracking-[-0.03em] text-[#FFE3AC]"
        style={{ fontFamily: 'Anton, sans-serif' }}
      >
        15+ MODULAR
        <br />
        KITCHENS
      </h3>

      <p className="mt-5 text-[18px] leading-relaxed text-white/70">
        All-in-One Remote Production Studio.
      </p>
    </div>

    {/* CTA */}
    <button
      type="button"
      onClick={() =>
        setActiveSocialVideo('/videos/creative-hub.mp4')
      }
      className="pointer-events-auto absolute bottom-[12%] left-1/2 -translate-x-1/2 rounded-[18px] bg-white px-10 py-4 text-[28px] uppercase text-black shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
      Welcome to our Space
    </button>
  </div>
</div>
</section>
<section
  id="social-media"
  className="relative overflow-hidden bg-[#031B50] px-5 py-24 text-white sm:px-8 md:min-h-screen md:px-[6vw] md:py-[130px]"
>
  {/* BACKGROUND DEPTH */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(79,163,255,0.24),transparent_34%),radial-gradient(circle_at_15%_80%,rgba(0,0,0,0.5),transparent_38%)]" />

  {/* DESKTOP LEFT GRADIENT */}
  <div className="pointer-events-none absolute left-0 top-0 z-[5] hidden h-full w-[58%] bg-gradient-to-r from-[#031B50] via-[#031B50]/92 to-transparent md:block" />

  <div className="relative z-10 mx-auto w-full max-w-[1512px]">
    {/* TEXT CONTENT */}
    <div className="max-w-[760px]">
      <motion.h2
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-[72px] uppercase leading-[0.87] tracking-[0.01em] text-[#3F8DFF] sm:text-[92px] md:text-[150px] md:transition-all md:duration-300 md:hover:text-[#6FB6FF] md:hover:[text-shadow:0_0_18px_rgba(79,163,255,0.75),0_0_46px_rgba(79,163,255,0.35)]"
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
        className="mt-7 max-w-[520px] text-[18px] font-bold uppercase leading-snug text-white sm:text-[21px] md:mt-8 md:text-[24px]"
      >
        MULTI-PLATFORM CONTENT DESING SCROLL-STOPPING VIRALITY
      </motion.p>

    </div>

    {/* MOBILE SOCIAL ROWS */}
    <div className="relative z-20 mt-14 space-y-12 md:hidden">
      {/* YOUTUBE */}
      <div>
        <div className="mb-5 flex items-end justify-between">
          <h3
            className="text-[30px] uppercase text-[#6FB6FF]"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            YouTube
          </h3>

          <p className="text-[12px] uppercase tracking-[0.18em] text-white/40">
            Swipe
          </p>
        </div>

        <div className="-mx-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
          <div className="flex w-max snap-x snap-mandatory gap-4">
            {[
              '/videos web/horizontal/frappe_mazapan.mp4',
              '/videos web/horizontal/mckormick.mp4',
              '/videos web/horizontal/cereales.mp4',
            ].map((video, index) => (
              <button
                key={video}
                type="button"
                onClick={() => setActiveSocialVideo(video)}
                aria-label={`Open YouTube video ${index + 1}`}
                className="group relative aspect-video w-[285px] flex-none snap-center overflow-hidden rounded-[18px] border border-white/15 bg-black shadow-[0_20px_55px_rgba(0,0,0,0.3)] sm:w-[340px]"
              >
                <video
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/15" />

                <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[15px] text-black">
                  ▶
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* INSTAGRAM */}
      <div>
        <div className="mb-5 flex items-end justify-between">
          <h3
            className="text-[30px] uppercase text-[#6FB6FF]"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            Instagram
          </h3>

          <p className="text-[12px] uppercase tracking-[0.18em] text-white/40">
            Swipe
          </p>
        </div>

        <div className="-mx-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
          <div className="flex w-max snap-x snap-mandatory gap-4">
            {[
              '/videos web/middle ring/campbells.mp4',
              '/videos web/middle ring/momentos_magicos.mp4',
              '/videos web/middle ring/nespresso.mp4',
              '/videos web/middle ring/quaker.mp4',
              '/videos web/middle ring/te_chai_asmr.mp4',
            ].map((video, index) => (
              <button
                key={video}
                type="button"
                onClick={() => setActiveSocialVideo(video)}
                aria-label={`Open Instagram video ${index + 1}`}
                className="group relative aspect-[4/5] w-[230px] flex-none snap-center overflow-hidden rounded-[20px] border border-white/15 bg-black shadow-[0_20px_55px_rgba(0,0,0,0.3)] sm:w-[260px]"
              >
                <video
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[15px] text-black">
                  ▶
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TIKTOK */}
      <div>
        <div className="mb-5 flex items-end justify-between">
          <h3
            className="text-[30px] uppercase text-[#6FB6FF]"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            TikTok
          </h3>

          <p className="text-[12px] uppercase tracking-[0.18em] text-white/40">
            Swipe
          </p>
        </div>

        <div className="-mx-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
          <div className="flex w-max snap-x snap-mandatory gap-4">
            {[
              '/videos web/vertical/afilar con piedra.mp4',
              '/videos web/vertical/momento improvisado.mp4',
              '/videos web/vertical/margarita de piña.mp4',
              '/videos web/vertical/pollo y arroz.mp4',
              '/videos web/vertical/tablas y tapas.mp4',
            ].map((video, index) => (
              <button
                key={video}
                type="button"
                onClick={() => setActiveSocialVideo(video)}
                aria-label={`Open TikTok video ${index + 1}`}
                className="group relative aspect-[9/16] w-[205px] flex-none snap-center overflow-hidden rounded-[20px] border border-white/15 bg-black shadow-[0_20px_55px_rgba(0,0,0,0.3)] sm:w-[230px]"
              >
                <video
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[15px] text-black">
                  ▶
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* MOBILE CTA */}
    <motion.a
      href="/contact"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.05 }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.96 }}
      className="relative z-20 mx-auto mt-14 flex w-full max-w-[340px] items-center justify-center rounded-[14px] border border-[#3F8DFF] bg-[#3F8DFF]/10 px-6 py-4 text-center text-[20px] uppercase text-white shadow-[0_0_35px_rgba(63,141,255,0.22)] md:hidden"
      style={{ fontFamily: 'Anton, sans-serif' }}
    >
    Let´s Go Viral!
    </motion.a>
  </div>

  {/* DESKTOP GIANT SOCIAL ORBIT */}
  <div className="absolute -right-[42vw] -top-[68vh] z-[20] hidden h-[1500px] w-[1500px] md:block">
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
<motion.div
  animate={{
    scale: [1, 1.015, 1.03, 1.015, 1],
    boxShadow: [
      "0 0 18px rgba(63,141,255,0.12)",
      "0 0 28px rgba(63,141,255,0.22)",
      "0 0 52px rgba(63,141,255,0.42)",
      "0 0 28px rgba(63,141,255,0.22)",
      "0 0 18px rgba(63,141,255,0.12)",
    ],
  }}
  transition={{
    duration: 3.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute left-1/2 top-1/2 z-[30] flex h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-white via-[#F5F9FF] to-[#DCE9FF]"
>
  {/* Glow */}
  <motion.div
    animate={{
      opacity: [0.15, 0.3, 0.55, 0.3, 0.15],
      scale: [1, 1.08, 1.18, 1.08, 1],
    }}
    transition={{
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute inset-0 rounded-full bg-[#4FA3FF] blur-2xl"
  />

  {/* White Core */}
  <div className="absolute inset-[8px] rounded-full bg-gradient-to-br from-white via-[#F8FBFF] to-[#E8F1FF]" />

  {/* Text */}
  <div className="relative z-10 flex flex-col items-center leading-none">
    <motion.span
      animate={{
        opacity: [0.75, 0.9, 1, 0.9, 0.75],
      }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="text-[17px] uppercase tracking-[0.08em] text-[#031B50]"
      style={{ fontFamily: "Anton, sans-serif" }}
    >
      YOUR
    </motion.span>

    <motion.span
      animate={{
        opacity: [0.75, 0.9, 1, 0.9, 0.75],
      }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="mt-1 text-[18px] uppercase tracking-[0.08em] text-[#031B50]"
      style={{ fontFamily: "Anton, sans-serif" }}
    >
      BRAND
    </motion.span>
  </div>
</motion.div>

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
          onClick={() =>
            setActiveSocialVideo(
              '/videos web/horizontal/frappe_mazapan.mp4'
            )
          }
        />
      </OrbitPoint>

      <OrbitPoint angle={120}>
        <SocialBubble
          className=""
          size="h-[82px] w-[82px]"
          videoSrc="/videos web/horizontal/mckormick.mp4"
          onClick={() =>
            setActiveSocialVideo(
              '/videos web/horizontal/mckormick.mp4'
            )
          }
        />
      </OrbitPoint>

      <OrbitPoint angle={240}>
        <SocialBubble
          className=""
          size="h-[82px] w-[82px]"
          videoSrc="/videos web/horizontal/cereales.mp4"
          onClick={() =>
            setActiveSocialVideo(
              '/videos web/horizontal/cereales.mp4'
            )
          }
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
      {[
        {
          angle: 0,
          size: 'h-[88px] w-[88px]',
          video: '/videos web/middle ring/campbells.mp4',
        },
        {
          angle: 72,
          size: 'h-[76px] w-[76px]',
          video:
            '/videos web/middle ring/momentos_magicos.mp4',
        },
        {
          angle: 144,
          size: 'h-[76px] w-[76px]',
          video: '/videos web/middle ring/nespresso.mp4',
        },
        {
          angle: 216,
          size: 'h-[76px] w-[76px]',
          video: '/videos web/middle ring/quaker.mp4',
        },
        {
          angle: 288,
          size: 'h-[76px] w-[76px]',
          video: '/videos web/middle ring/te_chai_asmr.mp4',
        },
      ].map((item) => (
        <OrbitPoint key={item.video} angle={item.angle}>
          <SocialBubble
            className=""
            size={item.size}
            videoSrc={item.video}
            onClick={() => setActiveSocialVideo(item.video)}
          />
        </OrbitPoint>
      ))}
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
      {[
        {
          angle: 0,
          video: '/videos web/vertical/afilar con piedra.mp4',
        },
        {
          angle: 72,
          video:
            '/videos web/vertical/momento improvisado.mp4',
        },
        {
          angle: 144,
          video:
            '/videos web/vertical/margarita de piña.mp4',
        },
        {
          angle: 216,
          video: '/videos web/vertical/pollo y arroz.mp4',
        },
        {
          angle: 288,
          video: '/videos web/vertical/tablas y tapas.mp4',
        },
      ].map((item) => (
        <OrbitPoint key={item.video} angle={item.angle}>
          <SocialBubble
            className=""
            size="h-[92px] w-[92px]"
            videoSrc={item.video}
            onClick={() => setActiveSocialVideo(item.video)}
          />
        </OrbitPoint>
      ))}
    </motion.div>
  </div>

  {/* DESKTOP CTA */}
  <motion.a
    href="/contact"
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.05 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.09, y: -3 }}
    whileTap={{ scale: 0.96 }}
    className="relative z-10 mt-12 hidden w-fit rounded-[14px] border border-[#3F8DFF] bg-[#3F8DFF]/10 px-9 py-4 text-[22px] uppercase text-white shadow-[0_0_35px_rgba(63,141,255,0.22)] md:block md:ml-[6vw]"
    style={{ fontFamily: 'Anton, sans-serif' }}
  >
    Let´s Go Viral!
  </motion.a>
</section>
<section
  ref={aiLabRef}
  id="ai-lab"
  className="relative overflow-hidden bg-[#07010D] px-5 py-24 sm:px-8 lg:min-h-screen lg:px-[6vw] lg:py-[140px]"
>
  {/* BACKGROUND GLOW */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(168,85,247,0.18),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.10),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.08),transparent_30%)]" />

  <div className="relative mx-auto flex w-full max-w-[1512px] flex-col gap-14 lg:min-h-[85vh] lg:flex-row lg:items-center lg:justify-between lg:gap-8">

    {/* =====================================================
        LEFT — AI TASTE LAB
        MOBILE: 1
        DESKTOP: 1
    ===================================================== */}
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.25 }}
      className="relative z-20 order-1 w-full text-center lg:order-1 lg:max-w-[320px] lg:text-left"
    >
      <h2
        className="text-[82px] uppercase leading-[0.86] tracking-[-0.05em] text-white sm:text-[96px] lg:mt-6 lg:text-[120px]"
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

      <p className="mx-auto mt-6 max-w-[320px] text-[17px] leading-relaxed text-white/60 sm:text-[18px] lg:mx-0 lg:mt-8">
        AI expands culinary storytelling.
      </p>

      <button
        type="button"
        onClick={() =>
          setActiveSocialVideo(
            '/videos web/principal/ai-reel.mp4'
          )
        }
        className="mt-8 rounded-[16px] border border-[#C084FC]/30 bg-[#12071F] px-7 py-4 text-[18px] uppercase text-[#E9D5FF] transition hover:border-[#C084FC] hover:bg-[#1B0B2B] sm:text-[20px] lg:mt-10 lg:px-8"
        style={{ fontFamily: 'Anton, sans-serif' }}
      >
        Explore The Lab
      </button>
    </motion.div>

    {/* =====================================================
        BURGER COMPARATOR
        MOBILE: 2
        DESKTOP: 3 — RIGHT SIDE
    ===================================================== */}
    <div className="relative z-10 order-2 flex w-full flex-col items-center justify-center lg:order-3 lg:flex-1">
      <motion.div
        initial={{
          opacity: 0,
          scale: isMobile ? 0.9 : 1.99,
          y: 40,
        }}
        animate={
          aiLabInView
            ? {
                opacity: 1,
                scale: 1,
                y: 0,
              }
            : {
                opacity: 0,
                scale: isMobile ? 0.9 : 2.92,
                y: 40,
              }
        }
        transition={{
          duration: 1,
          delay: 0.35,
          ease: 'easeOut',
        }}
        className="flex w-full flex-col items-center"
      >
        <div className="mb-6 flex flex-col items-center sm:mb-8">
          <span
            className={`text-center text-[30px] uppercase tracking-[0.12em] text-[#C084FC] sm:text-[38px] lg:text-[48px] lg:tracking-[0.15em] ${anton.className}`}
          >
            MIXED REALITY
          </span>

          <div className="mt-4 h-[1px] w-[140px] bg-gradient-to-r from-transparent via-[#C084FC]/70 to-transparent sm:w-[180px]" />
        </div>

        {/* RESPONSIVE COMPARATOR */}
        <div className="mt-3 w-full max-w-[360px] sm:mt-0 sm:max-w-[460px] lg:max-w-[560px]">
          <BurgerBeforeAfter />
        </div>
      </motion.div>
    </div>

    {/* =====================================================
        BOXES
        MOBILE: 3
        DESKTOP: 2 — CENTER / LEFT OF BURGER
    ===================================================== */}
    <div className="relative z-20 order-3 grid w-full gap-4 sm:grid-cols-3 lg:order-2 lg:flex lg:w-[340px] lg:flex-col lg:gap-5">
      {[
        ['We Do', '', 0.4],
        ['', 'Whatever It Takes', 0.95],
        ['', 'To Make It', 1.5],
        ['', 'Happen', 2.05],
      ].map(([title, text, delay], i) => (
        <motion.div
          key={`${title}-${text}-${i}`}
          initial={{
            borderColor:
              'rgba(255,255,255,0.10)',
            boxShadow:
              '0 0 0 rgba(192,132,252,0)',
          }}
          animate={
            aiLabInView
              ? {
                  borderColor:
                    'rgba(192,132,252,0.75)',
                  boxShadow:
                    '0 0 34px rgba(192,132,252,0.28)',
                }
              : {}
          }
          transition={{
            duration: 0.8,
            delay: delay as number,
            ease: 'easeOut',
          }}
          className="relative min-h-[115px] rounded-[18px] border bg-white/[0.03] p-5 backdrop-blur-xl sm:min-h-[145px] lg:min-h-[110px]"
        >
          {/* PULSE BORDER */}
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
                : {
                    opacity: 0,
                  }
            }
            transition={{
              duration: 2.2,
              delay: 2.4 + i * 0.25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="relative z-10 flex h-full flex-col items-center justify-center">
            {title && (
              <p
                className={`text-center text-[24px] uppercase tracking-[0.14em] text-[#C084FC] sm:text-[26px] lg:text-[30px] lg:tracking-[0.16em] ${anton.className}`}
              >
                {title}
              </p>
            )}

            {text && (
              <p
                className={`text-center text-[30px] leading-tight text-white/80 sm:text-[32px] lg:text-[30px] lg:leading-tight ${anton.className}`}
              >
                {text}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
<footer className="relative overflow-hidden bg-[#140824] px-5 pb-8 pt-16 text-white sm:px-8 lg:px-[6vw] lg:pb-10 lg:pt-20">
  {/* BACKGROUND */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,0.16),transparent_30%),radial-gradient(circle_at_80%_90%,rgba(163,255,90,0.08),transparent_30%)]" />

  <div className="relative mx-auto w-full max-w-[1512px]">
    <div className="relative z-10 flex flex-col gap-14 lg:gap-20">
      {/* TOP */}
      <div className="flex flex-col justify-between gap-14 lg:flex-row lg:gap-16">
        {/* LEFT */}
        <div className="max-w-[620px]">
          <p
            className="text-[15px] uppercase tracking-[0.22em] text-[#C084FC] sm:text-[18px]"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            FOOD DREAMERS
          </p>

          <h2
            className="mt-5 text-[48px] uppercase leading-[0.96] tracking-[-0.04em] text-white sm:text-[58px] md:text-[64px] lg:text-[72px] lg:leading-[0.98]"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            LET&apos;S CREATE
            <br />
            SOMETHING
            <br />
            UNFORGETTABLE
          </h2>

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="mt-8 inline-flex min-h-[56px] items-center justify-center rounded-[14px] bg-[#C084FC] px-7 py-4 text-[19px] uppercase text-black shadow-[0_12px_40px_rgba(79,163,255,0.28)] sm:px-9 sm:text-[22px] lg:mt-10"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            START A PROJECT
          </motion.a>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-1 gap-10 text-[15px] uppercase sm:grid-cols-2 sm:gap-x-14 lg:gap-x-20 lg:gap-y-12 lg:text-[16px]">
          {/* SOCIAL */}
          <div>
            <p className="mb-5 text-[#C084FC]">Social</p>

            <div className="flex flex-col gap-3 text-white/75">
              <a
                href="#"
                className="w-fit transition-colors hover:text-white"
              >
                Instagram
              </a>

              <a
                href="#"
                className="w-fit transition-colors hover:text-white"
              >
                TikTok
              </a>

              <a
                href="#"
                className="w-fit transition-colors hover:text-white"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <p className="mb-5 text-[#C084FC]">Contact</p>

            <div className="flex flex-col gap-3 text-white/75">
              <a
                href="mailto:contacto@foodreamers.com"
                className="break-all normal-case transition-colors hover:text-white sm:break-normal"
              >
                contacto@foodreamers.com
              </a>

              <p>MEXICO CITY, MX</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-7 text-[12px] uppercase leading-relaxed text-white/40 sm:text-[14px] lg:flex-row lg:items-center lg:gap-6 lg:pt-8">
        <p>© 2026 Food Dreamers. All Rights Reserved.</p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="#"
            className="transition-colors hover:text-white/70"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="transition-colors hover:text-white/70"
          >
            Terms
          </a>
        </div>
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
