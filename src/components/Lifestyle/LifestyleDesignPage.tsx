import Image from "next/image";
import Link from "next/link";

const aem = "https://delivery-p28264-e87620.adobeaemcloud.com/adobe/assets/urn:aaid:aem:";

const images = {
  hero: `${aem}550caf9b-5f0b-464d-8137-5453135349a7/as/TLK-Design.avif?assetname=TLK+Design.png&width=1920&max-quality=90`,
  artist: `${aem}f4e9a77e-50af-48de-9f6c-8ca71a7f8120/as/Rectangle-135975.avif?assetname=Rectangle+135975.png&width=1920&max-quality=90`,
  hedges: `${aem}9aa27f3b-f380-4401-8cd0-cba5418e52b4/as/An_Artists_Abode_8.avif?assetname=An+Artists+Abode+8.png&width=992&max-quality=90`,
  everyday: `${aem}6d098554-2ec5-43e2-807b-8f1661aba38c/as/16_10.avif?assetname=16+10.png&width=992&max-quality=90`,
  limits: `${aem}c8b48df1-c58e-4af4-bf27-da2b56463567/as/2508-06-0726_16x8.avif?assetname=2508-06+0726+16x8.png&width=1280&max-quality=90`,
  architecture: `${aem}d1d6b781-6a53-4f15-ad5b-86666fdbb9a4/as/20_Rathnelly-Residence_High-Res.avif?assetname=20_Rathnelly+Residence_High+Res.png&width=992&max-quality=90`,
  green: `${aem}5511891a-f840-47f1-913b-bb9cac3967a1/as/DJI_0106.avif?assetname=DJI_0106.png&width=992&max-quality=90`,
  balance: `${aem}7d8fe71f-b936-4f55-8cdd-a64bbccf2b3c/as/a-curated-balance-card-2.avif?assetname=a-curated-balance-card-2.png&width=992&max-quality=90`,
  elevate: `${aem}9a5e6921-7a9e-46c9-a4bb-1490aacc1635/as/elevate-everyday-1-card-2.avif?assetname=elevate-everyday-1-card-2.png&width=1920&max-quality=90`,
  focal: `${aem}15137a7d-7db5-4c8b-8d66-9e595abfd420/as/focal-point-10-card-2.avif?assetname=focal-point-10-card-2.png&width=1280&max-quality=90`,
  shade: `${aem}abd1ec27-8bb3-4ea5-adab-5e500bfec621/as/made-in-the-shade-card-2.avif?assetname=made-in-the-shade-card-2.png&width=1280&max-quality=90`,
};

type Story = { title: string; copy: string; image: string; href: string };

const stories: Story[] = [
  { title: "A Peek Behind the Hedges", copy: "Photographer and designer Blue Carreon shares an inside look at glorious gardens in the Hamptons.", image: images.hedges, href: "https://lifestyle.subzero-wolf.com/design/a-peek-behind-the-hedges" },
  { title: "Everyday Living", copy: "Morrison Interiors showcase Sub-Zero, Wolf, and Cove products in unexpected living spaces.", image: images.everyday, href: "https://lifestyle.subzero-wolf.com/design/everyday-living" },
  { title: "Testing the Limits", copy: "A mountain estate melds sleek, contemporary style with warmth and a playful point of view.", image: images.limits, href: "https://lifestyle.subzero-wolf.com/design/testing-the-limits" },
  { title: "Designed for Living", copy: "A graceful townhome displays architect Trevor Wallace’s talent for creating experiential spaces.", image: images.architecture, href: "https://lifestyle.subzero-wolf.com/design/designed-for-living" },
  { title: "Seeing Green", copy: "Conservatory Craftsmen’s spectacular greenhouses are beautiful year-round sanctuaries for avid gardeners.", image: images.green, href: "https://lifestyle.subzero-wolf.com/design/seeing-green" },
  { title: "A Curated Balance", copy: "Luxury interior designer Lori Paranjape explains how small, beautifully styled spaces make a big design statement.", image: images.balance, href: "https://lifestyle.subzero-wolf.com/design/a-curated-balance" },
];

const finalStories: Story[] = [
  { title: "Focal Point", copy: "A Minneapolis cottage feels modern with chef-approved appliances and beautifully considered gathering spaces.", image: images.focal, href: "https://lifestyle.subzero-wolf.com/design/focal-point" },
  { title: "Made in the Shade", copy: "Bibelot Home is a go-to source for custom hand-sewn lampshades and bespoke artistry for designers and homeowners.", image: images.shade, href: "https://lifestyle.subzero-wolf.com/design/made-in-the-shade" },
];

const serif = { fontFamily: 'Garamond, "Palatino Linotype", "Book Antiqua", Georgia, serif' };

function StoryCard({ story, wide = false }: { story: Story; wide?: boolean }) {
  return (
    <article className="flex h-full flex-col bg-[#fbfaf6]">
      <Link href={story.href} className={`group relative block overflow-hidden ${wide ? "aspect-[1.65]" : "aspect-[1.75]"}`}>
        <Image src={story.image} alt={story.title} fill loading="eager" sizes={wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} className="object-cover transition duration-700 group-hover:scale-[1.025]" />
      </Link>
      <div className={`flex flex-1 flex-col px-5 pb-6 pt-4 md:px-6 ${wide ? "md:min-h-[245px]" : "md:min-h-[285px]"}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.17em]">Design</p>
        <h2 style={serif} className="mt-2 text-[29px] font-normal leading-[1.04] md:text-[34px]">{story.title}</h2>
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
        <p className="text-[10px] font-semibold uppercase tracking-[0.17em]">Design</p>
        <h2 style={serif} className="mt-3 text-[32px] font-normal leading-[1.04] md:text-[38px]">{title}</h2>
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
        <Image src={image} alt={title} fill loading="eager" sizes="(min-width: 768px) 75vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.015]" />
      </Link>
    </article>
  );
}

export function LifestyleDesignPage() {
  return (
    <main className="overflow-hidden bg-[#efede5] text-[#181817]">
      <section className="relative h-[72svh] min-h-[530px] md:h-[100svh] md:min-h-[720px] md:max-h-[1080px]">
        <Image src={images.hero} alt="A luxurious coastal home and infinity pool" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
        <h1 style={serif} className="absolute bottom-7 left-5 max-w-[760px] text-[36px] font-normal leading-[1.04] text-[#fbfaf6] md:bottom-8 md:left-8 md:text-[48px]">Exceptional design</h1>
      </section>

      <section className="mx-auto max-w-[1392px] px-5 pb-24 pt-12 md:px-0 md:pb-36 md:pt-16">
        <FeatureStory title="An Artist’s Abode" copy="A fusion of historic charm and modern functionality from Tennessee-based Pfeffer Torode Architecture." image={images.artist} href="https://lifestyle.subzero-wolf.com/design/an-artists-abode" />
        <div className="mt-4 grid gap-x-2 gap-y-4 md:grid-cols-3">
          {stories.map((story) => <StoryCard key={story.title} story={story} />)}
        </div>
        <div className="mt-4">
          <FeatureStory title="Elevate Everyday Spaces" copy="Two unexpected spaces offer a chic beverage area and homey café-style seating for luxury Sub-Zero Wine Storage Units." image={images.elevate} href="https://lifestyle.subzero-wolf.com/design/elevate-everyday-spaces" />
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {finalStories.map((story) => <StoryCard key={story.title} story={story} wide />)}
        </div>
        <div className="mt-9 text-center">
          <Link href="https://lifestyle.subzero-wolf.com/design" className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#181817] px-6 text-[11px] font-semibold text-white">View more results</Link>
          <p className="mt-3 text-[11px] text-[#5b5953]">Viewing 10 of 58</p>
        </div>
      </section>
    </main>
  );
}
