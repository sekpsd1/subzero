import Image from "next/image";
import Link from "next/link";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const images = {
  hero: `${aem}8d7116fd-f382-423a-b512-9ef608ca2c1a/as/TLK-Innovation.avif?assetname=TLK+Innovation.png&width=1920&max-quality=90`,
  details: `${aem}461c13cf-9225-442a-9dd2-1f07ab865e79/as/Designing_the_Details_5.avif?assetname=Designing_the_Details_5.png&width=1920&max-quality=90`,
  ice: `${aem}90c084a3-15a1-4cd1-b2d1-37dccafdfb88/as/SUB_Tabletop_Ice.avif?assetname=SUB_Tabletop_Ice.png&width=1920&max-quality=90`,
  bold: `${aem}2ec89cea-38b6-454c-a15f-3e06c6e62b51/as/bold-and-beautiful-card.avif?assetname=bold-and-beautiful-card.png&width=1920&max-quality=90`,
  expertise: `${aem}7c45d965-82ac-4138-bc3a-bbf9f6b98a61/as/strategic_expertise_card.avif?assetname=strategic_expertise_card.png&width=1920&max-quality=90`,
  spotless: "https://lifestyle.subzero-wolf.com/innovation/media_13e5ff91dd3c983f4cd5528972842358403490564.png?width=1200&format=pjpg&optimize=medium&width=1920&max-quality=90",
  history: `${aem}f775532f-574a-4daa-b38f-e94bcb4e79b8/as/history-of-innovation-card.avif?assetname=history-of-innovation-card.png&width=1920&max-quality=90`,
  smart: "https://lifestyle.subzero-wolf.com/innovation/media_1cbae7cf5916775849b5e5a72f81585a44a04ed75.avif?width=1200&format=pjpg&optimize=medium&width=1920&max-quality=90",
  results: "https://lifestyle.subzero-wolf.com/innovation/media_16602c6ce48496bf9b6ce443ab460e529188fea04.png?width=1200&format=pjpg&optimize=medium&width=1920&max-quality=90",
  flair: "https://lifestyle.subzero-wolf.com/innovation/media_1eb33dabcaa1aaa0bf9b6920584afd23a870615bf.png?width=1200&format=pjpg&optimize=medium&width=1920&max-quality=90",
  pace: "https://lifestyle.subzero-wolf.com/innovation/media_1292f9aada4840c80073f0f05efbd275e34f2e051.png?width=1200&format=pjpg&optimize=medium&width=1920&max-quality=90",
};

type Story = {
  title: string;
  copy: string;
  image: string;
  href: string;
};

const stories: Story[] = [
  {
    title: "Elevated Ice",
    copy: "The innovative Designer Series Ice Maker from Sub-Zero takes your beverages to the next level.",
    image: images.ice,
    href: "https://lifestyle.subzero-wolf.com/innovation/elevated-ice",
  },
  {
    title: "Bold and Beautiful",
    copy: "With stainless steel construction, heavy-duty handles, and iconic knobs and bezels, the Wolf Professional Induction Range makes a statement in home kitchens.",
    image: images.bold,
    href: "https://lifestyle.subzero-wolf.com/innovation/bold-and-beautiful",
  },
  {
    title: "Strategic Expertise",
    copy: "Greg Beal leverages decades of experience at Sub-Zero Group, Inc. to lead a design engineering team focused on continuously improving appliance reliability, manufacturing efficiency, and overall customer experience.",
    image: images.expertise,
    href: "https://lifestyle.subzero-wolf.com/innovation/strategic-expertise",
  },
  {
    title: "Spotless Performance",
    copy: "Cove Wi Fi Enabled Smart Dishwashers are adaptable to any home and homeowner thanks to a new advanced wash system and ADA-height-compatible model.",
    image: images.spotless,
    href: "https://lifestyle.subzero-wolf.com/innovation/spotless-performance",
  },
  {
    title: "History of Innovation",
    copy: "The story of Sub-Zero, Wolf, and Cove is one of old-fashioned ingenuity matched with a constant commitment to innovation.",
    image: images.history,
    href: "https://lifestyle.subzero-wolf.com/innovation/history-of-innovation",
  },
  {
    title: "Smart Cuisine",
    copy: "Sub-Zero, Wolf, and Cove launches new features within the Owner’s App to help customers maximize the benefits of their luxury kitchen appliances.",
    image: images.smart,
    href: "https://lifestyle.subzero-wolf.com/innovation/smart-cuisine",
  },
];

const finalStories: Story[] = [
  {
    title: "Function And Flair",
    copy: "New accent door options and dual installation kits from Wolf appliances allow owners to personalize their kitchen while showing off culinary skills.",
    image: images.flair,
    href: "https://lifestyle.subzero-wolf.com/innovation/function-and-flair",
  },
  {
    title: "Picking Up The Pace",
    copy: "The Wolf Speed Oven offers all-in-one versatility combining microwave, convection, and broil technologies, enabling delicious meals in a fraction of the time.",
    image: images.pace,
    href: "https://lifestyle.subzero-wolf.com/innovation/picking-up-the-pace",
  },
];

const serif = { fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif' };

function StoryCard({ story, wide = false }: { story: Story; wide?: boolean }) {
  return (
    <article className="flex h-full flex-col bg-[#fbfaf6]">
      <Link
        href={story.href}
        className={`group relative block overflow-hidden ${wide ? "aspect-[1.62]" : "aspect-[1.75]"}`}
      >
        <Image
          src={story.image}
          alt={story.title}
          fill
          sizes={wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition duration-700 group-hover:scale-[1.025]"
        />
      </Link>
      <div className={`flex flex-1 flex-col px-5 pb-6 pt-4 md:px-6 ${wide ? "md:min-h-[245px]" : "md:min-h-[285px]"}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.17em]">Innovation</p>
        <h2 style={serif} className="mt-2 text-[29px] font-normal leading-[1.04] md:text-[40px]">{story.title}</h2>
        <p className="mt-4 text-[13px] font-light leading-[1.45] text-[#3f3d38]">{story.copy}</p>
        <Link
          href={story.href}
          className="mt-8 text-[14px] font-medium md:mt-auto"
          style={{ textDecoration: "underline", textUnderlineOffset: "25%" }}
        >
          Read {story.title}
        </Link>
      </div>
    </article>
  );
}

function FeatureStory({ title, copy, image, href }: Story) {
  return (
    <article className="grid overflow-hidden bg-[#fbfaf6] md:min-h-[650px] md:grid-cols-[0.255fr_0.745fr]">
      <div className="flex min-h-[310px] flex-col p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.17em]">Innovation</p>
        <h2 style={serif} className="mt-3 text-[32px] font-normal leading-[1.04] md:text-[40px]">{title}</h2>
        <p className="mt-4 text-[13px] font-light leading-[1.48] text-[#3f3d38]">{copy}</p>
        <Link
          href={href}
          className="mt-auto text-[14px] font-medium"
          style={{ textDecoration: "underline", textUnderlineOffset: "25%" }}
        >
          Read {title}
        </Link>
      </div>
      <Link href={href} className="group relative min-h-[390px] overflow-hidden md:min-h-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 75vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.015]"
        />
      </Link>
    </article>
  );
}

export function LifestyleInnovationPage() {
  return (
    <main className="overflow-hidden bg-[#efede5] text-[#181817]">
      <section className="relative h-[72svh] min-h-[530px] md:h-[100svh] md:min-h-[720px] md:max-h-[1080px]">
        <Image
          src={images.hero}
          alt="Sub-Zero Group headquarters and innovation center"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <h1
          style={serif}
          className="absolute bottom-7 left-5 max-w-[760px] text-[36px] font-normal leading-[1.04] text-[#fbfaf6] md:bottom-8 md:left-8 md:text-[40px]"
        >
          Inspired innovation
        </h1>
      </section>

      <section className="mx-auto max-w-[1392px] px-5 pb-24 pt-12 md:px-0 md:pb-36 md:pt-16">
        <FeatureStory
          title="Designing the Details"
          copy="Art and engineering inform the work of Sub-Zero Industrial Designer Anne Hardy."
          image={images.details}
          href="https://lifestyle.subzero-wolf.com/innovation/designing-the-details"
        />

        <div className="mt-4 grid gap-x-2 gap-y-4 md:grid-cols-3">
          {stories.map((story) => <StoryCard key={story.title} story={story} />)}
        </div>

        <div className="mt-4">
          <FeatureStory
            title="Results Driven"
            copy="Lead Design Engineer In New Product Development At Sub-Zero Group, Kari Stec combines commitment and expertise to create exceptional luxury kitchen appliances."
            image={images.results}
            href="https://lifestyle.subzero-wolf.com/innovation/results-driven"
          />
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {finalStories.map((story) => <StoryCard key={story.title} story={story} wide />)}
        </div>

        <div className="mt-9 text-center">
          <Link
            href="https://lifestyle.subzero-wolf.com/innovation"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#181817] px-6 text-[11px] font-semibold text-white"
          >
            View more results
          </Link>
          <p className="mt-3 text-[11px] text-[#5b5953]">Viewing 10 of 27</p>
        </div>
      </section>
    </main>
  );
}
