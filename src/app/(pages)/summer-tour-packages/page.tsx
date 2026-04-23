import { getCanonical } from "@/app/lib/getCanonical";
import { fetchSouthIndiaOffer, fetchNorthIndiaOffer } from "@/app/services/groupTourService";
import SummerPackagesPage from "@/app/components/summerPackages/SummerPackagesPage";

export async function generateMetadata() {
  const canonical = await getCanonical("/summer-tour-packages");
  const title = "Summer Tour Packages | North & South India | Cholan Tours";
  const description = "Explore the best summer tour packages across North and South India. Curated itineraries blending nature, heritage, wellness, and comfort.";

  return {
    title,
    description,
    keywords: "summer tour packages, north india tours, south india tours, cholan tours, summer holiday packages",
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

export default async function SummerTourPackagesPage() {
  const [southOffer, northOffer] = await Promise.all([
    fetchSouthIndiaOffer(),
    fetchNorthIndiaOffer(),
  ]);

  return <SummerPackagesPage southOffer={southOffer} northOffer={northOffer} />;
}
