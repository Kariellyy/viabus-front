interface RegisterRouteProps {
  activePage: string;
  addRoute: (data: { origin: string; destination: string; time: string; value: string }) => void; 
  setActivePage: (page: string) => void;
}