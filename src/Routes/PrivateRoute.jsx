import { useContext } from "react";
import { AuthContext } from "../firebase/Provider/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if(!user){
    return <Navigate to ='/login' state={{from: location}} replace></Navigate>
  }
  return children
};

export default PrivateRoute;
