"use client";

import { useState } from "react";
import styles from "./CTA.module.css";

export default function CTA() {
  const [open, setOpen] = useState(false);

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
          Join thousands of guides already earning more with GoExploring.
          Free forever to start.
        </p>

        <button className={styles.btn} onClick={() => setOpen(true)}>
          Register Free Now →
        </button>
      </div>

      {/* MODAL */}
      {open && (
        <div className={styles.modalOverlay} onClick={() => setOpen(false)}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
         <h3 style={{ color: "black" }}>Download App</h3>

            <div className={styles.modalButtons}>
              
              {/* ANDROID */}
              <a
                href="https://play.google.com/store/apps/details?id=com.goexploring"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.androidBtn}>
                  Android
                </button>
              </a>

              {/* IOS */}
              <a
                href="https://apps.apple.com/in/app/go-exploring/id6758142143"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.iosBtn}>
                  iOS
                </button>
              </a>

            </div>

            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}