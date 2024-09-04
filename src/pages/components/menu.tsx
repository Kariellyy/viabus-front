// components/menu.js
import React from "react";
import { SetStateAction } from "react";
import {
  FaHome,
  FaRoute,
  FaUserPlus,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "@/styles/menu.module.css";

export default function Menu({ setActivePage }: { setActivePage: React.Dispatch<SetStateAction<string>> }) {
  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 ${styles.menu}`}
      style={{ width: "280px", height: "100vh" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-light text-decoration-none"
      >
        <span className="fs-4 text-light">VIABUS</span>
      </a>
      <hr className={styles.hr} />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className={`nav-item ${styles.button}`}>
          <button className="nav-link text-light" onClick={() => setActivePage("home")}>
            <FaHome className="me-2 text-light" />
            Home
          </button>
        </li>
        <li className={`nav-item ${styles.button}`}>
          <button className="nav-link text-light" onClick={() => setActivePage("rotas")}>
            <FaRoute className="me-2 text-light" />
            Rotas
          </button>
        </li>
        <li className={`nav-item ${styles.button}`}>
          <button className="nav-link text-light" onClick={() => setActivePage("cadastrarRotas")}>
            <FaRoute className="me-2 text-light" />
            Cadastrar Rotas
          </button>
        </li>
        <li className={`nav-item ${styles.button}`}>
          <button className="nav-link text-light" onClick={() => setActivePage("cadastrarMotorista")}>
            <FaUserPlus className="me-2 text-light" />
            Cadastrar motorista
          </button>
        </li>
        <li className={`nav-item ${styles.button}`}>
          <button className="nav-link text-light" onClick={() => setActivePage("visualizarPassageiros")}>
            <FaUsers className="me-2 text-light" />
            Visualizar passageiros
          </button>
        </li>
      </ul>
      <hr className={styles.hr}/>
      <div className="d-flex align-items-center">
        <a
          href="#logout"
          className={`d-flex align-items-center text-light text-decoration-none`}
        >
          <FaSignOutAlt className="me-2 text-light" />
          <strong className="text-light">Log out</strong>
        </a>
      </div>
    </div>
  );
}
