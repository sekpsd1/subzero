import Image from "next/image";
import Link from "next/link";
import { WolfCooktopsHero } from "@/components/ProductPages/WolfCooktopsHero";
import { StickyShowroomButton } from "@/components/ProductPages/StickyShowroomButton";
import {
  WolfDesignGallery,
  type WolfDesignGalleryCategory,
} from "@/components/ProductPages/WolfDesignGallery";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const assets = {
  rangetop: `${aem}b03ffd16-4106-4818-adc1-e8ba43996e73/as/SRT36.avif?assetname=SRT36.jpg`,
  gasCooktop: `${aem}422708f8-8bdc-4ee9-b2fb-42594d0ce147/as/CG304PS_SSBEZEL_REDKNOB.avif?assetname=CG304PS_SSBEZEL_REDKNOB.png`,
  induction: `${aem}32084c49-9fa7-4ea3-bf6d-cd7be54a5268/as/SILO_CI30460T_S_05032022-(1).avif?assetname=SILO_CI30460T_S_05032022+%281%29.jpg`,
  showroomJourney: `${aem}8fb0da74-6d9a-442e-9e5a-42564fc05540/as/SZG_Miami_Showroom_51876.avif?assetname=SZG_Miami_Showroom_51876.jpg&width=800&max-quality=90`,
  living: `${aem}75536247-75a2-42db-b380-6ca30aeeaeb3/as/antique-aesthetic-d.avif?assetname=antique-aesthetic-d.png&width=800&max-quality=90`,
  recipes: `${aem}0ded33ac-d600-4bd4-97c4-82cdc2f7871a/as/recipe_060-card.avif?assetname=recipe_060-card.jpg&width=800&max-quality=90`,
  dishwasher: `${aem}24ec6ec9-5615-4793-aaeb-4692dfa57679/as/complete-your-kitchen-3.avif?assetname=complete-your-kitchen-3.jpg&width=1440&max-quality=90`,
  warmingDrawer: `${aem}b00b8611-6e3a-4baf-8888-85e9e8c2a68a/as/Warming-Drawer.avif?assetname=Warming+Drawer.png&width=1440&max-quality=90`,
};

const cooktopGalleries = [
  {
    label: "Contemporary",
    images: [
      `${aem}5c5db580-9ea5-427f-b128-df7b23c93224/as/MED_SLGTC_Euro_041223_3.avif?assetname=MED_SLGTC_Euro_041223_3.jpeg&width=1920&max-quality=90`,
      `${aem}951362cb-8b3f-4af5-80d2-5f057c88985a/as/SLG_OVERALL_ParkAvenue_2_042822_gallery.avif?assetname=SLG_OVERALL_ParkAvenue_2_042822_gallery.jpg&width=1280&max-quality=90`,
      `${aem}5f1278da-c7b5-4485-a9c7-d97a315d5849/as/MD_CG_92915_2.avif?assetname=MD_CG_92915_2.tif&width=1920&max-quality=90`,
    ],
  },
  {
    label: "Traditional",
    images: [
      `${aem}b92f506a-cbef-4429-aee4-03aafaba6054/as/Sub-Zero-Wolf-JV-02.avif?assetname=Sub-Zero-Wolf-JV-02.tif&width=1920&max-quality=90`,
      `${aem}1523aef7-bce0-4dc3-84ff-747be43e34b7/as/MED_SLG_043019_3.avif?assetname=MED_SLG_043019_3.tif&width=1280&max-quality=90`,
      `${aem}9c1de74b-0803-4fac-8536-b8c1d0694556/as/Chused_Co_Vignette_1317.avif?assetname=Chused_Co_Vignette_1317.jpg&width=1920&max-quality=90`,
    ],
  },
  {
    label: "Transitional",
    images: [
      `${aem}92d41196-f45c-4fe5-8212-a0a5d813d197/as/SLG_MED_081522_3.avif?assetname=SLG_MED_081522_3.jpg&width=1920&max-quality=90`,
      `${aem}fd86cd79-06e3-46ea-a746-d9d7cba90491/as/one-bennett-park_003.avif?assetname=one+bennett+park_003.tif&width=1280&max-quality=90`,
      `${aem}08d067af-ba6c-4123-b629-601ce6d37f0d/as/SM_CG365T_S_SLG_042217_1.avif?assetname=SM_CG365T_S_SLG_042217_1.tif&width=1920&max-quality=90`,
    ],
  },
] as const satisfies readonly WolfDesignGalleryCategory[];

const rangetopOptions = [
  {
    title: "All Burner",
    icon: `${aem}98f8e731-99ad-4209-8f2a-a0fe68393b32/renditions/original/as/Gas_allBurners.svg?assetname=Gas_allBurners.svg`,
  },
  {
    title: "Charbroiler",
    icon: `${aem}22d946da-eb44-4b89-8013-60cae8fb8451/renditions/original/as/Gas_charbroiler.svg?assetname=Gas_charbroiler.svg`,
  },
  {
    title: "Griddle",
    icon: `${aem}e94e00e5-498e-4e87-99bf-13caae34432e/renditions/original/as/DualFuel_griddle.svg?assetname=DualFuel_griddle.svg`,
  },
  {
    title: "Wok Burner",
    icon: `${aem}06c4b4ba-3cf7-4006-b1cb-d9d9587c8d1f/as/french-top.avif?assetname=french+top.png`,
  },
] as const;

const families = [
  {
    title: "Gas Rangetops",
    shortTitle: "Gas Rangetop",
    copy: "However you like to cook, there’s a Wolf Gas Rangetop for you. Each offers dual-stacked, sealed burners; choose an optional charbroiler, griddle, or wok burner for extra flexibility.",
    image: assets.rangetop,
    overviewImage: `${aem}9457e4e9-8a33-4ef6-873a-d96cfee83280/as/SRT48_Comparison.avif?assetname=SRT48_Comparison.png&width=800&max-quality=90`,
    overviewCopy: "Enjoy consistent power, precision, and performance designed to elevate your cooking.",
    learn: "Learn more about gas rangetops",
    view: "View all gas rangetop models",
    href: "/products/cooking/gas-rangetops",
    specs: [
      ["Widths", ["30″", "36″", "48″"]],
      ["Style", ["—"]],
      ["Configuration", ["Infrared Griddle", "Infrared Double Griddle", "Infrared Charbroiler", "Wok Burner", "6 Burners/Elements", "4 Burners/Elements", "2 Burners/Elements"]],
    ],
  },
  {
    title: "Gas Cooktops",
    shortTitle: "Gas Cooktop",
    copy: "Dual-stacked, sealed gas burners provide precise high heat for fast boils and quick sears, and low flames for delicate simmers and silky sauces.",
    image: assets.gasCooktop,
    overviewImage: `${aem}092916e4-e21b-4a3c-ab8d-dcbea93dde35/as/CG36_Comparison.avif?assetname=CG36_Comparison.png&width=800&max-quality=90`,
    overviewCopy: "Experience precise temperature adjustment and proven performance with every turn of the knob.",
    learn: "Learn more about gas cooktops",
    view: "View all gas cooktop models",
    href: "/products/cooking/gas-cooktops",
    specs: [
      ["Widths", ["15″", "24″", "30″", "36″"]],
      ["Style", ["Transitional", "Professional", "Contemporary"]],
      ["Configuration", ["5 Burners/Elements", "4 Burners/Elements", "3 Burners/Elements", "2 Burners/Elements"]],
    ],
  },
  {
    title: "Induction Cooktops",
    shortTitle: "Induction Cooktop",
    copy: "Induction is Wolf’s most efficient heat delivery system. By supplying heat directly to the cookware, induction offers precise control and nearly instantaneous temperature response.",
    image: assets.induction,
    overviewImage: `${aem}95dc814c-7edc-4a01-b197-50c7355114aa/as/CI36_Comparison.avif?assetname=CI36_Comparison.png&width=800&max-quality=90`,
    overviewCopy: "Discover rapid heat transfer, remarkable control, and effortless efficiency in an easy-to-clean package.",
    learn: "Learn more about induction",
    view: "View all induction models",
    href: "/products/cooking/induction-cooktops",
    specs: [
      ["Widths", ["15″", "24″", "30″", "36″"]],
      ["Style", ["Transitional", "Contemporary"]],
      ["Configuration", ["5 Burners/Elements", "4 Burners/Elements", "3 Burners/Elements", "2 Burners/Elements"]],
    ],
  },
] as const;

function PrimaryLink({
  href,
  children,
  large = false,
  withPlus = false,
}: {
  href: string;
  children: React.ReactNode;
  large?: boolean;
  withPlus?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-3 rounded-full bg-[#171715] font-bold text-white transition hover:bg-[#3c3a36] ${
        large ? "min-h-14 px-7 text-[16px]" : "min-h-11 px-6 text-[13px]"
      }`}
    >
      {children}
      {withPlus ? (
        <span className="grid size-6 place-items-center rounded-full border border-white/70 text-[18px] font-normal leading-none" aria-hidden="true">
          +
        </span>
      ) : null}
    </Link>
  );
}

export function WolfCooktopsRangetopsPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#171715]">
      <WolfCooktopsHero />
      <StickyShowroomButton triggerId="cooktops-rangetops-introduction" tone="gray" />

      <section
        id="cooktops-rangetops-introduction"
        className="px-5 pb-20 pt-12 text-center md:min-h-[760px] md:px-10 md:pb-28 md:pt-16"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.28em]">Wolf</p>
        <h1 className="mt-4 font-serif text-[44px] leading-none tracking-[-0.04em] sm:text-[58px] lg:text-[80px]">
          Cooktops and Rangetops
        </h1>
        <p className="mx-auto mt-7 max-w-[860px] text-[15px] leading-[1.55] md:text-[18px]">
          Exceptional meals start with a confident cook. Whatever your preferred cooking method—gas or
          induction—there is a well-crafted cooktop or rangetop for you. Each offers Wolf&apos;s unrivaled power,
          precision, and proven performance.
        </p>
        <div className="mt-7">
          <Link
            href="/showroom/appointment"
            className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#171715] px-8 text-[15px] font-bold text-white transition hover:bg-[#3c3a36]"
          >
            Experience in a showroom
          </Link>
        </div>
        <div className="mx-auto mt-5 h-20 w-px bg-[#d14b38] md:h-40" />
        <svg viewBox="0 0 22 24" className="mx-auto mt-5 h-7 w-7 text-[#c93621]" aria-hidden="true">
          <path
            fill="currentColor"
            d="M10.81.61c.37-.25.8-.09.84.26.18 1.27.88 3.8 3.48 6.4 3.5 3.48 7.51 7.52 3.29 12.41-.26.31-.78.14-.79-.26-.04-1.17-.37-2.97-1.82-4.05 0 0-.33-.26-.78-.1-.19.08-.37.25-.45.66-.2 1.11.94 6.33-4.61 7.42-5.56 1.08-8.39-3.17-8.39-3.17s-4.47-5.95 2.35-12.36c.26-.24.68-.09.69.25.08 1.47.44 4.36 1.96 4.9 1.72.61 2.75-.96 2.93-1.7.18-.74.2-2.52-.68-5.65-.61-2.15 1.05-4.08 2.04-5.01Z"
          />
        </svg>
      </section>

      <section id="cooktop-families" className="px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1556px] space-y-24 md:space-y-32">
          {families.map((family, index) => (
            <article
              key={family.title}
              className={`grid items-center gap-10 md:grid-cols-2 md:gap-24 ${
                index === 0 ? "md:items-start" : "md:items-center"
              }`}
            >
              <div className={`relative aspect-[4/3] ${index % 2 ? "md:order-2 md:translate-x-6" : ""}`}>
                <Image
                  src={family.image}
                  alt={`Wolf ${family.shortTitle}`}
                  fill
                  sizes="(min-width: 768px) 520px, 100vw"
                  className="object-contain"
                />
              </div>
              <div
                className={`mx-auto max-w-[500px] text-center ${
                  index % 2
                    ? "md:order-1 md:translate-x-16 md:-translate-y-1"
                    : index === 0
                      ? "md:-translate-x-12"
                      : "md:-translate-x-12 md:-translate-y-1"
                }`}
              >
                <h2 className="font-serif text-[38px] leading-none md:text-[52px] lg:text-[60px]">{family.title}</h2>
                <p className="mx-auto mt-6 max-w-[520px] font-serif text-[17px] leading-[1.45] md:text-[20px]">{family.copy}</p>
                {index === 0 ? (
                  <div className="mt-9">
                    <div className="grid grid-cols-4 gap-2">
                      {rangetopOptions.map((option, optionIndex) => (
                        <div
                          key={option.title}
                          className={`flex min-h-[128px] flex-col items-center justify-center p-3 ${
                            optionIndex === 0 ? "border border-[#8e8980] bg-[#f9f8f4] font-bold" : ""
                          }`}
                        >
                          <Image src={option.icon} alt="" width={64} height={48} className="h-12 w-16 object-contain" />
                          <span className="mt-3 text-[15px] leading-tight">{option.title}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-10 text-left text-[16px] leading-[1.35]">
                      Control temperature precisely with dual-stacked, sealed gas burners for higher highs and lower lows.
                    </p>
                  </div>
                ) : null}
                <div className={index === 0 ? "mt-10" : "mt-11"}>
                  <PrimaryLink href={family.href} large withPlus>{family.learn}</PrimaryLink>
                </div>
                <Link href={family.href} className="mt-5 inline-block border-b border-[#171715] pb-0.5 text-[15px]">
                  {family.view}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-5 py-20 md:px-10 md:pb-[60px]">
        <div className="mx-auto max-w-[1296px]">
          <h2 className="text-center font-serif text-[40px] leading-none md:text-[56px]">
            Wolf Cooktops and Rangetops overview
          </h2>
          <div className="mt-20 grid gap-16 md:mt-36 md:grid-cols-3 md:gap-16">
            {families.map((family) => (
              <article key={family.title} className="flex flex-col text-center">
                <div className="relative mx-auto aspect-[1.45] w-full max-w-[270px]">
                  <Image
                    src={family.overviewImage}
                    alt={`Wolf ${family.shortTitle}`}
                    fill
                    sizes="270px"
                    className="translate-x-2 -translate-y-3 scale-[1.18] object-contain"
                  />
                </div>
                <h3 className="mt-16 font-serif text-[32px] leading-none md:mt-[76px] md:text-[40px]">{family.shortTitle}</h3>
                <p className="mx-auto mt-4 min-h-[50px] max-w-[380px] text-[16px] leading-[1.35]">
                  {family.overviewCopy}
                </p>
                <div className="mt-2 flex justify-center gap-4">
                  <Link
                    href={family.href}
                    className="inline-flex min-h-9 items-center rounded-full bg-[#171715] px-4 text-[14px] font-bold text-white"
                  >
                    View models
                  </Link>
                  <Link
                    href={family.href}
                    className="inline-flex min-h-9 items-center rounded-full border border-[#171715] px-4 text-[14px]"
                  >
                    Learn more
                  </Link>
                </div>
                <dl className="mt-6 text-left">
                  {family.specs.map(([term, values], specIndex) => (
                    <div
                      key={term}
                      className={`grid grid-cols-2 border-t border-black/45 py-6 ${
                        specIndex === 0 ? "md:min-h-[153px]" : specIndex === 1 ? "md:min-h-[123px]" : ""
                      }`}
                    >
                      <dt className="text-[13px] uppercase tracking-[0.2em]">{term}</dt>
                      <dd
                        className={`text-[16px] leading-[1.25] ${
                          specIndex === 1 ? "space-y-[6px]" : "space-y-2"
                        }`}
                      >
                        {values.map((value) => (
                          <div key={value}>
                            {value === "—" || term === "Configuration" ? (
                              value
                            ) : (
                              <Link href={family.href} className="border-b border-[#171715]">
                                {value}
                              </Link>
                            )}
                          </div>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eeece4] px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-[1120px] overflow-hidden bg-[#fbfaf7] p-5 md:grid-cols-[426px_1fr] md:p-6">
          <div className="relative min-h-[250px] md:min-h-[427px]">
            <Image
              src={assets.showroomJourney}
              alt="Guests exploring Wolf appliances in a showroom"
              fill
              sizes="(min-width: 768px) 426px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-7 md:py-0 md:pl-[104px] md:pr-14">
            <h2 className="font-serif text-[36px] leading-[1.05] md:text-[56px]">
              Start your journey
              <br />
              in a showroom
            </h2>
            <p className="mt-6 text-[14px] leading-[1.5] md:translate-y-2 md:text-[16px] md:leading-[1.55]">
              Our showrooms are where inspiration turns into informed decisions. Learn how a visit helps you plan,
              compare, and move forward with confidence.
            </p>
            <div className="mt-8 md:translate-y-2">
              <Link
                href="/showroom"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#171715] px-8 text-[16px] font-bold text-white transition hover:bg-[#3c3a36]"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f0eee7] px-5 pb-24 pt-20 md:px-10 md:pb-32 md:pt-16">
        <div className="mx-auto max-w-[1392px]">
          <h2 className="max-w-[680px] font-serif text-[36px] leading-[1.05] md:text-[56px]">
            Create a kitchen that&apos;s uniquely yours
          </h2>
          <p className="mt-5 max-w-[700px] text-[14px] leading-[1.5] md:text-[16px] md:leading-[1.35]">
            Whether you want a statement range with colored doors and knobs, a minimalistic look with a sleek induction
            cooktop and understated contemporary wall ovens—or something in between—there&apos;s a Wolf cooking setup to
            meet your aesthetic and culinary needs.
          </p>
          <WolfDesignGallery categories={cooktopGalleries} thirdImageAspectClass="md:aspect-video" />
          <div className="mt-8 flex justify-center md:mt-14">
            <Link href="/inspiration" className="inline-flex min-h-11 items-center rounded-full border border-[#171715] px-6 text-[13px] font-bold">
              See more inspiration
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f0eee7] px-5 pb-20 md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1392px]">
          <h2 className="font-serif text-[36px] leading-none md:translate-x-2 md:text-[56px]">More to savor</h2>
          <div className="mt-10 grid gap-2 md:mt-12 md:grid-cols-2">
            {[
              {
                title: "The art of living elegantly",
                copy: "Discover The Living Kitchen, our online magazine featuring celebrations of travel, cuisine, and design. It’s full of inspiring stories, flavorful recipes, profiles of chefs and artists, and much more.",
                image: assets.living,
                href: "/journal",
                cta: "Learn more",
              },
              {
                title: "Chef-tested recipes",
                copy: "Our curated collection of gourmet recipes invites you to explore bold flavors and culinary techniques, while our state-of-the-art appliances elevate your cooking experience to new heights.",
                image: assets.recipes,
                href: "/journal/recipes",
                cta: "View recipes",
              },
            ].map((card) => (
              <article key={card.title} className="overflow-hidden bg-[#fbfaf7]">
                <div className="relative aspect-[1.8] md:aspect-[1.6]">
                  <Image src={card.image} alt={card.title} fill sizes="(min-width: 768px) 696px, 100vw" className="object-cover" />
                </div>
                <div className="grid gap-4 p-6 sm:grid-cols-2 md:min-h-[220px]">
                  <div>
                    <h3 className="font-serif text-[25px] leading-[1.05] md:text-[40px]">{card.title}</h3>
                    <Link href={card.href} className="mt-5 inline-flex min-h-9 items-center rounded-full border border-[#171715] px-5 text-[12px] font-bold md:mt-8 md:min-h-[52px] md:px-8 md:text-[16px]">
                      {card.cta}
                    </Link>
                  </div>
                  <p className="text-[13px] leading-[1.5] md:text-[16px] md:leading-[1.35]">{card.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f0eee7] px-5 pb-24 md:px-10 md:pb-32">
        <div className="mx-auto max-w-[1392px]">
          <h2 className="font-serif text-[36px] leading-none md:text-[56px]">Complete your kitchen</h2>
          <div className="mt-10 grid gap-2 sm:grid-cols-2">
            {[
              { title: "Dishwashers", image: assets.dishwasher, href: "/products/dishwashing" },
              { title: "Warming Drawers", image: assets.warmingDrawer, href: "/products/cooking/warming-drawers" },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative block aspect-square overflow-hidden bg-[#272522]"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 640px) 692px, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <h3 className="absolute bottom-6 left-6 font-serif text-[30px] leading-none text-white md:text-[40px]">{card.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
