import FairFestival from "@/app/components/fairfestival/FairFestival";
import { fairfestivalData } from "@/app/services/fairfestivalService";

/* ---------- ONE SHARED FETCH ---------- */
async function getData() {
  return await fairfestivalData();
}

/* ---------- METADATA ---------- */
export async function generateMetadata() {
  const data = await getData();

  const meta = data?.meta;
  const page = data?.page;

  const canonical = "/india/fair-festival";

  const description =
    meta?.meta_description ||
    page?.overview?.replace(/<[^>]*>/g, "").slice(0, 160);

  return {
    title:
      meta?.meta_title ||
      "Fair & Festival Tours | Cholan Tours",

    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: meta?.meta_title,
      url: canonical,
      description,
    },

    twitter: {
      title: meta?.meta_title,
      description,
    },
  };
}


/* ---------- PAGE ---------- */
export default async function Page() {

  const data = await getData();

  return <FairFestival data={data} />;
}
