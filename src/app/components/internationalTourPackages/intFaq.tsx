'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';


interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    faqs: FAQItem[];
    faqtitle: any
}

const INITIAL_FAQ_COUNT = 5;

const IntFaq: React.FC<FAQAccordionProps> = ({ faqs, faqtitle }) => {
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

    return (

        <div className="row justify-content-center">
            <div className="col-lg-10">
                <div className="faq-container" >

                    <h2 className="mb-4 color-blue text-center fs-3">{faqtitle}</h2>

                    <div className="faq-accordion">
                        {visibleFaqs.map((faq, index) => (
                            <div className="faq-item" key={index} >
                                <div
                                    className={`faq-question ${openIndex === index ? 'active' : ''}`}
                                    onClick={() => handleToggle(index)}
                                >

                                    <div className="d-flex align-items-start align-items-lg-center mb-0 pb-0 w-100 position-relative">
                                        <span className="me-3">
                                            <Image
                                                width={15}
                                                height={15}
                                                sizes="100vw"
                                                src="/search-icon.svg"
                                                alt=""

                                            />
                                        </span>
                                        <h3 className="fs-6 mb-0 pb-0">{faq.question}</h3>
                                        <span className="faq-arrow"></span>
                                    </div>
                                </div>
                                <div
                                    className={`faq-answer d-flex align-items-start gap-1 ps-5 ${openIndex === index ? 'open' : ''}`}
                                >

                                    <span>{faq.answer}</span>
                                </div>
                            </div>
                        ))}
                    </div>

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
            </div>
        </div>

    );
};

export default IntFaq;