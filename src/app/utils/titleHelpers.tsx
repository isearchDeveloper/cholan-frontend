export function buildListingTitle(
  locationName?: string,
  categorySlug?: string
) {
  if (!locationName) return "";

  if (!categorySlug) {
    return `${locationName} Tour Packages`;
  }

  // Format slug to title case: "family-tour-package" → "Family Tour Package"
  const formattedCategory = categorySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

  // Strip trailing "Tour Package" or "Tour Packages" from the category
  // so we don't end up with "Kerala Family Tour Package Tour Package"
  const cleanedCategory = formattedCategory
    .replace(/\s+Tour Packages?\s*$/i, "")
    .trim();

  return `${locationName} ${cleanedCategory} Tour Package`;
}
