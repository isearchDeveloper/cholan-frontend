const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;

const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

  export async function fetchAttractionDetail(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/pages/city/attraction/${slug}`, {
      method: "GET",
     headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 } // ISR
    });
    if (!res.ok) {
      console.error("Attraction API failed:", res.status);
      return null;
    }

    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    console.error("Attraction fetch error:", error);
    return null;
  }
}