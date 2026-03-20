"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./DmcOtherDestinations.module.css";

interface OtherDestination {
  name: string;
  slug: string;
  image: string;
}

interface DmcOtherDestinationsProps {
  destinations: OtherDestination[];
  currentCity: string;
}

export default function DmcOtherDestinations({
  destinations,
  currentCity,
}: DmcOtherDestinationsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 5; // Show 5 cards at a time on desktop
  const maxIndex = Math.max(0, destinations.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className={styles.otherDestinations}>
      <div className="container">
        <h2 className={styles.title}>Explore Our Other DMC Destinations</h2>

        <div className={styles.carouselWrapper}>
          {/* Previous Button */}
          {currentIndex > 0 && (
            <button
              className={`${styles.navBtn} ${styles.navBtnPrev}`}
              onClick={handlePrev}
              aria-label="Previous destinations"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {/* Carousel */}
          <div className={styles.carouselContainer}>
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {destinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={`/indian-dmc/${destination.slug}`}
                  className={styles.card}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={destination.image}
                      alt={`${destination.name} DMC`}
                      width={300}
                      height={200}
                      className={styles.image}
                    />
                    <div className={styles.overlay}>
                      <h3 className={styles.cardTitle}>{destination.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Next Button */}
          {currentIndex < maxIndex && (
            <button
              className={`${styles.navBtn} ${styles.navBtnNext}`}
              onClick={handleNext}
              aria-label="Next destinations"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}