"use client";

import styles from "./ataglance.module.css";

export default function AtAGlance() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* LEFT SIDE */}
        <div className={styles.left}>
          <div className={styles.bigCard}>
            <img
              src="https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg"
              alt="Adventure Tours"
              className={styles.image}
            />

            <div className={styles.bigOverlay}>
              <h3>ADVENTURE TOURS</h3>
              <p>Trusted by thousands of travelers</p>
            </div>
          </div>

          <div className={styles.smallCard}>
            <img
              src="https://images.pexels.com/photos/6143369/pexels-photo-6143369.jpeg"
              alt="Travel"
              className={styles.image}
            />
          </div>

          <button className={styles.aboutBtn}>
            About US →
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <h2>Cholan Tours at a Glance</h2>

          <p className={styles.desc}>
            A quick look at our journey, expertise, and commitment to delivering
            exceptional travel experiences across destinations.
          </p>

          <div className={styles.list}>

            <div className={styles.item}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2909/2909768.png"
                alt=""
                width={60}
                height={60}
              />
              <ul>
                <li>100% Running on Solar Energy</li>
                <li>100% Paperless Office</li>
              </ul>
            </div>

            <div className={styles.item}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt=""
                width={60}
                height={60}
              />
              <ul>
                <li>5 Time National Tourism Award Winner</li>
                <li>Bagged 50+ National & International Awards</li>
              </ul>
            </div>

            <div className={styles.item}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
                alt=""
                width={60}
                height={60}
              />
              <ul>
                <li>150+ Fleets</li>
                <li>13 Offices Across the Country</li>
                <li>300+ Dedicated Staff</li>
              </ul>
            </div>

            <div className={styles.item}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                alt=""
                width={60}
                height={60}
              />
              <ul>
                <li>Approved by Ministry of Tourism, Government of India</li>
                <li>Member of 25+ Global Tourism Networks</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}