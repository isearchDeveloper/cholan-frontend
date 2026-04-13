"use client";

import Link from "next/link";
import styles from "./localexpertise.module.css";

const LocalExpertiseSection = () => {
  return (
    <section className={styles.section}>
      
      {/* Background Decorations */}
      <img src="/images/local-exper-girlbg-icon.png" alt="" className={styles.bgIconLayer} />
      <img src="/images/airballon.png" alt="" className={styles.balloonLeft} />
      <img src="/images/ballonandcloud.png" alt="" className={styles.balloonTopCenter} />
      {/* <img src="/images/ballonandcloud.png" alt="" className={styles.cloudFloating} /> */}

      <div className={styles.content}>
        
        <h2 className={styles.Curatedheading}>
          Curated Experiences by Local  Experts
        </h2>

        <p className={styles.text}>
          Cholan Tours Pvt. Ltd. is a leading India Tour Operator specializing in personalized travel experiences for both international and domestic travelers.
        </p>

        <Link href="/about-us" className={styles.cta}>
          Come Explore With Us <span>&rsaquo;</span>
        </Link>

      </div>

      {/* Hero Image */}
      <div className={styles.imageContainer}>
        <img 
          src="/images/girl.webp" 
          alt="Travel Expert" 
          className={styles.girlImage} 
        />
      </div>
    </section>
  );
};

export default LocalExpertiseSection;