"use client";
import React from "react";
import { breadcrumbSchema } from "@/app/lib/breadcrumbSchema";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const baseUrl = "https://www.cholantours.com";

  const schemaItems = items?.map((i) => ({
    name: i.label,
    url: i.href ? baseUrl + i.href : undefined,
  }));

  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      {schemaItems?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema(schemaItems)),
          }}
        />
      )}
      <ul className="breadcrumb-list">
        {items?.map((item, index) => (
          <li
            key={index}
            className={item.isCurrent ? "" : "breadcrumb-item"}
            aria-current={item.isCurrent ? "page" : undefined}
          >
            <div className="breadcrumb-item">
              {index > 0 && (
                <svg
                  className="breadcrumb-icon"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              )}
              {item.isCurrent ? (
                <span className="breadcrumb-current">{item.label}</span>
              ) : (
                <a href={item.href || "#"} className="breadcrumb-link">
                  {index === 0 && (
                    <svg
                      className="breadcrumb-icon"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                  )}
                  {item.label}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
