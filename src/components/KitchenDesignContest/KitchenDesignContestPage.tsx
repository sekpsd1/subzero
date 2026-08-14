"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./KitchenDesignContestPage.module.css";

const assetRoot = "/assets/trade-resources/kitchen-design-contest";

const resourceLinks = [
  ["Trade Resources", "/trade-resources"],
  ["Specification Library", "/trade-resources/product-specifications"],
  ["Reveal ↗", "/trade-resources/reveal"],
  ["Kitchen Design Contest", "/trade/kitchen-design-contest"],
  ["Brochure Maker ↗", "/trade-resources/brochure-maker/product-select"],
  ["Installation Videos", "/trade-resources/installation-videos"],
  ["Future Products", "/trade-resources/future-product-update"],
  ["Continuing Education (CEUs) ↗", "/trade-resources/continuing-education"],
] as const;

const timeline = [
  {
    date: "JAN 1, 2026 - DEC 31, 2027",
    title: "Entry period",
    copy: "Claim your place as one of the industry’s best of the best—enter today for your chance to gain recognition, grow your business, and elevate your career. The process is simpler than ever.",
    image: `${assetRoot}/entry-period-no-cove.png`,
    alt: "Kitchen Design Contest finalist announcement at an awards presentation",
  },
  {
    date: "FEBRUARY 2028",
    title: "Judging of projects",
    copy: "Judges evaluate all qualifying submissions based on best functional and aesthetic use of Sub-Zero and Wolf appliances and overall kitchen design.",
    image: `${assetRoot}/judges-original.avif`,
    alt: "Kitchen Design Contest judges gathered at the Global Campus",
  },
  {
    date: "MAY 2028",
    title: "Winners’ Summit & Gala",
    copy: "Finalists and the Student Winner will enjoy an exclusive four-day event filled with celebration, networking and unforgettable experiences.",
    image: `${assetRoot}/gala.avif`,
    alt: "Kitchen Design Contest Winners’ Summit and Gala venue",
  },
] as const;

const contestInformation = [
  ["Prizes", "Nearly $300,000 in prizes across multiple categories.", "/trade/kitchen-design-contest/prizes"],
  ["Rules", "The official rules of The Kitchen Design Contest.", "/trade/kitchen-design-contest/official-rules"],
  ["Judges", "Read more on the designers behind judging The Kitchen Design Contest.", "/trade/kitchen-design-contest/judges"],
  ["FAQs", "Frequently asked questions about the contest and entry.", "/trade/kitchen-design-contest/faqs"],
] as const;

export function KitchenDesignContestPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const enterButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!modalOpen) return;
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    const trigger = enterButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    first?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalOpen(false);
        return;
      }
      if (event.key !== "Tab" || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [modalOpen]);

  return (
    <main className={styles.page} id="main-content">
      <section className={styles.intro} aria-labelledby="kdc-introduction">
        <div className={styles.introInner}>
          <Image className={styles.kdcLogo} src={`${assetRoot}/kdc-logo.svg`} alt="KDC Kitchen Design Contest" width={683} height={374} priority />
          <h1 id="kdc-introduction">For more than 30 years, Sub-Zero, Wolf, and Cove have celebrated over 800 of the world&apos;s leading trade professionals and thousands of stunning design projects through the Kitchen Design Contest. Enter your most exceptional work and be recognized on a global stage.</h1>
        </div>
      </section>

      <nav className={styles.resourceNav} aria-label="Trade Resources">
        <div className={styles.resourceNavInner}>
          {resourceLinks.map(([label, href]) => (
            <Link href={href} key={label} aria-current={href === "/trade/kitchen-design-contest" ? "page" : undefined}>{label}</Link>
          ))}
        </div>
      </nav>

      <section className={styles.hero} aria-labelledby="contest-title">
        <p className={styles.eyebrow}>2026-2027 CONTEST NOW OPEN</p>
        <h2 id="contest-title">Kitchen Design Contest</h2>
        <p className={styles.heroCopy}>The 2026-2027 contest is now open. Don&apos;t miss your chance to showcase your best work for a chance to achieve career-building recognition, win cash prizes, and connect with your peers at the unforgettable Summit and Gala. Entry is free, and you can submit as many projects as you like.</p>
        <button ref={enterButtonRef} className={styles.primaryButton} type="button" onClick={() => setModalOpen(true)}>Enter now</button>
      </section>

      <section className={styles.timelineSection} aria-labelledby="timeline-title">
        <h2 id="timeline-title">Contest Timeline</h2>
        <div className={styles.timelineGrid}>
          {timeline.map((item, index) => (
            <article className={styles.timelineCard} key={item.title}>
              <Image src={item.image} alt={item.alt} width={992} height={660} sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 33vw, 464px" loading={index === 0 ? "eager" : "lazy"} />
              <div className={styles.timelineCopy}>
                <p className={styles.cardDate}>{item.date}</p>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.infoSection} aria-labelledby="information-title">
        <h2 id="information-title">Contest Information</h2>
        <div className={styles.infoGrid}>
          {contestInformation.map(([title, copy, href]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
              <Link className={styles.secondaryButton} href={href}>Learn more</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.awardSection} aria-labelledby="award-title">
        <div className={styles.awardCard}>
          <div className={styles.awardCopy}>
            <div>
              <h2 id="award-title">Explore award-winning designs</h2>
              <p>Innovative, inspiring, impressive: discover which projects stood out to our judges.</p>
            </div>
            <Link className={styles.secondaryButton} href="/inspiration/kitchens">View for inspiration</Link>
          </div>
          <Image src={`${assetRoot}/award-winning-kitchen.avif`} alt="Award-winning bright kitchen with Sub-Zero refrigeration and Wolf cooking appliances" width={1920} height={1280} sizes="(max-width: 760px) calc(100vw - 40px), 75vw" loading="lazy" />
        </div>
      </section>

      <section className={styles.testimonialSection} aria-label="Kitchen Design Contest testimonial">
        <figure>
          <blockquote>“Don&apos;t pass up the opportunity. What a remarkable experience this is, and even if you don&apos;t win, just to be here and get to know people and see all the designs and talk to the judges. It&apos;s a wonderful experience, win or not.”</blockquote>
          <figcaption>Brandon Leroy, Jackson Leroy, First Place Transitional 2022-2023 KDC</figcaption>
        </figure>
      </section>

      {modalOpen ? (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false); }}>
          <div ref={dialogRef} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="leaving-site-title">
            <button className={styles.modalClose} type="button" onClick={() => setModalOpen(false)} aria-label="Close leaving site dialog">×</button>
            <h2 id="leaving-site-title">Leaving Site</h2>
            <p>You are now leaving the Sub-Zero and Wolf website. The site you are visiting is operated by a third party and has its own privacy and security policies.</p>
            <div className={styles.modalActions}>
              <a href="https://subzerogroup.secure-platform.com/site/organizations/main/home" target="_blank" rel="noopener noreferrer">Continue</a>
              <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
