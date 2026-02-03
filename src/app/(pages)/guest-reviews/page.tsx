// app/reviews/page.tsx

import CarReviewList from "@/app/components/review/CarReviewList";

import { fetchCarReviewData } from "@/app/services/reveiwService";
import "./review.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cholan Tours Customer Reviews | Genuine Guest Feedback",
  description:
    "Read real guest reviews and feedback about Cholan Tours car rental services. Honest ratings on drivers, vehicles, and overall travel experience from our customers.",
  keywords:
    "Cholan Tours reviews, customer feedback, guest reviews, car rental reviews, driver rating, vehicle rating",
  alternates: {
    canonical: "https://www.cholantours.com/guest-reviews",
  },
  openGraph: {
    title: "Cholan Tours Customer Reviews",
    description:
      "Honest customer reviews about drivers, vehicles, and overall service quality at Cholan Tours.",
    url: "https://www.cholantours.com/guest-reviews",
    type: "website",
  },
};


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
