// app/reviews/page.tsx

import CarReviewList from "@/app/components/review/CarReviewList";

import { fetchCarReviewData } from "@/app/services/reveiwService";
import "./review.css";


function mapReview(r: any, index: number) {
  return {
    id: index,
    name: r.GuestName,
    review: r.FeedbackMessage,
    date: r.FeedbackInsertDate,
    rating: Number(r.OverAllServiceRatingInNumber),
    driverRating: Number(r.DrivertExperinceRatingInNumber),
    vehicleRating: Number(r.VehicleExperinceRatingInNumber),
  };
}

export default async function ReviewsPage() {
  const raw = await fetchCarReviewData();

  //  SAFETY — no more crashes
  const list = Array.isArray(raw?.data) ? raw.data : [];
  const listLength = list.length;
  const reviews = list.map(mapReview);

  return (
    <div className="container py-5">
      <h1 className="mb-4"> All Customer Reviews</h1>
      {/* <h5 className="mb-3">Total Reviews: {listLength}</h5> */}

      <CarReviewList reviews={reviews} />
    </div>
  );
}
