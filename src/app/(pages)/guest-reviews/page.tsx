// app/reviews/page.tsx
 
import type { Metadata } from "next";
import CarReviewList from "@/app/components/review/CarReviewList";
import { fetchCarReviewData } from "@/app/services/reveiwService";
import "./review.css";
import Breadcrumb from "@/app/components/common/Breadcrumb";

 
export const dynamic = "force-dynamic"; //  stop build-time prerender
 
export const metadata: Metadata = {
  title: "Cholan Tours Customer Reviews | Genuine Guest Feedback",
  description:
    "Read real guest reviews and feedback about Cholan Tours car rental services.",
  alternates: {
    canonical: "https://www.cholantours.com/guest-reviews",
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
  let raw: any = null;
 
  try {
    raw = await fetchCarReviewData();  //  safe now
  } catch {
    raw = { data: [] };               //  prevent crash
  }
 
  const list = Array.isArray(raw?.data) ? raw.data : [];
  const reviews = list.map(mapReview);

  const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Guest Reviews", isCurrent: true },
];

 
  return (
    <div className="container py-5">
  <Breadcrumb items={breadcrumbItems} />
  <h1 className="mb-4 mt-3">All Customer Reviews</h1>

      <CarReviewList reviews={reviews} />
    </div>
  );
}