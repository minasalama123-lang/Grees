import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

/**
 * Full-viewport hero. Imagery is the hero — a single large, optimized photo
 * with `priority` so it is the LCP element, overlaid with a restrained
 * tagline and a single call to action to browse the collections.
 */
export function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[600px] w-full">
      {/* Lifestyle hero — the experience, not the product. A father and daughter
          sharing a warm, candid moment at home; the airy left side is kept clear
          for the copy overlay. */}
      <Image
        src="/Hero.jpeg"
        alt="A relaxed editorial scene of a person lounging on a Grees& sofa"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Scrim for legible copy. On mobile the narrow screen would be almost
          entirely covered by a left→right gradient (hiding the photo), so we use
          a gentle vertical scrim there and switch to the left gradient at md+.
          pointer-events-none: decorative only — never intercept button clicks. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/25 md:bg-gradient-to-r md:from-ink/75 md:via-ink/35 md:to-ink/5" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
      {/* Top scrim across the full width so the transparent header's white
          wordmark and nav links stay readable even over the bright right side
          of the photo. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/55 to-transparent" />

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-content px-6 md:px-10">
          <div className="max-w-xl animate-fade-up">
            <p className="font-sans text-xs uppercase tracking-luxe text-bone/80">
              Made for the moments that matter
            </p>
            <h1 className="mt-5 font-serif text-4xl font-light leading-tight text-bone md:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-bone/90">
              {siteConfig.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/categories" variant="primary">
                Explore Collections
              </Button>
              <Button
                href="/about"
                variant="outline-light"
                className="bg-ink/20 backdrop-blur-sm"
              >
                Our Craft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
