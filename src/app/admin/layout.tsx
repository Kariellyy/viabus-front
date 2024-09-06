import Sidebar from "../components/admin/sidebar";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar fixa no topo */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top border-bottom border-dark-subtle">
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

          </div>
        </div>
      </nav>

      {/* Layout principal com grid responsivo */}
      <div className="container-fluid flex-grow-1" style={{ marginTop: "56px" }}>
        <div className="row flex-nowrap">
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

          {/* Sidebar fixa para telas maiores */}
          <div className="col-auto col-md-3 col-lg-2 px-sm-2 bg-dark text-white d-none d-md-block">
            <Sidebar />
          </div>

          {/* Conteúdo principal */}
          <div className="col py-3 d-flex justify-content-center align-items-center">
            <div className="content-wrapper w-100">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
