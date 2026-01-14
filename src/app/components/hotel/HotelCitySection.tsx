"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface CityCard {
  name: string;
  slug: string;
  image: string | null;
  image_alt?: string;
}

const INITIAL_VISIBLE = 4;
const STEP = 4;

export default function HotelCitySection({ cities }: { cities: CityCard[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  // Visible cities
  const visibleCities = cities.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + STEP, cities.length));
  };

  const handleViewLess = () => {
    setVisibleCount(INITIAL_VISIBLE);
  };

  const canLoadMore = visibleCount < cities.length;
  const canViewLess = visibleCount > INITIAL_VISIBLE;
  return (
    <section className="tour-services">
      <div className="ts-container">
        <h2 className="ts-heading">Top Luxury Hotels in India</h2>

        <div className="ts-grid">
          {visibleCities.map((city) => (
            <Link key={city.slug} href={`/hotels/luxury-hotels-in-${city.slug}`}>
              <article className="ts-card">
                <div className="ts-card-image">
                  <img
                    src={city.image || "/images/no-img.webp"}
                    alt={city.image_alt || city.name}
                  />

                </div>
                <div className="ts-card-body">
                  <h3>{city.name}</h3>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="ts-button-wrap">
          {canLoadMore && (
            <button onClick={handleLoadMore} className="btn orange-btn inline-flex items-center gap-2 ts-btn-main">
              Load More
              <Image
                  width={23}
                  height={23}
                  sizes="100vw"
                  src="/images/button-arrow.png"
                  alt="arrow"
               />
            </button>
          )}

          {canViewLess && (
            <button onClick={handleViewLess} className="btn orange-btn inline-flex items-center gap-2 ts-btn-main">
              View Less
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
