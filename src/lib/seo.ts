import { NAP } from "./nap";

export const SITE_URL = "https://gangorraaudiodescricao.com.br";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;
export const LOGO_URL = `${SITE_URL}/logo-gangorra.png`;

type BuildSeoInput = {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
};

export function buildSeo({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  noindex = false,
}: BuildSeoInput) {
  const canonicalPath = canonical.startsWith("/") ? canonical : `/${canonical}`;
  const absoluteCanonical = `${SITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`;

  return {
    title,
    description,
    canonical: absoluteCanonical,
    ogImage: ogImage ?? DEFAULT_OG_IMAGE,
    ogType,
    noindex,
  };
}

export function formatPageTitle(title: string): string {
  return title.includes("Gangorra")
    ? title
    : `${title} | Gangorra Audiodescrição`;
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": ORG_ID,
        name: NAP.name,
        url: SITE_URL,
        logo: LOGO_URL,
        image: LOGO_URL,
        email: NAP.email,
        telephone: NAP.phoneE164,
        address: {
          "@type": "PostalAddress",
          streetAddress: NAP.streetAddress,
          addressLocality: NAP.locality,
          addressRegion: NAP.region,
          postalCode: NAP.postalCode,
          addressCountry: NAP.country,
        },
        areaServed: ["Poá", "São Paulo", "Brasil"],
        sameAs: [NAP.instagram, NAP.googleBusinessProfile],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: NAP.name,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function buildServiceJsonLd({
  slug,
  name,
  description,
  pageUrl,
}: {
  slug: string;
  name: string;
  description: string;
  pageUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/servicos/${slug}#service`,
    name,
    description,
    url: pageUrl,
    provider: { "@id": ORG_ID },
    areaServed: ["Poá", "São Paulo", "Brasil"],
  };
}

export function buildServicesListJsonLd(
  services: { slug: string; name: string; description: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((service) => ({
      "@type": "Service",
      "@id": `${SITE_URL}/servicos/${service.slug}#service`,
      name: service.name,
      description: service.description,
      url: `${SITE_URL}/servicos/${service.slug}`,
      provider: { "@id": ORG_ID },
      areaServed: ["Poá", "São Paulo", "Brasil"],
    })),
  };
}

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export type PersonInput = {
  slug: string;
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  url?: string;
  alumniOf?: string[];
  knowsAbout?: string[];
  sameAs?: string[];
};

function toAbsolute(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  const path = url.startsWith('/') ? url : `/${url}`;
  return `${SITE_URL}${path}`;
}

function buildPersonNode(person: PersonInput) {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/sobre#${person.slug}`,
    name: person.name,
    jobTitle: person.jobTitle,
    ...(person.description && { description: person.description }),
    ...(person.image && { image: toAbsolute(person.image) }),
    url: person.url ?? `${SITE_URL}/sobre#${person.slug}`,
    worksFor: { '@id': ORG_ID },
    ...(person.alumniOf &&
      person.alumniOf.length > 0 && {
        alumniOf: person.alumniOf.map((name) => ({
          '@type': 'EducationalOrganization',
          name,
        })),
      }),
    ...(person.knowsAbout &&
      person.knowsAbout.length > 0 && {
        knowsAbout: person.knowsAbout,
      }),
    ...(person.sameAs &&
      person.sameAs.length > 0 && {
        sameAs: person.sameAs.map(toAbsolute),
      }),
  };
}

export function buildPersonJsonLd(person: PersonInput) {
  return {
    '@context': 'https://schema.org',
    ...buildPersonNode(person),
  };
}

export function buildPeopleJsonLd(people: PersonInput[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': people.map((person) => buildPersonNode(person)),
  };
}

export function buildAggregateRatingJsonLd({
  ratingValue,
  reviewCount,
  reviews,
}: {
  ratingValue: number;
  reviewCount: number;
  reviews?: {
    author: string;
    datePublished: string;
    reviewBody: string;
    ratingValue: number;
  }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    ...(reviews &&
      reviews.length > 0 && {
        review: reviews.map((review) => ({
          "@type": "Review",
          author: { "@type": "Person", name: review.author },
          datePublished: review.datePublished,
          reviewBody: review.reviewBody,
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.ratingValue,
            bestRating: 5,
            worstRating: 1,
          },
        })),
      }),
  };
}
