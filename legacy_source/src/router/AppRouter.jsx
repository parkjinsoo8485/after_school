import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import RoleGuard from '../components/common/RoleGuard';
import AppLayout from '../layouts/AppLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const DataPage = lazy(() => import('../pages/DataPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const AdminPage = lazy(() => import('../pages/AdminPage'));
const TermsPage = lazy(() => import('../pages/TermsPage'));
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function ProtectedPage({ children, adminOnly = false }) {
  const content = (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );

  if (!adminOnly) return content;

  return (
    <ProtectedRoute>
      <RoleGuard role="admin">
        <AppLayout>{children}</AppLayout>
      </RoleGuard>
    </ProtectedRoute>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner label="페이지 로딩 중" />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login.html" element={<Navigate to="/login" replace />} />

        <Route path="/terms" element={<TermsPage />} />
        <Route path="/terms.html" element={<Navigate to="/terms" replace />} />

        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/privacy.html" element={<Navigate to="/privacy" replace />} />

        <Route
          path="/"
          element={
            <ProtectedPage>
              <Navigate to="/dashboard" replace />
            </ProtectedPage>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedPage>
              <DashboardPage />
            </ProtectedPage>
          }
        />
        <Route
          path="/data"
          element={
            <ProtectedPage>
              <DataPage />
            </ProtectedPage>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedPage>
              <ProfilePage />
            </ProtectedPage>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedPage adminOnly>
              <AdminPage />
            </ProtectedPage>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
