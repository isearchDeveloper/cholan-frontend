
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchCityList } from "@/app/services/cityService";

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
  cities: initialCities, //  from server
  total: initialTotal,
}: {
  country: "india" | "international-holidays";
  cities: CityItem[];
  total: number;
}) {
  const LIMIT = 12;

  //  start with SSR cities
  const [cities, setCities] = useState<CityItem[]>(initialCities);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(initialTotal);

  const type = country === "india" ? 1 : 2;

  const loadMore = async () => {
    setLoading(true);

    const nextPage = page + 1;
    const res = await fetchCityList(type, nextPage, LIMIT);

    if (res?.data?.cities?.length) {
      setCities((prev) => [...prev, ...res.data.cities]);
      setPage(nextPage);
      setTotal(res.data.pagination.total);
    }

    setLoading(false);
  };

  const showButton = total ? cities.length < total : true;

  return (
    <section className="rent-car-list-route py-5 mb-5">
      <div className="container">
        <h2 className="text-center mb-4">
          {country === "india"
            ? "Explore The States and Cities of India"
            : "Explore International Destinations"}
        </h2>

        <div className="row row-cols-2 row-cols-md-4 g-4">
          {cities.map((city) => {
            const href =
              country === "india"
                ? `/india/${city.slug}`
                : `/international-holidays/${city.slug}`;

            return (
              <div key={city.slug} className="col">
                <Link href={href} className="route-card text-center">
                  <p className="mt-2 text-capitalize">{city.location.name}</p>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-4">
          {cities.length < total ? (
            <button
              className="btn orange-btn"
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          ) : (
            <button
              className="btn orange-btn"
              onClick={() => {
                setCities(initialCities);
                setPage(1);
              }}
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
