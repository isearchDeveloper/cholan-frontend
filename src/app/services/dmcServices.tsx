const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

interface CMSMeta {
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  h1_heading?: string;
  meta_details?: string;
}

interface CMSDetails {
  title?: string;
  slug?: string;
  banner_image?: string;
  banner_image_alt?: string;
  short_description?: string | null;
  description?: string;
  meta?: CMSMeta;
}

interface CMSResponse {
  status?: string;
  message?: string;
  data?: {
    details?: CMSDetails;
  };
}

export async function fetchDmcPageDetails(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/cms/page/details?slug=${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Public-Token": XPublicToken,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch CMS page details: ${res.statusText}`);
    }

    const data: CMSResponse = await res.json();
    return data?.data?.details || null;
  } catch (error) {
    console.error("Error fetching CMS page details:", error);
    return null;
  }
}