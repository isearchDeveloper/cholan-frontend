import FairFestival from "@/app/components/fairfestival/FairFestival"

export async function generateMetadata() {
  const canonical = "/fair-festival";

  return {
    title: "Fair & Festival Tours | Cholan Tours",
    description:
      "Explore the most vibrant fairs and festivals across India with our specially curated tour packages.",

    keywords:
      "fair festival tours, india festivals, cultural tours, religious festivals india",

    alternates: {
      canonical,
    },

    openGraph: {
      title: "Fair & Festival Tours | Cholan Tours",
      url: canonical,
      description:
        "Experience India’s colorful fairs and cultural festivals with Cholan Tours.",
    },

    twitter: {
      title: "Fair & Festival Tours | Cholan Tours",
      url: canonical,
      description:
        "Discover India’s top fairs and festivals with curated travel packages.",
    },
  };
}

export default function Page() {

  return (
    <>
      <FairFestival />
    </>
  );
}
