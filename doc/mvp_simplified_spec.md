# Simplified MVP Specification
## Language Learning Web App - Core Experience Only

**Version:** 1.0 (No Backend)
**Timeline:** 3-4 weeks
**Focus:** Pure learning interface, mobile-first webapp

---

## Table of Contents
1. [Simplified MVP Scope](#simplified-mvp-scope)
2. [Technical Architecture](#technical-architecture)
3. [Features & User Flows](#features--user-flows)
4. [Data Structure (Local Storage)](#data-structure-local-storage)
5. [Screen Architecture](#screen-architecture)
6. [ASCII Mockups](#ascii-mockups)
7. [Development Phases](#development-phases)

---

## Simplified MVP Scope

### What We're Building

A **frontend-only web application** that allows users to:
1. Study vocabulary flashcards across multiple categories
2. Practice verb conjugations with interactive exercises
3. Track their progress locally (browser storage)
4. Experience the core learning interface

### What We're NOT Building (Yet)

- ❌ User authentication (no login/signup)
- ❌ Backend API
- ❌ Database
- ❌ Payment/subscription system
- ❌ Email notifications
- ❌ Admin panel
- ❌ Cloud sync

### Why This Approach?

This allows us to:
- ✅ **Validate the UX** before investing in infrastructure
- ✅ **Iterate quickly** on the learning experience
- ✅ **Demo to stakeholders** with a working prototype
- ✅ **Test with real users** (Escola Bom Dia students)
- ✅ **Later add**: Convex (backend), Clerk (auth), Stripe (payments)

---

## Technical Architecture

### Tech Stack

```
Frontend Framework: Next.js 14+ (App Router)
Styling: Tailwind CSS
Animation: Framer Motion
State Management: Zustand (lightweight)
Data Storage: localStorage + JSON files
Type Safety: TypeScript
Deployment: Vercel (free tier)
```

### Project Structure

```
flashcards-app/
├── app/
│   ├── page.tsx                  # Landing/Home
│   ├── vocabulary/
│   │   ├── page.tsx              # Category selection
│   │   └── [category]/
│   │       └── page.tsx          # Flashcard study
│   ├── verbs/
│   │   └── page.tsx              # Verb conjugation game
│   └── progress/
│       └── page.tsx              # Progress dashboard
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ProgressBar.tsx
│   ├── Flashcard.tsx             # Flashcard with flip animation
│   ├── VerbGame.tsx              # Conjugation game
│   ├── Dashboard.tsx             # Stats display
│   └── Navigation.tsx            # Bottom nav
├── data/
│   ├── vocabulary/
│   │   ├── shopping.json
│   │   ├── pharmacy.json
│   │   ├── directions.json
│   │   └── restaurant.json
│   └── verbs.json                # All verbs + conjugations
├── lib/
│   ├── storage.ts                # localStorage helpers
│   ├── progress.ts               # Progress tracking logic
│   └── shuffle.ts                # Utility functions
├── store/
│   └── useProgressStore.ts       # Zustand store
└── types/
    └── index.ts                  # TypeScript types
```

### Data Flow (Without Backend)

```
User Action
    ↓
React Component
    ↓
Zustand Store (in-memory state)
    ↓
localStorage (persistence)
    ↓
Component Re-renders
```

---

## Features & User Flows

### Core Features

#### 1. Vocabulary Flashcards
- [x] Display Portuguese word (front)
- [x] Flip to reveal English translation (back)
- [x] Navigate: next, previous
- [x] Mark as "Known" or "Needs Review"
- [x] Progress bar for current deck
- [x] Shuffle cards
- [x] Restart deck
- [x] Filter to review-only mode
- [x] Categories: Shopping, Pharmacy, Directions, Restaurant, Airport, Doctor, Hotel, Greetings

#### 2. Verb Conjugation Practice
- [x] Display random: Pronoun + Verb + Tense
- [x] User inputs conjugation
- [x] Check answer (show correct form)
- [x] Visual feedback (correct/incorrect)
- [x] Track attempts
- [x] Next random combination
- [x] 60 verbs with full conjugations

#### 3. Progress Tracking (Local)
- [x] Cards studied today
- [x] Streak counter (consecutive days)
- [x] Cards marked as "known" per category
- [x] Overall progress percentage
- [x] Last study date
- [x] Time spent studying (session-based)

#### 4. UI/UX
- [x] Mobile-first responsive design
- [x] Smooth flip animation
- [x] Bottom navigation (Home, Vocab, Verbs, Progress)
- [x] Dark mode toggle
- [x] Keyboard shortcuts (desktop)
- [x] Touch gestures (mobile)
- [x] Loading states
- [x] Empty states

---

## Data Structure (Local Storage)

### localStorage Schema

```typescript
// localStorage keys
'progress' → UserProgress
'settings' → UserSettings
'streak' → StreakData
```

### TypeScript Types

```typescript
// types/index.ts

export type CardStatus = 'new' | 'known' | 'review';

export interface VocabCard {
  id: string;
  portuguese: string;
  english: string;
  category: string;
}

export interface Verb {
  id: string;
  infinitive: string;
  english: string;
  type: 'ar' | 'er' | 'ir' | 'irregular';
  conjugations: Conjugation[];
}

export interface Conjugation {
  pronoun: 'eu' | 'tu' | 'ele/ela/você' | 'nós' | 'eles/elas/vocês';
  tense: 'presente' | 'futuro' | 'pretérito_perfeito' | 'condicional' | 'imperfeito' | 'pretérito_composto' | 'continuous';
  conjugated: string;
  english?: string;
}

export interface CardProgress {
  cardId: string;
  status: CardStatus;
  reviewCount: number;
  lastReviewed: string; // ISO date
}

export interface UserProgress {
  vocabulary: Record<string, CardProgress>; // cardId -> progress
  verbs: Record<string, number>; // verbId -> times practiced
  totalCardsStudied: number;
  totalVerbsPracticed: number;
  lastStudyDate: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastStudyDate: string;
}

export interface UserSettings {
  darkMode: boolean;
  soundEnabled: boolean;
  studyGoal: number; // cards per day
}

export interface StudySession {
  date: string;
  cardsStudied: number;
  duration: number; // seconds
  type: 'vocab' | 'verb';
}
```

### Sample Data Files

#### data/vocabulary/shopping.json
```json
{
  "category": "shopping",
  "name": "Shopping",
  "icon": "🛒",
  "cards": [
    {
      "id": "shop_001",
      "portuguese": "Quanto custa?",
      "english": "How much does it cost?"
    },
    {
      "id": "shop_002",
      "portuguese": "Muito caro",
      "english": "Too expensive"
    },
    {
      "id": "shop_003",
      "portuguese": "Posso experimentar?",
      "english": "Can I try it on?"
    }
    // ... 57 more cards
  ]
}
```

#### data/verbs.json
```json
{
  "verbs": [
    {
      "id": "verb_001",
      "infinitive": "falar",
      "english": "to speak",
      "type": "ar",
      "conjugations": [
        {
          "pronoun": "eu",
          "tense": "presente",
          "conjugated": "falo",
          "english": "I speak"
        },
        {
          "pronoun": "tu",
          "tense": "presente",
          "conjugated": "falas",
          "english": "you speak"
        }
        // ... all 35 conjugations (5 pronouns × 7 tenses)
      ]
    }
    // ... 59 more verbs
  ]
}
```

---

## Screen Architecture

### Route Structure

```
/ (Home/Dashboard)
    ↓
├── /vocabulary (Category selection)
│   ├── /vocabulary/shopping
│   ├── /vocabulary/pharmacy
│   ├── /vocabulary/directions
│   └── ... (other categories)
│
├── /verbs (Conjugation game)
│
└── /progress (Progress dashboard)
```

### Navigation Pattern

```
Bottom Tab Navigation (always visible):
┌─────────────────────────────┐
│  🏠  📚  🎯  📊             │
│ Home Vocab Verbs Progress   │
└─────────────────────────────┘
```

### User Flow (Simplified)

```
First Visit
    ↓
Landing Page / Dashboard
    ↓
Choose: [Study Vocabulary] or [Practice Verbs]
    ↓
┌─────────────┴─────────────┐
│                           │
Vocabulary                  Verbs
    ↓                           ↓
Select Category         Random Conjugation
    ↓                           ↓
Study Flashcards       Input Answer → Feedback
    ↓                           ↓
Mark Known/Review      Next Conjugation
    ↓                           ↓
Progress Saved         Progress Saved
(localStorage)         (localStorage)
    ↓                           ↓
└─────────────┬─────────────┘
              ↓
    View Progress Dashboard
```

---

## ASCII Mockups

### 1. Home / Dashboard (Mobile)

```
┌─────────────────────────────┐
│  🇵🇹 FlashCards              │
├─────────────────────────────┤
│                             │
│  Welcome back! 👋           │
│                             │
│  🔥 3-Day Streak            │
│  ┌─────────────────────────┐│
│  │  ▓▓▓▓▓▓▓▓▓░░░░░░░  58%  ││
│  │  278 of 480 mastered    ││
│  └─────────────────────────┘│
│                             │
│  📚 Today: 12 cards studied │
│  ⏱️  Total: 18 minutes       │
│                             │
├─────────────────────────────┤
│  Quick Start                │
│                             │
│  ┌─────────────────────────┐│
│  │  📚 Study Vocabulary    ││
│  │                         ││
│  │  8 categories available ││
│  │  278/480 cards mastered ││
│  │                         ││
│  │      [Start →]          ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │  🎯 Practice Verbs      ││
│  │                         ││
│  │  60 verbs • 7 tenses    ││
│  │  42 verbs practiced     ││
│  │                         ││
│  │      [Start →]          ││
│  └─────────────────────────┘│
│                             │
├─────────────────────────────┤
│  🏠  📚  🎯  📊             │
└─────────────────────────────┘
```

### 2. Vocabulary Category Selection

```
┌─────────────────────────────┐
│  📚 Study Vocabulary        │
├─────────────────────────────┤
│                             │
│  Choose a category:         │
│                             │
│  ┌─────────────────────────┐│
│  │  🛒 Shopping            ││
│  │  ▓▓▓▓▓▓▓░░░  70%        ││
│  │  42 of 60 mastered      ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │  💊 Pharmacy            ││
│  │  ▓▓░░░░░░░░  30%        ││
│  │  18 of 60 mastered      ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │  🗺️  Directions          ││
│  │  ░░░░░░░░░░  0%         ││
│  │  0 of 60 • NEW          ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │  🍽️  Restaurant          ││
│  │  ▓▓▓▓▓▓▓▓░░  87%        ││
│  │  52 of 60 mastered      ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │  ✈️  Airport             ││
│  │  ▓▓▓▓░░░░░░  45%        ││
│  │  27 of 60 mastered      ││
│  └─────────────────────────┘│
│                             │
│  [View All ↓]               │
│                             │
├─────────────────────────────┤
│  🏠  📚  🎯  📊             │
└─────────────────────────────┘
```

### 3. Flashcard Study Interface (Front)

```
┌─────────────────────────────┐
│  ← 🛒 Shopping      [⋮]     │
├─────────────────────────────┤
│                             │
│  Card 12 / 60               │
│  ▓▓▓▓░░░░░░░░░░░░░░░░  20%  │
│                             │
│                             │
│  ┌─────────────────────────┐│
││                             ││
││                             ││
││                             ││
││      Quanto custa?          ││
││                             ││
││                             ││
││      [ Tap to flip ]        ││
││                             ││
││                             ││
││                             ││
│  └─────────────────────────┘│
│                             │
│                             │
│  ┌───────────┐ ┌───────────┐│
│  │  ✓ Known  │ │ ↻ Review  ││
│  └───────────┘ └───────────┘│
│                             │
│  [←  Prev]      [Next  →]   │
│                             │
├─────────────────────────────┤
│  🏠  📚  🎯  📊             │
└─────────────────────────────┘
```

### 4. Flashcard Study Interface (Back - Flipped)

```
┌─────────────────────────────┐
│  ← 🛒 Shopping      [⋮]     │
├─────────────────────────────┤
│                             │
│  Card 12 / 60               │
│  ▓▓▓▓░░░░░░░░░░░░░░░░  20%  │
│                             │
│                             │
│  ┌─────────────────────────┐│
││                             ││
││      Quanto custa?          ││
││                             ││
││      ─────────────          ││
││                             ││
││   How much does it cost?   ││
││                             ││
││                             ││
││      [ Tap to flip ]        ││
││                             ││
│  └─────────────────────────┘│
│                             │
│                             │
│  ┌───────────┐ ┌───────────┐│
│  │  ✓ Known  │ │ ↻ Review  ││
│  └───────────┘ └───────────┘│
│                             │
│  [←  Prev]      [Next  →]   │
│                             │
├─────────────────────────────┤
│  🏠  📚  🎯  📊             │
└─────────────────────────────┘
```

### 5. Flashcard Options Menu (Slide-up)

```
┌─────────────────────────────┐
│  ← 🛒 Shopping      [⋮]     │
├─────────────────────────────┤
│                             │
│  Card 12 / 60               │
│  ▓▓▓▓░░░░░░░░░░░░░░░░  20%  │
│                             │
│  ┌─────────────────────────┐│
││      Quanto custa?          ││
││      ─────────────          ││
││   How much does it cost?   ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │  🔀 Shuffle Cards       ││
│  ├─────────────────────────┤│
│  │  ↩️  Restart Deck        ││
│  ├─────────────────────────┤│
│  │  👁️  Review Only Mode    ││
│  ├─────────────────────────┤│
│  │  🔍 Search Cards        ││
│  ├─────────────────────────┤│
│  │  ❌ Cancel              ││
│  └─────────────────────────┘│
│                             │
├─────────────────────────────┤
│  🏠  📚  🎯  📊             │
└─────────────────────────────┘
```

### 6. Verb Conjugation Game

```
┌─────────────────────────────┐
│  ← 🎯 Practice Verbs        │
├─────────────────────────────┤
│                             │
│  Verbs practiced: 8         │
│  Correct: 6  •  Wrong: 2    │
│                             │
│  Conjugate this verb:       │
│                             │
│  ┌─────────────────────────┐│
│  │                         ││
│  │  Pronoun:               ││
│  │  Nós                    ││
│  │                         ││
│  │  Infinitive:            ││
│  │  Falar (to speak)       ││
│  │                         ││
│  │  Tense:                 ││
│  │  Pretérito Perfeito     ││
│  │                         ││
│  └─────────────────────────┘│
│                             │
│  Your answer:               │
│  ┌─────────────────────────┐│
│  │  falámos_              ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │     [Check Answer]      ││
│  └─────────────────────────┘│
│                             │
│  [Hint] [Skip]              │
│                             │
├─────────────────────────────┤
│  🏠  📚  🎯  📊             │
└─────────────────────────────┘
```

### 7. Verb Conjugation - Correct Feedback

```
┌─────────────────────────────┐
│  ← 🎯 Practice Verbs        │
├─────────────────────────────┤
│                             │
│  ┌─────────────────────────┐│
│  │      ✅ Correct!        ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │                         ││
│  │  Nós + Falar            ││
│  │  (Pretérito Perfeito)   ││
│  │                         ││
│  │  ✅ Falámos             ││
│  │                         ││
│  │  Translation:           ││
│  │  "We spoke"             ││
│  │                         ││
│  └─────────────────────────┘│
│                             │
│  Great job! 🎉              │
│                             │
│  ┌───────────┐ ┌───────────┐│
│  │  ✓ Known  │ │ ↻ Review  ││
│  └───────────┘ └───────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │      [Next Verb →]      ││
│  └─────────────────────────┘│
│                             │
├─────────────────────────────┤
│  🏠  📚  🎯  📊             │
└─────────────────────────────┘
```

### 8. Verb Conjugation - Incorrect Feedback

```
┌─────────────────────────────┐
│  ← 🎯 Practice Verbs        │
├─────────────────────────────┤
│                             │
│  ┌─────────────────────────┐│
│  │      ❌ Not quite        ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │                         ││
│  │  Nós + Falar            ││
│  │  (Pretérito Perfeito)   ││
│  │                         ││
│  │  Your answer:           ││
│  │  ❌ falamos             ││
│  │                         ││
│  │  Correct answer:        ││
│  │  ✅ falámos             ││
│  │                         ││
│  │  Note: Past tense needs ││
│  │  accent on the 'a'      ││
│  │                         ││
│  └─────────────────────────┘│
│                             │
│  ┌───────────┐ ┌───────────┐│
│  │  ✓ Known  │ │ ↻ Review  ││
│  └───────────┘ └───────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │      [Next Verb →]      ││
│  └─────────────────────────┘│
│                             │
├─────────────────────────────┤
│  🏠  📚  🎯  📊             │
└─────────────────────────────┘
```

### 9. Progress Dashboard

```
┌─────────────────────────────┐
│  📊 Your Progress           │
├─────────────────────────────┤
│                             │
│  🔥 Streak                  │
│  ┌─────────────────────────┐│
│  │  Current: 3 days        ││
│  │  Longest: 7 days        ││
│  │                         ││
│  │  ┌─┬─┬─┬─┬─┬─┬─┐        ││
│  │  │▓│▓│▓│░│░│░│░│  S M T ││
│  │  └─┴─┴─┴─┴─┴─┴─┘        ││
│  └─────────────────────────┘│
│                             │
│  📚 Vocabulary              │
│  ┌─────────────────────────┐│
│  │  ▓▓▓▓▓▓▓▓▓░░░░░░░  58%  ││
│  │  278 of 480 mastered    ││
│  │                         ││
│  │  By Category:           ││
│  │  🛒 Shopping    70%     ││
│  │  💊 Pharmacy    30%     ││
│  │  🗺️  Directions  0%      ││
│  │  🍽️  Restaurant  87%     ││
│  └─────────────────────────┘│
│                             │
│  🎯 Verbs                   │
│  ┌─────────────────────────┐│
│  │  42 of 60 practiced     ││
│  │  156 total attempts     ││
│  │  82% accuracy           ││
│  └─────────────────────────┘│
│                             │
│  📅 This Week               │
│  ┌─────────────────────────┐│
│  │  84 cards studied       ││
│  │  2h 15m study time      ││
│  │  3 study sessions       ││
│  └─────────────────────────┘│
│                             │
├─────────────────────────────┤
│  🏠  📚  🎯  📊             │
└─────────────────────────────┘
```

### 10. Settings / Preferences

```
┌─────────────────────────────┐
│  ⚙️  Settings                │
├─────────────────────────────┤
│                             │
│  Display                    │
│  ┌─────────────────────────┐│
│  │  Dark mode      [ON]    ││
│  │  Animations     [ON]    ││
│  └─────────────────────────┘│
│                             │
│  Study                      │
│  ┌─────────────────────────┐│
│  │  Daily goal: 20 cards   ││
│  │  [━━━━━━━░░░]  20       ││
│  │                         ││
│  │  Sound effects  [OFF]   ││
│  │  Auto-advance   [OFF]   ││
│  └─────────────────────────┘│
│                             │
│  Data                       │
│  ┌─────────────────────────┐│
│  │  [Export Progress]      ││
│  │  [Reset All Data]       ││
│  └─────────────────────────┘│
│                             │
│  About                      │
│  ┌─────────────────────────┐│
│  │  Version: 1.0.0         ││
│  │  Escola Bom Dia         ││
│  │  [Privacy Policy]       ││
│  └─────────────────────────┘│
│                             │
├─────────────────────────────┤
│  🏠  📚  🎯  📊             │
└─────────────────────────────┘
```

---

## Development Phases

### Phase 1: Foundation (Week 1)

**Setup & Core UI**
- [ ] Initialize Next.js project with TypeScript
- [ ] Install dependencies (Tailwind, Framer Motion, Zustand)
- [ ] Setup project structure (folders, routing)
- [ ] Create design system (colors, typography, spacing)
- [ ] Build UI components (Button, Card, ProgressBar)
- [ ] Implement bottom navigation
- [ ] Setup Zustand store for progress
- [ ] Implement localStorage helpers

**Deliverable**: Basic app shell with navigation and design system

---

### Phase 2: Vocabulary Mode (Week 2)

**Flashcard Features**
- [ ] Create vocabulary JSON files (8 categories × 60 cards)
- [ ] Build category selection page
- [ ] Implement Flashcard component
- [ ] Add flip animation (Framer Motion)
- [ ] Card navigation (next/previous)
- [ ] Mark as Known/Review buttons
- [ ] Progress persistence (localStorage)
- [ ] Shuffle functionality
- [ ] Restart deck
- [ ] Review-only filter
- [ ] Search within deck

**Deliverable**: Fully functional vocabulary study mode

---

### Phase 3: Verb Conjugation (Week 3)

**Verb Game**
- [ ] Create verbs JSON file (60 verbs × 35 conjugations)
- [ ] Build verb game interface
- [ ] Random conjugation generator
- [ ] Input validation (check answer)
- [ ] Feedback UI (correct/incorrect)
- [ ] Progress tracking for verbs
- [ ] Hint system
- [ ] Skip functionality

**Deliverable**: Fully functional verb conjugation game

---

### Phase 4: Progress & Polish (Week 4)

**Dashboard & UX**
- [ ] Build dashboard with stats
- [ ] Implement streak tracking
- [ ] Calculate and display progress percentages
- [ ] Settings page (dark mode, preferences)
- [ ] Empty states (no progress yet)
- [ ] Loading states
- [ ] Error handling
- [ ] Keyboard shortcuts (desktop)
- [ ] Touch gestures (mobile)
- [ ] Performance optimization
- [ ] Responsive design testing
- [ ] User testing & feedback
- [ ] Bug fixes

**Deliverable**: Complete MVP ready for demo/testing

---

## Implementation Details

### localStorage Strategy

```typescript
// lib/storage.ts

const KEYS = {
  PROGRESS: 'flashcards_progress',
  STREAK: 'flashcards_streak',
  SETTINGS: 'flashcards_settings',
  SESSIONS: 'flashcards_sessions'
} as const;

export const storage = {
  getProgress(): UserProgress {
    const data = localStorage.getItem(KEYS.PROGRESS);
    return data ? JSON.parse(data) : initialProgress;
  },

  setProgress(progress: UserProgress): void {
    localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
  },

  getStreak(): StreakData {
    const data = localStorage.getItem(KEYS.STREAK);
    return data ? JSON.parse(data) : initialStreak;
  },

  updateStreak(): void {
    const streak = this.getStreak();
    const today = new Date().toISOString().split('T')[0];
    const lastDate = streak.lastStudyDate;

    if (lastDate === today) return; // Already studied today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastDate === yesterdayStr) {
      // Consecutive day
      streak.currentStreak++;
    } else if (lastDate < yesterdayStr) {
      // Streak broken
      streak.currentStreak = 1;
    }

    streak.longestStreak = Math.max(streak.currentStreak, streak.longestStreak);
    streak.lastStudyDate = today;

    localStorage.setItem(KEYS.STREAK, JSON.stringify(streak));
  },

  exportData(): string {
    return JSON.stringify({
      progress: this.getProgress(),
      streak: this.getStreak(),
      settings: this.getSettings(),
      exportDate: new Date().toISOString()
    }, null, 2);
  },

  resetAll(): void {
    Object.values(KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};
```

### Zustand Store

```typescript
// store/useProgressStore.ts

import { create } from 'zustand';
import { storage } from '@/lib/storage';

interface ProgressStore {
  progress: UserProgress;
  streak: StreakData;

  // Actions
  markCard: (cardId: string, status: CardStatus) => void;
  incrementVerbPractice: (verbId: string) => void;
  updateStreak: () => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: storage.getProgress(),
  streak: storage.getStreak(),

  markCard: (cardId, status) => {
    set(state => {
      const newProgress = { ...state.progress };
      newProgress.vocabulary[cardId] = {
        cardId,
        status,
        reviewCount: (newProgress.vocabulary[cardId]?.reviewCount || 0) + 1,
        lastReviewed: new Date().toISOString()
      };
      newProgress.totalCardsStudied++;

      storage.setProgress(newProgress);
      return { progress: newProgress };
    });
  },

  incrementVerbPractice: (verbId) => {
    set(state => {
      const newProgress = { ...state.progress };
      newProgress.verbs[verbId] = (newProgress.verbs[verbId] || 0) + 1;
      newProgress.totalVerbsPracticed++;

      storage.setProgress(newProgress);
      return { progress: newProgress };
    });
  },

  updateStreak: () => {
    storage.updateStreak();
    set({ streak: storage.getStreak() });
  },

  resetProgress: () => {
    storage.resetAll();
    set({
      progress: storage.getProgress(),
      streak: storage.getStreak()
    });
  }
}));
```

### Flashcard Component

```typescript
// components/Flashcard.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FlashcardProps {
  front: string;
  back: string;
  onFlip?: () => void;
}

export function Flashcard({ front, back, onFlip }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  return (
    <motion.div
      className="flashcard-container"
      onClick={handleFlip}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="flashcard"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className="flashcard-face flashcard-front">
          <p className="text-3xl font-semibold text-center">{front}</p>
          <p className="text-sm text-gray-500 mt-4">Tap to flip</p>
        </div>

        {/* Back */}
        <div className="flashcard-face flashcard-back">
          <p className="text-2xl text-gray-600 text-center">{front}</p>
          <div className="border-t border-gray-300 my-4" />
          <p className="text-3xl font-semibold text-center">{back}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

---

## Next Steps

### Immediate Actions

1. **Repository Setup** (Day 1)
   ```bash
   npx create-next-app@latest flashcards-app --typescript --tailwind --app
   cd flashcards-app
   npm install framer-motion zustand
   git init && git add . && git commit -m "Initial commit"
   ```

2. **Design System** (Days 2-3)
   - Define Tailwind config with Escola Bom Dia colors
   - Create reusable UI components
   - Test on mobile devices

3. **Data Preparation** (Days 4-5)
   - Compile vocabulary lists (480 cards)
   - Compile verb conjugations (60 verbs × 35)
   - Review with native speaker
   - Format as JSON

4. **Development Sprint** (Weeks 2-4)
   - Follow phase plan above
   - Daily standups (if team)
   - User testing every Friday

### Future Backend Integration

When ready to add Convex + Clerk + Stripe:

```
Current (localStorage)  →  Future (Convex)
────────────────────────────────────────────
localStorage            →  Convex database
No auth                 →  Clerk authentication
No backend              →  Convex mutations/queries
Local-only progress     →  Cloud sync
No payments             →  Stripe subscriptions
```

**Migration Strategy:**
1. Add Clerk auth (wrap existing app)
2. Setup Convex schema (match localStorage structure)
3. Create migration utility (localStorage → Convex)
4. Implement Stripe subscription gates
5. Gradually roll out to users

---

## Success Criteria

### Definition of Done (MVP)

- [ ] User can study all 8 vocabulary categories
- [ ] User can practice all 60 verbs
- [ ] Progress persists in localStorage
- [ ] Streak calculation works correctly
- [ ] App loads in < 2 seconds on 4G
- [ ] Works on iOS Safari and Android Chrome
- [ ] No critical bugs
- [ ] Passes internal QA
- [ ] Tested with 5+ real users
- [ ] Responsive on mobile (375px) to desktop (1920px)

### User Acceptance Criteria

- "I can easily flip cards and navigate"
- "I understand my progress at a glance"
- "The app feels fast and smooth"
- "I know when I've studied and when I haven't"
- "The verb game is challenging but fair"

---

## Risk Mitigation

### Technical Risks

| Risk | Mitigation |
|------|------------|
| localStorage limits (5-10MB) | Monitor size, paginate data if needed |
| Data loss (user clears browser) | Export feature + future cloud sync |
| Animation performance on old phones | Conditional rendering, reduce motion |
| Responsive design issues | Mobile-first approach, test early |

### UX Risks

| Risk | Mitigation |
|------|------------|
| Users don't understand verb game | Add tutorial/walkthrough |
| Flashcards too simple/boring | Add delight details (animations, celebrations) |
| Progress not motivating enough | Iterate based on user feedback |

---

## Appendix: File Checklist

### JSON Data Files to Create

```
data/vocabulary/
├── shopping.json (60 cards)
├── pharmacy.json (60 cards)
├── directions.json (60 cards)
├── restaurant.json (60 cards)
├── airport.json (60 cards)
├── doctor.json (60 cards)
├── hotel.json (60 cards)
└── greetings.json (60 cards)

data/
└── verbs.json (60 verbs × 35 conjugations = 2100 entries)
```

### Component Checklist

```
components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ProgressBar.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── Flashcard.tsx
├── VerbGame.tsx
├── CategoryCard.tsx
├── ProgressDashboard.tsx
├── StreakDisplay.tsx
└── BottomNav.tsx
```

---

**End of Simplified MVP Specification**

**Ready to build?** This spec is implementation-ready with clear phases, mockups, and code examples. The 3-4 week timeline is realistic for a focused developer or small team. Once the UX is validated, adding Convex, Clerk, and Stripe will be straightforward.
