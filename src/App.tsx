import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import FiltersList from "./pages/FiltersList/FiltersList";
import OneFilter from "./pages/OneFilter/OneFilter";
import LoginPage from "./pages/LoginPage/Login";
import { ROUTES } from "./Routes";
import Header from "./components/NavBar/NavBar";
import { Provider } from "react-redux";
import { store } from "./store/store";

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
          </Routes>
        </BrowserRouter>
      </Provider>
  );
}

export default App;