# 💌 Valentine's Day Proposal Website

A sleek, modern Valentine's Day proposal website built with Next.js and Tailwind CSS. Disguised as a casual RSVP form, it transitions into a dramatic Valentine's proposal with a playful rejection loop.

## Features

- **Disguised RSVP Form** — Casual, neutral-looking form (no hearts!) that collects name, email, major, year, phone, and a fun fact
- **"Look forward to Saturday"** — Subtle hint appears after selecting your year
- **Loading Transition** — Fake "page 2" form blurred in the background with a loading spinner, then a dramatic blackout
- **Proposal Popup** — Slowly fades in on a black screen: *"[Name], will you be my Valentine?"*
- **Rejection Loop** — The No button runs away, shrinks, and cycles through 10 humorous rejection messages
- **Confetti Celebration** — Full-screen confetti burst and "Yay!!" celebration on acceptance
- **Optimized Animations** — Pure CSS animations throughout (no JS animation libraries on hot paths) for smooth 60fps
- **Responsive** — Works great on mobile, tablet, and desktop

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deploy to GitHub Pages

1. Push this code to a GitHub repository
2. Go to **Settings → Pages** and set source to **GitHub Actions**
3. The site will auto-deploy on every push to `main`

## Tech Stack

- Next.js 14 (Static Export)
- React 18
- TypeScript
- Tailwind CSS
- canvas-confetti
