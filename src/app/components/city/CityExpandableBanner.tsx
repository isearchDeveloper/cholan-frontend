"use client";

import React, { useState } from "react";

interface CityExpandableTextProps {
  title?: string;
  text: string; // HTML from backend
  wordLimit?: number;
}

function truncateHtmlByWords(html: string, wordLimit: number): {
  html: string;
  isTruncated: boolean;
} {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  let wordCount = 0;
  let isTruncated = false;

  function walk(node: Node): boolean {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent?.trim().split(/\s+/) || [];

      if (wordCount + words.length > wordLimit) {
        const allowedWords = words.slice(0, wordLimit - wordCount);
        node.textContent = allowedWords.join(" ") + "...";
        isTruncated = true;
        return false; // stop traversal
      }

      wordCount += words.length;
      return true;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const children = Array.from(node.childNodes);
      for (const child of children) {
        if (!walk(child)) {
          // remove remaining siblings
          let next = child.nextSibling;
          while (next) {
            const toRemove = next;
            next = next.nextSibling;
            toRemove.remove();
          }
          return false;
        }
      }
    }

    return true;
  }

  walk(doc.body);

  return {
    html: doc.body.innerHTML,
    isTruncated,
  };
}

export default function CityExpandableText({
  title,
  text,
  wordLimit = 120,
}: CityExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const { html: truncatedHtml, isTruncated } =
    truncateHtmlByWords(text, wordLimit);

  return (
    <div className="expandable-text">
      {title && <h2 className="expandable-title">{title}</h2>}

      <div className="expandable-content">
        <div
          dangerouslySetInnerHTML={{
            __html: expanded ? text : truncatedHtml,
          }}
        />
      </div>

      {isTruncated && (
        <button
          type="button"
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
}
