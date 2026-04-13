const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken = "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)"

export async function fetchHeaderData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/page/settings/menu`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error("Failed to fetch header data:", res.statusText);
      return { data: [] }; // Return empty data shape
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching header data:", error);
    return { data: [] };
  }
}
