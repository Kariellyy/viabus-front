import Link from "next/link";
import React from "react";
import {
  FaHome,
  FaRoute,
  FaSignOutAlt,
  FaUsers,
  FaClipboard,
  FaUserPlus,
  FaPlus,
  FaList,
  FaBus,
  FaDollarSign,
  FaEye,
} from "react-icons/fa";
import { FaHand } from "react-icons/fa6";

const Sidebar: React.FC = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-light"
      style={{ height: "90vh" }}
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link href="/admin" className="nav-link text-light bg-dark">
            <FaHome className="me-2" />
            Home
          </Link>
        </li>

        {/* Accordion for various sections */}
        <div className="accordion" id="accordionSidebar">
          {/* Accordion for Rotas */}
          <div className="accordion-item bg-dark border-0">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-dark text-light rounded-2 py-2 my-1 my-1 px-3"
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
                      className="nav-link text-light bg-dark"
                    >
                      <FaPlus className="me-2" />
                      Nova rota
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/admin/routes/view"
                      className="nav-link text-light bg-dark"
                    >
                      <FaEye className="me-2" />
                      Visualizar rotas
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Accordian for Paradas */}
          <div className="accordion-item bg-dark border-0">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-dark text-light rounded-2 py-2 my-1 px-3"
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
                      className="nav-link text-light bg-dark"
                    >
                      <FaPlus className="me-2" />
                      Nova parada
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/admin/stops/view"
                      className="nav-link text-light bg-dark"
                    >
                      <FaEye className="me-2" />
                      Visualizar paradas
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Accordion for Passageiros */}
          <div className="accordion-item bg-dark border-0">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-dark text-light rounded-2 py-2 my-1 px-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePassageiros"
                aria-expanded="false"
                aria-controls="collapsePassageiros"
              >
                <FaUsers className="me-2" />
                Passageiros
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
                    <a
                      href="/listaPassageiros"
                      className="nav-link text-light bg-dark"
                    >
                      <FaList className="me-2" />
                      Lista de passageiros
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Accordion for Relatórios */}
          <div className="accordion-item bg-dark border-0">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-dark text-light rounded-2 py-2 my-1 px-3"
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
                    <a
                      href="/relatorios/viagens"
                      className="nav-link text-light bg-dark"
                    >
                      <FaBus className="me-2" />
                      Viagens
                    </a>
                  </li>
                  <li>
                    <a
                      href="/relatorios/folhaPagamento"
                      className="nav-link text-light bg-dark"
                    >
                      <FaDollarSign className="me-2" />
                      Folha de pagamento
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Accordion for Funcionários */}
          <div className="accordion-item bg-dark border-0">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-dark text-light rounded-2 py-2 my-1 px-3"
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
                    <a
                      href="/admin/employees/add"
                      className="nav-link text-light bg-dark"
                    >
                      <FaPlus className="me-2" />
                      Cadastrar funcionário
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admin/employees/view"
                      className="nav-link text-light bg-dark"
                    >
                      <FaEye className="me-2" />
                      Visualizar funcionários
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ul>

      <div className="mt-auto">
        <hr className="text-secondary" />
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
};

export default Sidebar;
