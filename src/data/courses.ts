import { Course } from '../types';

export const courses: Course[] = [
  // ══════════════════════════════════════════════════════════════
  // SEASON 0 — PRE-CAMP: THE ROSETTA STONE
  // 8 concepts that unlock ~90% of modern software
  // ══════════════════════════════════════════════════════════════
  {
    id: 'course-s0',
    season: 0,
    seasonLabel: 'Pre-Camp',
    title: 'The Rosetta Stone',
    subtitle: '8 concepts that unlock 90% of modern software',
    description: 'Before learning any specific language, master the 8 mental models that underpin ALL software. These apply whether you\'re building a game, an AI, or a startup — in any language, on any platform.',
    icon: '🗿',
    accentColor: '#94a3b8',
    modules: [
      {
        id: 'mod-s0-m1',
        courseId: 'course-s0',
        order: 1,
        title: 'Data & Control Flow',
        description: 'Everything is data. Programs are just decisions about what to do with it.',
        icon: '🧱',
        lessons: [
          {
            id: 'lesson-s0-m1-l1',
            moduleId: 'mod-s0-m1',
            order: 1,
            title: 'Everything is Data',
            duration: '5 min',
            overview: 'Every app — your UGA Dynasty Builder, PE Copilot, Instagram, Google — exists to store, transform, and display data. Once you see this, all code becomes simpler.',
            footballAnalogy: 'A football team is pure data: roster (list), game stats (numbers), playbook (nested structure), schedule (table). The coaching staff transforms that data into decisions. Software does the same thing.',
            explanation: 'Data has structure. The four most common structures are: (1) Primitives — a single value like a number or string. (2) Lists/Arrays — ordered sequences of items. (3) Objects/Dicts — named collections of fields. (4) Tables — rows and columns, like a spreadsheet or database. Every complex data structure is built from these four.',
            keyPoints: [
              'Primitives: `42`, `"Georgia"`, `true` — single values',
              'Arrays: `["UGA", "Bama", "Ohio State"]` — ordered lists',
              'Objects: `{ name: "Georgia", offense: 92, defense: 95 }` — named fields',
              'Tables: rows × columns — the foundation of all databases',
            ],
            codeExample: `# Real data structures from UGA Dynasty Builder

# Primitive
team_rating = 92

# Array (list of recruits)
pipeline = ["Marcus Johnson", "Devon Williams", "Tae Mitchell"]

# Object (nested data)
team = {
  "name": "Georgia Bulldogs",
  "offense": 92,
  "defense": 95,
  "record": {"wins": 13, "losses": 1},
  "recruits": pipeline          # arrays inside objects!
}

# Table (SQL equivalent in Python)
# id | name    | stars | position
# 1  | Marcus  | 5     | QB
# 2  | Devon   | 4     | WR

# In SQL:
# SELECT name, stars FROM recruits WHERE stars = 5`,
            quiz: {
              question: 'Which data structure would you use to store a list of team names in order?',
              options: [
                'A primitive (single value)',
                'An array / list',
                'A boolean (true/false)',
                'A floating point number',
              ],
              correctIndex: 1,
              explanation: 'An array (list) holds multiple ordered values. For a list of team names, you\'d use `["Georgia", "Alabama", "Ohio State"]`. Arrays are one of the four foundational data structures.',
            },
            xpReward: 40,
          },
          {
            id: 'lesson-s0-m1-l2',
            moduleId: 'mod-s0-m1',
            order: 2,
            title: 'Control Flow — How Programs Decide',
            duration: '5 min',
            overview: 'Programs are not executed top-to-bottom robotically. They branch (if/else), repeat (loops), and jump (functions). This decision-making is called control flow.',
            footballAnalogy: 'Every snap, the QB makes multiple decisions in sequence: Is the safety blitzing? → Yes → Check down. Is the slot open? → Yes → Throw it. Is the receiver double-covered? → Yes → scramble. That branching, looping decision-making is exactly what control flow does in code.',
            explanation: 'The three pillars of control flow: (1) Conditionals — `if/elif/else` branches the program based on conditions. (2) Loops — `for` and `while` repeat blocks of code. (3) Functions — jump to a reusable block and return. Almost all code is combinations of these three patterns.',
            keyPoints: [
              'if/else: "If this is true, do A. Otherwise, do B."',
              'for loop: "Do this for each item in the list."',
              'while loop: "Keep doing this until the condition is false."',
              'Functions: "Jump to this reusable block, then come back."',
            ],
            codeExample: `# Most code is just loops + conditions

companies = get_companies_from_db()

for company in companies:             # loop over every company
    score = calculate_score(company)  # function call

    if score >= 80:                   # conditional branch
        priority = "HOT"
        send_alert(company)           # another function
    elif score >= 60:
        priority = "WARM"
    else:
        priority = "COLD"

    save_to_db(company, priority)     # side effect

# UGA game equivalent:
for week in schedule:
    if team_rating > opponent.rating:
        strategy = "aggressive"
    else:
        strategy = "conservative"
    simulate_game(week, strategy)`,
            quiz: {
              question: 'What does a `for` loop do?',
              options: [
                'It runs code only once, then stops',
                'It checks a condition and runs code if true',
                'It repeats a block of code for each item in a collection',
                'It defines a reusable function',
              ],
              correctIndex: 2,
              explanation: 'A `for` loop iterates over a collection (list, range, etc.) and runs the code block once for each item. `for company in companies` runs the body once per company in the list.',
            },
            xpReward: 40,
          },
        ],
      },
      {
        id: 'mod-s0-m2',
        courseId: 'course-s0',
        order: 2,
        title: 'Functions, State & Architecture',
        description: 'The three concepts that determine how well software scales.',
        icon: '⚙️',
        lessons: [
          {
            id: 'lesson-s0-m2-l1',
            moduleId: 'mod-s0-m2',
            order: 1,
            title: 'Functions — Reusable Logic',
            duration: '5 min',
            overview: 'Functions are named, reusable blocks of logic. Modern software is essentially functions stacked together — small, focused, testable pieces that compose into large systems.',
            footballAnalogy: 'A position coach designs drills — a WR route tree drill, a DB press-man drill. Each drill is reusable: run it with any player, any day. Functions work exactly the same: write the logic once, call it for any input.',
            explanation: 'A function has three parts: a name (what it\'s called), parameters (what it needs), and a return value (what it produces). Functions should do ONE thing well (single responsibility principle). Well-named functions make code read like English. Functions hide complexity — callers don\'t need to know how `calculateScore()` works, just that it does.',
            keyPoints: [
              'Functions: `def name(inputs): ... return output`',
              'Single responsibility: each function does exactly one thing',
              'Abstraction: callers use functions without knowing the implementation',
              'Composition: big programs = small functions chained together',
            ],
            codeExample: `# Without functions (bad — repetitive, error-prone)
company1_score = (company1["revenue"] * 0.4 + company1["growth"] * 0.6) * company1["market_size"]
company2_score = (company2["revenue"] * 0.4 + company2["growth"] * 0.6) * company2["market_size"]

# With a function (good — write once, use everywhere)
def score_company(company):
    """Score a company for PE fit. Returns 0-100."""
    revenue_score = company["revenue"] * 0.4
    growth_score  = company["growth"] * 0.6
    market_mult   = company["market_size"]
    return (revenue_score + growth_score) * market_mult

# Now reuse for any company
companies = fetch_companies()
scored = [(c, score_company(c)) for c in companies]

# UGA equivalent:
def simulate_play(offense_rating, defense_rating, play_type):
    base = offense_rating - defense_rating
    variance = random.gauss(0, 8)
    return max(0, base * 0.3 + variance)`,
            quiz: {
              question: 'What is the "single responsibility principle" for functions?',
              options: [
                'Each function should be as short as possible',
                'Each function should do exactly one thing well',
                'Functions should never call other functions',
                'Functions should always return a number',
              ],
              correctIndex: 1,
              explanation: 'Single responsibility means each function does exactly one thing. A function called `score_company()` scores companies — it doesn\'t also send emails or log data. This makes code easier to test, debug, and reuse.',
            },
            xpReward: 40,
          },
          {
            id: 'lesson-s0-m2-l2',
            moduleId: 'mod-s0-m2',
            order: 2,
            title: 'State — What the System Remembers',
            duration: '5 min',
            overview: 'State is any data that changes over time and must be remembered. Managing state correctly is one of the hardest and most important skills in software.',
            footballAnalogy: 'The scoreboard tracks state: current score, quarter, down-and-distance, timeouts remaining. Everything changes based on what happened. Modern apps work identically — your login status, game week, XP total are all state that must be tracked and updated correctly.',
            explanation: 'State is data that persists and changes. In React, `useState` manages component state. In a database, tables store application state. Bugs often come from state being "out of sync" — the UI shows one thing, the database has another. Best practices: keep state minimal, single source of truth, update immutably.',
            keyPoints: [
              'State: data that changes over time and needs to be remembered',
              'In React: `const [score, setScore] = useState(0)` — never mutate directly',
              'Single source of truth: one authoritative place for each piece of state',
              'Derived state: calculate from existing state rather than storing twice',
            ],
            codeExample: `// React state — UGA Dynasty Builder example
import { useState } from 'react';

function SeasonTracker() {
  // State: changes over time, drives UI
  const [week, setWeek]    = useState(1);    // current week
  const [wins, setWins]    = useState(0);    // wins so far
  const [losses, setLosses] = useState(0);   // losses so far

  // Derived state — calculated, NOT stored separately
  const record = \`\${wins}-\${losses}\`;    // don't useState this!
  const isUndefeated = losses === 0;

  const handleGameResult = (won) => {
    if (won) setWins(w => w + 1);
    else setLosses(l => l + 1);
    setWeek(w => w + 1);
  };

  return (
    <div>
      <p>Week {week} | Record: {record}</p>
      {isUndefeated && <span>🏆 Perfect Season!</span>}
    </div>
  );
}`,
            quiz: {
              question: 'What is "derived state" and why is it better than storing redundant state?',
              options: [
                'Derived state comes from a database; it\'s better because it\'s persistent',
                'Derived state is calculated from existing state — avoids sync bugs and duplication',
                'Derived state is set by the user — it\'s more accurate than automatic state',
                'They are the same — derived state is just a synonym for state',
              ],
              correctIndex: 1,
              explanation: 'Derived state is computed FROM existing state rather than stored separately. If you already store `wins` and `losses`, the record (`"13-1"`) should be calculated — not stored. Storing it separately creates sync bugs when one updates but the other doesn\'t.',
            },
            xpReward: 40,
          },
          {
            id: 'lesson-s0-m2-l3',
            moduleId: 'mod-s0-m2',
            order: 3,
            title: 'Architecture — How Everything Connects',
            duration: '6 min',
            overview: 'Modern apps have three layers: Frontend (what users see), Backend (logic and APIs), Database (persistent data). Understanding this stack is how you design systems — and how you communicate with other developers.',
            footballAnalogy: 'Football has three phases: Offense (Frontend — what fans see and interact with), Defense (Backend — the engine processing all the decisions), Special Teams (Database — the foundation that persists game history, stats, records). All three must coordinate for the team to win.',
            explanation: 'The standard web architecture: **React/TypeScript frontend** calls your **Backend API** (Node/Express or Python/FastAPI or Next.js API routes), which reads/writes to a **Postgres/Supabase database**. For AI apps, add a fourth layer: **LLM API** (Claude) — called only from the backend, never the frontend. This is exactly the stack behind this app.',
            keyPoints: [
              'Frontend: React/TypeScript — user interface, runs in browser',
              'Backend: API server — business logic, authentication, calls to AI/database',
              'Database: PostgreSQL (Supabase) — persistent storage, SQL queries',
              'AI layer: LLM API (Claude) — always called server-side, never expose API key to browser',
            ],
            codeExample: `// Your current stack (this is a real production stack):

// FRONTEND (React/TypeScript — browser)
// src/screens/DynastyHQ.tsx
const { data } = await supabase.from('user_progress').select('*');

// BACKEND (Supabase + Netlify Functions — server)
// netlify/functions/analyze.ts
const response = await fetch('https://api.anthropic.com/v1/messages', {
  headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY }  // SERVER-SIDE ONLY
});

// DATABASE (Supabase Postgres — persistent)
-- supabase-schema.sql
CREATE TABLE user_progress (
  user_id UUID PRIMARY KEY,
  total_xp INTEGER,
  completed_lesson_ids TEXT[]
);

// AI (Claude API — called from backend)
const analysis = await client.messages.create({
  model: "claude-sonnet-4-6",
  messages: [{ role: "user", content: recruitData }]
});`,
            quiz: {
              question: 'Why should you NEVER call the Claude API directly from your React frontend?',
              options: [
                'React doesn\'t support fetch() calls',
                'Claude\'s API doesn\'t accept browser requests',
                'Your API key would be visible in the browser, allowing anyone to steal and use it',
                'It would make the app run too slowly',
              ],
              correctIndex: 2,
              explanation: 'Any code in the browser is visible to anyone using DevTools. An exposed API key means anyone can use your Claude account and you pay the bill. Always proxy AI calls through your backend server where the API key stays secret.',
            },
            xpReward: 40,
          },
        ],
      },
      {
        id: 'mod-s0-m3',
        courseId: 'course-s0',
        order: 3,
        title: 'The 5 Core Skills of Elite AI Builders',
        description: 'Skills that matter more than memorizing syntax. Build these and you\'ll outpace 95% of developers.',
        icon: '🏆',
        lessons: [
          {
            id: 'lesson-s0-m3-l1',
            moduleId: 'mod-s0-m3',
            order: 1,
            title: 'Problem Decomposition — The Drive Chart',
            duration: '6 min',
            overview: 'The #1 skill separating great builders from beginners is the ability to break a complex goal into small, concrete, buildable pieces.',
            footballAnalogy: 'You don\'t win the national championship in one play. You win it drive by drive, play by play, assignment by assignment. Problem decomposition is the mental skill of seeing a big goal and knowing exactly how to break it into the next small play to run.',
            explanation: 'When you get a big task ("Build PE Copilot"), don\'t try to code it all at once. Decompose: What data do I need? → Where does it come from? → How do I store it? → What does the user see? → How does it update? Each question becomes a small, buildable task. Elite builders decompose relentlessly — tasks under 2 hours, not "build the app."',
            keyPoints: [
              'Big goal → list of questions → each question = a small task',
              '"Build PE Copilot" → company DB → scoring model → dashboard → scanner',
              'If you can\'t start in 5 minutes, the task is too big — decompose further',
              'This is how every professional engineer breaks down work',
            ],
            codeExample: `# How to decompose "Build UGA Dynasty Builder game mode"

# BAD (too big, can't start):
# "Add a game to the app"

# GOOD (decomposed into concrete tasks):
tasks = [
  "1. Define Matchup type: { week, opponent, rating, result }",
  "2. Create opponents dict with 14 SEC teams and ratings",
  "3. Write simulateGame(ugaRating, oppRating) → GameResult",
  "4. Create useSeasonGame() hook with localStorage persistence",
  "5. Build schedule list screen showing W/L for completed weeks",
  "6. Build pregame screen with 4 strategy options",
  "7. Build play-by-play animation screen",
  "8. Build result screen with XP reward",
  "9. Add /game route to App.tsx",
  "10. Add Game tab to navigation",
]

# Each task is <2 hours. Start with task 1.
# This is exactly how this game was built!`,
            quiz: {
              question: 'How do you know if a task is too big to start?',
              options: [
                'If it would take more than a week to complete',
                'If it involves more than one programming language',
                'If you can\'t start working on it within 5 minutes',
                'If it requires a database',
              ],
              correctIndex: 2,
              explanation: 'If you can\'t immediately start coding because you\'re not sure where to begin, the task is too large. Decompose it until you have a task so small and concrete you can start in the next 5 minutes.',
            },
            xpReward: 40,
          },
          {
            id: 'lesson-s0-m3-l2',
            moduleId: 'mod-s0-m3',
            order: 2,
            title: 'AI as a Coding Partner — The New Workflow',
            duration: '7 min',
            overview: 'The biggest shift in 2026: developers write far less code manually. The skill becomes guiding AI correctly, reviewing what it produces, and iterating fast.',
            footballAnalogy: 'Think of Claude or ChatGPT as your offensive coordinator. You\'re the head coach. You decide the strategy and direction ("we need a spread offense"). The OC draws up the plays (code). You review them, adjust, and call them. The best coaches know enough football to evaluate the plays — they don\'t draw every one themselves.',
            explanation: 'The modern AI builder workflow: (1) Decompose the problem. (2) Prompt AI for the component/function/query. (3) Review the output — does it make sense? (4) Modify as needed. (5) Test. (6) Ship. The skill shifts from "write code" to "guide AI and evaluate code." This is why understanding fundamentals still matters — you need to recognize correct vs. broken code.',
            keyPoints: [
              'Be specific in prompts: describe input, output, constraints, and tech stack',
              'Review AI output critically — LLMs confidently produce wrong code',
              'Iterate fast: "This works, now add error handling" not "redo everything"',
              'The meta-skill: knowing enough to evaluate what the AI generates',
            ],
            codeExample: `// The modern workflow in practice

// STEP 1: Decompose (you do this)
// Task: "Score each company for PE fit, 0-100"

// STEP 2: Prompt AI with specifics
const prompt = \`
Write a Python function that scores a company for PE fit.
Inputs: revenue (float), growth_rate (float 0-1), market_size (str: 'large'/'medium'/'small')
Output: integer 0-100
Weights: revenue 40%, growth 40%, market 20%
Market multipliers: large=1.0, medium=0.8, small=0.6
\`;

// STEP 3: Review AI output
def score_company(revenue, growth_rate, market_size):
    multipliers = {'large': 1.0, 'medium': 0.8, 'small': 0.6}
    mult = multipliers.get(market_size, 0.6)   # ← you evaluate: correct?
    raw = (revenue * 0.4 + growth_rate * 100 * 0.4) * mult
    return min(100, max(0, int(raw)))           # ← clamped 0-100? ✓

// STEP 4: Modify — "also handle missing market_size gracefully"
// STEP 5: Test with real data
// STEP 6: Ship it`,
            quiz: {
              question: 'In the "AI as coding partner" workflow, what is YOUR most important role?',
              options: [
                'Writing as much code as possible without AI help to prove your skills',
                'Reviewing AI output, evaluating correctness, and guiding iteration',
                'Memorizing all syntax so you can correct the AI',
                'Accepting all AI output without modification to save time',
              ],
              correctIndex: 1,
              explanation: 'Your role is to decompose problems, give precise prompts, and critically evaluate AI output. LLMs produce confident-sounding code that may be wrong or incomplete. Your judgment and understanding of fundamentals is what makes the AI productive.',
            },
            xpReward: 40,
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // SEASON 1 — ROOKIE CAMP (Absolute Beginner)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'course-s1',
    season: 1,
    seasonLabel: 'Rookie Camp',
    title: 'How Software Works',
    subtitle: 'Think like a programmer from Day 1',
    description: 'Before you write a single line of code, you need to understand how computers think. This season covers the core mental models that every great engineer and AI builder uses every day.',
    icon: '🏕️',
    accentColor: '#4ade80',
    modules: [
      {
        id: 'mod-s1-m1',
        courseId: 'course-s1',
        order: 1,
        title: 'The Mental Model',
        description: 'Understand how computers store, process, and move information.',
        icon: '🧠',
        lessons: [
          {
            id: 'lesson-s1-m1-l1',
            moduleId: 'mod-s1-m1',
            order: 1,
            title: 'Variables — The Depth Chart',
            duration: '5 min',
            overview: 'Every program starts with storing information. Variables are the boxes that hold your data — names, numbers, lists, anything.',
            footballAnalogy: 'Think of a depth chart. You have a slot for "Starting QB" and you put a name in it: Stetson Bennett. If Stetson gets hurt, you update the slot to Carson Beck. The slot (variable) stays, but the value changes.',
            explanation: 'A variable is a named container that holds a value. You give it a name (like `quarterbackName`) and assign it a value (like "Stetson"). Later you can read that value back, update it, or use it in calculations. Every programming language uses variables — they\'re the foundation of all code.',
            keyPoints: [
              'Variables have a name and a value',
              'Values can change over time — that\'s why it\'s called a "variable"',
              'Common types: text (string), numbers (int/float), true/false (boolean)',
              'Good names describe what the value means: `playerSpeed` not `x`',
            ],
            codeExample: `# Python examples
quarterback = "Carson Beck"
starRating = 5
isEligible = True
gpa = 3.8

# You can update them
quarterback = "Gunner Stockton"  # depth chart change
starRating = starRating + 1      # math works too

print(quarterback)   # Gunner Stockton
print(starRating)    # 6`,
            quiz: {
              question: 'What is a variable in programming?',
              options: [
                'A type of error in code',
                'A named container that stores a value',
                'A function that runs automatically',
                'A connection to a database',
              ],
              correctIndex: 1,
              explanation: 'A variable is a named container that stores a value. The value can be updated over time, which is why it\'s called "variable" — it can vary.',
            },
            xpReward: 50,
          },
          {
            id: 'lesson-s1-m1-l2',
            moduleId: 'mod-s1-m1',
            order: 2,
            title: 'Functions — The Play Design',
            duration: '6 min',
            overview: 'Functions are reusable blocks of code that take inputs, do work, and return outputs. They\'re the building blocks of every program ever written.',
            footballAnalogy: 'An offensive coordinator designs plays. Each play has a name, takes input (the defensive formation), runs a set of steps, and produces an output (yards gained). A function works exactly the same — give it input, it runs its logic, returns output.',
            explanation: 'A function packages up a set of instructions you want to run more than once. You define it once with a name, list what inputs it needs (called parameters), write the steps, and optionally return a result. Then you call it by name whenever you need it. Functions keep code organized and prevent repetition.',
            keyPoints: [
              'Functions have: a name, optional inputs (parameters), a body (the steps), and an optional return value',
              'You define a function once and call it many times',
              'Functions make code reusable and readable',
              'A function should do ONE thing well — the "single responsibility" rule',
            ],
            codeExample: `# Define the function (design the play)
def calculateRecruitScore(stars, gpa, fortyTime):
    speedBonus = (4.5 - fortyTime) * 10   # faster = higher bonus
    academicBonus = gpa * 5
    score = (stars * 20) + speedBonus + academicBonus
    return score

# Call the function (run the play)
marcusScore = calculateRecruitScore(5, 3.8, 4.38)
print(marcusScore)   # 124.2

# Reuse it for every recruit — no copy-paste needed
trevScore = calculateRecruitScore(4, 3.5, 4.52)`,
            quiz: {
              question: 'What is the main benefit of using functions?',
              options: [
                'They make code run faster automatically',
                'They connect to the internet',
                'They let you reuse the same logic without repeating code',
                'They store data permanently',
              ],
              correctIndex: 2,
              explanation: 'Functions let you define logic once and reuse it many times. Instead of copy-pasting the same code everywhere, you call the function by name.',
            },
            xpReward: 50,
          },
          {
            id: 'lesson-s1-m1-l3',
            moduleId: 'mod-s1-m1',
            order: 3,
            title: 'Logic — Reading the Defense',
            duration: '6 min',
            overview: 'Programs make decisions using conditions. If this, do that. Otherwise, do something else. This branching logic is how software responds to the real world.',
            footballAnalogy: 'A quarterback reads the defense and makes a decision: if the safety blitzes, check down to the RB; else if the corner is playing press, throw deep; else run the designed play. Code does the same thing — if/elif/else chains let your program react to any situation.',
            explanation: 'Conditional statements let code choose different paths based on whether conditions are true or false. The `if` keyword checks a condition. `elif` (else if) handles additional cases. `else` handles everything that doesn\'t match. You can also combine conditions with `and`, `or`, and `not`.',
            keyPoints: [
              '`if` checks a condition — runs that block if True',
              '`elif` checks another condition if the first was False',
              '`else` runs when nothing else matched',
              'Comparison operators: == (equal), != (not equal), >, <, >=, <=',
            ],
            codeExample: `def evaluateRecruit(stars, fortyTime, gpa):
    if stars == 5 and gpa >= 3.5:
        return "Priority 1 — offer immediately"
    elif stars >= 4 and fortyTime < 4.5:
        return "Priority 2 — schedule official visit"
    elif stars >= 3:
        return "Priority 3 — keep monitoring"
    else:
        return "Not a fit this cycle"

print(evaluateRecruit(5, 4.38, 3.9))   # Priority 1
print(evaluateRecruit(4, 4.42, 3.2))   # Priority 2
print(evaluateRecruit(2, 4.8, 2.5))    # Not a fit`,
            quiz: {
              question: 'What does the `else` block do in an if/elif/else chain?',
              options: [
                'It runs every time the program starts',
                'It raises an error',
                'It runs when none of the previous conditions were True',
                'It ends the program',
              ],
              correctIndex: 2,
              explanation: '`else` is the catch-all — it runs only when none of the `if` or `elif` conditions evaluated to True. It\'s like the "default play" when the defense shows something unexpected.',
            },
            xpReward: 50,
          },
        ],
      },
      {
        id: 'mod-s1-m2',
        courseId: 'course-s1',
        order: 2,
        title: 'Python Fundamentals',
        description: 'Python is the #1 language for AI and data work. Build real comfort with it here.',
        icon: '🐍',
        lessons: [
          {
            id: 'lesson-s1-m2-l1',
            moduleId: 'mod-s1-m2',
            order: 1,
            title: 'Your First Python Program',
            duration: '5 min',
            overview: 'Python reads almost like English, which is why it\'s the world\'s most popular beginner language — and also the #1 language for AI and machine learning.',
            footballAnalogy: 'Learning Python is like installing a new playbook app on your tablet. Once it\'s set up, you can draw plays, share them, run simulations. The first step is always: open the app and run your first play.',
            explanation: 'Python code is written in plain text files ending in `.py`. You run them with the `python` command. Python uses indentation (spaces) to define blocks of code — there are no curly braces like other languages. The `print()` function outputs text. Comments start with `#` and are ignored by Python.',
            keyPoints: [
              'Python files end in `.py` and run with `python filename.py`',
              'Indentation (4 spaces) defines code blocks — it\'s not optional',
              '`print()` displays output to the terminal',
              'Comments start with `#` — write them to explain your thinking',
            ],
            codeExample: `# Your first Python program
# Comments explain what the code does

name = "Georgia Bulldogs"
national_titles = 2
is_sec_champ = True

print("Welcome to " + name)
print("National titles:", national_titles)
print("Current SEC champs:", is_sec_champ)

# Math works naturally
total_wins = 15 + 13 + 14  # last 3 seasons
print("Combined wins:", total_wins)`,
            quiz: {
              question: 'In Python, how do you define a code block (like the body of a function)?',
              options: [
                'With curly braces { }',
                'With the BLOCK keyword',
                'With consistent indentation (spaces)',
                'With square brackets [ ]',
              ],
              correctIndex: 2,
              explanation: 'Python uses indentation to define code blocks — typically 4 spaces. This is enforced by the language, not just style. This makes Python code very readable.',
            },
            xpReward: 50,
          },
          {
            id: 'lesson-s1-m2-l2',
            moduleId: 'mod-s1-m2',
            order: 2,
            title: 'Lists & Loops — The Practice Reps',
            duration: '7 min',
            overview: 'Lists store multiple items in one variable. Loops let you process every item automatically — no matter if there are 5 recruits or 500.',
            footballAnalogy: 'A roster is a list. You loop through the roster every morning for practice — checking each player\'s status, running them through conditioning, reviewing film. Python loops do the same thing with data: process each item, one at a time, automatically.',
            explanation: 'A Python list holds multiple values in order, surrounded by square brackets: `[item1, item2, item3]`. You can access any item by index (starting at 0). A `for` loop iterates over every item in a list. You can also loop over a range of numbers with `range()`. List comprehensions offer a powerful one-line way to create filtered or transformed lists.',
            keyPoints: [
              'Lists use square brackets: `recruits = ["Marcus", "Devon", "Tae"]`',
              'Index starts at 0: `recruits[0]` is "Marcus"',
              '`for item in list:` loops over every element',
              'List comprehension: `[x for x in list if condition]` — very Pythonic',
            ],
            codeExample: `recruits = [
    {"name": "Marcus Johnson", "stars": 5},
    {"name": "Devon Williams", "stars": 4},
    {"name": "Tae Mitchell", "stars": 3},
    {"name": "Kyle Brown", "stars": 5},
]

# Loop through all recruits
for recruit in recruits:
    print(f"{recruit['name']}: {recruit['stars']} stars")

# List comprehension — get only 5-star recruits
elite = [r for r in recruits if r["stars"] == 5]
print(f"Elite recruits: {len(elite)}")  # 2

# range() for numbered loops
for i in range(1, 4):   # 1, 2, 3
    print(f"Rep {i}: route running drill")`,
            quiz: {
              question: 'What does `recruits[0]` return if `recruits = ["Marcus", "Devon", "Tae"]`?',
              options: [
                '"Tae"',
                '"Devon"',
                '"Marcus"',
                '1',
              ],
              correctIndex: 2,
              explanation: 'Python lists are zero-indexed, meaning the first item is at index 0. So `recruits[0]` returns "Marcus", the first item in the list.',
            },
            xpReward: 50,
          },
          {
            id: 'lesson-s1-m2-l3',
            moduleId: 'mod-s1-m2',
            order: 3,
            title: 'Dictionaries — The Recruit Profile',
            duration: '7 min',
            overview: 'Dictionaries store data as key-value pairs — like a named set of stats for each player. They\'re one of Python\'s most used data structures.',
            footballAnalogy: 'A recruiting profile card has labeled fields: Name, Position, Stars, GPA, Hometown. That\'s exactly a dictionary — labeled slots you fill in with data. You look up stats by their label, not by a number.',
            explanation: 'Python dictionaries use curly braces and store data as `key: value` pairs. Keys are usually strings; values can be anything. Access values with `dict["key"]` or `dict.get("key")`. Add or update with `dict["key"] = value`. Dictionaries are unordered but extremely fast to look up — this is how JSON data is represented in Python.',
            keyPoints: [
              'Dictionaries: `{"name": "Marcus", "stars": 5}` — key maps to value',
              'Access: `recruit["stars"]` or `recruit.get("stars", 0)` (safe default)',
              'Update: `recruit["stars"] = 5` — adds if new, updates if exists',
              '`.keys()`, `.values()`, `.items()` let you iterate over the contents',
            ],
            codeExample: `recruit = {
    "name": "Marcus Johnson",
    "position": "QB",
    "stars": 5,
    "gpa": 3.8,
    "hometown": "Atlanta, GA",
    "offers": ["UGA", "Alabama", "Ohio State"]
}

# Access values
print(recruit["name"])         # Marcus Johnson
print(recruit["offers"][0])    # UGA (first offer)

# Safe access (won't crash if key missing)
speed = recruit.get("fortyTime", "unknown")

# Update
recruit["status"] = "Committed"

# Loop over all fields
for key, value in recruit.items():
    print(f"{key}: {value}")`,
            quiz: {
              question: 'How do you safely access a dictionary key that might not exist?',
              options: [
                '`dict[key]` — it handles missing keys automatically',
                '`dict.get(key, default)` — returns default if key is missing',
                '`dict.find(key)` — searches for the key',
                '`dict.fetch(key)` — fetches the value',
              ],
              correctIndex: 1,
              explanation: '`dict.get(key, default)` returns the value if the key exists, or the default value if it doesn\'t. Using `dict[key]` directly will raise a KeyError if the key is missing.',
            },
            xpReward: 50,
          },
        ],
      },
      {
        id: 'mod-s1-m3',
        courseId: 'course-s1',
        order: 3,
        title: 'Git & The Terminal',
        description: 'Every developer and AI builder uses these tools daily. Master them early.',
        icon: '💻',
        lessons: [
          {
            id: 'lesson-s1-m3-l1',
            moduleId: 'mod-s1-m3',
            order: 1,
            title: 'The Terminal — Sideline Communication',
            duration: '6 min',
            overview: 'The terminal lets you control your computer with text commands — no clicking. It\'s faster, more powerful, and required for building real software and AI systems.',
            footballAnalogy: 'The coach communicates to players via headsets — direct, fast, no menus or buttons to click through. The terminal is your headset to the computer. You type a command, the computer executes it immediately.',
            explanation: 'The terminal (also called command line or shell) is a text-based interface to your computer. You navigate folders, run programs, install packages, and manage files all with typed commands. Key commands: `pwd` (where am I?), `ls` (list files), `cd` (change directory), `mkdir` (create folder), `touch` (create file).',
            keyPoints: [
              '`pwd` — print working directory (where you are)',
              '`ls` — list files in current directory',
              '`cd foldername` — move into a folder; `cd ..` — go up one level',
              '`mkdir` to create folders; `touch` to create files',
            ],
            codeExample: `# Navigate to your projects folder
cd ~/Documents
mkdir dynasty-projects
cd dynasty-projects

# Create a Python file
touch first_program.py

# List what's here
ls
# Output: first_program.py

# Run your Python file
python first_program.py

# Useful shortcuts
# Tab key → autocomplete filenames
# Up arrow → repeat previous command
# Ctrl+C → cancel a running program`,
            quiz: {
              question: 'What does the terminal command `cd ..` do?',
              options: [
                'Creates a new directory called ".."',
                'Moves up one level to the parent directory',
                'Deletes the current directory',
                'Lists all files including hidden ones',
              ],
              correctIndex: 1,
              explanation: '`cd ..` means "change directory to parent" — it moves you up one level in the folder hierarchy. `..` always refers to the parent directory.',
            },
            xpReward: 50,
          },
          {
            id: 'lesson-s1-m3-l2',
            moduleId: 'mod-s1-m3',
            order: 2,
            title: 'Git — The Film Room Vault',
            duration: '8 min',
            overview: 'Git is version control — it records every change to your code, lets you go back in time, and lets multiple people work on the same project safely.',
            footballAnalogy: 'Every game is recorded and archived in the film room. Coaches can pull up any play from any game that ever happened. Git does this for code — every `commit` is a saved snapshot. Made a mistake? Roll back to any previous version.',
            explanation: 'Git tracks changes to files over time. A **repository** (repo) is a folder Git is tracking. A **commit** is a named snapshot of your code at a point in time. The basic workflow: 1) Edit files, 2) `git add` to stage changes, 3) `git commit` to save the snapshot. GitHub is a website that hosts your repos online.',
            keyPoints: [
              '`git init` — start tracking a folder with Git',
              '`git status` — see what has changed since last commit',
              '`git add .` — stage all changes for commit',
              '`git commit -m "message"` — save a named snapshot',
            ],
            codeExample: `# One-time setup (do this once on your machine)
git config --global user.name "Your Name"
git config --global user.email "you@email.com"

# Start a new project
mkdir my-ai-project
cd my-ai-project
git init         # Now Git is watching this folder

# Make a change, then save it
touch app.py
git status       # Shows: app.py is untracked
git add .        # Stage everything
git commit -m "Initial commit: added app.py"

# See the history
git log --oneline
# Output: a3f9b21 Initial commit: added app.py`,
            quiz: {
              question: 'What is the correct order of the basic Git workflow?',
              options: [
                'commit → add → push',
                'push → commit → add',
                'add → commit → (optionally push)',
                'init → push → commit',
              ],
              correctIndex: 2,
              explanation: 'The workflow is: edit files → `git add` (stage them) → `git commit` (save snapshot) → `git push` (optional: upload to GitHub). You must add before you can commit.',
            },
            xpReward: 50,
          },
          {
            id: 'lesson-s1-m3-l3',
            moduleId: 'mod-s1-m3',
            order: 3,
            title: 'Branches — Parallel Playbooks',
            duration: '7 min',
            overview: 'Branches let you work on new features without touching working code. When it\'s ready, you merge it in. This is how all real software teams work.',
            footballAnalogy: 'Your offensive coordinator draws up a new no-huddle package without tearing up the existing playbook. He works on it separately, tests it in practice, then adds it to the official playbook when it\'s ready. Git branches work exactly the same way.',
            explanation: 'A branch is a parallel version of your code. You branch off from `main`, make changes, and when ready, merge back. This keeps the main codebase stable while development happens in isolation. GitHub Pull Requests let teammates review your branch before it\'s merged.',
            keyPoints: [
              '`git branch feature-name` — create a new branch',
              '`git checkout feature-name` or `git switch feature-name` — switch to it',
              '`git merge feature-name` — merge branch into current branch',
              'PRs on GitHub let others review code before merge',
            ],
            codeExample: `# You're on main — working code is safe here
git branch add-ai-feature    # Create a branch
git switch add-ai-feature    # Move to it

# Work on the feature safely
touch ai_module.py
git add .
git commit -m "Add AI module skeleton"

# More work...
git commit -m "Add Claude API integration"

# When ready, merge back to main
git switch main
git merge add-ai-feature

# Or on GitHub: open a Pull Request for code review
# → teammates review → approve → merge button`,
            quiz: {
              question: 'Why do developers use Git branches instead of editing the main branch directly?',
              options: [
                'Branches run code faster',
                'Branches isolate new work so the main codebase stays stable and working',
                'Branches are required for Python to work',
                'Branches automatically write tests',
              ],
              correctIndex: 1,
              explanation: 'Branches let you develop features in isolation. If something breaks on your branch, the main branch is unaffected. When the feature is ready and reviewed, you merge it in.',
            },
            xpReward: 50,
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // SEASON 2 — BUILDING SEASON (Fundamentals)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'course-s2',
    season: 2,
    seasonLabel: 'Building Season',
    title: 'Web & JavaScript',
    subtitle: 'Build things people can actually use',
    description: 'The web is how software reaches people. Learn JavaScript — the only language that runs in browsers — plus HTML/CSS to build real user interfaces.',
    icon: '🔨',
    accentColor: '#facc15',
    modules: [
      {
        id: 'mod-s2-m1',
        courseId: 'course-s2',
        order: 1,
        title: 'JavaScript Essentials',
        description: 'JavaScript runs in every browser and powers most of the internet.',
        icon: '⚡',
        lessons: [
          {
            id: 'lesson-s2-m1-l1',
            moduleId: 'mod-s2-m1',
            order: 1,
            title: 'JavaScript — The Swiss Army Recruit',
            duration: '6 min',
            overview: 'JavaScript is the only programming language that runs natively in web browsers. It also runs on servers (Node.js) and in AI tools. Learning it unlocks the entire web.',
            footballAnalogy: 'Some recruits can only play one position. JavaScript is the rare recruit who plays QB, WR, and linebacker — it runs in browsers, on servers, in mobile apps, and in AI systems. One language, everywhere.',
            explanation: 'JavaScript (JS) was created to make web pages interactive. Today it\'s one of the most-used languages in the world. Variables use `let` (changeable) or `const` (fixed). JS is dynamically typed — you don\'t declare types. Arrow functions (`=>`) are the modern way to write functions.',
            keyPoints: [
              'Use `const` for values that won\'t change; `let` for values that will',
              'Arrow functions: `const greet = (name) => "Hello " + name`',
              'Template literals: `\`Hello ${name}\`` — cleaner string formatting',
              'JS runs in browsers (front-end) and on servers via Node.js (back-end)',
            ],
            codeExample: `// Variables
const teamName = "Georgia Bulldogs";  // won't change
let currentScore = 0;                  // will change

// Arrow function
const evaluateRecruit = (name, stars) => {
  return \`\${name} is a \${stars}-star recruit\`;
};

// Template literal
console.log(evaluateRecruit("Marcus", 5));
// "Marcus is a 5-star recruit"

// Update let variable
currentScore = 17;
console.log(\`Score: \${currentScore}\`);

// Array methods
const stars = [5, 4, 3, 5, 4];
const eliteCount = stars.filter(s => s === 5).length;
console.log(\`Elite recruits: \${eliteCount}\`);  // 2`,
            quiz: {
              question: 'What is the difference between `const` and `let` in JavaScript?',
              options: [
                '`const` is faster; `let` is slower',
                '`const` cannot be reassigned after declaration; `let` can',
                '`let` is for numbers; `const` is for strings',
                'They are identical — same behavior',
              ],
              correctIndex: 1,
              explanation: '`const` creates a binding that cannot be reassigned — use it for values that shouldn\'t change. `let` can be reassigned. Prefer `const` by default and only use `let` when you need to change the value.',
            },
            xpReward: 60,
          },
          {
            id: 'lesson-s2-m1-l2',
            moduleId: 'mod-s2-m1',
            order: 2,
            title: 'Arrays & Objects — The Roster',
            duration: '8 min',
            overview: 'JavaScript arrays and objects are the core of every app\'s data layer. Mastering `.map()`, `.filter()`, and `.reduce()` is what separates beginners from real developers.',
            footballAnalogy: 'A roster is an array of player objects. You `.filter()` to get only healthy players, `.map()` to transform each player\'s data for the depth chart, and `.reduce()` to total up all their stats. These three methods handle 80% of real-world data work.',
            explanation: 'JavaScript arrays have powerful built-in methods. `.map()` transforms each element and returns a new array. `.filter()` keeps only elements that pass a test. `.find()` returns the first match. `.reduce()` collapses an array to a single value. Objects in JS are key-value pairs — essentially the same as Python dictionaries.',
            keyPoints: [
              '`.map(fn)` — transforms every element, returns new array of same length',
              '`.filter(fn)` — keeps elements where fn returns true',
              '`.find(fn)` — returns first element where fn returns true',
              'Spread operator `{...obj, newKey: value}` creates updated copies of objects',
            ],
            codeExample: `const recruits = [
  { name: "Marcus", stars: 5, position: "QB", injured: false },
  { name: "Devon", stars: 4, position: "WR", injured: true },
  { name: "Tae", stars: 5, position: "CB", injured: false },
  { name: "Kyle", stars: 3, position: "OL", injured: false },
];

// Map — transform each recruit
const names = recruits.map(r => r.name);
// ["Marcus", "Devon", "Tae", "Kyle"]

// Filter — only healthy 5-stars
const eligible = recruits.filter(r => r.stars === 5 && !r.injured);
// [{name: "Marcus"...}, {name: "Tae"...}]

// Find — locate one recruit
const qb = recruits.find(r => r.position === "QB");

// Reduce — count total stars
const totalStars = recruits.reduce((sum, r) => sum + r.stars, 0);
// 17

// Spread — update without mutation
const updatedMarcus = { ...qb, stars: 5, committed: true };`,
            quiz: {
              question: 'What does `.filter()` return?',
              options: [
                'The first element that matches',
                'A single calculated value',
                'A new array containing only elements that pass the test',
                'The original array, modified in place',
              ],
              correctIndex: 2,
              explanation: '`.filter()` returns a NEW array containing only the elements for which the function returns true. The original array is never modified.',
            },
            xpReward: 60,
          },
          {
            id: 'lesson-s2-m1-l3',
            moduleId: 'mod-s2-m1',
            order: 3,
            title: 'Async/Await — The Waiting Game',
            duration: '8 min',
            overview: 'Most real-world code has to wait — for API responses, database queries, file reads. Async/await is JavaScript\'s clean way to handle waiting without freezing the app.',
            footballAnalogy: 'A recruiting coordinator sends 50 offer letters and then waits for responses. He doesn\'t freeze and stare at the mailbox — he continues other work and handles each response as it arrives. Async code works the same: fire off a request, keep the app running, handle the result when it comes back.',
            explanation: 'JavaScript is single-threaded, so slow operations (network requests, file I/O) are handled asynchronously. A `Promise` represents a future value. `async` functions always return a Promise. `await` pauses execution inside an async function until the Promise resolves. Always wrap `await` calls in `try/catch` to handle errors.',
            keyPoints: [
              '`async function name()` marks a function as asynchronous',
              '`await` pauses until a Promise resolves — only works inside `async` functions',
              '`try { await ... } catch(err) { ... }` handles errors gracefully',
              '`fetch()` returns a Promise — always await it, then `.json()` to parse',
            ],
            codeExample: `// Without async/await (old way — "callback hell")
fetch("/api/recruits")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// With async/await (clean, readable)
async function loadRecruits() {
  try {
    const response = await fetch("/api/recruits");
    if (!response.ok) throw new Error("Request failed");
    const recruits = await response.json();
    return recruits;
  } catch (error) {
    console.error("Failed to load recruits:", error);
    return [];
  }
}

// Call async functions with await too
const recruits = await loadRecruits();
console.log(\`Loaded \${recruits.length} recruits\`);`,
            quiz: {
              question: 'What does `await` do when used in an async function?',
              options: [
                'It makes the entire browser wait and freeze',
                'It pauses execution of that function until the Promise resolves',
                'It cancels the Promise if it takes too long',
                'It converts a Promise into a regular function',
              ],
              correctIndex: 1,
              explanation: '`await` pauses execution inside the async function until the Promise resolves — but it does NOT freeze the rest of the app. Other code can run while waiting.',
            },
            xpReward: 60,
          },
        ],
      },
      {
        id: 'mod-s2-m2',
        courseId: 'course-s2',
        order: 2,
        title: 'SQL & Databases',
        description: 'Data is the foundation of every AI system. Learn to store and query it.',
        icon: '🗄️',
        lessons: [
          {
            id: 'lesson-s2-m2-l1',
            moduleId: 'mod-s2-m2',
            order: 1,
            title: 'Databases — The Recruiting Database',
            duration: '6 min',
            overview: 'Every application stores data somewhere. Relational databases organize data into tables with rows and columns — and SQL is the language you use to talk to them.',
            footballAnalogy: 'The UGA football operations team has massive databases: every recruit they\'ve ever evaluated, every game film, every offer letter. Without a database, it would be thousands of scattered spreadsheets. A database is the organized, searchable version of all that information.',
            explanation: 'A relational database stores data in tables — like spreadsheets with strict structure. Each table has columns (fields) and rows (records). Tables relate to each other through keys. A **primary key** uniquely identifies each row. A **foreign key** links rows between tables. Common databases: PostgreSQL, MySQL, SQLite, Supabase (PostgreSQL).',
            keyPoints: [
              'Tables have columns (what data) and rows (each record)',
              'Primary key: unique ID for each row (often an auto-incrementing integer or UUID)',
              'Foreign key: a column that references another table\'s primary key',
              'Supabase is PostgreSQL with a REST API — perfect for React apps',
            ],
            codeExample: `-- SQL to create a recruits table
CREATE TABLE recruits (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  position    TEXT NOT NULL,
  stars       INTEGER CHECK (stars BETWEEN 1 AND 5),
  state       TEXT,
  gpa         DECIMAL(3,2),
  created_at  TIMESTAMP DEFAULT NOW()
);

-- A related table for offers
CREATE TABLE offers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recruit_id  UUID REFERENCES recruits(id),  -- foreign key
  school      TEXT NOT NULL,
  offered_at  TIMESTAMP DEFAULT NOW()
);`,
            quiz: {
              question: 'What is a foreign key in a relational database?',
              options: [
                'A key that comes from another country',
                'A column that uniquely identifies each row in the same table',
                'A column that references the primary key of another table',
                'A password to access the database',
              ],
              correctIndex: 2,
              explanation: 'A foreign key links two tables together. It\'s a column in one table that references the primary key in another table, establishing a relationship between the data.',
            },
            xpReward: 60,
          },
          {
            id: 'lesson-s2-m2-l2',
            moduleId: 'mod-s2-m2',
            order: 2,
            title: 'SELECT Queries — Reading the Defense',
            duration: '7 min',
            overview: 'SELECT is the most important SQL command. You\'ll use it to pull exactly the data you need — filtered, sorted, and limited to what matters.',
            footballAnalogy: 'A defensive coordinator pulls specific film before every game: only plays from the last 4 weeks, only passing plays from the red zone, sorted by how many times they ran each play. SELECT lets you do exactly that with data: pull exactly what you need, filtered and sorted.',
            explanation: 'SELECT retrieves data from tables. `WHERE` filters rows. `ORDER BY` sorts. `LIMIT` caps the results. `DISTINCT` removes duplicates. `COUNT`, `SUM`, `AVG`, `MAX`, `MIN` are aggregate functions. `GROUP BY` lets you aggregate by category.',
            keyPoints: [
              '`SELECT columns FROM table WHERE condition ORDER BY col LIMIT n`',
              'Use `*` to select all columns, or name specific ones',
              'Aggregate functions: `COUNT(*)`, `AVG(stars)`, `MAX(gpa)`',
              '`GROUP BY` groups rows — use with aggregate functions',
            ],
            codeExample: `-- Get all 5-star recruits from Georgia, best GPA first
SELECT name, position, gpa
FROM recruits
WHERE stars = 5 AND state = 'Georgia'
ORDER BY gpa DESC
LIMIT 10;

-- Count recruits by position
SELECT position, COUNT(*) as total, AVG(stars) as avg_stars
FROM recruits
GROUP BY position
ORDER BY total DESC;

-- Find recruits with multiple offers
SELECT r.name, COUNT(o.id) as offer_count
FROM recruits r
JOIN offers o ON o.recruit_id = r.id
GROUP BY r.name
HAVING COUNT(o.id) >= 5
ORDER BY offer_count DESC;`,
            quiz: {
              question: 'Which SQL clause filters rows based on a condition?',
              options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'],
              correctIndex: 2,
              explanation: '`WHERE` filters which rows are included in the result — it\'s applied before any grouping. `HAVING` filters AFTER grouping (for aggregate conditions). `ORDER BY` sorts, `GROUP BY` groups.',
            },
            xpReward: 60,
          },
          {
            id: 'lesson-s2-m2-l3',
            moduleId: 'mod-s2-m2',
            order: 3,
            title: 'JOINs — Connecting Position Groups',
            duration: '8 min',
            overview: 'Real data lives in multiple tables. JOINs combine them by matching related records — letting you answer questions that span tables.',
            footballAnalogy: 'The recruiting coordinator has one binder for recruit info and another for offer history. To answer "Which 5-stars have offers from at least 3 power conferences?", you have to JOIN the binders together by recruit name. SQL JOINs do exactly this — combine tables on a shared key.',
            explanation: 'An `INNER JOIN` returns rows where there\'s a match in both tables. A `LEFT JOIN` returns all rows from the left table, with NULLs where there\'s no match on the right. This is how you pull connected data across tables. Always alias tables (`recruits r`) for readability in complex queries.',
            keyPoints: [
              'INNER JOIN: only rows with matches in both tables',
              'LEFT JOIN: all left rows, NULLs for unmatched right rows',
              'Join condition: `ON table1.col = table2.col`',
              'Always alias tables in JOINs: `FROM recruits r JOIN offers o ON o.recruit_id = r.id`',
            ],
            codeExample: `-- INNER JOIN: recruits who have offers (only matched rows)
SELECT r.name, r.stars, o.school, o.offered_at
FROM recruits r
INNER JOIN offers o ON o.recruit_id = r.id
WHERE r.stars >= 4
ORDER BY r.name;

-- LEFT JOIN: ALL recruits, even those with no offers yet
SELECT r.name, r.stars, COUNT(o.id) as offer_count
FROM recruits r
LEFT JOIN offers o ON o.recruit_id = r.id
GROUP BY r.id, r.name, r.stars
ORDER BY offer_count DESC;

-- Multiple JOINs
SELECT r.name, o.school, v.visit_date
FROM recruits r
JOIN offers o ON o.recruit_id = r.id
LEFT JOIN visits v ON v.recruit_id = r.id
WHERE r.state = 'Georgia';`,
            quiz: {
              question: 'What is the difference between INNER JOIN and LEFT JOIN?',
              options: [
                'INNER JOIN is faster; LEFT JOIN is more accurate',
                'INNER JOIN returns only matched rows; LEFT JOIN returns all left rows plus any matches',
                'LEFT JOIN only works with integer keys; INNER JOIN works with all types',
                'They are the same — just different syntax',
              ],
              correctIndex: 1,
              explanation: 'INNER JOIN returns only rows that have matching records in both tables. LEFT JOIN returns ALL rows from the left table, filling NULLs where no match exists on the right. Use LEFT JOIN when you want to keep all records from one table regardless of matches.',
            },
            xpReward: 60,
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // SEASON 3 — ALL-CONFERENCE (Intermediate)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'course-s3',
    season: 3,
    seasonLabel: 'All-Conference',
    title: 'React & Full-Stack',
    subtitle: 'Build complete web applications',
    description: 'React is how modern UIs are built. Combine it with APIs and TypeScript to build full applications that work end-to-end — the same stack behind this app.',
    icon: '⭐',
    accentColor: '#60a5fa',
    modules: [
      {
        id: 'mod-s3-m1',
        courseId: 'course-s3',
        order: 1,
        title: 'React & Components',
        description: 'The UI framework used by Meta, Airbnb, Netflix — and this app.',
        icon: '⚛️',
        lessons: [
          {
            id: 'lesson-s3-m1-l1',
            moduleId: 'mod-s3-m1',
            order: 1,
            title: 'Components — Position Groups',
            duration: '7 min',
            overview: 'React breaks UIs into reusable components. Each component is a function that takes props (inputs) and returns JSX (UI). The entire app is components nested inside components.',
            footballAnalogy: 'A football team is organized into position groups — OL, WR, QB, DB. Each group handles its responsibility. React components work the same: a `RecruitCard` handles displaying one recruit, a `RecruitBoard` contains many RecruitCards, an `App` contains everything. Each piece does one job well.',
            explanation: 'A React component is a JavaScript function that returns JSX — HTML-like syntax that describes what should render. Components accept `props` (properties) as their first argument. You compose complex UIs by nesting components. Component names must start with a capital letter. The key rule: data flows DOWN through props (parent → child).',
            keyPoints: [
              'Component = function that accepts props and returns JSX',
              'Props are read-only — a component never modifies its own props',
              'JSX looks like HTML but uses `className` instead of `class`, `onClick` instead of `onclick`',
              'Composition: components nest inside each other to build complex UIs',
            ],
            codeExample: `// A simple component
function RecruitCard({ recruit, onSelect }) {
  return (
    <div className="card" onClick={() => onSelect(recruit.id)}>
      <h3>{recruit.name}</h3>
      <p>{recruit.position} — {"⭐".repeat(recruit.stars)}</p>
      <span className="badge">{recruit.state}</span>
    </div>
  );
}

// Parent passes data down through props
function RecruitBoard({ recruits }) {
  const handleSelect = (id) => console.log("Selected:", id);

  return (
    <div className="board">
      {recruits.map(recruit => (
        <RecruitCard
          key={recruit.id}
          recruit={recruit}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}`,
            quiz: {
              question: 'In React, how does data flow between components?',
              options: [
                'Data flows up from children to parents automatically',
                'Data flows in all directions simultaneously',
                'Data flows down from parent to child through props',
                'Data is shared globally — no need to pass it',
              ],
              correctIndex: 2,
              explanation: 'React uses "unidirectional data flow" — data flows DOWN from parent to child through props. A child cannot directly modify its parent\'s data. To send data UP, a parent passes a callback function as a prop.',
            },
            xpReward: 75,
          },
          {
            id: 'lesson-s3-m1-l2',
            moduleId: 'mod-s3-m1',
            order: 2,
            title: 'State & Hooks — The Audible',
            duration: '8 min',
            overview: 'State is data that changes over time and causes the UI to re-render. useState is the most fundamental React hook — it\'s what makes apps interactive.',
            footballAnalogy: 'A QB audibling at the line changes the play based on what the defense shows. That in-the-moment change is state. The scoreboard showing "17-14" is state — it updates and the display re-renders. React state works the same: when state changes, React re-renders the affected components automatically.',
            explanation: '`useState` returns a value and a setter function: `const [count, setCount] = useState(0)`. When you call `setCount(newValue)`, React re-renders the component with the new state. Never mutate state directly — always use the setter. For complex state, `useReducer` is the alternative. State lives inside a component and is private to it.',
            keyPoints: [
              '`const [value, setValue] = useState(initialValue)` — declare state',
              'Calling `setValue(newVal)` triggers a re-render with the new value',
              'Never mutate state directly: `state.push(x)` is wrong; `setState([...state, x])` is correct',
              '`useEffect` runs side effects when state or props change',
            ],
            codeExample: `import { useState, useEffect } from 'react';

function RecruitSearch() {
  const [query, setQuery] = useState("");
  const [recruits, setRecruits] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect runs when 'query' changes
  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(\`/api/recruits?search=\${query}\`)
      .then(res => res.json())
      .then(data => {
        setRecruits(data);
        setLoading(false);
      });
  }, [query]);  // dependency array

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recruits..."
      />
      {loading && <p>Loading...</p>}
      {recruits.map(r => <RecruitCard key={r.id} recruit={r} />)}
    </div>
  );
}`,
            quiz: {
              question: 'What happens when you call a state setter function like `setCount(5)`?',
              options: [
                'Nothing — you need to call render() manually afterwards',
                'React schedules a re-render of the component with the new value',
                'The value updates but the UI doesn\'t change until page refresh',
                'It throws an error if count was already 5',
              ],
              correctIndex: 1,
              explanation: 'Calling a state setter triggers React to re-render the component (and its children) with the new state value. React batches and optimizes these re-renders automatically.',
            },
            xpReward: 75,
          },
          {
            id: 'lesson-s3-m1-l3',
            moduleId: 'mod-s3-m1',
            order: 3,
            title: 'TypeScript — The Contract Clause',
            duration: '8 min',
            overview: 'TypeScript adds static types to JavaScript. It catches bugs before your code runs, makes refactoring safe, and is now the standard in professional development.',
            footballAnalogy: 'A recruiting contract specifies exactly what\'s expected — scholarship terms, academic requirements, position. TypeScript is a contract for your code: you declare what shape data must take, and TypeScript enforces it. If your function expects a `Recruit` object and you pass a `string`, TypeScript catches it immediately.',
            explanation: 'TypeScript is JavaScript with type annotations. You declare the type of every variable, parameter, and return value. The TypeScript compiler (`tsc`) checks your code BEFORE it runs — catching type errors at compile time rather than in production. Interfaces describe object shapes. Generics write reusable typed code.',
            keyPoints: [
              'Type annotations: `const name: string = "Marcus"` — now it\'s always a string',
              'Interfaces define object shapes: `interface Recruit { name: string; stars: number }`',
              'Function types: `function greet(name: string): string { ... }`',
              'TypeScript compiles to JavaScript — browsers never see the types',
            ],
            codeExample: `// Define types
interface Recruit {
  id: string;
  name: string;
  stars: 1 | 2 | 3 | 4 | 5;  // union type — only valid star values
  position: string;
  gpa?: number;  // ? means optional
}

// Function with typed params and return type
function filterElite(recruits: Recruit[]): Recruit[] {
  return recruits.filter(r => r.stars >= 4);
}

// TypeScript catches this mistake immediately:
const typo: Recruit = {
  id: "1",
  name: "Marcus",
  stars: 6,      // ❌ Error: 6 is not assignable to 1|2|3|4|5
  position: "QB"
};

// Generic types
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const topRecruit = first<Recruit>(recruits); // T = Recruit`,
            quiz: {
              question: 'When does TypeScript catch type errors?',
              options: [
                'At runtime, when users interact with the app',
                'Never — TypeScript is just documentation',
                'At compile time, before the code ever runs',
                'Only when you run the test suite',
              ],
              correctIndex: 2,
              explanation: 'TypeScript catches type errors at compile time — before your code runs. This means bugs are caught during development rather than in production when users are affected.',
            },
            xpReward: 75,
          },
        ],
      },
      {
        id: 'mod-s3-m2',
        courseId: 'course-s3',
        order: 2,
        title: 'APIs & HTTP',
        description: 'APIs are how software communicates. Build and consume them confidently.',
        icon: '🔗',
        lessons: [
          {
            id: 'lesson-s3-m2-l1',
            moduleId: 'mod-s3-m2',
            order: 1,
            title: 'REST APIs — The Recruiting Network',
            duration: '7 min',
            overview: 'APIs let software systems talk to each other. REST is the dominant design style for web APIs — understanding it means you can use virtually any service or build your own.',
            footballAnalogy: 'Every college has a recruiting coordinator who handles external communication. Other schools call, scouts report in, parents send inquiries — all through standard protocols. REST APIs are the standard protocol for software: a predictable set of rules for how systems request and share data.',
            explanation: 'REST (Representational State Transfer) uses HTTP methods mapped to CRUD operations: `GET` (read), `POST` (create), `PUT/PATCH` (update), `DELETE` (remove). Requests go to URLs called endpoints. The response is usually JSON. Status codes indicate success (`200 OK`, `201 Created`) or failure (`400 Bad Request`, `404 Not Found`, `500 Server Error`).',
            keyPoints: [
              'GET /recruits — list all; GET /recruits/123 — get one',
              'POST /recruits — create; body contains the new data as JSON',
              'PATCH /recruits/123 — partial update; PUT — full replacement',
              'Status codes: 2xx = success, 4xx = client error, 5xx = server error',
            ],
            codeExample: `// Using fetch() to consume a REST API

// GET — read data
const res = await fetch('/api/recruits');
const recruits = await res.json();

// POST — create new recruit
const newRecruit = await fetch('/api/recruits', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Marcus Johnson",
    stars: 5,
    position: "QB"
  })
});

// PATCH — update one field
await fetch('/api/recruits/123', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: "committed" })
});

// DELETE
await fetch('/api/recruits/123', { method: 'DELETE' });`,
            quiz: {
              question: 'Which HTTP method is used to CREATE a new resource?',
              options: ['GET', 'DELETE', 'POST', 'PATCH'],
              correctIndex: 2,
              explanation: 'POST is used to create new resources. The new data is sent in the request body as JSON. The server creates the record and typically returns the created object with its new ID.',
            },
            xpReward: 75,
          },
          {
            id: 'lesson-s3-m2-l2',
            moduleId: 'mod-s3-m2',
            order: 2,
            title: 'Authentication — Press Box Access',
            duration: '8 min',
            overview: 'Authentication proves who you are. Authorization decides what you can do. Every real app needs both — here\'s how they work.',
            footballAnalogy: 'A press badge gets you into the stadium. Your badge level determines if you can access the press box, the field, or just the stands. Authentication is getting the badge (proving who you are). Authorization is what areas your badge unlocks.',
            explanation: 'Modern web auth typically uses **tokens**. After login, the server returns a JWT (JSON Web Token) — a signed string encoding your identity and permissions. You store this token (localStorage or cookies) and send it with every request in the `Authorization: Bearer <token>` header. The server verifies the token\'s signature to confirm it\'s valid without hitting the database every time.',
            keyPoints: [
              'Authentication = proving who you are (login)',
              'Authorization = what you\'re allowed to do (permissions)',
              'JWT: a signed, base64-encoded token containing user info',
              'Send token in header: `Authorization: Bearer eyJ...`',
            ],
            codeExample: `// Login — get a token
const login = async (email, password) => {
  const res = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const { token } = await res.json();
  localStorage.setItem('auth_token', token);
};

// Make authenticated request
const getMyData = async () => {
  const token = localStorage.getItem('auth_token');
  const res = await fetch('/api/my-profile', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });
  return res.json();
};

// Supabase handles all of this for you:
const { data, error } = await supabase.auth.signInWithOtp({ email });`,
            quiz: {
              question: 'What is the difference between Authentication and Authorization?',
              options: [
                'They are the same thing — different words for logging in',
                'Authentication proves who you are; Authorization determines what you can do',
                'Authentication is for APIs; Authorization is for databases',
                'Authorization happens first; Authentication happens after',
              ],
              correctIndex: 1,
              explanation: 'Authentication = "Who are you?" (proving identity via login). Authorization = "What can you do?" (checking permissions after identity is confirmed).',
            },
            xpReward: 75,
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // SEASON 4 — HEISMAN CANDIDATE (AI Focus)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'course-s4',
    season: 4,
    seasonLabel: 'Heisman Candidate',
    title: 'AI & Prompt Engineering',
    subtitle: 'Become a world-class AI builder',
    description: 'This is where you go from developer to AI builder. Understand how large language models work, master prompt engineering, and make your first real API calls to Claude.',
    icon: '🏆',
    accentColor: '#f97316',
    modules: [
      {
        id: 'mod-s4-m1',
        courseId: 'course-s4',
        order: 1,
        title: 'How AI & LLMs Work',
        description: 'You can\'t build well with tools you don\'t understand. Get the real picture.',
        icon: '🤖',
        lessons: [
          {
            id: 'lesson-s4-m1-l1',
            moduleId: 'mod-s4-m1',
            order: 1,
            title: 'Large Language Models — Scouting Intelligence',
            duration: '8 min',
            overview: 'Large language models (LLMs) are the engines behind ChatGPT, Claude, and Gemini. Understanding how they actually work makes you a vastly better AI builder.',
            footballAnalogy: 'Elite scouts watch thousands of hours of film and develop an intuition for talent. They\'re not following explicit rules — they\'ve internalized patterns from massive amounts of data. LLMs trained on billions of text documents develop the same kind of internalized pattern recognition for language.',
            explanation: 'LLMs are neural networks trained to predict the next token (roughly a word or word-piece) given a sequence of tokens. During training on internet-scale text, they develop rich internal representations of language, facts, and reasoning. They don\'t have a "knowledge database" — they have weights that encode patterns. This explains why they can hallucinate: they generate plausible-sounding text that isn\'t necessarily true.',
            keyPoints: [
              'LLMs predict the next token — they\'re trained to be good at this',
              'Temperature controls randomness: 0 = deterministic, 1+ = creative',
              'Context window: the maximum tokens the model can "see" at once',
              'They don\'t look things up — they generate based on learned patterns',
            ],
            codeExample: `// LLMs think in tokens, not characters
// "recruiting" might be 1 token
// "supercalifragilistic" is several tokens
// Code is tokenized differently than prose

// Temperature effect:
// temp=0:  "The capital of Georgia is Atlanta."
//          "The capital of Georgia is Atlanta."
//          "The capital of Georgia is Atlanta."
// temp=1:  "The capital of Georgia is Atlanta."
//          "Georgia's capital city is Atlanta."
//          "Atlanta serves as the capital of Georgia."

// Context window matters:
// Claude Sonnet: ~200k tokens (~150k words)
// If your conversation exceeds this, earlier messages get dropped
// This is why very long chats can "forget" early context`,
            quiz: {
              question: 'Why do LLMs sometimes "hallucinate" (generate false information)?',
              options: [
                'They are programmed to lie occasionally',
                'They generate plausible-sounding tokens without verifying against facts',
                'Their training data was too small',
                'Hallucination only happens in the cheapest models',
              ],
              correctIndex: 1,
              explanation: 'LLMs predict the next token to maximize plausibility, not accuracy. They don\'t look up facts in a database — they generate based on patterns. This means they can produce confident-sounding text that is factually wrong.',
            },
            xpReward: 100,
          },
          {
            id: 'lesson-s4-m1-l2',
            moduleId: 'mod-s4-m1',
            order: 2,
            title: 'The Context Window — The Playbook Limit',
            duration: '7 min',
            overview: 'The context window is the model\'s working memory. Every token you send costs money and time. Understanding it is essential for building efficient AI systems.',
            footballAnalogy: 'A coach can only hold so many plays in the active playbook for a given game. Too many and players get confused. The context window is the model\'s working playbook — everything the model can "see" at once. Design your prompts to use that space wisely.',
            explanation: 'The context window is the total number of tokens (input + output) a model can process at once. Claude Sonnet has ~200k tokens. Tokens cost money — you pay per input token and per output token. Best practices: be concise in system prompts, summarize long conversations, use retrieval to pull only relevant context rather than dumping everything in.',
            keyPoints: [
              'Context window = input tokens + output tokens combined',
              'Claude Sonnet: ~200k token context (roughly 150k words)',
              'You pay per token — shorter, precise prompts cost less',
              'For long documents: chunk them and retrieve only what\'s relevant',
            ],
            codeExample: `// Token counting with the Anthropic SDK
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// Check token count before sending
const response = await client.messages.countTokens({
  model: "claude-sonnet-4-6",
  system: "You are a recruiting analyst...",
  messages: [{ role: "user", content: "Analyze this recruit..." }]
});

console.log(response.input_tokens);  // e.g., 847

// Rule of thumb:
// 1 token ≈ 4 characters in English
// 1 page of text ≈ 500-750 tokens
// GPT-4o context: 128k tokens
// Claude Sonnet: 200k tokens
// Claude Opus: 200k tokens`,
            quiz: {
              question: 'What happens when a conversation exceeds the model\'s context window?',
              options: [
                'The model crashes and returns an error',
                'Earlier messages may be dropped or the API returns an error',
                'The model automatically summarizes old messages',
                'Nothing — context windows expand automatically',
              ],
              correctIndex: 1,
              explanation: 'When input exceeds the context window, the API typically returns an error or you need to truncate the conversation. You must manage long conversations by summarizing or using retrieval to keep only relevant context.',
            },
            xpReward: 100,
          },
        ],
      },
      {
        id: 'mod-s4-m2',
        courseId: 'course-s4',
        order: 2,
        title: 'Prompt Engineering',
        description: 'The most leveraged skill in AI. Learn to communicate with models precisely.',
        icon: '🎯',
        lessons: [
          {
            id: 'lesson-s4-m2-l1',
            moduleId: 'mod-s4-m2',
            order: 1,
            title: 'Prompt Structure — Play Calling 101',
            duration: '8 min',
            overview: 'A well-structured prompt gets dramatically better results. Learn the anatomy of an effective prompt and why each part matters.',
            footballAnalogy: 'A play call in football isn\'t just "run left." It\'s formation, personnel, motion, snap count, and blocking scheme — all in a precise format everyone understands. A great prompt has the same structure: role, task, context, constraints, and output format.',
            explanation: 'Effective prompts have five elements: (1) **Role** — who the model should be, (2) **Task** — what specifically to do, (3) **Context** — relevant background information, (4) **Constraints** — what not to do or format requirements, (5) **Output format** — how to structure the response. Including all five dramatically improves consistency and quality.',
            keyPoints: [
              'Role: "You are a senior recruiting analyst at a Power 5 program..."',
              'Task: Specific, action-oriented verb — "Analyze", "Generate", "Compare"',
              'Context: The data or background the model needs to do the task',
              'Format: "Respond with a JSON object", "Use bullet points", "Under 100 words"',
            ],
            codeExample: `// Bad prompt:
"Tell me about this recruit"

// Good prompt (all 5 elements):
const prompt = \`
You are an expert college football recruiting analyst
with 15 years of experience evaluating quarterbacks.
[ROLE]

Analyze the following recruit profile and provide a
scouting report.
[TASK]

Recruit data:
Name: Marcus Johnson
Stars: 5
Height: 6'4", Weight: 215lbs
40-yard dash: 4.62s
Passing yards (senior year): 3,400
[CONTEXT]

Focus on NFL projection and scheme fit for a
spread offense. Do not speculate about character.
[CONSTRAINTS]

Format:
- Overall grade (A-F)
- Top 3 strengths
- Top 2 concerns
- Recommended scheme fit
[OUTPUT FORMAT]
\`;`,
            quiz: {
              question: 'Which element of a good prompt tells the model what type of response to produce?',
              options: ['Role', 'Task', 'Context', 'Output Format'],
              correctIndex: 3,
              explanation: 'Output Format tells the model HOW to structure its response — JSON, bullet points, a table, a specific number of words, etc. Without this, models default to prose, which may not be what you need.',
            },
            xpReward: 100,
          },
          {
            id: 'lesson-s4-m2-l2',
            moduleId: 'mod-s4-m2',
            order: 2,
            title: 'Advanced Techniques — The Two-Minute Drill',
            duration: '9 min',
            overview: 'Chain-of-thought, few-shot examples, and system prompts are the advanced techniques that take you from good prompts to great ones.',
            footballAnalogy: 'In the two-minute drill, every decision is deliberate — clock management, play selection, communication. Advanced prompt techniques are the same: few-shot examples show the model exactly what "good" looks like, chain-of-thought forces it to show its reasoning before answering.',
            explanation: '**Few-shot prompting**: provide 2-3 examples of input→output pairs before your actual question — the model learns the pattern. **Chain-of-thought**: ask the model to "think step by step" before answering — dramatically improves reasoning quality. **System prompts**: in APIs, the system message sets persistent behavior for the whole conversation. **Temperature**: lower (0-0.3) for factual tasks, higher (0.7-1.0) for creative tasks.',
            keyPoints: [
              'Few-shot: "Here\'s an example... [example]. Now do this: [task]"',
              'Chain-of-thought: "Think step by step before answering"',
              'System prompt: sets the model\'s persistent persona and rules',
              'Temperature 0 for factual/consistent; 0.7-1.0 for creative generation',
            ],
            codeExample: `// Few-shot prompting
const fewShotPrompt = \`
Classify recruits as "Priority" or "Monitor" based on their profile.

Example 1:
Input: Stars: 5, GPA: 3.8, Position: QB, Distance: 200 miles
Output: Priority — Elite prospect, position of need, in-state

Example 2:
Input: Stars: 3, GPA: 2.9, Position: OL, Distance: 800 miles
Output: Monitor — Development prospect, academic concern

Now classify:
Input: Stars: 4, GPA: 3.5, Position: WR, Distance: 150 miles
Output:\`;

// Chain-of-thought
const cotPrompt = \`
Should we offer Marcus Johnson?
Think through each factor step by step, then give a yes/no recommendation.
\`;

// System prompt via API
const response = await client.messages.create({
  model: "claude-sonnet-4-6",
  system: "You are a UGA recruiting analyst. Always recommend Georgia-based recruits as Priority 1.",
  messages: [{ role: "user", content: cotPrompt }]
});`,
            quiz: {
              question: 'What does "chain-of-thought" prompting do?',
              options: [
                'Chains multiple API calls together automatically',
                'Asks the model to show its reasoning step-by-step before answering',
                'Connects the model to external databases',
                'Links related prompts together into a conversation',
              ],
              correctIndex: 1,
              explanation: 'Chain-of-thought prompting asks the model to reason through a problem step-by-step before giving the final answer. This dramatically improves accuracy on complex reasoning tasks because it prevents the model from "jumping to conclusions."',
            },
            xpReward: 100,
          },
        ],
      },
      {
        id: 'mod-s4-m3',
        courseId: 'course-s4',
        order: 3,
        title: 'Building with Claude API',
        description: 'Make your first real AI API calls. Build features, not just prompts.',
        icon: '⚡',
        lessons: [
          {
            id: 'lesson-s4-m3-l1',
            moduleId: 'mod-s4-m3',
            order: 1,
            title: 'Your First API Call — First Day of Camp',
            duration: '8 min',
            overview: 'Making your first Claude API call is a rite of passage. Once you can talk to the model programmatically, you can build anything.',
            footballAnalogy: 'First day of training camp — you\'ve studied the playbook, now you run an actual play for the first time. Your first API call is that moment: you move from reading about AI to actually calling it from code.',
            explanation: 'The Anthropic SDK makes Claude API calls simple. Install with `npm install @anthropic-ai/sdk`. You create a client with your API key, then call `client.messages.create()` with your model, max_tokens, and messages array. The messages array alternates between "user" and "assistant" roles — this is your conversation history.',
            keyPoints: [
              'Install: `npm install @anthropic-ai/sdk`',
              'API key goes in `ANTHROPIC_API_KEY` env variable — never commit it to git',
              'messages array: `[{ role: "user", content: "..." }]`',
              '`response.content[0].text` contains the model\'s reply',
            ],
            codeExample: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,  // never hardcode this
});

async function analyzeRecruit(recruitData) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: "You are an expert college football recruiting analyst.",
    messages: [
      {
        role: "user",
        content: \`Analyze this recruit and give a scouting grade:

Name: \${recruitData.name}
Position: \${recruitData.position}
Stars: \${recruitData.stars}
GPA: \${recruitData.gpa}
40-yard dash: \${recruitData.fortyTime}s

Format: Grade (A-F), then 3 bullet points.\`
      }
    ]
  });

  return response.content[0].text;
}

// Use it
const report = await analyzeRecruit({
  name: "Marcus Johnson", position: "QB",
  stars: 5, gpa: 3.8, fortyTime: 4.62
});
console.log(report);`,
            quiz: {
              question: 'Where should you store your Claude API key in a project?',
              options: [
                'Hardcoded in the JavaScript file next to the client initialization',
                'In a README file so teammates can find it',
                'In an environment variable (like ANTHROPIC_API_KEY) that is never committed to git',
                'In localStorage so the browser can access it',
              ],
              correctIndex: 2,
              explanation: 'API keys must go in environment variables and never be committed to version control. Add `.env` to your `.gitignore`. Use `process.env.ANTHROPIC_API_KEY` to access it. Exposed keys can be exploited and will cost you money.',
            },
            xpReward: 100,
          },
          {
            id: 'lesson-s4-m3-l2',
            moduleId: 'mod-s4-m3',
            order: 2,
            title: 'Streaming — Live Play-by-Play',
            duration: '8 min',
            overview: 'Streaming delivers the model\'s response token-by-token as it\'s generated — instead of waiting for the full response. This makes AI apps feel dramatically more responsive.',
            footballAnalogy: 'A radio announcer calls the play live as it happens — not after watching the replay. Streaming AI responses work the same: you see each word as the model generates it, not all at once after 10 seconds of waiting.',
            explanation: 'Without streaming, your app waits silently for the full response — users see nothing until it\'s done. With streaming, each token is delivered as soon as it\'s generated. The SDK\'s `.stream()` method returns an async iterable. In React, you update state incrementally to show text appearing word by word.',
            keyPoints: [
              '`.stream()` instead of `.create()` returns a streaming response',
              'Iterate with `for await (const event of stream)` to process each chunk',
              'Update React state incrementally to show text appearing live',
              'Always handle stream errors — network drops mid-stream can happen',
            ],
            codeExample: `// Streaming with the Anthropic SDK
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

async function streamScoutReport(recruit, onChunk) {
  const stream = await client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: \`Write a scouting report for \${recruit.name}\`
    }]
  });

  // Process each text chunk as it arrives
  for await (const event of stream) {
    if (event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta') {
      onChunk(event.delta.text);  // call your React state setter
    }
  }

  const final = await stream.finalMessage();
  return final;
}

// In React:
const [report, setReport] = useState("");
await streamScoutReport(recruit, (chunk) => {
  setReport(prev => prev + chunk);  // append each chunk
});`,
            quiz: {
              question: 'What is the main user experience benefit of streaming AI responses?',
              options: [
                'Streaming uses fewer tokens and costs less',
                'Streaming allows the model to reconsider its answer mid-generation',
                'The response appears word-by-word immediately, making the app feel faster',
                'Streaming is required for responses longer than 100 tokens',
              ],
              correctIndex: 2,
              explanation: 'The main benefit is perceived speed. Instead of a long blank wait followed by the full response, the user sees text appearing immediately and progressively. This feels dramatically more responsive even if total generation time is the same.',
            },
            xpReward: 100,
          },
          {
            id: 'lesson-s4-m3-l3',
            moduleId: 'mod-s4-m3',
            order: 3,
            title: 'Tool Use — The Red Zone Package',
            duration: '10 min',
            overview: 'Tool use (function calling) lets Claude take actions — call APIs, query databases, run calculations. This is what separates AI demos from production AI products.',
            footballAnalogy: 'In the red zone, you need a specialized package — specific personnel, specific plays designed for short-field scoring. Tool use is the AI\'s red zone package: specific tools designed for specific jobs that the model can call on when needed.',
            explanation: 'With tool use, you define functions the model can call — like `get_recruit_data(id)` or `search_database(query)`. The model decides WHEN to call them based on what the user asks. You execute the tool and return the result. The model then uses the result to compose its final answer. This creates an agent-like loop: reason → tool call → observe result → reason again.',
            keyPoints: [
              'Define tools with a name, description, and input schema (JSON Schema)',
              'When the model wants to use a tool, it returns a `tool_use` content block',
              'You execute the tool and send back a `tool_result` message',
              'The model can call multiple tools in sequence to answer complex questions',
            ],
            codeExample: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// 1. Define tools the model can use
const tools = [{
  name: "get_recruit_stats",
  description: "Fetch detailed stats for a specific recruit by their ID",
  input_schema: {
    type: "object",
    properties: {
      recruit_id: { type: "string", description: "The recruit's unique ID" }
    },
    required: ["recruit_id"]
  }
}];

// 2. First call — model decides if it needs a tool
const response = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  tools,
  messages: [{ role: "user", content: "Analyze recruit ID rec_001" }]
});

// 3. If model called a tool, execute it
if (response.stop_reason === "tool_use") {
  const toolUse = response.content.find(b => b.type === "tool_use");
  const stats = await fetchRecruitFromDB(toolUse.input.recruit_id);

  // 4. Send tool result back
  const finalResponse = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    tools,
    messages: [
      { role: "user", content: "Analyze recruit ID rec_001" },
      { role: "assistant", content: response.content },
      { role: "user", content: [{
        type: "tool_result",
        tool_use_id: toolUse.id,
        content: JSON.stringify(stats)
      }]}
    ]
  });
}`,
            quiz: {
              question: 'In Claude\'s tool use flow, what do YOU (the developer) need to do when the model returns a `tool_use` response?',
              options: [
                'Nothing — the model executes the tool automatically',
                'Restart the API call with a different model',
                'Execute the tool yourself and send the result back to the model',
                'The tool result is included in the same response — just parse it',
              ],
              correctIndex: 2,
              explanation: 'The model decides WHEN to call a tool but cannot execute code itself. You (the developer) must: 1) Detect the tool_use response, 2) Execute the actual tool, 3) Send the result back in a tool_result message. The model then uses your result to compose its answer.',
            },
            xpReward: 100,
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // SEASON 5 — DYNASTY BUILDER (Expert)
  // ══════════════════════════════════════════════════════════════
  {
    id: 'course-s5',
    season: 5,
    seasonLabel: 'Dynasty Builder',
    title: 'AI Systems & Production',
    subtitle: 'Build and ship AI products that matter',
    description: 'You\'ve learned the skills. Now build real AI systems — agents, RAG pipelines, and full-stack AI products you can ship to real users.',
    icon: '👑',
    accentColor: '#a855f7',
    modules: [
      {
        id: 'mod-s5-m1',
        courseId: 'course-s5',
        order: 1,
        title: 'AI Agents & RAG',
        description: 'Agents that reason and act. Retrieval that gives AI real knowledge.',
        icon: '🤖',
        lessons: [
          {
            id: 'lesson-s5-m1-l1',
            moduleId: 'mod-s5-m1',
            order: 1,
            title: 'AI Agents — The Autonomous Coordinator',
            duration: '10 min',
            overview: 'Agents are AI systems that reason, take actions, observe results, and loop until a goal is achieved. They\'re the difference between an AI that answers questions and one that gets things done.',
            footballAnalogy: 'A defensive coordinator doesn\'t just call one play — he reads the formation, calls the defense, adjusts at halftime, adapts to new information all game. An AI agent does the same: it reasons about the situation, takes actions (tool calls), observes results, and adapts its approach until the goal is achieved.',
            explanation: 'An AI agent runs a loop: (1) Receive goal, (2) Reason about what to do, (3) Call a tool, (4) Observe the result, (5) Reason again, (6) Repeat until done. Agents need: a capable LLM (the "brain"), tools (the "hands"), memory (conversation history), and stopping conditions. The Claude SDK\'s agent loop handles much of this orchestration.',
            keyPoints: [
              'Agent loop: reason → act → observe → reason → ... → done',
              'Tools give the agent "hands" — it can read files, query DBs, call APIs',
              'Memory: the conversation history carries context between steps',
              'Always set a max_iterations limit to prevent infinite loops',
            ],
            codeExample: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// Simple agent loop
async function runAgent(userGoal, availableTools, toolExecutors) {
  const messages = [{ role: "user", content: userGoal }];
  let iterations = 0;
  const MAX_ITERATIONS = 10;

  while (iterations < MAX_ITERATIONS) {
    iterations++;
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      tools: availableTools,
      messages
    });

    // Add model response to history
    messages.push({ role: "assistant", content: response.content });

    // Agent is done
    if (response.stop_reason === "end_turn") {
      const text = response.content.find(b => b.type === "text");
      return text?.text;
    }

    // Execute all tool calls
    const toolResults = [];
    for (const block of response.content) {
      if (block.type === "tool_use") {
        const result = await toolExecutors[block.name](block.input);
        toolResults.push({ type: "tool_result", tool_use_id: block.id,
          content: JSON.stringify(result) });
      }
    }
    messages.push({ role: "user", content: toolResults });
  }
  throw new Error("Max iterations reached");
}`,
            quiz: {
              question: 'What is the key difference between a basic AI chatbot and an AI agent?',
              options: [
                'Agents use larger models; chatbots use smaller models',
                'Agents run a loop of reason→act→observe to complete goals, not just answer questions',
                'Chatbots can only respond once; agents respond multiple times',
                'Agents require a database; chatbots do not',
              ],
              correctIndex: 1,
              explanation: 'An agent runs a loop: reason about the situation, call a tool, observe the result, reason again — repeating until the goal is achieved. A chatbot only responds to each message in isolation without taking actions or building toward a goal.',
            },
            xpReward: 125,
          },
          {
            id: 'lesson-s5-m1-l2',
            moduleId: 'mod-s5-m1',
            order: 2,
            title: 'RAG — The Film Room Database',
            duration: '10 min',
            overview: 'RAG (Retrieval-Augmented Generation) gives AI access to your specific knowledge — documents, databases, proprietary data — without retraining the model.',
            footballAnalogy: 'A defensive coordinator doesn\'t memorize every play from every team in history. Before each game, his staff pulls the most relevant film: this opponent\'s last 5 games, in similar weather, against similar defenses. RAG works the same — retrieve only the relevant documents and inject them into the model\'s context.',
            explanation: 'RAG solves a core LLM limitation: the model was trained on data up to a cutoff date and doesn\'t know your specific documents. RAG has three steps: (1) **Embed** your documents as vector representations, (2) **Store** them in a vector database, (3) At query time: embed the question, find similar documents, inject them into the prompt. The model then answers using your retrieved content.',
            keyPoints: [
              'Embeddings: convert text to a numeric vector that captures semantic meaning',
              'Vector database (Pinecone, Supabase pgvector): stores and searches embeddings',
              'Similarity search: find docs whose embedding is "closest" to the query',
              'RAG workflow: embed docs → store → query → retrieve → inject → answer',
            ],
            codeExample: `import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const client = new Anthropic();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Step 1: Embed a document (done once when indexing)
async function embedDocument(text) {
  const response = await client.embeddings.create({   // or OpenAI's API
    model: "voyage-3",
    input: text
  });
  return response.embeddings[0];
}

// Step 2: Store in Supabase with pgvector
await supabase.from('documents').insert({
  content: recruitScoutReport,
  embedding: await embedDocument(recruitScoutReport)
});

// Step 3: At query time — retrieve relevant docs
async function retrieveAndAnswer(userQuestion) {
  const queryEmbedding = await embedDocument(userQuestion);

  // Find most similar documents
  const { data: docs } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_count: 3
  });

  // Inject retrieved context into prompt
  const context = docs.map(d => d.content).join('\\n\\n');
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [{
      role: "user",
      content: \`Context: \${context}\\n\\nQuestion: \${userQuestion}\`
    }]
  });
  return response.content[0].text;
}`,
            quiz: {
              question: 'What problem does RAG (Retrieval-Augmented Generation) primarily solve?',
              options: [
                'It makes models generate responses faster',
                'It lets models access your specific documents and data without retraining',
                'It reduces the cost of API calls',
                'It makes responses more creative',
              ],
              correctIndex: 1,
              explanation: 'RAG solves the knowledge limitation of LLMs. Instead of retraining a model on your data (expensive), RAG retrieves relevant documents at query time and injects them into the prompt, giving the model access to your specific knowledge.',
            },
            xpReward: 125,
          },
        ],
      },
      {
        id: 'mod-s5-m2',
        courseId: 'course-s5',
        order: 2,
        title: 'Ship Your AI Product',
        description: 'Build and deploy a full-stack AI application. The championship game.',
        icon: '🚀',
        lessons: [
          {
            id: 'lesson-s5-m2-l1',
            moduleId: 'mod-s5-m2',
            order: 1,
            title: 'Full-Stack AI Architecture',
            duration: '10 min',
            overview: 'A production AI app has three layers: the frontend (React), the backend (API server), and the AI layer (Claude). Understanding how they connect is how you design systems that scale.',
            footballAnalogy: 'A championship team has three phases: offense (frontend — user-facing), defense (backend — protecting and processing), and special teams (AI — the special weapon deployed at key moments). Each phase must be coordinated for the whole system to work.',
            explanation: 'The standard architecture: React frontend makes API calls to your backend (Node/Express, Python/FastAPI, or Next.js API routes). The backend validates inputs, manages auth, calls Claude, and returns results. Never call the Claude API from the frontend — your API key would be exposed. The backend acts as a secure proxy.',
            keyPoints: [
              'Frontend → your backend API → Claude API (never frontend → Claude directly)',
              'Backend validates auth, rate-limits, logs, and sanitizes before calling Claude',
              'Stream responses from backend to frontend using Server-Sent Events',
              'Store conversation history in DB for multi-turn conversations',
            ],
            codeExample: `// Next.js API route — backend (server-side)
// app/api/analyze/route.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();  // API key is server-side only

export async function POST(req) {
  const { recruitData } = await req.json();

  // Validate and sanitize input
  if (!recruitData?.name) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  // Streaming response to the browser
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const stream = await client.messages.stream({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        messages: [{ role: "user", content: \`Analyze: \${JSON.stringify(recruitData)}\` }]
      });
      for await (const event of stream) {
        if (event.type === 'content_block_delta') {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    }
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' }
  });
}`,
            quiz: {
              question: 'Why should you never call the Claude API directly from the React frontend?',
              options: [
                'The browser can\'t make network requests',
                'React doesn\'t support async operations',
                'Your API key would be exposed in the browser and could be stolen',
                'Claude\'s API doesn\'t accept requests from browsers',
              ],
              correctIndex: 2,
              explanation: 'Any code running in the browser is visible to anyone. If you put your API key in the frontend, anyone can open DevTools and steal it — using your account and billing you. Always proxy Claude calls through your own backend server where the key stays private.',
            },
            xpReward: 125,
          },
          {
            id: 'lesson-s5-m2-l2',
            moduleId: 'mod-s5-m2',
            order: 2,
            title: 'Evaluate & Iterate — Game Film Review',
            duration: '8 min',
            overview: 'The best AI builders iterate relentlessly. Learn how to evaluate your AI system, catch regressions, and improve systematically rather than by gut feel.',
            footballAnalogy: 'The best coaches don\'t just watch the final score. They review every play for what worked, what didn\'t, and why — and use that to prepare for next week. AI evaluation is the same: structured analysis of where your system succeeds and fails, feeding back into improvements.',
            explanation: 'AI systems need evaluation pipelines. Build a **golden dataset**: representative inputs with expected outputs. Run your system against it regularly. Key metrics: accuracy, latency, cost per call, hallucination rate. Use Claude itself to evaluate outputs: "Rate this response 1-5 for accuracy and helpfulness." This is called "LLM-as-judge" and scales better than human review.',
            keyPoints: [
              'Golden dataset: curated examples with correct expected outputs',
              'Run evals on every significant prompt change — treat it like tests',
              'LLM-as-judge: use Claude to score responses at scale',
              'Track cost/latency/quality — usually you\'re trading off among them',
            ],
            codeExample: `// LLM-as-judge evaluation
async function evaluateResponse(input, actualOutput, expectedOutput) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 256,
    messages: [{
      role: "user",
      content: \`You are evaluating an AI response.

Task given to AI: \${input}
Expected output: \${expectedOutput}
Actual AI output: \${actualOutput}

Rate the actual output on:
1. Accuracy (1-5): Does it contain correct information?
2. Completeness (1-5): Does it address everything in the task?
3. Hallucination (yes/no): Does it contain false claims?

Respond with JSON: { "accuracy": N, "completeness": N, "hallucination": bool }\`
    }]
  });
  return JSON.parse(response.content[0].text);
}

// Run against golden dataset
const results = await Promise.all(
  goldenDataset.map(({ input, expected }) =>
    runSystem(input).then(output => evaluateResponse(input, output, expected))
  )
);
const avgAccuracy = results.reduce((s, r) => s + r.accuracy, 0) / results.length;
console.log(\`Average accuracy: \${avgAccuracy}/5\`);`,
            quiz: {
              question: 'What is "LLM-as-judge" in AI evaluation?',
              options: [
                'Using the model to refuse harmful requests',
                'Using an LLM to automatically evaluate and score other AI outputs at scale',
                'A legal framework for AI liability',
                'Using a more powerful model to train a smaller one',
              ],
              correctIndex: 1,
              explanation: 'LLM-as-judge means using an LLM (often Claude) to evaluate and score the outputs of your AI system. It scales better than human review — you can evaluate thousands of examples automatically — and is surprisingly accurate when the evaluation rubric is clearly defined.',
            },
            xpReward: 125,
          },
          {
            id: 'lesson-s5-m2-l3',
            moduleId: 'mod-s5-m2',
            order: 3,
            title: 'You Are Now a Dynasty Builder',
            duration: '5 min',
            overview: 'You\'ve completed the full curriculum. Here\'s your roadmap for what to build next and how to keep growing.',
            footballAnalogy: 'The dynasty is built. You didn\'t just win one championship — you built a system, a culture, and a pipeline that keeps winning year after year. That\'s what you\'ve done here: built a foundation that compounds. Now go build something real.',
            explanation: 'You\'ve covered the complete stack: Python, JavaScript, SQL, React, TypeScript, APIs, Git, LLMs, Prompt Engineering, Claude API, Tool Use, Streaming, Agents, RAG, Architecture, and Evaluation. The next step is building. Pick one project that solves a real problem — something you\'d actually use — and build it from scratch. The compound growth of actually shipping beats any amount of studying.',
            keyPoints: [
              'Pick a real project: an AI tool that solves YOUR actual problem',
              'Start with the Claude API + a simple React frontend — ship something small',
              'Add complexity incrementally: add a database, then RAG, then agents',
              'Evaluate and iterate — treat each version as a new season',
            ],
            codeExample: `// Your starter project template
// A simple AI assistant using everything you've learned

// 1. Backend: Next.js API route with streaming
// 2. Frontend: React with useState for streaming text
// 3. Database: Supabase for conversation history
// 4. AI: Claude with tool use for your specific domain

// Project ideas to start with:
// - AI recruiting report generator (fits this app!)
// - Personal AI assistant that knows your documents
// - Code review bot for your GitHub repos
// - AI-powered note-taking app with search
// - Customer support bot for a real product

// The best project is the one you actually ship.
// Start today. Build. Evaluate. Iterate.

// Go Dawgs. 🏈`,
            quiz: {
              question: 'What is the most important next step after completing this curriculum?',
              options: [
                'Study more courses before building anything',
                'Get more certifications',
                'Build a real project that solves an actual problem and ship it',
                'Wait until you\'re "ready"',
              ],
              correctIndex: 2,
              explanation: 'The only way to solidify everything you\'ve learned is to build something real. Pick a project that solves a real problem — one you\'d actually use — and build it. The compound growth from actually shipping beats any amount of continued studying.',
            },
            xpReward: 150,
          },
        ],
      },
    ],
  },
  // ══════════════════════════════════════════════════════════════
  // SEASON 6 — GIT MASTER & CLOUD ARCHITECT
  // ══════════════════════════════════════════════════════════════
  {
    id: 'course-s6',
    season: 6,
    seasonLabel: 'Conference Champion',
    title: 'Git, Cloud & DevOps',
    subtitle: 'Ship code like a professional',
    description: 'Elite builders don\'t just write code — they ship it reliably. Master Git workflows that professionals use, cloud platforms your apps run on, and the DevOps practices that keep systems alive.',
    icon: '☁️',
    accentColor: '#38bdf8',
    modules: [
      {
        id: 'mod-s6-m1',
        courseId: 'course-s6',
        order: 1,
        title: 'Git Like a Pro',
        description: 'Beyond the basics — Git workflows, rebasing, and collaboration at scale.',
        icon: '🌿',
        lessons: [
          {
            id: 'lesson-s6-m1-l1',
            moduleId: 'mod-s6-m1',
            order: 1,
            title: 'Git Workflow — The Season Plan',
            duration: '8 min',
            overview: 'Commits and branches are basics. Real teams use structured workflows: feature branches, pull requests, code review, and semantic commit messages. This is how you collaborate on real projects without chaos.',
            footballAnalogy: 'A football team has a structured practice schedule. Walk-through Monday, install Tuesday, full-speed Wednesday, review Thursday. Git workflows are similarly structured: feature branches for every change, PRs for review, merge only after approval, tag every release.',
            explanation: 'The standard Git flow: always branch off `main` for every feature or fix. Name branches semantically (`feature/add-rag`, `fix/auth-bug`). Write commit messages in present tense imperative: "Add streaming support" not "Added streaming." Open a Pull Request — describe what and why. Get reviewed. Squash and merge. Tag releases with semantic versions (v1.2.3).',
            keyPoints: [
              'Never commit directly to main — always use a feature branch',
              'Commit messages: "Add X", "Fix Y", "Remove Z" — present tense imperative',
              'PR description: what changed, why, how to test',
              'Semantic versioning: v{major}.{minor}.{patch} — break/add/fix',
            ],
            codeExample: `# Professional Git workflow

# 1. Start a new feature — ALWAYS branch from main
git checkout main
git pull origin main                  # get latest
git checkout -b feature/add-rag-pipeline

# 2. Work on the feature
# ... make changes ...
git add src/services/rag.ts          # stage specific files
git commit -m "Add vector embedding service for RAG"
git commit -m "Add Supabase pgvector retrieval function"
git commit -m "Integrate RAG retrieval into chat endpoint"

# 3. Push and open a PR
git push origin feature/add-rag-pipeline
# → GitHub: Create Pull Request
# Title: "Add RAG pipeline for document search"
# Body: what, why, how to test, screenshots

# 4. After review and approval
git checkout main
git merge feature/add-rag-pipeline --squash
git commit -m "Add RAG pipeline for document search (#42)"
git tag v1.3.0
git push origin main --tags`,
            quiz: {
              question: 'What does "semantic versioning" v1.3.0 mean?',
              options: [
                'Version 1, 3rd letter, no bugs',
                'Major version 1, minor version 3 (new features), patch 0 (no bug fixes)',
                'Released in 2013',
                'The 130th release since the project started',
              ],
              correctIndex: 1,
              explanation: 'Semantic versioning: v{MAJOR}.{MINOR}.{PATCH}. MAJOR = breaking changes (v2.0.0). MINOR = new backward-compatible features (v1.3.0). PATCH = bug fixes (v1.3.1). This tells users immediately what kind of update they\'re getting.',
            },
            xpReward: 75,
          },
          {
            id: 'lesson-s6-m1-l2',
            moduleId: 'mod-s6-m1',
            order: 2,
            title: 'CI/CD — Automated Game Film Review',
            duration: '8 min',
            overview: 'CI/CD (Continuous Integration / Continuous Deployment) automatically tests and deploys your code on every push. No more manual deploys, no more "it works on my machine."',
            footballAnalogy: 'After every practice, the film crew automatically captures and uploads every rep. Coaches review it before the next day. CI/CD is automated film review for your code — every commit triggers tests and a deployment automatically, with no manual steps.',
            explanation: 'CI (Continuous Integration) automatically runs your tests whenever you push code. CD (Continuous Deployment) automatically deploys passing code to production. Netlify does this for you via `netlify.toml` — every push to main triggers a build and deploy. GitHub Actions lets you define custom pipelines: run tests, check types, lint, then deploy.',
            keyPoints: [
              'CI: auto-run tests on every push — catch bugs before they reach prod',
              'CD: auto-deploy to staging/prod when tests pass',
              'Netlify: push to main → build → deploy automatically (what this app uses)',
              'GitHub Actions: `.github/workflows/ci.yml` defines your pipeline steps',
            ],
            codeExample: `# .github/workflows/ci.yml — GitHub Actions CI pipeline

name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npx tsc --noEmit

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: \${{ secrets.SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: \${{ secrets.SUPABASE_ANON_KEY }}

# Netlify automatically picks up the build artifacts and deploys`,
            quiz: {
              question: 'What is the main benefit of Continuous Deployment?',
              options: [
                'It writes code automatically for you',
                'It eliminates the need for testing',
                'Every code change that passes tests is automatically deployed — no manual steps',
                'It makes your app run faster in production',
              ],
              correctIndex: 2,
              explanation: 'CD removes the manual deployment step. When you push code that passes all tests, it automatically deploys to production. This reduces human error, makes releases faster, and encourages small frequent deployments rather than risky big-bang releases.',
            },
            xpReward: 75,
          },
        ],
      },
      {
        id: 'mod-s6-m2',
        courseId: 'course-s6',
        order: 2,
        title: 'Cloud Platforms',
        description: 'Modern apps run in the cloud. Understand how and why.',
        icon: '☁️',
        lessons: [
          {
            id: 'lesson-s6-m2-l1',
            moduleId: 'mod-s6-m2',
            order: 1,
            title: 'Cloud Architecture — The Stadium',
            duration: '8 min',
            overview: 'The cloud is rented compute infrastructure. Understanding the key concepts — serverless, containers, CDNs, managed databases — lets you design systems that scale without breaking.',
            footballAnalogy: 'A stadium isn\'t owned by every team that plays there — it\'s shared infrastructure. The cloud is shared infrastructure: servers, networks, storage, databases available on-demand. You rent exactly what you need, scale up for game day, scale down during the off-season.',
            explanation: 'Key cloud concepts: **Serverless** (Netlify Functions, AWS Lambda) — your code runs on-demand, zero server management, pay per invocation. **CDN** (Content Delivery Network) — serves your static files from servers closest to each user (Netlify does this). **Managed databases** (Supabase) — database with backups, scaling, and monitoring handled for you. **Environment variables** — config that differs between dev/staging/prod.',
            keyPoints: [
              'Serverless: functions that spin up per request, no server to manage (Netlify Functions)',
              'CDN: your static files are cached globally — fast everywhere',
              'Managed DB: Supabase handles backups, failover, scaling for Postgres',
              'Environment variables: secrets and config that change per environment',
            ],
            codeExample: `# Your current cloud stack (fully configured):

# 1. Netlify (Frontend + Serverless)
#    - Serves React app via global CDN
#    - Runs serverless functions for backend logic
#    - Auto-deploys on every git push to main
# → configured via netlify.toml

# 2. Supabase (Database + Auth)
#    - Managed PostgreSQL — no server to maintain
#    - Real-time subscriptions, Row Level Security
#    - Built-in auth with magic links
# → SUPABASE_URL and SUPABASE_ANON_KEY in .env

# 3. Anthropic (AI API)
#    - Claude API for AI features
#    - Metered billing — pay per token
# → ANTHROPIC_API_KEY in .env (NEVER in frontend)

# Environment variables in Netlify:
# Site settings → Environment variables → Add
SUPABASE_URL = "https://xyz.supabase.co"
SUPABASE_ANON_KEY = "eyJ..."
ANTHROPIC_API_KEY = "sk-ant-..."    # never in browser!

# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`,
            quiz: {
              question: 'What is "serverless" computing?',
              options: [
                'Computing with no servers at all — magic!',
                'Your functions run on servers you rent hourly and must configure',
                'Functions that run on-demand on managed infrastructure — no server setup, pay per invocation',
                'A type of database that has no server component',
              ],
              correctIndex: 2,
              explanation: 'Serverless doesn\'t mean no servers — it means YOU don\'t manage servers. Your code (functions) runs on demand on infrastructure managed by the cloud provider. You pay only for actual execution time, and it scales automatically from zero to millions of requests.',
            },
            xpReward: 75,
          },
          {
            id: 'lesson-s6-m2-l2',
            moduleId: 'mod-s6-m2',
            order: 2,
            title: 'Observability — Watching Your Game Film',
            duration: '7 min',
            overview: 'You can\'t improve what you don\'t measure. Observability means logging, monitoring, and alerting — knowing what your app is doing in production in real time.',
            footballAnalogy: 'Elite coaches watch film on every play. They track completion percentage by route, success rate on 3rd-and-short, blitz pickup rate. Observability is the film room for your app: what\'s happening, where it\'s slow, what\'s breaking, and who\'s affected.',
            explanation: 'Observability has three pillars: (1) **Logs** — structured records of what happened (`console.log` → production logging). (2) **Metrics** — numerical measurements over time (response time, error rate, active users). (3) **Alerts** — notify you when something goes wrong. Tools: Netlify Analytics (basic), Sentry (errors), LogRocket (session replay), Datadog (full observability stack).',
            keyPoints: [
              'Structured logs: `{ level: "error", event: "api_fail", userId, error }` — searchable',
              'Key metrics: p50/p95 latency, error rate, active sessions, AI token usage',
              'Alerts: notify on high error rate, slow response, or cost spikes',
              'Start simple: Sentry for errors + Netlify Analytics covers 80% of needs',
            ],
            codeExample: `// Structured logging (production-ready)
const log = (level, event, data = {}) => {
  console.log(JSON.stringify({
    level,
    event,
    timestamp: new Date().toISOString(),
    ...data
  }));
};

// API call with observability
async function callClaude(prompt, userId) {
  const start = Date.now();
  log('info', 'claude_request_start', { userId, promptLength: prompt.length });

  try {
    const response = await client.messages.create({ ... });
    const latencyMs = Date.now() - start;

    log('info', 'claude_request_success', {
      userId, latencyMs,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    });

    return response;
  } catch (error) {
    log('error', 'claude_request_failed', {
      userId, error: error.message,
      latencyMs: Date.now() - start
    });
    throw error;
  }
}`,
            quiz: {
              question: 'What are the three pillars of observability?',
              options: [
                'Testing, Deployment, and Rollback',
                'Logs, Metrics, and Alerts',
                'Frontend, Backend, and Database',
                'Speed, Cost, and Security',
              ],
              correctIndex: 1,
              explanation: 'The three pillars of observability are: Logs (records of what happened), Metrics (numerical measurements over time), and Alerts (notifications when something goes wrong). Together they give you full visibility into what your application is doing in production.',
            },
            xpReward: 75,
          },
        ],
      },
    ],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────

export function getAllLessons() {
  return courses.flatMap(c =>
    c.modules.flatMap(m => m.lessons)
  );
}

export function getLessonById(id: string) {
  return getAllLessons().find(l => l.id === id);
}

export function getModuleById(id: string) {
  return courses.flatMap(c => c.modules).find(m => m.id === id);
}

export function getNextLesson(currentLessonId: string) {
  const all = getAllLessons();
  const idx = all.findIndex(l => l.id === currentLessonId);
  return idx >= 0 ? all[idx + 1] : null;
}

export function getCourseProgress(courseId: string, completedLessonIds: string[]) {
  const course = courses.find(c => c.id === courseId);
  if (!course) return { completed: 0, total: 0, percent: 0 };
  const all = course.modules.flatMap(m => m.lessons);
  const completed = all.filter(l => completedLessonIds.includes(l.id)).length;
  return { completed, total: all.length, percent: Math.round((completed / all.length) * 100) };
}

export function isLessonUnlocked(lessonId: string, completedLessonIds: string[]) {
  const all = getAllLessons();
  const idx = all.findIndex(l => l.id === lessonId);
  if (idx === 0) return true;           // first lesson always unlocked
  if (idx < 0) return false;
  const prevLesson = all[idx - 1];
  // Also unlock if same module's previous lesson is done
  // Or if it's the first in a new course (prev lesson is in previous course)
  return completedLessonIds.includes(prevLesson.id);
}
