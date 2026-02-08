# North Lantern Group - Website Infrastructure & Environment Guide

> **Last Updated:** February 8, 2026
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

### Vercel (Current - Osaed's Account)

| Field           | Value                                                     |
|-----------------|-----------------------------------------------------------|
| Account Owner   | Osaed (personal account)                                  |
| Project Name    | Web-frontend                                              |
| Default URL     | https://web-frontend-six-chi.vercel.app                   |
| Plan            | Hobby (Free)                                              |
| GitHub Link     | Connected to `North-Lantern-Group/Web-frontend`           |
| Status          | Active - currently serving production                     |

### Vercel (New - Hamza's Account)

| Field           | Value                                                     |
|-----------------|-----------------------------------------------------------|
| Account Owner   | Hamza                                                     |
| Email           | hamza@northlanterngroup.com                               |
| Username        | `hamza-c`                                                 |
| Scope           | `hamza-chundrigars-projects`                              |
| User ID         | `LXk90PTcaSzz15Lp1K65UZRY`                               |
| Plan            | Hobby (Free)                                              |
| Projects        | None yet (pending migration or project import)            |
| CLI Auth        | Authenticated (Vercel CLI v50.13.2)                       |
| Status          | Created, authenticated, awaiting project setup            |

### Other Services

| Service          | Owner/Account        | Purpose                           |
|------------------|----------------------|-----------------------------------|
| Namecheap        | NLG                  | Domain registration & DNS         |
| Google Workspace | NLG                  | Company email (@northlanterngroup.com) |
| Resend           | Osaed (to confirm)   | Transactional email for contact form |
| Google reCAPTCHA | Osaed (to confirm)   | Spam protection on contact form   |
| ZeroBounce       | Osaed (to confirm)   | Email validation before sending   |

---

## Repository

### Details

| Field            | Value                                                     |
|------------------|-----------------------------------------------------------|
| Repository       | `North-Lantern-Group/Web-frontend`                        |
| URL              | https://github.com/North-Lantern-Group/Web-frontend       |
| Visibility       | Public                                                    |
| Default Branch   | `main`                                                    |
| Other Branches   | `dev`                                                     |
| Branch Protection| None (both `main` and `dev` are unprotected)              |
| GitHub Actions   | No workflows configured                                   |
| Repo Secrets     | None stored in GitHub                                     |
| Webhooks         | Vercel integration (via Osaed's GitHub-Vercel connection) |

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
  docs/                    <-- documentation (this file)
  public/
    icons/                 <-- SVG icons (Atlassian, AWS, Azure, GCP, Vercel)
    logo.png               <-- NLG logo
  src/
    app/
      api/contact/
        route.ts           <-- Contact form API endpoint (Resend + ZeroBounce + reCAPTCHA)
      globals.css           <-- Global styles, scroll animations, light/dark mode
      layout.tsx            <-- Root layout (fonts, metadata)
      page.tsx              <-- Main page (~1,400 lines, all sections)
    components/
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

All deployments are managed through Osaed's personal Vercel account. Vercel is connected
to the GitHub repository and auto-deploys on every push.

```
GitHub Push
    |
    v
Vercel (Osaed's Account) auto-builds
    |
    +--> Push to 'main'  --> Production deployment
    |                        URL: web-frontend-six-chi.vercel.app
    |                        Custom: northlanterngroup.com (pending verification)
    |
    +--> Push to 'dev'   --> Preview deployment
    |                        URL: auto-generated per commit
    |                        Custom: test.northlanterngroup.com (DNS configured)
    |
    +--> Any branch/PR   --> Preview deployment
                             URL: auto-generated per commit
```

### Deployment URLs

| Environment | URL                                          | Branch  | Status |
|------------|----------------------------------------------|---------|--------|
| Production | `web-frontend-six-chi.vercel.app`            | `main`  | Live   |
| Production | `northlanterngroup.com`                      | `main`  | DNS pointed to Vercel, served by Osaed's project |
| Production | `www.northlanterngroup.com`                  | `main`  | DNS pointed to Vercel, served by Osaed's project |
| Staging    | `test.northlanterngroup.com`                 | `dev`   | DNS pointed to Vercel, configuration TBD |
| Preview    | `web-frontend-*-osaed-chundrigars-projects.vercel.app` | any | Auto-generated per commit |

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

The website requires 4 environment variables. These are stored in Vercel (not in GitHub)
and are currently configured in Osaed's Vercel project.

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
| `react-google-recaptcha` | reCAPTCHA v2 widget                        |
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

Both `main` and `dev` branches currently point to the same commit (`2e2af4a`). There are
no branch protection rules, meaning anyone with push access can push directly to either branch.

### Recommended Workflow

```
feature/branch --> dev (staging) --> main (production)
                    |                  |
                    v                  v
              test.nlg.com      northlanterngroup.com
```

1. Create a feature branch from `dev`
2. Make changes and push
3. Vercel auto-generates a preview URL for the branch
4. Review on the preview URL
5. Merge to `dev` (deploys to staging)
6. Review on test.northlanterngroup.com
7. Merge `dev` to `main` (deploys to production)

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
| Hamza  | `hamza-c` (hamza@northlanterngroup.com) | Own account (no project yet) |
| Osaed  | Personal account            | Owns the current production deployment |

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

### Google reCAPTCHA v2

- **Purpose:** Prevents spam submissions on the contact form
- **Type:** Checkbox ("I'm not a robot")
- **Implementation:** Client-side widget + server-side token verification
- **Account owner:** Osaed (to be confirmed)

### ZeroBounce

- **Purpose:** Validates email addresses submitted through the contact form
- **Implementation:** Server-side API call before processing the form
- **Account owner:** Osaed (to be confirmed)

---

## Future Migration Plan

There is a planned migration to consolidate all infrastructure under North Lantern Group
company accounts. This is not urgent but is the long-term best practice.

### Goal

Move the Vercel deployment from Osaed's personal account to Hamza's NLG Vercel account
(`hamza@northlanterngroup.com`) so the website infrastructure is a company asset.

### Why

- The deployment infrastructure should be owned by the company, not an individual
- If any team member changes roles, the company infrastructure continues uninterrupted
- Cleaner separation between personal and business resources
- Better audit trail and accountability

### Migration Steps (When Ready)

1. Hamza imports `Web-frontend` repo into his Vercel account (`hamza-c`)
2. Set up the 4 environment variables on the new project
3. Test the new deployment on the auto-generated `.vercel.app` URL
4. Coordinate with Osaed: he releases custom domains from his Vercel project
5. Hamza claims the domains on his Vercel project (30-second switchover)
6. Configure `test.northlanterngroup.com` to deploy from the `dev` branch
7. Osaed removes old project from his personal Vercel account
8. Invite Osaed to the project if/when upgrading to Vercel Pro

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
| Feb 8, 2026    | Hamza  | Added team context, email conventions, working style notes |
| Feb 8, 2026    | Hamza  | Initial creation - full infrastructure audit     |
