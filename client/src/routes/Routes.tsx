import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Auth/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import Account from "../pages/Auth/Account";
import Forum from "../pages/Forum/Forum";
import ChangePassword from "../pages/Auth/ChangePassword";
import Contact from "../pages/Auth/Contact";
import Events from "../pages/Events";
import Writers from "../pages/Forum/Writers";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  // { path: "/forum", element: <Forum /> },
  { path: "*", element: <Home /> },
];

const AppRoutes = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route element={<PrivateRoutes />}>
            <Route element={<Writers />} path="/writers/:userId" />
            <Route element={<Forum />} path="/forum" />
            <Route element={<Events />} path="/events" />
            <Route element={<ChangePassword />} path="/changePassword" />
            <Route element={<Contact />} path="/contact" />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
