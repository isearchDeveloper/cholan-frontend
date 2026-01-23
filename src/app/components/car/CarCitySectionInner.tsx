"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

interface CityCard {
  location: string;
  slug: string;
}

export default function CarCitySectionInner({
  cities = [],
}: {
  cities?: CityCard[];
}) {
  const params = useParams();
  const currentSlug = params?.slug as string | undefined;

  const safeCities = Array.isArray(cities) ? cities : [];

  // ✅ REMOVE CURRENT CITY
  const filteredCities = currentSlug
    ? safeCities.filter((city) => city.slug !== currentSlug)
    : safeCities;

  return (
    <section className="tour-services">
      <div className="ts-container">
        <h2 className="ts-heading">Our Car Rental Services in India</h2>

   <div className="ts-city-box">
  {filteredCities.map((city, index) => (
    <span key={city.slug}>
      <Link href={`/car-rental/${city.slug}`} className="ts-city-link">
        Car Rental in {city.location}
      </Link>
      {index !== filteredCities.length - 1 && (
        <span className="ts-separator"> | </span>
      )}
    </span>
  ))}
</div>


      </div>
    </section>
  );
}
