// app/dashboard/layout.tsx

import Sidebar from "../components/admin/sidebar";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar fixa no topo */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
            aria-controls="offcanvasSidebar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand ms-2" href="#">
            VIABUS
          </a>
          <div className="d-flex gap-3">
            <a className="nav-link text-white" href="#">
              Perfil
            </a>
            <a className="nav-link text-white" href="#">
              Sair
            </a>
          </div>
        </div>
      </nav>

      {/* Layout principal */}
      <div className="d-flex flex-grow-1"> 
        {/* Sidebar offcanvas para dispositivos móveis */}
        <div
          className="offcanvas offcanvas-start bg-dark text-white"
          id="offcanvasSidebar"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">VIABUS</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <Sidebar />
          </div>
        </div>

        {/* Sidebar e conteúdo principal */}
        <div className="d-flex flex-grow-1">
          {/* Sidebar fixa para telas maiores */}
          <div className="d-none d-md-flex flex-column bg-dark text-white" style={{ width: "280px", height: "100vh", position: "fixed", top: "56px" }}>
            <Sidebar />
          </div>
          {/* Conteúdo principal */}
          <main className="flex-grow-1 p-4" style={{ marginLeft: "280px", marginTop: "56px" }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
