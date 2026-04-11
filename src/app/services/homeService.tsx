const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchHomeData() {
  const res = await fetch(`${baseUrl}/api/v1/page/settings/home`, {
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

export async function fetchHomeExclusiveData() {
  const res = await fetch(`${baseUrl}/api/v1/packages/exclusive`, {
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

export async function fetchHomeCountryPackageData() {
  const res = await fetch(`${baseUrl}/api/v1/packages/top-trending-country`, {
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

export async function trendingInternationalHomePackageData() {
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
    throw new Error("Failed to fetch home data");
  }

  return res.json();
}

export async function discoverIndiaPackageHomeData() {
  const res = await fetch(`${baseUrl}/api/v1/packages/discover-india`, {
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
  const res = await fetch(`${baseUrl}/api/v1/page/settings/home/tabs`, {
    method: "GET",
    headers: {
      "X-Public-Token": XPublicToken,
    },
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch home tabs data");
  }

  return res.json();
}
