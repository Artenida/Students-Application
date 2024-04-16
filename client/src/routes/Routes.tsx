import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/Auth/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import Account from "../pages/Forum/Account";
import Forum from "../pages/Forum/Forum";

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
            <Route element={<Account />} path="/account" />
            <Route element={<Forum />} path="/forum" />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
