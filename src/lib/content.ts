// All site copy and event data lives here — edit this file only to change
// names, dates, venue, schedule, and texts. Everything below is PLACEHOLDER
// content until the couple's real details are provided.

export const site = {
  couple: {
    nameA: "Raphael",
    nameB: "Shaleen",
    // Initials pressed into the envelope's wax seal.
    monogram: "R & S",
  },

  // Ceremony start — drives the countdown and calendar links.
  dateISO: "2026-09-19T15:00:00+01:00",
  dateDisplay: "19 . 09 . 2026",
  // Spelled-out date.
  dateLong: "19th September 2026",

  // Set to e.g. "/hero.jpg" once the couple's photo is added to /public.
  heroImage: '/footer.jpg',
  // Floral 2cluster draped over the hero's bottom edge.
  heroFloral: "/floral.webp" as string | null,

  letter: {
    heading: "Dear Friends and Family,",
    paragraphs: [
      "As we prepare to say “I do,” our hearts are full of gratitude for the people who have shaped our lives and that means you.",
      "It would be our honor to have you beside us as we begin this new chapter together.",
    ],
  },

  schedule: [
    {
      time: "15:00",
      title: "Wedding Ceremony",
      durationMin: 60,
      description:
        "The exchange of vows. Kindly be seated fifteen minutes before we begin.",
    },
    {
      time: "16:30",
      title: "Cocktail Hour",
      durationMin: 90,
      description:
        "Signature cocktails and canapés while we steal away for portraits.",
    },
    {
      time: "18:30",
      title: "Dinner",
      durationMin: 90,
      description: "A seated dinner with toasts from the people we love most.",
    },
    {
      time: "20:00",
      title: "Party",
      durationMin: 240,
      description:
        "Dancing under the lights until late. Comfortable shoes encouraged.",
    },
  ],

  venue: {
    name: "The Orchard Hall",
    addressLines: ["12 Rosewood Avenue", "Garden City"],
    mapsQuery: "The Orchard Hall, 12 Rosewood Avenue, Garden City",
  },

  dressCode: {
    intro:
      "We kindly invite you to dress in elegant attire that blends with the spirit of our day.",
    palette: [
      { hex: "#6b1830", name: "Wine" },
      { hex: "#3a2b22", name: "Espresso" },
    ],
    gentlemen:
      "Well-tailored suits in soft neutrals or deep tones, with classic dress shoes.",
    ladies:
      "Formal dresses in elegant, polished styles — jewel tones are most welcome.",
    // Drop the photos into /public with these names (like hero2.jpg).
    photoGentlemen: "/dress-gentlemen.jpg" as string | null,
    photoLadies: "/dress-ladies.jpg" as string | null,
  },

  details: {
    contactName: "Ada",
    contactPhone: "+000 0000 000 000",
    gifts:
      "Your presence is the greatest gift of all. Should you wish to honor us further, a contribution toward our new beginning would be received with gratitude.",
  },

  story: {
    paragraphs: [
      "We met on an ordinary day that turned out to be anything but. What began as easy conversation grew into friendship, and slowly, beautifully, became us.",
      "Countless memories and one unforgettable proposal later — here we are, ready to begin forever.",
    ],
  },

  rsvp: {
    deadlineDisplay: "19th August, 2026",
    ctaHeading: "Confirm Your Attendance",
    ctaText:
      "To help us prepare for a joyful celebration, kindly confirm your attendance.",
    farewell: "Hope to see you there!",
  },

  // Closing photo at the very bottom — drop it into /public as footer.jpg.
  footerImage: "/hero.jpg" as string | null,

  // Background music — drop an mp3 into /public as music.mp3 (starts when a
  // guest taps "Open Invitation"; loops; toggle button bottom-right).
  musicSrc: "/music.mp3" as string | null,
} as const;
