# UGA Dynasty Builder — Setup Guide & Codebase Tour

## What This App Is

UGA Dynasty Builder is a personal learning game disguised as a Georgia football dynasty/recruiting simulator. It teaches SQL, JSON, JavaScript/TypeScript, and prompt engineering by translating every concept into three contexts:

1. **Football recruiting** (fun / relatable)
2. **PE Copilot** (side project application)
3. **Carvana EHS** (day job application)

Your progress (XP, streak, completed drills, etc.) syncs across devices via Supabase.

---

## Step 1: Install Prerequisites

You need **Node.js** installed on your Mac. If you don't have it:

```bash
# Check if Node is installed
node --version

# If not installed, go to https://nodejs.org and download the LTS version
# Or install via Homebrew:
brew install node
```

---

## Step 2: Set Up Supabase (Free)

Supabase is the cloud database that stores your progress across devices.

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account (GitHub login works great)
3. Click **"New Project"**
4. Name it something like `dynasty-builder`
5. Set a database password (save it somewhere)
6. Choose the **closest region** (US East for Atlanta)
7. Click **"Create new project"** and wait ~2 minutes

### Get Your API Keys

1. In your Supabase project, go to **Settings → API** (left sidebar)
2. Copy these two values:
   - **Project URL** — looks like `https://abc123.supabase.co`
   - **anon / public key** — a long string starting with `eyJ...`

### Create the Database Table

1. Go to **SQL Editor** in the left sidebar
2. Click **"New Query"**
3. Paste the **entire contents** of `supabase-schema.sql` (in the project root)
4. Click **"Run"**
5. You should see "Success" — the `user_progress` table is now created

### Enable Email Auth (Magic Link)

1. Go to **Authentication → Providers** in the sidebar
2. Make sure **Email** is enabled
3. Under Email settings, **enable "Confirm email"** if not already on
4. That's it — magic link auth is enabled by default

---

## Step 3: Configure the App

1. In the project root, copy the example env file:

```bash
cp .env.example .env
```

2. Open `.env` and paste your Supabase values:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-key-here
```

---

## Step 4: Install Dependencies & Run

```bash
# Navigate to the project folder
cd uga-dynasty-builder

# Install all packages
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173`. Enter your email on the login screen, check your inbox for the magic link, click it, and you're in!

### Access on iPad / iPhone

While `npm run dev` is running on your Mac:

1. Find your Mac's local IP: **System Settings → Wi-Fi → click your network → IP Address** (looks like `192.168.1.xxx`)
2. On your iPad/iPhone, open Safari and go to: `http://192.168.1.xxx:5173`
3. Make sure your devices are on the same Wi-Fi network

For Vite to serve to other devices, you may need to start with:
```bash
npm run dev -- --host
```

---

## How to Deploy (Optional)

To access from anywhere (not just your local network):

### Option A: Netlify (Easiest)
1. Push code to GitHub
2. Go to [https://netlify.com](https://netlify.com)
3. Connect your GitHub repo
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Add environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)

### Option B: Build Locally
```bash
npm run build
# The 'dist' folder contains your app — deploy it anywhere
```

---

## How to Explore This Codebase

### Start Here (Read These First)

| File | What It Does |
|------|-------------|
| `src/main.tsx` | The entry point — where React boots up |
| `src/App.tsx` | The root component — handles auth gate and routing |
| `src/types/index.ts` | All TypeScript interfaces — the data blueprints |

### Files That Control the UI (Screens)

| File | What It Renders |
|------|----------------|
| `src/screens/LoginScreen.tsx` | The login page with magic link input |
| `src/screens/DynastyHQ.tsx` | The home dashboard (XP, streak, skills, alerts) |
| `src/screens/RecruitBoard.tsx` | The sortable/filterable recruit list |
| `src/screens/RecruitDetail.tsx` | Individual recruit profile + JSON lesson |
| `src/screens/DailyCombine.tsx` | The 3 daily drills (core learning loop) |
| `src/screens/FilmRoom.tsx` | Expandable lesson cards |

### Files That Control the Data

| File | What It Does |
|------|-------------|
| `src/data/recruits.ts` | 24 fictional recruit profiles (seed data) |
| `src/data/drills.ts` | 10 learning drills across 4 categories |
| `src/data/lessons.ts` | 8 concept lessons with triple translations |
| `src/data/alerts.ts` | 3 mock alerts for the dashboard |

### Files That Control Supabase

| File | What It Does |
|------|-------------|
| `src/lib/supabase.ts` | Creates the Supabase client connection |
| `src/services/progressService.ts` | Save/load progress to Supabase + localStorage cache |
| `src/hooks/useAuth.ts` | Authentication state management (login/logout) |
| `src/hooks/useProgress.ts` | User progress state management (XP, drills, etc.) |
| `supabase-schema.sql` | SQL to create the database table |

### Files That Are Reusable UI Pieces

| File | What It Does |
|------|-------------|
| `src/components/UIComponents.tsx` | StatCard, SkillBar, CodeBlock, Badge, etc. |
| `src/components/BottomNav.tsx` | Bottom tab navigation bar |
| `src/components/Header.tsx` | Top header with title and sign-out menu |

### Configuration Files

| File | What It Does |
|------|-------------|
| `package.json` | Lists all dependencies (libraries the app uses) |
| `vite.config.ts` | Build tool configuration |
| `tsconfig.json` | TypeScript compiler settings |
| `tailwind.config.js` | Custom colors, fonts, and Tailwind settings |
| `postcss.config.js` | CSS processing pipeline |
| `.env` | Your secret Supabase keys (not committed to git) |

---

## How the App Starts When It Runs

Here's the exact sequence of events when you open the app:

```
1. Browser loads index.html
2. index.html loads src/main.tsx (the entry point)
3. main.tsx mounts the <App /> component into the HTML page
4. App.tsx checks: "Is the user logged in?" (via useAuth hook)
   ├── NO  → Show LoginScreen
   └── YES → Continue...
5. useProgress hook loads progress from Supabase
6. React Router checks the URL and renders the matching screen
7. BottomNav renders at the bottom for navigation
8. User interacts → state updates → Supabase saves in background
```

---

## How Data Flows Through the App

### Authentication Flow
```
User enters email → signInWithEmail() → Supabase sends magic link →
User clicks link → Supabase creates session → onAuthStateChange fires →
useAuth updates user state → App re-renders → shows dashboard instead of login
```

### Progress Save Flow
```
User completes a drill → completeDrill() in useProgress hook →
Updates React state (instant UI update) →
Calls saveProgress() → caches to localStorage (fast) →
Upserts to Supabase (cloud sync) → Progress available on any device
```

### Progress Load Flow
```
App starts + user is logged in → useProgress(userId) →
loadProgress() queries Supabase → converts snake_case to camelCase →
Caches in localStorage → Sets React state → UI renders with progress
```

### Navigation Flow
```
User taps "Recruits" in BottomNav → React Router updates URL to /recruits →
RecruitBoard component renders → reads recruits from seed data →
Applies user's filter/sort state → Renders filtered recruit cards
```

---

## Project Architecture Overview

```
uga-dynasty-builder/
├── index.html              ← HTML shell (React mounts into <div id="root">)
├── src/
│   ├── main.tsx            ← Entry point (boots React)
│   ├── App.tsx             ← Root component (auth + routing)
│   ├── index.css           ← Global styles + Tailwind
│   │
│   ├── types/              ← Data shape definitions
│   │   └── index.ts        ← TypeScript interfaces (Recruit, Drill, etc.)
│   │
│   ├── data/               ← Seed / mock content (doesn't change)
│   │   ├── recruits.ts     ← 24 recruit profiles
│   │   ├── drills.ts       ← 10 learning drills
│   │   ├── lessons.ts      ← 8 lesson cards
│   │   └── alerts.ts       ← 3 mock alerts
│   │
│   ├── lib/                ← External service connections
│   │   └── supabase.ts     ← Supabase client setup
│   │
│   ├── services/           ← Business logic for data operations
│   │   └── progressService.ts  ← Save/load/transform progress
│   │
│   ├── hooks/              ← Reusable React logic
│   │   ├── useAuth.ts      ← Authentication state
│   │   └── useProgress.ts  ← User progress state
│   │
│   ├── utils/              ← Helper functions
│   │   └── helpers.ts      ← XP calculations, formatters, etc.
│   │
│   ├── components/         ← Reusable UI pieces
│   │   ├── UIComponents.tsx ← Cards, bars, badges, code blocks
│   │   ├── BottomNav.tsx   ← Tab navigation
│   │   └── Header.tsx      ← Top bar
│   │
│   └── screens/            ← Full-page views
│       ├── LoginScreen.tsx  ← Auth screen
│       ├── DynastyHQ.tsx   ← Dashboard / home
│       ├── RecruitBoard.tsx ← Recruit list
│       ├── RecruitDetail.tsx← Individual recruit
│       ├── DailyCombine.tsx ← Daily drills
│       └── FilmRoom.tsx    ← Lesson library
│
├── supabase-schema.sql     ← Database table creation SQL
├── tailwind.config.js      ← Custom design system
├── package.json            ← Dependencies
└── .env                    ← Secret keys (not in git)
```

---

## Key Concepts You'll Learn From This Codebase

| Concept | Where to See It |
|---------|-----------------|
| React components | Every `.tsx` file |
| TypeScript interfaces | `src/types/index.ts` |
| React hooks (useState, useEffect) | `src/hooks/*.ts`, every screen |
| Custom hooks | `src/hooks/useAuth.ts`, `src/hooks/useProgress.ts` |
| Client-side routing | `src/App.tsx` (React Router) |
| API calls | `src/services/progressService.ts` (Supabase queries) |
| Authentication | `src/hooks/useAuth.ts` |
| Environment variables | `src/lib/supabase.ts` |
| Array methods (filter, sort, map) | `src/screens/RecruitBoard.tsx` |
| Conditional rendering | Every screen (ternary operators, && patterns) |
| Props and data flow | Parent → child data passing in `src/App.tsx` |
| JSON structure | `src/screens/RecruitDetail.tsx`, `src/data/recruits.ts` |
| SQL concepts | `supabase-schema.sql`, drill content |
| Responsive design | Tailwind classes throughout |
| Local storage caching | `src/services/progressService.ts` |

---

## Next Steps After Getting It Running

1. **Complete the Daily Combine** — do 3 drills and watch your XP grow
2. **Open the Film Room** — read through each lesson
3. **Explore the Recruit Board** — filter and sort, tap into detail views
4. **Read the code** — follow the data flow from button click to database save
5. **Make small changes** — edit a recruit name, add a drill, change a color
6. **Break things on purpose** — see what errors look like and how to fix them

The best way to learn is to tinker. This app is YOUR playground. Go between.
