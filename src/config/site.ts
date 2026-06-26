/**
 * Single source of truth for brand + business information.
 *
 * Anything that might change (contact details, nav, social) lives here rather
 * than being hardcoded across components. Public-facing contact details are
 * read from NEXT_PUBLIC_* env vars where present, with sensible fallbacks so
 * the site still renders during local development without a .env file.
 */

const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+20 150 895 8733";
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "201508958733";

export const siteConfig = {
  name: "Grees",
  /** Used in <title> templates and footers. */
  legalName: "Grees Furniture Solutions",
  tagline: "Furniture for a Life Well Lived",
  description:
    "Handcrafted furniture for the moments that matter — sofas, sectionals, beds and TV units, designed and made to be part of your family's story for years to come.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://grees-and.vercel.app",
  locale: "en",
  ogImage: "/images/sofas/cloud-1.webp",

  /**
   * Search keywords, bilingual (English + Arabic) so the brand surfaces for the
   * furniture terms buyers in Egypt actually search — in either language.
   */
  keywords: [
    "furniture",
    "أثاث",
    "modern furniture",
    "أثاث مودرن",
    "luxury furniture",
    "أثاث فاخر",
    "custom furniture",
    "تفصيل أثاث",
    "furniture finishes",
    "تشطيبات",
    "sofas",
    "كنب",
    "كنبة",
    "sectional sofa",
    "ركنة",
    "ركنات",
    "beds",
    "سرير",
    "سراير",
    "upholstered bed",
    "TV unit",
    "مكتبة تلفزيون",
    "reupholstery",
    "تنجيد",
    "تجديد أثاث",
    "furniture Egypt",
    "أثاث مصر",
    "furniture Cairo",
    "أثاث القاهرة",
    "Sheikh Zayed",
    "New Cairo",
    "Sahel",
    "Grees",
  ],

  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "minasalama123@gmail.com",
    phone,
    /** WhatsApp deep link (digits only, no +). */
    whatsapp: `https://wa.me/${whatsappNumber}`,
    address: {
      line1: "14 Gezira Avenue",
      line2: "Zamalek",
      city: "Cairo",
      country: "Egypt",
    },
    /** Embed URL for the contact map (no API key required). */
    mapEmbedUrl:
      "https://www.google.com/maps?q=Zamalek,Cairo,Egypt&output=embed",
    hours: "By appointment · Sun–Thu, 10:00–18:00",
  },

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61578053159716",
  },

  /**
   * Primary navigation shared by header and footer. Most items are sections on
   * the home page (anchor links); only About is its own route. The full
   * Collections and Contact pages remain reachable via in-section buttons.
   */
  nav: [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/#collections" },
    { label: "Projects", href: "/#work" },
    { label: "Our Story", href: "/about" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
