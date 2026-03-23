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
import { fairfestivalData } from "@/app/services/fairfestivalService";

interface FestivalCard {
  slug: string;
  title: string;
  primary_image: string;
  primary_image_alt?: string;
}

const LIMIT = 16;

export default function FairFestivalCitySection({
  festivals = [],
}: {
  festivals?: FestivalCard[];
}) {

  //  NEW STATE
  const [list, setList] = useState<FestivalCard[]>(festivals);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(festivals.length === LIMIT);
  const [hasMore, setHasMore] = useState(festivals.length === LIMIT);

  const params = useParams();
  const currentSlug = params?.slug as string | undefined;

  const filteredList = currentSlug
    ? list.filter((item) => item.slug !== currentSlug)
    : list;

  // ============================
  // LOAD MORE (REAL API)
  // ============================
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    const res = await fairfestivalData(nextPage, LIMIT);

    // console.log("RES:", res);

    const newItems = res?.festival; // FIX HERE

    if (newItems && newItems.length > 0) {
      setList((prev) => [...prev, ...newItems]);

      if (newItems.length < LIMIT) {
        setHasMore(false);
      }

      setPage(nextPage);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };
  // ============================
  // VIEW LESS (RESET)
  // ============================
  const handleViewLess = () => {
    setList(festivals); // back to initial 16
    setPage(1);
    setHasMore(true);
  };
  // ============================================
  // SAME PLACEHOLDER (NO CHANGE)
  // ============================================
  const FestivalPlaceholder = ({ title, slug }: { title: string; slug: string }) => {
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

    const selectedImage = placeholderImages[getImageIndex(slug)];

    return (
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
        <img src={selectedImage} alt={title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  };

  return (
    <section>
      <div className="ts-container">
        <h2 className="ts-heading">Popular Fairs & Festivals in India</h2>

        <div className={styles.festivalGrid}>
          {filteredList.map((item) => (
            <Link key={item.slug} href={`/india/fairs-festivals/${item.slug}/`}>
              <article className={styles.festivalCard}>
                <div className={styles.festivalImageWrapper}>
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

          {/* LOAD MORE */}
          {hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="btn orange-btn ts-btn-main"
            >
              {loading ? "Loading..." : "Load More"}
              {!loading && (
                <Image
                  width={23}
                  height={23}
                  src="/images/button-arrow.png"
                  alt="arrow"
                />
              )}
            </button>
          )}

          {/* VIEW LESS */}
          {!hasMore && list.length > LIMIT && (
            <button
              onClick={handleViewLess}
              className="btn orange-btn ts-btn-main"
            >
              View Less
              <Image
                width={23}
                height={23}
                src="/images/button-arrow.png"
                alt="arrow"
              />
            </button>
          )}

        </div>
      </div>
    </section>
  );
}