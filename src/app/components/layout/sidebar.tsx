import React from "react";
import {
  FaHome,
  FaRoute,
  FaUserPlus,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "@/styles/menu.module.css";

export default function Sidebar() {
  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 bg-dark text-light ${styles.menu}`}
      style={{ width: "280px", height: "100vh" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-light text-decoration-none"
      >
        <span className="fs-4 text-light">VIABUS</span>
      </a>
      <hr className="text-secondary" />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="/" className="nav-link text-light bg-dark">
            <FaHome className="me-2" />
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/viewRoutes" className="nav-link text-light bg-dark">
            <FaRoute className="me-2" />
            Visualizar Rotas
          </a>
        </li>
        <li className="nav-item">
          <a href="/cadastrarRotas" className="nav-link text-light bg-dark">
            <FaRoute className="me-2" />
            Cadastrar Rotas
          </a>
        </li>
        <li className="nav-item">
          <a href="/cadastrarMotorista" className="nav-link text-light bg-dark">
            <FaUserPlus className="me-2" />
            Cadastrar motorista
          </a>
        </li>
        <li className="nav-item">
          <a
            href="/visualizarPassageiros"
            className="nav-link text-light bg-dark"
          >
            <FaUsers className="me-2" />
            Visualizar passageiros
          </a>
        </li>
      </ul>
      <hr className="text-secondary" />
      <div className="d-flex align-items-center">
        <a
          href="#logout"
          className="d-flex align-items-center text-light text-decoration-none"
        >
          <FaSignOutAlt className="me-2" />
          <strong>Log out</strong>
        </a>
      </div>
    </div>
  );
}
