import { notFound } from "next/navigation";
import { fetchGroupTourDetailsData } from "@/app/services/packageDetailsService";
import GroupTourDetailsPage from "@/app/components/groupTours/GroupTourDetailsPage";
import "aos/dist/aos.css";

export async function generateMetadata({ params }: any) {
  const data = await fetchGroupTourDetailsData(params.slug);
  if (!data?.data?.package) return { title: "Group Tour | Cholan Tours" };
  const pkg = data.data.package;
  return {
    title: pkg.title || "Group Tour | Cholan Tours",
    description: pkg.short_description?.replace(/<[^>]*>/g, "") || "Explore this group tour package with Cholan Tours.",
    keywords: "",
    openGraph: {
      title: pkg.title,
      description: pkg.short_description?.replace(/<[^>]*>/g, "") || "",
    },
  };
}

export default async function GroupTourDetailPage({ params }: any) {
  const data = await fetchGroupTourDetailsData(params.slug);

  if (!data?.data?.package) {
    notFound();
  }

  return <GroupTourDetailsPage data={data.data} />;
}
