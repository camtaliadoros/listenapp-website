// Click-to-play demo video with native controls (no autoplay).
export default function DemoVideo({ src, poster }: { src: string; poster?: string }) {
  return (
    <video
      src={src}
      poster={poster}
      controls
      playsInline
      preload="metadata"
      aria-label="ListenApp demo video"
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}
