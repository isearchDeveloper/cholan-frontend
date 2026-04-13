const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";


export async function fetchPackageReviewData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/reviews/packages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      console.error("Failed to fetch package review data:", res.statusText);
      return { data: [] };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching package review data:", error);
    return { data: [] };
  }
}



export async function fetchCarReviewData() {
  const res = await fetch(
    `${baseUrl}/api/v1/realtime/reviews/cars`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch car review data");
  }

  return res.json();
}