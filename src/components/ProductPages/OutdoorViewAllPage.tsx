import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";
const serif: CSSProperties = {
  fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif',
};

const assets = {
  hero: `${aem}d9bddb0e-982d-44a8-b846-9328a43ae8dc/as/outdoor-carousel-1.avif?assetname=outdoor+carousel+1.jpg&width=1920&max-quality=90`,
  grill: `${aem}fb786a6f-fcef-4b85-a935-6be6881f0717`,
  sideBurner: `${aem}1ca31676-1486-4c2e-a48c-971566e1a4c6`,
  burnerModule: `${aem}47538b57-e8e3-44b3-817d-093434b6d53c`,
  undercounter: `${aem}561e1204-2ab3-4f54-8eb5-5c012eae3b59/as/image.avif?width=720&quality=90`,
  drawers: `${aem}136a1175-9218-48d4-b0e1-e5359ed7ffb4/as/image.avif?width=720&quality=90`,
  warmingDrawer: `${aem}d083168d-c862-44a8-b21e-d5a9313aece3`,
  wallHood: `${aem}44994875-a68a-42a0-a651-4c8afba30343`,
  iceMaker: `${aem}78ba3735-d271-4323-a597-c9939b95ca61/as/DEU1550I_P_OPEN.avif?assetname=DEU1550I_P_OPEN.png&width=1000&max-quality=90`,
  icePromo: "/assets/subzero/ice-makers/SZ_SPO3050TE_DEU1550IP_031325_01b.avif",
  subZero: `${aem}81756aa7-f917-449b-a5e8-335bdaaebd88/as/SM_TCSLG_111621_Grill.avif?assetname=SM_TCSLG_111621_Grill.jpg&width=1400&max-quality=90`,
  wolf: `${aem}0b25fcce-e900-446e-aad3-a02309cbca8a/as/SZWC_Seattle_1359_4021FC_A_ADOBERGB.avif?assetname=SZWC_Seattle_1359_4021FC_A_ADOBERGB.tif&width=1200&max-quality=90`,
  cove: `${aem}390cad36-9e50-4e66-9ae9-feb55e0bd553/as/cove-dishwashing.avif?assetname=cove-dishwashing.jpg&width=1200&max-quality=90`,
};

type Spec = { label: string; value: ReactNode };
type Product = {
  title: string;
  href: string;
  image: string;
  count?: string;
  specs: readonly Spec[];
};

const groups = [
  {
    id: "grills",
    title: "Grills",
    copy: "Wolf outdoor grills specialize in nuanced temperature control—the key to successful grilling. We combine the searing power of independent grill burners with even, radiant heat from ceramic briquettes. The result? Predictably delicious meals.",
    products: [
      {
        title: "Outdoor Gas Grill",
        href: "/products/cooking/outdoor/og",
        image: assets.grill,
        specs: [
          { label: "Width", value: '54"' },
          { label: "Fuel Type", value: "Natural Gas" },
        ],
      },
    ],
  },
  {
    id: "side-burners",
    title: "Side Burners",
    copy: "The perfect companion to a Wolf Grill. It provides added functionality needed to cook entire meals outdoors.",
    products: [
      {
        title: "Side Burner",
        href: "/products/cooking/outdoor/sb13",
        image: assets.sideBurner,
        specs: [
          { label: "Width", value: '13"' },
          { label: "Fuel Type", value: <>Liquid Propane<br />Natural Gas</> },
        ],
      },
      {
        title: "Built-In Burner Module",
        href: "/products/cooking/outdoor/bm13",
        image: assets.burnerModule,
        specs: [
          { label: "Width", value: '13"' },
          { label: "Fuel Type", value: <>Liquid Propane<br />Natural Gas</> },
        ],
      },
    ],
  },
  {
    id: "refrigeration",
    title: "Refrigeration",
    copy: "Enjoy the convenience of outdoor refrigeration. It keeps fresh foods, cold drinks, and other necessities at your fingertips.",
    products: [
      {
        title: "Outdoor Undercounter Refrigerator",
        href: "/outdoor/refrigeration",
        image: assets.undercounter,
        count: "1 / 2",
        specs: [
          { label: "Width", value: '24"' },
          { label: "Finish", value: "Panel Ready" },
        ],
      },
      {
        title: "Designer Outdoor Refrigerator Drawers",
        href: "/outdoor/refrigeration",
        image: assets.drawers,
        specs: [
          { label: "Width", value: '24"' },
          { label: "Finish", value: "Panel Ready" },
        ],
      },
    ],
  },
  {
    id: "warming-drawer",
    title: "Warming Drawer",
    copy: "Keep food and dinnerware warm and nearby, saving you trips inside.",
    products: [
      {
        title: "Outdoor Warming Drawer",
        href: "/outdoor/warming-drawers",
        image: assets.warmingDrawer,
        specs: [{ label: "Width", value: '30"' }],
      },
    ],
  },
  {
    id: "ventilation",
    title: "Ventilation",
    copy: "Powerful ventilation enhances the splendor of your outdoor kitchen by removing smoke, grease, and odor.",
    products: [
      {
        title: "Outdoor Pro Wall Hood",
        href: "/outdoor/ventilation",
        image: assets.wallHood,
        count: "1 / 3",
        specs: [{ label: "Width", value: '36"  48"  60"' }],
      },
    ],
  },
  {
    id: "ice-makers",
    title: "Ice Makers",
    copy: "Built with premium materials and exacting engineering, Designer Ice Makers combine refined form with relentless performance, ensuring you’re always prepared to entertain, celebrate, or elevate the everyday.",
    products: [
      {
        title: "Designer Undercounter Indoor / Outdoor Ice Maker",
        href: "/refrigeration/ice-makers",
        image: assets.iceMaker,
        count: "1 / 2",
        specs: [
          { label: "Width", value: '15"' },
          { label: "Finish", value: "Panel Ready" },
        ],
      },
    ],
  },
] as const satisfies readonly {
  id: string;
  title: string;
  copy: string;
  products: readonly Product[];
}[];

function PillLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-9 items-center rounded-full border px-5 text-[11px] font-semibold transition ${dark ? "border-[#181817] bg-[#181817] text-white hover:bg-transparent hover:text-[#181817]" : "border-[#181817] hover:bg-[#181817] hover:text-white"}`}
    >
      {children}
    </Link>
  );
}

function ProductCard({ product, preload = false }: { product: Product; preload?: boolean }) {
  return (
    <article className="flex w-full max-w-[459px] flex-col border border-[#d2cdc1] p-5 md:p-6 md:pb-4">
      <Link href={product.href} className="group block focus:outline-none focus-visible:ring-1 focus-visible:ring-[#181817]">
        <div className="relative aspect-[1.45] overflow-hidden md:h-[315px] md:aspect-auto">
          <Image
            src={product.image}
            alt={product.title}
            fill
            preload={preload}
            sizes="(min-width: 1024px) 408px, (min-width: 640px) 46vw, 88vw"
            className="object-contain transition duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex min-h-7 justify-end py-1 text-[11px] font-light">{product.count ?? null}</div>
        <h3 style={serif} className="min-h-11 pb-3 text-[18px] font-light leading-[1.12] underline-offset-4 group-hover:underline md:text-[20px]">
          {product.title}
        </h3>
      </Link>
      <dl className="mt-auto border-t border-[#d8d2c8] text-[11px] font-light leading-[1.35]">
        {product.specs.map((spec, index) => (
          <div key={spec.label} className={`grid grid-cols-2 py-2 ${index < product.specs.length - 1 ? "border-b border-[#d8d2c8]" : ""}`}>
            <dt>{spec.label}:</dt>
            <dd>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function DiscoveryCard({ title, copy, cta, href, image }: { title: string; copy: string; cta: string; href: string; image: string }) {
  return (
    <article className="bg-[#fbfaf6]">
      <div className="relative aspect-[1.6] overflow-hidden">
        <Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="grid min-h-[180px] gap-6 p-6 md:min-h-[212px] md:grid-cols-2">
        <div className="flex flex-col items-start justify-between gap-6">
          <h3 style={serif} className="text-[30px] font-light leading-[1.1] md:text-[40px]">{title}</h3>
          <PillLink href={href}>{cta}</PillLink>
        </div>
        <p className="text-[13px] font-light leading-[1.35] md:text-[14px]">{copy}</p>
      </div>
    </article>
  );
}

export function OutdoorViewAllPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#181817]" style={{ fontFamily: '"Segoe UI", Arial, Helvetica, sans-serif' }}>
      <section className="relative h-[520px] overflow-hidden bg-[#0c0c0b] text-white md:h-[100svh] md:max-h-[1080px]">
        <Image src={assets.hero} alt="Premium outdoor kitchen with Sub-Zero and Wolf appliances" fill preload sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-transparent to-black/48" />
        <p style={serif} className="absolute bottom-6 left-6 text-[34px] font-light leading-none md:bottom-8 md:left-12 md:text-[40px]">Masterful performance</p>
      </section>

      <section className="px-6 pb-10 pt-14 md:px-12 md:pb-12 md:pt-16">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.28fr_1fr] lg:gap-20">
          <h1 style={serif} className="self-start text-[46px] font-light leading-[1.1] md:text-[53px] xl:text-[60px]">All Outdoor</h1>
          <p style={serif} className="max-w-[574px] text-[18px] font-light leading-[1.2] md:text-[24px]">
            Experience the same confidence in freshness and precise cooking outdoors with Sub-Zero and Wolf. Combining iconic design with durable construction, they perform flawlessly, rain or shine.
          </p>
        </div>
      </section>

      <nav aria-label="Outdoor product categories" className="px-6 md:px-12">
        <div className="mx-auto flex max-w-[1392px] gap-x-8 gap-y-3 overflow-x-auto border-b border-[#c9c4ba] pb-4 text-[11px] font-light md:gap-x-12 md:text-[13px]">
          {groups.map((group) => <Link key={group.id} href={`#${group.id}`} className="shrink-0 underline-offset-4 hover:underline">{group.title}</Link>)}
        </div>
      </nav>

      <div className="px-6 pb-12 pt-16 md:px-12 md:pb-16 md:pt-[72px]">
        <div className="mx-auto max-w-[1392px]">
          {groups.map((group, groupIndex) => (
            <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className={groupIndex ? "mt-20 md:mt-[104px]" : ""}>
              <h2 id={`${group.id}-title`} style={serif} className="text-[30px] font-light leading-[1.08] md:text-[36px]">{group.title}</h2>
              <p className="mt-2 max-w-[720px] text-[12px] font-light leading-[1.4] md:text-[13px]">{group.copy}</p>
              <div className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.products.map((product, index) => <ProductCard key={product.title} product={product} preload={groupIndex === 0 && index === 0} />)}
                {group.id === "ice-makers" ? (
                  <article className="w-full max-w-[459px] bg-[#fbfaf6]">
                    <div className="relative aspect-[1.52] overflow-hidden">
                      <Image src={assets.icePromo} alt="Designer Undercounter Ice Maker in blue cabinetry" fill sizes="(min-width: 1024px) 408px, (min-width: 640px) 46vw, 88vw" className="object-cover" />
                    </div>
                    <div className="flex min-h-[225px] flex-col items-start p-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em]">New product</p>
                      <h3 style={serif} className="mt-3 text-[27px] font-light leading-[1.04]">The future of ice making is here</h3>
                      <p className="mt-4 text-[12px] font-light leading-[1.4]">The Designer Undercounter Ice Maker was created for luxury homes where quiet, convenience, and performance matter.</p>
                      <div className="mt-auto pt-5"><PillLink href="/refrigeration/ice-makers" dark>Learn more</PillLink></div>
                    </div>
                  </article>
                ) : null}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="px-6 pb-16 pt-5 md:px-12 md:pb-20 md:pt-8">
        <div className="mx-auto grid max-w-[1392px] gap-8 lg:grid-cols-[1.28fr_1fr] lg:gap-20">
          <h2 style={serif} className="max-w-[620px] text-[36px] font-light leading-[1.05] md:text-[40px]">Expand your culinary curiosity to the outdoors.</h2>
          <p style={serif} className="max-w-[620px] text-[18px] font-light leading-[1.2] md:text-[24px]">With Sub-Zero and Wolf, you can picture yourself preparing the same gourmet meals outdoors as you do indoors. Our multi-function grill gives you masterful control, while warming drawers lend a helping hand. Sub-Zero&apos;s convenient undercounter refrigeration keeps fresh foods, cold drinks, ice, and other necessities at your fingertips.</p>
        </div>
      </section>

      <section className="bg-[#d3d0c5] px-6 pb-16 pt-16 md:px-12 md:pb-16 md:pt-20">
        <div className="mx-auto max-w-[1392px]">
          <h2 style={serif} className="text-[44px] font-light leading-[1.1] md:text-[53px] xl:text-[60px]">Discover more</h2>
          <div className="mt-10 grid gap-2">
            <article className="grid bg-[#fbfaf6] md:grid-cols-[0.255fr_0.745fr]">
              <div className="flex min-h-[360px] flex-col items-start justify-between p-6 md:min-h-[649px]">
                <div><h3 style={serif} className="text-[30px] font-light leading-[1.1] md:text-[40px]">Cleaner air for fresher food</h3><p className="mt-6 max-w-[306px] text-[13px] font-light leading-[1.35] md:text-[14px]">Iconic Sub-Zero Refrigeration preserves food at its delicious peak and guards wine against its enemies.</p></div>
                <PillLink href="/refrigeration/discover-sub-zero">Explore Sub-Zero</PillLink>
              </div>
              <div className="relative min-h-[360px] overflow-hidden md:min-h-[649px]"><Image src={assets.subZero} alt="Sub-Zero refrigeration integrated into an outdoor kitchen" fill sizes="(min-width: 768px) 75vw, 100vw" className="object-cover" /></div>
            </article>
            <div className="grid gap-1 md:grid-cols-2 md:gap-2">
              <DiscoveryCard title="Effortless control, flawless flavor" copy="Wolf equips cooks of every level with the confidence to create exquisite meals time and time again." cta="Explore Wolf" href="/cooking/discover-wolf" image={assets.wolf} />
              <DiscoveryCard title="A pristine and peaceful clean" copy="Your silent partner in the kitchen, Cove's intuitive, customizable features offer a worry-free wash and dry." cta="Explore Cove" href="/dishwashing/discover-cove" image={assets.cove} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
