import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { OneFilter } from "./pages/OneFilter/OneFilter";
import   FiltersList from "./pages/FiltersList/FiltersList";
import   OneFilter from "./pages/OneFilter/OneFilter"
import { ROUTES } from "./Routes";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.FILTERS} replace />}  />
        <Route path={ROUTES.FILTERS} element={<FiltersList />} />
        <Route path={`${ROUTES.FILTERS}/:id`} element={<OneFilter />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;