interface ViewStopProps {
  activePage: string;
  stops: {
    selectRoute: string;
    origin: string;
    destination: string;
    neighborhood?: string;
    road?: string;
    state?: string;
    complement?: string;
    CEP?: string;
  }[];
}
