import React, { useState } from "react";
import { FaMapMarkerAlt, FaDotCircle, FaClock } from "react-icons/fa";
import styles from "@/styles/viewRoutes.module.css";

const exampleRoutes = [
  {
    origin: "São Paulo",
    destination: "Rio de Janeiro",
    time: "08:00",
    value: 120,
  },
  {
    origin: "Belo Horizonte",
    destination: "Curitiba",
    time: "09:30",
    value: 150,
  },
  {
    origin: "Brasília",
    destination: "Goiânia",
    time: "12:00",
    value: 80,
  },
  {
    origin: "Salvador",
    destination: "Recife",
    time: "14:00",
    value: 200,
  },
  {
    origin: "Porto Alegre",
    destination: "Florianópolis",
    time: "07:00",
    value: 110,
  },
  {
    origin: "Fortaleza",
    destination: "Natal",
    time: "06:00",
    value: 90,
  },
  {
    origin: "Manaus",
    destination: "Boa Vista",
    time: "15:00",
    value: 220,
  },
  {
    origin: "Vitória",
    destination: "São Paulo",
    time: "17:30",
    value: 140,
  },
];

export default function ViewRoutes({ activePage }: ViewRoutesProps & { setActivePage: (page: string) => void }) {
  const [routes, setRoutes] = useState(exampleRoutes); 

  return (
    <>
      {activePage === "visualizarRotas" && (
        <div className="row p-4">
          {routes.map((route, index) => (
            <div key={index} className={`col-md-3 ${styles.cardContainer}`}>
              <div className={styles.card}>
                <div className={styles.cardBody}>
                  <div className={styles.routeInfo}>
                    <FaDotCircle className={styles.locationIcon} />
                    <span>
                      Saindo de <strong>{route.origin}</strong>
                    </span>
                  </div>
                  <div className={styles.routeInfo}>
                    <FaMapMarkerAlt
                      className={styles.locationIcon}
                      style={{ color: "#295878" }}
                    />
                    <span>
                      Indo para <strong>{route.destination}</strong>
                    </span>
                  </div>
                  <div className={styles.timeInfo}>
                    <FaClock className={styles.locationIcon} />
                    <span>
                      Horário: <strong>{route.time}</strong>
                    </span>
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
