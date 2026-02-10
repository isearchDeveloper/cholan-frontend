const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;

const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchIndiaPackageData(slug: any) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/packages/city/${slug}?package_country=india`, {
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




interface FetchPackagesParams {
  slug1: any;
  currentPage?: number;
  categorySlug?: string;
}

export async function fetchIndiaPackageListingData({
  slug1,
  currentPage = 1,
  categorySlug,
}: FetchPackagesParams) {
  try {
    let url = `${baseUrl}/api/v1/packages/city/${slug1}?page=${currentPage}&package_country=india`;
    if (categorySlug) {
      url += `&category_slug=${categorySlug}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Error fetching India packages:", error);
    return null;
  }
}
