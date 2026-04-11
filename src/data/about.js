// ============================================================================
//  ABOUT — AEI Association About Content
// ============================================================================
//
//  HOW TO EDIT (for non-developers):
//  ---------------------------------
//  1. Update the heading text if needed (the main title for the about section)
//  2. Edit the paragraphs array — each string is a separate paragraph
//  3. To add a paragraph: Add a new line like:  "Your paragraph text here.",
//  4. To remove a paragraph: Delete the entire line
//  5. To add a team photo: Replace null with your photo URL
//
//  After editing, save → git add . → git commit -m "update about content" → git push
//
// ============================================================================

export const ABOUT = {

  heading: "Our Mission",

  paragraphs: [
    "The AEI Association is a dedicated support system for students of the Applied Electronics and Instrumentation (AEI) department at College of Engineering Trivandrum. We exist to bridge the gap between students and the department, ensuring that every student has access to timely information, resources, and a platform to voice their concerns.",

    "Our cell ensures that important notices, event announcements, academic resources, and downloadable materials are made available in one central, easy-to-access location. Whether you're looking for the latest exam schedule, lab manuals, event registrations, or need to submit a grievance, the AEI Association is here to help.",

    "We are committed to creating a transparent, student-friendly environment where communication flows freely and no student feels left behind. Your success and well-being are at the heart of everything we do.",
  ],

  // Optional team photo URL — set to null if you don't have one yet
  teamPhotoUrl: null,  // e.g., "assets/team-photo.jpg" or a Google Drive link

  // ── Timeline Milestones ────────────────────────────────────────────────
  // To HIDE the timeline: set this to an empty array []
  // To ADD a milestone: paste a new { year, title, description } block
  milestones: [
    {
      year: "2019",
      title: "Cell Founded",
      description: "AEI Association established as a bridge between students and department.",
    },
    {
      year: "2021",
      title: "Went Digital",
      description: "Launched online notice board and event listings during COVID-19 remote learning.",
    },
    {
      year: "2023",
      title: "Grievance Portal",
      description: "Introduced anonymous grievance submission through Google Forms integration.",
    },
    {
      year: "2025",
      title: "Website Launched",
      description: "Full-featured website with events, resources, and real-time updates deployed on Vercel.",
    },
  ],

};
