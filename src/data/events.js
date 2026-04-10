// ============================================================================
//  EVENTS — Student Assist Cell Event Calendar
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

  {
    id:              "event-2025-03-25",
    title:           "Cracking The Consulting & Analytics Industry",
    date:            "2026-03-25",
    endDate:         null,
    venue:           "EC Seminar Hall",
    description:     "AEI Association × Internship Cell present an exclusive session to help you navigate careers in consulting and analytics.\n\nKickstart your career journey by learning directly from seniors who have secured roles in the industry:\n\n• Pranathi Ajayan – KPMG\n• Rahul Sam – Geojit | Incoming Analyst at KPMG\n\n📅 Date: 25 March 2026\n📍 Venue: EC Seminar Hall\n\nDon’t miss this opportunity to gain real insights and guidance ✨",
    image:           "https://aei-cet.vercel.app/images/events/craking-the-consulting-analytics-industry.png",
    category:        "general",
    time:            "4:30 pm",
    registrationUrl: null,
  },

];

export { EVENTS };
