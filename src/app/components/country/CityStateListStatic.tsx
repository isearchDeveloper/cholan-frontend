"use client";

import Link from "next/link";

interface CityItem {
  title: string;
  slug: string;
  location: {
    slug: string;
    name: string;
  };
}

export default function CityStateListStatic({
  country,
  cities,
}: {
  country: "india" | "international-holidays";
  cities: CityItem[];
}) {
  if (!cities || cities.length === 0) return null;


  return (
    <section className="rent-car-list-route py-5">
      <div className="container">
        <h2 className="text-center mb-4">
          {country === "india"
            ? "India By City & States"
            : "International Destinations"}
        </h2>

        <div className="row row-cols-2 row-cols-md-4 g-4">
          {cities.map((city, index) => {
            const citySlug =city.slug;

            const href =
              country === "india"
                ? `/india/${citySlug}`
                : `/international-holidays/${citySlug}`;

            return (
              <div key={index} className="col">
                <Link href={href} className="route-card text-center">
                  <p className="mt-2 text-capitalize">
                    {city.location.name}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
