import Image from "next/image";
import Link from "next/link";

interface DmcRelatedCitiesProps {
  cities: any[];
}

export default function DmcRelatedCities({ cities }: DmcRelatedCitiesProps) {
  if (!cities || cities.length === 0) return null;

  return (
    <div className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fs-3 fw-bold">Explore Our Other DMC Destinations</h2>
          <p className="text-muted">
            Discover our destination management services across India
          </p>
        </div>

        <div className="row g-4">
          {cities.map((city: any, idx: number) => (
            <div key={idx} className="col-md-6 col-lg-4">
              <Link
                href={`/indian-dmc/${city.slug}`}
                className="text-decoration-none"
              >
                <div className="card border-0 shadow-sm h-100 overflow-hidden position-relative">
                  <div className="position-relative" style={{ height: "250px" }}>
                    <Image
                      src={city.banner_image}
                      alt={city.banner_image_alt || city.title}
                      fill
                      className="object-fit-cover"
                    />
                    <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-dark bg-opacity-25"></div>
                    <div className="position-absolute bottom-0 start-0 end-0 p-4">
                      <h5 className="text-white fw-bold mb-2">{city.title}</h5>
                      <span className="text-white small">
                        Learn more →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}