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
    location: any;
}

const INITIAL_FAQ_COUNT = 5;

const FAQAccordionListing: React.FC<FAQAccordionProps> = ({ faqs, location }) => {

    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [showAll, setShowAll] = useState<boolean>(false);

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

    const visibleFaqs = showAll ? (faqs ?? []) : (faqs?.slice(0, INITIAL_FAQ_COUNT) ?? []);
    const hasMore = !showAll && (faqs?.length ?? 0) > INITIAL_FAQ_COUNT;

    const faqSchema =
        faqs?.length > 0
            ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            }
            : null;

    return (
        <>
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema),
                    }}
                />
            )}

            <div className="faq-container">

                {faqs?.length > 0 && (
                    <h2 className="mb-4 color-blue fs-3">{location}</h2>
                )}

                {faqs?.length > 0 && (
                    <div className="faq-accordion">
                        {visibleFaqs.map((faq, index) => (
                            <div className="faq-item" key={index}>
                                <div
                                    className={`faq-question ${openIndex === index ? 'active' : ''}`}
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
                                    className={`faq-answer ps-5 ${openIndex === index ? 'open' : ''}`}
                                >
                                    <span>{faq.answer}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {hasMore && (
                    <div className="d-flex justify-content-center mt-4">
                        <button
                            type="button"
                            className="btn blue-btn d-flex align-items-center gap-2"
                            onClick={() => setShowAll(true)}
                        >
                            Load More FAQs
                            <span>
                                <img src="/images/button-arrow.png" alt="" width={16} height={16} />
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default FAQAccordionListing;
