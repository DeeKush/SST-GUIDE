# 7-Day MVP Implementation Plan: SST Q&A & Guides

This plan details the daily execution steps to build, seed, and deploy the single-author Scaler School of Technology (SST) Q&A and Guides platform. 

---

## Day 1: Project Foundation

### Features
* Next.js 15 App Router setup using TypeScript and Tailwind CSS.
* Prisma ORM integration mapping to a Supabase PostgreSQL backend.
* Configuration of Shadcn UI component primitives.
* Landing page wireframe shell.

### Database Changes
* None (Initialize Prisma client only).

### Pages
* `/` (Basic homepage skeleton with journey header placeholder).

### Components
* `Layout/Header` and `Layout/Footer` (Vanilla CSS/Tailwind layouts).
* Shadcn UI primitives: `ui/Button`, `ui/Card`, `ui/Input`.

### Risks
* **Supabase Connection Latency**: Prisma connection timeouts during cold starts.
  * *Mitigation*: Configure the Prisma Client connection string with PgBouncer transaction pooling URLs and specify connection timeout overrides inside `.env` (`?connect_timeout=30`).

### Testing Checklist
- [ ] Next.js 15 dev server compiles and runs without console errors.
- [ ] Shadcn components install and render correctly inside testing paths.
- [ ] Confirm local database connection is active via `npx prisma db pull` or equivalent verify commands.

---

## Day 2: Core Data & Seed Setup

### Features
* Deploy base database tables.
* Seed categories and import 50 initial questions and 10 verified answers.

### Database Changes
* Execute database migrations to create `Category`, `Question`, `Answer`, `Guide`, and `LeadRequest` tables.

### Pages
* None.

### Components
* None (Database seeding command scripts).

### Risks
* **Unique Constraint Collisions**: Duplicate slug generation during seed imports of mock questions.
  * *Mitigation*: Add safety indexes inside `prisma/seed.ts` using utility slugifiers that append random suffix strings to identical titles.

### Testing Checklist
- [ ] Verify that database migrations compile and run successfully via `npx prisma migrate dev`.
- [ ] Confirm tables are visible inside the Supabase Database dashboard.
- [ ] Run `npx prisma db seed` and verify that 50 questions and 10 answers are loaded successfully.

---

## Day 3: Dynamic Question Pages (`/questions/[slug]`)

### Features
* Dynamic routing for Q&A threads.
* Server-rendered authoritative answers with markdown parsing.
* Related Questions box showing similar topics from the same category.
* High-conversion referral CTA cards.

### Pages
* `/questions/[slug]` (Dynamic Q&A page).

### Components
* `MarkdownRenderer` (Renders Admin responses cleanly).
* `ReferralCTA` (High-contrast card driving SST registration leads).
* `RelatedQuestions` (Sidebar querying related category links).

### Risks
* **Markdown XSS Risks**: Exploitation vectors from rich text parsed on server components.
  * *Mitigation*: Renders content inside structured, un-editable text boxes or sanitize parsed html strings using safe regex filters.

### Testing Checklist
- [ ] Verify that navigating to `/questions/slug-of-seeded-item` loads the question text, details, and its corresponding answer.
- [ ] Verify that visiting an unanswered question returns a proper "Answer pending review" layout or 404.
- [ ] Confirm related questions list lists other items in the parent category.

---

## Day 4: Ask Question Form & Duplicate Warning

### Features
* Simple form allowing visitors to type and submit questions (stored as `PENDING`).
* Live duplicate question detection accordion triggered as the user types.

### Pages
* `/ask` (Submit questions view).

### Components
* `AskForm` (Form wrapper with simple loading indicators).
* `DuplicateAccordion` (Renders similar questions matching live title inputs).

### Risks
* **Spam Submissions**: Automation scripts flooding the database queue.
  * *Mitigation*: Throttle submissions based on IP parameters or introduce standard hidden honey-pot input fields inside the submission form.

### Testing Checklist
- [ ] Type a question title on `/ask` and confirm matching questions display inside the duplicate warning panel.
- [ ] Submit a question and verify that it is written successfully to the database with a status of `PENDING`.
- [ ] Confirm the new pending question does *not* appear on the public homepage feed.

---

## Day 5: Password-Protected Admin Workspace

### Features
* Single-password admin login screen (`ADMIN_PASSWORD` validation).
* Queue inbox listing pending questions.
* Markdown answer submission interface for the Admin.

### Pages
* `/admin` (Login screen).
* `/admin/dashboard` (Queue inbox and answer creator).

### Components
* `LoginForm` (Submits password to Server Action).
* `ModerationQueue` (Lists pending items).
* `AnswerEditor` (Markdown input field).

### Risks
* **Session Forgery**: Accessing dashboard routes without valid auth tokens.
  * *Mitigation*: Check cookie presence strictly at the Server Component root level, returning immediate redirects.

### Testing Checklist
- [ ] Verify that `/admin/dashboard` redirects to `/admin` if the session cookie is missing.
- [ ] Enter a correct password, verify the session cookie is set, and confirm the dashboard renders.
- [ ] Write an answer to a pending question, click Publish, and verify that the question's status changes to `PUBLISHED` and it is immediately viewable publicly.

---

## Day 6: Guides & Parents Hub

### Features
* Long-form dynamic guide directory.
* Target audience verification page for parents (`/parents`).

### Pages
* `/guides/[slug]` (Renders official admin guides).
* `/parents` (Parent resource hub).

### Components
* `StickyTOC` (Scroll-tracking Table of Contents).
* `ParentFAQAccordion` (Collapsible list of parent-focused questions).

### Risks
* **Layout Shifts**: Large cover images causing document flow shifts on mobile viewports.
  * *Mitigation*: Set explicit layout properties (`aspect-ratio`, height/width rules) on all image templates.

### Testing Checklist
- [ ] Verify that guides load at `/guides/slug-name` and render markdown contents correctly.
- [ ] Confirm the `/parents` page displays trust documents and parent-specific Q&As.
- [ ] Check mobile navigation responsiveness on parents and guide pages.

---

## Day 7: Polish, SEO & Deployment

### Features
* Structured dynamic FAQ Schema JSON-LD metadata markup.
* Dynamic XML Sitemap generation route.
* Multi-platform deployment (Vercel + Supabase).

### Pages
* `/sitemap.xml` (Dynamically pulls database URLs).

### Components
* `FAQSchemaMarkup` (Script tags injected on Q&A pages).

### Risks
* **Cache Stale Rates**: Users seeing outdated content after edits.
  * *Mitigation*: Clear static cache tags (`revalidatePath` and `revalidateTag`) during Answer Publish operations.

### Testing Checklist
- [ ] Verify `sitemap.xml` loads correctly and contains links to active guides and published Q&As.
- [ ] Verify page loading speeds and run final validation checks.
- [ ] Confirm production deployment completes and is live on the custom domain.
