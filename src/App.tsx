import { Countdown } from "@/components/Countdown";
import { Flourish } from "@/components/Flourish";
import { GoldFrame } from "@/components/GoldFrame";
import { Hero } from "@/components/Hero";
import { LockGate } from "@/components/LockGate";
import { Reveal } from "@/components/Reveal";
import { RsvpCta } from "@/components/RsvpCta";
import { StickyRsvp } from "@/components/StickyRsvp";
import { Welcome } from "@/components/Welcome";
import { TornSeam } from "@/components/TornSeam";
import { site } from "@/lib/content";
import { PALETTE } from "@/lib/palette";

export default function App() {
  return (
    <main>
      <Welcome />
      <StickyRsvp />
      <Hero />

      <section className="bg-wine px-6 pb-14 pt-20 text-center">
        <Reveal className="mx-auto max-w-md">
          <h2 className="font-script  text-white text-[38px] tracking-wide font-semi-bold">
            {site.letter.heading}
          </h2>
          {site.letter.paragraphs.map((p) => (
            <p
              key={p.slice(0, 32)}
              className="mt-3 font-serif text-2xl leading-tight text-white max-w-xs mx-auto text-center"
            >
              {p}
            </p>
          ))}
        </Reveal>
      </section>

      <TornSeam upper={PALETTE.wine} lower={PALETTE.white} />
      <section className="bg-white px-6 py-10 text-center">
        <Reveal className="mx-auto max-w-md">
          <h2 className="font-script sm:tracking-wider text-gray-800 text-4xl ">
            The Celebration Begins In
          </h2>
          <div className="mt-7">
            <Countdown targetISO={site.dateISO} />
          </div>
        </Reveal>
        <p className=" font-serif text-lg  text-gray-800 sm:font-medium mt-3 sm:mt-0">
            Time of event 14.00pm
          </p>
      </section>

      <TornSeam upper={PALETTE.white} lower={PALETTE.ivory} variant={1} flip />
      <section className="bg-ivory px-6 py-10 text-center z-10 relative">
        <Reveal className="mx-auto max-w-md">
          <h2 className="font-script text-4xl text-wine">
            {site.guestNote.heading}
          </h2>
          <Flourish className="mt-4 text-gold" />
          {site.guestNote.paragraphs.map((p) => (
            <p
              key={p.slice(0, 24)}
              className="mx-auto mt-5 max-w-sm font-serif text-lg leading-relaxed text-ink/80"
            >
              {p}
            </p>
          ))}
        </Reveal>
      </section>

      <TornSeam upper={PALETTE.ivory} lower={PALETTE.white} />
      <section className="bg-white px-6 pt-12 pb-8 text-center">
        <Reveal className="mx-auto max-w-md">
          <h2 className="font-script text-4xl text-shadow-gray-800">
            Location
          </h2>
          <div className="mt-4">
            <LockGate>
              <p className="font-serif text-2xl text-gray-800">
                {site.venue.name}
              </p>
              <p className="font-serif text-xl text-gray-800">
              
                {site.venue.addressLines.map((line) => (
                   <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              {site.venue.photo && (
                <img
                  src={site.venue.photo}
                  alt={site.venue.name}
                  className="mx-auto mt-7 w-full"
                />
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.venue.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-white px-7 py-2.5 font-serif text-sm tracking-widest text-wine ring-1 ring-wine/30 shadow-md transition"
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
            Our Story
          </h2>
          <Flourish className="mt-2 text-gold" />

          {site.story.paragraphs.slice(0, 2).map((p) => (
            <p
              key={p.slice(0, 24)}
              className="mx-auto mt-6 max-w-sm font-serif text-lg leading-relaxed text-ink/80"
            >
              {p}
            </p>
          ))}

          {site.story.photo1 && (
            <img
              src={site.story.photo1}
              alt={`${site.couple.nameA} and ${site.couple.nameB}`}
              className="mx-auto mt-8 block w-full max-w-sm rounded-2xl ring-1 ring-champagne-deep"
            />
          )}

          {site.story.paragraphs.slice(2, 4).map((p) => (
            <p
              key={p.slice(0, 24)}
              className="mx-auto mt-6 max-w-sm font-serif text-lg leading-relaxed text-ink/80"
            >
              {p}
            </p>
          ))}

          {site.story.photo2 && (
            <img
              src={site.story.photo2}
              alt={`${site.couple.nameA} and ${site.couple.nameB}`}
              className="mx-auto mt-8 block w-full max-w-sm rounded-2xl ring-1 ring-champagne-deep"
            />
          )}

          {site.story.paragraphs.slice(4).map((p) => (
            <p
              key={p.slice(0, 24)}
              className="mx-auto mt-6 max-w-sm font-serif text-lg leading-relaxed text-ink/80"
            >
              {p}
            </p>
          ))}

          {site.story.mapImage && (
            <img
              src={site.story.mapImage}
              alt="Nigeria and Zimbabwe joined — Raphael and Shaleen"
              className="mx-auto mt-8 w-full max-w-sm"
            />
          )}
        </Reveal>
      </section>

      <TornSeam upper={PALETTE.white} lower={PALETTE.wine} flip />
      <footer className="bg-wine pt-24 text-center">
        <div className="mx-auto max-w-md px-6">
          <h2 className="font-script text-white text-4xl">
            {site.rsvp.ctaHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-serif text-xl leading-relaxed text-white">
            {site.rsvp.ctaText}
          </p>
          <RsvpCta />
          <p className="mt-14 font-script text-3xl text-white sm:text-4xl">
            {site.rsvp.farewell}
          </p>
          <p className="mt-3 font-serif text-3xl text-white">
            {site.couple.nameA} and {site.couple.nameB}
          </p>
        </div>
        {site.footerImage ? (
          <div className="relative mx-auto mt-10 w-full max-w-md">
            <img
              src={site.footerImage}
              alt={`${site.couple.nameA} and ${site.couple.nameB}`}
              className="block aspect-[4/5] w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-wine to-wine/0"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div
            className="mx-auto mt-10 aspect-[4/5] w-full max-w-md bg-wine-deep"
            aria-hidden="true"
          />
        )}
      </footer>
    </main>
  );
}
