"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface FAQItem {
  day: string;
  plan: string;
}

interface TourPlanFAQProps {
  faqData: FAQItem[];
}

const TourPlanFAQ: React.FC<any> = ({ faqData }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container" >
      <div className="faq-accordion">
        {faqData.map((item: any, index: any) => (
          <div
            className="faq-item"
            key={index}
           
          >
            <div className="faq-wrap">
              <div
                className={`d-flex align-items-start align-items-lg-center faq-question ${
                  openIndex === index ? "active" : ""
                }`}
                onClick={() => handleToggle(index)}
              >
                <span className="me-3 dot-r">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="8" cy="8.94897" r="8" fill="#FF991B" />
                  </svg>
                </span>{" "}
               <span>{`Day ${index + 1}:`} {item.title}</span> 
                <span className="faq-toggle">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              <div
                className={`faq-answer  ${openIndex === index ? "open" : ""}`}
              >
               
                <div dangerouslySetInnerHTML={{ __html: item.details }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourPlanFAQ;
