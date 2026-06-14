import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-champagne-deep bg-white/60 px-4 py-3 font-serif text-base text-ink outline-none transition placeholder:text-ink/35 focus:border-gold";

// Where submissions go. Set VITE_RSVP_ENDPOINT in .env.local to a form
// service URL (Web3Forms, Formspree, Google Apps Script, …). Until it is
// set, submissions are logged to the browser console and shown as success
// so the flow can be tested.
const ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT as string | undefined;

export function Rsvp() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState("1");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!attending) return;
    const fd = new FormData(e.currentTarget);

    // Honeypot — real guests never fill it.
    if (typeof fd.get("company") === "string" && fd.get("company") !== "") {
      setStatus("done");
      return;
    }

    const entry = {
      name: String(fd.get("name") ?? "").trim(),
      attending,
      guests: attending === "yes" ? guests : "",
      guestName: String(fd.get("guestName") ?? "").trim(),
      dietary: String(fd.get("dietary") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      at: new Date().toISOString(),
    };

    setStatus("sending");
    try {
      if (ENDPOINT) {
        // Google Apps Script web app: post as a "simple request" (text/plain,
        // no-cors) so the browser sends it without a blocked CORS preflight.
        // The response is opaque, so a resolved fetch is treated as success.
        await fetch(ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(entry),
        });
        setStatus("done");
      } else {
        console.log("[rsvp]", entry);
        await new Promise((r) => window.setTimeout(r, 600));
        setStatus("done");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="py-6 text-center">
        <p className="font-script text-5xl text-wine">Thank you!</p>
        <p className="mx-auto mt-4 max-w-xs font-serif text-lg text-ink/80">
          Your response has been received. We can&apos;t wait to celebrate with
          you.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-sm rounded-2xl border border-champagne-deep bg-ivory p-6 text-left sm:p-8"
    >
      <label className="block">
        <span className="mb-1.5 block font-serif text-sm tracking-wide text-ink/70">
          Full name
        </span>
        <input
          name="name"
          required
          autoComplete="name"
          placeholder="Your name"
          className={inputClass}
        />
      </label>

      <fieldset className="mt-5">
        <legend className="mb-2 block font-serif text-sm tracking-wide text-ink/70">
          Will you be joining us?
        </legend>
        <div className="flex gap-2.5">
          {(
            [
              ["yes", "Joyfully accept"],
              ["no", "Regretfully decline"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={attending === value}
              onClick={() => setAttending(value)}
              className={`flex-1 rounded-full border px-3 py-2.5 font-serif text-sm transition ${
                attending === value
                  ? "border-wine bg-wine text-cream"
                  : "border-champagne-deep text-ink hover:border-wine/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      {attending === "yes" && (
        <>
          <fieldset className="mt-5">
            <legend className="mb-2 block font-serif text-sm tracking-wide text-ink/70">
              Number of guests
            </legend>
            <div className="flex gap-2.5">
              {(
                [
                  ["1", "Just me"],
                  ["2", "Me plus one"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={guests === value}
                  onClick={() => setGuests(value)}
                  className={`flex-1 rounded-full border px-3 py-2.5 font-serif text-sm transition ${
                    guests === value
                      ? "border-wine bg-wine text-cream"
                      : "border-champagne-deep text-ink hover:border-wine/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
          {guests === "2" && (
            <label className="mt-5 block">
              <span className="mb-1.5 block font-serif text-sm tracking-wide text-ink/70">
                Your guest&apos;s name
              </span>
              <input
                name="guestName"
                required
                placeholder="Plus-one's full name"
                className={inputClass}
              />
            </label>
          )}
          <label className="mt-5 block">
            <span className="mb-1.5 block font-serif text-sm tracking-wide text-ink/70">
              Dietary notes
            </span>
            <input
              name="dietary"
              placeholder="Allergies or intolerances"
              className={inputClass}
            />
          </label>
        </>
      )}

      <label className="mt-5 block">
        <span className="mb-1.5 block font-serif text-sm tracking-wide text-ink/70">
          A message for the couple
        </span>
        <textarea
          name="message"
          rows={3}
          placeholder="Optional"
          className={`${inputClass} resize-none`}
        />
      </label>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={!attending || status === "sending"}
        className="mt-7 w-full rounded-full bg-wine px-7 py-3 font-serif text-sm tracking-[0.2em] text-cream transition hover:bg-wine-deep disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send RSVP"}
      </button>

      {status === "error" && (
        <p className="mt-3 text-center font-serif text-sm text-wine">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
