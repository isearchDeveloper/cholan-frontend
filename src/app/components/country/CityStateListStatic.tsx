"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CityStateList = () => {
  const items = [
    { name: "Kerala", slug: "kerala", image: "/images/kerala.webp" },
    { name: "Goa", slug: "goa", image: "/images/goa.webp" },
    { name: "Gujarat", slug: "gujarat", image: "/images/gujarat.webp" },
    { name: "Delhi", slug: "delhi", image: "/images/delhi.webp" },
    { name: "Munnar", slug: "munnar", image: "/images/munnar.webp" },
    { name: "Karnataka", slug: "karnataka", image: "/images/karnataka.webp" },
    { name: "Rajasthan", slug: "rajasthan", image: "/images/rajasthan.webp" },
    { name: "Tamil Nadu", slug: "tamil-nadu", image: "/images/tamilnadu.webp" },
  ];

  const [visibleCount, setVisibleCount] = useState(8);
  const visibleItems = items.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount(prev => prev + 8);
  const shouldShowLoadMore = items.length > visibleCount;

  return (
    <div className="rent-car-list-route py-5 px-2 px-lg-0">
      <div className="container">
        <h2 className="text-center mb-4 color-blue fs-3">
          India  By City & States
        </h2>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          {visibleItems.map((item, index) => (
            <div key={index} className="col-lg-3">
              <div className="w-100 route-card">
                <Link href={`/india/${item.slug}`}>
                  {/* <Image
                    width={400}
                    height={250}
                    sizes="100vw"
                    src={item.image}
                    alt={item.name}
                    className="w-100 h-100 object-cover rounded-4"
                  /> */}
                  <p className="mt-2 text-center text-capitalize">
                    {item.name}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {shouldShowLoadMore && (
          <div className="text-center mt-5">
            <button
              onClick={handleLoadMore}
              className="btn orange-btn inline-flex items-center gap-2"
            >
              Load More
              <span>
                <Image
                  width={23}
                  height={23}
                  src="/images/button-arrow.png"
                  alt="arrow"
                />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityStateList;


// "use client";

// import Link from "next/link";

// export default function CityStateListStatic({ type }: { type: string }) {
  
//   // ⭐ STATIC INDIA CITIES
//   const indiaCities = [
//     { name: "Kerala", slug: "kerala" },
//     { name: "Goa", slug: "goa" },
//     { name: "Gujarat", slug: "gujarat" },
//     { name: "Delhi", slug: "delhi" },
//     { name: "Munnar", slug: "munnar" },
//     { name: "Karnataka", slug: "karnataka" },
//     { name: "Rajasthan", slug: "rajasthan" },
//     { name: "Tamil Nadu", slug: "tamil-nadu" },
//   ];

//   // ⭐ STATIC INTERNATIONAL COUNTRIES
//   const intlCountries = [
//     { name: "Dubai", slug: "dubai" },
//     { name: "Singapore", slug: "singapore" },
//     { name: "Thailand", slug: "thailand" },
//     { name: "Bali", slug: "bali" },
//     { name: "Malaysia", slug: "malaysia" },
//     { name: "Vietnam", slug: "vietnam" },
//     { name: "Maldives", slug: "maldives" },
//     { name: "Europe", slug: "europe" },
//   ];

//   const finalList = type === "india" ? indiaCities : intlCountries;

//   return (
//     <div className="rent-car-list-route py-5 px-2 px-lg-0">
//       <div className="container">
//         <h2 className="text-center mb-4 color-blue fs-3">
//           {type === "india"
//             ? "India By City & States"
//             : "International Destinations"}
//         </h2>

//         <div className="row row-cols-1 row-cols-md-4 g-4">
//           {finalList.map((item, index) => (
//             <div key={index} className="col-lg-3">
//               <div className="w-100 route-card text-center">
//                 <Link
//                   href={
//                     type === "india"
//                       ? `/india/${item.slug}`
//                       : `/international-holidays/${item.slug}`
//                   }
//                 >
//                   <p className="mt-2 text-center text-capitalize">
//                     {item.name}
//                   </p>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }
