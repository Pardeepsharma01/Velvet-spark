import { Suspense } from "react";
import { getProducts } from "@/lib/data/products";
import { ProductCardSkeleton } from "@/components/product/product-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import ShopContent from "./ShopContent";

// ─── Loading fallback ─────────────────────────────────────────────────────────

function ShopSkeleton() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="h-8 w-32 bg-charcoal-100 dark:bg-charcoal-600 rounded animate-pulse" />
          <div className="flex gap-8">
            <div className="hidden lg:block w-56 flex-shrink-0">
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-4 w-full bg-charcoal-100 dark:bg-charcoal-600 rounded animate-pulse" />
                ))}
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 6 }, (_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ─── Shop Page (Server Component) ─────────────────────────────────────────────

export default async function ShopPage() {
  const { data: products } = await getProducts();

  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopContent allProducts={products ?? []} />
    </Suspense>
  );
}
