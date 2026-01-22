// "use client";
// import React, { useEffect } from "react";
// import { useRouter,usePathname } from "next/navigation";
// import Link from "next/link";
// import AOS from "aos";
// import "aos/dist/aos.css";

// interface SidebarProps {
//   themes: string[];
//   cities: string[];
//   destinations: string[];
// }

// const Sidebar: any = ({ data, cities, citySlug, categorySlug, setCategorySlug }: any) => {
//   const router = useRouter();
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: "ease-in-out",
//       once: true,
//     });
//   }, []);

//   const pathname = usePathname();
//   const isIndia = pathname.startsWith("/india");
//   const isInternational = pathname.startsWith("/international-holidays");


//   const normalizeCategorySlug = (slug: string) => {
//   return slug
//     .replace(/-tour-packages$/i, "")
//     .replace(/-tour-package$/i, "");
// };

//   // const handleCategoryClick = (catSlug: string) => {
//   //   setCategorySlug(catSlug);
//   //   const cityBase = citySlug ? citySlug.replace("-tour-packages", "") : cities .toLowerCase() .trim() .replace(/\s+/g, "-");
//   //   const finalSlug = `${cityBase}-${catSlug}-tour-packages`;
//   //   if (isIndia) {
//   //     router.push(`/india/${finalSlug}`);
//   //   } else if (isInternational) {
//   //     router.push(`/international-holidays/${finalSlug}`);
//   //   }
//   // };


//   const handleCategoryClick = (catSlug: string) => {
//   const baseCity = citySlug
//     ? citySlug.replace("-tour-packages", "")
//     : cities.toLowerCase().trim().replace(/\s+/g, "-");

//   const cleanCategory = normalizeCategorySlug(catSlug);

//   const finalSlug = `${baseCity}-${cleanCategory}-tour-packages`;

//   if (isIndia) {
//     router.push(`/india/${finalSlug}`, { scroll: false });
//   } else if (isInternational) {
//     router.push(`/international-holidays/${finalSlug}`, { scroll: false });
//   }
// };

  

//   return (
//     <div
//       className="sidebar-listing"
//     >
//       {data?.categories?.length < 1 ? null : (
//         <div
//           className="mb-4 theme-section shadow-sm c-sec"

//         >
//           <div className="d-flex align-items-center p-3 p-lg-3  text-white">
//             <img
//               src="/images/icon-head-1.svg"
//               alt="Theme Icon"
//               className="icon"
//             />
//             <h6 className="ms-2 mb-0 text-white font-semibold">
//               {`${cities} Tour By Theme`}
//             </h6>
//           </div>
//           <ul className="list-unstyled p-4">
//             {data?.categories?.map((cat: any) => (
//               <li
//                 onClick={() => handleCategoryClick(cat.slug)}
//                 key={cat.slug}
//                 className={`mb-2 text-decoration-none text-dark hover-link ${categorySlug === cat.slug ? "active-category" : ""}`}
//                 style={{ cursor: "pointer" }}
//               >
//                 {cities} {cat.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {data?.sourceLocations?.length < 1 ? null : (
//         <div
//           className="mb-4 city-section c-sec"
//           data-aos="fade-up"
//           data-aos-delay="400"
//         >
//           <div className="d-flex align-items-center p-3 p-lg-3  text-white">
//             <img
//               src="/images/icon-head-2.svg"
//               alt="City Icon"
//               className="icon"
//             />
//             <h6 className="ms-2 mb-0 text-white font-semibold">
//               {cities} Packages from Top Cities
//             </h6>
//           </div>
//           <ul className="list-unstyled p-4">
//             {data?.sourceLocations?.map((city: any) => (
//               <li key={""} className="mb-2">
//                 {/* <Link
//                   href={`/india/${city.slug}`}
//                   className="text-decoration-none text-dark hover-link"
//                 > */}
//                 {cities} Packages from {city.name}
//                 {/* </Link> */}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}


//     </div>
//   );
// };

// export default Sidebar;

// "use client";
// import React, { useEffect } from "react";
// import Link from "next/link";
// import AOS from "aos";
// import "aos/dist/aos.css";

// interface SidebarProps {
//   themes: string[];
//   cities: string[];
//   destinations: string[];
// }

// const Sidebar: any = ({ data, cities, categorySlug, setCategorySlug }: any) => {
//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: "ease-in-out",
//       once: true,
//     });
//   }, []);

//   return (
//     <div
//       className="sidebar-listing"
//     >
//       {data?.categories?.length < 1 ? null : (
//         <div
//           className="mb-4 theme-section shadow-sm c-sec"

//         >
//           <div className="d-flex align-items-center p-3 p-lg-3  text-white">
//             <img
//               src="/images/icon-head-1.svg"
//               alt="Theme Icon"
//               className="icon"
//             />
//             <h6 className="ms-2 mb-0 text-white font-semibold">
//               {`${cities} Tour By Theme`}
//             </h6>
//           </div>
//           <ul className="list-unstyled p-4">
//             {data?.categories?.map((cat: any) => (
//               <li
//                 // onClick={() => setCategorySlug(cat.slug)}
//                 key={cat.slug}
//                 className={`mb-2 text-decoration-none text-dark hover-link ${categorySlug === cat.slug ? "active-category" : ""}`}
//                 // style={{ cursor: "pointer" }}
//               >
//                 {cities} {cat.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* {data?.sourceLocations?.length < 1 ? null : (
//         <div
//           className="mb-4 city-section c-sec"
//           data-aos="fade-up"
//           data-aos-delay="400"
//         >
//           <div className="d-flex align-items-center p-3 p-lg-3  text-white">
//             <img
//               src="/images/icon-head-1.svg"
//               alt="City Icon"
//               className="icon"
//             />
//             <h6 className="ms-2 mb-0 text-white font-semibold">
//               {cities} Packages from Top Cities
//             </h6>
//           </div>
//           <ul className="list-unstyled p-4">
//             {data?.sourceLocations?.map((city: any) => (
//               <li key={""} className="mb-2">
//                 {/* <Link
//                   href={`/india/${city.slug}`}
//                   className="text-decoration-none text-dark hover-link"
//                 > */}
//                 {/* {cities} Packages from {city.name} */}
//                 {/* </Link> */}
//               {/* </li> */}
//             {/* ))} */}
//           {/* </ul> */}
//         </div>
//       // )} */}


//     // </div>
//   );
// };

// export default Sidebar;


"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const Sidebar = ({
  data,
  cities,
  citySlug,
  categorySlug,
}: any) => {
  const isThemeSidebar = data?.type === "theme";

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // nothing to show
  if (
    (!isThemeSidebar && !data?.categories?.length) ||
    (isThemeSidebar && !data?.items?.length)
  ) {
    return null;
  }

  return (
    <div className="sidebar-listing">
      <div className="mb-4 theme-section shadow-sm c-sec">
        <div className="d-flex align-items-center p-3 text-white">
          <img src="/images/icon-head-1.svg" alt="Icon" className="icon" />
          <h6 className="ms-2 mb-0 text-white font-semibold">
            {isThemeSidebar
              ? `${cities} Tour By Theme`
              : `${cities} Categories`}
          </h6>
        </div>

        <ul className="list-unstyled p-4">
          {isThemeSidebar
            ? data.items.map((item: any) => (
                <li key={item.slug} className="mb-2">
                  <Link
                    href={`/india/${citySlug}-${item.slug}-tour-packages`}
                    className="text-decoration-none text-dark hover-link"
                  >
                    {item.title}
                  </Link>
                </li>
              ))
            : data.categories.map((cat: any) => (
                <li
                  key={cat.slug}
                  className={`mb-2 text-decoration-none text-dark hover-link ${
                    categorySlug === cat.slug ? "active-category" : ""
                  }`}
                >
                  {cities} {cat.name}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

