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

const Sidebar: any = ({
  data,
  cities,
  citySlug,
  categorySlug,
  setCategorySlug,
  sidebarThemes = [],
}: any) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  //  normalize slug (important)
  const normalize = (slug: string) =>
    slug?.replace("-tour-packages", "").trim();

  //  clean city slug
  const cleanCitySlug = normalize(citySlug);

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
            <img src="/images/icon-head-1.svg" className="icon" />
            <div className="ms-2 mb-0 text-white font-semibold">
              {`${cities} Tour By Theme`}
            </div>
          </div>

          <ul className="list-unstyled p-4">
            {data.categories.map((cat: any) => {
              const cleanSlug = normalize(cat.slug);

              // 🔥 check if theme
              const isTheme = sidebarThemes.some(
                (t: any) => normalize(t.slug) === cleanSlug
              );

              // ✅ THEME → redirect
              if (isTheme) {
                return (
                  <li key={cat.slug} className="mb-2">
                    <Link
                      href={`/india/${cleanCitySlug}-${cleanSlug}-tour-packages`}
                      className="text-decoration-none text-dark hover-link"
                    >
                      {formatCatLabel(cat.name || cat.title)}
                    </Link>
                  </li>
                );
              }

              // 🔁 NOT THEME → filter (same page)
              return (
                <li
                  key={cat.slug}
                  onClick={() =>
                    setCategorySlug && setCategorySlug(cat.slug)
                  }
                  className={`mb-2 text-decoration-none text-dark hover-link ${categorySlug === cat.slug ? "active-category" : ""
                    }`}
                  style={{ cursor: "pointer" }}
                >
                  {formatCatLabel(cat.name || cat.title)}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;