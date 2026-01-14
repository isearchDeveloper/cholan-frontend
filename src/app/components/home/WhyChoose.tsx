"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface WhyChooseItem {
    title: string;
    details: string[];
}

interface WhyChooseProps {
    data: WhyChooseItem[];
}

const WhyChoose: React.FC<WhyChooseProps> = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <section className="why-choose-sec common-padd">
            <div className="container">
                <div className="common-header-center">
                    <h2 className="fw-semibold mb-4 fs-3">Why Choose Cholan Tours?</h2>
                </div>

                <div className="row gy-4">
                    {data.map((section, index) => (
                        <AccordionSection key={index} section={section} />
                    ))}
                </div>
            </div>
        </section>
    );
};

interface AccordionSectionProps {
    section: WhyChooseItem;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ section }) => {
    const [expanded, setExpanded] = useState(false);
    const [maxHeight, setMaxHeight] = useState("0px");
    const hiddenRef = useRef<HTMLUListElement>(null);

    const hasMoreThanFour = section.details.length > 4;
    const visibleItems = hasMoreThanFour
        ? section.details.slice(0, 4)
        : section.details;
    const hiddenItems = hasMoreThanFour ? section.details.slice(4) : [];

    useEffect(() => {
        if (hiddenRef.current) {
            setMaxHeight(expanded ? `${hiddenRef.current.scrollHeight}px` : "0px");
        }
    }, [expanded]);

    return (
        <div className="col-lg-6">
            <div className="why-c-box position-relative">
                {/* Header row with title and toggle button */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="d-flex align-items-center gap-3 fw-semibold fs-5 mb-0">
                        <span>
                            <Image
                                width={20}
                                height={20}
                                src="/images/icon/icon-w.svg"
                                alt=""
                            />
                        </span>
                        {section.title}
                    </h4>

                    {hasMoreThanFour && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="accordion-toggle-btn d-flex align-items-center gap-1 border-0 bg-transparent text-primary  text-small"
                        >
                            {expanded ? "less" : "more"}
                            <span
                                className={`arrow-icon ${expanded ? "rotate" : ""}`}
                                style={{
                                    display: "inline-flex",
                                    transition: "transform 0.3s ease",
                                }}
                            >
                                {/* slick-style chevron arrow SVG */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </span>
                        </button>
                    )}
                </div>

                {/* List items */}
                <ul className="p-0 m-0 d-flex flex-col gap-2">
                    {visibleItems.map((item, idx) => (
                        <WhyChooseListItem key={idx} text={item} />
                    ))}
                </ul>

                {/* Hidden section with animation */}
                {hasMoreThanFour && (
                    <ul
                        ref={hiddenRef}
                        className="p-0 m-0 d-flex flex-col gap-2 overflow-hidden transition-all duration-300"
                        style={{
                            maxHeight,
                            opacity: expanded ? 1 : 0,
                            transition: "max-height 0.4s ease-in-out, opacity 0.4s ease-in-out",
                        }}
                    >
                        {hiddenItems.map((item, idx) => (
                            <WhyChooseListItem key={`hidden-${idx}`} text={item} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

interface ListItemProps {
    text: string;
}

const WhyChooseListItem: React.FC<ListItemProps> = ({ text }) => (
    <li className="flex items-center gap-2">
        <span className="line-clamp-why-cc">{text}</span>
        <span className="tooltip-icon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                width={15}
                height={15}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
            </svg>
            <span className="tooltip-text">{text}</span>
        </span>
    </li>
);

export default WhyChoose;
