'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    faqs: FAQItem[];
    name:any;
}

const FAQAccordionForHotelDetails: React.FC<FAQAccordionProps> = ({ faqs,name }) => {
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
                    <h2 className="mb-4 color-blue text-center fs-3">{name}</h2>
                    <div className="faq-accordion">
                        {faqs?.map((faq, index) => (
                            <div
                                className="faq-item"
                                key={index}
                              
                            >

                                  <div
                                    className={`faq-question ${openIndex === index ? "active" : ""
                                        }`}
                                >


                                <div
                                    className={`d-flex align-items-start m-0 p-0 align-items-lg-center w-100 position-relative faq-question ${openIndex === index ? 'active' : ''}`}
                                    onClick={() => handleToggle(index)}
                                >
                                    
                                        <Image
                                            width={15}
                                            height={15}
                                            sizes="100vw"
                                            src="/search-icon.svg"
                                            alt="" className="me-3"

                                        />
                                    
                                    <h3 className="fs-6 mb-0 pb-0"> {faq.question} </h3>
                                    <span className="faq-arrow"></span>
                                </div>

                                </div>
                                <div
                                    className={`faq-answer d-flex ps-5 align-items-start ${openIndex === index ? 'open' : ''}`}
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

export default FAQAccordionForHotelDetails;