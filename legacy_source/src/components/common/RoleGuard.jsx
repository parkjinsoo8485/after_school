import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function RoleGuard({ role, children }) {
  const { profile } = useAuth();
  if (!profile || profile.role !== role) return <Navigate to="/dashboard" replace />;
  return children;
}