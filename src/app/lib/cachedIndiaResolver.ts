import { cache } from "react";
import { resolveIndiaSlug } from "./resolveIndiaSlug";

export const cachedResolveIndiaSlug = cache(
  async (slug: string) => {
    return await resolveIndiaSlug(slug);
  }
);
