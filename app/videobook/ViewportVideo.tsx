'use client';

import { useEffect, useRef } from 'react';

type ViewportVideoProps = {
  src: string;
  className?: string;
  controls?: boolean;
  label?: string;
};

export default function ViewportVideo({
  src,
  className,
  controls = false,
  label,
}: ViewportVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let visible = false;
    let active = true;
    const shouldPlay = () => active && visible && !document.hidden;
    const syncPlayback = () => {
      if (!shouldPlay()) {
        video.pause();
        return;
      }

      // No media URL is attached until this video is actually on screen.
      if (video.getAttribute('src') !== src) video.src = src;
      void video.play().then(() => {
        // A pending play request can finish after scrolling away.
        if (!shouldPlay()) video.pause();
      }).catch(() => {
        // Browser autoplay restrictions can still require the play control.
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      syncPlayback();
    }, { threshold: [0, 0.1] });

    observer.observe(video);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      active = false;
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      controls={controls}
      preload="none"
      aria-label={label}
      className={className}
    />
  );
}
