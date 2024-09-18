"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaRoute,
  FaSignOutAlt,
  FaClipboard,
  FaUserPlus,
  FaPlus,
  FaBus,
  FaDollarSign,
  FaEye,
  FaCircle,
  FaClock,
} from "react-icons/fa";
import { FaCircleCheck, FaHand } from "react-icons/fa6";

const Sidebar: React.FC = () => {

  const handleSignOut = async () => {
    await signOut();
  }

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-2 bg-dark text-light"
      style={{ height: "calc(100vh - 56px)", fontSize: "0.875rem" }} // Reduzimos o padding geral e o font-size
    >
      <ul className="nav nav-pills flex-column mt-2">
        <li className="nav-item">
          <Link
            href="/admin"
            className="nav-link text-light bg-dark rounded-2 py-2 px-2"
          >
            <FaHome className="me-2" />
            Home
          </Link>
        </li>

        {/* Accordion for Viagens */}
        <div className="accordion-item bg-dark border-0">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed bg-dark text-light rounded-2 py-2 px-2" // Reduzido padding
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePassageiros"
              aria-expanded="false"
              aria-controls="collapsePassageiros"
            >
              <FaBus className="me-2" />
              Viagens
            </button>
          </h2>
          <div
            id="collapsePassageiros"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionSidebar"
          >
            <div className="accordion-body p-0">
              <ul className="list-unstyled small ms-3">
                <li>
                  {/* criar viagem */}
                  <Link
                    href="/admin/trips/add"
                    className="nav-link text-light bg-dark py-1" // Reduzido padding
                  >
                    <FaClock className="me-2" />
                    Agendar viagens
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/trips/active"
                    className="nav-link text-light bg-dark py-1" // Reduzido padding
                  >
                    <FaCircle className="me-2" />
                    Viagens ativas
                  </Link>
                </li>
                <li>
                  {/* viagens finalizadas */}
                  <Link
                    href="/admin/trips/finished"
                    className="nav-link text-light bg-dark py-1" // Reduzido padding
                  >
                    <FaCircleCheck className="me-2" />
                    Viagens finalizadas
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accordion for various sections */}
        <div className="accordion" id="accordionSidebar">
          {/* Accordion for Rotas */}
          <div className="accordion-item bg-dark border-0">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-dark text-light rounded-2 py-2 px-2" // Reduzido padding
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseRotas"
                aria-expanded="false"
                aria-controls="collapseRotas"
              >
                <FaRoute className="me-2" />
                Rotas
              </button>
            </h2>
            <div
              id="collapseRotas"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionSidebar"
            >
              <div className="accordion-body p-0">
                <ul className="list-unstyled small ms-3">
                  <li>
                    <Link
                      href="/admin/routes/add"
                      className="nav-link text-light bg-dark py-1" // Reduzido padding
                    >
                      <FaPlus className="me-2" />
                      Nova rota
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/routes/view"
                      className="nav-link text-light bg-dark py-1" // Reduzido padding
                    >
                      <FaEye className="me-2" />
                      Visualizar rotas
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Accordion for Paradas */}
          <div className="accordion-item bg-dark border-0">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-dark text-light rounded-2 py-2 px-2" // Reduzido padding
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseParadas"
                aria-expanded="false"
                aria-controls="collapseParadas"
              >
                <FaHand className="me-2" />
                Paradas
              </button>
            </h2>
            <div
              id="collapseParadas"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionSidebar"
            >
              <div className="accordion-body p-0">
                <ul className="list-unstyled small ms-3">
                  <li>
                    <Link
                      href="/admin/stops/add"
                      className="nav-link text-light bg-dark py-1" // Reduzido padding
                    >
                      <FaPlus className="me-2" />
                      Nova parada
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/stops/view"
                      className="nav-link text-light bg-dark py-1" // Reduzido padding
                    >
                      <FaEye className="me-2" />
                      Visualizar paradas
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Accordion for Relatórios */}
          <div className="accordion-item bg-dark border-0">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-dark text-light rounded-2 py-2 px-2" // Reduzido padding
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseRelatorios"
                aria-expanded="false"
                aria-controls="collapseRelatorios"
              >
                <FaClipboard className="me-2" />
                Relatórios
              </button>
            </h2>
            <div
              id="collapseRelatorios"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionSidebar"
            >
              <div className="accordion-body p-0">
                <ul className="list-unstyled small ms-3">
                  <li>
                    <Link
                      href="/relatorios/viagens"
                      className="nav-link text-light bg-dark py-1" // Reduzido padding
                    >
                      <FaBus className="me-2" />
                      Viagens
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/relatorios/folhaPagamento"
                      className="nav-link text-light bg-dark py-1" // Reduzido padding
                    >
                      <FaDollarSign className="me-2" />
                      Folha de pagamento
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Accordion for Funcionários */}
          <div className="accordion-item bg-dark border-0">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-dark text-light rounded-2 py-2 px-2" // Reduzido padding
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFuncionarios"
                aria-expanded="false"
                aria-controls="collapseFuncionarios"
              >
                <FaUserPlus className="me-2" />
                Funcionários
              </button>
            </h2>
            <div
              id="collapseFuncionarios"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionSidebar"
            >
              <div className="accordion-body p-0">
                <ul className="list-unstyled small ms-3">
                  <li>
                    <Link
                      href="/admin/employees/add"
                      className="nav-link text-light bg-dark py-1" // Reduzido padding
                    >
                      <FaPlus className="me-2" />
                      Cadastrar funcionário
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/employees/view"
                      className="nav-link text-light bg-dark py-1" // Reduzido padding
                    >
                      <FaEye className="me-2" />
                      Visualizar funcionários
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ul>

      <div className="mt-auto">
        <hr className="text-secondary" />
        <Link href="/" className="d-flex align-items-center text-light text-decoration-none" onClick={handleSignOut}>
          <FaSignOutAlt className="me-2" />
          <strong>Log out</strong>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
