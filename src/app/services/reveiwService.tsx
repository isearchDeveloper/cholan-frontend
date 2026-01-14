const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

  
  export async function fetchPackageReviewData() {

       const res = await fetch(`${baseUrl}/api/v1/reviews/packages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Public-Token": XPublicToken,
          },
       next: { revalidate: 60 }
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return res.json();
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