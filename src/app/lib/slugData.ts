import { unstable_cache } from "next/cache";
import { XPublicToken } from "@/app/urls/apiUrls";

export const getAllCitySlugs = unstable_cache(async () => {
  const res = await fetch(
    "https://cholan.isearchsolution.com/crm/api/v1/themes/city/city-list",
    {
      headers: {
        "X-Public-Token": XPublicToken,
      },
    }
  );

  const json = await res.json();

  const cities = json.data.city.map((c: any) =>
    c.slug.replace("-tour-packages", "")
  );

  return cities;
}, ["cities"], { revalidate: 600 });


export const getAllThemeSlugs = unstable_cache(async () => {
  const res = await fetch(
    "https://cholan.isearchsolution.com/crm/api/v1/themes/list",
    {
      headers: {
        "X-Public-Token": XPublicToken,
      },
    }
  );

  const json = await res.json();

  const themes = json.data.themes.map((t: any) =>
    t.slug.replace("-tour-packages", "")
  );

  return themes;
}, ["themes"], { revalidate: 600 });
