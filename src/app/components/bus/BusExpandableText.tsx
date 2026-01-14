"use client";
import React, { useState } from "react";

interface ExpandableTextProps {
  title: string;
  subtitle?: string;
  text: string;
  collapsedLines?: number; // No longer used but can keep for compatibility
}

const BusExpandableText: React.FC<ExpandableTextProps> = ({
  title,
  subtitle,
  text,
}) => {
  const [expanded, setExpanded] = useState(false);

  const WORD_LIMIT = 350;
  const words = text?.trim().split(/\s+/);
  const isLongText = words?.length > WORD_LIMIT;

  const displayText =
    expanded || !isLongText
      ? text
      : words.slice(0, WORD_LIMIT).join(" ") + "...";

  return (
    <div>
      <h1 className="mb-2 fs-2">{title}</h1>

      {subtitle && (
        <h6 className="mb-2 text-md font-semibold fs-6">{subtitle}</h6>
      )}

      <div className="mb-0 text-sm">
        <p
          dangerouslySetInnerHTML={{
            __html: displayText,
          }}
        />
      </div>

      {isLongText && (
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

export default BusExpandableText;


