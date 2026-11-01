/**
 * Giscus (GitHub Discussions) configuration for post comments.
 *
 * ▶ Fill in the four values below once (see COMMENTS_SETUP.md for the step-by-step).
 *   You can either edit this file directly, or set the matching
 *   NEXT_PUBLIC_GISCUS_* environment variables (env wins if both are set).
 *
 * Until `repoId` and `categoryId` are filled in, the comments section shows a
 * small "not configured yet" placeholder instead of the widget, and nothing breaks.
 */

export const giscus = {
  /** "owner/repo", the PUBLIC GitHub repo that stores the discussions. */
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO || "",
  /** Repo ID from giscus.app (starts with "R_"). */
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "",
  /** Discussion category name, e.g. "General" or "Comments". */
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "General",
  /** Category ID from giscus.app (starts with "DIC_"). */
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "",
} as const;

/** True once the values that can't be guessed are present. */
export function giscusConfigured(): boolean {
  return Boolean(giscus.repo && giscus.repoId && giscus.categoryId);
}
