import { getCanonical } from "@/app/lib/getCanonical";
import { fetchSouthIndiaOffer } from "@/app/services/groupTourService";
import SouthIndiaLandingPage from "@/app/components/southIndia/SouthIndiaLandingPage";

export async function generateMetadata() {
  const canonical = await getCanonical("/south-india-tours");
  const offer = await fetchSouthIndiaOffer();
  const page = offer?.page;

  const regionName = page?.title || "South India";
  const title = page?.h1_heading || `${regionName} Tour Packages | Summer Offer | Cholan Tours`;
  const description = "Explore the best South India tour packages covering Kerala, Tamil Nadu, Karnataka & Andhra Pradesh.";
  const keywords = "south india tour packages, kerala tour, tamil nadu tour";

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "CholanTours",
      images: [{ url: "https://www.cholantours.com/public/uploads/logo.png", width: 600, height: 600 }],
    },
    twitter: { title, description, card: "summary_large_image" },
  };
}

export default async function SouthIndiaTourPage() {
  const offer = await fetchSouthIndiaOffer();
  return <SouthIndiaLandingPage offer={offer} />;
}
