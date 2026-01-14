import LuxuryTrainDetails from "@/app/components/luxury-trains/train-tour-detailsPage";
import TrainOverview from "@/app/components/luxury-trains/trsinOverViewPage";
import { getCanonical } from "@/app/lib/getCanonical";
import { trainOverview } from "@/app/services/luxuryTrainService";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: any) {
  const data = await trainOverview(params.slug);

  const meta = data?.data?.train?.meta || data?.data?.tour?.meta;
  const canonical = await getCanonical(params?.slug ? `/${params.slug}` : "");
  const currentUrl = canonical;

  // Extract the meta_details from API
  const metaDetails = meta?.meta_details || "";

  return {
    title: meta?.meta_title || "cholan tours",
    description: meta?.meta_description || "cholan tours",
    keywords: meta?.meta_keywords || "",
    alternates: { canonical },

    openGraph: {
      title: meta?.meta_title || "cholan tours",
      url: currentUrl,
      description: meta?.meta_description || "cholan tours",
    },

    twitter: {
      title: meta?.meta_title || "cholan tours",
      url: currentUrl,
      description: meta?.meta_description || "cholan tours",
    },

    // Dynamically inject the meta_details content into head
    // other: {
    //   // This will render the raw HTML from meta_details in the head section
    //   "meta-details": metaDetails,
    // },
  };
}

interface TrainPageProps {
  params: {
    slug: string;
  };
}

export default async function Page(props: any) {
  const params = await props.params;
  const slug = params.slug;

  // const trainOverviewData = await trainOverview(slug);

  let data;

  try {
    data = await trainOverview(slug);
  } catch (e) {
    notFound();
  }

  const train = data?.data?.train;
  const tour = data?.data?.tour;

  if (!train && !tour) {
    notFound();
  }
  if (train) {
    return <TrainOverview trainOverviewData={data} />;
  } else if (tour) {
    return <LuxuryTrainDetails trainTourData={data.data} />;
  }
}
