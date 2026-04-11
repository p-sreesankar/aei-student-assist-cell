// ============================================================================
//  FACULTY — AEI Association Contact Cards
// ============================================================================
//
//  HOW TO ADD A NEW CONTACT:
//  -------------------------
//  1. Copy the block below and paste it anywhere in the list:
//
//     ---
//     {
//       name:        "Dr./Prof. Full Name",
//       designation: "Their title and role",
//       department:  "Applied Electronics and Instrumentation",
//       email:       "email@cet.ac.in",
//       phone:       "+91-XXXXXXXXXX",       ← or null if not to be displayed
//       photoUrl:    "assets/faculty/name.jpg", ← or null for a placeholder avatar
//       role:        "coordinator",           ← pick: "coordinator", "advisor", "faculty", "student-rep"
//     },
//     ---
//
//  2. Replace placeholder values with actual info.
//  3. Save → git add . → git commit -m "add contact: name" → git push
//
//  HOW TO REMOVE A CONTACT:
//  ------------------------
//  Delete the entire { ... }, block for that person. Save and push.
//
//  PHOTO TIPS:
//  - Place headshot images in  assets/faculty/  (square crop, ~300×300 px)
//  - Or use a Google Drive direct link:
//    https://drive.google.com/uc?export=view&id=YOUR_FILE_ID
//  - If photoUrl is null, the site will show an avatar with the person's initials
//
//  ROLE OPTIONS:
//  - "coordinator"  → Cell coordinator / primary contact (shown first)
//  - "advisor"      → Faculty advisor
//  - "faculty"      → Other faculty members involved
//  - "student-rep"  → Student representatives / volunteers
//
//  FIELD REFERENCE:
//  ┌─────────────┬──────────────────┬──────────┬──────────────────────────────────────────────┐
//  │ Field       │ Type             │ Required │ Description                                  │
//  ├─────────────┼──────────────────┼──────────┼──────────────────────────────────────────────┤
//  │ name        │ String           │ Yes      │ Full name with salutation                    │
//  │ designation │ String           │ Yes      │ Academic title / position                    │
//  │ department  │ String           │ Yes      │ Department name                               │
//  │ email       │ String           │ Yes      │ Official email address                       │
//  │ phone       │ String or null   │ No       │ Phone number with country code, or null      │
//  │ photoUrl    │ String or null   │ No       │ Path to headshot image, or null              │
//  │ role        │ String           │ Yes      │ "coordinator","advisor","faculty","student-rep"│
//  └─────────────┴──────────────────┴──────────┴──────────────────────────────────────────────┘
//
// ============================================================================

const FACULTY = [
  {
    id:          "helen-mary-m-c",
    name:        "Dr. Helen Mary M C",
    designation: "Association Staff Advisor",
    department:  "Applied Electronics and Instrumentation",
    email:       "helenmarymc@cet.ac.in",
    phone:       "9446219621",
    photoUrl:    null,
    role:        "advisor",
  },
  {
    id:          "nanditha-dev",
    name:        "Nanditha Dev",
    designation: "Web Team Lead",
    department:  "Applied Electronics and Instrumentation",
    email:       "2005nanditha@gmail.com",
    phone:       "9847093356",
    photoUrl:    null,
    role:        "student-rep",
  },
  {
    id:          "Mayoogh Manohar",
    name:        "Mayoogh Manohar",
    designation: "Student Representative (S6 AEI)",
    department:  "Applied Electronics and Instrumentation",
    email:       "mayoogh.aei@gmail.com",
    phone:       "+91 8089108682",
    photoUrl:    null,
    role:        "student-rep",
  },

];

export { FACULTY };
