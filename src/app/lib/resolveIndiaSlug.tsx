import { fetchCityIntroData } from "@/app/services/cityService";
import {
  fetchThemePackages,
  fetchCityThemePackages,
  fetchThemeList,
} from "@/app/services/themeService";
import { fetchIndiaPackageData } from "@/app/services/indiaPackageListService";

type ResolvedSlug =
  | { type: "CITY"; data: any }
  | { type: "THEME"; data: any }
  | { type: "LISTING"; data: any }
  | {
      type: "CITY_THEME";
      citySlug: string;
      themeSlug: string;
      data: any;
    }
  | { type: "NOT_FOUND" };

export async function resolveIndiaSlug(slug: string): Promise<ResolvedSlug> {
  const clean = slug.replace("-tour-packages", "");

  // 1️⃣ CITY + THEME (most specific)
  const themeList = await fetchThemeList();
  const themeSlugs = themeList.map((t: any) =>
    t.slug.replace("-tour-packages", "").trim(),
  );

  for (const theme of themeSlugs) {
    if (clean.endsWith(theme)) {
      const citySlug = clean.slice(0, clean.length - theme.length - 1);
      if (!citySlug) break;

      const res = await fetchCityThemePackages(citySlug, theme);

      if (res?.city) {
        return {
          type: "CITY_THEME",
          citySlug,
          themeSlug: theme,
          data: res,
        };
      }
    }
  }

  // 2️⃣ PURE THEME LANDING (strict check)
 const themeLanding = await fetchThemePackages(slug);

if (themeLanding && themeLanding.slug === slug) {
  return { type: "THEME", data: themeLanding };
}


  // 3️⃣ LISTING / REGION / STATE
  if (slug.endsWith("-tour-packages")) {
    const listing = await fetchIndiaPackageData(slug);

    if (listing?.data?.packages?.length > 0) {
      return { type: "LISTING", data: listing };
    }
  }

  // 4️⃣ CITY INTRO
  if (!slug.endsWith("-tour-packages")) {
    const city = await fetchCityIntroData(slug);
    if (city?.data?.city) {
      return { type: "CITY", data: city };
    }
  }

  return { type: "NOT_FOUND" };
}
