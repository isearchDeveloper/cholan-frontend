'use client';
import React, { useState, useRef, useEffect } from "react";


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
  collapsedLines = 2,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>("0px");
  const [showButton, setShowButton] = useState(true);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(textRef.current).lineHeight
      );
      const collapsedHeight = lineHeight * collapsedLines;
      const scrollHeight = textRef.current.scrollHeight;

      setMaxHeight(expanded ? `${scrollHeight}px` : `${collapsedHeight}px`);
      setShowButton(scrollHeight > collapsedHeight && !expanded);
    }
  }, [expanded, collapsedLines, text]);



  return (
  <div className="mb-3">
      {/* <h3 className="mb-3">About {title} Tour Packages</h3> */}
      {/* {subtitle && <h6 className="mb-3 text-md font-semibold">{subtitle}</h6>} */}

  
      <div
        ref={textRef}
        className={` overflow-hidden transition-all duration-500 ease-in-out text-expansion ${
          !expanded ? 'line-clamp-2' : ''
        }`}
        style={{ maxHeight }}
      >
        <p className="mb-0 text-sm">
          {text}
          {/* {!expanded && <span className="ellipsis">...</span>} */}
        </p>
      </div>


      {showButton && (
        <button
          onClick={() => setExpanded(true)}
          className="exp-row btn btn-link mt-2 p-0 color-blue text-decoration-none d-flex align-items-center"
        >
          <span>More</span>
          <svg
            className={`ms-2 arrow-icon ${expanded ? 'rotate' : ''}`}
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

export default TrainExpandableText;