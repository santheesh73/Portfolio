# SANTHEESH S — Portfolio

Personal portfolio for **Santheesh S — AI Software Engineer, Full-Stack
Developer, Generative AI Enthusiast**.

Single-page Next.js site: Hero → Projects → About → Technical Stack →
Proof of Work → Contact, in a premium light theme with strict TypeScript,
server components, and reduced-motion-aware animation.

## Stack

- Next.js (App Router) + React + Strict TypeScript
- Tailwind CSS v4 (semantic CSS-variable tokens)
- Motion for React (`motion`)
- Lucide React icons

## Local development

```bash
npm  install
npm  run  dev
```


## Production

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

Deploys as a standard Next.js app (e.g. connect the repo on Vercel —
no environment variables required). The canonical site URL lives in
`src/lib/constants.ts` (`SITE_URL`) and feeds metadata, sitemap, and
robots.

## Structure

```text
src/
├── app/            # layout, page, globals.css, icon.svg, not-found, error,
│                   # opengraph-image, sitemap, robots
├── components/
│   ├── layout/     # Navbar, Footer
│   ├── home/       # Hero + HeroVisual
│   ├── projects/   # ProjectsSection, FeaturedProject, ProjectCard
│   ├── about/      # AboutSection, EngineeringPrinciples, EducationCard
│   ├── skills/     # SkillsSection, SkillGroup, SkillCard
│   ├── proof/      # ProofSection, ProofTimeline, ProofCard
│   ├── contact/    # ContactSection, CopyEmailButton (client island)
│   ├── ui/         # Button, Badge, Card, Container, SectionHeading
│   └── motion/     # FadeIn, Reveal, Stagger (reduced-motion aware)
├── data/           # profile, projects, about, skills, proof
├── lib/            # constants.ts, utils.ts (cn)
└── types/          # Profile, Project, Skill*, Proof* models
```
