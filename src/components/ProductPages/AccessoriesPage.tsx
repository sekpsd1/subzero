import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: "filters-cleaning",
    title: "Filters and Cleaning",
    copy: "Find genuine air-purification filters, water filters, and cleaning kits to keep your appliances performing and looking their best.",
    icon: "cleaning",
  },
  {
    id: "replacements-add-ons",
    title: "Replacements and Add-ons",
    copy: "Discover add-on accessories and replacement accessories—like refrigerator shelves and bake stone kits—made specifically for Sub-Zero and Wolf appliances.",
    icon: "replacement",
  },
  {
    id: "installation",
    title: "Installation",
    copy: "Find installation accessories required to ensure safety, compliance, and your preferred look.",
    icon: "installation",
  },
] as const;

const tabs = [
  { label: "Accessories Home", href: "#accessories-home" },
  ...categories.map((category) => ({
    label: category.title,
    href: `#${category.id}`,
  })),
];

export function AccessoriesPage() {
  return (
    <main id="accessories-home" className="bg-white text-[#343432]">
      <div className="h-[68px] bg-[#171715] md:h-[78px]" />

      <div className="mx-auto max-w-[1070px] px-5 pb-24 pt-4 md:px-0 md:pb-32">
        <nav aria-label="Breadcrumb" className="text-[11px] text-[#555550]">
          <Link href="/" className="underline underline-offset-2 hover:text-[#1688c7]">
            Home
          </Link>
          <span className="mx-2" aria-hidden="true">›</span>
          <span>Accessories</span>
        </nav>

        <nav aria-label="Accessories categories" className="mt-16 grid border border-[#dededb] md:grid-cols-4">
          {tabs.map((tab, index) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex min-h-12 items-center justify-center px-3 text-center text-[11px] font-semibold uppercase tracking-[0.03em] transition hover:bg-[#efefed] ${
                index === 0 ? "bg-white" : "border-t border-[#d2d2cf] bg-[#e8e8e6] md:border-l md:border-t-0"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <section className="pt-20 text-center md:pt-[82px]">
          <h1 className="text-[34px] font-light leading-[1.16] md:text-[36px]">Shop accessories</h1>
          <div className="mx-auto mt-5 h-px w-28 bg-[#d6d6d2]" />
          <p className="mx-auto mt-9 max-w-[880px] text-[13px] leading-[1.55] text-[#555550]">
            Find genuine accessories to help your appliances look and perform their best. Select a category, or find accessories related to your registered products below.
          </p>

          <div className="mt-14 grid gap-16 md:grid-cols-3 md:gap-10">
            {categories.map((category) => (
              <article id={category.id} key={category.id} className="scroll-mt-28 text-center">
                <Link
                  href={`#${category.id}`}
                  className="text-[15px] font-semibold uppercase tracking-[0.075em] text-[#1688c7] underline underline-offset-2"
                >
                  {category.title}
                </Link>
                <div className="mx-auto mt-11 flex h-[126px] items-center justify-center text-[#777774]">
                  <CategoryIcon type={category.icon} />
                </div>
                <p className="mx-auto mt-7 max-w-[285px] text-[13px] leading-[1.48] text-[#555550]">
                  {category.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-20 text-center md:pt-16">
          <h2 className="text-[28px] font-light leading-tight md:text-[31px]">Log in to view your registered products</h2>
          <Link href="#" className="mt-12 inline-flex h-11 min-w-40 items-center justify-center rounded-full border border-[#777774] px-8 text-[12px] font-semibold transition hover:bg-[#171715] hover:text-white">
            Log In
          </Link>
        </section>

        <section className="mt-16 border-y border-[#d8d8d4] py-16 text-center md:mt-20">
          <h2 className="text-[29px] font-light leading-tight md:text-[32px]">Find compatible accessories by product</h2>
          <div className="mx-auto mt-14 max-w-[450px]">
            <label className="flex h-11 items-center border border-[#d4d4d1] bg-white px-3 text-[#8a8a86]" htmlFor="accessory-model-search">
              <Search size={17} strokeWidth={1.4} aria-hidden="true" />
              <input
                id="accessory-model-search"
                type="search"
                placeholder="Model, serial, or filter #"
                className="min-w-0 flex-1 bg-transparent px-3 text-[12px] outline-none placeholder:text-[#92928e]"
              />
              <span className="text-2xl font-extralight" aria-hidden="true">×</span>
            </label>
            <Link href="/support/product-information" className="mt-2 block text-left text-[11px] text-[#1688c7] underline">
              Where to find your model or serial number
            </Link>
          </div>
        </section>

        <section className="grid items-center gap-8 border-b border-[#d8d8d4] py-16 md:grid-cols-[1fr_290px] md:px-24">
          <div className="text-center">
            <h2 className="text-[14px] font-semibold uppercase tracking-[0.09em]">Full Suite Savings</h2>
            <p className="mx-auto mt-5 max-w-[360px] text-[13px] leading-[1.45] text-[#666661]">
              Owners, your appliance purchase may qualify you for special savings. Learn more about current regional promotions.
            </p>
            <Link href="#" className="mt-8 inline-flex h-11 min-w-40 items-center justify-center rounded-full border border-[#777774] px-7 text-[12px] font-semibold transition hover:bg-[#171715] hover:text-white">
              Learn More
            </Link>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden bg-[#443b35]">
            <Image src="/assets/subzero/home-hero.avif" alt="Sub-Zero and Wolf kitchen appliances" fill sizes="290px" className="object-cover opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center bg-[#302824]/35 p-7 text-center text-white">
              <p className="border border-white/70 px-6 py-4 font-serif text-2xl leading-none">Full Suite<br /><span className="text-3xl">SAVINGS</span></p>
            </div>
          </div>
        </section>

        <section className="pt-16 text-center md:pt-20">
          <h2 className="text-[30px] font-light leading-tight md:text-[34px]">Factory certified parts and service</h2>
          <div className="mx-auto mt-5 h-px w-24 bg-[#d6d6d2]" />
          <div className="mt-20 grid gap-20 md:grid-cols-2 md:gap-28 md:px-28">
            <ServiceCard kind="parts" title="Looking for a replacement or add-on part?" cta="Find Parts">
              Factory Certified Parts providers carry genuine parts for dependable fit, performance, and long-term support.
            </ServiceCard>
            <ServiceCard kind="service" title="Need your appliances serviced?" cta="Find Service">
              Professional, trained technicians provide product maintenance, diagnostics, and repair using genuine parts.
            </ServiceCard>
          </div>
        </section>
      </div>
    </main>
  );
}

function ServiceCard({ kind, title, cta, children }: { kind: "parts" | "service"; title: string; cta: string; children: React.ReactNode }) {
  return (
    <article className="text-center">
      <h3 className="mx-auto max-w-[270px] text-[14px] font-semibold uppercase leading-[1.25] tracking-[0.06em]">{title}</h3>
      <div className="mx-auto mt-9 flex h-[112px] items-center justify-center text-[#999995]">
        <ServiceIcon kind={kind} />
      </div>
      <p className="mx-auto mt-8 max-w-[310px] text-[13px] leading-[1.48] text-[#666661]">{children}</p>
      <Link href="/support/customer-care" className="mt-8 inline-flex h-11 min-w-40 items-center justify-center rounded-full border border-[#777774] px-7 text-[12px] font-semibold transition hover:bg-[#171715] hover:text-white">{cta}</Link>
    </article>
  );
}

function CategoryIcon({ type }: { type: (typeof categories)[number]["icon"] }) {
  if (type === "cleaning") {
    return <svg viewBox="0 0 100 130" className="h-[118px] w-[92px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M42 11h14v10h-3v8l14 8v75c-13 5-27 5-40 0V37l14-8v-8h-3V11h4Z"/><path d="M55 43c0 12 14 21 14 37 0 10-6 17-14 17s-14-7-14-17c0-16 14-25 14-37Z"/></svg>;
  }
  if (type === "replacement") {
    return <svg viewBox="0 0 140 120" className="h-[118px] w-[132px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="27" y="30" width="36" height="35"/><path d="M45 38v19M36 47.5h18M63 21h43v75H63zM76 33h30M76 88h30M114 27h13v69h-13M119 20l7 7-7 7M119 89l7 7-7 7"/></svg>;
  }
  return <svg viewBox="0 0 90 130" className="h-[118px] w-[84px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="22" y="10" width="46" height="102"/><path d="M22 95h46M26 101h38"/></svg>;
}

function ServiceIcon({ kind }: { kind: "parts" | "service" }) {
  if (kind === "parts") {
    return <svg viewBox="0 0 130 120" className="h-[110px] w-[122px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m43 83-6 27 15-10 15 10-5-29"/><circle cx="52" cy="55" r="24"/><path d="m52 23 7 8 10-2 3 10 10 3-2 10 8 7-8 7 2 10-10 3-3 10-10-2-7 8-7-8-10 2-3-10-10-3 2-10-8-7 8-7-2-10 10-3 3-10 10 2 7-8Z"/><circle cx="91" cy="58" r="22"/><path d="m91 29 6 7 9-2 3 9 9 3-2 9 7 6-7 6 2 9-9 3-3 9-9-2-6 7"/></svg>;
  }
  return <svg viewBox="0 0 130 120" className="h-[110px] w-[122px]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="18" y="17" width="46" height="66"/><rect x="72" y="17" width="40" height="82"/><path d="M18 73h46M26 90h38M25 99h30"/><circle cx="31" cy="91" r="3"/><circle cx="43" cy="91" r="3"/><path d="m64 80 11-8 11 8v23l-11 10-11-10Z"/></svg>;
}
