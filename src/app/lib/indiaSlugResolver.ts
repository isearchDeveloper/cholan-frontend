import { getAllCitySlugs, getAllThemeSlugs } from "./slugData";

type ResolveResult =
  | { type: "city"; city: string }
  | { type: "city-packages"; city: string }
  | { type: "city-theme"; city: string; theme: string }
  | { type: "theme"; theme: string }
  | { type: "notfound" };

export async function resolveIndiaSlug(slug: string): Promise<ResolveResult> {
  const isPackageUrl = slug.endsWith("-tour-packages");
  const base = slug.replace("-tour-packages", "");

  const cities = await getAllCitySlugs();
  const themes = await getAllThemeSlugs();

  // 🔥 VERY IMPORTANT: longest city first
  cities.sort((a: string, b: string) => b.length - a.length);

  for (const city of cities) {
    if (base.startsWith(city)) {
      const remaining = base.slice(city.length).replace(/^-/, "");

      // /india/kerala
      if (!remaining && !isPackageUrl) {
        return { type: "city", city };
      }

      // /india/kerala-tour-packages
      if (!remaining && isPackageUrl) {
        return { type: "city-packages", city };
      }

      // /india/kerala-honeymoon-tour-packages
      if (themes.includes(remaining)) {
        return { type: "city-theme", city, theme: remaining };
      }
    }
  }

  // /india/honeymoon-tour-packages
  if (themes.includes(base)) {
    return { type: "theme", theme: base };
  }

  return { type: "notfound" };
}
