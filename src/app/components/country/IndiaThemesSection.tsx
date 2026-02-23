// "use client";

// import { useMemo, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// interface ThemeItem {
//   title: string;
//   slug: string;
//   img: string;
// }

// export default function IndiaThemesSection({ result }: any) {
//   const [showAll, setShowAll] = useState(false);

//   // 🔥 Convert backend result to same old themes[] structure
//   const themes: ThemeItem[] = useMemo(() => {
//     if (!result) return [];

//     return result.map((t: any) => ({
//       title: t.title,
//       slug: t.slug,
//       img: t.primary_img || "",   // backend field
//     }));
//   }, [result]);

//   const visibleThemes = showAll ? themes : themes.slice(0, 8);

//   if (themes.length === 0) return null;

//   return (
//     <section className="themes-section pb-5">
//       <div className="container">
//         <h2 className="text-center mb-5 section-title">
//           Explore India by Travel Themes
//         </h2>

//         <div className="row g-4">
//           {visibleThemes.map((theme) => (
//             <div key={theme.slug} className="col-6 col-md-4 col-lg-3">
//               <Link
//                 href={`/india/${theme.slug}`}
//                 className="theme-card"
//               >
//                 <div className="theme-img-wrapper">
//                   <Image
//                     src={
//                       theme.img
//                         ? `https://cdn.cholantours.com/${theme.img}`
//                         : "/images/no-img.webp"
//                     }
//                     alt={theme.title}
//                     width={400}
//                     height={300}
//                     className="theme-img"
//                   />
//                   <div className="theme-overlay">
//                     <span>{theme.title}</span>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>

//         {themes.length > 8 && (
//           <div className="text-center mt-4">
//             <button
//               onClick={() => setShowAll(!showAll)}
//               className="btn orange-btn inline-flex items-center gap-2"
//             >
//               {showAll ? "Show Less" : "View All Themes"}
//               <span>
//                 <Image
//                   width={23}
//                   height={23}
//                   src="/images/button-arrow.png"
//                   alt=""
//                 />
//               </span>
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface ThemeItem {
  title: string;
  slug: string;
  img: string;
}

export default function IndiaThemesSection({ result }: any) {
  const [showAll, setShowAll] = useState(false);

  const themes: ThemeItem[] = useMemo(() => {
    if (!Array.isArray(result)) return [];

    return result.map((t: any) => ({
      title: t?.title || "",
      slug: t?.slug || "",
      img: t?.primary_img || "",
    }));
  }, [result]);

  const visibleThemes = showAll ? themes : themes.slice(0, 8);

  if (themes.length === 0) return null;

  return (
    <section className="themes-section pb-5">
      <div className="container">
        <h2 className="text-center mb-5 section-title">
          Explore India by Travel Themes
        </h2>

        <div className="row g-4">
          {visibleThemes.map((theme) => (
            <div key={theme.slug || theme.title} className="col-6 col-md-4 col-lg-3">
              <Link
                href={theme.slug ? `/india/${theme.slug}` : "#"}
                className="theme-card"
              >
                <div className="theme-img-wrapper">
                  <Image
                    src={
                      theme.img
                        ? `https://cdn.cholantours.com/${theme.img}`
                        : "/images/no-img.webp"
                    }
                    alt={theme.title}
                    width={400}
                    height={300}
                    className="theme-img"
                  />
                  <div className="theme-overlay">
                    <span>{theme.title}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {themes.length > 8 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn orange-btn inline-flex items-center gap-2"
            >
              {showAll ? "Show Less" : "View All Themes"}
              <span>
                <Image
                  width={23}
                  height={23}
                  src="/images/button-arrow.png"
                  alt=""
                />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}