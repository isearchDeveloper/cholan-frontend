const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;

const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";
export async function fetchGoExploringData() {
  try {
    const res = await fetch(
      `${baseUrl}/api/v1/go-exploring/1`,
      {
        method: "GET",
        headers: {
          "X-Public-Token": XPublicToken,
        },
        next: { revalidate: 0 }, // cache for 60 sec (better than 0)
      }
    );

    if (!res.ok) {
      console.error("API Error:", res.status);
      return null;
    }

    const json = await res.json();

    return json?.data || null; // return only useful data
  } catch (error) {
    console.error("Fetch Go Exploring Error:", error);
    return null;
  }
}


/* =========================
   POST FORM (ENQUIRY)
========================= */
export async function submitGoEnquiry(form: {
  name: string;
  email: string;
  phone: string;
  msg: string;
   recaptcha_token?: string | null; 
}) {
  try {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("msg", form.msg);

    const res = await fetch(
      `${baseUrl}/api/v1/enquiries/go-enquiry`,
      {
        method: "POST",
        headers: {
          "X-Public-Token": XPublicToken,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Something went wrong",
      };
    }

    return data;
  } catch (error) {
    console.error("Submit Enquiry Error:", error);
    return {
      success: false,
      message: "Server error. Try again.",
    };
  }
}