
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CarRentalRoutes = ({ routes ,cityName }: any) => {
  const [visibleCount, setVisibleCount] = useState(20);

  // Determine which routes to show
  const visibleRoutes = routes?.slice(0, visibleCount);

  // Logic for when to show the "Load More" button
  const shouldShowLoadMore = routes?.length > visibleCount;

  // Function to load more routes
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20);
  }
  
  return (
    <div className="rent-car-list-route py-5 px-2 px-lg-0">
      <div className="container">
        <h2 className="text-center mb-4 color-blue fs-3">
          {cityName
            ? `Popular ${cityName} Car Rental Routes`
            : "Popular Car Rental Routes"}
        </h2>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          {visibleRoutes?.map((data: any) => (
            <div key={data.slug} className="col-lg-3">
              <div className="w-100 route-card">
                <Image
                  width={20}
                  height={20}
                  sizes="100vw"
                  src="/images/car-rent.svg"
                  alt="Car Rent Icon"
                />

                {data.details == null ? (
                  <p>
                    {`${data?.from_location} to ${data?.to_location}`}
                  </p>
                ) : (
                  <Link href={`/car-rental/${data.slug}`}>
                    {`${data?.from_location} to ${data?.to_location}`}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
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
                  sizes="100vw"
                  src="/images/button-arrow.png"
                  alt=""
                />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarRentalRoutes;



// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// const CarRentalRoutes = ({ routes, cityName }: any) => {
//   const [visibleCount, setVisibleCount] = useState(20);

//   // Determine which routes to show
//   const visibleRoutes = routes?.slice(0, visibleCount);

//   // Logic for when to show the "Load More" button
//   const shouldShowLoadMore = routes?.length > visibleCount;

//   // Function to load more routes
//   const handleLoadMore = () => {
//     setVisibleCount((prev) => prev + 20);
//   };

//   return (
//     <div className="rent-car-list-route py-5 px-2 px-lg-0">
//       <div className="container">
//         <h2 className="text-center mb-4 color-blue fs-3">
//           {cityName
//             ? `Popular ${cityName} Car Rental Routes`
//             : "Popular Car Rental Routes"}
//         </h2>

//         {/* ✅ INLINE PIPE STYLE ROUTES */}
//         <div className="routes-inline text-center">
//           {visibleRoutes?.map((data: any, index: number) => (
//             <React.Fragment key={data.slug}>
//               {data.details == null ? (
//                 <span className="route-text">
//                   {data?.from_location} to {data?.to_location}
//                 </span>
//               ) : (
//                 <Link
//                   href={`/car-rental/${data.slug}`}
//                   className="route-text route-link"
//                 >
//                   {data?.from_location} to {data?.to_location}
//                 </Link>
//               )}

//               {index !== visibleRoutes.length - 1 && (
//                 <span className="route-separator"> | </span>
//               )}
//             </React.Fragment>
//           ))}
//         </div>

//         {/* Load More Button */}
//         {shouldShowLoadMore && (
//           <div className="text-center mt-5">
//             <button
//               onClick={handleLoadMore}
//               className="btn orange-btn inline-flex items-center gap-2"
//             >
//               Load More
//               <span>
//                 <Image
//                   width={23}
//                   height={23}
//                   sizes="100vw"
//                   src="/images/button-arrow.png"
//                   alt=""
//                 />
//               </span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CarRentalRoutes;
