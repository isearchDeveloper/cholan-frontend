const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;

const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function fetchAboutPageData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/cms/page/details?slug=about`, {
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

export async function fetchAboutPageTeamData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/cms/page/details?slug=our-team`, {
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



// export async function fetchAboutLifeAtCholanData() {
//   try {
//     const res = await fetch(`${baseUrl}/api/v1/cms/page/details?slug=life-at-cholan-tours`, {
//       method: "GET",
//       headers: {
//         "X-Public-Token": XPublicToken,
//       },
//       next: { revalidate: 60 }
//     });

//     if (!res.ok) {
//       return null;
//     }

//     return await res.json();
//   } catch (error) {
//     return null; // or {} if you prefer
//   }
// }