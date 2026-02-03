// "use client";
// import React, { useState, useRef, useEffect } from "react";

// interface ExpandableTextProps {
//   title: string;
//   subtitle?: string;
//   text: string;
//   collapsedLines?: number;
// }

// const CountryExpandableText: React.FC<any> = ({ data, collapsedLines = 2 }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [maxHeight, setMaxHeight] = useState<string>("0px");
//   const [showButton, setShowButton] = useState(true);
//   const textRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (textRef.current) {
//       const lineHeight = parseInt(
//         window.getComputedStyle(textRef.current).lineHeight
//       );
//       const collapsedHeight = lineHeight * collapsedLines;
//       const scrollHeight = textRef.current.scrollHeight;

//       setMaxHeight(expanded ? `${scrollHeight}px` : `${collapsedHeight}px`);
//       setShowButton(scrollHeight > collapsedHeight && !expanded);
//     }
//   }, [expanded, collapsedLines, data.description]);

//   const stripHtml = (html: string) => {
//     if (!html) return "";
//     return html
//       .replace(/<[^>]+>/g, "")
//       .replace(/\s+/g, " ")
//       .trim();
//   };

//   return (
//     <div>
//       <h2 className="mb-3"> {data.title} </h2>

//       <div
//         ref={textRef}
//         className={`overflow-hidden transition-all duration-500 ease-in-out text-expansion ${
//           !expanded ? "line-clamp" : ""
//         }`}
//         style={{ maxHeight }}
//       >
//         <div className="mb-0 text-sm">
//           <div
//             dangerouslySetInnerHTML={{
//               __html: data.description,
//             }}
//           />
//           {/* {!expanded && <span className="ellipsis">...</span>} */}
//         </div>
//       </div>

//       {showButton && (
//         <button
//           onClick={() => setExpanded(true)}
//           className="exp-row btn btn-link mt-2 p-0 color-blue text-decoration-none d-flex align-items-center"
//         >
//           <span>More</span>
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

// export default CountryExpandableText;




"use client";
import React, { useState, useRef, useEffect } from "react";

interface CountryExpandableTextProps {
  data: { title: string; description: string };
  collapsedLines?: number;
}

const CountryExpandableText: React.FC<CountryExpandableTextProps> = ({
  data,
  collapsedLines = 5,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>("0px");
  const [isExpandable, setIsExpandable] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [jsEnabled, setJsEnabled] = useState(false);

  // ✅ Detect JS enabled
  useEffect(() => {
    setJsEnabled(true);
  }, []);

  // ✅ Calculate expandable height when JS is enabled
  useEffect(() => {
    if (textRef.current && jsEnabled) {
      const lineHeight = parseInt(
        window.getComputedStyle(textRef.current).lineHeight
      );
      const collapsedHeight = lineHeight * collapsedLines;
      const scrollHeight = textRef.current.scrollHeight;

      setMaxHeight(expanded ? `${scrollHeight}px` : `${collapsedHeight}px`);
      setIsExpandable(scrollHeight > collapsedHeight);
    }
  }, [expanded, collapsedLines, data.description, jsEnabled]);

  return (
    <>
      {/* ✅ JS Disabled — show full description (no expand/collapse) */}
      {!jsEnabled && (
        <div className="country-exp">
          <h1 className="mb-3">{data.title}</h1>
          <div
            className="mb-0 text-sm"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
      )}

      {/* ✅ JS Enabled — show expandable version */}
      {jsEnabled && (
        <div className="country-exp">
          <h1 className="mb-3">{data.title}</h1>

          <div
            ref={textRef}
            className={`overflow-hidden transition-all india-page-inro duration-500 ease-in-out text-expansion  ${
              !expanded ? "line-clamp" : ""
            }`}
            style={{ maxHeight }}
          >
            <div className="mb-0 text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              />
            </div>
          </div>

          {isExpandable && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="exp-row btn btn-link mt-2 p-0 color-blue text-decoration-none d-flex align-items-center"
            >
              <span>{expanded ? "Less" : "More"}</span>
              <svg
                className={`ms-2 arrow-icon transition-transform ${
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
        </div>
      )}
    </>
  );
};

export default CountryExpandableText;

// return (
//     <>
//       {/* ✅ JS Disabled – static, full text (SSR safe) */}
//       {!jsEnabled && (
//         <div>
//           <h2 className="mb-3">{data.title}</h2>
//           <div className="mb-0 text-sm">
//             <div dangerouslySetInnerHTML={{ __html: data.description }} />
//           </div>
//         </div>
//       )}

//       {/* ✅ JS Enabled – interactive expand/collapse */}
//       {jsEnabled && (
//         <div>
//           <h2 className="mb-3">{data.title}</h2>

//           <div
//             ref={textRef}
//             className={`overflow-hidden transition-all duration-500 ease-in-out text-expansion ${
//               !expanded ? "line-clamp" : ""
//             }`}
//             style={{ maxHeight }}
//           >
//             <div className="mb-0 text-sm">
//               <div dangerouslySetInnerHTML={{ __html: data.description }} />
//             </div>
//           </div>

//           {isExpandable && (
//             <button
//               onClick={() => setExpanded(!expanded)}
//               className="exp-row btn btn-link mt-2 p-0 color-blue text-decoration-none d-flex align-items-center"
//             >
//               <span>{expanded ? "Less" : "More"}</span>
//               <svg
//                 className={`ms-2 arrow-icon transition-transform ${expanded ? "rotate-180" : ""}`}
//                 width="16"
//                 height="16"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
//           )}
//         </div>
//       )}
//     </>
//   );

