// ============================================================================
//  EVENTS — Student Assist Cell Event Calendar
// ============================================================================
//
//  HOW TO ADD A NEW EVENT:
//  -----------------------
//  1. Copy the block below (between the --- markers) and paste it
//     anywhere inside the list. The site automatically sorts events
//     and splits them into "Upcoming" vs "Past" based on the date.
//
//     ---
//     {
//       id:          "your-event-slug",
//       name:        "Event Name Here",
//       date:        "YYYY-MM-DD",
//       venue:       "Venue Name, Location",
//       description: "A short description of the event (1–3 sentences).",
//       imageUrl:    "https://example.com/photo.jpg",   ← or null if no image
//       time:        "10:00 AM – 4:00 PM",              ← or null if not yet decided
//       registrationUrl: null,                           ← Google Form link, or null
//     },
//     ---
//
//  2. Replace placeholder values with your actual content.
//  3. Save → git add . → git commit -m "add event: name" → git push
//
//  HOW TO REMOVE AN EVENT:
//  -----------------------
//  Delete the entire { ... }, block for that event. Save and push.
//
//  NOTE: You do NOT need to mark an event as "past" manually.
//  The website checks today's date and moves past events automatically.
//
//  FIELD REFERENCE:
//  ┌──────────────────┬──────────────────┬──────────┬──────────────────────────────────────────┐
//  │ Field            │ Type             │ Required │ Description                              │
//  ├──────────────────┼──────────────────┼──────────┼──────────────────────────────────────────┤
//  │ id               │ String           │ Yes      │ Unique slug (lowercase, hyphens)         │
//  │ name             │ String           │ Yes      │ Event title                              │
//  │ date             │ String           │ Yes      │ Date in YYYY-MM-DD format                │
//  │ venue            │ String           │ Yes      │ Where the event takes place               │
//  │ description      │ String           │ Yes      │ Short summary (1–3 sentences)            │
//  │ imageUrl         │ String or null   │ No       │ Event poster/photo URL, or null          │
//  │ time             │ String or null   │ No       │ Time range string, or null               │
//  │ registrationUrl  │ String or null   │ No       │ Registration form link, or null          │
//  └──────────────────┴──────────────────┴──────────┴──────────────────────────────────────────┘
//
// ============================================================================

const EVENTS = [

  {
    id:              "techfest-aei-2026",
    name:            "TechFest AEI 2026",
    date:            "2026-04-10",
    venue:           "Seminar Hall, CET Main Block",
    description:     "The annual technical festival of the AEI department featuring project exhibitions, coding contests, a robotics challenge, and guest lectures from industry professionals. Open to all engineering students.",
    imageUrl:        "assets/gallery/techfest-2026-poster.jpg",
    time:            "9:00 AM – 5:00 PM",
    registrationUrl: "https://forms.gle/EXAMPLE_TECHFEST_REG",
  },

  {
    id:              "ieee-embedded-workshop-2026",
    name:            "IEEE Workshop — Embedded Systems for IoT",
    date:            "2026-03-22",
    venue:           "AEI Seminar Room, 2nd Floor",
    description:     "A hands-on two-day workshop on designing IoT solutions using ESP32 and Arduino. Participants will build a working weather station by the end of Day 2. Materials provided.",
    imageUrl:        null,
    time:            "10:00 AM – 4:00 PM",
    registrationUrl: "https://forms.gle/EXAMPLE_WORKSHOP_REG",
  },

  {
    id:              "alumni-talk-feb-2026",
    name:            "Alumni Talk — Careers in VLSI Design",
    date:            "2026-02-14",
    venue:           "EEE Auditorium, CET",
    description:     "Mr. Rohit Menon (AEI Batch of 2018, currently at Intel Bangalore) shares insights on breaking into the VLSI industry, skills to develop during college, and tips for cracking placement interviews.",
    imageUrl:        "assets/gallery/alumni-talk-rohit.jpg",
    time:            "2:00 PM – 3:30 PM",
    registrationUrl: null,
  },

  {
    id:              "onam-celebration-2025",
    name:            "Onam Celebrations — AEI Department",
    date:            "2025-09-05",
    venue:           "AEI Department Grounds",
    description:     "The annual Onam celebration organized by S6 and S8 students. Pookalam competition, traditional games, Onasadya, and a cultural programme rounded off a memorable day for the AEI family.",
    imageUrl:        "assets/gallery/onam-2025.jpg",
    time:            "10:00 AM – 2:00 PM",
    registrationUrl: null,
  },

];

export { EVENTS };
