// ============================================================================
//  SITE CONFIGURATION — Student Assist Cell
// ============================================================================
//
//  HOW TO EDIT (for non-developers):
//  ---------------------------------
//  This file controls global settings for the entire website.
//  You only need to change the values inside the quotes ("...").
//
//  • To change the tagline:   Find "tagline" below → replace the text in quotes.
//  • To change social links:  Find the "socialLinks" section → update the URLs.
//  • To swap the Google Form: Replace the URL next to "grievanceFormUrl".
//  • To change theme colors:  Update the hex codes (#XXXXXX) in "themeColors".
//
//  RULES:
//  1. Don't delete any commas, curly braces {}, or square brackets [].
//  2. Every text value must be wrapped in quotes: "like this"
//  3. Lines starting with // are comments — they are ignored by the browser.
//  4. After editing, save the file → git add . → git commit -m "update config" → git push
//
// ============================================================================

const SITE_CONFIG = {

  // ---------- Basic Info ----------

  siteName: "Student Assist Cell",                          // [Required] Name shown in header & browser tab
  departmentName: "Applied Electronics and Instrumentation",// [Required] Full department name
  departmentShort: "AEI",                                   // [Required] Short code used in headings
  collegeName: "College of Engineering Trivandrum",          // [Required] Full college name
  collegeShort: "CET",                                      // [Required] Short code
  tagline: "Your one-stop hub for notices, events, resources & support", // [Required] Hero subtitle text

  // ---------- Footer ----------

  footerText: "© 2026 Student Assist Cell — AEI, CET. All rights reserved.", // [Required] Footer copyright line

  // ---------- Grievance Form ----------
  // Replace this with your own Google Form embed URL.
  // To get it: Open Google Forms → click "Send" → click the embed icon (<>) → copy the URL from the src="..." part.

  grievanceFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe_EXAMPLE_REPLACE_THIS/viewform?embedded=true", // [Required]

  // ---------- Social Links ----------
  // Set a link to "" (empty quotes) to hide that icon on the site.

  socialLinks: {
    instagram: "https://www.instagram.com/aei_cet/",        // [Optional] Instagram page URL
    linkedin:  "https://www.linkedin.com/company/aei-cet/", // [Optional] LinkedIn page URL
    youtube:   "",                                           // [Optional] YouTube channel URL
    email:     "mailto:studentassistcell.aei@cet.ac.in",    // [Optional] General contact email (keep mailto: prefix)
    website:   "https://www.cet.ac.in",                     // [Optional] College or dept website
  },

  // ---------- Theme Colors ----------
  // These control the site's color scheme. Use hex codes (#RRGGBB).
  // Tip: Pick colors from your college logo or identity guidelines.

  themeColors: {
    primary:    "#1A73E8",   // [Required] Main brand color — buttons, headings, links (CET blue)
    secondary:  "#FF6F00",   // [Required] Accent color — highlights, badges, hover states (warm amber)
    background: "#FAFAFA",   // [Required] Page background
    surface:    "#FFFFFF",   // [Required] Card/panel background
    textDark:   "#212121",   // [Required] Primary text color
    textLight:  "#FAFAFA",   // [Required] Text on colored backgrounds
    muted:      "#757575",   // [Required] Secondary/muted text (dates, captions)
  },

  // ---------- SEO / Meta ----------

  metaDescription: "Student Assist Cell — AEI Department, College of Engineering Trivandrum. Notices, events, resources, grievance portal and more for AEI students.", // [Required]
  ogImage: "assets/og-image.png", // [Optional] Social sharing preview image (1200×630 px recommended)
};

export { SITE_CONFIG };
