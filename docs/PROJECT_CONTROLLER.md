# Project Controller

Updated: 2026-10-05 (Asia/Bangkok)
Controller task: zub-zero | Project Controller

## Start Here

Backend delivery work started 2026-10-05. See [Backend Delivery Plan](BACKEND_DELIVERY_PLAN.md) for audited gaps, infrastructure options and acceptance gates. Development MySQL and initial migration are verified. Admin authentication is verified on staging; owner bootstrap remains a private human step.

Read this file, AGENTS.md, and PROJECT_BRIEF.md. Then read only the relevant entry in docs/PAGE_COMMANDS.md and its page notes. Use docs/PROJECT_COMMANDS.md for commands; docs/WORK_SUMMARY.md contains historical evidence, not automatic acceptance.

## Authority And Scope

- Current user decisions and AGENTS.md govern work. USA is the visual reference; PROJECT_BRIEF.md and the SEA sitemap govern regional scope and product requirements.
- Never add or render a COVE logo without explicit user authorization. A historical note describing an exception is evidence to review, not blanket authorization.
- English public content; public catalog has no checkout, public prices, or public stock.
- Read relevant node_modules/next/dist/docs guides before changing Next.js code.
- Preserve existing uncommitted work. Claim exact files before edits; shared-file changes require coordination here.
- Commit/push only after an explicit user instruction. Publish relevant changes directly to main; no force push, unrelated staging, or automatic PR.

## Status Rules

Use: queued, active, implemented, verified, accepted, blocked.

Implemented means code exists. Verified requires recorded checks and screenshot/interaction evidence. Accepted requires explicit user approval. Past checks must retain their date and scope; do not imply they were rerun today.

Overall completion percentage: not established. Establish the SEA deliverable list and acceptance criteria first; route counts and generated prompts are not completed-work counts.

## Current Baseline

| Area | Evidence | Next Action |
| --- | --- | --- |
| Refrigeration / Cooking / Outdoor | Numerous route implementations and page notes exist | Audit canonical routes, visual acceptance and product links |
| Lifestyle / Our Story / Owners | Routes and historical visual QA notes exist | Reconcile acceptance, SEA content and remaining interactions |
| Trade Resources / Specifications / Reveal | Routes and dedicated notes exist | Audit data coverage and real downloads |
| Brochure Maker | Product-select implemented; summary says later wizard steps absent | Complete configuration, client details and brochure output |
| Installation Videos | Index implemented; summary says four detail pages absent | Implement linked video detail pages |
| Future Product Updates | Catalog implemented; signup explicitly local-only | Connect real marketing endpoint |
| Continuing Education / KDC | Routes exist; KDC has historical QA | Audit search integration, links and COVE constraint |
| Admin / APIs | Admin uses site-data and placeholder navigation; products API returns site-data | Build authentication, persistence, permissions and management workflows |
| Deployment | Plesk flow exists in command docs; brief mentions Vercel | Confirm current hosting choice before deployment work |

Baseline inspected 2026-10-05; no runtime QA, lint or build was run for this documentation setup.

## Initial Queue

| ID | Priority | Work | Status | Owner / Files |
| --- | --- | --- | --- | --- |
| CTRL-01 | P0 | Reconcile SEA sitemap, canonical routes and user acceptance | queued | Controller |
| CTRL-02 | P0 | Audit public stock exposure in /api/products and public data usage | queued | Unassigned |
| CTRL-03 | P0 | Audit COVE logo usage including composite images; reconcile explicit exceptions | queued | Unassigned |
| TRADE-01 | P1 | Brochure wizard steps 2-4 and real output | queued | Unassigned |
| TRADE-02 | P1 | Four installation-video detail destinations | queued | Unassigned |
| SYS-01 | P1 | Forms, representative lookup, persistence and email integration audit | queued | Unassigned |
| SYS-02 | P1 | Admin auth, roles, product/CMS/CSV/inventory workflows | active | Products chat: catalog verified; stock/CMS/CSV remain queued |
| QA-01 | P2 | Final navigation, responsive, SEO and deployment checks | queued | Unassigned |

Controller decides the next narrow work item with the user. This queue does not authorize external submissions or deployment.

## Dispatch And File Ownership

1. Assign a task ID, route, reference URL, exact file scope and acceptance checks.
2. Record owner and active status before edits. Do not dispatch simultaneous workers on the same shared files.
3. Workers read the short prompt in docs/CONTROLLER_TASK_TEMPLATE.md and only relevant page notes.
4. Workers write their own handoff under docs/handoffs/<TASK-ID>.md. Controller merges status into this queue and central docs after reviewing evidence.
5. Shared Header/Footer/MegaMenu/site-data changes are serialized. Full builds are serialized to avoid output/cache contention.
6. Ask the user before messaging another task unless they already authorized that coordination. Prompts alone do not dispatch work.

## Efficient Verification

- Inspect the reference once per task and record measurements/assets for reuse.
- Fix related layout differences together; avoid unrelated refactors and dependency churn.
- Run focused lint for touched code; run full lint/build for final page delivery, routing/shared changes or publication.
- Compare desktop/mobile at equal viewport sizes; verify links and interactive states, console, images and overflow.
- Report pre-existing failures separately. Never mark a task verified based only on route existence.
- Documentation-only changes require link/content checks, not application builds.

## Handoff Fields

Task ID; route; reference; files changed; implemented behavior; exact checks/results/date; screenshot paths; dependencies; remaining work; user acceptance; commit/push state. Keep each handoff concise and factual.

## SYS-02 auth scope — verified (2026-10-05)

Owner: current chat. Claimed: prisma/schema.prisma, new admin_auth migration, src/lib/auth/*, src/app/admin/*, src/app/api/admin/*, scripts/admin-*.mjs, docs/pages/admin-auth.md. Existing dirty files preserved. Authentication only; CRUD excluded.

Auth evidence and private bootstrap/rollback instructions: [admin-auth](pages/admin-auth.md). Local lint/build and server migration/build passed; live integration results are recorded there. No owner ADMIN, commit/push or public-source changes. Owner bootstrap and acceptance remain pending.

## SYS-02 login appearance — verified locally (2026-10-05)
Owner: current chat. Scope: src/app/admin/login/*, public/assets/admin/sub-zero-login.png, docs/pages/admin-auth.md. User reference: WordPress-style light login with supplied SUB-ZERO logo. Authentication/session policy unchanged. Full lint/build pass; desktop/mobile and password toggle checked. Screenshots and limits recorded in admin-auth.md. Redesign not deployed; owner bootstrap pending; no commit/push.

## SYS-02 temporary web bootstrap — implemented (2026-10-05)
User authorized temporary web setup because SSH is Forbidden. Current chat owns src/lib/auth/setup*, src/app/admin/setup/*, src/app/api/admin/setup/* and src/proxy.ts. Inactive staging-only grant, 30 minutes/five submissions, permanent closure after first ADMIN. No migration, account creation or deployment yet; live setup verification and owner password entry pending. See admin-auth.md.

Live update: setup deployed and grant activated after explicit user confirmation. Server lint/build pass; HTTPS inactive gate/CSRF/session checks pass and live setup form verified. Owner authorization/password entry, first login and closure verification pending. Backup .auth-backups/20261005-websetup; no database reset or commit/push.

Latest: owner screenshot confirms ADMIN login; setup page directly checked as 404. Remember me (optional 30 days, otherwise 8 hours) and latest English cream login design deployed to staging. Duration checks 3/3, auth tests 5/5 and server lint/build pass; live checkbox verified. Owner remembered-login cookie check pending; existing session remains 8 hours. Backup .auth-backups/20261005-remember. No commit/push.

Final cleanup: setup executable sources retired, exact page/API paths permanently 404, DB closure marker present and grant absent. Live disposable-account tests verify 8h/30d cookie and DB expiry plus logout/replay; cleanup complete, owner unchanged. Final server build/local lint/unit checks pass. Backup .auth-backups/20261005-auth-final; full rollback unexercised. No commit/push.

## SYS-02 catalog — verified within scope (2026-10-05)
Owner: products chat. Implemented DB products search/filter/pagination/editor/status/soft-delete/restore, brands/subcategories and validated private image upload/order/alt/removal. Existing requirePage/requireApi reused; ADMIN/STAFF write, ADMIN-only destructive catalog operations, atomic audit and stale-edit protection. Products links work; public products response contract preserved with Active/non-deleted allowlist. Additive indexes only; no stock/CMS/CSV/COVE/public page redesign or commit/push.
Local/server unit 11/11, full lint and builds pass; live HTTPS/MySQL integration 54 checks pass; desktop/mobile UI writes and image reload verified. Staging-only backup plus actual rollback/restored-build drill passes with unchanged catalog/users/sessions. QA data cleaned; real catalog has zero products/brands/categories, owner ADMIN retained. Source details, evidence and limits: [admin-products](pages/admin-products.md).
Release gate remains open: server npm audit reports 25 findings (7 moderate, 17 high, 1 critical), including Next 16.2.9 advisories. Dashboard/public pages still use existing sample data. Image orphan-retention cleanup and database disaster restore are not exercised/automated. No client-ready/accepted claim.