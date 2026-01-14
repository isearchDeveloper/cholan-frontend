'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    faqs: FAQItem[];
    title:any;
}

const FAQAccordionBus: React.FC<FAQAccordionProps> = ({ faqs,title }) => {
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

    return (
        <div className="row justify-content-center">
            <div className="col-lg-10">

                <div className="faq-container" >
                    <h2 className="mb-4 color-blue fs-3 text-center">{title}</h2>
                    <div className="faq-accordion">
                        {faqs?.map((faq, index) => (
                            <div
                                className="faq-item"
                                key={index}

                            >
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
                                    className={`faq-answer d-flex align-items-start ps-5 ${openIndex === index ? 'open' : ''}`}
                                >

                                    <div>
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FAQAccordionBus;