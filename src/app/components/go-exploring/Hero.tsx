"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

export default function Hero({ data }: any) {
  const [current, setCurrent] = useState(0);

  const slides = data?.hero_images || [];

  useEffect(() => {
    if (!slides.length) return;

    const i = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(i);
  }, [slides]);

  

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        
        {/* LEFT */}
        <div className={styles.left}>

          {/* LOGO */}
          <div className={styles.logoWrap}>
            <img src={data?.app_logo} alt="logo" />
          </div>

          {/* TITLE */}
          <h1>{data?.title}</h1>

          {/* HTML TEXT */}
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{ __html: data?.banner_text }}
          />

          {/* STORE BUTTONS (STATIC for now) */}
          <div className={styles.store}>
            <a
              href="https://play.google.com/store/apps/details?id=com.goexploring"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/go-exploring/play-store.png" alt="play" />
            </a>

            <a
              href="https://apps.apple.com/in/app/go-exploring/id6758142143"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/go-exploring/app-store.png" alt="app" />
            </a>
          </div>
        </div>

        {/* RIGHT SVG SLIDER */}
        <div className={styles.right}>
          <svg viewBox="0 0 648 616" className={styles.svg}>
            <defs>
              <clipPath id="clipShape">
                <path d="M644.9,316.5c-30.8,189.2-243.1,270.7-426.7,234.3C84.9,524.3,122.2,403.5,75,256.4C22,91.6,134.9,19.1,289.1,11.4C459.9,2.9,674.8,132.7,644.9,316.5z" />
              </clipPath>
            </defs>

            {/* BACKGROUND */}
            <path
              fill="#f1f3f5"
              d="M617,425.6C538.8,622,285.4,656.9,91.2,571.9c-141-61.7-71.5-182.7-89.3-353C-18.1,28,123.4-22,295.5,8.1C486,41.5,692.9,235,617,425.6z"
            />

            {/* DYNAMIC IMAGE */}
            {slides.length > 0 && (
              <image
                href={slides[current]}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clipShape)"
              />
            )}
          </svg>

          {/* FLOATING */}
          <div className={styles.floating}>
            <div>Reach more travelers</div>
            <div>Grow on your terms</div>
            <div>Access innovative tools</div>
          </div>
        </div>
      </div>

      {/* DOTS */}
      {slides.length > 1 && (
        <div className={styles.dots}>
          {slides.map((_: any, i: number) => (
            <span
              key={i}
              className={`${styles.dot} ${
                i === current ? styles.active : ""
              }`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}
    </section>
  );
}