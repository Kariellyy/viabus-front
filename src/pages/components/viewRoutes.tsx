import React from "react";
import { FaMapMarkerAlt, FaDotCircle, FaClock } from "react-icons/fa"; 
import styles from "@/styles/viewRoutes.module.css"; 
import { FaPlus } from "react-icons/fa";

export default function ViewRoutes({ activePage, routes }: ViewRoutesProps) {
  return (
    <>
      {activePage === "visualizarRotas" && (
        <div className="row p-4">
          <div className={`col-12 d-flex justify-content-end ${styles.buttonContainer}`}>
            <button className={`btn btn ${styles.addButton}`}>
              <FaPlus className={styles.addButtonIcon} /> Cadastrar paradas
            </button>
          </div>
          {routes.map((route, index) => (
            <div key={index} className={`col-md-3 ${styles.cardContainer}`}>
              <div className={styles.card}>
                <div className={styles.cardBody}>
                  <div className={styles.routeInfo}>
                    <FaDotCircle className={styles.locationIcon} />
                    <span>Saindo de <strong>{route.origin}</strong></span>
                  </div>
                  <div className={styles.routeInfo}>
                    <FaMapMarkerAlt className={styles.locationIcon} style={{ color: "#295878" }} />
                    <span>Indo para <strong>{route.destination}</strong></span>
                  </div>
                  <div className={styles.timeInfo}>
                    <FaClock className={styles.locationIcon} />
                    <span>Horário: <strong>{route.time}</strong></span>
                  </div>
                  <div className={styles.priceInfo}>
                    <span className={styles.priceLabel}>Valor</span>
                    <div>R$ {route.value}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
