"use client";

import React, { useState } from "react";

interface InclusionExclusionData {
  inclusions: string[];
  exclusions: string[];
}

const TrainInclusionExclusionComponent: any = ({
  inclusion,
  exclusion,
}: any) => {
  // Utility function to remove HTML tags
  const stripHtml = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className="row mb-4">
      {inclusion.length < 1 || inclusion[0] == "" ? null : (
        <div className="col-lg-6">
          <div className="p-4 bg-success-bg rounded h-100">
            <h6 className="mb-4">Inclusions</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {inclusion?.map((item: any) => (
                <li className="text-success d-flex align-items-flex-start text-sm">
                  <span className="me-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 7.94906L9 19.9491L3.5 14.4491L4.91 13.0391L9 17.1191L19.59 6.53906L21 7.94906Z"
                        fill="#4FB553"
                      />
                    </svg>
                  </span>
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

      {exclusion?.length < 1 || exclusion[1] == "" ? null : (
        <div className="col-lg-6">
          <div className="p-4 bg-danger-bg rounded h-100">
            <h6 className="mb-4">Exclusions</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {exclusion.map((item: any) => (
                <li className="text-danger d-flex align-items-flex-start text-sm">
                  <span className="me-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.7845 20.7289L12.4245 14.3589L6.06453 20.7289L4.64453 19.3089L11.0145 12.9489L4.64453 6.58895L6.06453 5.16895L12.4245 11.5389L18.7845 5.17895L20.1945 6.58895L13.8345 12.9489L20.1945 19.3089L18.7845 20.7289Z"
                        fill="#DA1515"
                      />
                    </svg>
                  </span>{" "}
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

export default TrainInclusionExclusionComponent;
