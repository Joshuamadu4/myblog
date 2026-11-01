"use client";

import { useState } from "react";
import Image from "next/image";

/** Renders the author photo; if the file is missing it cleanly reveals the
 *  monogram behind it instead of showing a broken image. */
export function ProfilePhoto({
  src,
  alt,
  monogram,
}: {
  src: string;
  alt: string;
  monogram: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-bg-subtle to-brand-50 shadow-[var(--shadow-lift)]">
      <span className="absolute inset-0 grid place-items-center font-mono text-7xl font-bold text-brand/20">
        {monogram}
      </span>
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 90vw, 24rem"
          className="object-cover"
          priority
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
