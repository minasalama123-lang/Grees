import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Our Story",
  description:
    "Grees& builds furniture around transparency and flexibility — helping clients visualize, choose, and receive pieces designed for real people and real spaces.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Top padding clears the fixed header. */}
      <Container className="pb-16 pt-36 md:pb-24 md:pt-44">
        <Reveal>
          <SectionHeading as="h1" title="Our Story" />
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <Reveal delay={120}>
            <div className="max-w-3xl space-y-5 font-sans text-lg leading-relaxed text-clay">
              <p>
                Grees& started after seeing the same frustrations in the
                furniture market — delayed deliveries, uncertain quality, and
                limited customization.
              </p>
              <p>
                So we built Grees& around transparency and flexibility: before
                anything is made, we help you visualize the piece and decide with
                confidence.
              </p>
              <ul className="space-y-1 border-l border-brass pl-6 font-serif text-2xl font-light text-ink">
                <li>Less uncertainty.</li>
                <li>More clarity.</li>
                <li>Better quality.</li>
              </ul>
              <p>
                Because great furniture isn’t just about how it looks — it’s
                about how it fits your life.
              </p>
            </div>
          </Reveal>

          {/* Tall accent image — desktop only, sticks while the story scrolls. */}
          <Reveal delay={200} className="hidden lg:block">
            <div className="relative aspect-[3/4] overflow-hidden bg-sand lg:sticky lg:top-28">
              <Image
                src="https://images.unsplash.com/photo-1611486212557-88be5ff6f941?auto=format&fit=crop&w=900&h=1200&q=80"
                alt="A craftsperson hand-finishing a piece of furniture"
                fill
                sizes="20rem"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>

      {/* CTA */}
      <Container className="py-24 text-center">
        <Reveal className="mx-auto max-w-xl">
          <h2 className="font-serif text-3xl font-light text-ink md:text-4xl">
            Have a space in mind?
          </h2>
          <p className="mt-5 font-sans text-lg leading-relaxed text-clay">
            Tell us about the room and how you want to use it. We will help you
            visualize the options before anything is made.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="primary">
              Start a Conversation
            </Button>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
