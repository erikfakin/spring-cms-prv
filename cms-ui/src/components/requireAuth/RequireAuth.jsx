import { Navigate, useLocation } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useAuth } from "context/authContext";

const RequireAuth = ({children}) => {
    const location = useLocation()
    const auth = useAuth()
    
  
    if (!auth.user || isExpired(auth.token)) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children
}

export default RequireAuth
