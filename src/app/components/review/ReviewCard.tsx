"use client";
import React from "react";

const Stars = ({ count }: { count: number }) => (
  <span className="car-review-stars">
    {"★".repeat(count)}
    {"☆".repeat(5 - count)}
  </span>
);

const ReviewCard = React.memo(({ review }: any) => {
  return (
    <div className="car-review-card">
      <div className="car-review-header">
        <div className="car-review-content">
          <div className="d-flex justify-content-between">
            <div>
              <div className="car-review-name">{review.name}</div>
              <div className="car-review-date">{review.date}</div>
            </div>

            {/* Overall Rating */}
            <div>
              {/* <small>Overall</small><br /> */}
              <Stars count={review.overallRating} />
            </div>
          </div>

          <p className="car-review-text">{review.review}</p>

          {/* Driver & Vehicle ratings */}
          <div className="car-review-subratings mt-3">
            <div>
              <small>Driver Rating</small><br />
              <Stars count={review.driverRating} />
            </div>

            <div>
              <small>Vehicle Rating</small><br />
              <Stars count={review.vehicleRating} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ReviewCard;
