import Reviews from "@/app/components/reviews/Reviews";
import { XPublicToken } from "@/app/urls/apiUrls";

interface Review {
  customer_name: string;
  rating: number;
  comment: string;
}

// Fetch reviews dynamically based on type and slug
async function fetchReviews(type: string, slug: string): Promise<Review[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/reviews/${type}/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error("Failed to fetch reviews:", res.status);
      return [];
    }

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

interface ReviewPageProps {
  params: {
    type: string;
    slug: string;
  };
}

// ✅ Dynamic Page
export default async function GetReviewPage({ params }: any) {
  const { type, slug } = params;
  const reviews = await fetchReviews(type, slug);

  if (!reviews.length) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-medium text-gray-600">
          No {type} reviews available for this item.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <Reviews reviews={reviews} />
    </div>
  );
}
