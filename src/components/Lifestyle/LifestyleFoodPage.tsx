import Image from "next/image";
import Link from "next/link";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const images = {
  hero: `${aem}ecbbcbe7-8b75-4494-997c-f5bd589d94a4/as/TLK-Food.avif?assetname=TLK+Food.png&width=1920&max-quality=90`,
  arizona: `${aem}9547b708-881b-4ed0-a33f-88dd2f3c6a21/as/Arizona_Calling_8.avif?assetname=Arizona_Calling_8.png&width=1920&max-quality=90`,
  pasta: `${aem}dea7a4dd-a68d-48ba-a1ee-2f9ca58bc75d/as/Peace_Love_Pasta_1.avif?assetname=Peace_Love_Pasta_1.png&width=1920&max-quality=90`,
  legacy: `${aem}80b96b62-9191-4176-af07-a3d5db713fc5/as/leading-legacy-1.avif?assetname=leading-legacy-1.png&width=1920&max-quality=90`,
  southern: `${aem}357e1bab-9234-4ec5-96e0-97021f306274/as/southern-accents-card.avif?smartcrop=5-4&assetname=southern-accents-card.png&width=1920&max-quality=90`,
  symmetry: `${aem}6c721927-9777-40b5-8c08-4fd9146780ce/as/taste-the-symmetry-card-2.avif?assetname=taste-the-symmetry-card-2.png&width=1920&max-quality=90`,
  christiansen: `${aem}dbb281b0-ff34-41f4-9940-55bfad89bcd0/as/chef-christensen-card-2.avif?assetname=chef-christensen-card-2.png&width=1920&max-quality=90`,
  emeril: `${aem}720c1824-6881-45bd-9582-36767763bc9c/as/chef-emeril-card-2.avif?assetname=chef-emeril-card-2.png&width=1920&max-quality=90`,
  smallTowns: `${aem}7f6e22fb-8bbc-4c53-8412-90b84b50f9db/as/small-towns-big-taste-card-2.avif?assetname=small-towns-big-taste-card-2.png&width=1920&max-quality=90`,
  pecan: `${aem}69494ead-fc58-4f35-ad1c-d51d7600118f/as/pecan-tassies-d.avif?assetname=pecan-tassies-d.jpg&width=1920&max-quality=90`,
  torch: "https://lifestyle.subzero-wolf.com/food/media_195f08de8adaf2da882967b0ab4f0c5ba4a2561c4.png?width=1200&format=pjpg&optimize=medium&max-quality=90",
};

type Story = { title: string; copy: string; image: string; href: string };

const stories: Story[] = [
  { title: "Peace, Love & Pasta", copy: "A conversation with Chef Scott Conant, whose new Bahamas restaurant is gaining raves.", image: images.pasta, href: "https://lifestyle.subzero-wolf.com/food/peace-love-pasta" },
  { title: "Leading a Legacy", copy: "Eminent French Chef Alain Ducasse has laid the foundation for lasting culinary excellence.", image: images.legacy, href: "https://lifestyle.subzero-wolf.com/food/leading-a-legacy" },
  { title: "Southern Accents", copy: "A born-and-bred Texan, Houston native Colin Shine combines tradition and invention in his role as a Sub-Zero Corporate Chef.", image: images.southern, href: "https://lifestyle.subzero-wolf.com/food/southern-accents" },
  { title: "Taste the Symmetry", copy: "Head Sommelier at LPM Restaurant & Bar in Miami, Florida, chooses Sub-Zero Wine Storage Units to replicate the ideal conditions of a natural wine cellar.", image: images.symmetry, href: "https://lifestyle.subzero-wolf.com/food/taste-the-symmetry" },
  { title: "Q & A With Chef Christiansen", copy: "Learn how North Carolina's Ashley Christensen brings Southern charm and bold flavors to the Caribbean’s top culinary stage.", image: images.christiansen, href: "https://lifestyle.subzero-wolf.com/food/q-and-a-with-chef-christiansen" },
  { title: "Q & A With Chef Emeril", copy: "The Living Kitchen sat down with Chef Emeril Lagasse at the 2025 Ritz-Carlton Cayman Cookout to learn more about his love of his Sub-Zero refrigerator.", image: images.emeril, href: "https://lifestyle.subzero-wolf.com/food/q-and-a-with-chef-emeril" },
];

const finalStories: Story[] = [
  { title: "Pecan Tassies", copy: "These Pecan Tassies are bite-sized, cream-cheese pastry cups filled with a rich, gooey pecan and bourbon-sweetened filling, delivering all the flavor of classic pecan pie in a tender, mini tart.", image: images.pecan, href: "https://lifestyle.subzero-wolf.com/food/pecan-tassies" },
  { title: "Passing the Torch", copy: "Legendary chef and restaurateur Thomas Keller is the first and only American-born chef to hold multiple three-star ratings from the prestigious Michelin Guide.", image: images.torch, href: "https://lifestyle.subzero-wolf.com/food/passing-the-torch" },
];

const serif = { fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif' };

function StoryCard({ story, wide = false }: { story: Story; wide?: boolean }) {
  return (
    <article className="flex h-full flex-col bg-[#fbfaf6]">
      <Link href={story.href} className={`group relative block overflow-hidden ${wide ? "aspect-[1.62]" : "aspect-[1.75]"}`}>
        <Image src={story.image} alt={story.title} fill sizes={wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} className="object-cover transition duration-700 group-hover:scale-[1.025]" />
      </Link>
      <div className={`flex flex-1 flex-col px-5 pb-6 pt-4 md:px-6 ${wide ? "md:min-h-[281px]" : "md:min-h-[300px]"}`}>
        <p className="text-[11px] font-light uppercase leading-[1.22] tracking-[0.2em] md:text-[13px]">Food</p>
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
    <article className="grid overflow-hidden bg-[#fbfaf6] md:min-h-[540px] md:grid-cols-[0.255fr_0.745fr] min-[1440px]:min-h-[650px]">
      <div className="flex min-h-[310px] flex-col p-6">
        <p className="text-[11px] font-light uppercase leading-[1.22] tracking-[0.2em] md:text-[13px]">Food</p>
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

export function LifestyleFoodPage() {
  return (
    <main className="overflow-hidden bg-[#efede5] text-[#181817]">
      <section className="relative h-[72svh] min-h-[530px] md:h-[100svh] md:min-h-[720px] md:max-h-[1080px]">
        <Image src={images.hero} alt="Lemon souffles served on a refined dining table" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <h1 style={serif} className="absolute bottom-7 left-5 max-w-[760px] text-[36px] font-normal leading-[1.04] text-[#fbfaf6] md:bottom-6 md:left-6 md:text-[40px]">
          Culinary artistry
        </h1>
      </section>

      <section className="mx-auto max-w-[1392px] px-5 pb-24 pt-12 md:px-0 md:pb-36 md:pt-16">
        <FeatureStory title="Arizona Calling" copy="Chef Derek Biazo brings his talents and tastes to Scottsdale’s Sub-Zero, Wolf, and Cove customers." image={images.arizona} href="https://lifestyle.subzero-wolf.com/food/arizona-calling" />
        <div className="mt-4 grid gap-x-2 gap-y-4 md:grid-cols-3">
          {stories.map((story) => <StoryCard key={story.title} story={story} />)}
        </div>
        <div className="mt-4">
          <FeatureStory title="Small Towns Big Taste" copy="Explore luxurious and welcoming small town countryside inns featuring big taste from innovative Michelin-starred restaurants in California, Virginia and France." image={images.smallTowns} href="https://lifestyle.subzero-wolf.com/food/small-towns-big-taste" />
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {finalStories.map((story) => <StoryCard key={story.title} story={story} wide />)}
        </div>
        <div className="mt-9 text-center">
          <Link href="https://lifestyle.subzero-wolf.com/food" className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#181817] px-6 text-[11px] font-semibold text-white">View more results</Link>
          <p className="mt-3 text-[11px] text-[#5b5953]">Viewing 10 of 75</p>
        </div>
      </section>
    </main>
  );
}
