"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { brochureBrands, type BrochureProduct } from "./brochure-products";
import styles from "./BrochureMakerPage.module.css";

const STORAGE_KEY = "brochure-maker:selected-products";
const CONFIGURATION_PATH = "/trade-resources/brochure-maker/product-configuration";

const steps = [
  "Select products",
  "Specification details",
  "Client details",
  "Create brochure",
] as const;

export function BrochureMakerPage() {
  const router = useRouter();
  const [openCategories, setOpenCategories] = useState<Set<string>>(() => new Set());
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(() => new Set());
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const stored = window.sessionStorage.getItem(STORAGE_KEY);
        if (stored) setSelectedProducts(new Set(JSON.parse(stored) as string[]));
      } catch {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } finally {
        setStorageReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...selectedProducts]));
  }, [selectedProducts, storageReady]);

  function toggleCategory(key: string) {
    setOpenCategories((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleProduct(id: string) {
    setSelectedProducts((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const canContinue = selectedProducts.size > 0;

  return (
    <main className={styles.page} id="main-content">
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <ChevronRight aria-hidden="true" />
        <Link href="/trade-resources">Trade Resources</Link>
        <ChevronRight aria-hidden="true" />
        <span aria-current="page">Brochure Maker</span>
      </nav>

      <section className={styles.introduction}>
        <h1>Brochure Maker</h1>
        <span className={styles.titleRule} aria-hidden="true" />
        <p>
          Effortlessly create custom brochures for your clients and partners. Select your custom suite of products, then tailor the brochure
          with high-level product details and specifications. This tool makes it easy to share, save, and edit your brochures.
        </p>
      </section>

      <ol className={styles.steps} aria-label="Brochure maker progress">
        {steps.map((step, index) => (
          <li key={step} className={index === 0 ? styles.activeStep : undefined} aria-current={index === 0 ? "step" : undefined}>
            <span className={styles.stepNumber}>{index + 1}</span>
            {index === 0 ? <Link href="/trade-resources/brochure-maker/product-select">{step}</Link> : <span>{step}</span>}
            {index < steps.length - 1 ? <span className={styles.stepLine} aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>

      <section className={styles.catalog} aria-label="Select products">
        <div className={styles.brandGrid}>
          {brochureBrands.map((brand) => (
            <section className={styles.brand} key={brand.brand}>
              <h2>{brand.heading}</h2>
              <div className={styles.categoryList}>
                {brand.categories.map((category) => {
                  const key = `${brand.brand}:${category.label}`;
                  const isOpen = openCategories.has(key);
                  const panelId = `products-${key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

                  return (
                    <div className={styles.category} key={category.label}>
                      <button
                        type="button"
                        className={styles.categoryButton}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleCategory(key)}
                      >
                        <span>{category.label}</span>
                        <ChevronDown className={isOpen ? styles.openChevron : undefined} aria-hidden="true" />
                      </button>
                      {isOpen ? (
                        <div className={styles.productList} id={panelId}>
                          {category.products.length ? category.products.map((product) => (
                            <ProductOption
                              key={product.id}
                              product={product}
                              selected={selectedProducts.has(product.id)}
                              onToggle={toggleProduct}
                            />
                          )) : <p className={styles.emptyState}>No products are available in the current catalog.</p>}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.continueButton}
            disabled={!canContinue}
            onClick={() => router.push(CONFIGURATION_PATH)}
          >
            Continue
          </button>
        </div>
      </section>
    </main>
  );
}

const ProductOption = memo(function ProductOption({
  product,
  selected,
  onToggle,
}: {
  product: BrochureProduct;
  selected: boolean;
  onToggle: (id: string) => void;
}) {
  const inputId = `brochure-${product.id.replace(/[^a-zA-Z0-9]+/g, "-")}`;

  return (
    <label className={selected ? `${styles.productOption} ${styles.productSelected}` : styles.productOption} htmlFor={inputId}>
      <input
        id={inputId}
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(product.id)}
        aria-label={`${product.model} ${product.name}`}
      />
      <span className={styles.customCheckbox} aria-hidden="true" />
      <span className={styles.productImage}>
        <Image src={product.image} alt="" width={90} height={80} sizes="90px" loading="lazy" />
      </span>
      <span className={styles.productCopy}>
        <strong>{product.model}</strong>
        {product.isNew ? <span className={styles.newBadge}>New</span> : null}
        <span>{product.name}</span>
      </span>
    </label>
  );
});
