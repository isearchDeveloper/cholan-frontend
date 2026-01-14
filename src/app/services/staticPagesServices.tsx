const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;

const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export async function accreditationData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/cms/page/details?slug=accreditation`, {
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


export async function csrData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/cms/page/details?slug=csr`, {
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


export async function newsData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/cms/page/details?slug=news`, {
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


export async function partnerData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/cms/page/details?slug=our-partners`, {
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



export async function profileData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/cms/page/details?slug=our-profile`, {
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



export async function awardsandachievementsData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/cms/page/details?slug=awards-and-achievements`, {
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