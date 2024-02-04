export const ROUTES = {
    HOME: "/",
    FILTERS: "/filters",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    FILTERS: "Фильтры",
  };