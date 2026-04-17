"use client";
import React, { useEffect, useRef } from 'react';
import styles from './eventsSection.module.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';

const events = [
  {
    id: 1,
    title: "Great India Travel Bazaar (GITB) 2026",
    imageText: "GITB 2026",
    date: "April 2026",
    location: "Jaipur, Rajasthan, India",
    stallNo: "65 & 66",
    image: "/images/jaipurgibt.webp",
    description: "Cholan Tours is participating in the upcoming GITB 2026 (Great India Travel Bazaar) in Jaipur."
  },
  //  {
  //   id: 2,
  //   title: "Great India Travel Bazaar (GITB) 2026",
  //   imageText: "GITB 2026",
  //   date: "April 2026",
  //   location: "Jaipur, Rajasthan, India",
  //   stallNo: "65 & 66",
  //   image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop",
  //   description: "Cholan Tours is participating in the upcoming GITB 2026 (Great India Travel Bazaar) in Jaipur. Our stall numbers are 65 & 66."
  // }
];

const EventsSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const hasMultipleEvents = events.length > 1;

  return (
    <section className={styles.eventsContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader} data-aos="fade-up">
          <span className={styles.subTitle}>Don't Miss Out</span>
          <h2 className={styles.mainTitle}>UPCOMING EVENTS</h2>
        </div>

        <div className={styles.sliderContainer} data-aos="fade-up">
          {hasMultipleEvents ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ 
                clickable: true,
                el: `.${styles.customPagination}`,
                bulletClass: styles.paginationBullet,
                bulletActiveClass: styles.paginationBulletActive,
              }}
              navigation={{
                nextEl: `.${styles.navNext}`,
                prevEl: `.${styles.navPrev}`,
              }}
              className={styles.swiper}
            >
              {events.map((event) => (
                <SwiperSlide key={event.id}>
                  <EventCard event={event} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <EventCard event={events[0]} />
          )}

          {/* Custom Navigation & Pagination - Only shown if multiple events */}
          {hasMultipleEvents && (
            <div className={styles.navigationWrapper}>
              <button className={`${styles.navBtn} ${styles.navPrev}`}>
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="35" y1="12" x2="5" y2="12" />
                  <polyline points="12 5 5 12 12 19" />
                </svg>
              </button>
              <div className={styles.customPagination}></div>
              <button className={`${styles.navBtn} ${styles.navNext}`}>
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="35" y2="12" />
                  <polyline points="28 5 35 12 28 19" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const EventCard = ({ event }: { event: any }) => (
  <div className={styles.horizontalCard}>
    {/* Left Section: Image with Overlay */}
    <div className={styles.cardLeft}>
      <img src={event.image} alt={event.title} className={styles.cardImage} />
      <div className={styles.imageOverlay}>
        {/* <h3 className={styles.overlayText}>{event.imageText}</h3> */}
      </div>
    </div>

    {/* Right Section: Content */}
    <div className={styles.cardRight}>
      <div className={styles.cardHeader}>
        <h3 className={styles.eventTitle}>{event.title}</h3>
        {event.description && <p className={styles.eventInfoText}>{event.description}</p>}
      </div>

      <div className={styles.infoRow}>
        <div className={styles.iconWrapper}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.infoIcon}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <span className={styles.infoText}>{event.date}</span>
      </div>

      <div className={styles.infoRow}>
        <div className={styles.iconWrapper}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.infoIcon}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <span className={styles.infoText}>{event.location}</span>
      </div>

      <div className={styles.stallBox}>
        <span className={styles.stallLabel}>Stall Numbers: </span>
        <span className={styles.stallValue}>{event.stallNo}</span>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.meetBtnAppearance}>
          Meet Us There
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.btnArrow}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default EventsSection;
