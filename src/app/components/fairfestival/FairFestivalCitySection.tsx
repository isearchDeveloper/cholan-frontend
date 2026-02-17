"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface FestivalCard {
  slug: string;
  title: string;
  primary_image: string;
  primary_image_alt?: string;
}

const INITIAL_VISIBLE = 20;

export default function FairFestivalCitySection({
  festivals = [],
}: {
  festivals?: FestivalCard[];
}) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const params = useParams();
  const currentSlug = params?.slug as string | undefined;

  const safeFestivals = Array.isArray(festivals) ? festivals : [];

  /* remove current page item */
  const filteredFestivals = currentSlug
    ? safeFestivals.filter((item) => item.slug !== currentSlug)
    : safeFestivals;

  const visibleFestivals = filteredFestivals.slice(0, visibleCount);

  const hasMoreThanInitial = filteredFestivals.length > INITIAL_VISIBLE;

  const showLoadMore =
    hasMoreThanInitial && visibleCount < filteredFestivals.length;

  const showViewLess =
    hasMoreThanInitial && visibleCount >= filteredFestivals.length;

  return (
    <section className="tour-services">
      <div className="ts-container">
        <h2 className="ts-heading">Popular Fairs & Festivals in India</h2>
        <div className="ts-grid">
          {visibleFestivals.map((item) => (
            <Link key={item.slug} href={`/india/fairs-festivals/${item.slug}/`}>
              <article className="ts-card">
                <div className="ts-card-image">
                  <img
                    src={item.primary_image || "/images/no-img.webp"}
                    alt={item.primary_image_alt || item.title}
                    loading="lazy"
                  />
                </div>

                <div className="ts-card-body">
                  <h3>{item.title}</h3>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="ts-button-wrap">
          {showLoadMore && (
            <button
              onClick={() => setVisibleCount(filteredFestivals.length)}
              className="btn orange-btn inline-flex items-center gap-2 ts-btn-main"
            >
              Load More
              <Image
                width={23}
                height={23}
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
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
