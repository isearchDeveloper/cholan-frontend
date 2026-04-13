"use client";

import styles from "./luxurytour.module.css";

const LuxuryTour = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* LEFT IMAGE */}
        <div className={styles.left}>
          <img
            src="/images/luxury-home.webp"
            alt="Luxury Travel"
            className={styles.image}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className={styles.right}>
          <div className={styles.content}>
            <h2>Journey Through India in Luxury</h2>

            <p>
              Experience India’s rich heritage through luxurious rail journeys and exquisite hotel stays. It is thoughtfully curated to deliver elegance and unforgettable travel moments.
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