"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";
import { ArrowUpRight } from "lucide-react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
import styles from "./healthTourism.module.css";

/* ─────────────────────────────────────────────────
   DATA — replace with API call later:
   const data = await fetchHealingSpecialities();
   ───────────────────────────────────────────────── */

interface Speciality {
  id: number;
  title: string;
  image: string;
  slug: string;
}

const SPECIALITIES: Speciality[] = [
  { id: 1, title: "Eye Care & Vision Restoration",   image: "/images/health-spec-eye.jpg",       slug: "eye-care" },
  { id: 2, title: "Dental Care & Oral Restoration",  image: "/images/health-spec-dental.jpg",    slug: "dental-care" },
  { id: 3, title: "Fertility & Reproductive Health", image: "/images/health-spec-fertility.jpg", slug: "fertility" },
  { id: 4, title: "Ayurveda",                        image: "/images/health-spec-ayurveda.jpg",  slug: "ayurveda" },
  { id: 5, title: "Cardiac Care",                    image: "/images/health-spec-cardiac.jpg",   slug: "cardiac-care" },
  { id: 6, title: "Orthopaedics & Joint Care",       image: "/images/health-spec-ortho.jpg",     slug: "orthopaedics" },
  { id: 7, title: "Oncology & Cancer Care",          image: "/images/health-spec-oncology.jpg",  slug: "oncology" },
  { id: 8, title: "Neurology & Brain Health",        image: "/images/health-spec-neuro.jpg",     slug: "neurology" },
];

const INTRO = {
  heading: "Healing Specialities and Areas of Care",
  description:
    "India is globally recognised for exceptional outcomes across a wide range of medical disciplines. Through our network of partner hospitals, we facilitate access to the following areas of care. With Health Tourism in India, you can opt for the following treatments.",
};

/* ── Single slider card ── */
const SpecialityCard: React.FC<{ item: Speciality }> = ({ item }) => (
  <div className={styles.specCard}>
    <img
      src={item.image}
      alt={item.title}
      className={styles.specCardImg}
      loading="lazy"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = "/images/cholantours2.webp";
      }}
    />

    {/* Bottom gradient overlay with title */}
    <div className={styles.specCardOverlay}>
      <p className={styles.specCardTitle}>{item.title}</p>
      <div className={styles.specCardUnderline} />
    </div>

    {/* Top-right arrow icon */}
    <div className={styles.specCardArrow}>
      <ArrowUpRight size={14} strokeWidth={2} />
    </div>
  </div>
);

/* ── Main section ── */
const HealthTourismSpecialities: React.FC = () => (
  <section className={styles.specSection}>
    <div className="container">

      {/* Top two-column intro */}
      <div className={styles.specIntro}>
        <h2 className={styles.specHeading}>{INTRO.heading}</h2>
        <p className={styles.specDesc}>{INTRO.description}</p>
      </div>

    </div>

    {/* Slider — full bleed with container padding via CSS */}
    <div className={styles.specSliderWrap}>
      <Swiper
        modules={[Pagination, Autoplay, A11y]}
        pagination={{ clickable: true, el: "#specSliderPagination" }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        loopAdditionalSlides={4}
        grabCursor
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          576: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 2.5, spaceBetween: 20 },
          992: { slidesPerView: 3.5, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 22 },
        }}
        className={styles.specSwiper}
      >
        {SPECIALITIES.map((item) => (
          <SwiperSlide key={item.id}>
            <SpecialityCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination outside swiper so overflow:hidden never clips it */}
      <div id="specSliderPagination" className={styles.specPagination} />
    </div>
  </section>
);

export default HealthTourismSpecialities;
