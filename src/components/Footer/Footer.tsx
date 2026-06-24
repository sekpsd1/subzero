import Link from "next/link";

const footerGroups = [
  {
    title: "Products",
    links: ["Refrigeration", "Cooking", "Outdoor"],
  },
  {
    title: "Professionals",
    links: ["Specification Library", "Brochure", "Future Products", "Kitchen Design Contest"],
  },
  {
    title: "Owner Support",
    links: ["Certified Parts & Service", "Help & Support", "Dealers", "Warranty"],
  },
  {
    title: "About Us",
    links: ["The Sub-Zero Story", "Company Milestones", "Sustainability"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0F0F0F] px-6 py-16 text-[#FBF9F5] md:px-12">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="font-serif text-3xl">Sub-Zero Wolf SEA</p>
          <p className="mt-5 max-w-md text-sm leading-7 text-stone-400">
            A regional platform for luxury appliance discovery, showroom
            appointments, product specifications, and owner support.
          </p>
          <form className="mt-8 flex max-w-md gap-2">
            <input
              aria-label="Email signup"
              placeholder="Email address"
              className="min-w-0 flex-1 border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none"
            />
            <button className="border border-white px-5 text-xs uppercase tracking-[0.22em]" type="button">
              Sign Up
            </button>
          </form>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">{group.title}</p>
              <div className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="block text-sm text-stone-300 transition hover:text-white"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-14 flex flex-wrap justify-between gap-6 border-t border-white/10 pt-8 text-xs text-stone-500">
        <div className="flex flex-wrap gap-4">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Use</Link>
          <Link href="#">Cookie Settings</Link>
          <Link href="/sitemap.xml">Product Sitemap</Link>
        </div>
        <p>Instagram / LinkedIn / YouTube / XHS</p>
      </div>
    </footer>
  );
}
