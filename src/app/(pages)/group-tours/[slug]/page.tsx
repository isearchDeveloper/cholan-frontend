import { notFound } from "next/navigation";
import { fetchPackageDetailsData } from "@/app/services/packageDetailsService";
import GroupTourDetailsPage from "@/app/components/groupTours/GroupTourDetailsPage";
import "aos/dist/aos.css";

export async function generateMetadata({ params }: any) {
  const data = await fetchPackageDetailsData(params.slug);
  if (!data?.data?.package) return { title: "Group Tour | Cholan Tours" };
  const pkg = data.data.package;
  const meta = pkg.meta || {};
  return {
    title: meta.meta_title || pkg.title || "Group Tour | Cholan Tours",
    description: meta.meta_description || "Explore this group tour package with Cholan Tours.",
    keywords: meta.meta_keywords || "",
    openGraph: {
      title: meta.meta_title || pkg.title,
      description: meta.meta_description || "",
    },
  };
}

export default async function GroupTourDetailPage({ params }: any) {
  const data = await fetchPackageDetailsData(params.slug);

  if (!data?.data?.package) {
    notFound();
  }

  // Normalize to { package, similar_packages } format
  return <GroupTourDetailsPage data={data.data} />;
}
