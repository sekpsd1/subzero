"use client";

import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./TradeResourcesPageContent.module.css";

const assetRoot = "/assets/trade-resources";

const shortcuts = [
  { title: "Specification Library", image: `${assetRoot}/icon-specification.png`, href: "/trade-resources/product-specifications" },
  { title: "Reveal Specification Tool", image: `${assetRoot}/icon-reveal.png`, target: "reveal-tool" },
  { title: "Brochure Maker", image: `${assetRoot}/icon-brochure.png`, target: "brochure-maker" },
  { title: "Your Trade Representative", image: `${assetRoot}/icon-representative.png`, target: "trade-representatives" },
  { title: "Mobile Specifications App", image: `${assetRoot}/icon-mobile-specs.png`, target: "mobile-specifications" },
  { title: "Installation Videos", image: `${assetRoot}/icon-videos.png`, target: "installation-videos" },
  { title: "Continuing Education Units", image: `${assetRoot}/icon-education.png`, target: "continuing-education" },
  { title: "Kitchen Design Contest", image: `${assetRoot}/icon-contest.png`, target: "kitchen-design-contest" },
] as const;

const tools = [
  {
    id: "reveal-tool",
    title: "REVEAL SPECIFICATION TOOL",
    copy: "This intuitive, easy-to-use tool simplifies the Sub-Zero, Wolf, and Cove appliance specification process. It provides accurate, up-to-date specifications in minutes, and allows you to save, share, and edit your selections with ease. It offers precise specification for hassle-free installation and beautiful results.",
    cta: "Launch Reveal",
    href: "/trade-resources/reveal",
    image: `${assetRoot}/reveal-tool.jpg`,
    alt: "A finished kitchen transitioning into a Reveal specification drawing",
  },
  {
    id: "brochure-maker",
    title: "BROCHURE MAKER",
    copy: "Effortlessly create custom brochures for your clients and partners. Select your custom suite of products, then tailor the brochure with high-level product details and specifications. This tool makes it easy to share, save, and edit your brochures.",
    cta: "Launch Brochure Maker",
    href: "/trade-resources/brochure-maker/product-select",
    image: `${assetRoot}/brochure-maker.jpg`,
    alt: "Contemporary kitchen with Sub-Zero and Wolf appliances",
  },
  {
    id: "mobile-specifications",
    title: "MOBILE SPECIFICATIONS APP",
    copy: "This app offers convenient, on-the-go access to Sub-Zero, Wolf, and Cove specifications—anytime, anywhere. This comprehensive resource puts the most up-to-date information at your fingertips and enables instant sharing with partners, clients, and installers.",
    cta: "Learn More",
    href: "/trade-resources/specifications-app",
    image: `${assetRoot}/mobile-specifications.jpg`,
    alt: "Product specifications displayed on a mobile device",
  },
] as const;

const resourceLinks = [
  {
    id: "trade-shows",
    title: "TRADE SHOWS",
    copy: "Be the first to experience new products by connecting with us at upcoming trade shows. We look forward to showing you the latest innovations from Sub-Zero, Wolf, and Cove.",
    href: "/trade-resources/trade-shows",
    image: `${assetRoot}/trade-shows.jpg`,
    alt: "Sub-Zero, Wolf, and Cove appliances displayed at a trade show",
  },
  {
    id: "continuing-education",
    title: "CONTINUING EDUCATION UNITS",
    copy: "Cultivate your expertise via relevant and inspiring continuing education courses. We are pleased to offer complimentary CEU courses through Hanley Wood University’s online learning program and your local distributor.",
    href: "/trade-resources/continuing-education",
    image: `${assetRoot}/continuing-education.jpg`,
    alt: "A presenter leading a continuing education course",
  },
  {
    id: "future-products",
    title: "FUTURE PRODUCT UPDATES",
    copy: "Stay ahead of the rest by subscribing to Sub-Zero, Wolf, and Cove product news. Check here for estimated consumer availability dates and to receive updates directly in your inbox.",
    href: "/trade-resources/future-product-update",
    image: `${assetRoot}/future-products.jpg`,
    alt: "A digital display showing future appliance product information",
  },
] as const;

const associations = [
  { name: "The American Institute of Architects", href: "https://www.aia.org/", image: `${assetRoot}/association-aia.jpg` },
  { name: "American Society of Interior Designers", href: "https://www.asid.org/", image: `${assetRoot}/association-asid.svg` },
  { name: "American Society of Landscape Architects", href: "https://www.asla.org/", image: `${assetRoot}/association-asla.jpg` },
  { name: "National Kitchen and Bath Association", href: "https://nkba.org/", image: `${assetRoot}/association-nkba.jpg` },
  { name: "National Association of Home Builders", href: "https://www.nahb.org/", image: `${assetRoot}/association-nahb.svg` },
  { name: "National Association of the Remodeling Industry", href: "https://www.nari.org/", image: `${assetRoot}/association-nari.svg` },
] as const;

const contestImages = [
  ["contest-brighton.jpg", "Brighton House kitchen design"],
  ["contest-redwood.jpg", "Redwood Retreat kitchen design"],
  ["contest-texas.jpg", "Texas Hill Country kitchen design"],
  ["contest-kenley.jpg", "Kenley Court Residence kitchen design"],
  ["contest-red-door.jpg", "Red Door Retreat kitchen design"],
  ["contest-centennial.jpg", "Centennial Park Residence kitchen design"],
] as const;

function Cta({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.cta} href={href}>{children}</Link>;
}

export function TradeResourcesPageContent() {
  const [productQuery, setProductQuery] = useState("");
  const [productError, setProductError] = useState("");
  const [representativeType, setRepresentativeType] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [representativeError, setRepresentativeError] = useState("");
  const [representativeUnavailable, setRepresentativeUnavailable] = useState(false);

  function scrollToSection(id: string) {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    section.focus({ preventScroll: true });
  }

  function submitProductSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = productQuery.trim();
    if (!query) {
      setProductError("Enter a product name or number to search.");
      return;
    }
    setProductError("");
    window.location.assign(`/trade-resources/product-specifications?search=${encodeURIComponent(query)}`);
  }

  function submitRepresentativeSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!representativeType) {
      setRepresentativeError("Select the type of representative you are looking for.");
      return;
    }
    if (!/^\d{5}(?:-\d{4})?$/.test(zipCode.trim())) {
      setRepresentativeError("Enter a valid 5-digit ZIP Code or ZIP+4.");
      return;
    }
    setRepresentativeError("");
    setRepresentativeUnavailable(true);
  }

  return (
    <main className={styles.page} id="main-content">
      <div className={styles.breadcrumbWrap}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">›</span><span aria-current="page">Trade Resources</span>
        </nav>
      </div>

      <section className={styles.introduction}>
        <h1>Trade Resources</h1>
        <p>
          We are here to provide you the resources, information, and assistance you need to easily specify, configure, and install our products. Browse the resources we have curated for you below, or call our dedicated trade support line at{" "}
          <a href="tel:8666899653">(866) 689-9653</a>.
        </p>
      </section>

      <nav className={styles.shortcutGrid} aria-label="Trade resource shortcuts">
        {shortcuts.map((shortcut) => {
          const content = <><span className={styles.shortcutTitle}>{shortcut.title}</span><Image src={shortcut.image} alt="" width={98} height={98} /></>;
          return "href" in shortcut ? (
            <Link className={styles.shortcut} href={shortcut.href} key={shortcut.title}>{content}</Link>
          ) : (
            <button className={styles.shortcut} type="button" onClick={() => scrollToSection(shortcut.target)} key={shortcut.title}>{content}</button>
          );
        })}
      </nav>

      <section className={`${styles.section} ${styles.localResources}`}>
        <h2>Local resources</h2>
        <p className={styles.lead}>Our network of showrooms, retailers, installers, and servicers spans the globe. No matter where you are or what you need, you will find local resources and support to assist you.</p>
        <div className={styles.localGrid}>
          <article>
            <h3>Official showrooms</h3>
            <Image src={`${assetRoot}/official-showroom.jpg`} alt="Official Sub-Zero, Wolf, and Cove appliance showroom" width={300} height={200} sizes="(max-width: 767px) 300px, 300px" />
            <p>Offering a host of opportunities to experience Sub-Zero, Wolf, and Cove, our showroom is a powerful aid in making your client’s ideal home a reality. Meet with your trade representative and clients, get hands on with our latest products and technologies, and attend industry-exclusive events and trainings.</p>
            <Cta href="/locations">Find Showroom</Cta>
          </article>
          <article>
            <h3>Factory Certified Installation</h3>
            <Image src={`${assetRoot}/factory-installation.jpg`} alt="Factory Certified Installation professionals" width={300} height={200} sizes="(max-width: 767px) 300px, 300px" />
            <p>Enjoy the peace of mind that comes with Factory Certified Installation. These handpicked, trained, and highly skilled professionals provide a white-glove, worry-free installation experience.</p>
            <Cta href="/locator#type=installer">Find Installer</Cta>
          </article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.specifications}`}>
        <h2>Product specifications and guides</h2>
        <p className={styles.lead}>Quickly access a comprehensive collection of product specifications, design guides, and other resources. Search by model or serial number or product name (for example: “BI-30” or “M Series”). To browse all product specifications, visit our <Link href="/trade-resources/product-specifications">Specifications Library</Link>.</p>
        <div className={styles.productSearchBlock}>
          <form className={styles.productSearch} onSubmit={submitProductSearch} noValidate>
            <button type="submit" aria-label="Search product specifications"><Search aria-hidden="true" size={18} /></button>
            <input aria-label="Product name or number" placeholder="Enter product name or number" value={productQuery} onChange={(event) => setProductQuery(event.target.value)} />
            <button type="button" aria-label="Clear product search" onClick={() => { setProductQuery(""); setProductError(""); }}><X aria-hidden="true" size={28} strokeWidth={1} /></button>
          </form>
          {productError ? <p className={styles.formError} role="alert">{productError}</p> : null}
          <a className={styles.helperLink} href="https://www.subzero-wolf.com/-/media/files/united-states/product-downloads/sub-zero-wolf/misc/subzero_wolf_cove_serial_numbers_guide.pdf" target="_blank" rel="noopener noreferrer">How to locate your model and serial number</a>
        </div>
      </section>

      <section className={`${styles.section} ${styles.tools}`} aria-label="Professional specification tools">
        {tools.map((tool, index) => (
          <article className={styles.toolRow} id={tool.id} tabIndex={-1} key={tool.title}>
            <div className={styles.toolCopy}>
              <h3>{tool.title}</h3><p>{tool.copy}</p><Cta href={tool.href}>{tool.cta}</Cta>
            </div>
            <Image src={tool.image} alt={tool.alt} width={300} height={200} sizes="(max-width: 767px) calc(100vw - 60px), 300px" className={styles.toolImage} />
            {index === 2 ? null : <span className={styles.rowDivider} aria-hidden="true" />}
          </article>
        ))}
      </section>

      <section className={`${styles.section} ${styles.representatives}`} id="trade-representatives" tabIndex={-1}>
        <h2>Trade representatives</h2>
        <p className={styles.lead}>Trade representatives are your dedicated resource for all things Sub-Zero, Wolf, and Cove. These professionals are experts in recognizing and catering to your unique needs as a trade professional. They provide timely and vital information, resources, and support you need to create extraordinary kitchens and homes for your clients. Connect with your trade representative by entering your zip code in the search bar below.</p>
        {representativeUnavailable ? (
          <div className={styles.unavailable} role="status">
            <p>Online representative results are not available on this regional site yet. Please call <a href="tel:8666899653">(866) 689-9653</a> for trade support.</p>
            <button className={styles.cta} type="button" onClick={() => setRepresentativeUnavailable(false)}>Search Again</button>
          </div>
        ) : (
          <form className={styles.repForm} onSubmit={submitRepresentativeSearch} noValidate>
            <fieldset>
              <legend className={styles.srOnly}>I am searching for a</legend>
              {["Builder/Developer Representative", "Design Professional Representative", "Remodeler/Contractor Representative"].map((label) => (
                <label key={label}><input type="radio" name="representative-type" value={label} checked={representativeType === label} onChange={(event) => setRepresentativeType(event.target.value)} /><span>{label}</span></label>
              ))}
            </fieldset>
            <div className={styles.repSearchRow}>
              <input aria-label="ZIP Code" inputMode="numeric" autoComplete="postal-code" placeholder="Zip Code" value={zipCode} onChange={(event) => setZipCode(event.target.value)} />
              <button className={styles.cta} type="submit">Find Your Representative</button>
            </div>
            <p className={styles.formError} role="alert" aria-live="polite">{representativeError}</p>
          </form>
        )}
      </section>

      <section className={`${styles.section} ${styles.installation}`} id="installation-videos" tabIndex={-1}>
        <h2>Installation videos</h2>
        <div className={styles.mediaFeature}>
          <Image src={`${assetRoot}/installation-videos.jpg`} alt="Kitchen prepared for appliance installation" width={300} height={200} sizes="(max-width: 767px) calc(100vw - 60px), 300px" />
          <div><p>Glean valuable information when preparing for a seamless installation with the help of these animated, step-by-step video guides.</p><Cta href="/trade-resources/installation-videos">Watch Videos</Cta></div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.contest}`} id="kitchen-design-contest" tabIndex={-1}>
        <h2>Kitchen Design Contest</h2>
        <p className={styles.lead}>Thirteen innovative design projects were recently named Global Winners of the 2019-2021 Kitchen Design Contest at the Winners&apos; Summit and Gala in Nashville, Tennessee. View the winners below.</p>
        <div className={styles.contestGallery} aria-label="Kitchen Design Contest winning projects">
          {contestImages.map(([image, alt]) => <Image key={image} src={`${assetRoot}/${image}`} alt={alt} width={640} height={384} sizes="(max-width: 767px) 82vw, 33.333vw" />)}
        </div>
        <Cta href="/trade/kitchen-design-contest">View 2019-2021 Global Winners</Cta>
      </section>

      <section className={`${styles.section} ${styles.resourceLinks}`} aria-label="More professional resources">
        {resourceLinks.map((resource) => (
          <article id={resource.id} tabIndex={-1} key={resource.title}>
            <h3><Link href={resource.href}>{resource.title}</Link></h3>
            <Link href={resource.href} className={styles.resourceImage}><Image src={resource.image} alt={resource.alt} width={300} height={200} sizes="(max-width: 767px) 300px, 300px" /></Link>
            <p>{resource.copy}</p>
          </article>
        ))}
      </section>

      <section className={`${styles.section} ${styles.associations}`}>
        <h2>Professional associations</h2>
        <p className={styles.lead}>Supporting you is our goal. Therefore, we are proud to partner with the following professional associations.</p>
        <div className={styles.associationGrid}>
          {associations.map((association) => (
            <a href={association.href} target="_blank" rel="noopener noreferrer" aria-label={association.name} key={association.name}>
              <Image src={association.image} alt={association.name} width={235} height={93} sizes="(max-width: 767px) 140px, 235px" />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
