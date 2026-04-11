import { notFound } from "next/navigation";
import { getProductBySlug, getProductsByCategory } from "@/lib/data/products";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const { data: product } = await getProductBySlug(slug);

  if (!product) notFound();

  // Related products: same category, exclude this one
  const { data: related } = await getProductsByCategory(product.category);
  const relatedProducts = (related ?? []).filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <Section spacing="lg">
        <Container>
          <div className="flex flex-col gap-8">
            {/* Breadcrumbs */}
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: product.category.charAt(0).toUpperCase() + product.category.slice(1), href: `/shop?category=${product.category}` },
              { label: product.name },
            ]} />

            {/* Main content — client component for interactivity */}
            <ProductDetailClient product={product} />
          </div>
        </Container>
      </Section>

      {/* ══ Related Products ═════════════════════════════════════════════ */}
      {relatedProducts.length > 0 && (
        <Section spacing="lg" bg="ivory">
          <Container>
            <div className="flex flex-col gap-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal dark:text-ivory">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
