import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from '@components/Layout';
import LoadingSpinner from '@components/LoadingSpinner';

// ── Lazy-loaded pages ──────────────────────────────────────────
// Each page is code-split for faster initial load
const Home       = lazy(() => import('@pages/Home'));
const About      = lazy(() => import('@pages/About'));
const Notices    = lazy(() => import('@pages/Notices'));
const Events     = lazy(() => import('@pages/Events'));
const Gallery    = lazy(() => import('@pages/Gallery'));
const Resources  = lazy(() => import('@pages/Resources'));
const Grievance  = lazy(() => import('@pages/Grievance'));
const Contact    = lazy(() => import('@pages/Contact'));
const NotFound   = lazy(() => import('@pages/NotFound'));

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/about"     element={<About />} />
            <Route path="/notices"   element={<Notices />} />
            <Route path="/events"    element={<Events />} />
            <Route path="/gallery"   element={<Gallery />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/grievance" element={<Grievance />} />
            <Route path="/contact"   element={<Contact />} />
            <Route path="*"          element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  );
}
