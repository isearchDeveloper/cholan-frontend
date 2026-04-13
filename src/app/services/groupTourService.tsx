const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchGroupTourPackages(page: number = 1) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/packages/group-tour?page=${page}`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch group tour packages:", res.statusText);
      return { data: [] };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching group tour packages:", error);
    return { data: [] };
  }
}
