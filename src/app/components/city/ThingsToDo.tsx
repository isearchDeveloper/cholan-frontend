"use client";

import Image from "next/image";
import CommonModal from "@/app/components/common/CommonModal";
import { useState } from "react";

interface ThingsToDoProps {
  cityName: string;
  data: {
    subtitle: string;
    title: string;
    image: string;
  }[];
}

export default function ThingsToDo({ cityName, data }: ThingsToDoProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const handleOpen = (item: any) => {
    setSelected(item);
    setOpen(true);
  };
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
                <div className="things-title-border">
                  <h5 className="things-title"  style={{ cursor: "pointer" }} onClick={() => handleOpen(item)}>
                    {item.title}
                  </h5>
                  {/* <p className="places-card-subtitle">{item.subtitle}</p> */}
                  {/* <button
                    className="btn orange-btn d-flex align-items-center gap-1 px-3 py-1 text-sm mt-2"
                    onClick={() => handleOpen(item)}
                  >
                    Read Details
                    <span>
                      <Image
                        width={23}
                        height={23}
                        sizes="100vw"
                        src="/images/button-arrow.png"
                        alt="arrow"
                      />
                    </span>
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <CommonModal
          isOpen={open}
          onClose={() => setOpen(false)}
          title={selected?.title}
          description={selected?.subtitle}
        />
      </div>
    </section>
  );
}
