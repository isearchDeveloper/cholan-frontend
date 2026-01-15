"use client";

import Image from "next/image";

interface ThingsToDoProps {
  cityName: string;
  data: {
    title: string;
    image: string;
  }[];
}

export default function ThingsToDo({ cityName, data }: ThingsToDoProps) {
  return (
    <section className="things-to-do-section">
      <div className="container">

        <h2 className="text-center mb-4 fw-bold fs-2">
          Things To Do In {cityName}
        </h2>

        <div className="row g-4">
          {data.map((item, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-3">
              <div className="things-card">
                <div className="things-img-wrap">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="things-img"
                  />
                </div>
                <h5 className="things-title">{item.title}</h5>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
