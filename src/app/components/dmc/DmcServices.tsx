// app/components/dmc/DmcServices.tsx

import Image from "next/image";
import styles from "./DmcServices.module.css";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface DmcServicesProps {
  services: ServiceItem[];
  cityName: string;
}

const getInitials = (title: string) => {
  return title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
};

export default function DmcServices({ services, cityName }: DmcServicesProps) {
  return (
    <section className={styles.services}>
      <div className="container">
        <h2 className={styles.title}>Our DMC Services in {cityName}</h2>

        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.id} className={styles.card}>
              
              {/* ICON */}
              <div className={styles.iconWrapper}>
                {service.icon ? (
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={40}
                    height={40}
                    className={styles.icon}
                  />
                ) : (
                  <span className={styles.fallback}>
                    {getInitials(service.title)}
                  </span>
                )}
              </div>

              {/* TEXT WRAPPER (VERY IMPORTANT) */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>
                  {service.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}