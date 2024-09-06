interface RegisterStopProps {
  activePage: string;
  addRoute: (data: {
    selectRoute: string;
    origin: string;
    destination: string;
    neighborhood: string;
    road: string;
    state: string;
    complement: string;
    CEP: string;
  }) => void;
  setActivePage: (page: string) => void;
}
