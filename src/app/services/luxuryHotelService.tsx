const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";



  export async function fetchHotelPageData() {
    const res = await fetch(`${baseUrl}/api/v1/page/settings/luxury-hotel`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
       next: { revalidate: 60 }
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
  }



export async function fetchHotelListData() {
  const res = await fetch(`${baseUrl}/api/v1/luxury-hotels`, {
    method: "GET",
    headers: {
      "X-Public-Token": XPublicToken,
    },
     next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


export async function fetchHotelDetailsData(slug: any) {
  const res = await fetch(`${baseUrl}/api/v1/luxury-hotels/${slug}`, {
    method: "GET",
    headers: {
      "X-Public-Token": XPublicToken,
    },
     next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}