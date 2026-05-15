"use client";

import React from "react";

const InclusionExclusionComponent = ({
  inclusion = [],
  exclusion = [],
}: any) => {

  const hasInclusion =
    inclusion.length > 0 &&
    inclusion.some((item: string) => item.replace(/<[^>]*>/g, "").trim() !== "");

  const hasExclusion =
    exclusion.length > 0 &&
    exclusion.some((item: string) => item.replace(/<[^>]*>/g, "").trim() !== "");

  return (
    <div className={`inc-exc gap-4 gap-lg-0 ${hasInclusion || hasExclusion ? "row my-4" : ""}`}>

      {/* Inclusions */}
      {hasInclusion && (
        <div className="col-lg-6">
          <div className="p-4 bg-success-bg rounded h-100">
            <h6 className="mb-4">Inclusions</h6>

            <ul className="list-unstyled d-flex flex-column gap-2">
              {inclusion.map((item: any, index: any) => (
                <li
                  key={index}
                  className="text-success d-flex align-items-start text-sm"
                >
                  <span className="me-3">✓</span>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: item,
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Exclusions */}
      {hasExclusion && (
        <div className="col-lg-6">
          <div className="p-4 bg-danger-bg rounded h-100">
            <h6 className="mb-4">Exclusions</h6>

            <ul className="list-unstyled d-flex flex-column gap-2">
              {exclusion.map((item: any, index: any) => (
                <li
                  key={index}
                  className="text-danger d-flex align-items-start text-sm"
                >
                  <span className="me-3">✕</span>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: item,
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InclusionExclusionComponent;