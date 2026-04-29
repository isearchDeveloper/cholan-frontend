const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

export interface EventItem {
  title: string;
  banner_image: string | null;
  banner_image_alt: string | null;
  from_date: string | null;
  to_date: string | null;
  location: string | null;
  stall_no: string | null;
  description: string | null;
}

export async function fetchEventsData(limit = 10, page = 1): Promise<EventItem[]> {
  try {
    const res = await fetch(`${baseUrl}/api/v1/events?limit=${limit}&page=${page}`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch events:", res.statusText);
      return [];
    }

    const data = await res.json();
    if (data.status === "success" && Array.isArray(data.events)) {
      return data.events;
    }
    return [];
  } catch (err) {
    console.error("Error fetching events:", err);
    return [];
  }
}
