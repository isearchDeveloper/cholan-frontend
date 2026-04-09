"use client";

import Link from "next/link";
import styles from "./localexpertise.module.css";

const LocalExpertiseSection = () => {
  return (
    <section className={styles.section}>
      
      {/* Background Decorations */}
      <img src="/images/airballon.png" alt="" className={styles.balloonSmall} />
      <img src="/images/airballon.png" alt="" className={styles.balloonLarge} />

      <div className={styles.content}>
        
        <h2 className={styles.Curatedheading}>
          Curated Experiences by <br /> Local Experts
        </h2>

        <p className={styles.text}>
          Cholan Tours Pvt. Ltd. is a leading India Tour Operator specializing in personalized <br /> travel experiences for both international and domestic travelers.
        </p>

        <Link href="/about-us" className={styles.cta}>
          Come Explore With Us <span>&rsaquo;</span>
        </Link>

      </div>

      {/* Hero Image */}
      <div className={styles.imageContainer}>
        <img 
          src="/images/girl.png.png" 
          alt="Travel Expert" 
          className={styles.girlImage} 
        />
      </div>
    </section>
  );
};

export default LocalExpertiseSection;