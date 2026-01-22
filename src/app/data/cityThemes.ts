// app/data/cityThemes.ts
export const CITY_THEMES: Record<
  string,
  {
    name: string;
    slug: string;
    image: string;
  }[]
> = {
  kerala: [
    {
      name: "Honeymoon",
      slug: "honeymoon",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      name: "Wildlife",
      slug: "wildlife",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      name: "Family Tour",
      slug: "family-tour",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    {
      name: "Luxury Holiday",
      slug: "luxury-holiday",
      image:
        "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b3",
    },
  ],
};
