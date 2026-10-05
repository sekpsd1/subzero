# Admin authentication — SYS-02
Updated: 2026-10-05 (Asia/Bangkok). Scope: authentication/access control only.

## Implementation
- Responsive English login at /admin/login. Existing dashboard remains sample data.
- Node crypto scrypt (N=131072, r=8, p=1), random 16-byte salts, constant-time verification. Canonical lowercase email comparison rejects MySQL accent/collation aliases so alternate spellings cannot bypass account throttling. Password policy: 15 characters minimum, 256 bytes maximum; no default password.
- Random 256-bit opaque session token; database stores only HMAC-SHA256 digest keyed by AUTH_SECRET. Absolute expiry: 8 hours; revocation checked on every server request. Roles are joined from User, never trusted from the client.
- HTTPS cookie: __Host-sz-admin, HttpOnly, Secure, SameSite=Lax, Path=/, no Domain. Local HTTP uses sz-admin.
- Server proxy protects all /admin/* and /api/admin/*, with exact login/logout exceptions. Page and API DAL repeat checks; future handlers must call requireApi with explicit roles. Public read APIs remain public.
- All admin mutation requests require exact configured Origin; cross-site Fetch Metadata rejected. This includes login CSRF and logout. No state mutation through GET.
- Database-backed atomic throttling: 5 submitted credential checks/account/15 minutes, plus 60 globally/minute; all attempts including successful login consume counters. Unknown accounts receive the same generic response and scrypt work. Proxy IP headers are not trusted. Expired rate rows removed on login. Global cap can temporarily deny everyone under sustained abuse; add trusted edge throttling later if needed.
- Bounded login body: 4096 bytes, URL-encoded forms only. Service/database/config errors fail closed.
- ADMIN and STAFF can access dashboard/session endpoint. Only ADMIN can revoke all sessions. Logout revokes the session server-side before expiring cookie. LOGIN and REVOKE_ALL_SESSIONS audit entries contain no passwords/tokens.

## Database
Initial migration 20261005000000_initial remains untouched. New additive migration 20261005010000_admin_auth adds AdminSession and AuthRateLimit only. No reset/drop is used.

## Private owner bootstrap
On the staging server, in its application root, use a private SSH terminal with Node 20.20.2 (or compatible newer runtime):
```sh
/opt/plesk/node/20/bin/node scripts/admin-bootstrap.mjs
```
The application root is /var/www/vhosts/szwasia.com/new.subzerowolf-sea.com. Owner enters name/email, then password and confirmation with input hidden. Do not use Plesk's logged command box for password entry, command arguments, environment variables, chat, or a document. Script requires a TTY, normalizes email, hashes before insertion, and creates ADMIN in a serializable transaction. Unique SiteSetting auth:first-admin-created is a permanent closure marker. Existing ADMIN or marker denies repeat setup. No web setup endpoint exists. Deleting an account does not reopen setup when marker exists. Owner password entry and first owner login remain human steps.

AUTH_SECRET must be random and at least 32 characters. Release helper generates 48 random bytes directly into private server .env only when absent; never prints the value. Existing secrets are not rotated. .env remains outside public, mode 0600. Do not commit/download credentials.

## Release and rollback
Auth-only payload contains 18 scoped source/migration/script files; no public source, package files, .env, or initial migration replacement. Deployment restricted by hostname and application-root basename. Normalized content hashes verify payload and existing schema/dashboard/initial migration/app.js/next.config.ts before mutation.
- Private rollback snapshot: .auth-backups/20261005-admin-auth (0700), source .bak files, build.tar.gz and public-next.tar.gz; secrets excluded.
- Run release from application root: node admin-auth-payload/scripts/admin-release.mjs.
- Runs migrate status/deploy, generate, unit tests, server lint, candidate production build in .next-auth-candidate; switches compiled build only on success and requests Passenger restart.
- Rollback: node admin-auth-payload/scripts/admin-release.mjs rollback, then restart app if needed. Retains applied auth migration/tables; restores old source/build and installs an admin-only maintenance guard in app.js so old public dashboard cannot reopen. Public routes use previous build. Do not drop auth tables or reset database.
- Do not run release twice or overwrite the backup. Later releases need a new snapshot identity.
- No Git commit/push performed; staging source is a scoped manual release, not a Git deployment.

## Verification
Local checks on 2026-10-05:
- AGENTS/controller/delivery plan and relevant installed Next 16.2.9 auth/cookies/route-handler/proxy docs read.
- Initial dirty files recorded and preserved.
- Prisma validate/generate pass.
- node --test scripts/admin-auth.test.mjs: 5/5 pass (correct/wrong password, unknown hash, salt randomness, missing secret, role policy, missing/expired/revoked sessions, generated rollback guard including encoded URLs).
- Full ESLint and npm run build pass. Existing AVIF optimization warning remains.
- Actual local HTTP: /admin redirects 307 to login; /api/admin/session and unknown admin API return 401; foreign-origin logout returns 403; same-origin logout without session returns 303.
- Local browser: unauthenticated /admin reaches login; 1440x900 desktop and 390x844 mobile screenshots inspected. Evidence: docs/screenshots/admin-auth-local-desktop.png and admin-auth-local-mobile.png.
- Live staging deployment: initial baseline checks passed; auth migration applied; AUTH_SECRET generated privately; server unit tests and lint passed; candidate build passed and live /admin redirects to login. Initial build hit the known public/_next conflict; static files were moved to a private hold directory for build, with restoration on failure. Rollback archives exist; a full live rollback/restore has not been exercised.

Staging integration command (requires an empty User table, before owner bootstrap only):
```sh
node scripts/admin-auth-integration.mjs
```
Restricted to new.subzerowolf-sea.com and refuses when any users already exist. Uses random in-memory passwords/tokens for disposable test accounts and cleans up those accounts/audit entries/rate counters in finally. Covers wrong-password/login/cookie flags, database role changes, ADMIN-only restrictions, expiry, logout/replay, revocation, CSRF and persistent throttling. It does not create the owner's account.

## References
[OWASP authentication](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html),
[OWASP CSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).



### Live evidence (2026-10-05)
- Staging integration: 19/19 pass with actual MySQL and HTTPS routes: unauthenticated page/API, namespace guard, forged cookie, missing/cross-site Origin, oversized form, bootstrap refusal while ADMIN exists, wrong password, MySQL accent alias, STAFF login, HttpOnly/Secure/SameSite/expiry, dashboard access, ADMIN-only restriction, database role changes, cross-origin logout, expiry, logout/replay, ADMIN revocation and account throttling.
- Browser form submission with an unregistered disposable identity showed the generic invalid-credentials message and cleared password input.
- Live desktop 1440x900 and mobile 390x844 inspected; mobile document width equals 390, no horizontal overflow. Live browser error log empty.
- Screenshots: docs/screenshots/admin-auth-live-desktop.png, admin-auth-live-mobile.png; local equivalents also saved.
- Readiness passes AUTH_SECRET, site URL, real database and User table. migrate status: both migrations applied, schema up to date. Server lint passed. .env mode 0600 verified. Rollback gzip archives list successfully; complete live restore drill remains untested.
- Final DB read: zero users and sessions; no owner setup marker. Owner must still run private bootstrap and confirm first login. Generated test credentials were never printed or persisted in files.
- Plesk Dashboard displayed DATABASE_URL in one browser tool output during inspection. The value was not copied into source, documents or Git. Owner should rotate the development DB password privately; rotation was not performed.
- Only new.subzerowolf-sea.com was deployed. Existing local dirty files preserved; no public source uploaded, COVE logo added, commit or push.

### Login reference redesign — local verification (2026-10-05)
- User supplied a WordPress login screenshot and SUB-ZERO logo. Updated only login UI: light gray background, centered 320px white form, Thai labels/messages, blue submit button and password visibility toggle. Original supplied 142x53 logo copied to public/assets/admin/sub-zero-login.png without alteration.
- Existing server redirect, POST endpoint, validation and 8-hour session remain unchanged. No remember-me, password-reset endpoint or language switch was added; recovery copy directs users to the owner.
- Full lint passes. Production build passes after resolving sandbox write permission for Prisma generation; existing AVIF warning remains.
- Local browser desktop 1440x900 and mobile 390x844 checked. Logo loads (naturalWidth 142); mobile width and scrollWidth both 390. Password toggle switches input to text and back to password.
- Evidence: docs/screenshots/admin-login-reference-desktop.png and admin-login-reference-mobile.png. UI redesign is not deployed; earlier live auth results were not rerun for this UI change. Owner bootstrap still pending. No commit/push.
- Subsequent user revision: login background changed to black; outside-form copy/light link adjusted for contrast. Focused ESLint passes; local browser computed background rgb(0, 0, 0). Evidence: docs/screenshots/admin-login-black-background.png. No deployment or full build rerun for this color-only revision.
- Latest user revision supersedes black: bg-[#eeece4], dark outside-form copy restored. Focused ESLint passes; local computed background rgb(238, 236, 228). Evidence: docs/screenshots/admin-login-cream-background.png. Not deployed; no full build rerun for color-only revision.
- Logo revision: reuse /assets/subzero/sub-zero-logo.svg (SHA256 matches original img-SUB-ZERO/Sub-Zero_(logo).svg), replacing the clipboard asset reference. Display width 180px, natural aspect ratio retained. Focused ESLint passes and local browser confirms image loaded. Evidence: docs/screenshots/admin-login-original-logo.png. Not deployed.
- Latest language revision: all login labels, messages, recovery/session copy and password-toggle accessible labels are English; main lang=en. Existing logo and cream background retained. Focused ESLint and local browser text check pass. Evidence: docs/screenshots/admin-login-english.png. Not deployed; no build rerun for copy-only revision.

### Temporary web bootstrap — implementation (2026-10-05)
- Explicit user authorization replaces the previous terminal-only setup requirement because hosting reports SSH Forbidden. Routes /admin/setup and POST /api/admin/setup are exempt only from session guard, retaining Origin checks and applying their own staging-only bootstrap authorization.
- Inactive by default. src/lib/auth/setup-enable.mjs can issue a single grant on staging only, 30-minute expiration and at most five submissions. Only HMAC digest stored in SiteSetting. Raw authorization code written to .auth-setup-private/authorization.txt (directory 0700, file 0600), outside public; never logged, never placed in URL. Owner reads it privately in Plesk Files and enters code/password directly.
- Form body bounded, server validation and scrypt hashing. Locked grant row, unique permanent closure marker, existing-ADMIN check and atomic account/audit/closure transaction prevent duplicate setup and re-opening. Grant is deleted on success; setup then responds unavailable even if the account is later removed. No schema/migration changes required.
- Focused ESLint and existing auth unit tests 5/5 pass. Production build verification recorded separately; setup-specific live database/expiry/race checks remain pending. No owner account created and no deployment/activation performed yet. Activation through browser tools requires action-time confirmation because it creates a new privileged-account creation channel.
- Remove temporary routes and proxy exemptions after owner creation; retain closure marker. Existing CLI remains closed by same marker. Delete private authorization.txt after successful setup without reading it through agent tools.

### Web setup live handoff (2026-10-05)
- Deployed only five scoped setup/proxy files to new.subzerowolf-sea.com; server baseline proxy SHA256 verified, payload checksum verified. Server ESLint/build pass (existing AVIF warning). No public source or schema/migration changes.
- Backup .auth-backups/20261005-websetup retains previous proxy, compiled .next and public/_next. Rollback from staging root: node .websetup-release.cjs rollback. Full rollback not exercised.
- Actual HTTPS before activation: GET /admin/setup 404, GET /api/admin/session 401, cross-origin POST /api/admin/setup 403, inactive same-origin POST setup 404.
- Enabled one grant (30 minutes/five submissions). Live browser /admin/setup shows Create the first administrator without redirect. Screenshot docs/screenshots/admin-setup-live-ready.png. Authorization stored outside public in .auth-setup-private/authorization.txt mode 0600; owner must open privately in Plesk Files. Agent did not read/download/display token or enter owner password.
- Owner account creation, successful first login and post-success closure verification remain pending owner input. Expiry/concurrency live checks not yet run. No commit/push. Latest login visual redesign remains local; this release changes only setup.
- Owner subsequently supplied screenshot of authenticated /admin displaying ADMIN role. Direct live browser check of /admin/setup returns 404 after that handoff. First login evidenced by owner screenshot; setup page is now unavailable. Database marker and setup POST closure not independently reread in this check. Removing temporary route source/private authorization file remains pending; dashboard still uses sample data.

### Remember me (2026-10-05)
- User requested 30-day remembered login on personal device. Unchecked defaults to 8 hours; only remember=on chooses 30 days. Database expiry and HttpOnly/Secure/SameSite cookie lifetime use same server-selected duration; no client-provided arbitrary lifetime. Logout and revocation remain unchanged. Existing sessions retain original expiry until next login.
- Focused ESLint, duration checks 3/3 and auth unit tests 5/5 pass. Staging scoped release includes crypto, login handler, login page and password-toggle component; backup .auth-backups/20261005-remember. Rollback: node .remember-release.cjs rollback from staging root. No migration or owner password handling. Real remembered login/cookie expiry still requires owner login; not claimed verified by unit tests.
- Server ESLint/build passed; deployed and live unauthenticated browser confirms Remember me checkbox, original SUB-ZERO logo and cream English login page. Screenshot docs/screenshots/admin-remember-live.png. Existing owner session was not revoked or extended. No commit/push.

### Final auth cleanup and live Remember me checks (2026-10-05)
- Actual DB read: ADMIN count 1, permanent first-admin marker present, web-setup grant absent. Owner credentials/account/session not changed.
- Removed four setup source files locally and moved server copies plus inactive authorization.txt to private .auth-backups/20261005-retired-setup for recoverability. No setup code remains in executable source paths. Proxy explicitly returns 404 for both exact setup paths and removes their session-guard exceptions. Permanent DB marker retained.
- Server build passes after excluding stale generated .next types during candidate build; tsconfig restored afterward. Previous source/build/static retained in .auth-backups/20261005-auth-final. No migration/reset/drop. Full restore remains unexercised.
- Live HTTPS test with disposable STAFF credentials generated only in memory: both 8-hour and 30-day logins succeed; cookie Max-Age, HttpOnly/Secure/SameSite, real DB expiry, authorized session, logout DB revocation and replay rejection verified. Removed setup GET and same-origin POST both return 404. Test user/audit/session/account rate counter cleaned up afterward; owner unaffected. No raw passwords/tokens logged.
- Local lint and auth unit tests 5/5 pass. Browser screenshot re-check was blocked by browser client; do not claim a new screenshot. Server HTTPS assertions are the evidence for final setup removal. No commit/push.
