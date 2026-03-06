// ============================================================================
//  RESOURCES — Student Assist Cell Downloads & Links
// ============================================================================
//
//  HOW TO ADD A NEW RESOURCE:
//  --------------------------
//  1. Upload the file to Google Drive → right-click → "Share" →
//     set to "Anyone with the link" → copy the link.
//
//  2. Copy the template below and paste it at the TOP of the array:
//
//     {
//       id:          "short-unique-slug",
//       title:       "Name of the Resource",
//       description: "A one-line note about what this file is.",
//       category:    "Academic Forms",       ← human-readable category name
//       fileType:    "pdf",                  ← see FILE TYPE OPTIONS
//       driveLink:   "https://drive.google.com/...",
//       addedDate:   "YYYY-MM-DD",
//     },
//
//  3. Save → git add . → git commit -m "add resource: title" → git push
//
//  HOW TO REMOVE A RESOURCE:
//  -------------------------
//  Delete the entire { ... }, block for that resource. Save and push.
//
//  CATEGORY — free-form string, grouped in the UI by exact match:
//  - "Academic Forms"   → Application forms, request forms, declarations
//  - "Fee Related"      → Fee structure, scholarship forms
//  - "Hostel"           → Hostel application, rules, mess forms
//  - "Syllabus"         → Semester syllabus PDFs, course plans
//  - "Lab Manuals"      → Lab manuals, experiment sheets
//  - "Guides"           → How-to guides, handbooks
//  - "General"          → Anything that doesn't fit above
//
//  FILE TYPE OPTIONS:  "pdf" | "doc" | "xls" | "ppt" | "img" | "zip" | "link"
//
//  FIELD REFERENCE:
//  ┌─────────────┬────────────────────┬──────────┬──────────────────────────────────────┐
//  │ Field       │ Type               │ Required │ Description                          │
//  ├─────────────┼────────────────────┼──────────┼──────────────────────────────────────┤
//  │ id          │ String             │ Yes      │ Unique slug (lowercase, hyphens)     │
//  │ title       │ String             │ Yes      │ Display name of the resource         │
//  │ description │ String             │ Yes      │ Brief note about the file            │
//  │ category    │ String             │ Yes      │ Human-readable category name         │
//  │ fileType    │ String             │ Yes      │ "pdf","doc","xls","ppt","img","zip"  │
//  │ driveLink   │ String             │ Yes      │ Google Drive shareable link           │
//  │ addedDate   │ String (YYYY-MM-DD)│ Yes      │ When this was added                  │
//  └─────────────┴────────────────────┴──────────┴──────────────────────────────────────┘
//
// ============================================================================

/** @type {Array<{id: string, title: string, description: string, category: string, fileType: string, driveLink: string, addedDate: string}>} */
const RESOURCES = [

  // ──── Academic Forms ───────────────────────────────────────────────────
  {
    id:          "internship-request-letter",
    title:       "Internship Request Letter — Template",
    description: "Official request letter on CET letterhead for students seeking internships. Fill in your details, print, and get HOD's signature.",
    category:    "Academic Forms",
    fileType:    "doc",
    driveLink:   "https://drive.google.com/file/d/EXAMPLE_INTERN_LETTER/view?usp=sharing",
    addedDate:   "2025-12-15",
  },
  {
    id:          "no-dues-form",
    title:       "No Dues Certificate — Graduating Students",
    description: "Required for final-semester students before collecting degree. Get signatures from library, lab, and department office.",
    category:    "Academic Forms",
    fileType:    "pdf",
    driveLink:   "https://drive.google.com/file/d/EXAMPLE_NO_DUES/view?usp=sharing",
    addedDate:   "2026-01-20",
  },

  // ──── Fee Related ──────────────────────────────────────────────────────
  {
    id:          "fee-structure-2025-26",
    title:       "Fee Structure — AEI 2025-26",
    description: "Detailed semester-wise fee breakdown for AEI students under merit, management, and NRI quota.",
    category:    "Fee Related",
    fileType:    "pdf",
    driveLink:   "https://drive.google.com/file/d/EXAMPLE_FEE/view?usp=sharing",
    addedDate:   "2025-07-01",
  },

  // ──── Syllabus ─────────────────────────────────────────────────────────
  {
    id:          "s6-syllabus-ktu-2024",
    title:       "S6 AEI Syllabus — KTU 2024 Scheme",
    description: "Complete semester syllabus for S6 Applied Electronics and Instrumentation under the 2024 KTU regulation.",
    category:    "Syllabus",
    fileType:    "pdf",
    driveLink:   "https://drive.google.com/file/d/EXAMPLE_SYLLABUS_S6/view?usp=sharing",
    addedDate:   "2026-01-10",
  },
  {
    id:          "s4-syllabus-ktu-2024",
    title:       "S4 AEI Syllabus — KTU 2024 Scheme",
    description: "S4 course plan with electives, lab components, and internal evaluation breakdowns.",
    category:    "Syllabus",
    fileType:    "pdf",
    driveLink:   "https://drive.google.com/file/d/EXAMPLE_SYLLABUS_S4/view?usp=sharing",
    addedDate:   "2025-12-20",
  },

  // ──── Lab Manuals ──────────────────────────────────────────────────────
  {
    id:          "lab-manual-mi",
    title:       "Lab Manual — Measurements & Instrumentation (AET 392)",
    description: "Experiment procedures, circuit diagrams, and viva questions for the M&I lab. Required for S4 AEI students.",
    category:    "Lab Manuals",
    fileType:    "pdf",
    driveLink:   "https://drive.google.com/file/d/EXAMPLE_LABMANUAL_MI/view?usp=sharing",
    addedDate:   "2026-01-05",
  },

  // ──── Guides ───────────────────────────────────────────────────────────
  {
    id:          "ieee-xplore-guide",
    title:       "How to Access IEEE Xplore via CET Library",
    description: "Step-by-step guide to accessing IEEE Xplore, Springer, and ScienceDirect papers using CET's institutional login.",
    category:    "Guides",
    fileType:    "pdf",
    driveLink:   "https://drive.google.com/file/d/EXAMPLE_IEEE_GUIDE/view?usp=sharing",
    addedDate:   "2025-11-20",
  },

  // ──── Hostel ───────────────────────────────────────────────────────────
  {
    id:          "hostel-application-form",
    title:       "Hostel Allotment Application Form",
    description: "Application form for CET hostel admission. Submit to warden's office along with fee receipt.",
    category:    "Hostel",
    fileType:    "pdf",
    driveLink:   "https://drive.google.com/file/d/EXAMPLE_HOSTEL/view?usp=sharing",
    addedDate:   "2025-06-15",
  },

];

export { RESOURCES };
