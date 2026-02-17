const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;

const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

  
  export async function fairfestivalData() {
    try {
      const res = await fetch(`${baseUrl}/api/v1/fair-festival/list`, {
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

  
  export async function fairFestivalDetail(slug: string) 
 
    {
    try {
      const res =await fetch(`${baseUrl}/api/v1/fair-festival/details/${slug}`, {
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