"use client";

import React, { useState } from "react";
import styles from "./indiatourpackage.module.css";

type Card = {
  title: string;
  image: string;
  slug: string;
};

const regions = [
  "South India",
  "North India",
  "East India",
  "West & Central India",
];

const data: Record<string, Card[]> = {
  "South India": [
    { title: "Nagaland", image: "https://images.unsplash.com/photo-1548013146-72479768bada", slug: "nagaland" },
    { title: "Stunning Kerala", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944", slug: "kerala" },
    { title: "Wildlife Safari", image: "https://images.unsplash.com/photo-1548013146-72479768bada", slug: "safari" },
    { title: "Varanasi", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc", slug: "varanasi" },
    { title: "Royal Rajasthan", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41", slug: "rajasthan" },
    { title: "Uttarakhand", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", slug: "uttarakhand" },
    { title: "Tamil Nadu", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220", slug: "tamil-nadu" },
  ],
  "West & Central India": [
    { title: "Goa", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", slug: "goa" },
    { title: "Mumbai", image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66", slug: "mumbai" },
    { title: "Rann of Kutch", image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16", slug: "kutch" },
    { title: "Ajanta Caves", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5", slug: "ajanta" },
    { title: "Khajuraho", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5", slug: "khajuraho" },
    { title: "Ujjain", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc", slug: "ujjain" },
    { title: "Lonavala", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", slug: "lonavala" },
  ],
  "North India": [
    { title: "Shimla", image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16", slug: "shimla" },
    { title: "Manali", image: "https://images.unsplash.com/photo-1597074866923-dc0589150358", slug: "manali" },
    { title: "Golden Temple", image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167", slug: "golden-temple" },
    { title: "Rishikesh", image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd", slug: "rishikesh" },
    { title: "Agra", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523", slug: "agra" },
    { title: "Jaipur", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41", slug: "jaipur" },
    { title: "Varanasi", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc", slug: "varanasi" },
  ],
  "East India": [
    { title: "Darjeeling", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa", slug: "darjeeling" },
    { title: "Sikkim", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5", slug: "sikkim" },
    { title: "Sundarbans", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3", slug: "sundarbans" },
    { title: "Meghalaya", image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16", slug: "meghalaya" },
    { title: "Kolkata", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5", slug: "kolkata" },
    { title: "Puri", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470", slug: "puri" },
    { title: "Assam", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa", slug: "assam" },
  ],
};

export default function IndiaTourPackage({ exclusiveIndiaPackage }: { exclusiveIndiaPackage?: any }) {
  const [active, setActive] = useState("South India");

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Exclusive India Tour Packages</h2>

        <div className={styles.tabs}>
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setActive(r)}
              className={`${styles.tab} ${active === r ? styles.tabActive : ""}`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className={styles.bentoGrid}>
          {data[active].map((card, i) => (
            <div key={i} className={`${styles.card} ${styles[`card${i}`]}`}>
              <img src={card.image} className={styles.cardImage} />
              <div className={styles.overlay} />
              <div className={styles.content}>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardLine}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}