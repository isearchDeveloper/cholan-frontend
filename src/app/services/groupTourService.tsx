const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchGroupTourPackages(page: number = 1) {
  const res = await fetch(`${baseUrl}/api/v1/packages/group-tour?page=${page}`, {
    method: "GET",
    headers: {
      "X-Public-Token": XPublicToken,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch group tour packages");
  }

  return res.json();
}
