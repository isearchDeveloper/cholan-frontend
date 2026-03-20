// app/components/dmc/DmcAttractions.tsx

import styles from "./DmcAttractions.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Attraction {
  id: string;
  name: string;
  description: string;
}

interface DmcAttractionsProps {
  attractions: Attraction[];
  cityName: string;
}

export default function DmcAttractions({
  attractions,
  cityName,
}: DmcAttractionsProps) {
  return (
    <section className={styles.attractions}>
      <div className="container">
        <h2 className={styles.title}>Top Attractions in {cityName}</h2>

        <div className={styles.grid}>
          {attractions.map((item) => (
            <div key={item.id} className={styles.card}>
              
              {/* ICON */}
              <div className={styles.iconWrapper}>
                <FaMapMarkerAlt className={styles.icon} />
              </div>

              {/* TEXT */}
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <p className={styles.cardDescription}>
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}