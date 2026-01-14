const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchCustomizedHolidayData() {
  const res = await fetch(`${baseUrl}/api/v1/page/settings/customized-holidays`, {
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

export async function fetchIndiaSlugData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_UAT_URL}/api/v1/page/settings/india?limit=6`, {
    method: "GET",
    headers: {
      "X-Public-Token": XPublicToken,
    },
    next: { revalidate: 60 }
  });

  const json = await res.json();
  return json?.data?.locations || [];
}