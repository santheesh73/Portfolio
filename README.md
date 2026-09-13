# SANTHEESH S — Portfolio (Phase 1: Premium Foundation)

Premium light portfolio foundation for **Santheesh S — AI Software Engineer,
Full-Stack Developer, Generative AI Enthusiast**.

Phase 1 establishes the design system, application structure, navigation,
motion, accessibility, and SEO foundations. Content sections (hero, projects,
about, skills, experience, contact) arrive in later phases.

## Stack

- Next.js (App Router) + React + Strict TypeScript
- Tailwind CSS v4 (semantic CSS-variable tokens)
- Motion for React (`motion`)
- Lucide React icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```text
src/
├── app/            # layout, foundation preview page, globals.css, icon.svg
├── components/
│   ├── layout/     # Navbar, Footer, PageContainer
│   ├── ui/         # Button, Badge, Card, Container, SectionHeading
│   └── motion/     # FadeIn, Reveal, Stagger
├── data/           # profile.ts (single source of truth)
├── lib/            # constants.ts, utils.ts (cn)
└── types/          # Profile, Project, Technology, NavigationItem
```

## Quality

```bash
npm run lint
npm run build
```
