"use client";

import Image from "next/image";
import styles from "./ataglance.module.css";

export default function AtAGlance() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>

        {/* LEFT */}
        <div className={styles.left}>

          <div className={styles.bigCard}>
            <Image
              src="/images/adventure.png"
              alt="Adventure"
              fill
              className={styles.image}
            />

            <div className={styles.overlay}>
              {/* <h3>ADVENTURE TOURS</h3>
              <p>Trusted by thousand of travelers</p> */}
            </div>
          </div>

          <div className={styles.smallCard}>
            <Image
              src="/images/travel.png"
              alt="Travel"
              fill
              className={styles.image}
            />
            {/* <span className={styles.travelText}>TRAVEL</span> */}
          </div>

          <button className={styles.btn}>
            About Us →
          </button>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <h2>Cholan Tours at a Glance</h2>

          <p className={styles.desc}>
            A quick look at our journey, expertise, and commitment to delivering
            exceptional travel experiences across destinations.
          </p>

          <div className={styles.points}>

            <div className={styles.row}>
              <Image src="/images/sus1.png" width={48} height={48} alt="" />
              <div>
                <p>100% Running on Solar Energy</p>
                <p>100% Paperless Office</p>
              </div>
            </div>

            <div className={styles.row}>
              <Image src="/images/sus2.png" width={48} height={48} alt="" />
              <div>
                <p>5 Time National Tourism Award Winner</p>
                <p>Bagged 50+ National & International Awards</p>
              </div>
            </div>

            <div className={styles.row}>
              <Image src="/images/sus3.png" width={48} height={48} alt="" />
              <div>
                <p>150+ Fleets</p>
                <p>13 Offices Across the Country</p>
                <p>300+ Dedicated Staff</p>
              </div>
            </div>

            <div className={styles.row}>
              <Image src="/images/sus4.png" width={48} height={48} alt="" />
              <div>
                <p>Approved by Ministry of Tourism, Government of India</p>
                <p>Member of 25+ Global Tourism Networks</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}