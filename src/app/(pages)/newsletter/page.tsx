import { Metadata } from "next";
import { getCanonical } from "@/app/lib/getCanonical";
import { XPublicToken } from "@/app/urls/apiUrls";

import NewsHero from "@/app/components/news-letter/NewsHero";
import NewsList from "@/app/components/news-letter/NewsList";

async function getMeta(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/cms/page/details?slug=${slug}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Public-Token": XPublicToken,
        },
        next: { revalidate: 60 },
      }
    );

    const data = await res.json();
    return data?.data?.details || null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const slug = "news";
  const metaData = await getMeta(slug);
  const canonical = await getCanonical("/news");

  return {
    title:
      metaData?.meta_title ||
      "Cholan Tours News and Press Releases - Cholan Tours",
    description:
      metaData?.meta_description ||
      "Stay updated with latest Cholan Tours news and travel updates.",
    alternates: { canonical },
    openGraph: {
      title: metaData?.meta_title || "Cholan Tours News",
      description: metaData?.meta_description || "",
      url: canonical,
      images: metaData?.banner_image
        ? [{ url: metaData.banner_image }]
        : [],
    },
    twitter: {
      title: metaData?.meta_title || "Cholan Tours News",
      description: metaData?.meta_description || "",
    },
  };
}

export default function Page() {
  return (
    <>
      <NewsHero slug="newsletter" />
      <div className="container py-5">
        <NewsList type="newsletter" />
      </div>
    </>
  );
}
