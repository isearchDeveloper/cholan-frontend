const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchHomeData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/page/settings/home`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error("Failed to fetch home data:", res.statusText);
      return { data: null };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching home data:", error);
    return { data: null };
  }
}

export async function fetchHomeExclusiveData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/packages/exclusive`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error("Failed to fetch exclusive data:", res.statusText);
      return { data: [] };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching exclusive data:", error);
    return { data: [] };
  }
}

export async function fetchHomeCountryPackageData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/packages/top-trending-country`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error("Failed to fetch country package data:", res.statusText);
      return { data: [] };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching country package data:", error);
    return { data: [] };
  }
}

export async function trendingInternationalHomePackageData() {
  try {
    const res = await fetch(
      `${baseUrl}/api/v1/packages/top-trending-international`,
      {
        method: "GET",
        headers: {
          "X-Public-Token": XPublicToken,
        },
        next: { revalidate: 60 }
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch international data:", res.statusText);
      return { data: [] };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching international data:", error);
    return { data: [] };
  }
}

export async function discoverIndiaPackageHomeData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/packages/discover-india`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error("Failed to fetch discover india data:", res.statusText);
      return { data: [] };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching discover india data:", error);
    return { data: [] };
  }
}

export async function PackageDetailsData(slug: any) {
  const res = await fetch(`${baseUrl}/api/v1/package/${slug}`, {
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

export async function fetchHomeTabsData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/page/settings/home/tabs`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error("Failed to fetch home tabs data:", res.statusText);
      return { homepage_tabs: [] };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching home tabs data:", error);
    return { homepage_tabs: [] };
  }
}
