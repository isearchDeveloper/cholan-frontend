// import PackagelistByCountry from '@/app/components/common/packagelistByCountry';
// import { getCanonical } from '@/app/lib/getCanonical';
// import { fetchCountryPageData } from '@/app/services/countryService';
// import React from 'react';



// export async function generateMetadata({ params }: any) {
//   const { slug } = await params;

//   const data = await fetchCountryPageData(slug);
//   const meta = data?.data?.details?.meta || {};

//   const canonical = await getCanonical(slug ? `/${slug}` : "");

//   return {
//     title: meta?.meta_title || "",
//     description: meta?.meta_description || "",
//     alternates: {
//       canonical: canonical,
//     },
//   };
// }



// const Page = async ({ params }: any) => {
//   const { slug } = await params;

//   return <PackagelistByCountry slug={slug} 
//    country={slug}  />;
// };

// export default Page;



import PackagelistByCountry from '@/app/components/common/packagelistByCountry';
import { getCanonical } from '@/app/lib/getCanonical';
import { fetchCountryPageData } from '@/app/services/countryService';
import React from 'react';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;

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

    //  THIS IS THE IMPORTANT PART
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

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } =  params;

  return (
    <PackagelistByCountry
      slug={slug}
      country={slug}
    />
  );
};

export default Page;
