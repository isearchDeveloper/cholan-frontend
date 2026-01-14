const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchTrainData() {
  const res = await fetch(`${baseUrl}/api/v1/page/settings/luxury-train`, {
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

export async function trainList() {
  const res = await fetch(`${baseUrl}/api/v1/luxury-trains`, {
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


// export async function trainOverview(slug:any) {
//   const res = await fetch(`${baseUrl}/api/v1/luxury-trains/${slug}`, {
//     method: "GET",
//     headers: {
//       "X-Public-Token": XPublicToken,
//     },
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export async function trainOverview(slug: any) {
  const headers = {
    "X-Public-Token": XPublicToken,
  };

  let res = await fetch(`${baseUrl}/api/v1/luxury-trains/${slug}`, {
    method: "GET",
    headers,
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    res = await fetch(`${baseUrl}/api/v1/luxury-train/tour/${slug}`, {
      method: "GET",
      headers,
      next: { revalidate: 60 }
    });
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch train data for slug: ${slug}`);
  }


  return res.json();
}
