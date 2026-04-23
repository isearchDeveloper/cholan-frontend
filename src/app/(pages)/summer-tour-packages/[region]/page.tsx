import { notFound } from "next/navigation";
import { getCanonical } from "@/app/lib/getCanonical";
import { fetchSouthIndiaOffer, fetchNorthIndiaOffer } from "@/app/services/groupTourService";
import SouthIndiaLandingPage from "@/app/components/southIndia/SouthIndiaLandingPage";
import NorthIndiaLandingPage from "@/app/components/northIndia/NorthIndiaLandingPage";
import { OfferData } from "@/app/components/offerLanding/OfferLandingPage";

/* ── Region config — add new regions here when making dynamic in future ── */
const REGION_CONFIG: Record<string, {
  fetch: () => Promise<OfferData | null>;
  Component: React.ComponentType<{ offer?: OfferData | null }>;
  name: string;
  description: string;
  keywords: string;
}> = {
  "south-india": {
    fetch: fetchSouthIndiaOffer,
    Component: SouthIndiaLandingPage,
    name: "South India",
    description: "Explore the best South India tour packages covering Kerala, Tamil Nadu, Karnataka & Andhra Pradesh.",
    keywords: "south india tour packages, kerala tour, tamil nadu tour, summer packages",
  },
  "north-east-india": {
    fetch: fetchNorthIndiaOffer,
    Component: NorthIndiaLandingPage,
    name: "North East India",
    description: "Explore the best North East India tour packages covering Assam, Meghalaya, Sikkim, Darjeeling & more.",
    keywords: "north east india tour packages, assam tour, meghalaya tour, summer packages",
  },
};

export async function generateStaticParams() {
  return Object.keys(REGION_CONFIG).map((region) => ({ region }));
}

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const config = REGION_CONFIG[region];
  if (!config) return {};

  const canonical = await getCanonical(`/summer-tour-packages/${region}`);
  const offer = await config.fetch();
  const page = offer?.page;

  const title = page?.h1_heading || `${config.name} Tour Packages | Summer Offer | Cholan Tours`;

  return {
    title,
    description: config.description,
    keywords: config.keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description: config.description,
      url: canonical,
      type: "website",
      siteName: "CholanTours",
      images: [{ url: "https://www.cholantours.com/public/uploads/logo.png", width: 600, height: 600 }],
    },
    twitter: { title, description: config.description, card: "summary_large_image" },
  };
}

export default async function SummerRegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const config = REGION_CONFIG[region];
  if (!config) notFound();

  const offer = await config.fetch();
  const { Component } = config;

  return <Component offer={offer} />;
}
