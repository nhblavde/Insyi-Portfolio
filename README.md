# Nurul Insyirah - Portfolio

Animated burgundy & yellow portfolio built with React, Vite and Tailwind CSS.

## Where to edit
All text lives in `src/App.tsx`:
- `ABOUT_TEXT` - About Me paragraphs
- `EDUCATION` - schools, logos, GPA, focus chips
- `CAREER` - write each job description between the quotes (`desc: '...'`)
- `PROJECTS` / `DESCRIPTIONS` - projects
- Achievements list inside `Achievements()`
- `CONTACT` - your real email, phone and GitHub

Images are in `public/` (`profile.jpg`, `umpsa-logo.png`, `kmph-logo.png`, `smkc-logo.jpg`).
Project proof images go in `public/projects/` named `p1-1.jpg`, `p1-2.jpg`, `p2-1.jpg` ...

## Run locally
```
pnpm install
pnpm dev
```

## Publish on GitHub Pages
1. Create a GitHub repository and push this folder to the `main` branch.
2. Repo **Settings -> Pages -> Build and deployment -> Source: GitHub Actions**.
3. Each push to `main` rebuilds and publishes the site automatically.
