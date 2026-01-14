import Breadcrumb from "@/app/components/common/Breadcrumb";
import TrainBanner from "@/app/components/luxury-trains/trainBanner";
import TrainExpandableText from "@/app/components/luxury-trains/trainExpandableText";
import LogoSlider from "@/app/components/home/LogoSlider";
import FAQAccordionForHotel from "@/app/components/hotel/faqForHotel";
import ReviewsWidget from "@/app/components/ReviewsWidget";
import { fetchCityDetails } from "@/app/services/luxuryCityHotelService";
import HotelTabWithCityImages from "@/app/components/hotel/hotelTabWithCityImages";
import Script from "next/script";
import { getCanonical } from "@/app/lib/getCanonical";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* ----------------------------------
   ✅ SEO + CANONICAL (PUBLIC URL)
----------------------------------- */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const api = await fetchCityDetails(slug);
  const cityData = api.data.cityDetails || {};

  const canonical = await getCanonical(`/luxury-hotels-in-${slug}`);

  return {
    title: cityData.meta_title || `${cityData.name} Luxury Hotels`,
    description:
      cityData.meta_description ||
      cityData.description ||
      "Explore luxury hotels with Cholan Tours",
    alternates: {
      canonical,
    },
    openGraph: {
      title: cityData.meta_title || cityData.name,
      description: cityData.meta_description || "",
      url: canonical,
    },
  };
}

/* ----------------------------------
   ✅ PAGE COMPONENT
----------------------------------- */
export default async function CityHotels({ params }: PageProps) {
  const { slug } = await params;

  const api = await fetchCityDetails(slug);
  const cityData = api.data.cityDetails || {};
  const hotelData = api.data.hotel || [];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Luxury Hotels", href: "/luxury-hotels" },
    { label: cityData.name, isCurrent: true },
  ];

  const faqSchema =
    cityData.faqs?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: cityData.faqs.map((faq: any) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="train-wrapper hotel">
      {faqSchema && (
        <Script
          id="city-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <TrainBanner data={cityData.banner_img} />

      <div className="pt-4">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />

          <TrainExpandableText
            title={cityData.name}
            text={cityData.description}
            collapsedLines={2}
          />
        </div>

        <HotelTabWithCityImages
          trainListData={hotelData}
          citySlug={slug}
        />

        {cityData.faqs?.length > 0 && (
          <div className="faqs py-5">
            <div className="container">
              <FAQAccordionForHotel
                faqs={cityData.faqs}
                title={cityData.hotelcity_faq_title}
              />
            </div>
          </div>
        )}

        <div className="pt-5">
          <ReviewsWidget />
        </div>

        <div className="py-5">
          <LogoSlider />
        </div>
      </div>
    </div>
  );
}
