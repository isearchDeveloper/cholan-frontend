"use client";

import styles from "./luxurytour.module.css";

const LuxuryTour = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* LEFT IMAGE */}
        <div className={styles.left}>
          <img
            src="/images/luxury-img.jpg"
            alt="Luxury Travel"
            className={styles.image}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className={styles.right}>
          <div className={styles.content}>
            <h2>Luxury Tours</h2>

            <p>
              From Majestic Rails to Exquisite Hotels - India's Heritage in Luxury
            </p>

            <a href="/luxury-trains" className={styles.link}>
              Come Explore With Us →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LuxuryTour;