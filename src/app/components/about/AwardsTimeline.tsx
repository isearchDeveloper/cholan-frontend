




'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface AwardTimelineItem {
  title?: string;
  award_year?: number | string;
  description?: string;
  banner_image?: string;
  banner_image_alt?: string;
}

interface StaticTimelineProps {
  data: AwardTimelineItem[];
}
const StaticTimeline: React.FC<StaticTimelineProps> = ({ data }) => {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [lineActive, setLineActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let anyActive = false;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            anyActive = true;
          }
        }
        setLineActive(anyActive);
      },
      { threshold: 0.3 }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      itemsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="container mx-auto ">
      <div className="mb-5 text-center">
        <h2 className="fs-3 mb-1">Honoring Our Journey of Excellence</h2>
        <p>Recognizing our milestones of excellence in travel and service. </p>
      </div>

      <div className={`timeline ${lineActive ? 'line-active' : ''}`}>
        {data?.map((item, index) => (
          <div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? 'right' : 'left'} ${index === 0 ? 'active' : ''}`}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
          >
            <div className="timeline-year">{item.award_year}</div>
            <div className="timeline-dot"></div>

            <div className="timeline-box content-box">
              <h4 className="fs-5 fw-semibold">{item.title}</h4>
              <p className="text-sm sm:text-base text-muted">{item.description}</p>
            </div>

            <div
              className="timeline-box image-box w-full h-64 rounded-4"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.0), rgba(0,0,0,0.2)),  url('${item.banner_image || "/images/banner.jpg"
                  }')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              aria-label={item.banner_image_alt || "Award image"}
            >
              <img
                src={item?.banner_image}
                alt={item?.banner_image_alt || item?.title || "Banner"}
                className="d-none"
              />

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticTimeline;
