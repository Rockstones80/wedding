import { Countdown } from "@/components/Countdown";
import { Flourish } from "@/components/Flourish";
import { GoldFrame } from "@/components/GoldFrame";
import { Hero } from "@/components/Hero";
import { LockGate } from "@/components/LockGate";
import { Reveal } from "@/components/Reveal";
import { RsvpCta } from "@/components/RsvpCta";
import { Schedule } from "@/components/Schedule";
import { Welcome } from "@/components/Welcome";
import { TornSeam } from "@/components/TornSeam";
import { site } from "@/lib/content";
import { PALETTE } from "@/lib/palette";

export default function App() {
  return (
    <main>
      <Welcome />
      <Hero />

      <section className="bg-wine px-6 pb-20 pt-40 text-center">
        <Reveal className="mx-auto max-w-md">
          <h2 className="font-script text-4xl text-white sm:text-4xl leading-tight">
            {site.letter.heading}
          </h2>
          {/* <Flourish className="mt-6 text-gold" /> */}
          {site.letter.paragraphs.map((p) => (
            <p
              key={p.slice(0, 24)}
              className="mt-3 font-serif text-lg leading-relaxed text-white max-w-sm mx-auto text-center"
            >
              {p}
            </p>
          ))}
        </Reveal>
      </section>

      <TornSeam upper={PALETTE.wine} lower={PALETTE.white} />
      <section className="bg-white px-6 py-16 text-center">
        <Reveal className="mx-auto max-w-md">
          <h2 className="font-script text-4xl text-gray-800 sm:text-4xl">
            The Celebration Begins In
          </h2>
          <div className="mt-7">
            <Countdown targetISO={site.dateISO} />
          </div>
        </Reveal>
      </section>

      <TornSeam upper={PALETTE.white} lower={PALETTE.ivory} variant={1} flip />
      <section className="bg-ivory px-6 py-16 text-center">
        <Reveal className="mx-auto max-w-md">
          <h2 className="font-script text-4xl text-wine sm:text-5xl">
            Schedule of Events
          </h2>
          <p className="mt-3 font-serif text-sm italic text-ink/55">
            Tap an event for details
          </p>
          <div className="mt-6">
            <Schedule />
          </div>
        </Reveal>
      </section>

      <TornSeam upper={PALETTE.ivory} lower={PALETTE.white} />
      <section className="bg-white px-6 py-16 text-center">
        <Reveal className="mx-auto max-w-md">
          <h2 className="font-script text-4xl text-wine sm:text-5xl">
            Location
          </h2>
          <Flourish className="mt-6 text-gold" />
          <div className="mt-8">
            <LockGate>
              <p className="font-serif text-2xl text-ink">{site.venue.name}</p>
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink/75">
                {site.venue.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.venue.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-wine px-7 py-2.5 font-serif text-sm tracking-widest text-cream transition hover:bg-wine-deep"
              >
                Open in Google Maps
              </a>
            </LockGate>
          </div>
        </Reveal>
      </section>

      <TornSeam upper={PALETTE.white} lower={PALETTE.wineDeep} variant={1} flip />
      <section className="bg-wine-deep px-6 pb-20 pt-24 text-center">
        <Reveal className="mx-auto max-w-md">
          <h2 className="font-script text-4xl text-white sm:text-5xl">
            Dress Code
          </h2>
          <p className="mx-auto mt-6 max-w-xs font-serif text-lg leading-relaxed text-white">
            {site.dressCode.intro}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            {site.dressCode.palette.map((swatch) => (
              <span
                key={swatch.name}
                title={swatch.name}
                style={{ backgroundColor: swatch.hex }}
                className="h-12 w-12 rounded-full ring-1 ring-cream/30"
              />
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-sm">
            <div className="flex items-start gap-5 text-left">
              <GoldFrame
                src={site.dressCode.photoGentlemen}
                alt="Gentlemen's attire"
                className="w-[45%] shrink-0"
              />
              <p className="pt-8 font-serif text-base leading-relaxed text-white">
                Gentlemen:
                <br />
                {site.dressCode.gentlemen}
              </p>
            </div>
            <div className="-mt-8 flex items-center justify-end gap-5 text-right">
              <p className="pt-10 font-serif text-base leading-relaxed text-white">
                Ladies:
                <br />
                {site.dressCode.ladies}
              </p>
              <GoldFrame
                src={site.dressCode.photoLadies}
                alt="Ladies' attire"
                className="w-[45%] shrink-0"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <TornSeam upper={PALETTE.wineDeep} lower={PALETTE.white} />
      <section className="bg-white px-6 py-16 text-center">
        <Reveal className="mx-auto max-w-md">
          <h2 className="font-script text-4xl text-wine sm:text-5xl">
            With Love
          </h2>
          <Flourish className="mt-6 text-gold" />
          <p className="mx-auto mt-7 max-w-xs font-serif text-lg italic leading-relaxed text-ink/80">
            {site.details.gifts}
          </p>
          <p className="mt-8 font-serif text-base text-ink/70">
            Questions? Reach {site.details.contactName} at{" "}
            <a
              href={`tel:${site.details.contactPhone.replace(/\s/g, "")}`}
              className="text-wine underline decoration-gold/60 underline-offset-4"
            >
              {site.details.contactPhone}
            </a>
          </p>
        </Reveal>
      </section>

      {/* <TornSeam upper={PALETTE.ivory} lower={PALETTE.champagne} /> */}
      <section className="bg-ivory px-6 py-16 text-center">
        <Reveal className="mx-auto max-w-md">
          <h2 className="font-script text-4xl text-wine sm:text-5xl">
            Our Story
          </h2>
          <Flourish className="mt-6 text-gold" />
          {site.story.paragraphs.map((p) => (
            <p
              key={p.slice(0, 24)}
              className="mx-auto mt-6 max-w-sm font-serif text-lg leading-relaxed text-ink/80"
            >
              {p}
            </p>
          ))}
        </Reveal>
      </section>

      <TornSeam upper={PALETTE.ivory} lower={PALETTE.wine} flip />
      <footer className="bg-wine px-6 pt-24 text-center">
        <div className="mx-auto max-w-md">
          <h2 className="font-script text-3xl text-white sm:text-4xl">
            {site.rsvp.ctaHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-xs font-serif text-base leading-relaxed text-white">
            {site.rsvp.ctaText}
          </p>
          <RsvpCta />
          <p className="mt-14 font-script text-3xl text-white sm:text-4xl">
            {site.rsvp.farewell}
          </p>
          <p className="mt-3 font-serif text-xl text-white">
            {site.couple.nameA} and {site.couple.nameB}
          </p>
          <div className="relative mx-auto mt-8 aspect-[3/4] w-full max-w-[21rem]">
            {site.footerImage ? (
              <img
                src={site.footerImage}
                alt={`${site.couple.nameA} and ${site.couple.nameB}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div
                className="absolute inset-0 bg-wine-deep"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </footer>
    </main>
  );
}
