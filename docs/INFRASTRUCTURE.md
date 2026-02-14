# North Lantern Group - Website Infrastructure & Environment Guide

> **Last Updated:** February 15, 2026
> **Maintained By:** Hamza Chundrigar
> **Status:** Active

---

## Table of Contents

1. [Overview](#overview)
2. [Account Map](#account-map)
3. [Repository](#repository)
4. [Environments & Deployments](#environments--deployments)
5. [Environment Variables](#environment-variables)
6. [Tech Stack](#tech-stack)
7. [Local Development Setup](#local-development-setup)
8. [Git Workflow](#git-workflow)
9. [Team Access & Permissions](#team-access--permissions)
10. [Domain & DNS Configuration](#domain--dns-configuration)
11. [Third-Party Services](#third-party-services)
12. [Future Migration Plan](#future-migration-plan)
13. [Troubleshooting](#troubleshooting)

> **Brand Guidelines:** See `docs/BRAND-ALIGNMENT.md` for the complete brand-to-code mapping.
> The authoritative source of truth for all branding (fonts, colors, logos) is the
> `NLG-Brand-Guidelines.html` file located in `05 - Marketing & Brand/Brand Assets/`.

---

## Overview

North Lantern Group (NLG) is a professional services and implementation firm specializing in
Atlassian solutions, cloud migrations, and data analytics. This document covers the complete
infrastructure setup for the company website, including all accounts, environments, access
levels, and operational procedures.

The website is a Next.js single-page application deployed on Vercel, with source code hosted
on GitHub under the North-Lantern-Group organization.

---

## Account Map

All services and accounts involved in the website infrastructure:

### GitHub

| Field              | Value                                                  |
|--------------------|--------------------------------------------------------|
| Organization       | `North-Lantern-Group`                                  |
| Org Plan           | Free                                                   |
| Org URL            | https://github.com/North-Lantern-Group                 |
| Billing Email      | osaed.chundrigar@gmail.com                             |
| Hamza's Account    | `HamzaChundrigar` (email: `hamzachundrigar@gmail.com`) |
| Hamza's Org Role   | **Owner** (admin)                                      |
| Osaed's Account    | `OsaedC`                                               |
| Osaed's Org Role   | Member (admin on repos)                                |
| bhatnag8's Account | `bhatnag8`                                             |
| bhatnag8's Role    | Member (admin on repos)                                |

### Vercel

| Field           | Value                                                     |
|-----------------|-----------------------------------------------------------|
| Team            | `north-lantern-group-admins-projects`                     |
| Account Email   | `hello@northlanterngroup.com`                             |
| Username        | `hello-3558`                                              |
| Plan            | Hobby (Free)                                              |
| Project Name    | `web`                                                     |
| Project ID      | `prj_z0qhneFjxBw03iaDFCLzL5VPWLXm`                      |
| Production URL  | https://www.northlanterngroup.com                         |
| GitHub Link     | Connected to `North-Lantern-Group/Web-frontend`           |
| Production Branch | `main`                                                  |
| Node Version    | 24.x                                                      |
| CLI Auth        | Authenticated via `vercel login` (Vercel CLI v50.13.2)    |
| Status          | Active — serving production                               |

> **Note:** Hamza also has a personal Vercel account (`hamza-c` / `hamza@northlanterngroup.com`)
> but the website project is NOT on that account. The shared `hello@northlanterngroup.com`
> account is used for the website.

### Other Services

| Service          | Owner/Account        | Purpose                           |
|------------------|----------------------|-----------------------------------|
| Namecheap        | NLG                  | Domain registration & DNS         |
| Google Workspace | NLG                  | Company email (@northlanterngroup.com) |
| Resend           | Osaed (to confirm)   | Transactional email for contact form |
| Google reCAPTCHA | Osaed (to confirm) — v3 keys (invisible/score-based), updated Feb 9, 2026 | Spam protection on contact form   |
| ZeroBounce       | Osaed (to confirm)   | Email validation before sending   |
| GitHub for Jira  | Hamza (Jira admin + GitHub org owner) — installed Feb 2026, backfill complete | Syncs branches/commits/PRs to Jira ticket Development panels |

---

## Repository

### Details

| Field            | Value                                                     |
|------------------|-----------------------------------------------------------|
| Repository       | `North-Lantern-Group/Web-frontend`                        |
| URL              | https://github.com/North-Lantern-Group/Web-frontend       |
| Visibility       | Public                                                    |
| Default Branch   | `main`                                                    |
| Other Branches   | `dev`, `feature/issue-5-refactor` (both merged into main as of Feb 9, 2026) |
| Branch Protection| None (both `main` and `dev` are unprotected)              |
| GitHub Actions   | No workflows configured                                   |
| Repo Secrets     | None stored in GitHub                                     |
| Webhooks         | 1. Vercel integration (auto-deploy on push) 2. GitHub for Jira (syncs dev activity to Jira tickets) |

### Local Clone Location

```
/Users/hamzachundrigar/Documents/North Lantern Group/
  05 - Marketing & Brand/
    Website/
      Web-frontend/        <-- repo root
```

### File Structure

```
Web-frontend/
  directives/              <-- Task SOPs for AI-assisted development
    refactor-page.md       <-- SOP for component extraction pattern
  docs/                    <-- documentation (this file)
    INFRASTRUCTURE.md
    BRAND-ALIGNMENT.md
    COPY-DECK.md           <-- Editable copy deck for all website text
    COPY-DECK-VISUAL-GUIDE.md <-- Visual wireframes of each section
  public/
    icons/                 <-- SVG icons (Atlassian, AWS, Azure, GCP, Vercel)
    logo.png               <-- NLG logo
  src/
    app/
      api/contact/
        route.ts           <-- Contact form API endpoint (Resend + ZeroBounce + reCAPTCHA v2)
      globals.css           <-- Global styles, scroll animations, light/dark mode
      layout.tsx            <-- Root layout (fonts, metadata)
      page.tsx              <-- Main page (~80 lines, composes section components)
    components/
      layout/
        Header.tsx          <-- Nav bar, mobile menu, logo
      sections/
        Hero.tsx            <-- Hero with dark/light mode backgrounds
        About.tsx           <-- About / mission section
        Services.tsx        <-- Service cards with xarrows diagrams
        WhyNorthLantern.tsx <-- Value propositions
        Stats.tsx           <-- Stat counters
        Testimonials.tsx    <-- Client testimonials
        Pricing.tsx         <-- Pricing tiers
        Contact.tsx         <-- Contact form (form state, reCAPTCHA, validation)
        Footer.tsx          <-- Footer with links and copyright
      CloudBackground.tsx   <-- Animated cloud background (light mode)
      FloatingParticles.tsx <-- Floating cyan particles (dark mode)
      Globe.tsx             <-- Interactive 3D globe using cobe library
      ParticleCompass.tsx   <-- Mouse-following gradient effect (dark mode)
  .env.example              <-- Template for environment variables
  .eslintrc.json
  .gitignore
  CLAUDE.md                 <-- AI assistant context file
  README.md
  next.config.ts
  package.json
  postcss.config.mjs
  tailwind.config.ts        <-- Custom NLG color palette defined here
  tsconfig.json
```

---

## Environments & Deployments

### Current Architecture

All deployments are managed through the shared NLG Vercel account (`hello@northlanterngroup.com`,
team `north-lantern-group-admins-projects`). Vercel is connected to the GitHub repository
and auto-deploys on every push.

```
GitHub Push
    |
    v
Vercel (hello@northlanterngroup.com) auto-builds
    |
    +--> Push to 'main'  --> Production deployment
    |                        URL: www.northlanterngroup.com
    |
    +--> Push to 'dev'   --> Staging deployment
    |                        URL: test.northlanterngroup.com
    |
    +--> Any other branch --> Preview deployment
                              URL: auto-generated per commit
```

### Deployment URLs

| Environment | URL                                          | Branch  | Status |
|------------|----------------------------------------------|---------|--------|
| Production | `www.northlanterngroup.com`                  | `main`  | Live   |
| Production | `northlanterngroup.com`                      | `main`  | Live (redirects to www) |
| Production | `web-three-sand-76.vercel.app`               | `main`  | Vercel default URL |
| Preview    | `web-git-*-north-lantern-group-admins-projects.vercel.app` | any | Auto-generated per commit |

### How to Trigger Deployments

Since Hamza has full push access to the GitHub repo, any git push triggers a Vercel deployment:

```bash
# Deploy to production
git push origin main

# Deploy to staging/preview
git push origin dev

# Any branch push creates a preview
git push origin feature/my-change
```

Preview deployment URLs can be found in:
- GitHub commit status checks (click the green checkmark or red X on any commit)
- GitHub PR comments (Vercel bot posts preview links)

---

## Environment Variables

The website requires 4 environment variables. These are stored in Vercel (not in GitHub) and are configured in the NLG team Vercel project (`hello@northlanterngroup.com`). All 4 variables are set for Production, Preview, and Development environments.

| Variable                         | Type        | Required | Purpose                              |
|----------------------------------|-------------|----------|--------------------------------------|
| `RESEND_API_KEY`                 | Server-side | Yes      | Sends contact form emails via Resend |
| `ZEROBOUNCE_API_KEY`             | Server-side | Yes      | Validates email addresses            |
| `RECAPTCHA_SECRET_KEY`           | Server-side | Yes      | Server-side reCAPTCHA verification   |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Client-side | Yes      | Renders reCAPTCHA widget in browser  |

### Impact When Missing

Without these variables, the website renders and functions normally except:
- The contact form will not submit successfully
- The reCAPTCHA widget will not appear (gracefully handled in code)
- Email validation will be skipped

### Local Development

To run with contact form functionality locally, create a `.env.local` file:

```bash
cp .env.example .env.local
# Then add the 4 variables listed above
```

The `.env.local` file is git-ignored and will not be committed.

---

## Tech Stack

### Core Framework

| Technology    | Version  | Purpose                          |
|---------------|----------|----------------------------------|
| Next.js       | 15.x     | React framework, SSR, API routes |
| React         | 19.x     | UI library                       |
| TypeScript    | 5.9.x    | Type safety                      |
| Tailwind CSS  | 3.x      | Utility-first CSS                |

### Key Dependencies

| Package                  | Purpose                                    |
|--------------------------|--------------------------------------------|
| `cobe`                   | Interactive 3D globe visualization         |
| `lucide-react`           | Icon library                               |
| `react-xarrows`          | SVG connection arrows in service diagrams  |
| `react-google-recaptcha-v3` | reCAPTCHA v3 invisible (score-based)  |
| `react-phone-number-input` | International phone number input         |
| `resend`                 | Email sending API (server-side)            |
| `geist`                  | Vercel's Geist font family                 |

### Development Tools (Global)

| Tool         | Version  | Purpose                          |
|--------------|----------|----------------------------------|
| Node.js      | v22.14.0 | JavaScript runtime (LTS Jod)     |
| npm          | v11.9.0  | Package manager                  |
| Vercel CLI   | v50.13.2 | Vercel deployment management     |
| GitHub CLI   | v2.86.0  | GitHub operations from terminal  |
| TypeScript   | v5.9.3   | TypeScript compiler (global)     |
| ESLint       | v10.0.0  | Code linting (global)            |
| Prettier     | v3.8.1   | Code formatting (global)         |
| nvm          | v0.39.3  | Node version management          |

### Available Node Versions (via nvm)

| Version   | Label          | Status      |
|-----------|----------------|-------------|
| v20.18.3  | LTS Iron       | Available   |
| v22.14.0  | LTS Jod        | **Default** |
| v24.13.0  | LTS Krypton    | Available   |

---

## Local Development Setup

### Prerequisites

- macOS with Homebrew
- Node.js v22+ (via nvm)
- Git
- GitHub CLI (`gh`) authenticated
- Vercel CLI (`vercel`) authenticated

### First-Time Setup

```bash
# 1. Navigate to project
cd "/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend"

# 2. Install dependencies
npm install

# 3. (Optional) Create local env file for contact form testing
cp .env.example .env.local
# Edit .env.local with the required API keys

# 4. Start development server
npm run dev
# Site will be available at http://localhost:3000
```

### Available Scripts

| Command         | Purpose                                |
|-----------------|----------------------------------------|
| `npm run dev`   | Start local development server (port 3000) |
| `npm run build` | Production build                       |
| `npm run start` | Serve production build locally         |
| `npm run lint`  | Run ESLint                             |

### Known Warnings

When running `npm install`, the following deprecation warnings appear. These come from
transitive dependencies and do not affect functionality:

- `inflight@1.0.6` - memory leak warning (dependency of glob)
- `eslint@8.57.1` - version no longer supported (project uses older eslint-config-next)
- `rimraf@3.0.2` / `glob@7.2.3` - older versions

There are also 2 npm audit vulnerabilities (1 moderate, 1 critical) in dev dependencies
that should be addressed in a future update.

---

## Git Workflow

### Current State

As of February 10, 2026, the team uses a staging-based branching strategy. `main` is the
production branch and single source of truth. `dev` serves as the staging/integration branch
where features are combined and tested before release. There are currently no branch protection
rules, meaning anyone with push access can push directly to any branch.

### Current Workflow (Agreed Feb 9, 2026 — Hamza, Arryan, Osaed)

```
feature/WEB-XX  ──PR──▶  dev (staging)  ──PR──▶  main (production)
                            │                        │
                   test.northlanterngroup.com    northlanterngroup.com
```

1. Create a feature branch from `main` (e.g., `feature/WEB-24-recaptcha-v3`)
2. Make changes and push the feature branch
3. Vercel auto-generates a Preview URL for the branch (useful for isolated feature review)
4. Open a PR from feature branch → `dev`
5. Review on `test.northlanterngroup.com` (staging URL for `dev` branch)
6. Merge into `dev` — this combines the feature with any other in-progress features
7. Once an epic's worth of work is validated on `dev`, open a PR from `dev` → `main`
8. Merge to `main` → auto-deploys to production (northlanterngroup.com)
9. **After every merge to `main`**: rebase or fast-forward `dev` to match `main` to prevent drift

> **Why this workflow:** Arryan proposed (and Hamza/Osaed agreed) that individual features
> may work in isolation but could break each other when combined. Using `dev` as staging
> catches these interactions before they reach production. This was documented in WEB-28.
>
> **Key rule:** `dev` must never drift far from `main`. After every release (dev → main merge),
> immediately sync dev back to main's HEAD.

### Git Configuration

The local git config uses:
- **Name:** Hamza Chundrigar
- **Email:** hamzachundrigar@gmail.com

Consider updating the git email per-repo to match the GitHub account:

```bash
cd "/Users/hamzachundrigar/Documents/North Lantern Group/05 - Marketing & Brand/Website/Web-frontend"
git config user.email "hamzachundrigar@gmail.com"
```

---

## Team Access & Permissions

### Team Context

- **Hamza Chundrigar** — CEO of North Lantern Group, project owner
- **Osaed Chundrigar** — Hamza's brother and business partner. Built the initial website.
  Set up the original Vercel deployment, third-party service accounts (Resend, reCAPTCHA,
  ZeroBounce), and DNS configuration.
- **bhatnag8** — Volunteer contributor. Uses a personal email/GitHub account (no NLG email).
  Currently has admin access on repos but should be scoped to Write access if the team
  tightens permissions.

### GitHub Organization Roles

| Person   | GitHub Username   | Org Role | Repo Access | Can Push main? | Can Push dev? |
|----------|-------------------|----------|-------------|----------------|---------------|
| Hamza    | `HamzaChundrigar` | Owner    | Admin       | Yes            | Yes           |
| Osaed    | `OsaedC`          | Member   | Admin       | Yes            | Yes           |
| bhatnag8 | `bhatnag8`        | Member   | Admin       | Yes            | Yes           |

> **Note:** There are currently no branch protection rules on any branch. All three members
> can push directly to `main` (production) and `dev` (staging). Adding branch protection
> rules (requiring PRs, reviews before merging to `main`) is a recommended future improvement.

### Vercel Access

| Person | Vercel Account              | Access Level          |
|--------|-----------------------------|-----------------------|
| Team   | `hello-3558` (hello@northlanterngroup.com) | Owner of `web` project |
| Hamza  | `hamza-c` (hamza@northlanterngroup.com) | Personal account (no website project) |

### Adding a New Developer

To add a new developer (e.g., a volunteer contributor):

1. **GitHub:** Invite them to the `North-Lantern-Group` org as a Member with Write access
   ```bash
   gh api orgs/North-Lantern-Group/invitations -f login="THEIR_GITHUB_USERNAME" -f role="direct_member"
   ```
2. **Vercel:** Not needed on the free plan. They will see preview deployment URLs
   directly in GitHub PR comments and commit statuses.
3. **Access they get:** Push to branches, open PRs, see preview deployments
4. **Access they do NOT get:** Vercel dashboard, environment variables, domain settings

---

## Domain & DNS Configuration

### Domain Registrar

| Field      | Value            |
|------------|------------------|
| Registrar  | Namecheap        |
| Domain     | northlanterngroup.com |

### DNS Records (Current)

| Record                        | Type  | Value                                    | Purpose         |
|-------------------------------|-------|------------------------------------------|-----------------|
| `northlanterngroup.com`       | A     | Points to Vercel                         | Production site |
| `www.northlanterngroup.com`   | CNAME | `ed85f46e41b87460.vercel-dns-017.com`    | Production site |
| `test.northlanterngroup.com`  | CNAME | `ed85f46e41b87460.vercel-dns-017.com`    | Staging site    |

### Email (Google Workspace)

The domain also has MX records configured for Google Workspace:

| Record                    | Type | Value                            |
|---------------------------|------|----------------------------------|
| `northlanterngroup.com`   | MX   | Google Workspace mail servers    |
| `northlanterngroup.com`   | TXT  | SPF record for email auth        |

**Important:** When modifying DNS records, do NOT change MX or TXT records. These control
email delivery for `@northlanterngroup.com` addresses.

---

## Third-Party Services

### Resend (Email Delivery)

- **Purpose:** Sends contact form submission emails
- **Recipients configured in code:**
  - hamza@northlanterngroup.com
  - hello@northlanterngroup.com
  - osaed.chundrigar@gmail.com
- **From address:** Uses a verified domain (configured in Resend dashboard)
- **Account owner:** Osaed (to be confirmed/migrated)

### Google reCAPTCHA v3

- **Purpose:** Prevents spam submissions on the contact form
- **Type:** Invisible / score-based (no visible widget)
- **Implementation:** `react-google-recaptcha-v3` provider on frontend, score verification
  (threshold 0.5) on backend API route. Token generated on form submit with action `contact_form_submit`.
- **Migration:** Migrated from v2 (checkbox) to v3 (invisible) by Osaed on Feb 9, 2026
  (commit 36e6f42, PRs #12 and #13). Old `react-google-recaptcha` package removed.
- **Account owner:** Osaed (to be confirmed/migrated to NLG company account)

### ZeroBounce

- **Purpose:** Validates email addresses submitted through the contact form
- **Implementation:** Server-side API call before processing the form
- **Account owner:** Osaed (to be confirmed)

### GitHub for Jira (GitHub for Atlassian)

- **Purpose:** Syncs development activity (branches, commits, PRs) from GitHub into Jira
  ticket Development panels. One-way data flow: GitHub → Jira. No code is stored in Jira.
- **App:** GitHub for Atlassian (free, from Atlassian Marketplace)
- **Installed on:** northlanterngroup.atlassian.net (Jira Cloud)
- **Connected GitHub Org:** North-Lantern-Group
- **Repository access:** All repos (currently 2: `Web-frontend` and `Captur`)
- **Backfill status:** Finished — historical data from August 14, 2025 onward
- **Permissions:** Full access (read/write on contents + issues/PRs)
- **Setup date:** February 2026
- **Account owner:** Hamza (Jira site admin + GitHub org owner)
- **How linking works:** The app scans branch names, commit messages, and PR titles for
  Jira issue keys (e.g., `WEB-24`). Matching activity appears in the ticket's Development
  panel. Issue keys must be uppercase. Each repo's activity routes to the correct Jira
  project by the issue key prefix (`WEB-XX` → WEB project, `CA-XX` → Captur project).
- **Smart Commits:** Enabled. Developers can add comments (`#comment`), log time
  (`#time`), and transition tickets (`#done`) from commit messages. Requires the
  committer's Git email to match their Jira account email (see email matching table below).
- **Confluence documentation:** Full guide at `Tech Stack + Guides > Development & DevOps >
  GitHub for Jira — Integration Guide for NLG`

#### Email Matching for Smart Commits

Smart Commits only work when the Git committer email matches a Jira account email.
Basic linking (branches, commits, PRs appearing on tickets) works regardless of email match.

| Person | Git Email | Jira Email | Linking Works? | Smart Commits Work? |
|--------|-----------|------------|----------------|---------------------|
| Hamza  | `hamzachundrigar@gmail.com` | `hamza@northlanterngroup.com` | Yes | No — emails don't match |
| Osaed  | `info@northlantern.com` | Unknown (account inactive) | Yes | No — email mismatch + inactive account |
| Arryan (bhatnag8) | Unknown | Unknown | Yes (if issue keys used) | Unknown — needs verification |

**To fix Smart Commits for Hamza:** Either (a) change the per-repo Git email to match
Jira: `git config user.email "hamza@northlanterngroup.com"`, or (b) add
`hamzachundrigar@gmail.com` as a secondary email in the Atlassian account settings.

> **Note:** Osaed's Jira account shows as **inactive** (as of Feb 15, 2026). This may
> be intentional (he may have a second account) or an oversight. His Git commit email
> (`info@northlantern.com`) also does not appear to match any Jira account email.

---

## Future Migration Plan

There is a planned migration to consolidate all infrastructure under North Lantern Group
company accounts. This is not urgent but is the long-term best practice.

### Goal

The Vercel deployment has been migrated from Osaed's personal account to the shared NLG
team account (`hello@northlanterngroup.com`). The remaining migration items are consolidating
third-party service accounts (Resend, reCAPTCHA, ZeroBounce) under NLG company ownership.

### Why

- Vercel deployment is now on a shared company account (completed)
- Third-party service accounts (Resend, reCAPTCHA, ZeroBounce) are still under Osaed's personal accounts and need to be confirmed/migrated
- If any team member changes roles, the company infrastructure continues uninterrupted
- Cleaner separation between personal and business resources
- Better audit trail and accountability

### Completed Steps

1. Created NLG Vercel team (`north-lantern-group-admins-projects`)
2. Imported Web-frontend repo into NLG Vercel project
3. Configured 4 environment variables
4. Custom domains (northlanterngroup.com, www.northlanterngroup.com) serving from NLG project
5. Branch reconciliation -- all branches merged into main (Feb 9, 2026)

### Remaining Steps

1. Confirm ownership of Resend account and migrate to NLG company account if needed
2. Confirm ownership of Google reCAPTCHA admin console (currently under Osaed's Google account)
   - Generate new v3 keys under NLG company Google Workspace account (tracked in WEB-23)
3. Confirm ownership of ZeroBounce account and migrate if needed
4. (Optional) Create `github@northlanterngroup.com` as GitHub org owner

### What Does NOT Change During Migration

- Source code (stays on GitHub, untouched)
- GitHub organization structure
- DNS records (already pointing to Vercel)
- Git workflow

### Potential GitHub Org Consolidation

There is also a consideration to create a `github@northlanterngroup.com` GitHub account
and make it the owner of the `North-Lantern-Group` GitHub organization, so the org itself
is tied to a company identity rather than any individual's personal GitHub account.

This is separate from the Vercel migration and can be done independently at any time.
Current setup (Hamza's personal GitHub as org owner) is functionally correct and follows
GitHub's recommended approach of using Organizations.

---

## Troubleshooting

### Common Issues

**"Module not found" errors after pulling new code**
```bash
rm -rf node_modules && npm install
```

**Port 3000 already in use**
```bash
# Find and kill the process using port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

**Contact form not submitting locally**
- Ensure `.env.local` exists with all 4 environment variables
- Check that API keys are valid and not expired
- Without env vars, the form will fail silently or show an error message

**Vercel CLI not authenticated**
```bash
vercel login
# Follow the browser authorization flow
```

**GitHub CLI not authenticated**
```bash
gh auth login --web
# Follow the browser authorization flow
```

**Build fails on Vercel**
- Check the GitHub commit status (click the X or checkmark icon on the commit)
- Preview deployment URLs show build errors in the page if the build partially succeeded
- Full build logs are only available in the Vercel dashboard (Osaed's account currently)

---

## Important Notes & Conventions

### Email Addresses

| Email | Use |
|-------|-----|
| `hamzachundrigar@gmail.com` | Hamza's personal email, tied to GitHub account |
| `hamza@northlanterngroup.com` | Hamza's NLG company email, tied to Vercel account |
| `hamza@ion8.net` | **NEVER use in any NLG context.** This is a separate work email for an unrelated employer. |

### Repository Naming

The repo is currently named `Web-frontend`. This is slightly inaccurate since it also contains
backend code (API route for contact form). Renaming to `website` has been discussed but is
not urgent. If renamed, the Vercel integration will need to be reconnected.

### Working Style Preferences

- **Hamza wants to understand and approve all changes before they are pushed to any branch.**
  Always explain what a change does and why before committing or pushing.
- **Explain deployment and infrastructure concepts clearly.** Hamza is technically capable
  but not deeply familiar with Vercel, CI/CD pipelines, or deployment workflows.

---

## Document History

| Date           | Author | Change                                          |
|----------------|--------|-------------------------------------------------|
| Feb 15, 2026   | Claude (AI) | Session 5: Added GitHub for Jira integration documentation (Third-Party Services entry, email matching table, webhooks update, Account Map update) |
| Feb 10, 2026   | Claude (AI) | Session 4: Updated workflow to staging-based (feature→dev→main), reCAPTCHA v2→v3 migration, added copy deck docs, updated reCAPTCHA references |
| Feb 9, 2026    | Claude (AI) | Vercel migration complete, branch reconciliation, updated all deployment details |
| Feb 8, 2026    | Hamza  | Added team context, email conventions, working style notes |
| Feb 8, 2026    | Hamza  | Initial creation - full infrastructure audit     |
