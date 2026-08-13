import {
  BadgeCheck,
  Play,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./OwnerResourcesPageContent.module.css";

const usa = "https://www.subzero-wolf.com";

const videos = [
  {
    title: "Wolf Dual Fuel and Sealed Burner Rangetop - Cleaning and Care",
    image: "/assets/owner-resources/video-rangetop-care.jpg",
    href: `${usa}/videos/dual-fuel-and-sealed-burner-grates-cleaning-and-care`,
  },
  {
    title: "Sub-Zero Designer Formerly Integrated - How To Replace the Water Filter",
    image: "/assets/owner-resources/video-water-filter.png",
    href: `${usa}/videos/Sub-Zero%20Designer%20Formerly%20Integrated%20How%20To%20Replace%20the%20Water%20Filter`,
  },
  {
    title: "Wolf M Series Oven - Convection Mode",
    image: "/assets/owner-resources/video-convection.png",
    href: `${usa}/videos/Wolf%20M%20Series%20Oven%20Convection%20Mode`,
  },
  {
    title: "Sub-Zero Classic Formerly Built-In - Interior Care and Configuration",
    image: "/assets/owner-resources/video-interior-care.png",
    href: `${usa}/videos/Sub-Zero%20Classic%20Formerly%20Built-In%20Interior%20Care%20and%20Configuration`,
  },
] as const;

const registrationBenefits = [
  "Easy access to guides on how to use and enjoy your appliances",
  "Quick links to relevant accessories to enhance and maintain your appliances",
  "Records of your past purchases for one-click reordering",
  "Information Sub-Zero, Wolf, and Cove can use to answer your questions faster",
] as const;

function Cta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className={styles.cta} href={href}>
      {children}
    </Link>
  );
}

function ProductInformationIcon() {
  return (
    <svg aria-hidden="true" className={`${styles.resourceIcon} ${styles.referenceIcon}`} viewBox="0 0 200 200">
      <path d="M45 24h92l28 28v124H45z" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M137 24v28h28" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="105" cy="103" r="35" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M105 91v29" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="105" cy="82" r="2.4" fill="currentColor" />
    </svg>
  );
}

function AccessoriesCollectionIcon() {
  return (
    <svg aria-hidden="true" className={`${styles.resourceIcon} ${styles.referenceIcon}`} viewBox="0 0 200 200">
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
        <path d="M24 55h62v47H24z" />
        <path d="m31 74 24-7 24 7-4 12-20-4-20 4z" />
        <path d="M101 29h63v40h-63z" />
        <path d="m109 42 24 11 22-2" />
        <path d="m110 40 3-7m20 20 1-8" />
        <circle cx="133" cy="30" r="9" />
        <path d="M133 25v10m-5-5h10" />
        <path d="M29 119h58v49H29z" />
        <path d="m36 130 34 30h12l-34-30z" />
        <path d="m41 135 31 1" />
        <path d="M101 79h52v70h-52z" />
        <path d="M117 91h18m-13-8h8v8" />
        <path d="M126 96c0 12-14 20-14 33 0 9 6 14 14 14s14-5 14-14c0-13-14-21-14-33z" />
        <circle cx="88" cy="102" r="9" />
        <path d="M88 97v10m-5-5h10" />
        <circle cx="153" cy="149" r="9" />
        <path d="M153 144v10m-5-5h10" />
        <circle cx="29" cy="168" r="9" />
        <path d="M29 163v10m-5-5h10" />
      </g>
    </svg>
  );
}

function FactoryCertifiedIcon() {
  return (
    <svg aria-hidden="true" className={styles.factoryCertifiedIcon} viewBox="0 0 160 160">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M22 25h45v54H22z" />
        <path d="M26 30h37v42H26zM28 80h33v7H28z" />
        <path d="M76 25h62v116H76z" />
        <path d="M111 31v73M82 108h49" />
        <path d="M15 94h58v47H15z" />
        <path d="M21 116h46M21 135h46" />
        <circle cx="25" cy="102" r="3" />
        <circle cx="38" cy="102" r="3" />
        <circle cx="51" cy="102" r="3" />
        <circle cx="64" cy="102" r="3" />
        <circle cx="73" cy="126" r="18" fill="#fff" />
        <path d="m63 141-1 17 11-7 11 7-1-17" />
      </g>
    </svg>
  );
}

function CustomerCareIcon() {
  return (
    <svg aria-hidden="true" className={styles.customerCareIcon} viewBox="0 0 150 150">
      <circle cx="75" cy="75" r="73" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="49" y="26" width="52" height="98" rx="5" fill="none" stroke="#555" strokeWidth="2.2" />
      <rect x="56" y="34" width="38" height="81" fill="none" stroke="#555" strokeWidth="1.8" />
      {[48, 61, 74, 87].flatMap((y) => [65, 78, 91].map((x) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="none" stroke="#555" strokeWidth="1.8" />
      )))}
      <circle cx="78" cy="102" r="3" fill="none" stroke="#555" strokeWidth="1.8" />
    </svg>
  );
}

export function OwnerResourcesPageContent() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-label="Sub-Zero, Wolf, and Cove owners">
        <Image
          src="/assets/owner-resources/hero.jpg"
          alt="Friends and family sharing a meal around a table"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
      </section>

      <div className={styles.breadcrumbWrap}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">›</span>
          <span aria-current="page">Owner Resources</span>
        </nav>
      </div>

      <section className={`${styles.section} ${styles.intro}`}>
        <h1>Owner Resources</h1>
        <div className={styles.introCopy}>
          <p>
            Thank you for inviting Sub-Zero, Wolf, and Cove into your home. It&apos;s a privilege to have the next years, and decades, to provide you with fresher food, precisely cooked meals, and spotlessly clean dishes.
          </p>
          <p>
            Find helpful product information, support, recipes, and inspiration below. We are always adding new ways to make your meals more memorable and your ownership experience more rewarding.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.account}`}>
        <h2>Log in or create an account</h2>
        <div className={styles.accountCopy}>
          <h3>
            Register your products to unlock your owner account and ensure the best ongoing experience with Sub-Zero, Wolf, and Cove. Registration ensures:
          </h3>
          <ul>
            {registrationBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        </div>
        <Cta href={`${usa}/account/b2clogin`}>Log In or Create Account</Cta>
      </section>

      <section className={`${styles.section} ${styles.resourceGrid}`}>
        <article className={styles.resourceCard}>
          <h2>YOUR PRODUCT INFORMATION</h2>
          <ProductInformationIcon />
          <p>
            Learn the ins and outs of your appliances through our comprehensive use and care guides, instructional videos, and detailed specification libraries.
          </p>
          <Cta href={`${usa}/trade-resources/product-specifications`}>See Resources</Cta>
        </article>
        <article className={styles.resourceCard}>
          <h2>YOUR AVAILABLE ACCESSORIES</h2>
          <AccessoriesCollectionIcon />
          <p>
            From water filters to replacement shelves and egg containers to cleaning solutions, explore our selection of product enhancements, replacement parts, and maintenance and care tools.
          </p>
          <Cta href="/cooking/accessories">See Accessories</Cta>
        </article>
      </section>

      <section className={`${styles.section} ${styles.videos}`}>
        <h2>Use and care videos</h2>
        <p className={styles.sectionLead}>Explore our use and care videos for maintenance tips and how-tos.</p>
        <div className={styles.videoGrid}>
          {videos.map((video) => (
            <Link className={styles.videoCard} href={video.href} key={video.title}>
              <span className={styles.videoImageWrap}>
                <Image src={video.image} alt={video.title} fill sizes="(max-width: 767px) 247px, (max-width: 1199px) 40vw, 247px" className={styles.videoImage} />
                <span className={styles.play} aria-label={`Play ${video.title}`}>
                  <Play aria-hidden="true" fill="currentColor" size={18} />
                </span>
              </span>
              <span className={styles.videoTitle}>{video.title}</span>
            </Link>
          ))}
        </div>
        <Cta href={`${usa}/owners/videos`}>See All Videos</Cta>
      </section>

      <section className={`${styles.section} ${styles.recipes}`}>
        <h2>Recipes from our chefs</h2>
        <Image src="/assets/owner-resources/recipes.jpg" alt="Three chef-created dishes including chicken, biscuits, and soufflé" width={555} height={287} sizes="(max-width: 640px) calc(100vw - 60px), 555px" className={styles.recipeImage} />
        <p>
          Thai chicken pizza, buttermilk biscuits, or chocolate soufflés? Be inspired by our delicious selection of chef-created recipes with appliance-specific tips for these soon-to-be classics.
        </p>
        <div className={styles.ctaRow}>
          <Cta href={`${usa}/use-and-care/recipes`}>SEE ALL RECIPES</Cta>
          <Cta href={`${usa}/use-and-care/cookbooks`}>MASTER PRODUCT MODES</Cta>
        </div>
      </section>

      <section className={`${styles.section} ${styles.connected}`}>
        <h2>Connect your appliances</h2>
        <div className={styles.connectedGrid}>
          <Image src="/assets/owner-resources/connected-appliances.jpg" alt="A connected appliance app displayed on a smartphone" width={500} height={300} sizes="(max-width: 767px) calc(100vw - 60px), 410px" className={styles.connectedImage} />
          <div className={styles.connectedCopy}>
            <p>
              Ensure your appliances are always performing their best from anywhere, anytime. With our Wi-Fi enabled appliances, you have convenience, peace of mind, and knowledge in the palm of your hand.
            </p>
            <Cta href={`${usa}/use-and-care/connect-appliances`}>Learn More</Cta>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.support}`}>
        <h2>Seeking support?</h2>
        <p className={styles.supportIntro}>
          A second-to-none experience is our priority. Please contact Customer Care or a Factory Certified Service provider near you.{" "}
          <Link href={`${usa}/assistance/factory-certified`}>Learn more about Factory Certified Programs.</Link>
        </p>
        <div className={styles.supportRows}>
          <article className={styles.supportRow}>
            <div className={`${styles.supportVisual} ${styles.factoryVisual}`}>
              <FactoryCertifiedIcon />
            </div>
            <div>
              <h3>FACTORY CERTIFIED SERVICE</h3>
              <p>Enjoy worry-free, white-glove service from specially trained, skilled Factory Certified Service providers.</p>
              <Cta href={`${usa}/locator#type=service-parts`}>Find Providers</Cta>
            </div>
          </article>
          <article className={styles.supportRow}>
            <div className={`${styles.supportVisual} ${styles.customerVisual}`}>
              <CustomerCareIcon />
            </div>
            <div>
              <h3>CUSTOMER CARE</h3>
              <p>We&apos;d love to hear from you. Please reach out to talk with one of our friendly experts at our headquarters.</p>
              <p className={styles.phone}><strong>Call </strong><a href="tel:8002227820">(800) 222-7820</a></p>
            </div>
          </article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.savings}`}>
        <div className={styles.savingsCopy}>
          <h3>FULL SUITE SAVINGS</h3>
          <p>For a limited time, earn three additional years of protection or a rebate up to $2,500 with the purchase of a qualifying Sub-Zero, Wolf, and Cove appliance package.</p>
          <Cta href={`${usa}/offers-and-promotions/full-suite-savings`}>Learn More</Cta>
        </div>
        <Image src="/assets/owner-resources/full-suite-savings.png" alt="Full Suite Savings promotion" width={300} height={200} sizes="300px" className={styles.savingsImage} />
      </section>

      <section className={`${styles.section} ${styles.help}`}>
        <BadgeCheck aria-hidden="true" className={styles.helpIcon} />
        <h2>Questions? We&apos;re here to help.</h2>
        <p>Troubleshoot product issues or concerns.</p>
        <Cta href={`${usa}/assistance`}>Get Support</Cta>
      </section>
    </main>
  );
}
