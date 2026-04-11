import { Metadata } from "next";
import GroupTourListing from "@/app/components/groupTours/GroupTourListing";

export const metadata: Metadata = {
  title: "Group Tour Packages | Cholan Tours",
  description:
    "Explore our curated group tour packages across India and beyond. Travel together with Cholan Tours — trusted by thousands of travelers.",
};

export default function GroupToursPage() {
  return <GroupTourListing />;
}
