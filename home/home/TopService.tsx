"use client";
import React from "react";
import styles from "./topservice.module.css";

interface TourService {
  title: string;
  banner_image?: string;
  banner_image_alt?: string;
  link: string;
}

interface TopServiceProps {
  tourServices: TourService[];
}

const TopService: React.FC<TopServiceProps> = ({ tourServices }) => {
  if (!tourServices || tourServices.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* LEFT CONTENT */}
        <div className={styles.left}>
          <h2>OUR TOUR SERVICES</h2>

          <p>
            We Provide Car & Bus Rental Services, Luxury Trains and Hotels as
            these are very important for us.
          </p>

          <p className={styles.space}>
            The Tailor-made specialists in offering customised tour packages for you.
          </p>

          {/* Background icon (optional) */}
          <div className={styles.bgIcon}></div>
        </div>

        {/* RIGHT CARDS */}
        <div className={styles.right}>
          {tourServices.slice(0, 3).map((data) => (
            <a key={data.title} href={data.link} className={styles.card}>

              <div className={styles.imageWrap}>
                <img
                  src={
                    data.title === "Car Rental"
                      ? "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
                      : data.title === "Bus Rental"
                      ? "https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"
                      : data.title === "Customized Holidays"
                      ? "https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg"
                      : data.banner_image || "/images/no-img.webp"
                  }
                  alt={data.title}
                />
              </div>

              <div className={styles.body}>
                <h3>{data.title}</h3>

                <p>
                  {data.title === "Car Rental" &&
                    "Comfortable and well-maintained cars with professional drivers."}

                  {data.title === "Bus Rental" &&
                    "Spacious and reliable buses with expert drivers for long-distance journeys."}

                  {data.title === "Customized Holidays" &&
                    "Tailor-made holiday experiences crafted to your preferences with stays."}
                </p>
              </div>

            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopService;