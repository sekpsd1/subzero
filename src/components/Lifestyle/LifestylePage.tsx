import Image from "next/image";
import Link from "next/link";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const assets = {
  hero: `${aem}dc06adc4-b4f1-4d7b-b8a3-04f99fee1306/as/TLK-Home-page.avif?assetname=TLK+Home+page.png&width=1920&max-quality=90`,
  logo: `${aem}0487d770-4831-4490-b965-005a15c7c4b1/renditions/original/as/TLK_logo_black.svg?assetname=TLK_logo_black.svg`,
  artist: `${aem}f4e9a77e-50af-48de-9f6c-8ca71a7f8120/as/Rectangle-135975.avif?assetname=Rectangle+135975.png&width=1920&max-quality=90`,
  hedges: `${aem}9aa27f3b-f380-4401-8cd0-cba5418e52b4/as/An_Artists_Abode_8.avif?assetname=An_Artists_Abode_8.png&width=992&max-quality=90`,
  arizona: `${aem}9547b708-881b-4ed0-a33f-88dd2f3c6a21/as/Arizona_Calling_8.avif?assetname=Arizona_Calling_8.png&width=992&max-quality=90`,
  pasta: `${aem}dea7a4dd-a68d-48ba-a1ee-2f9ca58bc75d/as/Peace_Love_Pasta_1.avif?assetname=Peace_Love_Pasta_1.png&width=992&max-quality=90`,
  everyday: `${aem}6d098554-2ec5-43e2-807b-8f1661aba38c/as/16_10.avif?assetname=16_10.png&width=992&max-quality=90`,
  culture: `${aem}0bf76202-ffaa-451d-81e9-a3b62f586ea5/as/Chefs_Craft_Culture_12.avif?assetname=Chefs_Craft_Culture_12.png&width=992&max-quality=90`,
  tea: `${aem}6d3122cd-5598-49fd-9417-70ea8728e2d0/as/Steeped_in_Intention_8.avif?assetname=Steeped_in_Intention_8.png&width=992&max-quality=90`,
  details: `${aem}461c13cf-9225-442a-9dd2-1f07ab865e79/as/Designing_the_Details_5.avif?assetname=Designing_the_Details_5.png&width=1920&max-quality=90`,
  liberty: `${aem}dd365020-bd0e-4324-bec7-80cd1f5a5a7a/as/IMG_7697_darylnn.avif?assetname=IMG_7697_darylnn.jpg&width=1280&max-quality=90`,
  limits: `${aem}c8b48df1-c58e-4af4-bf27-da2b56463567/as/2508-06-0726_16x8.avif?assetname=2508-06+0726_16x8.png&width=1280&max-quality=90`,
};

const articles = [
  { category: "Design", title: "A Peek Behind the Hedges", copy: "Photographer and designer Blue Carreon shares an inside look at glorious gardens in the Hamptons.", image: assets.hedges, href: "https://lifestyle.subzero-wolf.com/design/a-peek-behind-the-hedges" },
  { category: "Food", title: "Arizona Calling", copy: "Chef Derek Biazo brings his talents and tastes to Scottsdale’s Sub-Zero, Wolf, and Cove customers.", image: assets.arizona, href: "https://lifestyle.subzero-wolf.com/food/arizona-calling" },
  { category: "Food", title: "Peace, Love & Pasta", copy: "A conversation with Chef Scott Conant, whose new Bahamas restaurant is gaining raves.", image: assets.pasta, href: "https://lifestyle.subzero-wolf.com/food/peace-love-pasta" },
  { category: "Design", title: "Everyday Living", copy: "Morrison Interiors showcase Sub-Zero, Wolf, and Cove products in unexpected living spaces.", image: assets.everyday, href: "https://lifestyle.subzero-wolf.com/design/everyday-living" },
  { category: "Places", title: "Chefs, Crafts, & Culture", copy: "Baha Mar celebrates local culture at its annual Bahamas Culinary & Arts Festival.", image: assets.culture, href: "https://lifestyle.subzero-wolf.com/places/chefs-crafts-and-culture" },
  { category: "Lifestyle", title: "Steeped in Intention", copy: "How to host an ideal tea party with a curated menu, elegant linens, sophisticated china, and graceful extras.", image: assets.tea, href: "https://lifestyle.subzero-wolf.com/lifestyle/steeped-in-intention" },
] as const;

const closingArticles = [
  { category: "Lifestyle", title: "Liberty and Legacy", copy: "For America’s 250th anniversary, Sub-Zero, Wolf, and Cove’s Miami & Georgia Showrooms honored veterans.", image: assets.liberty, href: "https://lifestyle.subzero-wolf.com/lifestyle/liberty-and-legacy" },
  { category: "Design", title: "Testing the Limits", copy: "Architect Ezra Lee’s family estate in the Utah mountains melds sleek style with a sense of play.", image: assets.limits, href: "https://lifestyle.subzero-wolf.com/design/testing-the-limits" },
] as const;

const serif = { fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif' };

function StoryCard({ story, closing = false }: { story: (typeof articles)[number] | (typeof closingArticles)[number]; closing?: boolean }) {
  return (
    <article className="flex h-full flex-col bg-[#fbfaf6]">
      <Link href={story.href} className={`group relative block overflow-hidden ${closing ? "aspect-[1.5]" : "aspect-[1.6]"}`}>
        <Image src={story.image} alt={story.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
      </Link>
      <div className={`flex flex-1 flex-col px-5 pb-5 pt-4 md:px-6 md:pb-7 md:pt-5 ${closing ? "md:min-h-[280px]" : "md:min-h-[300px]"}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">{story.category}</p>
        <h3 style={serif} className="mt-2 text-[28px] font-normal leading-[1.06] md:text-[40px]">{story.title}</h3>
        <p className="mt-4 text-[13px] font-light leading-[1.45] text-[#34332f] md:text-[14px]">{story.copy}</p>
        <Link href={story.href} className="mt-7 text-[14px] font-medium md:mt-auto" style={{ textDecoration: "underline", textUnderlineOffset: "25%" }}>
          Read {story.title}
        </Link>
      </div>
    </article>
  );
}

export function LifestylePage() {
  return (
    <main className="overflow-hidden bg-[#efede5] text-[#181817]">
      <section className="relative h-[72svh] min-h-[540px] md:h-[100svh] md:min-h-[760px] md:max-h-[1080px]">
        <Image src={assets.hero} alt="Clifftop home overlooking the ocean at sunset" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-7 md:px-6 md:pb-6">
          <h1 style={serif} className="text-[34px] font-normal leading-[1.1] text-[#fbf9f5] md:text-[40px]">The art of living well</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1392px] gap-8 px-5 pb-14 pt-14 md:grid-cols-[0.58fr_0.42fr] md:items-center md:px-0 md:pb-20 md:pt-16">
        <div className="relative h-[84px] w-[280px] md:h-[112px] md:w-[370px]">
          <Image src={assets.logo} alt="The Living Kitchen" fill sizes="370px" className="object-contain object-left" />
        </div>
        <p style={serif} className="max-w-[580px] text-[19px] leading-[1.18] md:text-[22px]">
          The Living Kitchen magazine is dedicated to those who seek the extraordinary in every aspect of life. Explore our curated selection of lifestyle articles celebrating design, cuisine, travel, wellness, and more.
        </p>
      </section>

      <section className="mx-auto max-w-[1392px] px-5 pb-24 md:px-0 md:pb-40">
        <nav aria-label="Living Kitchen categories" className="mb-6 flex w-max max-w-full gap-0 overflow-x-auto rounded-full border border-[#c7c3b9] p-1 text-[11px] font-semibold [scrollbar-width:none]">
          {['All stories', 'Food', 'Design', 'Places', 'Innovation', 'Lifestyle'].map((category, index) => (
            <span key={category} className={`shrink-0 rounded-full px-4 py-2 ${index === 0 ? 'bg-[#181817] text-white' : 'bg-transparent'}`}>{category}</span>
          ))}
        </nav>

        <article className="grid overflow-hidden bg-[#fbfaf6] md:min-h-[650px] md:grid-cols-[0.255fr_0.745fr]">
          <div className="flex min-h-[330px] flex-col p-6 md:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">Design</p>
            <h2 style={serif} className="mt-3 text-[32px] font-normal leading-[1.05] md:text-[40px]">An Artist’s Abode</h2>
            <p className="mt-4 text-[13px] font-light leading-[1.5] text-[#34332f]">A fusion of historic charm and modern functionality from Tennessee-based Pfeffer Torode Architecture.</p>
            <Link href="https://lifestyle.subzero-wolf.com/design/an-artists-abode" className="mt-auto text-[14px] font-medium" style={{ textDecoration: "underline", textUnderlineOffset: "25%" }}>Read An Artist’s Abode</Link>
          </div>
          <div className="relative min-h-[390px] md:min-h-0">
            <Image src={assets.artist} alt="An elegant art-filled living room" fill sizes="(min-width: 768px) 73vw, 100vw" className="object-cover" />
          </div>
        </article>

        <div className="mt-4 grid gap-x-2 gap-y-4 md:grid-cols-3">
          {articles.map((story) => <StoryCard key={story.title} story={story} />)}
        </div>

        <article className="mt-4 grid overflow-hidden bg-[#fbfaf6] md:min-h-[650px] md:grid-cols-[0.255fr_0.745fr]">
          <div className="flex min-h-[330px] flex-col p-6 md:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em]">Innovation</p>
            <h2 style={serif} className="mt-3 text-[32px] font-normal leading-[1.05] md:text-[40px]">Designing the Details</h2>
            <p className="mt-4 text-[13px] font-light leading-[1.5] text-[#34332f]">Art and engineering inform the work of Sub-Zero Industrial Designer Anne Hardy.</p>
            <Link href="https://lifestyle.subzero-wolf.com/innovation/designing-the-details" className="mt-auto text-[14px] font-medium" style={{ textDecoration: "underline", textUnderlineOffset: "25%" }}>Read Designing the Details</Link>
          </div>
          <div className="relative min-h-[420px] md:min-h-0"><Image src={assets.details} alt="Sub-Zero industrial designer Anne Hardy" fill sizes="(min-width: 768px) 73vw, 100vw" className="object-cover" /></div>
        </article>

        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {closingArticles.map((story) => <StoryCard key={story.title} story={story} closing />)}
        </div>

        <div className="mt-8 text-center">
          <Link href="https://lifestyle.subzero-wolf.com/" className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#181817] px-6 text-[11px] font-semibold text-white">View more results</Link>
          <p className="mt-3 text-[11px] text-[#5b5953]">Viewing 10 of 205</p>
        </div>
      </section>
    </main>
  );
}
