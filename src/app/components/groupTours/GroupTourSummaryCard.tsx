"use client";

import React from "react";
import styles from "./GroupTourSummaryCard.module.css";

const Icons: Record<string, React.ReactNode> = {
  flight:      <img src="/flight.svg"    alt="Flights"     width="13" height="13" />,
  flights:     <img src="/flight.svg"    alt="Flights"     width="13" height="13" />,
  breakfast:   <img src="/breakfast.svg" alt="Breakfast"   width="13" height="13" />,
  hotel:       <img src="/hotel.svg"     alt="Hotel"       width="13" height="13" />,
  sightseeing: <img src="/landscape.svg" alt="Sightseeing" width="13" height="13" />,
  transport:   <img src="/bus.svg"       alt="Transport"   width="13" height="13" />,
  transfers:   <img src="/bus.svg"       alt="Transfers"   width="13" height="13" />,
  meal:        <img src="/meal.svg"      alt="Meal"        width="13" height="13" />,
  train:       <img src="/train.svg"     alt="Train"       width="13" height="13" />,
  wifi:        <img src="/wifi.svg"      alt="Wi-Fi"       width="13" height="13" />,
};

interface Props {
  title:         string;
  badges:        string[];
  rating:        number;
  startingPrice: string;
  durationLabel: string;
  cities:        number;
  datesCount:    number;
  facilities:    string[];
  nextDate:      { date: string; month: string; year: string; price: string; seats: number } | null;
  onBook:        () => void;
  onEnquire:     () => void;
}

export default function GroupTourSummaryCard({
  title,
  badges,
  rating,
  startingPrice,
  durationLabel,
  cities,
  datesCount,
  facilities,
  nextDate,
  onBook,
  onEnquire,
}: Props) {
  const safeRating = Math.min(Math.max(Math.round(rating ?? 0), 0), 5);

  return (
    <div className={styles.card}>

      {/* ── Header ── */}
      <div className={styles.header}>
        {badges.length > 0 && (
          <div className={styles.badges}>
            {badges.map((b, i) => (
              <span key={i} className={styles.badge}>{b}</span>
            ))}
          </div>
        )}
        <h3 className={styles.title}>{title}</h3>
        {safeRating > 0 && (
          <div className={styles.stars}>
            {"★".repeat(safeRating)}{"☆".repeat(5 - safeRating)}
          </div>
        )}
      </div>

      {/* ── Price ── */}
      <div className={styles.priceBlock}>
        <div className={styles.priceLabel}>Starting from</div>
        <div className={styles.priceRow}>
          <span className={styles.priceCurrency}>₹</span>
          <span className={styles.priceValue}>{startingPrice}</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{durationLabel}</span>
            <span className={styles.statLabel}>Duration</span>
          </div>
          {cities > 0 && (
            <div className={styles.stat}>
              <span className={styles.statValue}>{cities}</span>
              <span className={styles.statLabel}>Cities</span>
            </div>
          )}
          {datesCount > 0 && (
            <div className={styles.stat}>
              <span className={styles.statValue}>{datesCount}</span>
              <span className={styles.statLabel}>Dates</span>
            </div>
          )}
        </div>

        {/* Inclusions */}
        {facilities.length > 0 && (
          <div>
            <div className={styles.sectionLabel}>Inclusions</div>
            <div className={styles.facilities}>
              {facilities.map((f) => (
                <span key={f} className={styles.facilityItem}>
                  {Icons[f] ?? null}
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Next Departure */}
        <div>
          <div className={styles.sectionLabel}>Next Departure</div>
          {nextDate ? (
            <div className={styles.nextDep}>
              <div>
                <div className={styles.nextDepLabel}>Upcoming</div>
                <div className={styles.nextDepDate}>
                  {nextDate.date} {nextDate.month} {nextDate.year}
                </div>
                <div className={styles.nextDepSeats}>
                  {nextDate.seats > 0 ? `${nextDate.seats} seats left` : "Available"}
                </div>
              </div>
              <div className={styles.nextDepPrice}>₹ {nextDate.price}</div>
            </div>
          ) : (
            <div className={styles.noDates}>No upcoming dates available</div>
          )}
        </div>

      </div>

      {/* ── Actions ── */}
      <div className={styles.actions}>
        <button type="button" className={styles.btnBook} onClick={onBook}>
          Book Now
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
        <button type="button" className={styles.btnEnquire} onClick={onEnquire}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Send Enquiry
        </button>
      </div>

      {/* ── Trust signals ── */}
      <div className={styles.trustRow}>
        <span>Free Cancellation</span>
        <span className={styles.trustDot} />
        <span>Instant Confirmation</span>
        <span className={styles.trustDot} />
        <span>Best Price</span>
      </div>

    </div>
  );
}
