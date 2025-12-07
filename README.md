# Flashcards MVP (Claude Design Implementation)

This project implements the simplified MVP specification delivered in `doc/mvp_simplified_spec.md`. It focuses on the core learning experience for Escola Bom Dia students with a purely frontend stack.

## Tech Stack

- Next.js 14 App Router with TypeScript
- Tailwind CSS design system
- Zustand for client-side state
- Framer Motion for micro-interactions
- localStorage persistence for progress

## Getting Started

```bash
npm install
npm run dev
```

The app is mobile-first and ships with three primary learning routes:

- `/vocabulary` – choose a category and study flashcards
- `/verbs` – verb conjugation drills
- `/progress` – track streaks, mastery, and recent sessions

The docs route `/doc/mvp_simplified_spec` surfaces the original Claude MVP specification for quick reference.

## Data

Vocabulary decks and verbs live in JSON under `data/`. Progress is saved in the browser using local storage, and the Zustand store exposes helpers for recording sessions and resetting state.

## Deployment

The project is optimized for Vercel (Next.js default). Make sure to run `npm run build` before deploying to validate the bundle.
