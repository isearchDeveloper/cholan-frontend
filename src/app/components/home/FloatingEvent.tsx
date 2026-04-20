"use client";
import React, { useState, useEffect } from 'react';
import styles from './floatingEvent.module.css';
import AOS from "aos";
import "aos/dist/aos.css";

const events = [
  {
    id: 1,
    title: "Great India Travel Bazaar (GITB) 2026",
    date: "26-28 April 2026",
    location: "Jaipur, Rajasthan, India",
    stallNo: "65 & 66",
    image: "/images/jaipurgibt.webp",
  }
];

const FloatingEvent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);
  const event = events[0];

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    // Delay rendering or visibility to grab attention after initial load
    const timer = setTimeout(() => {
      setShouldRender(true);
      // Refresh AOS to detect the newly rendered element
      setTimeout(() => {
        AOS.refresh();
      }, 50);
    }, 200); 

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || !shouldRender) return null;

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
          <img src={event.image} alt={event.title} className={styles.eventImage} />
          <div className={styles.badge}>
            <span className={styles.liveDot}></span>
            Upcoming Event
          </div>
        </div>
        
        <div className={styles.cardContent}>
          <h3 className={styles.title}>{event.title}</h3>
          
          <div className={styles.infoLine}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{event.date}</span>
          </div>

          <div className={styles.infoLine}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{event.location}</span>
          </div>

          <div className={styles.stallBox}>
            <span className={styles.stallLabel}>Stall:</span>
            <span className={styles.stallValue}>{event.stallNo}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FloatingEvent;
