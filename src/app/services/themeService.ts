const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;

const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

// export async function fetchThemePackages(fullSlug: string) {
//   const res = await fetch(
//     `${baseUrl}/api/v1/pages/city/theme/${fullSlug}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Public-Token": XPublicToken,
//       },
//       next: { revalidate: 60 },
//     }
//   );

//   if (!res.ok) {
//     return null;   // very important
//   }

//   const json = await res.json();
//   return json?.data?.themes || null;
// }


// export async function fetchThemeList() {
//   const res = await fetch(
//     `${baseUrl}/api/v1/themes/list`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Public-Token": XPublicToken,
//       },
//       next: { revalidate: 60 },
//     }
//   );
 
//   if (!res.ok) {
//     return null;   // very important
//   }

//   const json = await res.json();
//   return json?.data?.themes || null;
// }

export async function fetchThemePackages(fullSlug: string) {
  try {
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
      console.error("Theme packages API failed:", res.status);
      return [];
    }

    const json = await res.json().catch(() => null);

    return json?.data?.themes ?? [];
  } catch (err) {
    console.error("Theme packages fetch error:", err);
    return [];
  }
}

export async function fetchThemeList() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/themes/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Theme list API failed:", res.status);
      return []; //  ALWAYS return array
    }

    const json = await res.json().catch(() => null);

    return json?.data?.themes ?? []; //  NEVER null
  } catch (err) {
    console.error("Theme list fetch error:", err);
    return []; //  NEVER throw
  }
}

// export async function fetchThemeDetails(slug: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/themes/${slug}`,
//     { cache: "no-store" }
//   );

//   return res.json();
// }

export async function fetchThemeDetails(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/themes/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    return await res.json().catch(() => null);
  } catch (err) {
    console.error("Theme details error:", err);
    return null;
  }
}


// export async function fetchCityThemePackages(citySlug: string, themeSlug: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/pages/city/theme/location/${citySlug}-tour-packages/${themeSlug}-tour-packages`,
//     {
//       headers: { "X-Public-Token": XPublicToken },
//       cache: "no-store",
//     }
//   );

//   const json = await res.json();

//   return {
//     city: json?.data?.data,
//     packages: json?.data?.packages,
//   };
// }


export async function fetchCityThemePackages(
  citySlug: string,
  themeSlug: string
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/pages/city/theme/location/${citySlug}-tour-packages/${themeSlug}-tour-packages`,
      {
        headers: { "X-Public-Token": XPublicToken },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return { city: null, packages: [] };
    }

    const json = await res.json().catch(() => null);

    return {
      city: json?.data?.data ?? null,
      packages: json?.data?.packages ?? [],
    };
  } catch (err) {
    console.error("City theme packages error:", err);
    return { city: null, packages: [] };
  }
}
