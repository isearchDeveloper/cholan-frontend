import { notFound } from "next/navigation";
import CityBanner from "@/app/components/city/CityBanner";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import CityExpandableBanner from "@/app/components/city/CityExpandableBanner";
import FAQAccordionForCity from "@/app/components/city/FAQAccordionForCity";
import CityEnquiryForm from "@/app/components/common/CityEnquiryForm";
import { fetchAttractionDetail } from "@/app/services/attractionService";
import type { Metadata } from "next";

//  fetch attraction detail by slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; place: string }>;
}): Promise<Metadata> {
  const { slug, place } = await params;

  // 🔥 try API first
  const data = await fetchAttractionDetail(place);

  // ✅ formatted names
  const cityName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const placeName =
    data?.title ||
    place
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // ✅ fallback description
  const description =
    data?.details?.slice(0, 160) ||
    `Explore ${placeName} in ${cityName}. Discover history, highlights, travel tips and visitor information.`;

  const imageUrl = data?.banner_image
    ? `https://cdn.cholantours.com/${data.banner_image}`
    : "/images/banner.webp";

  const url = `https://www.cholantours.com/india/${slug}/${place}`;

  return {
    title: `${placeName} – Tourist Attraction in ${cityName}`,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `${placeName} – Tourist Attraction in ${cityName}`,
      description,
      url,
      siteName: "Cholan Tours",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: placeName,
        },
      ],
      locale: "en_IN",
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: `${placeName} – Tourist Attraction in ${cityName}`,
      description,
      images: [imageUrl],
    },
  };
}


export default async function TouristAttractionDetail({
  params,
}: {
  params: Promise<{ slug: string; place: string }>;
}) {
  const { slug, place } = await params; // FIX

  const placeSlug = place;



  const data = await fetchAttractionDetail(placeSlug);
 

  if (!data) return notFound();

  const placeName = data.title;
  const overview = data.details;

  const bannerData = {
    title: data.title,
    subtitle: "",
    imageUrl: data.banner_image
      ? `https://cdn.cholantours.com/${data.banner_image}`
      : "/images/banner.webp",
  };

  //  breadcrumb
const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "India", href: "/india" },
  {
    label: slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    href: `/india/${slug}`,
  },
  { label: placeName, isCurrent: true },
];
  //  FAQ
  const faqData =
    data?.faqs?.length > 0
      ? data.faqs.map((item: any) => ({
          question: item.question,
          answer: item.answer,
        }))
      : [];

  const faqTitle =
    data?.faq_title && data.faq_title.trim() !== ""
      ? data.faq_title
      : `FAQs About ${placeName}`;

  return (
    <div className="city-intro-page">
      <CityBanner
        title={bannerData.title}
        subtitle={bannerData.subtitle}
        imageUrl={bannerData.imageUrl}
      />

      <div className="container py-5">
        <Breadcrumb items={breadcrumbItems} />

        <div className="row">
          <div className="col-lg-8">
            <CityExpandableBanner
              title={`About ${placeName}`}
              text={overview}
              wordLimit={1500}
            />
          </div>

          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="city-sticky-form">
              <CityEnquiryForm />
            </div>
          </div>
        </div>
      </div>

      {faqData.length > 0 && (
        <div className="py-5">
          <div className="container">
            <FAQAccordionForCity title={faqTitle} faqs={faqData} />
          </div>
        </div>
      )}
    </div>
  );
}