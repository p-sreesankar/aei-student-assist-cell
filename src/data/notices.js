// ============================================================================
//  NOTICES — AEI Association Notice Board
// ============================================================================
//
//  HOW TO ADD A NEW NOTICE:
//  ------------------------
//  1. Copy the template below and paste it at the TOP of the array.
//
//     {
//       id:            "your-unique-slug",
//       title:         "Your Notice Title Here",
//       category:      "academic",                      ← one of: academic | administrative | urgent | general
//       date:          "YYYY-MM-DD",
//       description:   "A short summary of the notice (1–3 sentences).",
//       attachmentUrl: "https://drive.google.com/...",   ← or null if no file
//       pinned:        false,                            ← set true to pin at top
//     },
//
//  2. Replace the placeholder values with your actual content.
//  3. Save → git add . → git commit -m "add notice: your title" → git push
//
//  HOW TO REMOVE A NOTICE:
//  -----------------------
//  Find the { ... } block for that notice and delete the entire block
//  (from the opening { to the closing },). Save and push.
//
//  HOW TO PIN A NOTICE:
//  --------------------
//  Set  pinned: true  — it will always appear at the top regardless of date.
//  Only pin 1–2 notices at a time to avoid clutter.
//
//  CATEGORY OPTIONS:
//  -----------------
//  "academic"       → Exams, submissions, timetables, academic deadlines
//  "administrative" → Fees, registrations, office hours, admin matters
//  "urgent"         → Time-sensitive / critical announcements
//  "general"        → Everything else (workshops, opportunities, etc.)
//
//  FIELD REFERENCE:
//  ┌─────────────────┬──────────────────────────────────┬──────────┬──────────────────────────────────────────┐
//  │ Field           │ Type                             │ Required │ Description                              │
//  ├─────────────────┼──────────────────────────────────┼──────────┼──────────────────────────────────────────┤
//  │ id              │ String                           │ Yes      │ Unique slug (lowercase, hyphens)         │
//  │ title           │ String                           │ Yes      │ Notice heading                           │
//  │ category        │ "academic" | "administrative"    │ Yes      │ Determines badge color in the UI         │
//  │                 │ | "urgent" | "general"           │          │                                          │
//  │ date            │ String (YYYY-MM-DD)              │ Yes      │ Date posted — used for sorting           │
//  │ description     │ String                           │ Yes      │ Short body text (1–3 sentences)          │
//  │ attachmentUrl   │ String | null                    │ No       │ Link to PDF/file, or null                │
//  │ pinned          │ Boolean                          │ No       │ Stick to top? (default: false)           │
//  └─────────────────┴──────────────────────────────────┴──────────┴──────────────────────────────────────────┘
//
// ============================================================================

/** @type {Array<{id: string, title: string, category: string, date: string, description: string, attachmentUrl: string|null, pinned: boolean}>} */
const NOTICES = [
	{
		id: "sem-exam-dates-s2-s4-s6-s8",
		title: "Sem Exam Dates",
		category: "academic",
		date: "2026-04-12",
		description: "B.Tech Applied Electronics Detailed Examination Time Table (S2, S4, S6, S8).",
		attachmentUrl: "https://www.instagram.com/p/DWwQmkqk-Vn/?igsh=MTl3dnJhajNxdGc2MA==",
		pinned: true,
	},
];

export { NOTICES };
