// // "use client";

// // interface ThemePackageListingProps {
// //   city: string;
// //   theme: string;
// //   packages: {
// //     id: number;
// //     title: string;
// //     nights: string;
// //     price: string;
// //   }[];
// // }

// // export default function ThemePackageListing({
// //   city,
// //   theme,
// //   packages,
// // }: ThemePackageListingProps) {
// //   return (
// //     <div className="container py-5">
// //       <h1 className="mb-2 text-capitalize">
// //         {theme} Tour Packages in {city}
// //       </h1>

// //       <p className="mb-4">
// //         Explore the best {theme} tour packages in {city}. Carefully designed
// //         itineraries for a perfect holiday experience.
// //       </p>

// //       <div className="row">
// //         {packages.map((pkg) => (
// //           <div key={pkg.id} className="col-md-4 mb-4">
// //             <div className="card h-100">
// //               <div className="card-body">
// //                 <h5 className="card-title">{pkg.title}</h5>
// //                 <p className="card-text">{pkg.nights}</p>
// //                 <strong>{pkg.price}</strong>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useEffect, useState } from "react";
// import TourCard from "@/app/components/common/TourCard";
// import Banner from "@/app/components/common/banner";
// import ExpandableText from "@/app/components/common/ExpandableText";
// import Breadcrumb from "@/app/components/common/Breadcrumb";
// import FAQAccordionListing from "@/app/components/common/FAQAccordionForListing";
// import AOS from "aos";
// import "aos/dist/aos.css";

// interface ThemePackageListingProps {
//   city: string;
//   theme: string;
//   packages: any; // dummy now, API later
// }

// export default function ThemePackageListing({
//   city,
//   theme,
//   packages,
// }: ThemePackageListingProps) {
//   const [packageList, setPackageList] = useState<any>(packages);

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: "ease-in-out",
//       once: true,
//     });
//   }, []);

//   const breadcrumbItems = [
//     { label: "Home", href: "/" },
//     { label: "India", href: "/india" },
//     {
//       label: `${city.replace(/-/g, " ")} Tour Packages`,
//       href: `/india/${city}-tour-packages`,
//     },
//     {
//       label: `${theme.replace(/-/g, " ")} Packages`,
//       isCurrent: true,
//     },
//   ];

//   const pageTitle = `${city.replace(/-/g, " ")} ${theme.replace(
//     /-/g,
//     " "
//   )} Tour Packages`;
// console.log(packageList);
//   return (
//     <div className="tour-listing p-0">
//       {/* Banner */}
//       {packageList?.location?.details && (
//         <Banner
//           title={pageTitle}
//           // subtitle={packageList?.location?.details?.sub_title}
//           imageUrl={packageList?.location?.details?.banner_image}
//         />
//       )}

//       <div className="listing-inner-wrapper">
//         <div className="container mx-auto pt-4 pb-5">
//           <div className="row">
//             <div className="col-lg-12">
//               {/* <Breadcrumb items={breadcrumbItems} /> */}
//             </div>

//             {/* MAIN CONTENT (NO SIDEBAR) */}
//             <div className="col-12">
//               <ExpandableText
//                 title={pageTitle}
//                 // subtitle={packageList?.location?.details?.sub_title}
//                 text={packageList?.location?.details?.about}
//                 collapsedLines={2}
//               />

//               {/* Showing count */}
//               {packageList?.packages?.length > 0 && (
//                 <div className="showing-count my-3 text-sm">
//                   Showing {packageList.packages.length} packages
//                 </div>
//               )}

//               {/* Package Grid */}
//              {!Array.isArray(packageList?.packages) ||
//  packageList.packages.length < 1 ? (
//   <h6 className="mt-5 text-danger">No Packages Found</h6>
// ) : (
//   <div className="grid grid-cols-1 gap-6">
//     {packageList.packages.map((tour: any) => (
//       <TourCard
//         key={tour.slug}
//         slug={tour.slug}
//         title={tour.title}
//         rating={5}
//         duration={`${tour.details.duration_nights} Nights / ${tour.details.duration_days} Days`}
//         tourTime={`${tour.details.start_date} - ${tour.details.end_date}`}
//         highlights={tour.details.tour_highlights}
//         imageUrl={tour.primary_image}
//       />
//     ))}
//   </div>
// )}

//               {/* FAQ */}
//               {packageList?.location?.faqs?.length > 0 && (
//                 <div className="mt-5">
//                   <FAQAccordionListing
//                     faqs={packageList.location.faqs}
//                     location={pageTitle}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import TourCard from "@/app/components/common/TourCard";
import Banner from "@/app/components/common/banner";
import ExpandableText from "@/app/components/common/ExpandableText";
import FAQAccordionListing from "@/app/components/common/FAQAccordionForListing";
import Sidebar from "@/app/components/common/sidebar";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import ThemeSidebar from "./ThemeSidebar";

interface ThemePackageListingProps {
  data: any;
  citySlug: String;
}

export default function ThemePackageListing({ data, sidebarThemes }: any) {
  if (!data) return null;
console.log(data);
  const details = data?.location?.details || {};
  const packages = Array.isArray(data?.packages) ? data.packages : [];

  const pageTitle = details?.title || "Theme Tour Packages";

  const cityName = data?.location?.name || "";
  const citySlug = cityName.toLowerCase().replace(/\s+/g, "-");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "India", href: "/india" },

    // ✅ City Intro Page
    {
      label: cityName,
      href: `/india/${citySlug}`,
    },

    // ✅ Current Theme Listing
    {
      label: details?.title,
      isCurrent: true,
    },
  ];

  return (
    <div className="tour-listing p-0">
      {/* Banner */}
      <Banner
        title={pageTitle}
        subtitle={details?.sub_title}
        imageUrl={details?.banner_image}
      />

      <div className="listing-inner-wrapper">
        <div className="container mx-auto pt-4 pb-5">
          <div className="row">
            {/* Breadcrumb */}
            <div className="col-lg-12">
              <Breadcrumb items={breadcrumbItems} />
            </div>

            {/* ✅ SIDEBAR (same as India page) */}
            <div className="col-12 col-lg-3">
              <ThemeSidebar
                citySlug={citySlug}
                cityName={cityName}
                themes={sidebarThemes}
              />
            </div>

            {/* ✅ MAIN LISTING */}
            <div className="col-12 col-lg-9">
              <ExpandableText
                title={pageTitle}
                text={details?.about}
                collapsedLines={2}
              />

              {packages.length === 0 ? (
                <h6 className="mt-5 text-danger">No Packages Found</h6>
              ) : (
                <div className="grid grid-cols-1 gap-6 mt-4">
                  {packages.map((tour: any) => (
                    <TourCard
                      key={tour.slug}
                      slug={tour.slug}
                      title={tour.title}
                      rating={5}
                      duration={`${tour.details?.duration_nights} ${
                        tour.details?.duration_nights < 2 ? "Night" : "Nights"
                      } ${tour.details?.duration_days} ${
                        tour.details?.duration_days < 2 ? "Day" : "Days"
                      }`}
                      tourTime={`${tour.details?.start_date ?? ""} - ${
                        tour.details?.end_date ?? ""
                      }`}
                      highlights={tour.details?.tour_highlights}
                      imageUrl={
                        tour.primary_image
                          ? `https://cdn.cholantours.com/${tour.primary_image}`
                          : "/images/tour/default.webp"
                      }
                    />
                  ))}
                </div>
              )}

              {/* FAQ */}
              {data?.location?.faqs?.length > 0 && (
                <div className="mt-5">
                  <FAQAccordionListing
                    faqs={data.location.faqs}
                    location={pageTitle}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
