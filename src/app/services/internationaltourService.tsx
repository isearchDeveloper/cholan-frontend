const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;

const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchInternationalPageData() {
  const res = await fetch(`${baseUrl}/api/v1/page/settings/international`, {
    method: "GET",
    headers: {
      "X-Public-Token": XPublicToken,
    },
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch home data");
  }

  return res.json();
}


export async function fetchInternationalPackageData(slug: any) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/packages/${slug}?package_country=international`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    return null; // or {} if you prefer
  }
}



interface FetchPackagesWorldParams {
  slug1: any;
  currentPage?: number;
  categorySlug?: string;
  scope?: any
}

export async function fetchWorldPackageListingData({
  slug1,
  currentPage = 1,
  categorySlug,
  scopeFromData,
}: {
  slug1: string;
  currentPage?: number;
  categorySlug?: string | null;
  scopeFromData: "country" | "location";
}) {

  const scopeQuery =
    scopeFromData === "country"
      ? `country=${slug1}`
      : `location=${slug1}`;

  let url = "";

  if (categorySlug) {
    url =  `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/${slug1}?page=${currentPage}&category_slug=${categorySlug}&package_country=international`;
  } else {
    url = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/${slug1}?page=${currentPage}&package_country=international`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: { "X-Public-Token": XPublicToken },
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;
  return await res.json();
}



export async function fetchNoJsCountries() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/countries/international`,
      {
         headers: {
        "X-Public-Token": XPublicToken,
      },
        next: { revalidate: 60 }, // optional
      }
    );

    const json = await res.json();
    return json?.data?.countries || [];
  } catch {
    return [];
  }
}
export async function fetchNoJsTourPackages() {
  try {
    const url = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/category/honeymoon?type=2&limit=50`;

    const res = await fetch(url, {
       headers: {
        "X-Public-Token": XPublicToken,
      },
    });

    const json = await res.json();
    return json?.data?.packages || [];
  } catch {
    return [];
  }
}

export async function specialInternationalPackageData() {
  const res = await fetch(
    `${baseUrl}/api/v1/packages/top-special-international`,
    {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 }
    }
  );
 
  if (!res.ok) {
    throw new Error("Failed to fetch home data");
  }
 
  return res.json();
}
 
// ✅ FOR PACKAGE LISTING (slider, pagination, etc.)
export async function fetchInternationalPackageListingByCity({
  citySlug,
  page = 1,
}: {
  citySlug: string;
  page?: number;
}) {
  const listingSlug = `${citySlug}-tour-packages`;

  const url = `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/packages/${listingSlug}?page=${page}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-Public-Token": XPublicToken,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  return await res.json();
}
