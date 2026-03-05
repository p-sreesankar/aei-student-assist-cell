// ============================================================================
//  RESOURCES — Student Assist Cell Downloads & Links
// ============================================================================
//
//  HOW TO ADD A NEW RESOURCE:
//  --------------------------
//  1. Upload the file to Google Drive → right-click → "Share" →
//     set to "Anyone with the link" → copy the link.
//
//  2. Copy the block below and paste it at the TOP of the list:
//
//     ---
//     {
//       title:       "Name of the Resource",
//       description: "A one-line note about what this file is.",
//       category:    "form",          ← pick one: "form", "guide", "syllabus", "labmanual", "other"
//       url:         "https://drive.google.com/...",
//       dateAdded:   "YYYY-MM-DD",
//     },
//     ---
//
//  3. Save → git add . → git commit -m "add resource: title" → git push
//
//  HOW TO REMOVE A RESOURCE:
//  -------------------------
//  Delete the entire { ... }, block for that resource. Save and push.
//
//  CATEGORY OPTIONS:
//  - "form"       → Application forms, request forms, declaration forms
//  - "guide"      → How-to guides, handbooks, orientation docs
//  - "syllabus"   → Semester syllabus PDFs, course plans
//  - "labmanual"  → Lab manuals, experiment sheets
//  - "other"      → Anything that doesn't fit above
//
//  FIELD REFERENCE:
//  ┌─────────────┬──────────┬──────────┬─────────────────────────────────────────────────────┐
//  │ Field       │ Type     │ Required │ Description                                         │
//  ├─────────────┼──────────┼──────────┼─────────────────────────────────────────────────────┤
//  │ title       │ String   │ Yes      │ Display name of the resource                        │
//  │ description │ String   │ Yes      │ Brief note (what the file is, who needs it)         │
//  │ category    │ String   │ Yes      │ One of: "form","guide","syllabus","labmanual","other"│
//  │ url         │ String   │ Yes      │ Google Drive shareable link or any public URL        │
//  │ dateAdded   │ String   │ No       │ When this was added (YYYY-MM-DD), for sorting        │
//  └─────────────┴──────────┴──────────┴─────────────────────────────────────────────────────┘
//
// ============================================================================

const RESOURCES = [

  {
    title:       "S6 AEI Syllabus — KTU 2024 Scheme",
    description: "Complete semester syllabus for S6 Applied Electronics and Instrumentation under the 2024 KTU regulation. Includes course outcomes and references.",
    category:    "syllabus",
    url:         "https://drive.google.com/file/d/EXAMPLE_SYLLABUS_S6/view?usp=sharing",
    dateAdded:   "2026-01-10",
  },

  {
    title:       "Lab Manual — Measurements & Instrumentation (AET 392)",
    description: "Lab manual with experiment procedures, circuit diagrams, and viva questions for the M&I lab. Required for S4 AEI students.",
    category:    "labmanual",
    url:         "https://drive.google.com/file/d/EXAMPLE_LABMANUAL_MI/view?usp=sharing",
    dateAdded:   "2026-01-05",
  },

  {
    title:       "Internship Request Letter — Template",
    description: "Official request letter template on CET letterhead for students seeking internships. Fill in your details, print, and get the HOD's signature.",
    category:    "form",
    url:         "https://drive.google.com/file/d/EXAMPLE_INTERN_LETTER/view?usp=sharing",
    dateAdded:   "2025-12-15",
  },

  {
    title:       "Guide — How to Access IEEE Xplore via CET Library",
    description: "Step-by-step guide to accessing IEEE Xplore, Springer, and ScienceDirect papers using CET's institutional login. Works from campus Wi-Fi or VPN.",
    category:    "guide",
    url:         "https://drive.google.com/file/d/EXAMPLE_IEEE_GUIDE/view?usp=sharing",
    dateAdded:   "2025-11-20",
  },

];

export { RESOURCES };
