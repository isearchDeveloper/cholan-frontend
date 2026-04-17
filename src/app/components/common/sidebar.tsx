// "use client";
// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Sidebar: any = ({ data, cities, categorySlug, setCategorySlug }: any) => {
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: "ease-in-out",
//       once: true,
//     });
//   }, []);

//   const formatCatLabel = (catName: string) => {
//     if (!cities || !catName) return catName;
//     const cityLower = cities.trim().toLowerCase();
//     const nameLower = catName.trim().toLowerCase();
//     if (nameLower.startsWith(cityLower)) {
//       return catName.trim();
//     }
//     return `${cities} ${catName}`;
//   };

//   return (
//     <div className="sidebar-listing">
//       {data?.categories?.length < 1 ? null : (
//         <div className="mb-4 theme-section shadow-sm c-sec">
//           <div className="d-flex align-items-center p-3 p-lg-3 text-white">
//             <img
//               src="/images/icon-head-1.svg"
//               alt="Theme Icon"
//               className="icon"
//             />
//             <div className="ms-2 mb-0 text-white font-semibold">
//               {`${cities} Tour By Theme`}
//             </div>
//           </div>
//           <ul className="list-unstyled p-4">
//             {data?.categories?.map((cat: any) => (
//               <li
//                 onClick={() => setCategorySlug && setCategorySlug(cat.slug)}
//                 key={cat.slug}
//                 className={`mb-2 text-decoration-none text-dark hover-link ${
//                   categorySlug === cat.slug ? "active-category" : ""
//                 }`}
//                 style={{ cursor: "pointer" }}
//               >
//                 {formatCatLabel(cat.name)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;


"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import styles from "./sidebar.module.css";

const Sidebar: any = ({
  data,
  cities,
  citySlug,
  sidebarThemes = [],
}: any) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const pathname = usePathname();

  // Detect base path
  const basePath = pathname.startsWith("/international-holidays")
    ? "/international-holidays"
    : "/india";

  //  normalize slug (important)
  const normalize = (slug: string) =>
    slug?.replace("-tour-packages", "").trim();

  //  clean city slug
  const cleanCitySlug = normalize(citySlug);

  //  current page url
  const currentPageUrl = `${basePath}/${cleanCitySlug}-tour-packages`;

  //  label formatter
  const formatCatLabel = (catName: string) => {
    if (!cities || !catName) return catName;

    // already full name
    if (catName.toLowerCase().includes("tour packages")) {
      return catName;
    }

    const cleanName = catName
      .replace("-tour-packages", "")
      .replace(/-/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c: string) => c.toUpperCase());

    return `${cities} ${cleanName} Tour Packages`;
  };

  return (
    <div className="sidebar-listing">
      {data?.categories?.length > 0 && (
        <div className="mb-4 theme-section shadow-sm c-sec">
          <div className="d-flex align-items-center p-3 text-white">
            <img src="/images/icon-head-1.svg" className="icon" alt="" />
            <div className="ms-2 mb-0 text-white font-semibold">
              {`${cities} Tour By Theme`}
            </div>
          </div>

      <ul className="list-unstyled p-4">

  {/* ✅ IF THEMES EXIST */}
  {sidebarThemes.length > 0 ? (
    data.categories.map((cat: any) => {
      const cleanSlug = normalize(cat.slug);

      const isTheme = sidebarThemes.some(
        (t: any) => normalize(t.slug) === cleanSlug
      );

      if (!isTheme) return null;

      return (
        <li key={cat.slug} className="mb-3 d-flex align-items-start">
          <span className="me-2 mt-1" style={{ fontSize: "10px", color: "#666" }}>
            ●
          </span>

          <Link
            href={`${basePath}/${cleanCitySlug}-${cleanSlug}-tour-packages`}
            className="text-decoration-none text-dark hover-link"
            style={{ fontSize: "15px", lineHeight: "1.4" }}
          >
            {formatCatLabel(cat.name || cat.title)}
          </Link>
        </li>
      );
    })
  ) : (
    /* ❌ NO THEMES → SHOW ONLY CURRENT PAGE */
    <li className="mb-3 d-flex align-items-start">
      <span className="me-2 mt-1" style={{ fontSize: "10px", color: "#666" }}>
        ●
      </span>

      <Link
        href={currentPageUrl}
        className="text-decoration-none text-dark hover-link active-category"
        style={{ fontSize: "15px", lineHeight: "1.4" }}
      >
        {`${cities} Tour Packages`}
      </Link>
    </li>
  )}

</ul>
        </div>
      )}

      {/* NEW SIDEBAR BANNER SECTION */}
      <div className={`${styles.bannerContainer} d-none d-lg-block`} data-aos="fade-up" data-aos-delay="200">
        <Image
          src="/images/sidebaarbanner.png"
          alt="Explore India"
          width={400}
          height={600}
          className={styles.bannerImage}
        />
        <div className={styles.bannerOverlay}>
          <div className={styles.exploreBtn} style={{ cursor: "default" }}>
            Explore Group Tours
            <span>
              <Image
                width={16}
                height={16}
                src="/images/button-arrow.png"
                alt=""
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;