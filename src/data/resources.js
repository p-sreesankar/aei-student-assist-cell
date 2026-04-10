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
  {
    id: "series-two-question-paper-s-four-2026-series-2-question-paper",
    moduleTitle: "Series 2 Question Papers",
    title: "Series 2 Question Paper",
    description: "Series 2 Question Papers",
    category: "2024 Scheme S4",
    fileType: "question-paper",
    driveLink: "https://drive.google.com/file/d/1AbeygiN-JfQ5BqcVEDjo0E76GZl4wIEZ/view?usp=sharing",
    addedDate: "2026-04-09",
  },
  {
    id: "series-one-question-paper-s-four-2026-series-1-question-paper",
    moduleTitle: "Series 1 Question Papers",
    title: "Series 1 Question Paper",
    description: "Series 1 Question Papers",
    category: "2024 Scheme S4",
    fileType: "question-paper",
    driveLink: "https://drive.google.com/file/d/1oVOWn7pKWrDDBrhGu7ql0TH3N2-BAgc_/view?usp=sharing",
    addedDate: "2026-04-09",
  },
  {
    id: "power-electronics-module-4",
    moduleTitle: "Power Electronics",
    title: "Module 4",
    description: "Power Electronics",
    category: "2019 Scheme S6",
    fileType: "notes",
    driveLink: "https://drive.google.com/file/d/1wq7kXnYp9LkSvM8n-3HtphGjT9rsNf8o/view?usp=sharing",
    addedDate: "2026-04-09",
  },
  {
    id: "power-electronics-module-3",
    moduleTitle: "Power Electronics",
    title: "Module 3",
    description: "Power Electronics",
    category: "2019 Scheme S6",
    fileType: "notes",
    driveLink: "https://drive.google.com/file/d/15da5yL91gxRnZpYAptGzHE2V4WTivec4/view?usp=sharing",
    addedDate: "2026-04-09",
  },
  {
    id: "power-electronics-module-2",
    moduleTitle: "Power Electronics",
    title: "Module 2",
    description: "Power Electronics",
    category: "2019 Scheme S6",
    fileType: "notes",
    driveLink: "https://drive.google.com/file/d/1Mvgf97c6vzwVJJiSTZMudWwZgcDpcBEx/view?usp=sharing",
    addedDate: "2026-04-09",
  },
  {
    id: "power-electronics-module-1",
    moduleTitle: "Power Electronics",
    title: "Module 1",
    description: "Power Electronics",
    category: "2019 Scheme S6",
    fileType: "notes",
    driveLink: "https://drive.google.com/file/d/1PG2FwAByGK-ZYHmT0UYyYJphv317XfPZ/view?usp=sharing",
    addedDate: "2026-04-09",
  },
  {
    id: "industrial-economics-and-foreign-trade-module-4",
    moduleTitle: "Industrial Economics and Foreign Trade",
    title: "Module 4",
    description: "Industrial Economics and Foreign Trade",
    category: "2019 Scheme S6",
    fileType: "notes",
    driveLink: "https://drive.google.com/file/d/13KSzyKm4OxeI2RQVC0wOi-XOAI_gdSof/view?usp=sharing",
    addedDate: "2026-04-09",
  },
  {
    id: "industrial-economics-and-foreign-trade-module-3",
    moduleTitle: "Industrial Economics and Foreign Trade",
    title: "Module 3",
    description: "Industrial Economics and Foreign Trade",
    category: "2019 Scheme S6",
    fileType: "notes",
    driveLink: "https://drive.google.com/file/d/1FEq4h7hNoDzHYdB5wS8YACFij4lBnbcJ/view?usp=sharing",
    addedDate: "2026-04-09",
  },
  {
    id: "industrial-economics-and-foreign-trade-module-2",
    moduleTitle: "Industrial Economics and Foreign Trade",
    title: "Module 2",
    description: "Industrial Economics and Foreign Trade",
    category: "2019 Scheme S6",
    fileType: "notes",
    driveLink: "https://drive.google.com/file/d/1X1s9VfZILdDknuBPqY9S6ki7EMNerrA6/view?usp=sharing",
    addedDate: "2026-04-09",
  },
  {
    id: "industrial-economics-and-foreign-trade-module-1",
    moduleTitle: "Industrial Economics and Foreign Trade",
    title: "Module 1",
    description: "Industrial Economics and Foreign Trade",
    category: "2019 Scheme S6",
    fileType: "notes",
    driveLink: "https://drive.google.com/file/d/1DIAZM4VjuXUL-he9OxmW39hBP3ADCyiG/view?usp=sharing",
    addedDate: "2026-04-09",
  },
  {
    id: "digital-signal-processing-module-5",
    moduleTitle: "Digital Signal Processing",
    title: "Module 5",
    description: "Digital Signal Processing",
    category: "2019 Scheme S6",
    fileType: "notes",
    driveLink: "https://drive.google.com/file/d/1qruW_aB5aHjRpvh8-m5sfvb97MEM7GF0/view?usp=drive_link",
    addedDate: "2026-04-08",
  },
  {
    id: "digital-signal-processing-module-4",
    moduleTitle: "Digital Signal Processing",
    title: "Module 4",
    description: "Digital Signal Processing",
    category: "2019 Scheme S6",
    fileType: "notes",
    driveLink: "https://drive.google.com/file/d/15tTy5mGlPQv1FWzsLcsQ86hhoX3clP_T/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "digital-signal-processing-module-3",
    moduleTitle: "Digital Signal Processing",
    title: "Module 3",
    description: "Digital Signal Processing",
    category: "2019 Scheme S6",
    fileType: "notes",
    driveLink: "https://drive.google.com/file/d/1kTLUR2XLA0cavsNSpZatMCGkOBM0tJ55/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "digital-signal-processing-module-2",
    moduleTitle: "Digital Signal Processing",
    title: "Module 2",
    description: "Digital Signal Processing",
    category: "2019 Scheme S6",
    fileType: "notes",
    driveLink: "https://drive.google.com/file/d/1A2-2-Vau4yn_rzp22IT8OoOgbH6Hqugo/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "digital-signal-processing-module-1",
    moduleTitle: "Digital Signal Processing",
    title: "Module 1",
    description: "Digital Signal Processing",
    category: "2019 Scheme S6",
    fileType: "notes",
    driveLink: "https://drive.google.com/file/d/13qD2IF-pX_lks_zeDzIMCLT3SoMqq2rT/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-chemistry-first-series-mar-2026-answer-key-answer-key",
    title: "Answer Key",
    description: "Chemistry First Series (Mar 2026)",
    category: "2024 Scheme S2",
    fileType: "answer-key",
    driveLink: "https://drive.google.com/file/d/16K1J3TQufdCFRwLDRzVuVJMrS_E4eWca/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-chemistry-first-series-mar-2026-qn-paper-question-paper",
    title: "Question Paper",
    description: "Chemistry First Series (Mar 2026)",
    category: "2024 Scheme S2",
    fileType: "question-paper",
    driveLink: "https://drive.google.com/file/d/1jBM6NKDAmTbJcEhVWUl-ky17oSAdOyJm/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-fc-first-series-mar-2026-answer-key-answer-key",
    title: "Answer Key",
    description: "FC First Series (Mar 2026)",
    category: "2024 Scheme S2",
    fileType: "answer-key",
    driveLink: "https://drive.google.com/file/d/1Om4YjJXFbiqjXqgNpHc7GhESwbpsUATn/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-fc-first-series-mar-2026-qn-paper-question-paper",
    title: "Question Paper",
    description: "FC First Series (Mar 2026)",
    category: "2024 Scheme S2",
    fileType: "question-paper",
    driveLink: "https://drive.google.com/file/d/1x3S5YapTSMSPgnMemqj5Jzu9GRYMFe0M/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-maths-first-series-mar-2026-answer-key-answer-key",
    title: "Answer Key",
    description: "Maths First Series (Mar 2026)",
    category: "2024 Scheme S2",
    fileType: "answer-key",
    driveLink: "https://drive.google.com/file/d/1DrcZNGbvFmd0wvML3206BMdDXlrUCNIj/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-maths-first-series-mar-2026-qn-paper-question-paper",
    title: "Question Paper",
    description: "Maths First Series (Mar 2026)",
    category: "2024 Scheme S2",
    fileType: "question-paper",
    driveLink: "https://drive.google.com/file/d/1hD4xsSc-z5UHjbAeCjeSvgPfUginqZHj/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-nt-first-series-mar-2026-answer-key-answer-key",
    title: "Answer Key",
    description: "NT First Series (Mar 2026)",
    category: "2024 Scheme S2",
    fileType: "answer-key",
    driveLink: "https://drive.google.com/file/d/1HEN7IjAmdGdD9JVfszBdGHqv1wj3ZI42/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-nt-first-series-mar-2026-qn-paper-question-paper",
    title: "Question Paper",
    description: "NT First Series (Mar 2026)",
    category: "2024 Scheme S2",
    fileType: "question-paper",
    driveLink: "https://drive.google.com/file/d/1dk9JFTynnsMKh3ei0NkBdE-SYEGVdM5f/view?usp=drive_link",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-ipr-first-series-mar-2026-answer-key-answer-key",
    title: "Answer Key",
    description: "IPR First Series (Mar 2026)",
    category: "2024 Scheme S2",
    fileType: "answer-key",
    driveLink: "https://drive.google.com/file/d/1tALjxQ_rvHbFoNLJi2YaGCFb4KQqxS_0/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-ipr-first-series-mar-2026-qn-paper-question-paper",
    title: "Question Paper",
    description: "IPR First Series (Mar 2026)",
    category: "2024 Scheme S2",
    fileType: "question-paper",
    driveLink: "https://drive.google.com/file/d/11yB9Vq9-A6awcDQbXWBDZ2E29TAG60Nu/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-prc-first-series-mar-2026-answer-key-answer-key",
    title: "Answer Key",
    description: "PRC First Series (Mar 2026)",
    category: "2024 Scheme S2",
    fileType: "answer-key",
    driveLink: "https://drive.google.com/file/d/1tyXcoG7LDb6W2TVs_ol_w5Jbp28Li-WH/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-prc-first-series-mar-2026-qn-paper-question-paper",
    title: "Question Paper",
    description: "PRC First Series (Mar 2026)",
    category: "2024 Scheme S2",
    fileType: "question-paper",
    driveLink: "https://drive.google.com/file/d/1vgRPS9cES7t-HZ0EJz7bXPM0ruMzOSuL/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-chemistry-lab-video-expt-10",
    title: "Expt. 10",
    description: "Chemistry Lab (GXCYT122)",
    category: "2024 Scheme S2",
    fileType: "video",
    driveLink: "https://drive.google.com/file/d/1POkMK7YhkW12q_hnxkIDHXIQFa0zmV_N/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s2-chemistry-lab-video-expt-11",
    title: "Expt. 11",
    description: "Chemistry Lab (GXCYT122)",
    category: "2024 Scheme S2",
    fileType: "video",
    driveLink: "https://drive.google.com/file/d/1m1O3mxvhcv3hClGheR_OXI8qAmvkKIfg/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s3-artificial-intelligence-data-science-notes-module-1",
    title: "Module 1",
    description: "Artificial Intelligence & Data Science (GNEST305)",
    category: "2024 Scheme S3",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/13cKhTPohFsqgmieN3_q-rDebMtw6OiMD/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s3-artificial-intelligence-data-science-notes-module-2",
    title: "Module 2",
    description: "Artificial Intelligence & Data Science (GNEST305)",
    category: "2024 Scheme S3",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/14RpxtA9VzcKQnjiYPlrdIyPvEfbQYmGh/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s3-artificial-intelligence-data-science-notes-module-3",
    title: "Module 3",
    description: "Artificial Intelligence & Data Science (GNEST305)",
    category: "2024 Scheme S3",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/1hULjjtZlRgsVgPEH9rLoghM_4TXQYf0q/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s3-artificial-intelligence-data-science-notes-module-4",
    title: "Module 4",
    description: "Artificial Intelligence & Data Science (GNEST305)",
    category: "2024 Scheme S3",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/1QVKTouVTFJcgwaVCgUOCxQEz2ENpzGrB/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s3-transducers-measurements-notes-module-1",
    title: "Module 1",
    description: "Transducers & Measurements (PCAET303)",
    category: "2024 Scheme S3",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/13kzioEJlEGN8mQQJ9g51TZySmwmHzXzV/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s3-transducers-measurements-notes-module-2",
    title: "Module 2",
    description: "Transducers & Measurements (PCAET303)",
    category: "2024 Scheme S3",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/13x6hmsyMeE6tdFsPENxkOGdjnOMrXNTr/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s3-transducers-measurements-notes-module-3",
    title: "Module 3",
    description: "Transducers & Measurements (PCAET303)",
    category: "2024 Scheme S3",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/12_Hq2aJ81nbbuj2rdrzOpgVMIIfois8i/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s3-transducers-measurements-notes-module-4",
    title: "Module 4",
    description: "Transducers & Measurements (PCAET303)",
    category: "2024 Scheme S3",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/1RDG9rTvDzQgNm2-FsbvA2F6ChGYGyryX/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s3-logic-circuit-design-notes-module-1",
    title: "Module 1",
    description: "Logic Circuit Design (PBECT304)",
    category: "2024 Scheme S3",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/1Ch6oSZjB5BM--QSaO14RjwE1A0HLGrXy/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s3-logic-circuit-design-notes-module-2",
    title: "Module 2",
    description: "Logic Circuit Design (PBECT304)",
    category: "2024 Scheme S3",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/152FkbrA_wChsX11YClkheKYxrsf4w-hm/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s3-logic-circuit-design-notes-module-3",
    title: "Module 3",
    description: "Logic Circuit Design (PBECT304)",
    category: "2024 Scheme S3",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/1ntNK_RDPQxPbaUWw3UzlBjRqO3FhjMrV/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2024-s3-logic-circuit-design-notes-module-4",
    title: "Module 4",
    description: "Logic Circuit Design (PBECT304)",
    category: "2024 Scheme S3",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/1mhGplSLfGP_AOF4V4CzIrw3ejHRPbsS4/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2019-s6-process-dynamics-control-notes-module-1",
    title: "Module 1",
    description: "Process Dynamics & Control (AET304)",
    category: "2019 Scheme S6",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/1Q8qH_mPETYoAat0nDOHxdQS4xasTs_xo/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2019-s6-process-dynamics-control-notes-module-2",
    title: "Module 2",
    description: "Process Dynamics & Control (AET304)",
    category: "2019 Scheme S6",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/14ylRPIpqDxslFUzQxckxId3Brbdpfbnk/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2019-s6-process-dynamics-control-notes-module-3",
    title: "Module 3",
    description: "Process Dynamics & Control (AET304)",
    category: "2019 Scheme S6",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/14vw2rGe4li5LFiTwlIgwS8pkmFu7ULr-/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2019-s6-process-dynamics-control-notes-module-4",
    title: "Module 4",
    description: "Process Dynamics & Control (AET304)",
    category: "2019 Scheme S6",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/1nTGtzLjEZMMjDxaHXZzyNlpujx_1MnBb/view?usp=sharing",
    addedDate: "2026-04-08",
  },
  {
    id: "site-2019-s6-process-dynamics-control-notes-module-5",
    title: "Module 5",
    description: "Process Dynamics & Control (AET304)",
    category: "2019 Scheme S6",
    fileType: "pdf",
    driveLink: "https://drive.google.com/file/d/1UmRsQueovFDMMfP6bDRWDfsLCi0PJ7_Z/view?usp=sharing",
    addedDate: "2026-04-08",
  },

];

export { RESOURCES };
