"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  title: string;
}

const FAQAccordionForCity: React.FC<FAQAccordionProps> = ({ faqs, title }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

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

  // ✅ Only control what is VISIBLE (not schema)
  const visibleFaqs = showAll ? faqs : faqs.slice(0, 5);

  /* ================= FAQ SCHEMA (ALL FAQS FOR SEO) ================= */
  const faqSchema =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* ================= SEO SCHEMA ================= */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="faq-container">
            <h2 className="mb-4 fs-3 text-center color-blue">{title}</h2>

            <div className="faq-accordion">
              {visibleFaqs.map((faq, index) => (
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
                          alt="FAQ"
                        />
                      </span>

                      <h3 className="fs-6 mb-0">{faq.question}</h3>
                      <span className="faq-arrow"></span>
                    </div>
                  </div>

                  <div
                    className={`faq-answer d-flex align-items-start ps-5 ${
                      openIndex === index ? "open" : ""
                    }`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ View All / Show Less Button */}
            {faqs.length > 5 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="btn orange-btn inline-flex items-center gap-2 ts-btn-main"
                >
                  {showAll ? "View Less" : "Load More"}
                  {!showAll && (
                    <Image
                      width={23}
                      height={23}
                      sizes="100vw"
                      src="/images/button-arrow.png"
                      alt="arrow"
                    />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQAccordionForCity;
