"use client";

import React, { useState } from "react";
import styles from "./indiatourpackage.module.css";
import Link from "next/link";

interface Location {
  id: number;
  name: string;
  slug: string;
  banner_image: string;
  banner_image_alt: string;
}

interface Region {
  region_id: number;
  title: string;
  slug: string;
  is_highlight: boolean;
  locations: Location[];
}

interface IndiaTourPackageProps {
  homeTabsData: Region[];
}

export default function IndiaTourPackage({ homeTabsData }: IndiaTourPackageProps) {
  const [activeRegionId, setActiveRegionId] = useState<number | null>(
    homeTabsData && homeTabsData.length > 0 ? homeTabsData[0].region_id : null
  );

  const activeRegion = homeTabsData?.find((r) => r.region_id === activeRegionId);

  const locations = activeRegion?.locations || [];
  let gridClass = styles.bentoGrid;
  if (locations.length === 5) {
    gridClass = styles.grid5;
  } else if (locations.length < 7) {
    gridClass = styles.simpleGrid;
  }

  if (!homeTabsData || homeTabsData.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Exclusive India Tour Packages</h2>

        <div className={styles.tabs}>
          {homeTabsData.map((r) => (
            <button
              key={r.region_id}
              onClick={() => setActiveRegionId(r.region_id)}
              className={`${styles.tab} ${activeRegionId === r.region_id ? styles.tabActive : ""}`}
            >
              {r.title}
            </button>
          ))}
        </div>

        <div className={gridClass}>
          {locations.slice(0, 7).map((loc, i) => (
            <Link 
              href={`/india/${loc?.slug || ""}`} 
              key={`location-${loc?.id || i}`} 
              className={`${styles.card} ${styles[`card${i}`]}`}
            >
              <img 
                src={loc?.banner_image || "/images/no-img.webp"} 
                alt={loc?.banner_image_alt || loc?.name || "Tour Title"} 
                className={styles.cardImage} 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/no-img.webp";
                }}
              />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <div className={styles.cardTitle}>{loc?.name || "Explore Location"}</div>
                <div className={styles.cardLine}></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}