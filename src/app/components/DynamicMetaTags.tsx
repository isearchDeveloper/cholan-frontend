// src/app/components/DynamicMetaTags.tsx
"use client";

import { useEffect } from "react";

interface DynamicMetaTagsProps {
  metaDetails: string;
}

const DynamicMetaTags: React.FC<DynamicMetaTagsProps> = ({ metaDetails }) => {
  useEffect(() => {
    if (metaDetails && typeof window !== "undefined") {
      // Parse and execute scripts from meta_details
      const parser = new DOMParser();
      const doc = parser.parseFromString(metaDetails, "text/html");
      
      // Execute scripts
      const scripts = doc.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        
        // Copy all attributes
        Array.from(script.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        
        // Copy inner HTML if exists
        if (script.innerHTML) {
          newScript.innerHTML = script.innerHTML;
        }
        
        // Append to document head
        document.head.appendChild(newScript);
      });

      // Add noscript to body
      const noscripts = doc.querySelectorAll("noscript");
      noscripts.forEach((noscript) => {
        const div = document.createElement("div");
        div.innerHTML = noscript.innerHTML;
        document.body.appendChild(div);
      });
    }
  }, [metaDetails]);

  // Also render the raw HTML for SSR (will be visible in view source)
  return (
    <>
      {metaDetails && (
        <div 
          dangerouslySetInnerHTML={{ __html: metaDetails }} 
          style={{ display: 'none' }}
        />
      )}
    </>
  );
};

export default DynamicMetaTags;