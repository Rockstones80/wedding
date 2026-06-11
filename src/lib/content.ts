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
  dateISO: "2026-09-19T14:00:00+01:00",
  dateDisplay: "19.09.26",
  // Spelled-out date.
  dateLong: "19th September 2026",

  // Set to e.g. "/hero.jpg" once the couple's photo is added to /public.
  heroImage: '/footer.jpg',
  // Floral 2cluster draped over the hero's bottom edge.
  heroFloral: "/floral.webp" as string | null,

  letter: {
    heading: "Dear Friends and Family,",
    paragraphs: [
      "As we get ready to say “I do,” we feel grateful for the wonderful people in our lives.",
      "Your support means the world to us, and we would be honored to have you with us as we begin our life together.",
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
    name: "Devonshire",
    addressLines: ["ADDRESS: 293-297 Edge Ln, Fairfield", "Liverpool L7 9LD"],
    mapsQuery: "Devonshire, 293-297 Edge Ln, Fairfield, Liverpool L7 9LD",
    photo: "/location.jpg" as string | null,
  },

  dressCode: {
    intro:
      "We kindly invite you to dress in elegant attire that blends with the spirit of our day.",
    palette: [
      { hex: "#6b1830", name: "Wine" },
      { hex: "#3a2b22", name: "Espresso" },
    ],
    gentlemen:
      "African traditional wear or a tailored suit with smart shoes",
    ladies:
      "African traditional wear or a elegant formal dress with heel.",
    // Drop the photos into /public with these names (like hero2.jpg).
    photoGentlemen: "/dress-gentlemen.jpg" as string | null,
    photoLadies: "/dress-ladies.jpg" as string | null,
  },


  // Shown where the schedule used to be.
  guestNote: {
    heading: "Kindly Note",
    paragraphs: [
      "We are delighted to celebrate our special day with our closest family and friends. Please note that this is an invitation-only event.",
      "While we have chosen to make our celebration adults-only, children of immediate family members will be in attendance.",
    ],
  },

  story: {
    paragraphs: [
      "Our story began with a simple online introduction, but from the very first conversation, we knew there was something special between us. What started as messages and laughter quickly grew into a beautiful friendship, and before long, we became inseparable. Since then, our days have been filled with love, happiness, and countless laughs.",
      "Together, we have created a life full of wonderful memories, and we cannot wait to begin our next chapter as husband and wife..",
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
