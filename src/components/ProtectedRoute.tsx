import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserType } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: UserType[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedUserTypes }) => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-green-600 text-xl">Loading...</div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUserTypes && userData && !allowedUserTypes.includes(userData.userType)) {
    // Redirect to appropriate dashboard based on user type
    switch(userData.userType) {
      case 'farmer':
        return <Navigate to="/dashboard/farmer" replace />;
      case 'buyer':
        return <Navigate to="/dashboard/buyer" replace />;
      case 'delivery':
        return <Navigate to="/dashboard/delivery" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;