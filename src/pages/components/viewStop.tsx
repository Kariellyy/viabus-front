import React, { useState } from "react";
import { FaMapMarkerAlt, FaDotCircle, FaPlus } from "react-icons/fa";
import styles from "@/styles/viewStop.module.css"; 

const exampleStops = [
  {
    selectRoute: "Rota 1",
    origin: "São Paulo",
    destination: "Rio de Janeiro"
  },
  {
    selectRoute: "Rota 2",
    origin: "Belo Horizonte",
    destination: "Curitiba"
  },
  {
    selectRoute: "Rota 3",
    origin: "Brasília",
    destination: "Goiânia"
  },
  {
    selectRoute: "Rota 4",
    origin: "Salvador",
    destination: "Recife"
  },
  {
    selectRoute: "Rota 5",
    origin: "Porto Alegre",
    destination: "Florianópolis"
  },
  {
    selectRoute: "Rota 6",
    origin: "Fortaleza",
    destination: "Natal"
  },
  {
    selectRoute: "Rota 7",
    origin: "Fortaleza",
    destination: "Natal"
  },
  {
    selectRoute: "Rota 8",
    origin: "Fortaleza",
    destination: "Natal"
  }
];

export default function ViewStop({
  activePage,
  setActivePage,
}: ViewStopProps & { setActivePage: (page: string) => void }) {
  const [stops, setStops] = useState(exampleStops); 

  return (
    <>
      {activePage === "visualizarParadas" && (
        <div className="row p-4">
          {stops.length > 0 ? (
            stops.map((stop, index) => (
              <div key={index} className={`col-md-3 ${styles.cardContainer}`}>
                <div className={styles.card}>
                  <div className={styles.cardBody}>
                    <div className={styles.stopInfo}>
                      <FaDotCircle className={styles.locationIcon} />
                      <span>
                        Rota: <strong>{stop.selectRoute}</strong>
                      </span>
                    </div>
                    <div className={styles.stopInfo}>
                      <FaMapMarkerAlt
                        className={styles.locationIcon}
                        style={{ color: "#295878" }}
                      />
                      <span>
                        Saindo de <strong>{stop.origin}</strong>
                      </span>
                    </div>
                    <div className={styles.stopInfo}>
                      <FaMapMarkerAlt
                        className={styles.locationIcon}
                        style={{ color: "#295878" }}
                      />
                      <span>
                        Indo para <strong>{stop.destination}</strong>
                      </span>
                    </div>
                    <div className={styles.detailsButton}>
                      <button
                        className={`btn btn text-white titleButton ${styles.titleButton}`}
                        onClick={() => setActivePage(`detalhesParada${index}`)}
                      >
                        Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhuma parada disponível.</p>
          )}
        </div>
      )}
    </>
  );
}
