import React from "react";
import EnquiryForm from "./EnquiryForm";
import styles from "./vacationContact.module.css";

export default function VacationContactSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.textBox}>
            <h2 className={styles.heading}>
              Contact Us to Book Your Summer Holiday!
            </h2>
            <p className={styles.subtext}>
              Hassle-free journeys with the expertise of our in-house Tour Managers.
            </p>
          </div>
          <div className={styles.formBox}>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
