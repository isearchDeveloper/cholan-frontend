import { getCanonical } from "@/app/lib/getCanonical";
import { fetchSouthIndiaOffer, fetchNorthIndiaOffer, fetchSummerPageData } from "@/app/services/groupTourService";
import SummerPackagesPage from "@/app/components/summerPackages/SummerPackagesPage";

export async function generateMetadata() {
  const [canonical, summerPage] = await Promise.all([
    getCanonical("/summer-tour-packages"),
    fetchSummerPageData(),
  ]);

  const title = summerPage?.meta?.meta_title || "Summer Tour Packages | North & South India | Cholan Tours";
  const description = summerPage?.meta?.meta_description || "Explore the best summer tour packages across North and South India. Curated itineraries blending nature, heritage, wellness, and comfort.";
  const keywords = summerPage?.meta?.meta_keywords || "summer tour packages, north india tours, south india tours, cholan tours, summer holiday packages";

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

export default async function SummerTourPackagesPage() {
  const [southOffer, northOffer, summerPage] = await Promise.all([
    fetchSouthIndiaOffer(),
    fetchNorthIndiaOffer(),
    fetchSummerPageData(),
  ]);

  return <SummerPackagesPage southOffer={southOffer} northOffer={northOffer} summerPage={summerPage} />;
}
