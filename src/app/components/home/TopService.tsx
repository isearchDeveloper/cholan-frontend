"use client";
import styles from "./topservice.module.css";

export default function TopService() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>OUR TOUR SERVICES</h2>
      </div>

      <div className={styles.container}>

        {/* LEFT */}
        <div className={styles.left}>

          <p className={styles.desc}>
            We Provide Car & Bus Rental Services, Luxury Trains and Hotels as these are very important for us.
          </p>

          <p className={styles.desc}>
            The Tailor-made specialists in offering customised tour packages for you.
          </p>

          {/* Illustration */}
          <div className={styles.illustration}>
            <img src="/images/bag1.png" className={styles.bag} />
            {/* <img src="/images/flight.png" className={styles.plane} /> */}
            <img src="/images/destination.png" className={styles.pin} />
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>

          <div className={styles.card}>
            <img src="/images/customize.png" className={styles.image} />
            <h3>Customized Holidays</h3>
            <p>Tailor-made holiday experiences crafted to your preferences with stays.</p>
          </div>

          <div className={styles.card}>
            <img src="/images/car-2.png" className={styles.image} />
            <h3>Car Rental</h3>
            <p>Comfortable and well-maintained cars with professional drivers.</p>
          </div>

          <div className={styles.card}>
            <img src="/images/car-3.png" className={styles.image} />
            <h3>Bus Rental</h3>
            <p>Spacious and reliable buses with expert drivers for long-distance journeys.</p>
          </div>

        </div>

      </div>
    </section>
  );
}