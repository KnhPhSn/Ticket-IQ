import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import PageLoading from './PageLoading';

interface ProtectedRouteProps {
  isAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAdmin = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const checkingAuth = !user && loading;
  if (checkingAuth) {
    return <PageLoading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (isAdmin && user.role !== 'admin') {
    return <Navigate to={location.state?.from?.pathname || '/'} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
