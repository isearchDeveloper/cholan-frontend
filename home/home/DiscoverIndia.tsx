"use client";

import styles from "./discoverindia.module.css";
import { useRouter } from "next/navigation";

const DiscoverIndia = ({ discoverIndiaPackageData }: any) => {
  const router = useRouter();

  const setUrl = (slug: any) => {
    router.push(`/packages/${slug}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* HEADER */}
        <div className={styles.header}>
          <h2>
            Experience the Timeless Beauty <br /> of India
          </h2>

          <div className={styles.rightText}>
            <p>
              For over two decades, we’ve crafted journeys that go beyond
              travel—where every destination tells a story through our travelers.
            </p>

            <a href="/packages">View All Packages →</a>
          </div>
        </div>

        {/* CARDS */}
        <div className={styles.cardContainer}>
          {discoverIndiaPackageData?.slice(0, 4).map((item: any) => (
            <div
              key={item.slug}
              className={styles.card}
              onClick={() => setUrl(item.slug)}
            >
              <img
                src={
                  item?.primary_image ||
                  "https://images.pexels.com/photos/21014/pexels-photo.jpg"
                }
                alt={item.title}
                className={styles.image}
              />

              {/* Arrow */}
              <div className={styles.arrow}>↗</div>

              {/* Overlay */}
              <div className={styles.overlay}>
                <h3>{item.title}</h3>

                <p>
                  {(() => {
                    const raw = item.short_description || "";
                    const noHtml = raw.replace(/<[^>]*>?/gm, "");
                    return noHtml.length > 100
                      ? noHtml.slice(0, 100) + "..."
                      : noHtml;
                  })()}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DiscoverIndia;