// app/components/dmc/DmcBestTime.tsx

import { FaCalendarAlt } from "react-icons/fa";
import styles from "./DmcBestTime.module.css";

interface BestTimeInfo {
  title: string;
  description: string;
}

interface DmcBestTimeProps {
  bestTime: BestTimeInfo;
  cityName: string;
}

export default function DmcBestTime({ bestTime, cityName }: DmcBestTimeProps) {
  if (!bestTime) return null;

  return (
    <section className={styles.bestTime}>
      <div className="container">
        <div className={styles.card}>
          
          <div className={styles.icon}>
            <FaCalendarAlt />
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>
              {bestTime.title}
            </h2>
            <p className={styles.description}>
              {bestTime.description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}