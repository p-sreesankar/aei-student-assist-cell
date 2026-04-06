// ============================================================================
//  EVENTS — Applied Association Event Calendar
// ============================================================================
//
//  HOW TO ADD A NEW EVENT:
//  -----------------------
//  1. Copy the template below and paste it at the TOP of the array.
//
//     {
//       id:              "your-event-slug",
//       title:           "Event Name Here",
//       date:            "YYYY-MM-DD",                  ← start / only date
//       endDate:         null,                           ← end date for multi-day events, or null
//       venue:           "Venue Name, Location",
//       description:     "A short description (1–3 sentences).",
//       image:           null,                           ← poster URL, or null → gradient placeholder
//       category:        "workshop",                    ← see CATEGORY OPTIONS below
//       time:            "10:00 AM – 4:00 PM",          ← or null
//       registrationUrl: null,                           ← Google Form link, or null
//     },
//
//  2. Replace placeholder values with your actual content.
//  3. Save → git add . → git commit → git push → auto-deploys!
//
//  HOW TO REMOVE AN EVENT:
//  -----------------------
//  Delete the entire { ... }, block for that event. Save and push.
//
//  NOTE: You do NOT need to set "upcoming" or "past" status manually.
//  The website compares today's date to event.date and auto-categorises.
//
//  CATEGORY OPTIONS:
//  -----------------
//  "workshop"     → Hands-on tech sessions, labs, bootcamps
//  "fest"         → TechFest, cultural fests, flagship events
//  "seminar"      → Guest talks, alumni talks, panel discussions
//  "competition"  → Hackathons, coding contests, project expos
//  "cultural"     → Onam, Christmas, department celebrations
//  "general"      → Anything else
//
//  FIELD REFERENCE:
//  ┌──────────────────┬──────────────────────────────────┬──────────┬─────────────────────────────────────────────┐
//  │ Field            │ Type                             │ Required │ Description                                 │
//  ├──────────────────┼──────────────────────────────────┼──────────┼─────────────────────────────────────────────┤
//  │ id               │ String                           │ Yes      │ Unique slug (lowercase, hyphens)            │
//  │ title            │ String                           │ Yes      │ Event heading                               │
//  │ date             │ String (YYYY-MM-DD)              │ Yes      │ Start date — used for sorting & status      │
//  │ endDate          │ String (YYYY-MM-DD) | null       │ No       │ End date for multi-day events               │
//  │ venue            │ String                           │ Yes      │ Where the event takes place                 │
//  │ description      │ String                           │ Yes      │ Short body text (1–3 sentences)             │
//  │ image            │ String | null                    │ No       │ Poster/photo URL, or null for placeholder   │
//  │ category         │ String                           │ Yes      │ One of the category options above           │
//  │ time             │ String | null                    │ No       │ Time range, or null                         │
//  │ registrationUrl  │ String | null                    │ No       │ Registration form link, or null             │
//  └──────────────────┴──────────────────────────────────┴──────────┴─────────────────────────────────────────────┘
//
// ============================================================================

/** @type {Array<{id: string, title: string, date: string, endDate: string|null, venue: string, description: string, image: string|null, category: string, time: string|null, registrationUrl: string|null}>} */
const EVENTS = [

  {
    id:              "techfest-aei-2026",
    title:           "TechFest AEI 2026",
    date:            "2026-04-10",
    endDate:         "2026-04-12",
    venue:           "Seminar Hall, CET Main Block",
    description:     "The annual technical festival of the AEI department featuring project exhibitions, coding contests, a robotics challenge, and guest lectures from industry professionals. Open to all engineering students.",
    image:           null,
    category:        "fest",
    time:            "9:00 AM – 5:00 PM",
    registrationUrl: "https://forms.gle/EXAMPLE_TECHFEST_REG",
  },

  {
    id:              "ieee-embedded-workshop-2026",
    title:           "IEEE Workshop — Embedded Systems for IoT",
    date:            "2026-03-22",
    endDate:         "2026-03-23",
    venue:           "AEI Seminar Room, 2nd Floor",
    description:     "A hands-on two-day workshop on designing IoT solutions using ESP32 and Arduino. Participants will build a working weather station by the end of Day 2. Materials provided.",
    image:           null,
    category:        "workshop",
    time:            "10:00 AM – 4:00 PM",
    registrationUrl: "https://forms.gle/EXAMPLE_WORKSHOP_REG",
  },

  {
    id:              "hackathon-ctrl-alt-build-2026",
    title:           "Ctrl+Alt+Build — 24-Hour Hackathon",
    date:            "2026-03-08",
    endDate:         "2026-03-09",
    venue:           "CET Innovation Hub",
    description:     "A 24-hour hackathon open to all CET students. Build solutions for real-world problems. Teams of 2–4. Top 3 teams win cash prizes and mentorship from industry sponsors.",
    image:           null,
    category:        "competition",
    time:            "6:00 PM (Day 1) – 6:00 PM (Day 2)",
    registrationUrl: "https://forms.gle/EXAMPLE_HACKATHON",
  },

  {
    id:              "alumni-talk-feb-2026",
    title:           "Alumni Talk — Careers in VLSI Design",
    date:            "2026-02-14",
    endDate:         null,
    venue:           "EEE Auditorium, CET",
    description:     "Mr. Rohit Menon (AEI Batch of 2018, currently at Intel Bangalore) shares insights on breaking into the VLSI industry, skills to develop during college, and tips for cracking placement interviews.",
    image:           null,
    category:        "seminar",
    time:            "2:00 PM – 3:30 PM",
    registrationUrl: null,
  },

  {
    id:              "christmas-celebration-2025",
    title:           "Christmas Celebration — AEI Department",
    date:            "2025-12-20",
    endDate:         null,
    venue:           "AEI Department Hall",
    description:     "Secret Santa, carol singing, and a department potluck to close out the year. Everyone's invited — bring your best dish and holiday spirit!",
    image:           null,
    category:        "cultural",
    time:            "3:00 PM – 6:00 PM",
    registrationUrl: null,
  },

  {
    id:              "onam-celebration-2025",
    title:           "Onam Celebrations — AEI Department",
    date:            "2025-09-05",
    endDate:         null,
    venue:           "AEI Department Grounds",
    description:     "The annual Onam celebration organized by S6 and S8 students. Pookalam competition, traditional games, Onasadya, and a cultural programme rounded off a memorable day for the AEI family.",
    image:           null,
    category:        "cultural",
    time:            "10:00 AM – 2:00 PM",
    registrationUrl: null,
  },

];

export { EVENTS };
