const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken = "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)"

export async function fetchHeaderData() {
  const res = await fetch(`${baseUrl}/api/v1/page/settings/menu`, {
    method: 'GET',
    headers: {
      'X-Public-Token': XPublicToken,
    },
    //  cache: "no-store",
    next: { revalidate: 60 }
  });


  if (!res.ok) {
    throw new Error('Failed to fetch header data');
  }

  return res.json();
}
