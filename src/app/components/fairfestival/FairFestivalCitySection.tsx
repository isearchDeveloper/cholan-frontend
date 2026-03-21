// "use client";

// import { useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";

// interface FestivalCard {
//   slug: string;
//   title: string;
//   primary_image: string;
//   primary_image_alt?: string;
// }

// const INITIAL_VISIBLE = 20;

// export default function FairFestivalCitySection({
//   festivals = [],
// }: {
//   festivals?: FestivalCard[];
// }) {
//   const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

//   const params = useParams();
//   const currentSlug = params?.slug as string | undefined;

//   const safeFestivals = Array.isArray(festivals) ? festivals : [];

//   /* remove current page item */
//   const filteredFestivals = currentSlug
//     ? safeFestivals.filter((item) => item.slug !== currentSlug)
//     : safeFestivals;

//   const visibleFestivals = filteredFestivals.slice(0, visibleCount);

//   const hasMoreThanInitial = filteredFestivals.length > INITIAL_VISIBLE;

//   const showLoadMore =
//     hasMoreThanInitial && visibleCount < filteredFestivals.length;

//   const showViewLess =
//     hasMoreThanInitial && visibleCount >= filteredFestivals.length;

//   return (
//     <section className="tour-services">
//       <div className="ts-container">
//         <h2 className="ts-heading">Popular Fairs & Festivals in India</h2>
//         <div className="ts-grid">
//           {visibleFestivals.map((item) => (
//             <Link key={item.slug} href={`/india/fairs-festivals/${item.slug}/`}>
//               <article className="ts-card">
//                 <div className="ts-card-image">
//                   <img
//                     src={item.primary_image || "/images/no-img.webp"}
//                     alt={item.primary_image_alt || item.title}
//                     loading="lazy"
//                   />
//                 </div>

//                 <div className="ts-card-festival">
//                   <h3>{item.title}</h3>
//                 </div>
//               </article>
//             </Link>
//           ))}
//         </div>

//         <div className="ts-button-wrap">
//           {showLoadMore && (
//             <button
//               onClick={() => setVisibleCount(filteredFestivals.length)}
//               className="btn orange-btn inline-flex items-center gap-2 ts-btn-main"
//             >
//               Load More
//               <Image
//                 width={23}
//                 height={23}
//                 src="/images/button-arrow.png"
//                 alt="arrow"
//               />
//             </button>
//           )}

//           {showViewLess && (
//             <button
//               onClick={() => setVisibleCount(INITIAL_VISIBLE)}
//               className="btn orange-btn inline-flex items-center gap-2 ts-btn-main"
//             >
//               View Less
//             </button>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }


// "use client";

// import { useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import styles from "./festivalCards.module.css";

// interface FestivalCard {
//   slug: string;
//   title: string;
//   primary_image: string;
//   primary_image_alt?: string;
// }

// const INITIAL_VISIBLE = 20;

// export default function FairFestivalCitySection({
//   festivals = [],
// }: {
//   festivals?: FestivalCard[];
// }) {
//   const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

//   const params = useParams();
//   const currentSlug = params?.slug as string | undefined;

//   const safeFestivals = Array.isArray(festivals) ? festivals : [];

//   const filteredFestivals = currentSlug
//     ? safeFestivals.filter((item) => item.slug !== currentSlug)
//     : safeFestivals;

//   const visibleFestivals = filteredFestivals.slice(0, visibleCount);

//   const hasMoreThanInitial = filteredFestivals.length > INITIAL_VISIBLE;

//   const showLoadMore =
//     hasMoreThanInitial && visibleCount < filteredFestivals.length;

//   const showViewLess =
//     hasMoreThanInitial && visibleCount >= filteredFestivals.length;

//   return (
//     <section>
//       <div className="ts-container">
//         <h2 className="ts-heading">Popular Fairs & Festivals in India</h2>

//         <div className={styles.festivalGrid}>
//           {visibleFestivals.map((item) => (
//             <Link key={item.slug} href={`/india/fairs-festivals/${item.slug}/`}>
//               <article className={styles.festivalCard}>
//                 <div className={styles.festivalImageWrapper}>
//                   <img
//                     src={item.primary_image || "/images/no-img.webp"}
//                     alt={item.primary_image_alt || item.title}
//                     loading="lazy"
//                   />
//                 </div>

//                 <div className={styles.festivalContent}>
//                   <h3 className={styles.festivalTitle}>{item.title}</h3>
//                 </div>
//               </article>
//             </Link>
//           ))}
//         </div>

//         <div className="ts-button-wrap">
//           {showLoadMore && (
//             <button
//               onClick={() => setVisibleCount(filteredFestivals.length)}
//               className="btn orange-btn ts-btn-main"
//             >
//               Load More
//               <Image
//                 width={23}
//                 height={23}
//                 src="/images/button-arrow.png"
//                 alt="arrow"
//               />
//             </button>
//           )}

//           {showViewLess && (
//             <button
//               onClick={() => setVisibleCount(INITIAL_VISIBLE)}
//               className="btn orange-btn ts-btn-main"
//             >
//               View Less
//             </button>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }





// new not im,ages pr chal wo code 

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./festivalCards.module.css";

interface FestivalCard {
  slug: string;
  title: string;
  primary_image: string;
  primary_image_alt?: string;
}

const INITIAL_VISIBLE = 20;

export default function FairFestivalCitySection({
  festivals = [],
}: {
  festivals?: FestivalCard[];
}) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const params = useParams();
  const currentSlug = params?.slug as string | undefined;

  const safeFestivals = Array.isArray(festivals) ? festivals : [];

  const filteredFestivals = currentSlug
    ? safeFestivals.filter((item) => item.slug !== currentSlug)
    : safeFestivals;

  const visibleFestivals = filteredFestivals.slice(0, visibleCount);

  const hasMoreThanInitial = filteredFestivals.length > INITIAL_VISIBLE;

  const showLoadMore =
    hasMoreThanInitial && visibleCount < filteredFestivals.length;

  const showViewLess =
    hasMoreThanInitial && visibleCount >= filteredFestivals.length;

  // ============================================
  // PLACEHOLDER COMPONENT - ONLY THIS IS NEW
  // ============================================
  const FestivalPlaceholder = ({ title, slug }: { title: string; slug: string }) => {
    // DO IMAGES KI PATHS - SIRF YAHA CHANGE KARO
    const placeholderImages = [
      "/images/festival-placeholder-1.webp",
      "/images/festival-placeholder-2.webp",
    ];

    const getImageIndex = (str: string): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash) % 2;
    };

    const imageIndex = getImageIndex(slug);
    const selectedImage = placeholderImages[imageIndex];

    return (
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
        <img src={selectedImage} alt={title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)" }} />
        {/* <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", width: "90%", zIndex: 2 }}>
          <h3 style={{ color: "#fff", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, margin: 0, textShadow: "0 4px 20px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)", lineHeight: 1.2, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", letterSpacing: "-0.02em" }}>
            {title}
          </h3>
          <div style={{ width: "60px", height: "3px", background: "#fff", margin: "16px auto 0", borderRadius: "2px", opacity: 0.9 }} />
        </div> */}
        <div style={{ position: "absolute", bottom: "16px", right: "16px", background: "rgba(255, 255, 255, 0.25)", backdropFilter: "blur(10px)", padding: "6px 12px", borderRadius: "20px", fontSize: "0.75rem", color: "#fff", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", zIndex: 2 }}>
          Festival
        </div>
      </div>
    );
  };

  return (
    <section>
      <div className="ts-container">
        <h2 className="ts-heading">Popular Fairs & Festivals in India</h2>

        <div className={styles.festivalGrid}>
          {visibleFestivals.map((item) => (
            <Link key={item.slug} href={`/india/fairs-festivals/${item.slug}/`}>
              <article className={styles.festivalCard}>
                <div className={styles.festivalImageWrapper}>
                  {/* SIRF YEH LOGIC CHANGE HUA - REST SAB SAME */}
                  {item.primary_image ? (
                    <img
                      src={item.primary_image}
                      alt={item.primary_image_alt || item.title}
                      loading="lazy"
                    />
                  ) : (
                    <FestivalPlaceholder title={item.title} slug={item.slug} />
                  )}
                </div>

                <div className={styles.festivalContent}>
                  <h6 className={styles.festivalTitle}>{item.title}</h6>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="ts-button-wrap">
          {showLoadMore && (
            <button
              onClick={() => setVisibleCount(filteredFestivals.length)}
              className="btn orange-btn ts-btn-main"
            >
              Load More
              <Image
                width={23}
                height={23}
                src="/images/button-arrow.png"
                alt="arrow"
              />
            </button>
          )}

          {showViewLess && (
            <button
              onClick={() => setVisibleCount(INITIAL_VISIBLE)}
              className="btn orange-btn ts-btn-main"
            >
              View Less
            </button>
          )}
        </div>
      </div>
    </section>
  );
}