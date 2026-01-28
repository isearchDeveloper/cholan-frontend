"use client";

import React, { useEffect, useState } from "react";

interface ThemeExpandableTextProps {
  text: string;
  wordLimit?: number;
}

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

export default function ThemeExpandableText({
  text,
  wordLimit = 100,
}: ThemeExpandableTextProps) {
  const [visibleWords, setVisibleWords] = useState(wordLimit);
  const [htmlState, setHtmlState] = useState(text);
  const [isTruncatedInitially, setIsTruncatedInitially] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // First check: is text bigger than limit?
  useEffect(() => {
    const { isTruncated } = truncateHtmlByWords(text, wordLimit);
    setIsTruncatedInitially(isTruncated);
  }, [text, wordLimit]);

  // Apply truncation based on visibleWords
  useEffect(() => {
    const { html } = truncateHtmlByWords(text, visibleWords);
    setHtmlState(html);
  }, [text, visibleWords]);

  const handleToggle = () => {
    if (isExpanded) {
      setVisibleWords(wordLimit);
      setIsExpanded(false);
    } else {
      setVisibleWords(10000); // large number to show all
      setIsExpanded(true);
    }
  };

  return (
    <div className="theme-expandable-text">
      <div
        className="expandable-content"
        dangerouslySetInnerHTML={{ __html: htmlState }}
      />

      {isTruncatedInitially && (
        <button
          type="button"
          onClick={handleToggle}
          className="btn btn-link mt-2 p-0 color-blue text-decoration-none"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
