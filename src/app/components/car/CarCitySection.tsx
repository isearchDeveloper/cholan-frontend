"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface CityCard {
  thumbnail_image: string;
  thumbnail_alt: string;
  location: string;
  slug: string;
}

const INITIAL_VISIBLE = 20;
// const STEP = 4;

export default function CarCitySection({
  cities = [],
}: {
  cities?: CityCard[];
}) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const params = useParams();
  const currentSlug = params?.slug as string | undefined;

  const safeCities = Array.isArray(cities) ? cities : [];

  // ✅ REMOVE CURRENT CITY
  const filteredCities = currentSlug
    ? safeCities.filter((city) => city.slug !== currentSlug)
    : safeCities;

  const visibleCities = filteredCities.slice(0, visibleCount);

  const hasMoreThanInitial = filteredCities.length > INITIAL_VISIBLE;
  const showLoadMore = hasMoreThanInitial && visibleCount < filteredCities.length;
  const showViewLess =
    hasMoreThanInitial && visibleCount >= filteredCities.length;

  return (
    <section className="tour-services">
      <div className="ts-container">
        <h2 className="ts-heading">Our Car Rental Services in India</h2>

        <div className="ts-grid">
          {visibleCities.map((city) => (
            <Link key={city.slug} href={`/car-rental/${city.slug}`}>
              <article className="ts-card">
                <div className="ts-card-image">
                  <img
                    src={city.thumbnail_image || "/images/no-img.webp"}
                    alt={city.thumbnail_alt || city.location}
                    loading="lazy"
                  />
                </div>

                <div className="ts-card-body">
                  <h3>{city.location}</h3>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="ts-button-wrap">
          {showLoadMore && (
            <button
              onClick={() => setVisibleCount(filteredCities.length)}
              className="btn orange-btn inline-flex items-center gap-2 ts-btn-main"
            >
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

          {showViewLess && (
            <button
              onClick={() => setVisibleCount(INITIAL_VISIBLE)}
              className="btn orange-btn inline-flex items-center gap-2 ts-btn-main"
            >
              View Less
              {/* <Image
                width={23}
                height={23}
                sizes="100vw"
                src="/images/button-arrow.png"
                alt="arrow"
              /> */}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}