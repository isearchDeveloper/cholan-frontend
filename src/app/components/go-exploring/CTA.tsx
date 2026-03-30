import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        
        <span className={styles.tag}>START TODAY</span>

        <h2>
          Global Travelers Are Waiting. <br />
          Are You <span>Ready?</span>
        </h2>

        <p>
          Join thousands of guides already earning more with GuideMitra.
          Free forever to start.
        </p>

        <button className={styles.btn}>
          Register Free Now →
        </button>

      </div>
    </section>
  );
}