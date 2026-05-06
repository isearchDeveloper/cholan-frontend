"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import { XPublicToken } from "@/app/urls/apiUrls";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./ThemedHolidayPackages.module.css";

const CDN = "https://cdn.cholantours.com/";

function resolveImage(src: string | undefined | null): string {
  if (!src) return "/images/no-img.webp";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) return src;
  return CDN + src;
}

const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ThemedHolidayPackages({ themeList, initialPackages }: any) {
  const [activeTab, setActiveTab] = useState(0);
  const [packagesData, setPackagesData] = useState<Record<string, any[] | null>>(initialPackages || {});
  const [jsEnabled, setJsEnabled] = useState(false);

  // Tabs are pre-filtered on the server to only show themes with packages
  const tabs = useMemo(
    () => (Array.isArray(themeList) ? themeList.slice(0, 7) : []),
    [themeList]
  );

  useEffect(() => {
    setJsEnabled(true);
  }, []);

  const fetchPackages = async (slug: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/pages/city/theme/${slug}`;
      const response = await axios.get(url, {
        headers: { "X-Public-Token": XPublicToken },
      });
      const packages =
        response.data?.data?.themes?.packages ||
        response.data?.data?.packages ||
        [];
      setPackagesData(prev => ({ ...prev, [slug]: packages }));
    } catch (err) {
      console.error("Theme packages fetch failed:", err);
      setPackagesData(prev => ({ ...prev, [slug]: [] }));
    }
  };

  useEffect(() => {
    if (tabs.length === 0) return;
    const slug = tabs[activeTab]?.slug;
    if (!slug) return;

    // If we don't have packages for this tab yet (could happen if server pre-fetch limit is reached)
    if (packagesData[slug] === undefined) {
      setPackagesData(prev => ({ ...prev, [slug]: null })); // null = loading
      fetchPackages(slug);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, tabs]);

  if (!tabs.length) return null;

  const activeSlug = tabs[activeTab]?.slug;
  const activePackages = packagesData[activeSlug];
  const isLoading = activePackages === null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>India Holiday Packages By Theme</h2>

        {/* Tabs — Horizontally Scrollable */}
        {jsEnabled && (
          <ul className={styles.tabList}>
            {tabs.map((tab: any, index: number) => (
              <li
                key={tab.slug}
                className={`${styles.tab} ${activeTab === index ? styles.activeTab : ""}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </li>
            ))}
          </ul>
        )}

        {/* Packages Slider */}
        {jsEnabled && (
          <div>
            {isLoading ? (
              <div className="text-center py-5">Loading packages...</div>
            ) : activePackages && activePackages.length > 0 ? (
              <Swiper
                spaceBetween={24}
                slidesPerView={4}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={activePackages.length > 4}
                modules={[Pagination, Autoplay]}
                breakpoints={{
                  320: { slidesPerView: 1.2, spaceBetween: 16 },
                  576: { slidesPerView: 2, spaceBetween: 20 },
                  768: { slidesPerView: 2.5, spaceBetween: 24 },
                  1024: { slidesPerView: 3.5, spaceBetween: 24 },
                  1200: { slidesPerView: 4, spaceBetween: 24 },
                }}
                className={styles.swiperContainer}
              >
                {activePackages.map((pkg: any) => (
                  <SwiperSlide key={pkg.slug}>
                    <Link href={`/packages/${pkg.slug}`} className={styles.card}>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={resolveImage(pkg.primary_image)}
                          alt={pkg.title || "Package"}
                          fill
                          className={styles.image}
                        />
                      </div>
                      <div className={styles.overlay} />
                      <div className={styles.content}>
                        <h3>{pkg.title}</h3>
                        <div className={styles.meta}>
                          {pkg.details?.duration_nights ? (
                            <span className={styles.metaItem}>
                              <MoonIcon />
                              {pkg.details.duration_nights}{" "}
                              {pkg.details.duration_nights === 1 ? "Night" : "Nights"}
                            </span>
                          ) : null}
                          {pkg.details?.duration_nights && pkg.details?.duration_days ? (
                            <span className={styles.sep}>|</span>
                          ) : null}
                          {pkg.details?.duration_days ? (
                            <span className={styles.metaItem}>
                              <SunIcon />
                              {pkg.details.duration_days}{" "}
                              {pkg.details.duration_days === 1 ? "Day" : "Days"}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className={styles.icon}>
                        <ArrowIcon />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="text-center py-4 text-muted">No packages available for this theme.</div>
            )}

            {/* View All Button */}
            {activePackages && activePackages.length > 0 && (
              <div className={styles.viewAllWrapper}>
                <Link
                  href={`/india/${activeSlug}`}
                  className={styles.viewAllBtn}
                >
                  View All {tabs[activeTab]?.title} Packages
                  <span className={styles.viewAllArrow}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
