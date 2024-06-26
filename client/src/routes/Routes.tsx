import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Home from "../pages/Auth/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoutes from "./PrivateRoutes";
import Account from "../pages/Auth/Account";
import Forum from "../pages/Forum/Forum";
import ChangePassword from "../pages/Auth/ChangePassword";
import Contact from "../pages/Auth/Contact";
import Events from "../pages/Event/Events";
import Writers from "../pages/Forum/Writers";
import Sidebar from "../components/Sidebar";
import { useAppSelector } from "../redux/hooks";
import { selectUser } from "../redux/user/userSlice";
import CreatePost from "../pages/Forum/CreatePost";
import UpdatePost from "../pages/Forum/UpdatePost";
import TermsAndConditions from "../pages/Auth/TermsAndConditions";
import Navbar from "../components/Navbar";
import EventDetails from "../pages/Event/EventDetails";
import About from "../pages/Forum/About";
import CreateEvent from "../pages/Event/CreateEvent";
import UpdateEvent from "../pages/Event/UpdateEvent";
import UserEvents from "../pages/Event/UserEvents";
import Chat from "../pages/Chat/Chat";
import Signup from "../pages/Chat/Signup";
import LoginChat from "../pages/Chat/LoginChat";
import { useAuthContext } from "../context/AuthContext";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import OTPVerification from "../pages/Auth/OTPInput";
import Reset from "../pages/Auth/Reset";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/terms", element: <TermsAndConditions /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/forgotPassword", element: <ForgotPassword /> },
  { path: "/otp", element: <OTPVerification /> },
  { path: "/reset", element: <Reset /> },
  { path: "*", element: <Home /> },
];

const AppRoutes = () => {
  const {isLoggedIn} = useAppSelector(selectUser);
  const {authUser} = useAuthContext();
  return (
    <div className="App">
      <Router>
        {isLoggedIn ? <Sidebar />
        : ""}
        <Navbar />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route element={<PrivateRoutes />}>
            <Route element={<Writers />} path="/writers/:userId" />
            <Route element={<UserEvents />} path="/userEvents/:userId" />
            <Route element={<Forum />} path="/forum" />
            <Route element={<CreatePost />} path="/createPost" />
            <Route element={<UpdatePost />} path="/updatePost/:postId" />
            <Route element={<Events />} path="/events" />
            <Route element={<EventDetails />} path="/events/:id" />
            <Route element={<CreateEvent />} path="/createEvent" />
            <Route element={<UpdateEvent />} path="/updateEvent/:id" />
            <Route element={<ChangePassword />} path="/changePassword" />
            <Route element={<Account />} path="/editAccount" />
            <Route element={authUser ? <Chat /> : <Navigate to={'/loginChat'} />} path="/chat" />
            <Route element={authUser ? <Navigate to={'/chat'}/> : <LoginChat />} path="/loginChat" />
            {/* <Route element={authUser ? <Navigate to={'/chat'}/> : <Signup />} path="/registerChat" /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;