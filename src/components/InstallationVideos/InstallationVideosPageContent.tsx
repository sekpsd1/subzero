import Image from "next/image";
import Link from "next/link";
import styles from "./InstallationVideosPageContent.module.css";

const videos = [
  {
    title: "CLASSIC SERIES REFRIGERATION",
    description:
      "Learn how to properly prepare the site and install Classic Series unit and panels.",
    href: "/trade-resources/installation-videos/built-in",
    image: "/assets/trade-resources/installation-videos/classic-series.jpg",
    alt: "Classic Series refrigeration installed in a bright kitchen",
  },
  {
    title: "DESIGNER SERIES REFRIGERATION AND WINE STORAGE",
    description:
      "Step-by-step guides for correctly installing Designer Series Refrigeration and Wine Storage.",
    href: "/trade-resources/installation-videos/integrated-new-generation",
    image: "/assets/trade-resources/installation-videos/designer-series.jpg",
    alt: "Designer Series refrigeration and wine storage in a contemporary kitchen",
  },
  {
    title: "DESIGNER SERIES REFRIGERATION AND WINE STORAGE - LEGACY MODELS",
    description:
      "Legacy models of Designer Series Refrigeration and Wine Storage require special installation. Learn the nuances in this video.",
    href: "/trade-resources/installation-videos/integrated-earlier-models",
    image: "/assets/trade-resources/installation-videos/designer-legacy.jpg",
    alt: "Legacy Designer Series refrigeration and wine storage installation",
  },
  {
    title: "COVE DISHWASHERS",
    description:
      "This video and the accompanying checklist ensures every step of installation is seamless.",
    href: "/trade-resources/installation-videos/cove-videos",
    image: "/assets/trade-resources/installation-videos/cove-dishwashers.jpg",
    alt: "Cove dishwasher installed in a white kitchen",
  },
] as const;

export function InstallationVideosPageContent() {
  return (
    <main className={styles.page} id="main-content">
      <div className={styles.breadcrumbContainer}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true" />
          <Link href="/trade-resources">Trade Resources</Link>
          <span aria-hidden="true" />
          <span aria-current="page">Installation Videos</span>
        </nav>
      </div>

      <section className={styles.introduction}>
        <div className={styles.sectionTitle}>
          <h1>Installation Videos</h1>
        </div>
        <p>
          To ensure our products perform and look their very best, correct installation is key. The following videos provide a visual guide for installing several Sub-Zero and Cove appliances and highlight noteworthy details that require special attention. Before you begin installation, we recommend viewing the applicable video in its entirety.
        </p>
      </section>

      <section className={styles.videoList} aria-label="Installation video categories">
        {videos.map((video, index) => (
          <article
            className={`${styles.videoItem} ${index % 2 === 1 ? styles.videoItemReverse : ""}`}
            key={video.href}
          >
            <div className={styles.videoRow}>
              <div className={styles.imageColumn}>
                <Image
                  className={styles.videoImage}
                  src={video.image}
                  alt={video.alt}
                  width={300}
                  height={200}
                  sizes="(max-width: 767px) 300px, 300px"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
              <div className={styles.videoCopy}>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <Link className={styles.cta} href={video.href}>
                  Watch Videos
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.additionalResources}>
        <div className={styles.sectionTitle}>
          <h2>Additional resources</h2>
        </div>
        <p>
          Find additional installation guides in our Specifications Library or contact our Customer Care team at{" "}
          <a href="tel:8002227820">(800) 222-7820</a>.
        </p>
        <Link className={styles.cta} href="/trade-resources/product-specifications">
          Specification Library
        </Link>
      </section>
    </main>
  );
}
