"use client";
import React, { useState } from "react";
import Link from "next/link";
import EnquiryModal from "@/app/modals/enquiryModal";
import styles from "./grouptour.module.css";

interface GroupTourCardProps {
  slug: string;
  title: string;
  description: string;
  rating: number;
  cities: number;
  dates: number;
  nights: number;
  days: number;
  price: string;
  imageUrl: string;
  badges?: string[];
  includes?: string[];
}

const Icons: Record<string, React.ReactNode> = {
  flight: <img src="/flight.svg" alt="Flights" width="16" height="16" />,
  flights: <img src="/flight.svg" alt="Flights" width="16" height="16" />,
  "break fast": <img src="/breakfast.svg" alt="Breakfast" width="16" height="16" />,
  breakfast: <img src="/breakfast.svg" alt="Breakfast" width="16" height="16" />,
  hotel: <img src="/hotel.svg" alt="Hotel" width="16" height="16" />,
  sightseeing: <img src="/landscape.svg" alt="Sightseeing" width="16" height="16" />,
  transport: <img src="/bus.svg" alt="Transport" width="16" height="16" />,
  transfers: <img src="/bus.svg" alt="Transfers" width="16" height="16" />,
  meal: <img src="/meal.svg" alt="Meal" width="16" height="16" />,
  restaurant: <img src="/restaurant.svg" alt="Restaurant" width="16" height="16" />,
  bar: <img src="/pub.svg" alt="Bar" width="16" height="16" />,
  train: <img src="/train.svg" alt="Train" width="16" height="16" />,
  "wi-fi": <img src="/wifi.svg" alt="Wi-Fi" width="16" height="16" />,
  wifi: <img src="/wifi.svg" alt="Wi-Fi" width="16" height="16" />,
};





const GroupTourCard: React.FC<GroupTourCardProps> = ({
  slug,
  title,
  description,
  rating,
  cities,
  dates,
  nights,
  days,
  price,
  imageUrl,
  badges = ["GROUP TOUR", "Short Trips"],
  includes = ["Flights", "Break fast", "Hotel", "Sightseeing"],
}) => {
  const [openModal, setOpenModal] = useState(false);
  const validImage = imageUrl || "/images/default.jpg";

  return (
    <>
      <Link href={`/group-tours/${slug}`} className={styles.card} style={{ textDecoration: "none", color: "inherit" }}>
        {/* LEFT COLUMN: IMAGE */}
        <div className={styles.imgWrap}>
          <img src={validImage} alt={title} className={styles.img} />
        </div>

        {/* RIGHT COLUMN: CONTENT */}
        <div className={styles.content}>
          
          {/* TOP SECTION: DATA + PRICE */}
          <div className={styles.topSection}>
            <div className={styles.dataArea}>
              {/* BADGES */}
              <div className={styles.badges}>
                {badges.map((b, i) => (
                  <span
                    key={i}
                    className={i === 0 ? styles.badgePrimary : styles.badgeSecondary}
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* TITLE */}
              <div className={styles.titleLink}>
                <h3 className={styles.title}>{title}</h3>
              </div>

              {/* DESCRIPTION + STARS */}
              <div className={styles.descRow}>
                <p className={styles.desc}>{description}</p>
                <div className={styles.stars}>
                  {"★".repeat(Math.min(rating, 5))}
                  {"☆".repeat(Math.max(0, 5 - rating))}
                </div>
              </div>

              {/* INCLUDES */}
              <div className={styles.includes}>
                {includes.map((item, i) => (
                  <React.Fragment key={item}>
                    <div className={styles.includeItem}>
                      {Icons[item] ?? null}
                      <span>{item}</span>
                    </div>
                    {i < includes.length - 1 && (
                      <span className={styles.sep}>|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* PRICE BOX */}
            <div className={styles.priceBox}>
              <div className={styles.priceCurrency}>INR</div>
              <div className={styles.priceLabel}>Starting from</div>
              <div className={styles.priceValue}>{price}</div>
            </div>
          </div>

          {/* DIVIDER */}
          <hr className={styles.divider} />

          {/* BOTTOM SECTION: STATS + BUTTONS */}
          <div className={styles.bottomSection}>
            <div className={styles.stats}>
              <div className={styles.statContainer}>
                <span className={styles.statValue}>{cities}</span>
                <span className={styles.statLabel}>Cities</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statContainer}>
                <span className={styles.statValue}>{dates}</span>
                <span className={styles.statLabel}>Dates</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statContainer}>
                <span className={styles.statValue}>
                  {nights > 0 ? `${nights} ${nights === 1 ? "Night" : "Nights"} / ` : ""}
                  {days} {days === 1 ? "Day" : "Days"}
                </span>
              </div>
            </div>

            <div className={styles.actions}>
              <span className="btn orange-btn d-flex align-items-center gap-2" style={{ fontSize: "13px", padding: "8px 16px" }}>
                View Tour Details
                <span><img src="/images/button-arrow.png" alt="" width={16} height={16} /></span>
              </span>
              <button
                type="button"
                className={`${styles.btnFilled} d-flex align-items-center gap-2`}
                style={{ borderRadius: "50px", fontSize: "13px", padding: "8px 16px" }}
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); setOpenModal(true); }}
              >
                Book Now
                <span><img src="/images/button-arrow.png" alt="" width={16} height={16} /></span>
              </button>
            </div>
          </div>
        </div>
      </Link>


      <EnquiryModal
        openModal={openModal}
        setopenModal={setOpenModal}
        title={title}
        duration={
          (nights > 0 ? `${nights} ${nights === 1 ? "Night" : "Nights"} / ` : "") +
          `${days} ${days === 1 ? "Day" : "Days"}`
        }
        slug={slug}
      />
    </>
  );
};

export default GroupTourCard;
