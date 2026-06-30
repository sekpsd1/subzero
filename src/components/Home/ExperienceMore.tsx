import Image from "next/image";

const experienceCards = [
  {
    title: "The Living Kitchen",
    description:
      "Celebrating the intersection of high-performance design, gastronomic magic, and modern living, each issue offers a behind-the-scenes look at the art of living well.",
    cta: "Explore The Living Kitchen",
    href: "https://lifestyle.subzero-wolf.com/",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:2424b3be-3f5c-43a5-a272-63dd7a544a70/as/Harvest-HAven-4792.avif?assetname=Harvest+HAven-4792.jpg",
    alt: "The Living Kitchen exterior",
  },
  {
    title: "Recipes from our chefs",
    description:
      "Our curated collection of gourmet recipes invites you to explore bold flavors and culinary techniques, while our state-of-the-art appliances elevate your cooking experience to new heights.",
    cta: "Explore recipes",
    href: "/journal/recipes",
    image:
      "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:ee50decd-524d-41b1-99b6-d192d648ecff/as/Cropped_SZ2100875--60074380.avif?assetname=Cropped_SZ2100875--60074380.jpg",
    alt: "Chef-prepared fish dish",
  },
];

export function ExperienceMore() {
  return (
    <section className="bg-[#d5d2c8] px-5 py-20 text-[#171715] md:px-8 md:py-24">
      <div className="mx-auto max-w-[1392px]">
        <h2 className="font-serif text-[44px] leading-none md:text-[58px]">
          Experience more
        </h2>

        <div className="mt-10 grid gap-2 lg:grid-cols-2">
          {experienceCards.map((card) => (
            <article key={card.title} className="bg-[#f7f5ef]">
              <div className="relative aspect-[1.6] overflow-hidden bg-[#c8c4b8]">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="grid gap-8 px-6 py-6 md:grid-cols-[240px_1fr] md:px-6 md:py-7">
                <div>
                  <h3 className="font-serif text-[36px] leading-[1.08]">
                    {card.title}
                  </h3>
                  <a
                    href={card.href}
                    className="mt-8 inline-flex h-12 min-w-[234px] items-center justify-center whitespace-nowrap rounded-full border border-[#171715] px-8 text-sm font-semibold text-[#171715] transition hover:bg-[#171715] hover:text-white"
                  >
                    {card.cta}
                  </a>
                </div>

                <p className="text-base leading-[1.22]">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
