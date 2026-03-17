// ═══════════════════════════════════════════════════════════════
// WORLD 3: Starter — Levels 21–30
// ═══════════════════════════════════════════════════════════════
//
// Concepts: Objects, Arrays of Objects, SQL, JSON, State
// Tracks: javascript, sql_data
// Entry: Beat World 2 Boss
// Boss at Level 30 unlocks World 4

import { Level } from '../../types/engine';

export const world3Levels: Level[] = [
  // ─── LEVEL 21: Learn — Objects ────────────────────────────────
  {
    id: 'level_021',
    levelNumber: 21,
    world: 3,
    track: 'javascript',
    title: 'Objects: The Recruit Profile',
    subtitle: 'Bundle related data together under one name.',
    type: 'learn',
    footballContext: "A recruit isn't just a name or a number — they're a bundle of related information: name, position, stars, state, rating, GPA. In code, this bundle is called an object.",
    lesson: {
      overview: 'An object stores multiple related values under one name, accessed by their property names (keys).',
      explanation: 'Objects are how real-world things get represented in code. Every recruit, every team, every game result in this app is an object. Objects have properties: each property has a name (key) and a value. You access a property using dot notation: recruit.stars. Understanding objects is the gateway to understanding databases, APIs, and React props — they all use the same structure.',
      codeExample: `// Creating an object (the recruit profile)
const recruit = {
  name: "Marcus Johnson",
  position: "QB",
  stars: 5,
  state: "Georgia",
  gpa: 3.8,
  rating: 95,
  isCommitted: false
};

// Accessing properties (dot notation)
console.log(recruit.name);     // "Marcus Johnson"
console.log(recruit.stars);    // 5
console.log(recruit.isCommitted); // false

// Updating a property
recruit.isCommitted = true;

// Bracket notation (same thing, used when key is a variable)
let prop = "stars";
console.log(recruit[prop]); // 5`,
      keyPoints: [
        'Objects store related data as key: value pairs',
        'Access properties with dot notation: object.property',
        'Properties can be any type: string, number, boolean, array, even other objects',
        'Object properties can be updated by reassigning them',
        'Objects are the foundation of JSON, APIs, and database records',
      ],
    },
    challenge: {
      prompt: 'What does the last line print?',
      code: `const recruit = {
  name: "Jaylen Carter",
  position: "WR",
  stars: 5,
  gpa: 3.6
};

console.log(recruit.position);`,
      options: ['"Jaylen Carter"', '"WR"', '5', '3.6'],
      correctIndex: 1,
      explanation: 'recruit.position accesses the "position" property of the recruit object. Its value is "WR".',
      hint: 'Which property are you accessing with .position?',
    },
    xpReward: 80,
    streakBonus: 16,
    concept: 'objects',
    difficulty: 1,
    tags: ['objects', 'properties', 'data-structures', 'javascript'],
  },

  // ─── LEVEL 22: Predict — Object Dot Notation ─────────────────
  {
    id: 'level_022',
    levelNumber: 22,
    world: 3,
    track: 'javascript',
    title: 'Read the Scout Report',
    subtitle: 'Navigate nested objects. Find the value.',
    type: 'predict',
    footballContext: "A detailed scout report has nested data: the player's stats have their own object inside the main profile. Navigate the object tree to find the right value.",
    lesson: {
      overview: 'Objects can contain other objects. Use dot notation chained together to navigate deeper.',
      explanation: 'Nested objects are how complex real-world data is represented. API responses, database records, and config files all use nested objects.',
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'What does the last line output?',
      code: `const player = {
  name: "DeAndre Williams",
  position: "RB",
  stats: {
    rushingYards: 1850,
    touchdowns: 22,
    yardsPerCarry: 6.4
  }
};

console.log(player.stats.touchdowns);`,
      options: ['1850', '22', '6.4', '"DeAndre Williams"'],
      correctIndex: 1,
      explanation: 'player.stats gives the inner object. Then .touchdowns accesses its touchdowns property. The value is 22.',
      hint: 'First evaluate player.stats. What do you get? Then access .touchdowns on that.',
    },
    xpReward: 80,
    streakBonus: 16,
    concept: 'nested_objects',
    difficulty: 2,
    tags: ['objects', 'nested', 'dot-notation', 'predict'],
  },

  // ─── LEVEL 23: Learn — Arrays of Objects ──────────────────────
  {
    id: 'level_023',
    levelNumber: 23,
    world: 3,
    track: 'javascript',
    title: 'Arrays of Objects: The Full Roster',
    subtitle: 'The most common data pattern in all of programming.',
    type: 'learn',
    footballContext: "A roster isn't just one player — it's a list of players. Each player is an object. The roster is an array of those objects. This pattern — array of objects — is everywhere: results from a database, responses from an API, recruits in your board.",
    lesson: {
      overview: 'An array of objects is a list where each item is a structured data object. This is the most common data pattern in web development.',
      explanation: 'Almost every piece of data you work with in a real app is an array of objects: the users in your database, the messages in a chat, the products in a store. Learning to work with this pattern — iterate, filter, sort, map — is the key to being a productive developer.',
      codeExample: `// Array of objects — the roster
const roster = [
  { name: "Marcus Johnson", position: "QB", rating: 95 },
  { name: "DeAndre Williams", position: "RB", rating: 90 },
  { name: "Jaylen Carter", position: "WR", rating: 93 },
];

// Access an item and its properties
console.log(roster[0].name);    // "Marcus Johnson"
console.log(roster[1].rating);  // 90

// Loop over all players
for (let i = 0; i < roster.length; i++) {
  console.log(roster[i].name + " — " + roster[i].position);
}

// The modern way: forEach
roster.forEach(player => {
  console.log(player.name);
});`,
      keyPoints: [
        'Array of objects: [] containing multiple {} items',
        'Access with roster[index].property',
        'Loop with for or forEach to process all items',
        'This pattern is how databases send you query results',
        'Mastering this pattern = mastering 80% of real web data',
      ],
    },
    challenge: {
      prompt: 'What does this code print?',
      code: `const roster = [
  { name: "Jordan", position: "QB", stars: 5 },
  { name: "Marcus", position: "RB", stars: 4 },
  { name: "Eli", position: "WR", stars: 5 }
];

console.log(roster[2].stars);`,
      options: ['4', '5 (first one)', '5 (third one)', '"WR"'],
      correctIndex: 2,
      explanation: 'roster[2] is the third item: { name: "Eli", position: "WR", stars: 5 }. Accessing .stars gives 5. (Same value as roster[0].stars, but from a different object.)',
      hint: 'First index into the array. Then access the property.',
    },
    xpReward: 85,
    streakBonus: 17,
    concept: 'arrays_of_objects',
    difficulty: 2,
    tags: ['arrays', 'objects', 'combined', 'data-structures'],
  },

  // ─── LEVEL 24: Fix — The Broken Depth Chart ───────────────────
  {
    id: 'level_024',
    levelNumber: 24,
    world: 3,
    track: 'javascript',
    title: 'The Broken Depth Chart',
    subtitle: 'Something is wrong in the roster code. Find it.',
    type: 'fix',
    footballContext: "The depth chart is printing 'undefined' for every player's position. The data looks fine. The bug is in how the properties are being accessed.",
    lesson: {
      overview: 'Common bug: accessing the wrong property name, or using the wrong syntax to access array items.',
      explanation: 'Property names are case-sensitive in JavaScript. "Position" is not the same as "position".',
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'This code prints "undefined" for every player. What is the bug?',
      code: `const roster = [
  { name: "Marcus", position: "QB" },
  { name: "DeAndre", position: "RB" },
  { name: "Jaylen", position: "WR" },
];

for (let i = 0; i < roster.length; i++) {
  console.log(roster[i].name + " plays " + roster[i].Position);
}`,
      options: [
        'The loop should start at i = 1 not i = 0',
        'roster[i].Position should be roster[i].position (lowercase p)',
        'The for loop condition should use <= not <',
        'The array items should use quotes around the property names',
      ],
      correctIndex: 1,
      explanation: 'JavaScript object property names are case-sensitive. The property is defined as "position" (lowercase p), but the code accesses "Position" (uppercase P). There is no "Position" property, so JavaScript returns undefined.',
      hint: 'Look carefully at the property name in the object definition vs. how it\'s being accessed.',
    },
    xpReward: 85,
    streakBonus: 17,
    concept: 'debugging_objects',
    difficulty: 2,
    tags: ['debugging', 'objects', 'case-sensitive', 'fix'],
  },

  // ─── LEVEL 25: Learn — SQL SELECT (UNLOCK) ────────────────────
  {
    id: 'level_025',
    levelNumber: 25,
    world: 3,
    track: 'sql_data',
    title: 'SQL: SELECT Your Starters',
    subtitle: 'Ask a database for exactly the data you need.',
    type: 'learn',
    footballContext: "Your database has 10,000 recruits. You only want 5-star QBs from Georgia. You don't pull all 10,000 and filter in JavaScript — you ask the database directly with SQL. It's faster, cleaner, and how every real app works.",
    lesson: {
      overview: 'SQL (Structured Query Language) is how you retrieve data from a database. SELECT specifies what you want. FROM specifies where it lives.',
      explanation: "SQL is the universal language of databases. Whether it's PostgreSQL, MySQL, SQLite, or Supabase — they all speak SQL. The basic structure is: SELECT columns FROM table WHERE condition ORDER BY column. This app uses Supabase (PostgreSQL) on the backend. Every time you load your progress, a SQL query runs.",
      codeExample: `-- Get all columns from the roster table
SELECT * FROM roster;

-- Get specific columns only
SELECT name, position, stars FROM recruits;

-- Filter with WHERE
SELECT * FROM recruits WHERE stars = 5;

-- Filter multiple conditions
SELECT * FROM recruits
WHERE stars = 5
AND position = 'QB'
AND state = 'Georgia';

-- Sort results
SELECT * FROM recruits
WHERE stars >= 4
ORDER BY stars DESC, rating DESC;

-- The same query in JavaScript (for comparison)
const topQBs = recruits
  .filter(r => r.stars === 5 && r.position === 'QB')
  .sort((a, b) => b.rating - a.rating);`,
      keyPoints: [
        'SELECT * means "get all columns"',
        'FROM table_name specifies which table to query',
        'WHERE filters rows based on a condition',
        'AND adds more conditions (all must be true)',
        'ORDER BY sorts results (DESC = largest first)',
      ],
    },
    challenge: {
      prompt: 'Which SQL query finds all 5-star recruits sorted from highest to lowest rating?',
      options: [
        'GET * FROM recruits WHERE stars = 5 SORT BY rating;',
        'SELECT * FROM recruits WHERE stars = 5 ORDER BY rating DESC;',
        'SELECT * FROM recruits ORDER BY stars DESC WHERE stars = 5;',
        'SELECT recruits WHERE stars = 5;',
      ],
      correctIndex: 1,
      explanation: 'Option B has correct SQL syntax: SELECT * (all columns), FROM recruits (the table), WHERE stars = 5 (filter), ORDER BY rating DESC (sort highest first). WHERE must come before ORDER BY.',
      hint: 'SQL clause order: SELECT ... FROM ... WHERE ... ORDER BY',
    },
    xpReward: 90,
    streakBonus: 18,
    unlockFeature: 'coach_office',
    concept: 'sql_select',
    difficulty: 2,
    tags: ['sql', 'select', 'where', 'order-by', 'databases'],
  },

  // ─── LEVEL 26: Predict — SQL WHERE ───────────────────────────
  {
    id: 'level_026',
    levelNumber: 26,
    world: 3,
    track: 'sql_data',
    title: 'Who Made the Cut?',
    subtitle: 'Read a SQL query. Predict which records it returns.',
    type: 'predict',
    footballContext: "You wrote a SQL query to find your scholarship targets. But before it runs on the database, can you predict which recruits it will return from this sample?",
    lesson: {
      overview: 'SQL filters rows based on conditions. Trace through each row and evaluate the WHERE clause.',
      explanation: 'Read each row, check if it satisfies ALL the WHERE conditions. Only rows where every condition is true are returned.',
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'This table has 4 recruits. How many rows does the query return?\n\nTable: recruits\nName | Stars | State | Position\nJordan | 5 | Georgia | QB\nMarcus | 4 | Alabama | RB\nEli | 5 | Georgia | WR\nDevon | 3 | Florida | QB\n\nQuery:\nSELECT * FROM recruits\nWHERE stars >= 4 AND state = \'Georgia\';',
      options: ['1', '2', '3', '4'],
      correctIndex: 1,
      explanation: 'Check each row: Jordan (stars=5, state=Georgia) — PASS. Marcus (stars=4, state=Alabama) — FAIL (wrong state). Eli (stars=5, state=Georgia) — PASS. Devon (stars=3, state=Florida) — FAIL (stars too low). 2 rows pass.',
      hint: 'Both conditions must be true. Check each row against BOTH conditions.',
    },
    xpReward: 90,
    streakBonus: 18,
    concept: 'sql_where_filter',
    difficulty: 2,
    tags: ['sql', 'where', 'filtering', 'predict'],
  },

  // ─── LEVEL 27: Apply — Filter the Recruit Board ───────────────
  {
    id: 'level_027',
    levelNumber: 27,
    world: 3,
    track: 'sql_data',
    title: 'Apply: Filter the Recruit Board',
    subtitle: 'Write the SQL for a real recruiting feature.',
    type: 'apply',
    footballContext: "The recruiting board needs a filter: show only 5-star players whose position is QB or WR, ordered by rating so the best targets are on top. Which query does this?",
    lesson: {
      overview: 'Combining WHERE conditions with OR and AND lets you build powerful filters.',
      explanation: 'In SQL, parentheses control which conditions group together — just like in math.',
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'Which query returns all 5-star recruits who play QB or WR, sorted by rating (highest first)?',
      options: [
        `SELECT * FROM recruits
WHERE stars = 5
ORDER BY rating DESC;`,
        `SELECT * FROM recruits
WHERE stars = 5
AND position = 'QB'
OR position = 'WR'
ORDER BY rating DESC;`,
        `SELECT * FROM recruits
WHERE stars = 5
AND (position = 'QB' OR position = 'WR')
ORDER BY rating DESC;`,
        `SELECT * FROM recruits
WHERE stars = 5 OR position = 'QB' OR position = 'WR'
ORDER BY rating;`,
      ],
      correctIndex: 2,
      explanation: 'Option C is correct. The parentheses group the OR conditions for position: (position = QB OR position = WR). Without parentheses, Option B means "stars=5 AND QB, OR just WR" — which is wrong. The AND applies to the whole group in option C.',
      hint: 'Parentheses control what the AND applies to. "stars=5 AND (QB or WR)" vs "stars=5 AND QB, or WR".',
    },
    xpReward: 95,
    streakBonus: 19,
    concept: 'sql_and_or',
    difficulty: 2,
    tags: ['sql', 'and', 'or', 'parentheses', 'apply'],
  },

  // ─── LEVEL 28: Learn — JSON ────────────────────────────────────
  {
    id: 'level_028',
    levelNumber: 28,
    world: 3,
    track: 'javascript',
    title: 'JSON: The Language of the Web',
    subtitle: 'The universal format for sending data between systems.',
    type: 'learn',
    footballContext: "When your app talks to Supabase, to a recruiting API, or to any external service, the data travels as JSON. It looks exactly like a JavaScript object, but it's a text string that any language can read.",
    lesson: {
      overview: 'JSON (JavaScript Object Notation) is a text format for representing structured data. It is the universal language of APIs and web services.',
      explanation: "When two systems exchange data — your app and a database, or your app and an external API — they serialize the data as JSON (convert it to a text string) and the receiver parses it back into native objects. JSON looks like a JavaScript object but has stricter rules: all keys must be in double quotes, no undefined values, no functions.",
      codeExample: `// A JavaScript object
const recruit = {
  name: "Marcus Johnson",
  stars: 5,
  position: "QB"
};

// Convert to JSON string (for sending over the network)
const jsonString = JSON.stringify(recruit);
// '{"name":"Marcus Johnson","stars":5,"position":"QB"}'

// Parse JSON back into an object (received from an API)
const parsed = JSON.parse(jsonString);
console.log(parsed.name); // "Marcus Johnson"

// Real API response looks like this:
const apiResponse = \`{
  "id": "rec-001",
  "name": "Marcus Johnson",
  "stats": {
    "gpa": 3.8,
    "rating": 95
  }
}\`;`,
      keyPoints: [
        'JSON uses double quotes for all keys and string values',
        'JSON.stringify() converts an object to a JSON string',
        'JSON.parse() converts a JSON string back to an object',
        'APIs send and receive data as JSON over HTTP',
        'JSON supports: strings, numbers, booleans, arrays, objects, null',
      ],
    },
    challenge: {
      prompt: 'Which statement about JSON is TRUE?',
      options: [
        'JSON keys do not need quotes',
        'JSON can contain JavaScript functions',
        'JSON.parse() converts a JSON string back into a usable JavaScript object',
        'JSON is only used with JavaScript, not other languages',
      ],
      correctIndex: 2,
      explanation: 'JSON.parse() converts a JSON string into a native JavaScript object you can work with. JSON requires double quotes on keys. It cannot contain functions. It is language-agnostic — Python, Ruby, Go, and all modern languages can read JSON.',
      hint: 'Think about what JSON.parse() is for. What does it convert?',
    },
    xpReward: 85,
    streakBonus: 17,
    concept: 'json',
    difficulty: 2,
    tags: ['json', 'apis', 'serialization', 'web'],
  },

  // ─── LEVEL 29: Apply — State Management ───────────────────────
  {
    id: 'level_029',
    levelNumber: 29,
    world: 3,
    track: 'javascript',
    title: 'State Is Your Dynasty\'s Memory',
    subtitle: 'An object that holds everything your app currently knows.',
    type: 'apply',
    footballContext: "Your dynasty's state is the object that holds everything: current week, ratings, wins, losses. When you choose a coaching action, it updates specific properties of the state object. Which update is correct?",
    lesson: {
      overview: "State is an object that represents everything your app currently knows. Updating state makes the UI re-render with new information.",
      explanation: "In React (which this app is built with), state is the core concept that makes UIs interactive. When state changes, React re-renders the affected components automatically. The Coach's Office updates offenseRating and defenseRating when you choose actions — that's state management.",
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'The coach takes a "film study" action that should increase offenseRating by 3 and defenseRating by 3. The current state is { offenseRating: 80, defenseRating: 85, wins: 4 }. Which update is correct?',
      options: [
        `setState({
  offenseRating: 3,
  defenseRating: 3
})`,
        `setState({
  ...currentState,
  offenseRating: currentState.offenseRating + 3,
  defenseRating: currentState.defenseRating + 3
})`,
        `currentState.offenseRating = 83;
currentState.defenseRating = 88;`,
        `setState(offenseRating + 3, defenseRating + 3)`,
      ],
      correctIndex: 1,
      explanation: 'Option B is correct. The `...currentState` (spread operator) copies all existing properties, then the following lines override only the two that changed. This way wins: 4 is preserved. Option A would set ratings to just 3 and lose wins. Option C mutates state directly (bad practice in React). Option D passes the wrong argument type.',
      hint: 'You want to update only two properties and keep all others unchanged. The spread operator (...) helps with this.',
    },
    xpReward: 95,
    streakBonus: 19,
    concept: 'state_management',
    difficulty: 3,
    tags: ['state', 'react', 'objects', 'spread-operator', 'apply'],
  },

  // ─── LEVEL 30: BOSS — Starter Championship ────────────────────
  {
    id: 'level_030',
    levelNumber: 30,
    world: 3,
    track: 'sql_data',
    title: '🏆 BOSS: Starter Championship',
    subtitle: 'Five challenges across objects, SQL, JSON, and state.',
    type: 'boss',
    footballContext: "You've learned objects, SQL, JSON, and state. Now prove it. Five challenges — get 4 right to unlock the Dynasty Desk and World 4: Captain.",
    challenge: {
      parts: [
        {
          prompt: 'Given: const team = { name: "Georgia", rating: 95 }. How do you access the rating?',
          options: ['team["rating"]', 'team.rating', 'team->rating', 'Both A and B'],
          correctIndex: 3,
          explanation: 'Both dot notation (team.rating) and bracket notation (team["rating"]) work in JavaScript. Dot notation is more common. Bracket notation is useful when the key is stored in a variable.',
        },
        {
          prompt: 'An array roster has 5 players. What is the index of the last player?',
          options: ['5', '4', '0', 'roster.last'],
          correctIndex: 1,
          explanation: 'Arrays are 0-indexed. With 5 items, indexes are 0, 1, 2, 3, 4. The last index is always length - 1 = 4.',
        },
        {
          prompt: 'Which SQL keyword is used to filter rows?',
          options: ['FILTER', 'WHERE', 'HAVING', 'SELECT'],
          correctIndex: 1,
          explanation: 'WHERE is used to filter rows in a SQL query. HAVING is used with GROUP BY to filter groups. FILTER is not a standard SQL keyword. SELECT specifies which columns to return.',
        },
        {
          prompt: 'What does JSON.stringify() do?',
          options: [
            'Converts a string into a JavaScript object',
            'Converts a JavaScript object into a JSON string',
            'Formats JSON for display',
            'Validates that JSON is correctly formatted',
          ],
          correctIndex: 1,
          explanation: 'JSON.stringify() converts a JavaScript object INTO a JSON string (for sending over a network or storing). JSON.parse() does the reverse.',
        },
        {
          prompt: 'In React state management, why is it bad practice to mutate state directly (e.g., state.rating = 99)?',
          options: [
            'It causes syntax errors',
            'React doesn\'t know the state changed, so the UI won\'t update',
            'State objects are read-only by default',
            'Direct mutation runs slower',
          ],
          correctIndex: 1,
          explanation: 'React tracks state changes by comparing object references. If you mutate the existing object, the reference doesn\'t change, so React doesn\'t know to re-render. You always create a new state object with setState or useState hooks.',
        },
      ],
      passingScore: 4,
    },
    xpReward: 200,
    streakBonus: 40,
    unlockFeature: 'dynasty_desk',
    concept: 'world_3_mastery',
    difficulty: 3,
    tags: ['boss', 'world-3', 'objects', 'sql', 'json', 'state'],
    isWorldBoss: true,
  },
];
