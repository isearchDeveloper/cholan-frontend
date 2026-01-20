export function buildListingTitle(
  locationName?: string,
  categorySlug?: string
) {
  if (!locationName) return "";

  if (!categorySlug) {
    return `${locationName} Tour Packages`;
  }

  const formattedCategory = categorySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

  // ⚠️ IMPORTANT:
  // backend needs "Tour Package" for family-tour-package
  return `${locationName} ${formattedCategory} Tour Package`;
}
