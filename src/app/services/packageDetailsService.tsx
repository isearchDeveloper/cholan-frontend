const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;

const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchPackageDetailsData(slug: any) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/package/${slug}`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    return null;
  }
}

/**
 * Fetch group-tour package details using the dedicated endpoint.
 * Returns { status, data: { package, similar_packages } }
 */
export async function fetchGroupTourDetailsData(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/packages/group-tour/${slug}`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching group tour details:", error);
    return null;
  }
}
