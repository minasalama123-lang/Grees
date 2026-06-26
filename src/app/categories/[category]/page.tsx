import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getActiveSubcategories,
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/catalog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/catalog/PageHeader";
import { CategoryProducts } from "@/components/catalog/CategoryProducts";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export const revalidate = 300;

// Pre-render every category at build time.
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return buildMetadata({
    title: `${category.name} — ${category.tagline}`,
    description: category.description,
    path: `/categories/${category.slug}`,
    image: category.cover.src,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [products, subcategories] = await Promise.all([
    getProductsByCategory(category.slug),
    getActiveSubcategories(category),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- trusted, server-generated JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Collections", url: "/categories" },
              { name: category.name, url: `/categories/${category.slug}` },
            ]),
          ),
        }}
      />
      <PageHeader
        eyebrow="Collection"
        title={category.name}
        description={category.description}
      />
      <Container className="pb-24">
        <CategoryProducts products={products} subcategories={subcategories} />
      </Container>
    </>
  );
}
