import type { Category } from "@/lib/catalog/types";

/**
 * Seed catalog: categories.
 *
 * Edit this file to add/rename categories. Each category's `slug` is the URL
 * segment (/categories/[slug]) and is referenced by products via
 * `categorySlug`. Keep slugs lowercase and hyphenated.
 *
 * Images are served from /public/images (local, optimized by next/image).
 * Covers reuse a strong scene from within each category.
 */
export const categories: Category[] = [
  {
    slug: "sofas",
    name: "Sofas",
    tagline: "The heart of the room",
    description:
      "Deep, tactile seating made for everyday life — from feather-soft three-seaters to clean contemporary lines. كنب وكنبات مودرن بكل المقاسات والتشطيبات.",
    cover: {
      src: "/images/sofas/skyline-1.webp",
      alt: "A tailored charcoal sofa on a warm walnut base",
      width: 1600,
      height: 1600,
    },
    coverFit: "contain",
    order: 1,
    subcategories: [{ slug: "sofas", name: "Sofas" }],
  },
  {
    slug: "living-room",
    name: "Living Room",
    tagline: "Where the day softens",
    description:
      "Sectionals conceived as the quiet centre of a home — generous proportions, soft fabrics, and configurations that wrap a space. ركنات وسكشنال بتصميمات عصرية.",
    cover: {
      src: "/images/delivered/grey-modular-sectional.jpg",
      alt: "A large grey modular sectional styled in a living room",
      width: 1600,
      height: 1200,
    },
    order: 2,
    subcategories: [{ slug: "sectionals", name: "Sectionals" }],
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    tagline: "Stillness, made tangible",
    description:
      "Upholstered beds designed for rest — wrapped headboards, soft tactile fabrics, and frames built to anchor a room, with optional lift-up storage. سراير بتنجيد فاخر وتشطيبات متعددة وقاعدة تخزين.",
    cover: {
      src: "/images/beds/haven-3.webp",
      alt: "A low blue upholstered bed with a soft wrapped headboard",
      width: 1600,
      height: 1600,
    },
    coverFit: "contain",
    order: 3,
    subcategories: [{ slug: "beds", name: "Beds" }],
  },
  {
    slug: "tv-units",
    name: "TV Units",
    tagline: "Grounded and grain-forward",
    description:
      "Long, low media consoles in solid wood veneers — handleless storage that sits quietly beneath the screen. مكتبات تلفزيون ووحدات تخزين بقشرة خشب طبيعي.",
    cover: {
      src: "/images/tv-units/day-black-oak.webp",
      alt: "A long, low media console in black oak",
      width: 1800,
      height: 700,
    },
    coverFit: "contain",
    order: 4,
    subcategories: [{ slug: "tv-units", name: "TV Units" }],
  },
];
