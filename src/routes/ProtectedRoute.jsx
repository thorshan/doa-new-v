import { Navigate, useLocation } from "react-router-dom";
import Processing from "../ui/loaders/Processing";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Processing />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" state={{ previous: location.pathname }} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
