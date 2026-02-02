// "use client";

// import { useState } from "react";
// import ReviewCard from "./ReviewCard";

// export default function CarReviewList({ reviews }: any) {
//   const [showAll, setShowAll] = useState(false);

//   const visibleReviews = showAll ? reviews : reviews.slice(0, 20);

//   return (
//     <>
//       {/* {visibleReviews.map((review: any) => (
//         <ReviewCard key={review.id} review={review} />
//       ))} */}

//         <div className="car-review-wrapper">
//         {visibleReviews.map((review: any) => (
//           <ReviewCard key={review.id} review={review} />
//         ))}
//       </div>

//       {!showAll && reviews.length > 20 && (
//         <div className="text-center mt-4">
//           <button
//             className="btn btn-primary"
//             onClick={() => setShowAll(true)}
//           >
//             Show All Reviews ({reviews.length})
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

"use client";
import Image from "next/image";
import { useState } from "react";
import ReviewCard from "./ReviewCard";

export default function CarReviewList({ reviews }: any) {
  const [showAll, setShowAll] = useState(false);
  const [layout, setLayout] = useState<"list" | "grid">("list");

  const visibleReviews = showAll ? reviews : reviews.slice(0, 20);

  return (
    <>
      {/* Layout Switch Buttons */}
      <div className="d-flex gap-2 mb-3">
        <button
          onClick={() => setLayout("list")}
          className={`btn ts-btn-main ${layout === "list" ? "orange-btn" : "blue-btn"}`}
        >
          List View
        </button>

        <button
          onClick={() => setLayout("grid")}
          className={`btn ts-btn-main ${layout === "grid" ? "orange-btn" : "blue-btn"}`}
        >
          Grid View
        </button>
      </div>

      {/* Wrapper controls layout */}
      <div className={`car-review-wrapper ${layout}`}>
        {visibleReviews.map((review: any) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {!showAll && reviews.length > 20 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(true)}
            className="btn orange-btn ts-btn-main inline-flex items-center gap-2"
          >
            Show All Reviews ({reviews.length})
            <Image
              src="/images/button-arrow.png"
              alt="arrow"
              width={18}
              height={18}
            />
          </button>
        </div>
      )}
    </>
  );
}
