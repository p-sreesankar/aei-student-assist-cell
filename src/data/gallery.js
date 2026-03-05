// ============================================================================
//  GALLERY — Student Assist Cell Photo Gallery
// ============================================================================
//
//  HOW TO ADD A NEW PHOTO:
//  -----------------------
//  1. Upload your image to one of these places:
//     a) The "assets/gallery/" folder in this repo (recommended for small files)
//     b) Google Drive (set sharing to "Anyone with the link") and use the
//        direct link format:
//        https://drive.google.com/uc?export=view&id=YOUR_FILE_ID
//     c) Any public image URL (e.g., Imgur, Google Photos share link)
//
//  2. Copy the block below and paste it at the TOP of the list:
//
//     ---
//     {
//       url:      "assets/gallery/your-image.jpg",
//       caption:  "Description of the photo",
//       eventTag: "event-slug",          ← same as the event id, or null
//       date:     "YYYY-MM-DD",          ← when the photo was taken
//     },
//     ---
//
//  3. Save → git add . → git commit -m "add gallery: caption" → git push
//
//  HOW TO REMOVE A PHOTO:
//  ----------------------
//  Delete the entire { ... }, block for that photo. Save and push.
//  If the image file is in assets/gallery/, delete that file too.
//
//  TIPS:
//  - Keep images under 1 MB each for fast loading (compress with tinypng.com)
//  - Use descriptive captions — they show up in the lightbox and for accessibility
//  - eventTag lets future filtering show photos grouped by event
//
//  FIELD REFERENCE:
//  ┌────────────┬──────────────────┬──────────┬──────────────────────────────────────────┐
//  │ Field      │ Type             │ Required │ Description                              │
//  ├────────────┼──────────────────┼──────────┼──────────────────────────────────────────┤
//  │ url        │ String           │ Yes      │ Image URL or local path in assets/       │
//  │ caption    │ String           │ Yes      │ Short description of the photo           │
//  │ eventTag   │ String or null   │ No       │ Slug linking to an event, or null        │
//  │ date       │ String or null   │ No       │ Date taken (YYYY-MM-DD), or null         │
//  └────────────┴──────────────────┴──────────┴──────────────────────────────────────────┘
//
// ============================================================================

const GALLERY = [

  {
    url:      "assets/gallery/techfest-2025-group.jpg",
    caption:  "TechFest AEI 2025 — Participants and organizers group photo",
    eventTag: "techfest-aei-2025",
    date:     "2025-04-12",
  },

  {
    url:      "assets/gallery/onam-2025-pookalam.jpg",
    caption:  "Onam 2025 — First prize pookalam by S6 AEI students",
    eventTag: "onam-celebration-2025",
    date:     "2025-09-05",
  },

  {
    url:      "assets/gallery/alumni-talk-rohit.jpg",
    caption:  "Alumni Talk — Rohit Menon (Intel) addressing S6 & S8 students",
    eventTag: "alumni-talk-feb-2026",
    date:     "2026-02-14",
  },

  {
    url:      "assets/gallery/lab-inauguration-2025.jpg",
    caption:  "Inauguration of the new IoT Lab by the Principal, Dr. Satheesh Kumar",
    eventTag: null,
    date:     "2025-07-20",
  },

];

export { GALLERY };
