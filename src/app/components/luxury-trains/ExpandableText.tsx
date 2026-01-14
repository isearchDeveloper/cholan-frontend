//src/app/components/luxury-trains/ExpandableText.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface TrainExpandableTextProps {
  title: string;
  subtitle?: string;
  text: string;
  collapsedLines?: number;
}

const TrainExpandableText: React.FC<any> = ({
  title,
  subtitle,
  text,
  collapsedLines = 4,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>("0px");
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(textRef.current).lineHeight
      );
      const collapsedHeight = lineHeight * collapsedLines;
      const scrollHeight = textRef.current.scrollHeight;
      setShowButton(true);
      setMaxHeight(expanded ? `${scrollHeight}px` : `${collapsedHeight}px`);
      setShowButton(scrollHeight > collapsedHeight); // Always show toggle if content is longer
      /////
      //textRef.current.classList.add("show-text");
      textRef.current.classList.remove("showw-full-text");
    }
  }, [expanded, collapsedLines, text]);
  

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="mb-0">
      {/* Optional: Title and Subtitle */}
      {/* <h3 className="mb-3">About {title} Tour Packages</h3> */}
      {/* {subtitle && <h6 className="mb-3 text-md font-semibold">{subtitle}</h6>} */}

      <div
        ref={textRef}
        className={`showw-full-text overflow-hidden transition-all duration-500 ease-in-out text-expansion ${
          !expanded ? "line-clamp-2" : "showwww-ful"
        }`}
        style={{ maxHeight: expanded ? maxHeight : "none" }}
      >
        <div className="mb-0 text-sm">
          <div
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          />
        </div>
      </div>

      {showButton && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="exp-row btn btn-link mt-2 p-0 color-blue text-decoration-none d-flex align-items-center"
        >
          <span>{expanded ? "Less" : "More"}</span>
          <svg
            className={`ms-2 arrow-icon transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}
      <style jsx global>{`
          .text-expansion.line-clamp-2 {
            -webkit-line-clamp: 4 !important;
          }
        `}
      </style>
    </div>
  );
};

export default TrainExpandableText;
