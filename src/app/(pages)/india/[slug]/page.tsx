import { notFound } from "next/navigation";
import { cache } from "react";
import { resolveIndiaSlug } from "@/app/lib/resolveIndiaSlug";

import CityIntroPage from "@/app/components/city/CityIntroPage";
import ThemeCitySection from "@/app/components/country/indiaThemeCitySection";
import ThemePackageListing from "@/app/components/theme/ThemePackageListing";
import IndiaPackageListing from "@/app/components/indiaPackageListing/indiaPackageListing";
import { fetchCityIntroData } from "@/app/services/cityService";
import { getCanonical } from "@/app/lib/getCanonical";
import { cachedResolveIndiaSlug } from "@/app/lib/cachedIndiaResolver";



export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

const resolved = await cachedResolveIndiaSlug(slug);

  if (resolved.type === "NOT_FOUND") return {};

  const canonical =await getCanonical(`/india/${slug}`);


  switch (resolved.type) {
    case "CITY": {
      const city = resolved.data.data.city;

      return {
        title: city?.meta_title ?? city?.title ?? "Cholan Tours",
        description:
          city?.meta_description ??
          `Explore ${city?.title} tour packages with Cholan Tours.`,
        alternates: { canonical },
      };
    }

    case "THEME":
      return {
        title: resolved.data?.meta_title ?? "Cholan Tours",
        description: resolved.data?.meta_description ?? "",
        alternates: { canonical },
      };

    case "LISTING": {
      const meta = resolved.data.data.location?.meta;

      return {
        title: meta?.meta_title ?? "Cholan Tours",
        description:
          meta?.meta_description ??
          "Explore best tour packages across India with Cholan Tours.",
        alternates: { canonical },
      };
    }

    case "CITY_THEME": {
      const { city } = resolved.data;

      return {
        title:
          city?.pivot?.meta_title ??
          city?.pivot?.title ??
          `${resolved.citySlug} ${resolved.themeSlug} Tour Packages`,

        description:
          city?.pivot?.meta_description ??
          city?.pivot?.overview ??
          `Best ${resolved.themeSlug} packages in ${resolved.citySlug}`,

        alternates: { canonical },
      };
    }
  }
}
export default async function TourListingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;

  const currentPage = Number(page ?? 1);


const resolved = await cachedResolveIndiaSlug(slug);


  if (resolved.type === "NOT_FOUND") {
    notFound();
  }

  switch (resolved.type) {
    case "CITY_THEME": {
      const r = resolved; //  lock the narrowed union type here

      const { citySlug, data } = resolved;
      const { city, packages } = data;

      //  bring back sidebar data
      const cityIntro = await fetchCityIntroData(citySlug);
      const sidebarThemes = cityIntro?.data?.themes || [];

      return (
        <ThemePackageListing
          data={{
            location: {
              details: {
                title: city.pivot.title,
                sub_title: city.pivot.title,
                banner_image: `https://cdn.cholantours.com/${city.pivot.banner_image}`,
                about: city.pivot.overview,
              },
            },
            packages,
          }}
          cityName={city.name}
          citySlug={citySlug}
          sidebarThemes={sidebarThemes}
        />
      );
    }

    case "CITY":
      return (
        <CityIntroPage
          slug={slug}
          country="india"
          cityData={resolved.data.data}
        />
      );

    case "THEME":
      return <ThemeCitySection theme={slug} />;

    case "LISTING":
      return (
        <IndiaPackageListing
          packageList1={resolved.data.data}
          initialPage={currentPage}
          slug1={slug}
        />
      );
  }
}
