"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CityListOfTheme({
  locations,
  themeSlug,
}: {
  locations: any[];
  themeSlug: string;
}) {
  const [showAll, setShowAll] = useState(false);

  // console.log(locations);

  // 🔥 Prepare city list once
  const cities = useMemo(() => {
    if (!locations) return [];

    return locations.map((city: any) => ({
      name: city.name,
      slug: city.slug,
      img: city.pivot?.banner_image || "",
    }));
  }, [locations]);

  const visibleCities = showAll ? cities : cities.slice(0, 8);

  if (cities.length === 0) return null;

  return (
    <section className="themes-section pb-5">
      <div className="container">
        <h2 className="text-center mb-5 section-title">
          Popular Cities for this Theme
        </h2>

        <div className="row g-4">
          {visibleCities.map((city) => {
            const cleanSlug = city.slug.replace("-tour-packages", "");

            return (
              <div key={city.slug} className="col-6 col-md-4 col-lg-3">
                <Link
                  href={`/india/${cleanSlug}-${themeSlug}-tour-packages`}
                  className="theme-card"
                >
                  <div className="theme-img-wrapper">
                    <Image
                      src={
                        city.img
                          ? `https://cdn.cholantours.com/${city.img}`
                          : "/images/no-img.webp"
                      }
                      alt={city.name}
                      width={400}
                      height={300}
                      className="theme-img"
                    />
                    <div className="theme-overlay">
                      <span>{city.name}</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {cities.length > 8 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn orange-btn inline-flex items-center gap-2"
            >
              {showAll ? "Show Less" : "View All Cities"}
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
        )}
      </div>
    </section>
  );
}
