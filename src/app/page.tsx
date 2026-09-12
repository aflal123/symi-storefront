"use client";

import { useState } from "react";
import { Providers } from "@/components/providers";
import { AnnouncementBar } from "@/components/store/announcement-bar";
import { SiteHeader } from "@/components/store/site-header";
import { Hero } from "@/components/store/hero";
import { CategoryStrip } from "@/components/store/category-strip";
import { TheLatest } from "@/components/store/the-latest";
import { PromoBannerShowcase } from "@/components/store/promo-banner-showcase";
import { ShopByCategory } from "@/components/store/shop-by-category";
import { NewArrivals } from "@/components/store/new-arrivals";
import { LastChance } from "@/components/store/last-chance";
import { Story } from "@/components/store/story";
import { ShahmeeEventShowcase } from "@/components/store/shahmee-event-showcase";
import { InstagramWall } from "@/components/store/instagram-wall";
import { Newsletter } from "@/components/store/newsletter";
import { SiteFooter } from "@/components/store/site-footer";
import { ProductModal } from "@/components/store/product-modal";
import { AdminPortal } from "@/components/admin/admin-portal";
import { type Product } from "@/lib/site";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <Providers>
      <SiteHeader
        onOpenAdmin={() => setAdminOpen(true)}
        onSelectProduct={setSelectedProduct}
        onSelectCategory={setSelectedCategory}
      />
      <main className="flex-1">
        <Hero />
        <AnnouncementBar />
        <CategoryStrip onSelectCategory={setSelectedCategory} />
        <TheLatest
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProduct={setSelectedProduct}
        />
        <PromoBannerShowcase
          onSelectCategory={setSelectedCategory}
          onOpenAdmin={() => setAdminOpen(true)}
        />
        <ShopByCategory onSelectCategory={setSelectedCategory} />
        <NewArrivals onSelectProduct={setSelectedProduct} />
        <LastChance />
        <Story />
        <ShahmeeEventShowcase />
        <InstagramWall />
        <Newsletter />
      </main>
      <SiteFooter onSelectCategory={setSelectedCategory} />

      {/* Product Details Modal with Multi-Image Gallery */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Admin Portal Dashboard (Orders & Inventory) */}
      <AdminPortal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </Providers>
  );
}
