const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;

const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchBusPageData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/page/settings/bus`, {
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


export async function fetchBusDetailsPageData(slug: any) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/route/buses?route=${slug}`, {
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