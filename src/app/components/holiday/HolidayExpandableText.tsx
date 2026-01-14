// "use client";
// import React, { useState, useRef, useEffect } from "react";

// interface ExpandableTextProps {
//   title: string;
//   subtitle?: string;
//   text: string;
//   collapsedLines?: number;
// }

// const HolidayExpandableText: React.FC<ExpandableTextProps> = ({
//   title,
//   text,
//   collapsedLines = 2,
// }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [maxHeight, setMaxHeight] = useState<string>("0px");
//   const [showButton, setShowButton] = useState(false);
//   const textRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (textRef.current) {
//       const lineHeight = parseInt(
//         window.getComputedStyle(textRef.current).lineHeight
//       );
//       const collapsedHeight = lineHeight * collapsedLines;
//       const scrollHeight = textRef.current.scrollHeight;

//       setMaxHeight(expanded ? `${scrollHeight}px` : `${collapsedHeight}px`);
//       setShowButton(scrollHeight > collapsedHeight);
//     }
//   }, [expanded, collapsedLines, text]);

//   return (
//     <div>
//       <h1 className="mb-2 fs-2">{title}</h1>

//       <div
//         ref={textRef}
//         className={`overflow-hidden transition-all duration-500 ease-in-out text-expansion ${!expanded ? "line-clamp" : null}`}
//         style={{ maxHeight }}
//       >
//         <div
//           className="mb-0 text-sm"
//           dangerouslySetInnerHTML={{ __html: text }}
//         />
//         {!expanded && text && text.split(" ").length > 60 && (
//           <span className="ellipsis">...</span>
//         )}
//       </div>

//       {showButton && (
//         <button
//           onClick={() => setExpanded(!expanded)}
//           className="exp-row btn btn-link mt-2 p-0 color-blue text-decoration-none d-flex align-items-center"
//         >
//           <span>{expanded ? "Less" : "More"}</span>
//           <svg
//             className={`ms-2 arrow-icon ${expanded ? "rotate" : ""}`}
//             width="16"
//             height="16"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </button>
//       )}
//     </div>
//   );
// };

// export default HolidayExpandableText;



"use client";
import React, { useState } from "react";

interface ExpandableTextProps {
  title: string;
  subtitle?: string;
  text: string;
  collapsedLines?: number; // optional legacy prop
}

const HolidayExpandableText: React.FC<ExpandableTextProps> = ({
  title,
  text,
}) => {
  const [expanded, setExpanded] = useState(false);

  const WORD_LIMIT = 350;
  const words = text?.trim().split(/\s+/) || [];
  const isLongText = words.length > WORD_LIMIT;

  const displayText =
    expanded || !isLongText
      ? text
      : words.slice(0, WORD_LIMIT).join(" ") + "...";

  return (
    <div>
      <h1 className="mb-2 fs-2">{title}</h1>

      <div className="mb-0 text-sm">
        <div
          dangerouslySetInnerHTML={{
            __html: displayText,
          }}
        />
      </div>

      {isLongText && (
        <button
          onClick={() => setExpanded(!expanded)}
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

export default HolidayExpandableText;
