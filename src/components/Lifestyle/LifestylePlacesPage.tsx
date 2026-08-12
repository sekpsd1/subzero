import Image from "next/image";
import Link from "next/link";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const images = {
  hero: `${aem}6179e056-9f1f-461c-9590-ddb7d72c1257/as/TLK-Places.avif?assetname=TLK+Places.png&width=1920&max-quality=90`,
  culture: `${aem}0bf76202-ffaa-451d-81e9-a3b62f586ea5/as/Chefs_Craft_Culture_12.avif?assetname=Chefs_Craft_Culture_12.png&width=1920&max-quality=90`,
  golf: `${aem}8db87965-92e0-4450-aeea-29d9deb82aee/as/KohlerWisconsin_WhistlingStraits_2.avif?assetname=KohlerWisconsin_WhistlingStraits_2.png&width=1920&max-quality=90`,
  tea: `${aem}3c80a8fb-f758-4f6d-b992-17a7295bda77/as/iStock-2262674970.avif?assetname=iStock-2262674970.png&width=1920&max-quality=90`,
  giraffe: `${aem}27c6d4e0-b34d-4fa7-83a5-5840132f54a1/as/a-head-above-card.avif?assetname=a-head-above-card.png&width=1920&max-quality=90`,
  getaways: `${aem}423cad9e-570f-4102-b8fe-abf4214e676d/as/dream-getaways-card.avif?assetname=dream-getaways-card.png&width=1920&max-quality=90`,
  cruise: "https://lifestyle.subzero-wolf.com/places/media_12675e45ea4df74957b12e9061e8649505322887a.png?width=1920&format=pjpg&optimize=medium&max-quality=90",
  cayman: "https://lifestyle.subzero-wolf.com/places/media_1b7a9a9e116b8e7b4d697c7eb4889aba237b1596d.png?width=1920&format=pjpg&optimize=medium&max-quality=90",
  alpine: "https://lifestyle.subzero-wolf.com/places/media_1ebf355b4a80793323d381ae213a5f25d80fa2f1d.png?width=1920&format=pjpg&optimize=medium&max-quality=90",
  isle: "https://lifestyle.subzero-wolf.com/places/media_1ecbbb2ff81d7c7522a35d595b800c4d96a56ca54.png?width=1920&format=pjpg&optimize=medium&max-quality=90",
  basque: "https://lifestyle.subzero-wolf.com/places/media_1ea7d20c9679e3b7430f040a06aa42ecb9a103166.jpg?width=1920&format=pjpg&optimize=medium&max-quality=90",
};

type Story = {
  title: string;
  copy: string;
  image: string;
  href: string;
};

const stories: Story[] = [
  {
    title: "Tee Time in America’s Dairyland",
    copy: "Wisconsin resorts that offer impeccable fairways, deluxe accommodations, and lavish amenities.",
    image: images.golf,
    href: "https://lifestyle.subzero-wolf.com/places/tee-time-in-americas-dairyland",
  },
  {
    title: "Sip and Savor",
    copy: "Refined spots for sumptuous afternoon tea in three global hubs.",
    image: images.tea,
    href: "https://lifestyle.subzero-wolf.com/places/sip-and-savor",
  },
  {
    title: "A Head Above the Rest",
    copy: "Giraffe Manor in Nairobi, Kenya, offers an up-close and personal stay among the world’s tallest animals.",
    image: images.giraffe,
    href: "https://lifestyle.subzero-wolf.com/places/a-head-above-the-rest",
  },
  {
    title: "Dream Getaways",
    copy: "From Bali to Big Sur, these high-end hotels and resorts are turning better sleep into the ultimate travel souvenir.",
    image: images.getaways,
    href: "https://lifestyle.subzero-wolf.com/places/dream-getaways",
  },
  {
    title: "A Delicious Destination",
    copy: "President of Oceania Cruises, Frank A. Del Rio, shows us why traveling to Scandinavia is a journey that caters to all the senses.",
    image: images.cruise,
    href: "https://lifestyle.subzero-wolf.com/places/a-delicious-destination",
  },
  {
    title: "Tastes of Paradise",
    copy: "The Ritz-Carlton Cayman Cookout welcomes chefs and guests to relax by the shore, enjoy delicious bites, and join epic adventures.",
    image: images.cayman,
    href: "https://lifestyle.subzero-wolf.com/places/tastes-of-paradise",
  },
];

const finalStories: Story[] = [
  {
    title: "Exquisite Isle",
    copy: "The Eden Rock - St. Barths Resort has been a sublime haven for illustrious guests for over seven decades.",
    image: images.isle,
    href: "https://lifestyle.subzero-wolf.com/places/exquisite-isle",
  },
  {
    title: "Flavors of the Basque",
    copy: "Writer Sarah Wortham takes us on a food-focused jaunt to the Basque Country of northeast Spain and southwest France.",
    image: images.basque,
    href: "https://lifestyle.subzero-wolf.com/places/flavors-of-the-basque",
  },
];

const serif = { fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif' };

function StoryCard({ story, wide = false }: { story: Story; wide?: boolean }) {
  return (
    <article className="flex h-full flex-col bg-[#fbfaf6]">
      <Link href={story.href} className={`group relative block overflow-hidden ${wide ? "aspect-[1.65]" : "aspect-[1.75]"}`}>
        <Image
          src={story.image}
          alt={story.title}
          fill
          sizes={wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition duration-700 group-hover:scale-[1.025]"
        />
      </Link>
      <div className={`flex flex-1 flex-col px-5 pb-6 pt-4 md:px-6 ${wide ? "md:min-h-[281px]" : "md:min-h-[300px]"}`}>
        <p className="text-[11px] font-light uppercase leading-[1.22] tracking-[0.2em] md:text-[13px]">Places</p>
        <h2 style={serif} className="mt-2 text-[29px] font-extralight leading-[1.1] md:text-[40px]">{story.title}</h2>
        <p className="mt-4 text-[14px] font-extralight leading-[1.3] text-[#3f3d38] md:mt-6 md:text-[16px] md:leading-[1.22]">{story.copy}</p>
        <Link
          href={story.href}
          className="mt-8 text-[14px] font-medium leading-[1.22] md:mt-auto md:min-h-[41px]"
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
    <article className="grid overflow-hidden bg-[#fbfaf6] md:min-h-[540px] md:grid-cols-[0.255fr_0.745fr] min-[1440px]:min-h-[650px]">
      <div className="flex min-h-[310px] flex-col p-6">
        <p className="text-[11px] font-light uppercase leading-[1.22] tracking-[0.2em] md:text-[13px]">Places</p>
        <h2 style={serif} className="mt-2 text-[32px] font-extralight leading-[1.1] md:text-[40px]">{title}</h2>
        <p className="mt-4 text-[14px] font-extralight leading-[1.3] text-[#3f3d38] md:mt-6 md:text-[16px] md:leading-[1.22]">{copy}</p>
        <Link
          href={href}
          className="mt-auto min-h-[41px] text-[14px] font-medium leading-[1.22]"
          style={{ textDecoration: "underline", textUnderlineOffset: "25%" }}
        >
          Read {title}
        </Link>
      </div>
      <Link href={href} className="group relative min-h-[390px] overflow-hidden md:min-h-0">
        <Image src={image} alt={title} fill sizes="(min-width: 768px) 75vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.015]" />
      </Link>
    </article>
  );
}

export function LifestylePlacesPage() {
  return (
    <main className="overflow-hidden bg-[#efede5] text-[#181817]">
      <section className="relative h-[72svh] min-h-[530px] md:h-[100svh] md:min-h-[720px] md:max-h-[1080px]">
        <Image
          src={images.hero}
          alt="A refined lakeside destination surrounded by mountains"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <h1 style={serif} className="absolute bottom-7 left-5 max-w-[760px] text-[36px] font-normal leading-[1.04] text-[#fbfaf6] md:bottom-6 md:left-6 md:text-[40px]">
          Extraordinary destinations
        </h1>
      </section>

      <section className="mx-auto max-w-[1392px] px-5 pb-24 pt-12 md:px-0 md:pb-36 md:pt-16">
        <FeatureStory
          title="Chefs, Crafts, & Culture"
          copy="Baha Mar celebrates local culture at its annual Bahamas Culinary & Arts Festival."
          image={images.culture}
          href="https://lifestyle.subzero-wolf.com/places/chefs-crafts-and-culture"
        />
        <div className="mt-4 grid gap-x-2 gap-y-4 md:grid-cols-3">
          {stories.map((story) => <StoryCard key={story.title} story={story} />)}
        </div>
        <div className="mt-4">
          <FeatureStory
            title="Alpine Excitement"
            copy="Nestled in the heart of the Swiss Alps, Six Senses Crans-Montana is a stylish slope-side ski-in/ski-out property."
            image={images.alpine}
            href="https://lifestyle.subzero-wolf.com/places/alpine-excitement"
          />
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {finalStories.map((story) => <StoryCard key={story.title} story={story} wide />)}
        </div>
        <div className="mt-9 text-center">
          <Link href="https://lifestyle.subzero-wolf.com/places" className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#181817] px-6 text-[11px] font-semibold text-white">
            View more results
          </Link>
          <p className="mt-3 text-[11px] text-[#5b5953]">Viewing 10 of 21</p>
        </div>
      </section>
    </main>
  );
}
