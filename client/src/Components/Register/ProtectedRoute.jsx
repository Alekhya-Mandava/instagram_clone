import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUserProfileAction } from "../../Redux/User/Action";

const ProtectedRoute = ({ children }) => {
  const { user, signin } = useSelector((store) => store);
  const location = useLocation();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) dispatch(getUserProfileAction(token || signin));
  }, [signin, token]);

  if (!(token)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};


export default ProtectedRoute;



