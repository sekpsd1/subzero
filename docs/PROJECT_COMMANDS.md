# Project Commands

Use this file when starting a new work session or doing whole-project checks.

## Fast Start

```powershell
npm run dev
```

If PowerShell blocks `npm.ps1`, use:

```powershell
npm.cmd run dev
```

Open:

```text
http://localhost:3000
```

Use this for local visual work. Keep the dev server running while editing page UI.

## Daily Checks

Run lint after normal edits:

```powershell
npm run lint
```

PowerShell-safe:

```powershell
npm.cmd run lint
```

Run build before deploy, after route changes, after shared component changes, or after changes involving Next.js metadata/routing:

```powershell
npm run build
```

PowerShell-safe:

```powershell
npm.cmd run build
```

Run both when finishing a meaningful page section:

```powershell
npm run lint
npm run build
```

## Dependency And Prisma

Install dependencies only when needed:

```powershell
npm install
```

This runs `prisma generate` through `postinstall`.

Generate Prisma client manually after schema changes:

```powershell
npx prisma generate
```

Inspect schema:

```powershell
npx prisma validate
```

Do not run migrations casually until the final database provider and migration flow are confirmed.

## Plesk Build Flow

On Plesk after pulling code:

```powershell
npm install
npm run build
```

Then restart the Node.js app in Plesk.

Important:

- Startup file is `app.js`.
- `.htaccess` must stay free of rewrite fallback rules.
- `npm run build` automatically:
  - runs `scripts/clean-plesk-assets.mjs` before build
  - runs `prisma generate`
  - runs `next build`
  - copies `.next/static` into `public/_next/static` after build

If build fails on Windows with `EPERM` while deleting `public/_next` or regenerating `node_modules/.prisma/client`, stop the dev server and retry. If it still fails, it is usually a filesystem permission/lock issue rather than page code.

## Fast Work Rules

- If the user names one page, read only:
  - that route file in `src/app`
  - the page component it imports
  - shared components touched by that page
  - this page command file and relevant notes
- Do not read all of `บันทึก.md` unless the task asks for history. It is long. Prefer `docs/WORK_SUMMARY.md` first.
- Do not run `npm install` unless dependencies changed or `node_modules` is missing.
- Do not run `npm run build` after every tiny spacing change while iterating. Use browser checks and lint, then build once at the end.
- Do not change shared components for a page-specific visual request unless the shared behavior is the actual bug.
- Before changing any Next.js-specific API, routing, metadata, server component, route handler, or config behavior, read the relevant local docs in:

```text
node_modules/next/dist/docs/
```

## Browser Reference Workflow

Use this when a task provides a live reference URL and a local URL.

Recommended Browser plugin settings:

- Approval: Always allow
- Annotation screenshots: Always include
- Enable full CDP access: on
- Add site permission for the reference domain

Fast visual workflow:

1. Open the reference URL and local URL in Browser.
2. Capture desktop screenshots first.
3. Inspect only the section currently being implemented.
4. Compare structure, spacing, typography scale, image choices, sticky/scroll behavior, and mobile breakpoints.
5. Implement using existing local page patterns.
6. Re-check the changed local section in Browser.
7. Stop visual tuning once the page is close enough for the current pass; avoid repeated pixel loops.

Use Browser/CDP for visual and interaction work because it reduces guessing. Do not use it to replace code reading when changing routing, metadata, APIs, or shared components.

## Useful Discovery Commands

List routes:

```powershell
Get-ChildItem src\app -Recurse -Filter page.tsx
```

Find text:

```powershell
rg "search text" src
```

List files:

```powershell
rg --files
```

Check git state:

```powershell
git status --short
```

Find changed files:

```powershell
git diff --name-only
```

Review one file diff:

```powershell
git diff -- src\components\ProductPages\WineStoragePage.tsx
```

## Current Core Files

- Project brief: `PROJECT_BRIEF.md`
- Running notes: `บันทึก.md`
- Work summary: `docs/WORK_SUMMARY.md`
- Page commands: `docs/PAGE_COMMANDS.md`
- Package scripts: `package.json`
- Prisma schema: `prisma/schema.prisma`
- Navigation/content seed: `src/lib/site-data.ts`
- Global styles: `src/app/globals.css`
- Root layout: `src/app/layout.tsx`
- App server entry for Plesk: `app.js`

## Definition Of Done

For a page-only visual task:

- Target page works at desktop and mobile sizes.
- No unwanted changes to header, menu, footer, or other pages.
- `npm run lint` passes.
- `npm run build` passes before handing off or deploy.

For shared system work:

- Related routes still render.
- Data model/API behavior is documented.
- Build passes.
- Existing user changes are not reverted.

## Brochure Maker Select Products

Run and open the page:

```powershell
npm.cmd run dev
```

```text
http://127.0.0.1:3000/trade-resources/brochure-maker/product-select
```

Validation used for this route:

```powershell
npm.cmd run lint -- --no-cache
npm.cmd run build
```

The production build requires write access to `node_modules/.prisma` during `prisma generate`.
