"use client";

/**
 * Property image URLs are user-pasted (Imgbb, Cloudinary, Unsplash, etc.).
 * next/image remotePatterns cannot cover every host — use a plain img.
 */
export function RemoteImg({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}
