const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

// ── Types ──────────────────────────────────────────────────────────────────

export interface RoomOption {
  option_id: number;
  label: string;
  rooms: {
    single: number;
    double: number;
    triple: number;
  };
  passengers: {
    adults: number;
    child_with_bed: number;
    child_without_bed: number;
    infants: number;
  };
}

export interface RoomOptionsResponse {
  success: boolean;
  schedule_id: number;
  departure_date: string;
  available_seats: number;
  total_options: number;
  options: RoomOption[];
}

export interface RoomPriceBreakdown {
  final_amount?: number;
  summary?: {
    base_price?:              number;
    single_room_total?:       number;
    double_room_total?:       number;
    triple_room_total?:       number;
    child_with_bed_total?:    number;
    child_without_bed_total?: number;
    infant_total?:            number;
    extra_bed_total?:         number;
    original_amount?:         number;  // subtotal before GST
    gst_rate?:                number;
    gst_amount?:              number;  // GST amount
  };
  total_passengers?: number;
  [key: string]: any;
}

// ── Room Options — Client-side fetch (depends on runtime user input) ────────

export async function fetchRoomOptions(
  slug: string,
  scheduleId: number,
  adults: number,
  children: number,
  infants: number
): Promise<RoomOptionsResponse | null> {
  try {
    const params = new URLSearchParams({
      schedule_id: String(scheduleId),
      adults:      String(adults),
      children:    String(children),
      infants:     String(infants),
    });
    const res = await fetch(
      `${baseUrl}/api/v1/package/${slug}/room-options?${params.toString()}`,
      {
        method: "GET",
        headers: { "X-Public-Token": XPublicToken },
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json ?? null;
  } catch (err) {
    console.error("[fetchRoomOptions] Error:", err);
    return null;
  }
}

// ── Calculate Room Price — POST to backend with selected room config ─────────

export async function calculateRoomPrice(payload: {
  package_id: number;
  schedule_id: number;
  room_selection: { single: number; double: number; triple: number };
  adults: number;
  child_with_bed: number;
  child_without_bed: number;
  infants: number;
  extra_bed?: number;
}): Promise<RoomPriceBreakdown | null> {
  try {
    const res = await fetch(`${baseUrl}/api/v1/booking/calculate-room-price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Public-Token": XPublicToken,
      },
      body: JSON.stringify({ extra_bed: 0, ...payload }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    // Normalise: return the data/result object if nested
    return json?.data ?? json ?? null;
  } catch (err) {
    console.error("[calculateRoomPrice] Error:", err);
    return null;
  }
}

async function fetchSpecialVacationOffer(id: number) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/special-vacation-offer/${id}`, {
      method: "GET",
      headers: { "X-Public-Token": XPublicToken },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0] ?? null;
  } catch (error) {
    console.error("Error fetching special vacation offer:", error);
    return null;
  }
}

export const fetchSouthIndiaOffer = () => fetchSpecialVacationOffer(2);
export const fetchNorthIndiaOffer = () => fetchSpecialVacationOffer(1);

export async function fetchSummerPageData() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/setting/pages/summer`, {
      method: "GET",
      headers: { "X-Public-Token": XPublicToken },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0] ?? null;
  } catch (error) {
    console.error("Error fetching summer page data:", error);
    return null;
  }
}

export async function fetchGroupTourDetails(slug: string) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/packages/group-tour/${slug}`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching group tour details:", error);
    return null;
  }
}

export async function fetchGroupTourPackages(page: number = 1) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/packages/group-tour?page=${page}`, {
      method: "GET",
      headers: {
        "X-Public-Token": XPublicToken,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch group tour packages:", res.statusText);
      return { data: [] };
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching group tour packages:", error);
    return { data: [] };
  }
}
