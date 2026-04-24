import FairFestival from "@/app/components/fairfestival/FairFestival";
import { fairfestivalData } from "@/app/services/fairfestivalService";
import { getCanonical } from "@/app/lib/getCanonical";

/* ---------- ONE SHARED FETCH ---------- */
async function getData() {
  return await fairfestivalData(1,16);
}

/* ---------- METADATA ---------- */
export async function generateMetadata() {
  const data = await getData();

  const meta = data?.meta;
  const page = data?.page;

  const canonical = await getCanonical("/india/fairs-festivals");

  const description =
    meta?.meta_description ||
    page?.overview?.replace(/<[^>]*>/g, "").slice(0, 160);

  const title = meta?.meta_title || "Fair & Festival Tours | Cholan Tours";

  return {
    title,

    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      url: canonical,
      description,
    },

    twitter: {
      title,
      description,
    },
  };
}


/* ---------- PAGE ---------- */
export default async function Page() {

  const data = await getData();
  return <FairFestival data={data} />;
}
