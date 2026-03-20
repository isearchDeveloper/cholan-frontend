"use client";

import { useState } from "react";
import styles from "./DmcAttractions.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Attraction {
  id: string;
  name: string;
  description: string;
}

interface DmcAttractionsProps {
  attractions: Attraction[];
  cityName: string;
}

export default function DmcAttractions({
  attractions,
  cityName,
}: DmcAttractionsProps) {
  const [activeItem, setActiveItem] = useState<Attraction | null>(null);

  return (
    <section className={styles.attractions}>
      <div className="container">
        <h2 className={styles.title}>Top Attractions in {cityName}</h2>

        <div className={styles.grid}>
          {attractions.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => setActiveItem(item)}
            >
              <div className={styles.iconWrapper}>
                <FaMapMarkerAlt className={styles.icon} />
              </div>

              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <p className={styles.cardDescription}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 MODAL */}
      {activeItem && (
        <div
          className={styles.modalOverlay}
          onClick={() => setActiveItem(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.modalTitle}>{activeItem.name}</h3>
            <p className={styles.modalDesc}>{activeItem.description}</p>

            <button
              className={styles.closeBtn}
              onClick={() => setActiveItem(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}