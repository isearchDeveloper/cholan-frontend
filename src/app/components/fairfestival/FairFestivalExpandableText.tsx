"use client";

import React, { useEffect, useState } from "react";

interface ExpandableTextProps {
  title: string;
  subtitle?: string;
  text: string;
  collapsedLines?: number; // kept for compatibility
}

const FairFestivalExpandableText = ({
  title,
  subtitle,
  text,
}: ExpandableTextProps) => {
  const [expanded, setExpanded] = useState(false);
  const [jsEnabled, setJsEnabled] = useState(false);

  useEffect(() => {
    setJsEnabled(true);
  }, []);

  const WORD_LIMIT = 350;
  const words = text?.trim().split(/\s+/);
  const isLongText = words?.length > WORD_LIMIT;

  const displayText =
    !jsEnabled || expanded || !isLongText
      ? text
      : words.slice(0, WORD_LIMIT).join(" ") + "...";

  return (
    <div>
      <h1 className="mb-2 fs-2">{title}</h1>

      {subtitle && (
        <h6 className="mb-2 text-md font-semibold fs-6">
          {subtitle}
        </h6>
      )}

      <div className="mb-0 text-sm">
        <p
          dangerouslySetInnerHTML={{
            __html: displayText,
          }}
        />
      </div>

      {jsEnabled && isLongText && (
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

export default FairFestivalExpandableText;
