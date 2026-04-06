import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '@data/site-config';

/**
 * SEO Component — Sets <title> and <meta description> per page
 *
 * Title format:
 *   Home  → "Applied Association — AEI, CET"
 *   Other → "Notices | Applied Association — AEI"
 *
 * @example
 * <SEO title="Notices" description="Browse the latest department announcements." />
 */
const SUFFIX = `${SITE_CONFIG.siteName} — ${SITE_CONFIG.departmentShort}`;
const DEFAULT_KEYWORDS = [
  'Applied Association CET',
  'Applied Association AEI',
  'AEI CET',
  'Applied Electronics and Instrumentation CET',
  'College of Engineering Trivandrum AEI',
  'AEI notices',
  'AEI events',
  'AEI resources',
].join(', ');

export default function SEO({ title, description, keywords = DEFAULT_KEYWORDS, noIndex = false }) {
  const location = useLocation();
  const fullTitle = title ? `${title} | ${SUFFIX}` : `${SUFFIX}, ${SITE_CONFIG.collegeShort}`;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const configuredSiteUrl = SITE_CONFIG.canonicalSiteUrl?.replace(/\/$/, '');
  const routePath = location?.pathname || '/';
  const canonicalBase = configuredSiteUrl || origin;
  const canonicalUrl = canonicalBase ? `${canonicalBase}${routePath}` : undefined;
  const robotsValue = noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_CONFIG.siteName,
    alternateName: `${SITE_CONFIG.departmentName} ${SITE_CONFIG.collegeShort}`,
    description: description || SITE_CONFIG.metaDescription,
    ...(canonicalBase ? { url: `${canonicalBase}/` } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.contact.address,
      addressCountry: 'IN',
    },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || SITE_CONFIG.metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robotsValue} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:site_name" content={SITE_CONFIG.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || SITE_CONFIG.metaDescription} />
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || SITE_CONFIG.metaDescription} />

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
