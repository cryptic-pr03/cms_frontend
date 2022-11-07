import { Navigate } from "react-router-dom";
import { getCurrentUser, getJwtToken } from "./AuthManager";

const Protected = ({ allowedRoles , children }) => {
  if (!getJwtToken()) {
    return <Navigate to="/login" replace />;
  }
  const currRole = getCurrentUser().typeUserCode;
  console.log(currRole);
  if(!allowedRoles.includes(currRole)){
    return <Navigate to="/unauth" replace />;
  }
  return children;
};
export default Protected;