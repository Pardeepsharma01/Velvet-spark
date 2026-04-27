import Hero from "@/components/landing-page/Hero";
import BrandStory from "@/components/landing-page/BrandStory";
import Collections from "@/components/landing-page/Collections";
import Testimonials from "@/components/landing-page/Testimonials";
import Newsletter from "@/components/landing-page/Newsletter";
import WhyUs from "@/components/landing-page/WhyUs";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  return (
    <main className="bg-ivory overflow-x-hidden">
      <Hero />
      <BrandStory />
      <Collections />
      <WhyUs />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
