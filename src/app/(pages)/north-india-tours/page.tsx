import { getCanonical } from "@/app/lib/getCanonical";
import { fetchNorthIndiaOffer } from "@/app/services/groupTourService";
import NorthIndiaLandingPage from "@/app/components/northIndia/NorthIndiaLandingPage";

export async function generateMetadata() {
  const canonical = await getCanonical("/north-india-tours");
  const offer = await fetchNorthIndiaOffer();
  const page = offer?.page;

  const regionName = page?.title || "North India";
  const title = page?.h1_heading || `${regionName} Tour Packages | Summer Offer | Cholan Tours`;
  const description = "Explore the best North India tour packages covering Delhi, Agra, Jaipur, Shimla, Manali & more.";
  const keywords = "north india tour packages, golden triangle tour, shimla manali tour";

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

export default async function NorthIndiaTourPage() {
  const offer = await fetchNorthIndiaOffer();
  return <NorthIndiaLandingPage offer={offer} />;
}
