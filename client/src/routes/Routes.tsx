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
import Sidebar from "../components/Sidebar";
import { useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/user/userSlice";
import CreatePost from "../pages/Forum/CreatePost";
import UpdatePost from "../pages/Forum/UpdatePost";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  // { path: "/forum", element: <Forum /> },
  { path: "*", element: <Home /> },
];

const AppRoutes = () => {
  const {isLoggedIn} = useAppSelector(selectUser);

  return (
    <div className="App">
      <Router>
        {isLoggedIn ? <Sidebar />
        : ""}
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route element={<PrivateRoutes />}>
            <Route element={<Writers />} path="/writers/:userId" />
            <Route element={<Forum />} path="/forum" />
            <Route element={<CreatePost />} path="/createPost" />
            <Route element={<UpdatePost />} path="/updatePost/:postId" />
            <Route element={<Events />} path="/events" />
            <Route element={<ChangePassword />} path="/changePassword" />
            <Route element={<Contact />} path="/contact" />
            <Route element={<Account />} path="/editAccount" />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
