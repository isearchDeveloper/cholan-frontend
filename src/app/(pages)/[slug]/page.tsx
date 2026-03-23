
import PackagelistByCountry from '@/app/components/common/packagelistByCountry';
import { getCanonical } from '@/app/lib/getCanonical';
import { fetchCountryPageData } from '@/app/services/countryService';
import React from 'react';

//  metadata
export async function generateMetadata({ params }: any) {
  const { slug } = await params; //  REQUIRED in Next 15

  const data = await fetchCountryPageData(slug);
  const meta = data?.data?.details?.meta || {};

  const title = meta?.meta_title || "";
  const description = meta?.meta_description || "";
  const canonical = await getCanonical(slug ? `/${slug}` : "");

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    },
  };
}

//  page
const Page = async ({ params }: any) => {
  const { slug } = await params; //  REQUIRED in Next 15

  return (
    <PackagelistByCountry
      slug={slug}
      country={slug}
    />
  );
};

export default Page;