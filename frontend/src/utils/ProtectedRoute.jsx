import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { state } = useContext(AuthContext);
  //   console.log(state);

  if (state.loading) {
    return <div>Authenticating...</div>;
  }

  return state.user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
