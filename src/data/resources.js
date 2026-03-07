// ============================================================================
//  RESOURCES — Student Assist Cell · Scheme → Semester → Subject → Resources
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
//      // Theory types: "notes" | "formula" | "paper"
//      { type: "notes",   title: "Unit 1-5 Notes",    driveLink: "https://drive.google.com/..." },
//      { type: "formula", title: "Formula Sheet",      driveLink: "https://drive.google.com/..." },
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
      // ── Semester 1 ──────────────────────────────────────────────────────
      {
        semester: 1,
        subjects: [
          {
            id: '2019-s1-maths1',
            name: 'Engineering Mathematics I',
            code: 'MAT101',
            isLab: false,
            resources: [
              // TODO: Replace with real Google Drive links
              { type: 'notes',   title: 'Complete Notes - All Units',     driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'formula', title: 'Formula Sheet',                  driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'paper',   title: '2023 University Question Paper', driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2019-s1-physics',
            name: 'Engineering Physics',
            code: 'PHT100',
            isLab: false,
            resources: [
              { type: 'notes', title: 'Module 1-5 Notes',               driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'paper', title: '2022 Solved Paper',              driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2019-s1-workshop-lab',
            name: 'Engineering Workshop',
            code: 'ESL120',
            isLab: true,
            resources: [
              // TODO: Replace with real YouTube links
              { type: 'video', title: 'Introduction to Workshop Practice', youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
              { type: 'video', title: 'Basic Carpentry Tools & Joints',   youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
            ],
          },
        ],
      },

      // ── Semester 2 ──────────────────────────────────────────────────────
      {
        semester: 2,
        subjects: [
          {
            id: '2019-s2-maths2',
            name: 'Engineering Mathematics II',
            code: 'MAT102',
            isLab: false,
            resources: [
              { type: 'notes',   title: 'Complete Notes - All Modules',  driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'formula', title: 'Formula Sheet',                 driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2019-s2-chemistry',
            name: 'Engineering Chemistry',
            code: 'CYT100',
            isLab: false,
            resources: [
              { type: 'notes', title: 'Module 1-5 Notes', driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2019-s2-programming-lab',
            name: 'Programming Lab',
            code: 'CSL120',
            isLab: true,
            resources: [
              { type: 'video', title: 'Exp 1 - Hello World & Basic I/O',  youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
              { type: 'video', title: 'Exp 2 - Conditionals & Loops',     youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
              { type: 'video', title: 'Exp 3 - Arrays & Functions',        youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
            ],
          },
        ],
      },

      // ── Semester 3 ──────────────────────────────────────────────────────
      {
        semester: 3,
        subjects: [
          {
            id: '2019-s3-maths3',
            name: 'Discrete Mathematics',
            code: 'MAT203',
            isLab: false,
            resources: [
              { type: 'notes',   title: 'Complete Notes',     driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'formula', title: 'Formula Sheet',      driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'paper',   title: '2023 Question Paper', driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2019-s3-data-structures',
            name: 'Data Structures',
            code: 'CST201',
            isLab: false,
            resources: [
              { type: 'notes', title: 'Unit 1-5 Notes',       driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'paper', title: '2022 Solved Paper',     driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'paper', title: '2023 Question Paper',   driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2019-s3-network-theory',
            name: 'Network Theory',
            code: 'AET201',
            isLab: false,
            resources: [],  // Coming Soon
          },
        ],
      },

      // ── Semester 4 ──────────────────────────────────────────────────────
      {
        semester: 4,
        subjects: [
          {
            id: '2019-s4-signals',
            name: 'Signals & Systems',
            code: 'AET202',
            isLab: false,
            resources: [
              { type: 'notes',   title: 'Complete Notes',    driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'formula', title: 'Formula Sheet',     driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2019-s4-analog-circuits',
            name: 'Analog Circuits',
            code: 'AET204',
            isLab: false,
            resources: [
              { type: 'notes', title: 'Module 1-5 Notes', driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2019-s4-mi-lab',
            name: 'Measurements & Instrumentation Lab',
            code: 'AEL202',
            isLab: true,
            resources: [
              { type: 'video', title: 'Exp 1 - CRO Basics',         youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
              { type: 'video', title: 'Exp 2 - Wheatstone Bridge',  youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
            ],
          },
        ],
      },

      // ── Semester 5 ──────────────────────────────────────────────────────
      {
        semester: 5,
        subjects: [
          {
            id: '2019-s5-control-systems',
            name: 'Control Systems',
            code: 'AET301',
            isLab: false,
            resources: [
              { type: 'notes',   title: 'Complete Notes',    driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'formula', title: 'Formula Sheet',     driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'paper',   title: '2023 Question Paper', driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2019-s5-microprocessors',
            name: 'Microprocessors & Microcontrollers',
            code: 'AET303',
            isLab: false,
            resources: [
              { type: 'notes', title: 'Module 1-5 Notes',   driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
        ],
      },

      // ── Semester 6 ──────────────────────────────────────────────────────
      {
        semester: 6,
        subjects: [
          {
            id: '2019-s6-dsp',
            name: 'Digital Signal Processing',
            code: 'AET302',
            isLab: false,
            resources: [
              { type: 'notes',   title: 'Complete Notes',     driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'formula', title: 'Formula Sheet',      driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2019-s6-embedded',
            name: 'Embedded Systems',
            code: 'AET304',
            isLab: false,
            resources: [],  // Coming Soon
          },
          {
            id: '2019-s6-dsp-lab',
            name: 'DSP Lab',
            code: 'AEL302',
            isLab: true,
            resources: [
              { type: 'video', title: 'Exp 1 - MATLAB Basics',       youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
              { type: 'video', title: 'Exp 2 - DFT Implementation',  youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
              { type: 'video', title: 'Exp 3 - FIR Filter Design',   youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
            ],
          },
        ],
      },

      // ── Semester 7 ──────────────────────────────────────────────────────
      {
        semester: 7,
        subjects: [
          {
            id: '2019-s7-biomedical',
            name: 'Biomedical Instrumentation',
            code: 'AET401',
            isLab: false,
            resources: [
              { type: 'notes', title: 'Module 1-5 Notes', driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2019-s7-industrial',
            name: 'Industrial Instrumentation',
            code: 'AET403',
            isLab: false,
            resources: [],  // Coming Soon
          },
        ],
      },

      // ── Semester 8 ──────────────────────────────────────────────────────
      {
        semester: 8,
        subjects: [
          {
            id: '2019-s8-project',
            name: 'Main Project',
            code: 'AET490',
            isLab: false,
            resources: [],  // Coming Soon
          },
        ],
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
        subjects: [
          {
            id: '2024-s1-linear-algebra',
            name: 'Linear Algebra & Calculus',
            code: 'MAT101',
            isLab: false,
            resources: [
              { type: 'notes', title: 'Module 1-5 Notes',         driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'paper', title: '2025 Question Paper',       driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2024-s1-physics',
            name: 'Engineering Physics',
            code: 'PHT110',
            isLab: false,
            resources: [
              { type: 'notes', title: 'Complete Notes', driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2024-s1-programming-lab',
            name: 'Introduction to Computing Lab',
            code: 'CSL110',
            isLab: true,
            resources: [
              { type: 'video', title: 'Exp 1 - Python Basics',         youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
              { type: 'video', title: 'Exp 2 - Functions & Strings',    youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
            ],
          },
        ],
      },

      // ── Semester 2 ──────────────────────────────────────────────────────
      {
        semester: 2,
        subjects: [
          {
            id: '2024-s2-maths2',
            name: 'Vector Calculus & Transforms',
            code: 'MAT102',
            isLab: false,
            resources: [
              { type: 'notes',   title: 'Complete Notes',  driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'formula', title: 'Formula Sheet',   driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2024-s2-chemistry',
            name: 'Engineering Chemistry',
            code: 'CYT110',
            isLab: false,
            resources: [],  // Coming Soon
          },
        ],
      },

      // ── Semester 3 ──────────────────────────────────────────────────────
      {
        semester: 3,
        subjects: [
          {
            id: '2024-s3-circuits',
            name: 'Circuits & Networks',
            code: 'AET201',
            isLab: false,
            resources: [
              { type: 'notes', title: 'Module 1-5 Notes', driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2024-s3-electronics',
            name: 'Electronic Devices & Circuits',
            code: 'AET203',
            isLab: false,
            resources: [
              { type: 'notes', title: 'Complete Notes',         driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
              { type: 'paper', title: '2025 Question Paper',    driveLink: 'https://drive.google.com/file/d/PLACEHOLDER/view' },
            ],
          },
          {
            id: '2024-s3-electronics-lab',
            name: 'Electronics Lab',
            code: 'AEL201',
            isLab: true,
            resources: [
              { type: 'video', title: 'Exp 1 - Diode Characteristics', youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
              { type: 'video', title: 'Exp 2 - BJT Amplifier',        youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
            ],
          },
        ],
      },

      // ── Semester 4 ──────────────────────────────────────────────────────
      {
        semester: 4,
        subjects: [
          {
            id: '2024-s4-signals',
            name: 'Signals & Systems',
            code: 'AET202',
            isLab: false,
            resources: [],  // Coming Soon
          },
          {
            id: '2024-s4-sensors',
            name: 'Sensors & Transducers',
            code: 'AET206',
            isLab: false,
            resources: [],  // Coming Soon
          },
        ],
      },

      // ── Semester 5 ──────────────────────────────────────────────────────
      {
        semester: 5,
        subjects: [
          {
            id: '2024-s5-control',
            name: 'Control Systems Engineering',
            code: 'AET301',
            isLab: false,
            resources: [],  // Coming Soon
          },
        ],
      },

      // ── Semester 6 ──────────────────────────────────────────────────────
      {
        semester: 6,
        subjects: [
          {
            id: '2024-s6-dsp',
            name: 'Digital Signal Processing',
            code: 'AET302',
            isLab: false,
            resources: [],  // Coming Soon
          },
        ],
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
