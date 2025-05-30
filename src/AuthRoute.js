
import { Navigate } from "react-router-dom";

export function AuthRoute({children}){
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}
