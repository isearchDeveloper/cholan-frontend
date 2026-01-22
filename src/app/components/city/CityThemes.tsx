// app/components/city/CityThemes.tsx
"use client";

import Link from "next/link";

interface Theme {
  id?: number;
  title: string;
  slug: string;
  primary_img?: string | null;
}

export default function CityThemes({
  citySlug,
  cityName,
  themes,
}: {
  citySlug: string;
  cityName: string;
  themes: Theme[];
}) {
  if (!Array.isArray(themes) || themes.length === 0) return null;


  function formatTitle(text: string) {
  return text
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

  return (
    <section className="py-5 city-themes">
      <div className="container">
        <h2 className="mb-4">{cityName} Tours by Theme</h2>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
          {themes.map((theme) => {
            const imageUrl = theme.primary_img
              ? `https://cdn.cholantours.com/${theme.primary_img}`
              : "/images/default-theme.webp";

            return (
              <div key={theme.slug} className="col">
                <Link
                  href={`/india/${citySlug}-${theme.slug}-tour-packages`}
                  className="theme-card"
                >
                  <div
                    className="theme-card-bg"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  >
                    <div className="theme-overlay">
                     <h3>{formatTitle(theme.title)}</h3>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
