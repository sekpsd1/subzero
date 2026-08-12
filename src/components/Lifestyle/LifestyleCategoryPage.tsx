import Image from "next/image";
import Link from "next/link";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const images = {
  hero: `${aem}259150ae-f5d9-45d7-9eed-8d4f2e013070/as/TLK-Lifestyle.avif?assetname=TLK+Lifestyle.png&width=1920&max-quality=90`,
  steeped: `${aem}6d3122cd-5598-49fd-9417-70ea8728e2d0/as/Steeped_in_Intention_8.avif?assetname=Steeped_in_Intention_8.png&width=1920&max-quality=90`,
  liberty: `${aem}dd365020-bd0e-4324-bec7-80cd1f5a5a7a/as/IMG_7697_darylnn.avif?assetname=IMG_7697_darylnn.jpg&width=1920&max-quality=90`,
  ground: `${aem}373d37c9-4358-4ca6-b46c-7ce958e5d85a/as/barn.avif?assetname=barn.png&width=1920&max-quality=90`,
  cause: `${aem}b7145af2-a0e7-43c4-97eb-ac8e91d9d2fe/as/a-cool-cause-card.avif?assetname=a-cool-cause-card.png&width=1920&max-quality=90`,
  celebrations: `${aem}73a92db9-a468-4a34-8860-ca02dae8abd2/as/a-year-of-celebrations-card.avif?assetname=a-year-of-celebrations-card.png&width=1920&max-quality=90`,
  fungi: `${aem}21ae0377-45d5-468b-a5aa-ecaaf49ff6ec/as/fabulous-fungi-card.avif?assetname=fabulous-fungi-card.png&width=1920&max-quality=90`,
  organic: `${aem}bda03f47-f98c-4a7f-9fe7-1ecd5124bafc/as/organic-elegance-card.avif?assetname=organic-elegance-card.png&width=1920&max-quality=90`,
  positive: "https://lifestyle.subzero-wolf.com/lifestyle/media_1fe1a17d944b581ca201acf907a0225abd45c77f0.png?width=1200&format=pjpg&optimize=medium&width=1920&max-quality=90",
  antique: "https://lifestyle.subzero-wolf.com/lifestyle/media_19c6d9fdb95a5c0c3abecbc027ea043993d5b5740.png?width=1200&format=pjpg&optimize=medium&width=1920&max-quality=90",
  suppers: "https://lifestyle.subzero-wolf.com/lifestyle/media_1f7e042a0be6a1e173f5000e02a15265b3f113db5.png?width=1200&format=pjpg&optimize=medium&width=1920&max-quality=90",
};

type Story = { title: string; copy: string; image: string; href: string };

const stories: Story[] = [
  { title: "Liberty and Legacy", copy: "For America’s 250th anniversary, Sub-Zero, Wolf, and Cove’s Miami & Georgia Showrooms honored veterans.", image: images.liberty, href: "https://lifestyle.subzero-wolf.com/lifestyle/liberty-and-legacy" },
  { title: "From the Ground Up", copy: "Harvest Haven farmers provide abundant fresh ingredients for Sub-Zero corporate chefs.", image: images.ground, href: "https://lifestyle.subzero-wolf.com/lifestyle/from-the-ground-up" },
  { title: "A Cool Cause", copy: "The Sub-Zero Group Foundation is helping turn the tide against type 1 diabetes.", image: images.cause, href: "https://lifestyle.subzero-wolf.com/lifestyle/a-cool-cause" },
  { title: "A Year of Celebrations", copy: "Sub-Zero, Wolf, and Cove showrooms have hosted events coast-to-coast honoring Sub-Zero’s 80th anniversary of industry-leading innovation and design.", image: images.celebrations, href: "https://lifestyle.subzero-wolf.com/lifestyle/a-year-of-celebrations" },
  { title: "Fabulous Fungi", copy: "Mushrooms are a natural wellness option that are delicious, easy to find in most grocery stores, sustainable and come in many flavors, shapes, sizes and colors.", image: images.fungi, href: "https://lifestyle.subzero-wolf.com/lifestyle/fabulous-fungi" },
  { title: "Organic Elegance", copy: "Clean, conscious wine from Cameron Diaz and Katherine Power redefines the standard.", image: images.organic, href: "https://lifestyle.subzero-wolf.com/lifestyle/organic-elegance" },
];

const finalStories: Story[] = [
  { title: "Antique Aesthetic", copy: "Discover how Dianne O’Connor weaves vintage décor and heirloom pieces to bring charm and character to modern homes and entertaining spaces.", image: images.antique, href: "https://lifestyle.subzero-wolf.com/lifestyle/antique-aesthetic" },
  { title: "Superb Suppers", copy: "The Riggs Showroom located in San Francisco’s historic Design Center is the place to mingle, dine, and learn about Sub-Zero, Wolf, and Cove appliances in style.", image: images.suppers, href: "https://lifestyle.subzero-wolf.com/lifestyle/superb-suppers" },
];

const serif = { fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif' };

function StoryCard({ story, wide = false }: { story: Story; wide?: boolean }) {
  return (
    <article className="flex h-full flex-col bg-[#fbfaf6]">
      <Link href={story.href} className="group relative block aspect-[1.6] overflow-hidden">
        <Image src={story.image} alt={story.title} fill sizes={wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} className="object-cover transition duration-700 group-hover:scale-[1.025]" />
      </Link>
      <div className={`flex flex-1 flex-col px-5 pb-6 pt-4 md:px-6 ${wide ? "md:min-h-[281px]" : "md:min-h-[300px]"}`}>
        <p className="text-[11px] font-light uppercase leading-[1.22] tracking-[0.2em] md:text-[13px]">Lifestyle</p>
        <h2 style={serif} className="mt-2 text-[29px] font-extralight leading-[1.1] md:text-[40px]">{story.title}</h2>
        <p className="mt-4 text-[14px] font-extralight leading-[1.3] text-[#3f3d38] md:mt-6 md:text-[16px] md:leading-[1.22]">{story.copy}</p>
        <Link href={story.href} className="mt-8 text-[14px] font-medium leading-[1.22] md:mt-auto md:min-h-[41px]" style={{ textDecoration: "underline", textUnderlineOffset: "25%" }}>
          Read {story.title}
        </Link>
      </div>
    </article>
  );
}

function FeatureStory({ title, copy, image, href }: Story) {
  return (
    <article className="grid overflow-hidden bg-[#fbfaf6] md:min-h-[540px] md:grid-cols-[0.255fr_0.745fr] min-[1440px]:min-h-[650px]!">
      <div className="flex min-h-[310px] flex-col p-6">
        <p className="text-[11px] font-light uppercase leading-[1.22] tracking-[0.2em] md:text-[13px]">Lifestyle</p>
        <h2 style={serif} className="mt-2 text-[32px] font-extralight leading-[1.1] md:text-[40px]">{title}</h2>
        <p className="mt-4 text-[14px] font-extralight leading-[1.3] text-[#3f3d38] md:mt-6 md:text-[16px] md:leading-[1.22]">{copy}</p>
        <Link href={href} className="mt-auto min-h-[41px] text-[14px] font-medium leading-[1.22]" style={{ textDecoration: "underline", textUnderlineOffset: "25%" }}>
          Read {title}
        </Link>
      </div>
      <Link href={href} className="group relative min-h-[390px] overflow-hidden md:min-h-0">
        <Image src={image} alt={title} fill sizes="(min-width: 768px) 75vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.015]" />
      </Link>
    </article>
  );
}

export function LifestyleCategoryPage() {
  return (
    <main className="overflow-hidden bg-[#efede5] text-[#181817]">
      <section className="relative h-[72svh] min-h-[530px] md:h-[100svh] md:min-h-[720px] md:max-h-[1080px]">
        <Image src={images.hero} alt="A serene private wellness space overlooking the sea" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <h1 style={serif} className="absolute bottom-7 left-5 max-w-[820px] text-[36px] font-normal leading-[1.04] text-[#fbfaf6] md:bottom-6 md:left-6 md:text-[40px]">
          Elevated living
        </h1>
      </section>

      <section className="mx-auto max-w-[1392px] px-5 pb-8 pt-12 md:px-0 md:pb-6 md:pt-16">
        <FeatureStory title="Steeped in Intention" copy="How to host an ideal tea party with a curated menu, elegant linens, sophisticated china, and graceful extras." image={images.steeped} href="https://lifestyle.subzero-wolf.com/lifestyle/steeped-in-intention" />
        <div className="mt-4 grid gap-x-2 gap-y-4 md:grid-cols-3">
          {stories.map((story) => <StoryCard key={story.title} story={story} />)}
        </div>
        <div className="mt-4">
          <FeatureStory title="Positive Energy" copy="Explore sacred sites across the globe, including some of the best places for vortexes which are believed by some to be concentrated portals of vitality." image={images.positive} href="https://lifestyle.subzero-wolf.com/lifestyle/positive-energy" />
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {finalStories.map((story) => <StoryCard key={story.title} story={story} wide />)}
        </div>
        <div className="mt-9 text-center">
          <Link href="https://lifestyle.subzero-wolf.com/lifestyle" className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#181817] px-6 text-[11px] font-semibold text-white">View more results</Link>
          <p className="mt-3 text-[11px] text-[#5b5953]">Viewing 10 of 24</p>
        </div>
      </section>
      <div className="hidden h-32 md:block" aria-hidden="true" />
    </main>
  );
}
