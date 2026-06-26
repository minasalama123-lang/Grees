import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Product } from "@/lib/catalog";

/**
 * SEO helpers — centralize metadata + JSON-LD construction so every page stays
 * consistent and the OG/Twitter tags never drift out of sync.
 */

const baseUrl = siteConfig.url;

/** Trim text to a meta-description-friendly length on a word boundary. */
export function clampText(text: string, max = 158): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

/** Build a page <Metadata> object with sane Open Graph / Twitter defaults. */
export function buildMetadata(opts: {
  title: string;
  description: string;
  /** Path beginning with "/" — becomes the canonical URL. */
  path: string;
  /** Page-specific social image. When omitted, the site-wide 1200×630
   *  app/opengraph-image (file convention) is used automatically. */
  image?: string;
}): Metadata {
  const url = new URL(opts.path, baseUrl).toString();
  const absoluteImage = opts.image
    ? opts.image.startsWith("http")
      ? opts.image
      : new URL(opts.image, baseUrl).toString()
    : undefined;

  return {
    title: opts.title,
    description: opts.description,
    keywords: [...siteConfig.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: opts.title,
      description: opts.description,
      siteName: siteConfig.name,
      ...(absoluteImage ? { images: [{ url: absoluteImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      ...(absoluteImage ? { images: [absoluteImage] } : {}),
    },
  };
}

/** JSON-LD Organization markup for the site root. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: baseUrl,
    logo: new URL("/icon.svg", baseUrl).toString(),
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    // Real brand social profiles (update the placeholder URLs in site.ts).
    sameAs: [siteConfig.social.instagram, siteConfig.social.pinterest],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.line1,
      addressLocality: siteConfig.contact.address.city,
      addressCountry: siteConfig.contact.address.country,
    },
  };
}

/** JSON-LD BreadcrumbList — feed it ordered { name, url } crumbs. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.url, baseUrl).toString(),
    })),
  };
}

/** JSON-LD Product markup. Includes an Offer when the product has a price. */
export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: product.images.map((i) =>
      i.src.startsWith("http") ? i.src : new URL(i.src, baseUrl).toString(),
    ),
    category: product.categorySlug,
    brand: { "@type": "Brand", name: siteConfig.name },
    material: product.materials.map((m) => m.name).join(", "),
    ...(product.price && product.price > 0
      ? {
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "EGP",
            availability: "https://schema.org/InStock",
            url: new URL(
              `/products/${product.slug}`,
              baseUrl,
            ).toString(),
          },
        }
      : {}),
  };
}
