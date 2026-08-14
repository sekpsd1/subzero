import Image from "next/image";
import Link from "next/link";
import { RevealVideo } from "./RevealVideo";
import styles from "./RevealPageContent.module.css";

const launchRevealUrl =
  "https://www.subzero-wolf.com/trade-resources/reveal/product-picker";
const learnMoreUrl =
  "https://www.subzero-wolf.com/assistance/answers/multi-brand/reveal-specification-tool";

const benefits = [
  {
    icon: "/assets/reveal/benefits/save-time.svg",
    title: "Save Time",
    copy: "In minutes, compile and organize accurate information. Save projects to your account and make changes at any time. Draft multiple configurations for flexible decision-making later.",
  },
  {
    icon: "/assets/reveal/benefits/reliably-accurate.svg",
    title: "Reliably Accurate",
    copy: "Feel confident knowing Reveal only allows compatible product configurations. The tool’s rolling, live updates ensure you always work with the most current specification information.",
  },
  {
    icon: "/assets/reveal/benefits/share-instantly.svg",
    title: "Share Instantly",
    copy: "Create a personalized PDF to print or share online instantly. Label configurations and add notes for project partners or clients.",
  },
  {
    icon: "/assets/reveal/benefits/flexible-specifications.svg",
    title: "Flexible Specifications",
    copy: "Includes individual opening, electrical, and plumbing specifications for all Sub-Zero, Wolf, and Cove products. View side-by-side and stacked installations for approved Sub-Zero and Wolf products.",
  },
  {
    icon: "/assets/reveal/benefits/intuitive-interface.svg",
    title: "Intuitive Interface",
    copy: "Arrange and reposition products on the digital canvas with the click and drag of a mouse. Repeat and save multiple configurations for dynamic kitchen design options.",
  },
] as const;

function LaunchReveal() {
  return (
    <a className={styles.cta} href={launchRevealUrl}>
      Launch Reveal
    </a>
  );
}

function SectionHeading({ children, id }: { children: React.ReactNode; id: string }) {
  return <h2 className={styles.sectionHeading} id={id}>{children}</h2>;
}

export function RevealPageContent() {
  return (
    <main className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/trade-resources">Trade Resources</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Reveal</span>
      </nav>

      <section className={styles.intro} aria-labelledby="reveal-title">
        <h1 id="reveal-title">Reveal Cabinetry Specifications</h1>
        <div className={styles.rule} />
        <Image
          className={styles.heroImage}
          src="/assets/reveal/reveal-hero.jpg"
          width={2000}
          height={875}
          sizes="(max-width: 767px) calc(100vw - 60px), 1110px"
          priority
          alt="Experience the efficiency of hassle-free, accurate Reveal Cabinetry Specifications with our intuitive, industry-first product configuration tool."
        />
        <p className={styles.introCopy}>
          Do more with Reveal. Experience the efficiency of hassle-free,
          accurate specification with our intuitive, industry-first product
          configuration tool.
        </p>
        <LaunchReveal />
      </section>

      <section className={styles.demoIntro} aria-labelledby="demo-title">
        <SectionHeading id="demo-title">See how simple appliance specification can be</SectionHeading>
        <div className={styles.rule} />
        <p>
          Reveal allows you to quickly access specifications for Sub-Zero,
          Wolf, and Cove products all in one place. This short demonstration
          walks you through the main capabilities of this easy-to-use tool.
        </p>
        <a className={styles.learnMore} href={learnMoreUrl}>
          Learn more about Reveal
        </a>
      </section>

      <section className={styles.videoSection} aria-label="Reveal demonstration video">
        <RevealVideo />
        <LaunchReveal />
      </section>

      <section className={styles.benefits} aria-labelledby="benefits-title">
        <SectionHeading id="benefits-title">Reap the benefits of Reveal</SectionHeading>
        <div className={styles.rule} />
        <div className={styles.benefitGrid}>
          {benefits.map((benefit) => (
            <article className={styles.benefit} key={benefit.title}>
              <Image
                className={styles.benefitIcon}
                src={benefit.icon}
                width={200}
                height={200}
                sizes="200px"
                unoptimized
                alt=""
                aria-hidden="true"
              />
              <h3>{benefit.title}</h3>
              <p>{benefit.copy}</p>
            </article>
          ))}
        </div>
        <LaunchReveal />
      </section>
    </main>
  );
}
