"use client";

import React, { useEffect, useState } from "react";

interface CityExpandableTextProps {
  title?: string;
  text: string;        // HTML from backend
  wordLimit?: number;  // step size
}

/* ===============================
   🔹 HTML truncator (WORD BASED)
   =============================== */
function truncateHtmlByWords(html: string, limit: number) {
  if (typeof window === "undefined") {
    return { html, isTruncated: false };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  let wordCount = 0;
  let isTruncated = false;

  function walk(node: Node): boolean {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent?.trim().split(/\s+/) || [];

      if (wordCount + words.length > limit) {
        const allowed = words.slice(0, limit - wordCount);
        node.textContent = allowed.join(" ") + "…";
        isTruncated = true;
        return false;
      }

      wordCount += words.length;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const children = Array.from(node.childNodes);
      for (const child of children) {
        if (!walk(child)) {
          while (child.nextSibling) {
            child.nextSibling.remove();
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
  wordLimit = 350,
}: CityExpandableTextProps) {
  const [visibleWords, setVisibleWords] = useState(wordLimit);
  const [htmlState, setHtmlState] = useState(text);
  const [isFullyVisible, setIsFullyVisible] = useState(false);

  useEffect(() => {
    const { html, isTruncated } = truncateHtmlByWords(text, visibleWords);
    setHtmlState(html);
    setIsFullyVisible(!isTruncated);
  }, [text, visibleWords]);

  const handleMore = () => {
    setVisibleWords((prev) => prev + wordLimit);
  };

  const handleLess = () => {
    setVisibleWords(wordLimit);
  };

  return (
    <div className="expandable-text">
      {title && <h2 className="expandable-title">{title}</h2>}

      <div
        className="expandable-content"
        dangerouslySetInnerHTML={{ __html: htmlState }}
      />

      <button
        type="button"
        onClick={isFullyVisible ? handleLess : handleMore}
        className="exp-row btn btn-link mt-2 p-0 color-blue text-decoration-none d-flex align-items-center"
      >
        <span>{isFullyVisible ? "Less" : "More"}</span>
      </button>
    </div>
  );
}
