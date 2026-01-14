import Reviews from "@/app/components/reviews/Reviews";
import {  XPublicToken } from "@/app/urls/apiUrls";

interface Review {
  customer_name: string;
  rating: number;
  comment: string;
}

async function getReviews(): Promise<Review[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/reviews/packages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Public-Token": XPublicToken,
    },
    next: { revalidate: 60 } 
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data?.data || [];
}



export default async function ReviewsPage() {
  const reviews = await getReviews();

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-medium text-gray-600">No reviews available.</p>
      </div>
    );
  }
  return (
    <div>
    
      <Reviews reviews={reviews} />
    </div>
  );
}
