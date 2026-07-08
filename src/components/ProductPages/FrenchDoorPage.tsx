import Image from "next/image";
import Link from "next/link";
import frenchDoorHero from "../../../img-SUB-ZERO/french-doors/SZWC_Nashville_46077_R_RGB.avif";
import { products } from "@/lib/site-data";
import { slugify } from "@/lib/utils";

const aem = (id: string, file: string, width = 1920) =>
  `https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:${id}/as/${file}&width=${width}&max-quality=90`;

const assets = {
  hero: aem(
    "33766109-c472-4795-9491-701618c42023",
    "sz-designer-media-break.avif?assetname=sz-designer-media-break.png",
    2200,
  ),
  model: aem(
    "08c9cf5e-239e-45e8-b4c4-57f6bb518c1d",
    "22-SUBZ-BI-CLASSIC-SILOS_FRENCH-DOOR_CL4250UFD_S_P_SH.avif?assetname=22-SUBZ-BI-CLASSIC-SILOS_FRENCH-DOOR_CL4250UFD_S_P_SH.png",
    1200,
  ),
  discoverWolf: aem(
    "0b25fcce-e900-446e-aad3-a02309cbca8a",
    "SZWC_Seattle_1359_4021FC_A_ADOBERGB.avif?assetname=SZWC_Seattle_1359_4021FC_A_ADOBERGB.tif",
    1400,
  ),
  discoverCove: aem(
    "390cad36-9e50-4e66-9ae9-feb55e0bd553",
    "cove-dishwashing.avif?assetname=cove-dishwashing.jpg",
    1000,
  ),
  discoverOutdoor: aem(
    "8a2967b8-7d3d-4ab9-b324-5f4ca6f950bc",
    "LG_SLG_042919_3.avif?assetname=LG_SLG_042919_3.tif",
    1000,
  ),
  categoryColumn:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:640e7e31-3a61-4ba8-8c7c-f33269dbb3b0/renditions/original/as/Column-Refrigeration.svg?assetname=Column+Refrigeration.svg",
  categoryOverUnder:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:3f9421fd-c669-4492-ac3c-a1b4286eb7d7/renditions/original/as/Over-and-Under.svg?assetname=Over-and-Under.svg",
  categorySideBySide:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:85466422-77aa-4c53-ab1f-f26ea58833df/renditions/original/as/Side-by-Side.svg?assetname=Side-by-Side.svg",
  categoryFrenchDoor:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:82ae348a-0830-437a-8164-99bb624af6e1/renditions/original/as/French-Door.svg?assetname=French+Door.svg",
  categoryWine:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:d78ebc4a-be59-49a8-8020-a5605eb48954/renditions/original/as/Wine-Storage.svg?assetname=Wine+Storage.svg",
  categoryUndercounter:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:eaa9787b-5f84-46d7-9371-e20817c72080/renditions/original/as/Undercounter.svg?assetname=Undercounter.svg",
  categoryIceMaker:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:b90480bb-ea65-4790-816f-5abc157306e3/renditions/original/as/Ice-Makers.svg?assetname=Ice+Makers.svg",
  categoryDrawer:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:e5cd5e14-f847-4d7a-931a-dab275effc3e/renditions/original/as/Drawers.svg?assetname=Drawers.svg",
  categoryOutdoor:
    "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:abb61ac1-66b7-4185-9acf-1df361661f75/renditions/original/as/Outdoor.svg?assetname=Outdoor.svg",
  wolf: aem(
    "6acfd733-88de-4c17-9774-33e4b586e700",
    "W_SPO2450TE_S_T_Overall.avif?assetname=W_SPO2450TE_S_T_Overall.tif",
    1400,
  ),
  cove: aem(
    "0b25fcce-e900-446e-aad3-a02309cbca8a",
    "SZWC_Seattle_1359_4021FC_A_ADOBERGB.avif?assetname=SZWC_Seattle_1359_4021FC_A_ADOBERGB.tif",
    1000,
  ),
  outdoor: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=85",
};

const frenchDoorProducts = products.filter(
  (product) => product.category === "Refrigeration" && product.type === "French Door",
);

const categories = [
  { title: "Column", image: assets.categoryColumn },
  { title: "Over-and-Under", image: assets.categoryOverUnder },
  { title: "Side-by-Side", image: assets.categorySideBySide },
  { title: "French Door", image: assets.categoryFrenchDoor, active: true },
  { title: "Wine", image: assets.categoryWine },
  { title: "Undercounter", image: assets.categoryUndercounter },
  { title: "Ice Maker", image: assets.categoryIceMaker },
  { title: "Drawer", image: assets.categoryDrawer },
  { title: "Outdoor", image: assets.categoryOutdoor },
];

function ProductResultCard() {
  const product = frenchDoorProducts[0];

  if (!product) {
    return (
      <div className="mt-8 max-w-[360px] border border-[#d8d2c8] bg-[#fbfaf7] p-7">
        <p className="text-sm leading-6 text-[#5d564d]">
          French Door catalog data is ready for import. Add model records to show live products here.
        </p>
      </div>
    );
  }

  return (
    <Link
      href={`/products/${slugify(product.model)}`}
      className="mt-8 block max-w-[360px] border border-[#d8d2c8] bg-[#fbfaf7] transition hover:bg-white"
    >
      <div className="relative mx-auto mt-12 h-[340px] w-[240px]">
        <Image src={assets.model} alt={product.model} fill sizes="240px" className="object-contain" priority />
      </div>
      <div className="flex justify-end px-6 text-xs text-[#6f695f]">1 / 1</div>
      <div className="p-6 pt-3">
        <h2 className="max-w-[230px] font-serif text-[1.35rem] leading-tight">
          Classic French Door Refrigerator/Freezer
        </h2>
        <dl className="mt-5 border-t border-[#d8d2c8] text-xs">
          <div className="grid grid-cols-[90px_1fr] border-b border-[#d8d2c8] py-2">
            <dt className="text-[#6f695f]">Width:</dt>
            <dd>36&quot; 42&quot; 48&quot;</dd>
          </div>
          <div className="grid grid-cols-[90px_1fr] border-b border-[#d8d2c8] py-2">
            <dt className="text-[#6f695f]">Finish:</dt>
            <dd className="space-y-1">
              <span className="block">Panel Ready</span>
              <span className="block">Stainless Steel</span>
            </dd>
          </div>
          <div className="grid grid-cols-[90px_1fr] py-2">
            <dt className="text-[#6f695f]">Features:</dt>
            <dd>Internal Water Dispenser</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}

function ProductListing() {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-18 pt-4 text-[#171715] md:px-12 md:pb-24">
      <div className="mx-auto max-w-[1392px]">
        <p className="font-serif text-[1.65rem] leading-none">Select your category</p>
        <div className="mt-8 grid grid-cols-2 border-l border-t border-[#d2cdc1] sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
          {categories.map((category) => (
            <Link
              key={category.title}
              href="#"
              className={`group relative flex min-h-[226px] flex-col items-center justify-between border-b border-r border-[#d2cdc1] px-3 pb-5 pt-4 text-center text-[0.92rem] transition hover:bg-white ${
                category.active ? "bg-white" : "bg-[#f4f2ec]"
              }`}
            >
              {category.active ? (
                <span className="absolute right-3 top-3 text-2xl leading-none text-[#514b43]" aria-hidden="true">
                  x
                </span>
              ) : null}
              <span className="relative mt-2 h-[138px] w-full max-w-[92px]" aria-hidden="true">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="92px"
                  className="object-contain transition group-hover:opacity-80"
                />
              </span>
              <span className={category.active ? "font-bold" : ""}>{category.title}</span>
            </Link>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-b border-[#d8d2c8] pb-4 text-xs">
          <div className="flex flex-wrap gap-8">
            {["Series", "Width", "Finish"].map((label) => (
              <button key={label} type="button" className="inline-flex items-center gap-2">
                {label}
                <span aria-hidden="true">v</span>
              </button>
            ))}
          </div>
          <div className="flex gap-10">
            <span>All filters (3)</span>
            <span>Sort by v</span>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em]">Selected filters (1)</p>
          <div className="mt-3 flex items-center gap-4 text-xs">
            <span className="rounded-full border border-[#bfb7aa] px-3 py-1.5">French Doors x</span>
            <Link href="/products/refrigeration" className="underline underline-offset-2">
              Clear all
            </Link>
          </div>
        </div>

        <ProductResultCard />
        <p className="mt-12 text-center text-xs font-bold">Viewing 1 of 1</p>
      </div>
    </section>
  );
}

function PreservationStatement() {
  return (
    <section className="bg-[#f4f2ec] px-6 pb-16 text-[#171715] md:px-12 md:pb-24">
      <div className="mx-auto grid max-w-[1392px] gap-10 border-t border-transparent lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]">
        <h2 className="font-serif text-[clamp(2rem,2.6vw,3rem)] leading-tight">
          The pinnacle of food preservation
        </h2>
        <p className="max-w-[520px] text-[1rem] leading-snug">
          With revolutionary dual refrigeration, air purification, and vacuum-sealed doors, our
          products help keep your fruits bright and flavorful, your vegetables crisp, and your
          proteins in their prime longer.
        </p>
      </div>
    </section>
  );
}

function DiscoverMore() {
  return (
    <section className="bg-[#d3d0c5] px-6 py-20 text-[#171715] md:px-12 md:py-28">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="mb-10 font-serif text-[clamp(3rem,3.5vw,4rem)] leading-none">
          Discover more
        </h2>

        <div className="grid gap-2 bg-[#d3d0c5]">
          <article className="grid bg-[#fbfaf6] md:grid-cols-[0.255fr_0.745fr]">
            <div className="flex min-h-[385px] flex-col justify-between p-7 md:min-h-[540px] md:p-8">
            <div>
                <h3 className="max-w-[300px] font-serif text-[2.55rem] leading-[1.08]">
                  <span className="block whitespace-nowrap">Effortless control,</span>
                  <span className="block whitespace-nowrap">flawless flavor</span>
                </h3>
                <p className="mt-8 max-w-[295px] text-[0.95rem] leading-tight">
                Wolf equips cooks of every level with the confidence to create exquisite meals time
                and time again.
              </p>
            </div>
              <Link
                href="/products/cooking"
                className="inline-flex min-h-[34px] w-fit items-center justify-center rounded-full border border-[#171715] px-5 text-xs font-bold transition hover:bg-[#171715] hover:text-white"
              >
              Explore Wolf
            </Link>
          </div>
            <div className="relative min-h-[385px] overflow-hidden md:min-h-[540px]">
              <Image
                src={assets.discoverWolf}
                alt="Wolf range with red knobs in a bright kitchen."
                fill
                sizes="1035px"
                className="object-cover"
              />
          </div>
          </article>

          <div className="grid gap-2 md:grid-cols-2">
            {[
              {
                title: "A pristine and peaceful clean",
                copy: "Your silent partner in the kitchen, Cove's intuitive, customizable features offer a worry-free wash and dry.",
                cta: "Explore Cove",
                href: "/products",
                image: assets.discoverCove,
                alt: "Open Cove dishwasher with dishes loaded inside.",
              },
              {
                title: "Exceptional outdoor living",
                copy: "Entertain confidently outdoors with the same superior refrigeration and cooking technologies you trust from Sub-Zero and Wolf.",
                cta: "Explore Outdoor",
                href: "/products/outdoor",
                image: assets.discoverOutdoor,
                alt: "Outdoor kitchen and dining space with premium appliances.",
              },
            ].map((item) => (
              <article key={item.title} className="bg-[#fbfaf6]">
                <div className="relative min-h-[285px] overflow-hidden md:min-h-[365px]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="696px"
                    className="object-cover"
                  />
              </div>
                <div className="grid min-h-[175px] gap-7 p-7 md:grid-cols-[0.47fr_0.53fr] md:p-8">
                  <div className="flex flex-col justify-between gap-5">
                    <h3 className="font-serif text-[clamp(2.05rem,2.4vw,2.75rem)] leading-[0.98]">
                      {item.title}
                    </h3>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-[34px] w-fit items-center justify-center rounded-full border border-[#171715] px-5 text-xs font-bold transition hover:bg-[#171715] hover:text-white"
                    >
                      {item.cta}
                    </Link>
                  </div>
                  <p className="text-[0.9rem] leading-tight">
                    {item.copy}
                </p>
              </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FrenchDoorPage() {
  return (
    <main className="bg-[#f4f2ec] text-[#171715]">
      <section className="relative h-[100svh] min-h-[720px] overflow-hidden bg-[#171715] text-white">
        <Image
          src={frenchDoorHero}
          alt="Bright kitchen with Sub-Zero refrigeration."
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/38 via-black/4 to-black/0" />
        <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-black/78 via-black/34 to-transparent" />
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-12">
          <h2
            id="find-your-distinctive-sub-zero-style"
            className="font-serif text-[2.5rem] leading-none text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] md:text-[2.5rem]"
          >
            Find your distinctive Sub-Zero style
          </h2>
        </div>
      </section>

      <section className="px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-[1392px] gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(360px,0.95fr)]">
          <h1 className="font-serif text-[clamp(3.2rem,4.2vw,5rem)] leading-tight">Refrigeration</h1>
          <p className="max-w-[560px] text-[1rem] leading-snug">
            Our refrigerators and freezers elevate preservation, extending the life of every
            ingredient with precision and care. Crafted to the highest standards, they reflect a
            brand where exceptional quality and deep respect for food go hand in hand.
          </p>
        </div>
      </section>

      <ProductListing />
      <PreservationStatement />
      <DiscoverMore />
    </main>
  );
}
