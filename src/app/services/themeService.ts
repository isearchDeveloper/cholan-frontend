const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;

const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchThemePackages(fullSlug: string) {
  const res = await fetch(
    `${baseUrl}/api/v1/pages/city/theme/${fullSlug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return null;   // very important
  }

  const json = await res.json();
  return json?.data?.themes || null;
}


export async function fetchThemeList() {
  const res = await fetch(
    `${baseUrl}/api/v1/themes/list`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 },
    }
  );
 
  if (!res.ok) {
    return null;   // very important
  }

  const json = await res.json();
  return json?.data?.themes || null;
}

export async function fetchThemeDetails(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/themes/${slug}`,
    { cache: "no-store" }
  );

  return res.json();
}


export async function fetchCityThemePackages(citySlug: string, themeSlug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/pages/city/theme/location/${citySlug}-tour-packages/${themeSlug}-tour-packages`,
    {
      headers: { "X-Public-Token": XPublicToken },
      cache: "no-store",
    }
  );

  const json = await res.json();

  return {
    city: json?.data?.data,
    packages: json?.data?.packages,
  };
}
