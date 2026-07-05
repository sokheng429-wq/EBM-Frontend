import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

// Wrap a route's element with this to require login (and optionally admin).
// Usage: <ProtectedRoute><MyBookings /></ProtectedRoute>
//        <ProtectedRoute adminOnly><AdminBookings /></ProtectedRoute>
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
