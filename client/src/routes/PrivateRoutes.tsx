import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const PrivateRoutes = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
