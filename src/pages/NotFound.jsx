import { Link } from 'react-router';
import { Home } from 'lucide-react';
import SEO from '@components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist or has been moved." />
      <section className="section-container section-padding text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-8xl font-heading font-extrabold text-primary-muted mb-4">404</h1>
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">Page Not Found</h2>
        <p className="text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          <Home size={16} /> Back to Home
        </Link>
      </div>
    </section>
    </>
  );
}
