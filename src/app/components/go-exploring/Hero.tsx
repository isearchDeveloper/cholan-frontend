"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const slides = [
  "/go-exploring/slider-1.png",
  "/go-exploring/slider-2.png",
  "/go-exploring/slider-3.png",
  "/go-exploring/slider-4.png",
  "/go-exploring/slider-5.png",
  "/go-exploring/slider-6.png",
  "/go-exploring/slider-7.png",
  "/go-exploring/slider-8.png",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(i);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>

        {/* LEFT */}
        <div className={styles.left}>

          <div className={styles.logoWrap}>
            <Image
              src="/go-exploring/app_logo.png"
              alt="Go Exploring"
              width={140}
              height={50}
            />
          </div>
          <h1>
            Connecting Global tourists <br />
            <span>with Indian Tourist Guides</span>
          </h1>

          <p>
            Explore India with the right guide by your side. Your journey begins here{" "}
            <strong>- Download the App Now.</strong>
          </p>

          <div className={styles.store}>

            {/* GOOGLE PLAY */}
            <a
              href="https://play.google.com/store/apps/details?id=com.goexploring"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/go-exploring/play-store.png"
                alt="Google Play"
                width={160}
                height={50}
              />
            </a>

            {/* APP STORE */}
            <a
              href="https://apps.apple.com/in/app/go-exploring/id6758142143"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/go-exploring/app-store.png"
                alt="App Store"
                width={160}
                height={50}
              />
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

            {/* BACKGROUND SHAPE */}
            <path
              fill="#f1f3f5"
              d="M617,425.6C538.8,622,285.4,656.9,91.2,571.9c-141-61.7-71.5-182.7-89.3-353C-18.1,28,123.4-22,295.5,8.1C486,41.5,692.9,235,617,425.6z"
            />

            {/* IMAGE */}
            <image
              href={slides[current]}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clipShape)"
            />
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
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === current ? styles.active : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
}