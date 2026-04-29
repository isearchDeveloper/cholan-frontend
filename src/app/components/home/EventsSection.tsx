"use client";
import { useEffect, useRef } from 'react';
import styles from './eventsSection.module.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { EventItem } from '@/app/services/eventsService';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';

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

const EventsSection = ({ events }: { events: EventItem[] }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (!events || events.length === 0) return null;

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
              {events.map((event, index) => (
                <SwiperSlide key={index}>
                  <EventCard event={event} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <EventCard event={events[0]} />
          )}

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

const EventCard = ({ event }: { event: EventItem }) => (
  <div className={styles.horizontalCard}>
    <div className={styles.cardLeft}>
      <img
        src={event.banner_image ?? '/images/jaipurgibt.webp'}
        alt={event.banner_image_alt ?? event.title}
        className={styles.cardImage}
      />
      <div className={styles.imageOverlay} />
    </div>

    <div className={styles.cardRight}>
      <div className={styles.cardHeader}>
        <h3 className={styles.eventTitle}>{event.title}</h3>
        {event.description && (
          <p className={styles.eventInfoText}>{event.description}</p>
        )}
      </div>

      {(event.from_date || event.to_date) && (
        <div className={styles.infoRow}>
          <div className={styles.iconWrapper}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.infoIcon}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <span className={styles.infoText}>
            {formatDateRange(event.from_date, event.to_date)}
          </span>
        </div>
      )}

      {event.location && (
        <div className={styles.infoRow}>
          <div className={styles.iconWrapper}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.infoIcon}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <span className={styles.infoText}>{event.location}</span>
        </div>
      )}

      {event.stall_no && (
        <div className={styles.stallBox}>
          <span className={styles.stallLabel}>Cholan Tours - Stall No. </span>
          <span className={styles.stallValue}>{event.stall_no}</span>
        </div>
      )}

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
