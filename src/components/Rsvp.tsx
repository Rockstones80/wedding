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
      guests: String(fd.get("guests") ?? ""),
      dietary: String(fd.get("dietary") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      at: new Date().toISOString(),
    };

    setStatus("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });
        setStatus(res.ok ? "done" : "error");
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
          <label className="mt-5 block">
            <span className="mb-1.5 block font-serif text-sm tracking-wide text-ink/70">
              Number of guests
            </span>
            <select name="guests" defaultValue="1" className={inputClass}>
              <option value="1">Just me</option>
              <option value="2">Me plus one</option>
            </select>
          </label>
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
