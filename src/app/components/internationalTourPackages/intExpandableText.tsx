"use client";
import React, { useState, useEffect } from "react";

const IntExpandableText: React.FC<any> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const [jsEnabled, setJsEnabled] = useState(false);
  const WORD_LIMIT = 140;

  useEffect(() => {
    setJsEnabled(true);
  }, []);

  // ✅ Strip HTML tags for counting words
  const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "").trim();
  };

  // ✅ Prepare word-limited text
  const plainText = stripHtml(data?.description || "");
  const words = plainText.split(/\s+/);
  const isLongText = words.length > WORD_LIMIT;
  const shortText = words.slice(0, WORD_LIMIT).join(" ") + "...";

  return (
    <>
      {/* 🚫 JS Disabled → show full text */}
      {!jsEnabled && (
        <div>
          <h1 className="mb-2 fs-2">International Tour Packages</h1>
          <div
            className="mb-0 text-sm"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
      )}

      {/* ✅ JS Enabled → show 70 words with toggle */}
      {jsEnabled && (
        <div>
          <h1 className="mb-2 fs-2">International Tour Packages</h1>

          <div className="mb-0 text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: expanded
                  ? data.description
                  : `<p>${shortText}</p>`,
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
      )}
    </>
  );
};

export default IntExpandableText;
