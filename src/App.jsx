import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import { PageLayout } from '@components/layout';
import LoadingSpinner from '@components/LoadingSpinner';
import { SECTIONS } from '@data/site-config';

// ── Lazy-loaded pages ──────────────────────────────────────────
// Each page is code-split for faster initial load
const Home       = lazy(() => import('@pages/Home'));
const About      = lazy(() => import('@pages/About'));
const Notices    = lazy(() => import('@pages/Notices'));
const Events     = lazy(() => import('@pages/Events'));
const Resources  = lazy(() => import('@pages/Resources'));
const Grievance  = lazy(() => import('@pages/Grievance'));
const Contact    = lazy(() => import('@pages/Contact'));
const NotFound   = lazy(() => import('@pages/NotFound'));

export default function App() {
  return (
    <HashRouter>
      <PageLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/about"     element={<About />} />
            {SECTIONS.notices   && <Route path="/notices"   element={<Notices />} />}
            {SECTIONS.events    && <Route path="/events"    element={<Events />} />}
            {SECTIONS.resources && <Route path="/resources" element={<Resources />} />}
            {SECTIONS.grievance && <Route path="/grievance" element={<Grievance />} />}
            {SECTIONS.contact   && <Route path="/contact"   element={<Contact />} />}
            <Route path="*"          element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageLayout>
    </HashRouter>
  );
}
