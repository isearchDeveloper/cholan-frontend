'use client';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface FAQItem {
    title: string;
    details: string;
}

interface TrainTourPlanFAQProps {
    faqData: FAQItem[];
}

const TrainTourPlanFAQ: React.FC<TrainTourPlanFAQProps> = ({ faqData }) => {
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
        faqData && faqData.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": faqData.map((item) => ({
                      "@type": "Question",
                      "name": item.title,
                      "acceptedAnswer": {
                          "@type": "Answer",
                          "text": item.details,
                      },
                  })),
              }
            : null;

    return (
        <>
            {/* -------- Inject Schema only if FAQ data exists -------- */}
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema),
                    }}
                />
            )}

            <div className="faq-container">
                <div className="faq-accordion">
                    {faqData.map((item, index) => (
                        <div className="faq-item" key={index}>
                            <div className="faq-wrap">
                                <div
                                    className={`d-flex align-items-start align-items-lg-center faq-question ${
                                        openIndex === index ? 'active' : ''
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
                                            <circle
                                                cx="8"
                                                cy="8.94897"
                                                r="8"
                                                fill="#FF991B"
                                            />
                                        </svg>
                                    </span>

                                    <span>{item.title}</span>
                                    <span className="faq-toggle">
                                        {openIndex === index ? '−' : '+'}
                                    </span>
                                </div>

                                <div
                                    className={`faq-answer ${
                                        openIndex === index ? 'open' : ''
                                    }`}
                                >
                                    {item.details}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TrainTourPlanFAQ;
