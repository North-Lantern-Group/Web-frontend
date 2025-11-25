# North Lantern Group Website

A high-performance B2B marketing website showcasing North Lantern Group's expertise in Atlassian solutions, Business Intelligence, and Cloud Migration services.

## Features

- **Dark Mode Design**: Unique "Lantern UX" aesthetic with custom NLG color system
- **High Performance**: Optimized for 95+ Google Lighthouse score
- **Responsive**: Mobile-first design with Tailwind CSS
- **Interactive**: Subtle animations and micro-interactions
- **Three Core Services**:
  - Atlassian Solutions (Jira, Workflow Optimization)
  - Business Intelligence (Power BI, Data Warehousing)
  - Cloud Migration (AWS, Azure, Zero-Downtime)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Deployment**: Vercel-ready

## Color System

### Primary Colors (60% usage)
- Navy Foundation: `#1B2838`
- Bright Cyan (Accent): `#00D4FF`
- Pure White: `#FFFFFF`

### Secondary Colors (30% usage)
- Hunter Green: `#355E3B`
- Teal (Data/Analytics): `#00A8A8`
- Light Gray (Backgrounds): `#E5E9ED`
- Charcoal (Body Text): `#3C4852`

### Tertiary Colors (10% usage)
- Deep Navy (Shadows): `#0F1922`
- Pine Green (Charts): `#01796F`
- Emerald (Highlights): `#50C878`
- Coral Orange (Urgent CTAs): `#FF7043`

## Getting Started

### Prerequisites

- Node.js 20+ installed

### Installation

1. Clone the repository:
```bash
git clone https://github.com/North-Lantern-Group/Web-frontend.git
cd Web-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Windows Users

You can use the provided batch files:
- `install.bat` - Install dependencies
- `start.bat` - Start development server

## Project Structure

```
├── src/
│   └── app/
│       ├── globals.css       # Global styles and Tailwind
│       ├── layout.tsx         # Root layout with metadata
│       └── page.tsx           # Main landing page
├── tailwind.config.ts         # Tailwind configuration with NLG colors
├── next.config.ts             # Next.js configuration
└── package.json               # Project dependencies
```

## Deployment

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with zero configuration

Or use the Vercel CLI:
```bash
npm install -g vercel
vercel
```

## Design Philosophy

Inspired by Next.js and Vercel's design aesthetic, this website features:
- Clean, modern typography
- Subtle gradient effects
- Smooth hover animations
- Card-based layouts with hover states
- Professional color palette optimized for B2B

## Contact

For inquiries, use the contact form on the website or email: info@northlantern.com

## License

Copyright © 2024 North Lantern Group. All rights reserved.
