const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;

const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchThemePackages(
  // locationId: number,
  themeSlug: string
) {
  const res = await fetch(
    `${baseUrl}/api/v1/pages/city/theme/${themeSlug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 },
    }
  );
//  console.log( `${baseUrl}/api/v1/pages/city/theme/${locationId}/${themeSlug}`)
  if (!res.ok) {
    throw new Error("Failed to fetch theme packages");
  }

  const json = await res.json();
  return json?.data?.themes || null;
}
