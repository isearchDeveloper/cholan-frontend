'use client';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    faqs: FAQItem[];
    title: any;
}

const FAQAccordionForHotel: React.FC<FAQAccordionProps> = ({ faqs, title }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    /* ---------------- Dynamic FAQ Schema ---------------- */
    const faqSchema =
        faqs && faqs.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": faqs.map((faq) => ({
                      "@type": "Question",
                      "name": faq.question,
                      "acceptedAnswer": {
                          "@type": "Answer",
                          "text": faq.answer,
                      },
                  })),
              }
            : null;

    return (
        <>
            {/* -------- Inject Schema only if FAQs exist -------- */}
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
                        <h2 className="mb-4 color-blue text-center fs-3">{title}</h2>

                        <div className="faq-accordion">
                            {faqs?.map((faq, index) => (
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
                                            <h3 className="fs-6 mb-0">{faq.question}</h3>
                                            <span className="faq-arrow"></span>
                                        </div>
                                    </div>

                                    <div
                                        className={`faq-answer d-flex ps-5 align-items-start ${
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

export default FAQAccordionForHotel;
