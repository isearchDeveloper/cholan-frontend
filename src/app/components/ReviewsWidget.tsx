"use client";

import { useEffect } from "react";

export default function GoogleReviews() {

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://elfsightcdn.com/platform.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.head.appendChild(script);
    }

  }, []);

  return (
    <section className="customer-rate">
      <div className="container">
        <div className="common-header-center">
          <h2 className="fs-3">
            <span>What Travellers Say About Us?</span>
          </h2>
        </div>

        <div className="customer-rate-wrapper">
          <div
            className="elfsight-app-e3ee4787-6689-434d-9efd-47581053d784 custom-css-root"
            data-elfsight-app-lazy
            style={{ width: "100%", maxWidth: "100%" }}
          ></div>
        </div>

      </div>
    </section>
  );
}