// app/services/themeService.ts

const baseUrl = process.env.NEXT_PUBLIC_UAT_URL;
const XPublicToken =
  "zaxsc+/-=0dfvgbnhmjklo*/-piutyerwq*%$25631478907539541lokythbfet&*(@kjhkhgfhk546456456)";

import axios from "axios";

export async function fetchThemesData(citySlug: string) {
  try {
    const res = await axios.get(
      `${baseUrl}/api/v1/pages/city/theme/2/honeymooon`
    );
    return res.data;
  } catch (error) {
    return { themes: [] };
  }
}
