import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from '@components/layout';
import LoadingSpinner from '@components/LoadingSpinner';
import { SECTIONS } from '@data/site-config';
import { ADMIN_BACKDOOR_PATH, isAdminAuthenticated } from '@utils/adminAuth';
import { auth, hasFirebaseConfig } from '@lib/firebase';

// ── Lazy-loaded pages ──────────────────────────────────────────
// Each page is code-split for faster initial load
const Home       = lazy(() => import('@pages/Home'));
const About      = lazy(() => import('@pages/About'));
const Notices    = lazy(() => import('@pages/Notices'));
const Events     = lazy(() => import('@pages/Events'));
const Resources  = lazy(() => import('@pages/Resources'));
const MockTests  = lazy(() => import('@pages/MockTests'));
const MockTestAttempt = lazy(() => import('@pages/MockTestAttempt'));
const MockTestResult  = lazy(() => import('@pages/MockTestResult'));
const Grievance  = lazy(() => import('@pages/Grievance'));
const Contact    = lazy(() => import('@pages/Contact'));
const AdminLogin = lazy(() => import('@pages/AdminLogin'));
const AdminDashboard = lazy(() => import('@pages/AdminDashboard'));
const NotFound   = lazy(() => import('@pages/NotFound'));

function ProtectedAdminRoute({ children }) {
  const [authReady, setAuthReady] = useState(!hasFirebaseConfig);

  useEffect(() => {
    let active = true;

    async function ensureAuthReady() {
      if (!hasFirebaseConfig || !auth) {
        if (active) setAuthReady(true);
        return;
      }

      if (typeof auth.authStateReady === 'function') {
        await auth.authStateReady();
      }

      if (active) setAuthReady(true);
    }

    ensureAuthReady();
    return () => {
      active = false;
    };
  }, []);

  if (!authReady) {
    return <LoadingSpinner />;
  }

  if (!isAdminAuthenticated()) {
    return <Navigate to={ADMIN_BACKDOOR_PATH} replace />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PageLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/about"     element={<About />} />
            {SECTIONS.notices   && <Route path="/notices"   element={<Notices />} />}
            {SECTIONS.events    && <Route path="/events"    element={<Events />} />}
            {SECTIONS.resources && <Route path="/resources" element={<Resources />} />}
            {SECTIONS.mockTests && <Route path="/mock-tests" element={<MockTests />} />}
            {SECTIONS.mockTests && <Route path="/test-center/:testId" element={<MockTestAttempt />} />}
            {SECTIONS.mockTests && <Route path="/test-center/:testId/result" element={<MockTestResult />} />}
            {SECTIONS.mockTests && <Route path="/mock-tests/:testId" element={<Navigate to="/mock-tests" replace />} />}
            {SECTIONS.mockTests && <Route path="/mock-tests/:testId/result" element={<Navigate to="/mock-tests" replace />} />}
            {SECTIONS.grievance && <Route path="/grievance" element={<Grievance />} />}
            {SECTIONS.contact   && <Route path="/contact"   element={<Contact />} />}
            <Route path={ADMIN_BACKDOOR_PATH} element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route path="*"          element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageLayout>
    </BrowserRouter>
  );
}
