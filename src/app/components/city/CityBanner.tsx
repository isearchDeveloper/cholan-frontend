"use client";

import Image from "next/image";

interface CityBannerProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
}

export default function CityBanner({
  title,
  subtitle,
  imageUrl,
}: CityBannerProps) {
  return (
    <section className="city-hero-banner">
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority
        className="city-hero-img"
      />

      <div className="city-hero-overlay" />

      <div className="city-hero-content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
