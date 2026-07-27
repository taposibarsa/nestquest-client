"use client";

/**
 * Property image URLs are user-pasted (Imgbb, Cloudinary, Unsplash, etc.).
 * next/image remotePatterns cannot cover every host — use a plain img.
 */
export function RemoteImg({
  src,
  alt,
  className,
  referrerPolicy,
}: {
  src: string;
  alt: string;
  className?: string;
  /** Use "no-referrer" for Google profile photos so they load reliably. */
  referrerPolicy?: "no-referrer" | "origin" | "strict-origin-when-cross-origin";
}) {
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      referrerPolicy={referrerPolicy}
    />
  );
}
