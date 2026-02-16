"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { fairFestivalData } from "@/app/data/fairFestivalDummyData";

interface FestivalCard {
  slug: string;
  banner: {
    banner_image: string;
    banner_title: string;
  };
}

const INITIAL_VISIBLE = 20;

export default function FairFestivalCitySection({
  cities = fairFestivalData,
}: {
  cities?: FestivalCard[];
}) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const params = useParams();
  const currentSlug = params?.slug as string | undefined;

  const safeCities = Array.isArray(cities) ? cities : [];

  /* remove current page item */
  const filteredCities = currentSlug
    ? safeCities.filter((city) => city.slug !== currentSlug)
    : safeCities;

  const visibleCities = filteredCities.slice(0, visibleCount);

  const hasMoreThanInitial = filteredCities.length > INITIAL_VISIBLE;
  const showLoadMore =
    hasMoreThanInitial && visibleCount < filteredCities.length;

  const showViewLess =
    hasMoreThanInitial && visibleCount >= filteredCities.length;

  return (
    <section className="tour-services">
      <div className="ts-container">

        <h2 className="ts-heading">
          Popular Fairs & Festivals in India
        </h2>

        <div className="ts-grid">
          {visibleCities.map((city) => (
            <Link key={city.slug} href={`/fair-festival/${city.slug}`}>
              <article className="ts-card">

                <div className="ts-card-image">
                  <img
                    src={
                      city.banner?.banner_image ||
                      "/images/no-img.webp"
                    }
                    alt={city.banner?.banner_title}
                    loading="lazy"
                  />
                </div>

                <div className="ts-card-body">
                  <h3>{city.banner?.banner_title}</h3>
                </div>

              </article>
            </Link>
          ))}
        </div>

        <div className="ts-button-wrap">

          {showLoadMore && (
            <button
              onClick={() =>
                setVisibleCount(filteredCities.length)
              }
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
              onClick={() =>
                setVisibleCount(INITIAL_VISIBLE)
              }
              className="btn orange-btn inline-flex items-center gap-2 ts-btn-main"
            >
              View Less
            </button>
          )}

        </div>

      </div>
    </section>
  );
}
