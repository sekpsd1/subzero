# Backend Delivery Plan

Updated: 2026-10-05 (Asia/Bangkok)

## Current Evidence

Latest Plesk verification (2026-10-05) supersedes the earlier baseline below:

- Only new.subzerowolf-sea.com changed; production sites untouched.
- Database szwasia_zub_zero_dev was confirmed empty before migration.
- Initial migration 20261005000000_initial applied successfully with prisma migrate deploy.
- Adapter/dotenv installed on server. Readiness passes site URL, real database connection and User table existence.
- Server-only .env outside public stores existing DB credentials and site URL, with permissions 0600. No credentials stored in this repository.
- AUTH_SECRET is configured privately; login/logout, database sessions, role checks, CSRF and throttling are installed on staging. Auth migration is additive. Owner bootstrap and full backup/restore drill remain pending. Backend CRUD is not delivery-ready; see [admin auth](pages/admin-auth.md).
- No owner admin account created; disposable auth test accounts are cleaned up. No public source uploaded or commit/push performed. Staging build refreshed from existing server public source.
- Next: implement sessions and a private admin setup flow, verify access controls, then persistent CRUD.

Earlier pre-setup baseline (superseded by the latest evidence above):

- Public pages and historical visual QA exist; final client acceptance is not reconciled.
- Admin dashboard reads sample site-data; navigation contains placeholder links.
- Prisma schema covers users, products, CMS, inventory, appointments, SEO and audit logs.
- No migrations, seed, authentication or active database environment exist in this checkout.
- Machine has Node/npm; Docker and MySQL commands are unavailable.
- Public products API now uses an explicit field allowlist without stock/reserved and excludes drafts; journal API excludes unpublished posts.
- Prisma 7 MySQL adapter and dotenv installed; runtime connection is lazy through getPrisma().
- scripts/backend-check.mjs checks environment and a real database read without printing credentials.
- npm audit reports 25 vulnerable dependencies, including Next.js critical findings. Review and update before release; do not use audit fix --force.

## Infrastructure Decision

Docker is optional. Prefer a separate development MySQL/MariaDB database on existing Plesk if available. Keep production isolated and backed up. Docker is useful for reproducible local databases only when local/offline development is needed; installing it is not a prerequisite for coding this backend.

Configure DATABASE_URL, AUTH_SECRET (random, at least 32 characters) and NEXT_PUBLIC_SITE_URL in a git-ignored .env or hosting environment. Do not paste credentials into chat. Runtime URL supports mysql and optional ssl=true; unsupported options fail explicitly and need deliberate configuration.

Read-only readiness command: node scripts/backend-check.mjs

Checks on 2026-10-05: full ESLint passed; Prisma Client generation passed. Readiness correctly fails for missing AUTH_SECRET, site URL and database configuration. Database persistence and authentication remain unverified.

## Delivery Order And Acceptance

| Phase | Deliverables | Required Evidence | State |
| --- | --- | --- | --- |
| 1 | Development DB, Prisma adapter, migrations, seed admin | Real connection, schema creation on empty dev DB, backup plan | DB and migrations verified; owner bootstrap pending |
| 2 | Login/logout, sessions, Admin/Staff permissions | Unauthenticated and forbidden access tests, session expiry/revocation | Verified on staging (19 checks); owner bootstrap pending |
| 3 | Products/categories/images/specs, CSV import, soft delete | CRUD persists after reload, import errors reported, public fields restricted | queued |
| 4 | Posts, SEO/AEO, media and publishing | Draft hidden publicly, published content visible, metadata correct | queued |
| 5 | Inventory and audit trail | Atomic changes, reserved quantity constraints, private API authorization | queued |
| 6 | Appointments, newsletter/brochure forms, notifications | Server validation, persistence, mail delivery, abuse controls | queued |
| 7 | Remaining trade flows and final public QA | Brochure output, video destinations, navigation and responsive evidence | queued |
| 8 | Staging/client acceptance and production release | Dependency review, build, backup/restore, deployment, handover guide | queued |

Do not label the project ready for delivery until these checks pass or the client explicitly narrows scope. No meaningful overall percentage is established yet.

## Inputs Still Needed

- Owner private ADMIN password entry and first real login; staging Plesk/MySQL is established.
- Email delivery provider and country-specific recipients.
- Client acceptance scope and intended delivery date.

Continue code work independently where possible. Database migrations, persistence verification and live deployment depend on the actual environment.
