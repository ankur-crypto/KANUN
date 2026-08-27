import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import Acts from "../pages/Acts/Acts";
import ActDetails from "../pages/Acts/ActDetails";
import SectionDetails from "../pages/Sections/SectionDetails";
import About from "../pages/About/About";
import Statistics from "../pages/Statistics/Statistics";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/search"
        element={<Search />}
      />

      <Route
        path="/acts"
        element={<Acts />}
      />

      <Route
        path="/acts/:id"
        element={<ActDetails />}
      />

      <Route
        path="/sections/:id"
        element={<SectionDetails />}
      />

      <Route
        path="/statistics"
        element={<Statistics />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default AppRoutes;