const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchCityList(type: 1 | 2) {
  try {
    const res = await fetch(
      `${baseUrl}/api/v1/pages/city/list?type=${type}`,
      {
        headers: { "X-Public-Token": XPublicToken },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}


export async function fetchCityIntroData(cityName: string) {
  const res = await fetch(
    `${baseUrl}/api/v1/pages/city/${encodeURIComponent(cityName)}`,
    {
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;
  return res.json();
}