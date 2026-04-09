// ============================================================================
//  RESOURCES — Applied Association · Scheme → Semester → Subject → Resources
// ============================================================================
//
//  ┌──────────────────────────────────────────────────────────────────────────┐
//  │  TO ADD A NEW SUBJECT:                                                   │
//  │  Copy the subject template and add to the correct scheme + semester.     │
//  │                                                                          │
//  │  TO ADD A RESOURCE:                                                      │
//  │  Add a new object to the subject's resources[] array.                    │
//  │                                                                          │
//  │  TO MARK AS COMING SOON:                                                 │
//  │  Leave resources: []   — the card will show "Coming Soon" automatically. │
//  │                                                                          │
//  │  LAB SUBJECTS:                                                           │
//  │  Set isLab: true, use type: "video" with youtubeLink only.              │
//  └──────────────────────────────────────────────────────────────────────────┘
//
//  SUBJECT TEMPLATE:
//  {
//    id:        "unique-slug",
//    name:      "Subject Name",
//    code:      "ABC123",            // optional KTU code
//    isLab:     false,               // true for lab subjects
//    resources: [
//      // Theory types: "notes" | "formula" | "paper" | "answer-key" | "qn-paper" | "qn-papers" | "question-paper"
//      { type: "notes",   title: "Unit 1-5 Notes",    driveLink: "https://drive.google.com/..." },//      { type: "formula", title: "Formula Sheet",      driveLink: "https://drive.google.com/..." },
//      { type: "paper",   title: "2023 Solved Paper",  driveLink: "https://drive.google.com/..." },
//
//      // Lab type: "video"
//      { type: "video", title: "Exp 1 - ...", youtubeLink: "https://youtube.com/watch?v=..." },
//    ]
//  }
//
// ============================================================================

export const schemes = [
  // ═══════════════════════════════════════════════════════════════════════════
  //  2019 SCHEME
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '2019',
    label: '2019 Scheme',
    semesters: [
      // ── Semester 5 ──────────────────────────────────────────────────────
      {
        semester: 5,
      },

      // ── Semester 6 ──────────────────────────────────────────────────────
      {
        semester: 6,
        subjects: [
          {
            id: '2019-s6-control-systems',
            name: 'Process Dynamics & Control',
            code: 'AET304',
            isLab: false,
            resources: [
              { type: 'notes',   title: 'Module 1',    driveLink: 'https://drive.google.com/file/d/1Q8qH_mPETYoAat0nDOHxdQS4xasTs_xo/view?usp=sharing' },
              { type: 'notes',   title: 'Module 2',    driveLink: 'https://drive.google.com/file/d/14ylRPIpqDxslFUzQxckxId3Brbdpfbnk/view?usp=sharing' },
              { type: 'notes',   title: 'Module 3',    driveLink: 'https://drive.google.com/file/d/14vw2rGe4li5LFiTwlIgwS8pkmFu7ULr-/view?usp=sharing' },
              { type: 'notes',   title: 'Module 4',    driveLink: 'https://drive.google.com/file/d/1nTGtzLjEZMMjDxaHXZzyNlpujx_1MnBb/view?usp=sharing' },
              { type: 'notes',   title: 'Module 5',    driveLink: 'https://drive.google.com/file/d/1UmRsQueovFDMMfP6bDRWDfsLCi0PJ7_Z/view?usp=sharing' },
            ],
          },
        ],
        // subjects: [
        //   {
        //     id: '2019-s6-dsp',
        //     name: 'Digital Signal Processing',
        //     code: 'AET302',
        //     isLab: false,
        //     resources: [
        //       { type: 'notes',   title: 'Complete Notes',     driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
        //       { type: 'formula', title: 'Formula Sheet',      driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
        //     ],
        //   },
        //   {
        //     id: '2019-s6-embedded',
        //     name: 'Embedded Systems',
        //     code: 'AET304',
        //     isLab: false,
        //     resources: [],  // Coming Soon
        //   },
        //   {
        //     id: '2019-s6-dsp-lab',
        //     name: 'DSP Lab',
        //     code: 'AEL302',
        //     isLab: true,
        //     resources: [
        //       { type: 'video', title: 'Exp 1 - MATLAB Basics',       youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        //       { type: 'video', title: 'Exp 2 - DFT Implementation',  youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        //       { type: 'video', title: 'Exp 3 - FIR Filter Design',   youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        //     ],
        //   },
        // ],
      },

      // ── Semester 7 ──────────────────────────────────────────────────────
      {
        semester: 7,
      //   subjects: [
      //     {
      //       id: '2019-s7-biomedical',
      //       name: 'Biomedical Instrumentation',
      //       code: 'AET401',
      //       isLab: false,
      //       resources: [
      //         { type: 'notes', title: 'Module 1-5 Notes', driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
      //       ],
      //     },
      //     {
      //       id: '2019-s7-industrial',
      //       name: 'Industrial Instrumentation',
      //       code: 'AET403',
      //       isLab: false,
      //       resources: [],  // Coming Soon
      //     },
      //   ],
      // },

      // // ── Semester 8 ──────────────────────────────────────────────────────
      // {
      //   semester: 8,
      //   subjects: [
      //     {
      //       id: '2019-s8-project',
      //       name: 'Main Project',
      //       code: 'AET490',
      //       isLab: false,
      //       resources: [],  // Coming Soon
      //     },
      //   ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  2024 SCHEME
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: '2024',
    label: '2024 Scheme',
    semesters: [
      // ── Semester 1 ──────────────────────────────────────────────────────
      {
        semester: 1,
        // subjects: [
        //   {
        //     id: '2024-s1-linear-algebra',
        //     name: 'Linear Algebra & Calculus',
        //     code: 'MAT101',
        //     isLab: false,
        //     resources: [
        //       { type: 'notes', title: 'Module 1-5 Notes',         driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
        //       { type: 'paper', title: '2025 Question Paper',       driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
        //     ],
        //   },
        //   {
        //     id: '2024-s1-physics',
        //     name: 'Engineering Physics',
        //     code: 'PHT110',
        //     isLab: false,
        //     resources: [
        //       { type: 'notes', title: 'Complete Notes', driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
        //     ],
        //   },
        //   {
        //     id: '2024-s1-programming-lab',
        //     name: 'Introduction to Computing Lab',
        //     code: 'CSL110',
        //     isLab: true,
        //     resources: [
        //       { type: 'video', title: 'Exp 1 - Python Basics',         youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        //       { type: 'video', title: 'Exp 2 - Functions & Strings',    youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        //     ],
        //   },
        // ],
      },

      // ── Semester 2 ──────────────────────────────────────────────────────
      {
        semester: 2,
        subjects: [
          {
            id: '2024-s2-chemistry-series-1-March-2026',
            name: 'Chemistry First Series (Mar 2026)',
            code: '',
            isLab: false,
            resources: [
              { type: 'answer-key', title: 'Answer Key',   driveLink: 'https://drive.google.com/file/d/16K1J3TQufdCFRwLDRzVuVJMrS_E4eWca/view?usp=sharing' },
              { type: 'qn-paper', title: 'Question Paper',   driveLink: 'https://drive.google.com/file/d/1jBM6NKDAmTbJcEhVWUl-ky17oSAdOyJm/view?usp=sharing' },

            ],
          },
          {
            id: '2024-s2-foc-series-1-March-2026',
            name: 'FC First Series (Mar 2026)',
            code: '',
            isLab: false,
            resources: [
              { type: 'answer-key', title: 'Answer Key',   driveLink: 'https://drive.google.com/file/d/1Om4YjJXFbiqjXqgNpHc7GhESwbpsUATn/view?usp=sharing' },
              { type: 'qn-paper', title: 'Question Paper',   driveLink: 'https://drive.google.com/file/d/1x3S5YapTSMSPgnMemqj5Jzu9GRYMFe0M/view?usp=sharing' },

            ],
          },
                    {
            id: '2024-s2-maths-series-1-March-2026',
            name: 'Maths First Series (Mar 2026)',
            code: '',
            isLab: false,
            resources: [
              { type: 'answer-key', title: 'Answer Key',   driveLink: 'https://drive.google.com/file/d/1DrcZNGbvFmd0wvML3206BMdDXlrUCNIj/view?usp=sharing' },
              { type: 'qn-paper', title: 'Question Paper',   driveLink: 'https://drive.google.com/file/d/1hD4xsSc-z5UHjbAeCjeSvgPfUginqZHj/view?usp=sharing' },
            ],
          },
                    {
            id: '2024-s2-nt-series-1-March-2026',
            name: 'NT First Series (Mar 2026)',
            code: '',
            isLab: false,
            resources: [
              { type: 'answer-key', title: 'Answer Key',   driveLink: 'https://drive.google.com/file/d/1HEN7IjAmdGdD9JVfszBdGHqv1wj3ZI42/view?usp=sharing' },
              { type: 'qn-paper', title: 'Question Paper',   driveLink: 'https://drive.google.com/file/d/1dk9JFTynnsMKh3ei0NkBdE-SYEGVdM5f/view?usp=drive_link' },
            ],
          },
          {
            id: '2024-s2-ipr-series-1-March-2026',
            name: 'IPR First Series (Mar 2026)',
            code: '',
            isLab: false,
            resources: [
              { type: 'answer-key', title: 'Answer Key',   driveLink: 'https://drive.google.com/file/d/1tALjxQ_rvHbFoNLJi2YaGCFb4KQqxS_0/view?usp=sharing' },
              { type: 'qn-paper', title: 'Question Paper',   driveLink: 'https://drive.google.com/file/d/11yB9Vq9-A6awcDQbXWBDZ2E29TAG60Nu/view?usp=sharing' },
            ],
          },
          {
            id: '2024-s2-prc-series-1-March-2026',
            name: 'PRC First Series (Mar 2026)',
            code: '',
            isLab: false,
            resources: [
              { type: 'answer-key', title: 'Answer Key',   driveLink: 'https://drive.google.com/file/d/1tyXcoG7LDb6W2TVs_ol_w5Jbp28Li-WH/view?usp=sharing' },
              { type: 'qn-paper', title: 'Question Paper',   driveLink: 'https://drive.google.com/file/d/1vgRPS9cES7t-HZ0EJz7bXPM0ruMzOSuL/view?usp=sharing' },
            ],
          },
          {
            id: '2024-s2-chemistry-2026',
            name: 'Chemistry Lab',
            code: 'GXCYT122',
            isLab: true,
            resources: [
              { type: 'video', title: 'Expt. 10',   youtubeLink: 'https://drive.google.com/file/d/1POkMK7YhkW12q_hnxkIDHXIQFa0zmV_N/view?usp=sharing' },
              { type: 'video', title: 'Expt. 11',   youtubeLink: 'https://drive.google.com/file/d/1m1O3mxvhcv3hClGheR_OXI8qAmvkKIfg/view?usp=sharing' },
            ],
          },
        ],
      },

      // ── Semester 3 ──────────────────────────────────────────────────────
      {
        semester: 3,
        subjects: [
          {
            id: '2024-s3-circuits',
            name: 'Artificial Intelligence & Data Science',
            code: 'GNEST305',
            isLab: false,
            resources: [
              { type: 'notes', title: 'Module 1', driveLink: 'https://drive.google.com/file/d/13cKhTPohFsqgmieN3_q-rDebMtw6OiMD/view?usp=sharing' },
              { type: 'notes', title: 'Module 2', driveLink: 'https://drive.google.com/file/d/14RpxtA9VzcKQnjiYPlrdIyPvEfbQYmGh/view?usp=sharing' },
              { type: 'notes', title: 'Module 3', driveLink: 'https://drive.google.com/file/d/1hULjjtZlRgsVgPEH9rLoghM_4TXQYf0q/view?usp=sharing' },
              { type: 'notes', title: 'Module 4', driveLink: 'https://drive.google.com/file/d/1QVKTouVTFJcgwaVCgUOCxQEz2ENpzGrB/view?usp=sharing' },
          ],
          },
          {
            id: '2024-s3-electronics',
            name: 'Transducers & Measurements',
            code: 'PCAET303',
            isLab: false,
            resources: [
              { type: 'notes', title: 'Module 1', driveLink: 'https://drive.google.com/file/d/13kzioEJlEGN8mQQJ9g51TZySmwmHzXzV/view?usp=sharing' },
              { type: 'notes', title: 'Module 2', driveLink: 'https://drive.google.com/file/d/13x6hmsyMeE6tdFsPENxkOGdjnOMrXNTr/view?usp=sharing' },
              { type: 'notes', title: 'Module 3', driveLink: 'https://drive.google.com/file/d/12_Hq2aJ81nbbuj2rdrzOpgVMIIfois8i/view?usp=sharing' },
              { type: 'notes', title: 'Module 4', driveLink: 'https://drive.google.com/file/d/1RDG9rTvDzQgNm2-FsbvA2F6ChGYGyryX/view?usp=sharing' },
            ],
          },
          {
            id: '2024-s3-electronics-lab',
            name: 'Logic Circuit Design',
            code: 'PBECT304',
            isLab: false,
            resources: [
              { type: 'notes', title: 'Module 1', driveLink: 'https://drive.google.com/file/d/1Ch6oSZjB5BM--QSaO14RjwE1A0HLGrXy/view?usp=sharing' },
              { type: 'notes', title: 'Module 2', driveLink: 'https://drive.google.com/file/d/152FkbrA_wChsX11YClkheKYxrsf4w-hm/view?usp=sharing' },
              { type: 'notes', title: 'Module 3', driveLink: 'https://drive.google.com/file/d/1ntNK_RDPQxPbaUWw3UzlBjRqO3FhjMrV/view?usp=sharing' },
              { type: 'notes', title: 'Module 4', driveLink: 'https://drive.google.com/file/d/1mhGplSLfGP_AOF4V4CzIrw3ejHRPbsS4/view?usp=sharing' },
            ],
          },
        ],
      },

      // ── Semester 4 ──────────────────────────────────────────────────────
      {
        semester: 4,
        // subjects: [
        //   {
        //     id: '2024-s4-signals',
        //     name: 'Signals & Systems',
        //     code: 'AET202',
        //     isLab: false,
        //     resources: [],  // Coming Soon
        //   },
        //   {
        //     id: '2024-s4-sensors',
        //     name: 'Sensors & Transducers',
        //     code: 'AET206',
        //     isLab: false,
        //     resources: [],  // Coming Soon
        //   },
        // ],
      },
   
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
//  LEGACY RESOURCES — kept for backward compatibility (forms, guides, etc.)
// ═══════════════════════════════════════════════════════════════════════════

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
