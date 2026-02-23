const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
 
const XPublicToken ="zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";
 
export async function fetchCountryPageData(slug: any) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/page/settings/${slug}`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 }
    });
 
    if (!res.ok) {
      return null;
    }
 
    return await res.json();
  } catch (error) {
    return null; // or {} if you prefer
  }
}
 
// export async function fetchSpecialData() {
//   const res = await fetch(`${baseUrl}/api/v1/packages/special`, {
//     method: "GET",
//     headers: {
//       "X-Public-Token": XPublicToken,
//     },
//     next: { revalidate: 60 }
//   });
 
//   if (!res.ok) {
//     throw new Error("Failed to fetch home data");
//   }
 
//   return res.json();
// }

export async function fetchSpecialData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/packages/special`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Special API failed:", res.status);
      return { data: [] }; //  ALWAYS safe shape
    }

    const json = await res.json().catch(() => null);

    return json ?? { data: [] }; //  never null
  } catch (error) {
    console.error("Special API error:", error);
    return { data: [] }; //  never null
  }
}