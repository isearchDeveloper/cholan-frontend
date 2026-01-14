"use client";

import { useEffect, useRef } from "react";

export default function TripAdvisorWidget() {
  const tripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // ----- TripAdvisor -----
    if (tripRef.current) {
      tripRef.current.innerHTML = `
        <div id="TA_selfserveprop795" class="TA_selfserveprop">
          <ul id="natnOZjV" class="TA_links wvSnKuHTjuJ">
            <li id="HTOloPwNuZa" class="2rT9XvI1qHa">
              <a target="_blank" rel="noopener noreferrer"
                 href="https://www.tripadvisor.in/Attraction_Review-g317098-d6478868-Reviews-Indian_Panorama-Tiruchirappalli_Tiruchirappalli_District_Tamil_Nadu.html">
                <img src="https://www.tripadvisor.in/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg" alt="TripAdvisor"/>
              </a>
            </li>
          </ul>
        </div>
      `;
    }

    // Load TripAdvisor script
    const taScript = document.createElement("script");
    taScript.src =
      "https://www.jscache.com/wejs?wtype=selfserveprop&uniq=795&locationId=6478868&lang=en_IN&rating=true&nreviews=5&writereviewlink=true&popIdx=true&iswide=false&border=true&display_version=2";
    taScript.async = true;
    document.body.appendChild(taScript);

    // ----- Google (Elfsight) -----
    // if (!document.querySelector(`script[src="https://elfsightcdn.com/platform.js"]`)) {
    //   const gScript = document.createElement("script");
    //   gScript.src = "https://elfsightcdn.com/platform.js";
    //   gScript.async = true;
    //   document.body.appendChild(gScript);
    // }

    // cleanup when component unmounts
    return () => {
      taScript.remove();
    };
  }, []);

  return (
    <div className="tripadv-logo" style={{ textAlign: "center" }}>
      {/* TripAdvisor Section */}
      <div ref={tripRef}  />

   
      {/* <div
        className="elfsight-app-e3ee4787-6689-434d-9efd-47581053d784"
        data-elfsight-app-lazy
      ></div> */}
    </div>
  );
}