
"use client";
import React, { useState, useRef, useEffect } from "react";

interface ExpandableTextProps {
  title: string;
  subtitle?: string;
  text: string;
  collapsedLines?: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  title,
  subtitle,
  text,
  collapsedLines = 2,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>("0px");
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const WORD_LIMIT = 70;



    useEffect(() => {
    const wordCount = text?.trim().split(/\s+/).length;

  
    const shouldShowButton = wordCount > WORD_LIMIT;
    setShowButton(shouldShowButton);
  
    if (textRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(textRef.current).lineHeight || "50"
      );
      const collapsedHeight = lineHeight * collapsedLines;
      const scrollHeight = textRef.current.scrollHeight;
  
      if (shouldShowButton) {
        setMaxHeight(expanded ? `${scrollHeight}px` : `${collapsedHeight}px`);
      } else {
        setMaxHeight("none"); // show full text if short
      }
    }
  }, [expanded, collapsedLines, text]);

  return (
    <div>
      {/* <h1 className="mb-2 fs-2">{`${title} ${title == "About Cholan Tours" ? "" : "Tour Packages"}`}</h1> */}
      <h1 className="mb-2 fs-2">{title}</h1>

      {subtitle && <h6 className="mb-2 text-md font-semibold fs-6">{subtitle}</h6>}

      <div
        ref={textRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${!expanded ? "line-clamp" : null} `}
        style={{ maxHeight }}
      >
        <div className="mb-0 text-sm">
          <div
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          />
          {!expanded && text?.split(" ").length > WORD_LIMIT && (
            <span className="ellipsis">...</span>
          )}
        </div>
      </div>

      {showButton && text &&(
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="exp-row btn btn-link mt-2 p-0 color-blue text-decoration-none d-flex align-items-center"
        >
          <span>{expanded ? "Less" : "More"}</span>
          <svg
            className={`ms-2 arrow-icon ${expanded ? "rotate" : ""}`}
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
    </div>
  );
};

export default ExpandableText;
