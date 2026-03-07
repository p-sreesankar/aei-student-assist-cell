import { schemes } from '@data/resources';

/**
 * Extract YouTube video ID from various URL formats and return a thumbnail.
 * Supports: youtube.com/watch?v=, youtu.be/, youtube.com/embed/
 *
 * @param {string} youtubeLink
 * @returns {string} Thumbnail URL (mqdefault = 320×180)
 */
export function getYoutubeThumbnail(youtubeLink) {
  if (!youtubeLink) return '';
  try {
    const url = new URL(youtubeLink);
    let id = '';
    if (url.hostname.includes('youtu.be')) {
      id = url.pathname.slice(1);
    } else {
      id = url.searchParams.get('v') || url.pathname.split('/').pop();
    }
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : '';
  } catch {
    return '';
  }
}

/**
 * Count total subjects across all semesters for a given scheme.
 * @param {string} schemeId
 * @returns {number}
 */
export function getSubjectCount(schemeId) {
  const scheme = schemes.find((s) => s.id === schemeId);
  if (!scheme) return 0;
  return scheme.semesters.reduce((sum, sem) => sum + sem.subjects.length, 0);
}

/**
 * Return semester numbers that have at least one subject.
 * @param {string} schemeId
 * @returns {number[]}
 */
export function getSemestersWithContent(schemeId) {
  const scheme = schemes.find((s) => s.id === schemeId);
  if (!scheme) return [];
  return scheme.semesters
    .filter((sem) => sem.subjects.length > 0)
    .map((sem) => sem.semester);
}
