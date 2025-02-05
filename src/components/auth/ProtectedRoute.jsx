import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ component: Component }) {
  const { token, isTokenExpired } = useAuth();
  

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" />;
  }

  return <Component />;
}

export default ProtectedRoute;
