import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('guest_session_id') != null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};
