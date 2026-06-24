import Image from "next/image";
import Link from "next/link";

const iceMakerImage = "/assets/subzero/dice-unveil-cut-wr.avif";

export function IceMakerFeature() {
  return (
    <section className="bg-[#eeece4] px-5 pb-20 pt-8 text-[#171715] md:px-8 md:pb-28 md:pt-10">
      <div className="mx-auto grid max-w-[1390px] bg-[#fbfaf7] md:grid-cols-[1.08fr_1fr]">
        <div className="flex min-h-[520px] flex-col justify-center px-7 py-12 md:px-12 lg:min-h-[720px] lg:px-20">
          <p className="text-xs uppercase tracking-[0.32em]">
            Designer Undercounter Ice Maker
          </p>
          <h2 className="mt-5 max-w-[560px] font-serif text-[42px] leading-[1.08] md:text-[58px] lg:text-[64px]">
            The future of ice
            <br />
            making is here
          </h2>
          <p className="mt-8 max-w-[470px] text-base leading-7 md:text-lg">
            Created for luxury homes where quiet, convenience, and performance
            matter.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products/refrigeration/undercounter"
              className="inline-flex h-13 items-center justify-center rounded-full bg-[#11110f] px-8 text-sm font-semibold text-white transition hover:bg-[#3a3935] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#11110f]"
            >
              View product
            </Link>
            <Link
              href="/products/refrigeration/undercounter"
              className="inline-flex h-13 items-center justify-center rounded-full border border-[#11110f] px-8 text-sm font-semibold transition hover:bg-[#11110f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#11110f]"
            >
              Learn more
            </Link>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden lg:min-h-[720px]">
          <Image
            src={iceMakerImage}
            alt="Sub-Zero Designer Undercounter Ice Maker"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
