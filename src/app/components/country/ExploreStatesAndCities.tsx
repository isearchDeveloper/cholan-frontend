"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { fetchCityList } from "@/app/services/cityService";
import styles from "./ExploreStatesAndCities.module.css";
import React from "react";

interface CityItem {
  title: string;
  slug: string;
  location?: {
    slug?: string;
    name?: string;
  } | null;
}

export default function ExploreStatesAndCities({
  country,
  cities: initialCities,
  total: initialTotal,
}: {
  country: "india" | "international-holidays";
  cities: CityItem[];
  total: number;
}) {
  if (!initialCities || initialCities.length === 0) {
    return null;
  }

  const LIMIT = 40;

  const [cities, setCities] = useState<CityItem[]>(initialCities);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(initialTotal);

  const type = country === "india" ? 1 : 2;

  const loadMore = async () => {
    setLoading(true);

    // Fetch all cities at once
    const res = await fetchCityList(type, 1, total > LIMIT ? total : 1000);

    if (res?.data?.cities?.length) {
      setCities(res.data.cities);
    }

    setLoading(false);
  };

  return (
    <section className={styles.section}>
      <div className={`row g-0 ${styles.mainRow}`}>
          {/* Left Side: Full height image */}
          <div className={`col-lg-5 d-none d-lg-block ${styles.imageCol}`}>
            <Image
              src="/images/india-tours-states-and-cities.webp"
              alt="Explore States and Cities of India"
              fill
              className={styles.image}
              sizes="40vw"
            />
          </div>

          {/* Right Side: Content */}
          <div className="col-lg-7">
            <div className={styles.contentWrapper}>
              <h2 className={styles.heading}>
                {country === "india"
                  ? "Explore The States and Cities of India"
                  : "Explore International Destinations"}
              </h2>
              <p className={styles.paragraph}>
                {country === "india"
                  ? "India is more than just a destination . it is a collection of experiences that span centuries, cultures, landscapes, and lifestyles. A country that feels surreal and unreal, it breathes in colours, rhythms, aromas, and stories."
                  : "Discover a world of possibilities with our international holiday packages. Experience diverse cultures, stunning landscapes, and unforgettable adventures across the globe."}
              </p>

              <div className={styles.cityList}>
                {cities.map((city, index) => {
                  const href =
                    country === "india"
                      ? `/india/${city.slug}`
                      : `/international-holidays/${city.slug}`;

                  return (
                    <div className={styles.cityItemWrapper} key={`${city.slug}-${index}`}>
                      <Link href={href} className={styles.cityLink}>
                        {city.location?.name || city.title}
                      </Link>
                      {index < cities.length - 1 && (
                        <span className={styles.separator}>|</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={styles.buttonContainer}>
                {total > LIMIT && cities.length < total && (
                  <button
                    className={styles.loadMoreBtn}
                    onClick={loadMore}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Load More"}
                    {!loading && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
                        <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                )}

                {total > LIMIT && cities.length >= total && (
                  <button
                    className={styles.loadMoreBtn}
                    onClick={() => {
                      setCities(initialCities);
                      setPage(1);
                    }}
                  >
                    Show Less
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
                      <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
