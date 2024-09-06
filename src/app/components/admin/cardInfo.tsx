import React from "react";
import styles from "@/styles/main.module.css";

export default function CardInfo({ title, value, icon: Icon, color }: CardProps) {
  return (
    <div
      className={`card rounded-3 border-0 ${styles.card1} d-flex flex-grow-1`}
      style={{ "--card-color": color } as React.CSSProperties}
    >
      <div className={styles.iconWrapper}>
        <span className={`${styles.iconSize} text-white`}>
          <Icon />
        </span>
      </div>
      <div className={styles.cardContent}>
        <h6 className={`titulo-card mb-2 ${styles.tituloCard}`}>{title}</h6>
        <h5 className={`value ${styles.value}`}>{value}</h5>
      </div>
    </div>
  );
}
