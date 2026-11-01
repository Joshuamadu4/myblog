# Comments setup (Giscus)

Comments are powered by [Giscus](https://giscus.app), which stores every comment
as a reply in your repo's **GitHub Discussions**. No database, no server, free.
Until you complete these steps, each post shows a small "comments aren't set up
yet" note instead of the widget, so nothing breaks.

## One-time setup (~5 minutes)

1. **Push this project to a PUBLIC GitHub repo** (Giscus can only read public repos).
2. **Enable Discussions** on the repo: GitHub → your repo → **Settings → General →
   Features → check "Discussions"**.
3. **Install the Giscus app**: go to <https://github.com/apps/giscus>, click
   **Install**, and grant it access to that repo.
4. **Get your config values**: open <https://giscus.app>, scroll to
   **Configuration**, and enter your repo (`owner/repo`). The page will generate:
   - **Repository ID** (starts with `R_`)
   - a **Discussion Category** (pick one, e.g. "General" or create "Comments")
   - **Category ID** (starts with `DIC_`)
5. **Add the values** either way:

   **Option A: edit the file** `src/lib/comments.ts`:
   ```ts
   export const giscus = {
     repo: process.env.NEXT_PUBLIC_GISCUS_REPO || "your-username/your-repo",
     repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "R_xxxxxxxxxx",
     category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || "General",
     categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || "DIC_xxxxxxxxxx",
   } as const;
   ```

   **Option B: environment variables** (recommended for deploys; add to `.env.local`
   and to your Vercel project settings):
   ```bash
   NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
   NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxx
   NEXT_PUBLIC_GISCUS_CATEGORY=General
   NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxx
   ```
6. **Restart `npm run dev`** (env/config changes are read at build/start). The
   comment box appears at the bottom of every blog post.

## Moderating

- Comments are GitHub Discussions, so moderate them from your repo's **Discussions**
  tab (hide, delete, mark as answer, lock a thread).
- Commenters need a free GitHub account; that keeps spam very low.

## Notes

- The widget auto-matches the reader's light/dark system theme.
- Comments are mapped per post by URL pathname, so each article has its own thread.
