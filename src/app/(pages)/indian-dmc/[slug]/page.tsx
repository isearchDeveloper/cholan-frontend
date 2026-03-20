import { Metadata } from "next";
import { notFound } from "next/navigation";

import DmcBanner from "@/app/components/dmc/dmc-banner";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import DmcOverview from "@/app/components/dmc/DmcOverview";
import DmcWhyChoose from "@/app/components/dmc/DmcWhyChoose";
import DmcServices from "@/app/components/dmc/DmcServices";
import DmcAttractions from "@/app/components/dmc/DmcAttractions";
import DmcBestTime from "@/app/components/dmc/DmcBestTime";
import DmcRelatedCities from "@/app/components/dmc/Dmcrelatedcities";
import DmcCta from "@/app/components/dmc/DmcCta";
import DmcFleetSection from "@/app/components/dmc/DmcFleet";

import { fetchDmcCityData } from "@/app/services/dmcServices";
import { getCanonical } from "@/app/lib/getCanonical";
import DmcFleetClient from "@/app/components/dmc/DmcFleet";

// export const revalidate = 180;
type PageProps = {
  params: Promise<{ slug: string }>;
};
// ================= METADATA =================
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const cityData = await fetchDmcCityData(slug);

  if (!cityData) {
    return { title: "City Not Found" };
  }

  const canonical = await getCanonical(`/indian-dmc/${slug}`);

  return {
    title:
      cityData.meta?.meta_title ||
      `${cityData.cityName} DMC - Cholan Tours`,

    description:
      cityData.meta?.meta_description ||
      `Your trusted DMC in ${cityData.cityName}`,

    keywords: cityData.meta?.meta_keywords || "",

    alternates: { canonical },

    openGraph: {
      title:
        cityData.meta?.meta_title || `${cityData.cityName} DMC`,
      url: canonical,
      description:
        cityData.meta?.meta_description ||
        `DMC services in ${cityData.cityName}`,
      images: cityData.banner_image
        ? [{ url: cityData.banner_image }]
        : [],
    },

    twitter: {
      title:
        cityData.meta?.meta_title || `${cityData.cityName} DMC`,
      description: cityData.meta?.meta_description || "",
      images: cityData.banner_image
        ? [cityData.banner_image]
        : [],
    },
  };
}

// ================= PAGE =================
export default async function DmcCityPage({ params }: PageProps) {
  const { slug } = await params;

  const cityData = await fetchDmcCityData(slug);

  if (!cityData) notFound();


  if (!cityData) {
    notFound();
  }

  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Indian DMC", href: "/indian-dmc" },
    { label: `${cityData.cityName} DMC`, isCurrent: true },
  ];

// console.log("FINAL CLEAN DATA:", cityData);
  return (
    <div className="dmc-city-page">
      {/*  Banner */}
      {cityData.banner_image && (
        <DmcBanner
          title={cityData.title}
          subtitle={cityData.subtitle}
          imageUrl={cityData.banner_image}
        />
      )}

      {/*  Breadcrumb */}
      <section className="pt-4">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </section>

      {/*  Overview */}
      {cityData.overview && (
        <DmcOverview
          content={cityData.overview}
          cityName={cityData.cityName}
        />
      )}

      {/*  Why Choose */}
      {cityData.whyChoose?.length > 0 && (
        <DmcWhyChoose
          items={cityData.whyChoose}
          cityName={cityData.cityName}
        />
      )}

      {/*  Services */}
      {cityData.services?.length > 0 && (
        <DmcServices
          services={cityData.services}
          cityName={cityData.cityName}
        />
      )}

      {/*  CTA (always show) */}
      {/* <DmcCta cityName={cityData.cityName} />   */}

      {/*  Attractions */}
      {cityData.attractions?.length > 0 && (
        <DmcAttractions
          attractions={cityData.attractions}
          cityName={cityData.cityName}
        />
      )}

      {/*  Best Time */}
     {cityData.bestTime?.description && (
        <DmcBestTime
          bestTime={cityData.bestTime}
          cityName={cityData.cityName}
        />
      )}

      {cityData.fleets && Object.keys(cityData.fleets).length > 0 && (
        <DmcFleetClient
          fleets={cityData.fleets}
          cityName={cityData.cityName}
        />
      )}


      {/*  Bottom CTA */}
      <DmcCta cityName={cityData.cityName} />

      {/* FIXED: Related Cities */}
      {cityData.relatedCities &&
        cityData.relatedCities.length > 0 && (
          <DmcRelatedCities
            cities={cityData.relatedCities}
          />
        )}

    </div>
  );
}