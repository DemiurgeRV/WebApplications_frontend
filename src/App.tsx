import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import FiltersList from "./pages/FiltersList/FiltersList";
import OneFilter from "./pages/OneFilter/OneFilter";
import LoginPage from "./pages/LoginPage/Login";
import { ROUTES } from "./Routes";
import Header from "./components/NavBar/NavBar";
import { Provider } from "react-redux";
import { store } from "./store/store";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import OneOrder from "./pages/OneOrder/OneOrder";
import Registration from "./pages/Registration/Registration";
import ModerFilters from "./pages/ModerFilters/ModerFilters";
import OneFilterModer from "./pages/OneFilterModer/OneFilterModer";

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter basename="/WebApplications_frontend">
          <Header />
          <Routes>
            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.FILTERS} replace />}  />
            <Route path={ROUTES.FILTERS} element={<FiltersList />} />
            <Route path={`${ROUTES.FILTERS}/:id`} element={<OneFilter />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<Registration />} />
            <Route path={ROUTES.ORDERS} element={<OrdersPage />} />
            <Route path={`${ROUTES.ORDERS}/:id`} element={<OneOrder />} />
            <Route path={`${ROUTES.MODERFILTERS}`} element={<ModerFilters />} />
            <Route path={`${ROUTES.MODERFILTERS}/:id`} element={<OneFilterModer />} />
          </Routes>
        </BrowserRouter>
      </Provider>
  );
}

export default App;