"use client";
import { useState, useEffect } from 'react';
import styles from './floatingEvent.module.css';
import AOS from "aos";
import "aos/dist/aos.css";
import type { EventItem } from '@/app/services/eventsService';

function formatDateRange(from: string | null, to: string | null): string {
  if (!from && !to) return '';
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return { day, month, year };
  };

  if (from && to) {
    const fromDate = formatDate(from);
    const toDate = formatDate(to);
    
    // Same month and year
    if (fromDate.month === toDate.month && fromDate.year === toDate.year) {
      return `${fromDate.day}-${toDate.day} ${fromDate.month} ${fromDate.year}`;
    }
    // Same year, different month
    if (fromDate.year === toDate.year) {
      return `${fromDate.day} ${fromDate.month} - ${toDate.day} ${toDate.month} ${fromDate.year}`;
    }
    // Different year
    return `${fromDate.day} ${fromDate.month} ${fromDate.year} - ${toDate.day} ${toDate.month} ${toDate.year}`;
  }
  
  if (from) {
    const d = formatDate(from);
    return `${d.day} ${d.month} ${d.year}`;
  }
  
  if (to) {
    const d = formatDate(to);
    return `${d.day} ${d.month} ${d.year}`;
  }
  
  return '';
}

const FloatingEvent = ({ event }: { event: EventItem | null }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const timer = setTimeout(() => {
      setShouldRender(true);
      setTimeout(() => {
        AOS.refresh();
      }, 50);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || !shouldRender || !event) return null;

  const dateText = formatDateRange(event.from_date, event.to_date);

  return (
    <div
      className={styles.floatingEventWrapper}
      data-aos="fade-left"
      data-aos-delay="100"
    >
      <div className={styles.eventCard}>
        <button className={styles.closeBtn} onClick={() => setIsVisible(false)} aria-label="Close">
          &times;
        </button>
        <div className={styles.imageWrapper}>
          <img
            src={event.banner_image ?? '/images/jaipurgibt.webp'}
            alt={event.banner_image_alt ?? event.title}
            className={styles.eventImage}
          />
          <div className={styles.badge}>
            <span className={styles.liveDot}></span>
            Upcoming Event
          </div>
        </div>

        <div className={styles.cardContent}>
          <h3 className={styles.title}>{event.title}</h3>

          {dateText && (
            <div className={styles.infoLine}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{dateText}</span>
            </div>
          )}

          {event.location && (
            <div className={styles.infoLine}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{event.location}</span>
            </div>
          )}

          {event.stall_no && (
            <div className={styles.stallBox}>
              <span className={styles.stallLabel}>Cholan Tours - Stall No.</span>
              <span className={styles.stallValue}>{event.stall_no}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingEvent;
