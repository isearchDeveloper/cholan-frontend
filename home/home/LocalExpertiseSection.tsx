"use client";

import Link from "next/link";
import styles from "./localexpertise.module.css";

const LocalExpertiseSection = () => {
  return (
    <section className={styles.section}>
      
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        
        <h2 className={styles.heading}>
          Curated Experiences by <br /> Local Experts
        </h2>

        <p className={styles.text}>
          Cholan Tours Pvt. Ltd. is a leading India Tour Operator specializing in personalized travel experiences for both international and domestic travelers.
        </p>

        <Link href="/india" className={styles.cta}>
          Come Explore With Us →
        </Link>

      </div>
    </section>
  );
};

export default LocalExpertiseSection;