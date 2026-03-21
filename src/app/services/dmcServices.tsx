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
interface ApiMeta {
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
}

interface ApiWhyChoose {
  text: string;
}

interface ApiService {
  title: string;
  description: string;
  icon: string;
}

interface ApiAttraction {
  location: string;
  slug: string;
  title: string;
  description: string;
}

interface ApiFaq {
  question: string;
  answer: string;
}

interface ApiBestTime {
  title: string;
  description: string;
}

interface ApiFleetItem {
  title: string;
  slug: string;
  type: string;
  seats: number;
  primary_image: string;
  primary_image_alt: string;
  category: {
    name: string;
    slug: string;
  };
}

interface ApiResponse {
  status: string;
  message: string;
  data: {
    id: number;
    title: string;
    slug: string;
    banner_image: string;
    banner_image_alt: string | null;
    description: string;
    why_chooses: ApiWhyChoose[];
    services: ApiService[];
    best_time: ApiBestTime | null;
    faqs: ApiFaq[];
    meta: ApiMeta;
    attractions: ApiAttraction[];
  };
  fleets?: Record<string, ApiFleetItem[]>;
  related_cities?: {
    title: string;
    slug: string;
    banner_image: string;
    banner_image_alt: string;
  }[];
}

// ================= FRONTEND TYPES =================

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  slug :string;
  location:string
}

export interface BestTimeInfo {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FleetItem {
  title: string;
  slug: string;
  type: string;
  seats: number;
  primary_image: string;
  primary_image_alt: string;
  category: {
    name: string;
    slug: string;
  };
}

export interface RelatedCity {
  title: string;
  slug: string;
  banner_image: string;
  banner_image_alt: string;
}

export interface DmcCityData {
  cityName: string;
  slug: string;
  title: string;
  subtitle: string;
  banner_image: string;
  banner_image_alt: string | null;
  overview: string;
  whyChoose: WhyChooseItem[];
  services: ServiceItem[];
  attractions: Attraction[];
  bestTime: BestTimeInfo | null;
  faqs: FaqItem[];
  meta: ApiMeta;
  fleets: Record<string, FleetItem[]>;
  relatedCities: RelatedCity[];
}

// ================= FETCH =================

export async function fetchDmcCityData(
  slug: string
): Promise<DmcCityData | null> {
  try {
    const res = await fetch(
      `${baseUrl}/api/v1/cms/indian-dmc/${slug}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Public-Token": XPublicToken,
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error("API ERROR:", res.status);
      return null;
    }

    const response: ApiResponse = await res.json();

    if (response.status !== "success" || !response.data) {
      return null;
    }

    //  console.log("service response" , response);
    return transformApiData(response);
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// ================= TRANSFORM =================

function transformApiData(response: ApiResponse): DmcCityData {
  const data = response.data;

  const cityName = data.title
    .replace(/dmc/gi, "")
    .trim()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

 return {
  cityName,
  slug: data.slug,
  title: data.title,
  subtitle: `Your Trusted Destination Management Company in ${cityName}`,

  banner_image: data.banner_image,
  banner_image_alt: data.banner_image_alt,

  overview: data.description || "",

  //  FIXED WHY CHOOSE
  whyChoose: Array.isArray(data.why_chooses)
    ? data.why_chooses
        .filter((item) => item?.text)
        .map((item, i) => ({
          id: `why-${i}`,
          title: item.text,
          description: "",
          icon: "check",
        }))
    : [],

  //  FIXED SERVICES
  services: Array.isArray(data.services)
    ? data.services
        .filter((item) => item?.title)
        .map((item, i) => ({
          id: `service-${i}`,
          title: item.title,
          description: item.description || "",
          icon: item.icon || "",
        }))
    : [],

  //  FIXED ATTRACTIONS
  attractions: Array.isArray(data.attractions)
    ? data.attractions
        .filter((item) => item?.title)
        .map((item, i) => ({
          id: `attr-${i}`,
          name: item.title,
          description: item.description
            ? stripHTML(item.description)
            : "",
          image: "",
          slug:item.slug,
          location:item.location
        }))
    : [],

  //  FIXED BEST TIME (IMPORTANT)
  bestTime:
    data.best_time &&
    (data.best_time.title || data.best_time.description)
      ? {
          title: data.best_time.title || "",
          description: data.best_time.description || "",
        }
      : null,

  //  SAFE FAQ
  faqs: Array.isArray(data.faqs) ? data.faqs : [],

  //  SAFE META
  meta: data.meta || {
    meta_title: null,
    meta_description: null,
    meta_keywords: null,
  },

  //  FLEETS (ALREADY GOOD)
  fleets:
    response.fleets && typeof response.fleets === "object"
      ? Object.fromEntries(
          Object.entries(response.fleets).filter(
            ([_, value]) => Array.isArray(value) && value.length > 0
          )
        )
      : {},

  //  RELATED CITIES
  relatedCities: Array.isArray(response.related_cities)
    ? response.related_cities
    : [],
};
}

// ================= HELPERS =================

function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}