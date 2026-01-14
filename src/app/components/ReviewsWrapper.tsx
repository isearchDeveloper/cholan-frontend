"use client";

import ReviewsWidget from "./ReviewsWidget";
import CarReviews from "./CarReviews";

export default function ReviewsWrapper({
  isCarPage = false,
}: {
  isCarPage?: boolean;
}) {
  return isCarPage ? <CarReviews /> : <ReviewsWidget />;
}
