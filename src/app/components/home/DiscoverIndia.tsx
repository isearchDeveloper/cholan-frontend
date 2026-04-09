"use client";

import Image from "next/image";
import styles from "./discoverindia.module.css";
import { useRouter } from "next/navigation";

interface DiscoverIndiaProps {
  discoverIndiaPackageData: any[];
}

const DiscoverIndia = ({ discoverIndiaPackageData }: DiscoverIndiaProps) => {
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
              For over two decades, we’ve crafted journeys that go beyond travel—where every destination tells a story through our travelers.
            </p>

            <span onClick={() => router.push("/packages")}>
              View All Packages →
            </span>
          </div>
        </div>

        {/* CARDS */}
        <div className={styles.cards}>
          {discoverIndiaPackageData?.slice(0, 4).map((item) => (
            <div
              key={item.slug}
              className={styles.card}
              onClick={() => setUrl(item.slug)}
            >
              <Image
                src={
                  item?.primary_image || "/images/fallback.jpg"
                }
                alt={item.title}
                fill
                className={styles.image}
              />

              {/* ARROW */}
              <div className={styles.arrow}>
                →
              </div>

              {/* OVERLAY */}
              <div className={styles.overlay}>
                <h3 >{item.title}</h3>

                <p>
                  {(() => {
                    const raw = item.short_description || "";
                    const noHtml = raw.replace(/<[^>]*>?/gm, "");
                    return noHtml.length > 110
                      ? noHtml.slice(0, 110) + "..."
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