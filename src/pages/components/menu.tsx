import React from "react";
import {
  FaHome,
  FaRoute,
  FaUserPlus,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "@/styles/menu.module.css";

export default function Menu() {
  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 ${styles.menu}`}
      style={{ width: "280px", height: "100vh" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <span className="fs-4 text-dark">VIABUS</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className={"nav-item"}>
          <a href="#Home" className="nav-link text-dark">
            <FaHome className="me-2 text-dark" />
            Home
          </a>
        </li>
        <li className={"nav-item"}>
          <a href="#Rotas" className="nav-link text-dark">
            <FaRoute className="me-2 text-dark" />
            Rotas
          </a>
        </li>
        <li className={"nav-item"}>
          <a
            href="#Cadastrar motorista"
            className="nav-link text-dark"
          >
            <FaUserPlus className="me-2 text-dark" />
            Cadastrar motorista
          </a>
        </li>
        <li className={"nav-item"}>
          <a
            href="#Visualizar passageiros"
            className="nav-link text-dark"
          >
            <FaUsers className="me-2 text-dark" />
            Visualizar passageiros
          </a>
        </li>
      </ul>
      <hr />
      <div className="d-flex align-items-center">
        <a
          href="#logout"
          className={`d-flex align-items-center text-dark text-decoration-none`}
        >
          <FaSignOutAlt className="me-2 text-dark" />
          <strong className="text-dark">Log out</strong>
        </a>
      </div>
    </div>
  );
}
