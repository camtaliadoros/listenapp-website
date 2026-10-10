"use client";
import { useEffect, useRef } from "react";

// Plays (muted) when at least half the video is on screen and pauses when it
// leaves. Browsers only allow autoplay when muted; viewers can unmute via the
// controls. Skipped for users who prefer reduced motion, and stops taking over
// once the viewer pauses it themselves.
export default function DemoVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let userPaused = false;
    let pausingForScroll = false;
    const onPause = () => {
      if (pausingForScroll) pausingForScroll = false;
      else if (!video.ended) userPaused = true;
    };
    const onPlay = () => { userPaused = false; };
    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused && !video.ended) video.play().catch(() => {});
        } else if (!video.paused) {
          pausingForScroll = true;
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      controls
      playsInline
      preload="metadata"
      aria-label="ListenApp demo video"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}
