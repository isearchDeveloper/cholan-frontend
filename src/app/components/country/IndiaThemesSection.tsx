"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const themes = [
  {
    title: "Honeymoon",
    slug: "honeymoon",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Family",
    slug: "family",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Adventure",
    slug: "adventure",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Hill Station",
    slug: "hill-station",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Wildlife",
    slug: "wildlife",
    img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Pilgrimage",
    slug: "pilgrimage",
    img: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Wildlife",
    slug: "wildlife",
    img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Pilgrimage",
    slug: "pilgrimage",
    img: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Wildlife",
    slug: "wildlife",
    img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Pilgrimage",
    slug: "pilgrimage",
    img: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function IndiaThemesSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleThemes = showAll ? themes : themes.slice(0, 8);

  return (
    <section className="themes-section pb-5">
      <div className="container">
        <h2 className="text-center mb-5 section-title">
          Explore India by Travel Themes
        </h2>

        <div className="row g-4">
          {visibleThemes.map((theme) => (
            <div key={theme.slug} className="col-6 col-md-4 col-lg-3">
              <Link  href={`/india/${theme.slug}-tour-packages`} className="theme-card">
                <div className="theme-img-wrapper">
                  <Image
                    src={theme.img}
                    alt={theme.title}
                    width={400}
                    height={300}
                    className="theme-img"
                  />
                  <div className="theme-overlay">
                    <span>{theme.title}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {themes.length > 8 && (
          <div className="text-center mt-4">
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAll(!showAll)}
                className="btn orange-btn inline-flex items-center gap-2"
              >
                {showAll ? "Show Less" : "View All Themes"}
                <span>
                  <Image
                    width={23}
                    height={23}
                    src="/images/button-arrow.png"
                    alt=""
                  />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
