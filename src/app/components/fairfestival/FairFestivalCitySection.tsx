
// // new not im,ages pr chal wo code 

// "use client";

// import { useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import styles from "./festivalCards.module.css";
// import { fairfestivalData } from "@/app/services/fairfestivalService";

// interface FestivalCard {
//   slug: string;
//   title: string;
//   primary_image: string;
//   primary_image_alt?: string;
// }

// const LIMIT = 16;

// export default function FairFestivalCitySection({
//   festivals = [],
// }: {
//   festivals?: FestivalCard[];
// }) {

//   //  NEW STATE
//   const [list, setList] = useState<FestivalCard[]>(festivals);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   // const [hasMore, setHasMore] = useState(festivals.length === LIMIT);
//   const [hasMore, setHasMore] = useState(festivals.length === LIMIT);

//   const params = useParams();
//   const currentSlug = params?.slug as string | undefined;

//   const filteredList = currentSlug
//     ? list.filter((item) => item.slug !== currentSlug)
//     : list;

//   // ============================
//   // LOAD MORE (REAL API)
//   // ============================
//   const handleLoadMore = async () => {
//     const nextPage = page + 1;
//     setLoading(true);

//     const res = await fairfestivalData(nextPage, LIMIT);

//     // console.log("RES:", res);

//     const newItems = res?.festival; // FIX HERE

//     if (newItems && newItems.length > 0) {
//       setList((prev) => [...prev, ...newItems]);

//       if (newItems.length < LIMIT) {
//         setHasMore(false);
//       }

//       setPage(nextPage);
//     } else {
//       setHasMore(false);
//     }

//     setLoading(false);
//   };
//   // ============================
//   // VIEW LESS (RESET)
//   // ============================
//   const handleViewLess = () => {
//     setList(festivals); // back to initial 16
//     setPage(1);
//     setHasMore(true);
//   };
//   // ============================================
//   // SAME PLACEHOLDER (NO CHANGE)
//   // ============================================
// const FestivalPlaceholder = ({ title, slug }: { title: string; slug: string }) => {
//   const placeholderImages = [
//     // "/images/festival-placeholder-1.webp",
//     "/images/fairs-and-festivals.webp",
//     "/images/festival-placeholder-2.webp",
//   ];

//   // 🔥 BETTER HASH (STABLE + RANDOM FEEL)
//   const getImageIndex = (str: string, length: number): number => {
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//       hash = (hash << 5) - hash + str.charCodeAt(i);
//       hash |= 0; // convert to 32bit int
//     }
//     return Math.abs(hash) % length;
//   };

//   const selectedImage =
//     placeholderImages[getImageIndex(slug || title, placeholderImages.length)];

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "100%",
//         overflow: "hidden",
//       }}
//     >
//       <img
//         src={selectedImage}
//         alt={title}
//         loading="lazy"
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//         }}
//       />
//     </div>
//   );
// };

//   return (
//     <section>
//       <div className="ts-container">
//         <h2 className="ts-heading">Popular Fairs & Festivals in India</h2>

//         <div className={styles.festivalGrid}>
//           {filteredList.map((item) => (
//             <Link key={item.slug} href={`/india/fairs-festivals/${item.slug}/`}>
//               <article className={styles.festivalCard}>
//                 <div className={styles.festivalImageWrapper}>
//                   {item.primary_image ? (
//                     <img
//                       src={item.primary_image}
//                       alt={item.primary_image_alt || item.title}
//                       loading="lazy"
//                     />
//                   ) : (
//                     <FestivalPlaceholder title={item.title} slug={item.slug} />
//                   )}
//                 </div>

//                 <div className={styles.festivalContent}>
//                   <h6 className={styles.festivalTitle}>{item.title}</h6>
//                 </div>
//               </article>
//             </Link>
//           ))}
//         </div>

//         <div className="ts-button-wrap">

//           {/* LOAD MORE */}
//           {hasMore && (
//             <button
//               onClick={handleLoadMore}
//               disabled={loading}
//               className="btn orange-btn ts-btn-main"
//             >
//               {loading ? "Loading..." : "Load More"}
//               {!loading && (
//                 <Image
//                   width={23}
//                   height={23}
//                   src="/images/button-arrow.png"
//                   alt="arrow"
//                 />
//               )}
//             </button>
//           )}

//           {/* VIEW LESS */}
//           {!hasMore && list.length > LIMIT && (
//             <button
//               onClick={handleViewLess}
//               className="btn orange-btn ts-btn-main"
//             >
//               View Less
//               <Image
//                 width={23}
//                 height={23}
//                 src="/images/button-arrow.png"
//                 alt="arrow"
//               />
//             </button>
//           )}

//         </div>
//       </div>
//     </section>
//   );
// }



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

// ✅ IMAGE VALIDATION
const isValidImage = (src?: string) => {
  if (!src) return false;
  const value = src.trim().toLowerCase();
  return value !== "" && value !== "null" && value !== "undefined";
};

export default function FairFestivalCitySection({
  festivals = [],
}: {
  festivals?: FestivalCard[];
}) {
  const [list, setList] = useState<FestivalCard[]>(festivals);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(festivals.length === LIMIT);

  const params = useParams();
  const currentSlug = params?.slug as string | undefined;

  const filteredList = currentSlug
    ? list.filter((item) => item.slug !== currentSlug)
    : list;

  // ============================
  // LOAD MORE
  // ============================
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const res = await fairfestivalData(nextPage, LIMIT);
      const newItems = res?.festival || [];

      if (newItems.length > 0) {
        setList((prev) => [...prev, ...newItems]);

        if (newItems.length < LIMIT) {
          setHasMore(false);
        }

        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Load more failed:", err);
      setHasMore(false);
    }

    setLoading(false);
  };

  // ============================
  // VIEW LESS
  // ============================
  const handleViewLess = () => {
    setList(festivals);
    setPage(1);
    setHasMore(true);
  };

  // ============================
  // PLACEHOLDER (SMART RANDOM)
  // ============================
  const FestivalPlaceholder = ({
    title,
    slug,
  }: {
    title: string;
    slug: string;
  }) => {
    const placeholderImages = [
      
      "/images/fairs-and-festivals.webp",
      "/images/festival-placeholder-2.webp",
      //  "/images/festival-placeholder-1.webp",
     
    ];

    const getImageIndex = (str: string, length: number): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash) % length;
    };

    const selectedImage =
      placeholderImages[getImageIndex(slug || title, placeholderImages.length)];

    return (
      <img
        src={selectedImage}
        alt={title}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    );
  };

  return (
    <section>
      <div className="ts-container">
        <h2 className="ts-heading">
          Popular Fairs & Festivals in India
        </h2>

        <div className={styles.festivalGrid}>
          {filteredList.map((item) => (
            <Link key={item.slug} href={`/india/fairs-festivals/${item.slug}`}>
              <article className={styles.festivalCard}>
                <div className={styles.festivalImageWrapper}>
                  
                  {/* ✅ IMAGE + FALLBACK */}
                  {isValidImage(item.primary_image) ? (
                    <img
                      src={item.primary_image}
                      alt={item.primary_image_alt || item.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "/images/festival-placeholder-1.webp";
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <FestivalPlaceholder
                      title={item.title}
                      slug={item.slug}
                    />
                  )}
                </div>

                <div className={styles.festivalContent}>
                  <h6 className={styles.festivalTitle}>
                    {item.title}
                  </h6>
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