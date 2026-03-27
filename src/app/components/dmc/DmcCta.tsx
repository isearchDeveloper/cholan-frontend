// app/components/dmc/DmcCta.tsx
import Link from "next/link";
import styles from "./DmcCta.module.css";

interface DmcCtaProps {
  cityName: string;
}

export default function DmcCta({ cityName }: DmcCtaProps) {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Plan Your {cityName} Experience</h2>
          <p className={styles.description}>
            Let Cholan Tours design a seamless, personalized journey through{" "}
            {cityName}.
          </p>
          <p className={styles.subtext}>Contact us today.</p>

          <Link href="/contact-us" className={styles.btn}>
            Book or Enquire
          </Link>
        </div>
      </div>
    </section>
  );
}