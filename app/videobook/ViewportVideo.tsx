'use client';

import { useEffect, useRef, useState } from 'react';

type ViewportVideoProps = {
  src: string;
  className?: string;
  controls?: boolean;
  label?: string;
  fullscreenButton?: boolean;
};

export default function ViewportVideo({
  src,
  className,
  controls = false,
  label,
  fullscreenButton = false,
}: ViewportVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [fullscreenError, setFullscreenError] = useState(false);

  const enterFullscreen = async () => {
    const video = ref.current as (HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    }) | null;
    if (!video) return;
    setFullscreenError(false);
    try {
      if (video.requestFullscreen) await video.requestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
      else setFullscreenError(true);
    } catch {
      setFullscreenError(true);
    }
  };

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let visible = false;
    let active = true;
    let fullscreen = false;
    const shouldPlay = () => active && (visible || fullscreen) && !document.hidden;
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

    const syncFullscreen = () => {
      fullscreen = document.fullscreenElement === video;
      video.controls = controls || fullscreen;
      syncPlayback();
    };
    const beginNativeFullscreen = () => {
      fullscreen = true;
      video.controls = true;
      syncPlayback();
    };
    const endNativeFullscreen = () => {
      fullscreen = false;
      video.controls = controls;
      syncPlayback();
    };
    document.addEventListener('fullscreenchange', syncFullscreen);
    video.addEventListener('webkitbeginfullscreen', beginNativeFullscreen);
    video.addEventListener('webkitendfullscreen', endNativeFullscreen);
    observer.observe(video);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      active = false;
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      document.removeEventListener('fullscreenchange', syncFullscreen);
      video.removeEventListener('webkitbeginfullscreen', beginNativeFullscreen);
      video.removeEventListener('webkitendfullscreen', endNativeFullscreen);
      video.pause();
    };
  }, [src, controls]);

  const player = (
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

  if (!fullscreenButton) return player;

  return (
    <div className="relative h-full w-full">
      {player}
      <div className="absolute right-[5vw] top-24 z-20 text-right">
        <button
          type="button"
          onClick={enterFullscreen}
          aria-label="Watch the hero video in fullscreen"
          className="rounded-full border border-white/70 bg-black/50 px-5 py-3 text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Full screen ↗
        </button>
        {fullscreenError && (
          <p role="status" className="mt-3 max-w-64 rounded-lg bg-black/80 p-3 text-sm text-white">
            Full screen is unavailable in this browser.
          </p>
        )}
      </div>
    </div>
  );
}
