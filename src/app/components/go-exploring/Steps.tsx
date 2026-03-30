import styles from "./Steps.module.css";

export default function Steps() {
  return (
    <section className={styles.steps}>
      
      {/* BACKGROUND IMAGE */}
      <div className={styles.bg}></div>

      <div className={styles.container}>
        
        {/* FLOATING CARD */}
        <div className={styles.card}>
          <div className={styles.line}></div>

          <div className={styles.step}>
            <span>1</span>
            <p>Register your business</p>
          </div>

          <div className={styles.step}>
            <span>2</span>
            <p>List Your Experience</p>
          </div>

          <div className={styles.step}>
            <span>3</span>
            <p>Start earning</p>
          </div>
        </div>

      </div>
    </section>
  );
}