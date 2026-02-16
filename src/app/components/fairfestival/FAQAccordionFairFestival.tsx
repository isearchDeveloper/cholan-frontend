"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

interface FAQItem {
  question: string;
  answer: string;
}

/* Dummy fallback data */
const dummyFaqs: FAQItem[] = [
  {
    question: "What are the most popular festivals in India?",
    answer:
      "Some of the most popular festivals include Diwali, Holi, Durga Puja, Navratri, and Kumbh Mela.",
  },
  {
    question: "When is the best time to attend fairs and festivals?",
    answer:
      "October to March is considered the best season for festivals in India.",
  },
  {
    question: "Are fair and festival tours suitable for families?",
    answer:
      "Yes, most tours are family-friendly and suitable for all age groups.",
  },
  {
    question: "Do festival tours include accommodation?",
    answer:
      "Most packages include hotel stays and transport.",
  },
  {
    question: "How early should I book?",
    answer:
      "Booking 1–2 months in advance is recommended.",
  },
];

const FAQAccordionFairFestival = ({ faqs = [] }: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  /* 🔥MAIN LOGIC */
  const finalFaqs =
    Array.isArray(faqs) && faqs.length > 0
      ? faqs
      : dummyFaqs;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  /* Schema uses finalFaqs */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: finalFaqs.map((faq: FAQItem) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="faq-container">

            <h2 className="mb-4 color-blue fs-3 text-center">
              Fair & Festival FAQs
            </h2>

            <div className="faq-accordion">
              {finalFaqs.map((faq: FAQItem, index: number) => (
                <div className="faq-item" key={index}>

                  <div
                    className={`faq-question ${
                      openIndex === index ? "active" : ""
                    }`}
                    onClick={() => handleToggle(index)}
                  >
                    <div className="d-flex align-items-start align-items-lg-center w-100 position-relative">

                      <span className="me-3">
                        <Image
                          width={15}
                          height={15}
                          src="/search-icon.svg"
                          alt=""
                        />
                      </span>

                      <h3 className="fs-6 mb-0">
                        {faq.question}
                      </h3>

                      <span className="faq-arrow"></span>
                    </div>
                  </div>

                  <div
                    className={`faq-answer d-flex align-items-start ps-5 ${
                      openIndex === index ? "open" : ""
                    }`}
                  >
                    <div>{faq.answer}</div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default FAQAccordionFairFestival;
