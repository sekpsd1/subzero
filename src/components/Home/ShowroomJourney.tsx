import Link from "next/link";

import { imageLibrary } from "@/lib/site-data";

export function ShowroomJourney() {
  return (
    <section className="bg-[#eeece4] px-5 pb-12 pt-20 text-[#171715] md:px-8 md:pb-16 md:pt-28">
      <div className="mx-auto grid max-w-[1120px] gap-10 bg-[#fbfaf7] p-6 md:grid-cols-[0.95fr_1.05fr] md:gap-16 lg:p-8">
        <div
          className="min-h-[360px] bg-cover bg-center md:min-h-[426px]"
          style={{ backgroundImage: `url(${imageLibrary.showroom})` }}
          aria-label="Showroom consultation"
          role="img"
        />
        <div className="flex flex-col justify-center py-4 md:py-8">
          <h2 className="max-w-[520px] font-serif text-[42px] leading-[1.08] md:text-[56px]">
            Start your journey
            <br />
            in a showroom
          </h2>
          <p className="mt-7 max-w-[510px] text-base leading-7 md:text-lg">
            Our showrooms are where inspiration turns into informed decisions.
            Learn how a visit helps you plan, compare, and move forward with
            confidence.
          </p>
          <Link
            href="/showroom/appointment"
            className="mt-8 inline-flex h-13 w-fit items-center justify-center rounded-full bg-[#11110f] px-8 text-sm font-semibold text-white transition hover:bg-[#3a3935] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#11110f]"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}
