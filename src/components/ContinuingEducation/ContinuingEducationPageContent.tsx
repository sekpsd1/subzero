import Image from "next/image";
import Link from "next/link";
import { RepresentativeSearchForm } from "./RepresentativeSearchForm";
import styles from "./ContinuingEducationPageContent.module.css";

const partners = [
  {
    name: "Continuing Education Partner AIA",
    href: "https://www.aia.org/",
    image: "/assets/trade-resources/continuing-education/aia.jpg",
  },
  {
    name: "Continuing Education Partner NKBA",
    href: "https://www.nkba.org/",
    image: "/assets/trade-resources/continuing-education/nkba.jpg",
  },
  {
    name: "Interior Design Continuing Education Council",
    href: "https://www.idcec.org/Pages/Forms/Public/About/About.aspx",
    image: "/assets/trade-resources/continuing-education/idcec.png",
  },
] as const;

export function ContinuingEducationPageContent() {
  return (
    <main className={styles.page} id="main-content">
      <div className={styles.breadcrumbContainer}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true" />
          <Link href="/trade-resources">Trade Resources</Link>
          <span aria-hidden="true" />
          <span aria-current="page">Continuing Education</span>
        </nav>
      </div>

      <section className={`${styles.section} ${styles.introduction}`}>
        <div className={styles.sectionTitle}>
          <h1>Continuing Education Units</h1>
        </div>
        <p>
          We are pleased to offer continuing education credits (CEUs) for members of the AIA, ASID, IDCEC, LA CES, NAHB, NARI, and NKBA via your local Sub-Zero, Wolf, and Cove trade representative and through the Sub-Zero, Wolf, and Cove online learning program. Available at no charge to you, this educational tool to help you stay up to date and achieve great professional success. Take an online course today.
        </p>
        <a
          className={styles.cta}
          href="https://learning.subzero-wolf.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore courses
        </a>
      </section>

      <section className={`${styles.section} ${styles.representativeSection}`}>
        <div className={styles.sectionTitle}>
          <h2>Schedule training with your trade representative</h2>
        </div>
        <p>
          Your local trade representative is dedicated to your needs. We encourage you to contact your representative to schedule trainings or to find more information about in-person trainings available in your area. Find your representative by entering your zip code in the search bar below.
        </p>
        <RepresentativeSearchForm />
      </section>

      <section className={`${styles.section} ${styles.partnershipSection}`}>
        <div className={styles.sectionTitle}>
          <h2>In partnership</h2>
        </div>
        <p>
          To present these continuing education courses, we are proud to partner with the following associations.
        </p>
        <div className={styles.partnerGrid}>
          {partners.map((partner) => (
            <a
              className={styles.partnerLink}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={partner.name}
              key={partner.name}
            >
              <span className={styles.partnerImage}>
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 767px) min(300px, calc(100vw - 60px)), 300px"
                />
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
