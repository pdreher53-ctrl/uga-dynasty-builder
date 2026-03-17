// ═══════════════════════════════════════════════════════════════
// WORLD 2: Redshirt — Levels 11–20
// ═══════════════════════════════════════════════════════════════
//
// Concepts: For Loops, While Loops, Arrays, Functions
// Tracks: python_logic, javascript
// Entry: Beat World 1 Boss
// Boss at Level 20 unlocks World 3

import { Level } from '../../types/engine';

export const world2Levels: Level[] = [
  // ─── LEVEL 11: Learn — For Loops ──────────────────────────────
  {
    id: 'level_011',
    levelNumber: 11,
    world: 2,
    track: 'python_logic',
    title: 'For Loops: The Running Back\'s Reps',
    subtitle: 'Run the same action many times. Automatically.',
    type: 'learn',
    footballContext: "A running back runs the same drill 100 times until it's perfect. You wouldn't write the drill out 100 times — you'd use a loop. A for loop runs a block of code a set number of times.",
    lesson: {
      overview: 'A for loop repeats code a specific number of times without you having to write it out repeatedly.',
      explanation: 'Loops are one of the most powerful tools in programming. Instead of writing `runDrill()` 100 times, you write a loop that runs it 100 times automatically. The for loop has three parts: start, stop condition, and step. It runs until the condition becomes false.',
      codeExample: `// Without a loop — tedious and fragile
runDrill();
runDrill();
runDrill();
// ...100 times

// WITH a for loop — clean and scalable
for (let rep = 0; rep < 100; rep++) {
  runDrill();
}
// This runs runDrill() exactly 100 times

// Loop that builds a score
let totalYards = 0;
let gains = [8, 12, 3, 15, 6];

for (let i = 0; i < gains.length; i++) {
  totalYards = totalYards + gains[i];
}
console.log(totalYards); // 44`,
      keyPoints: [
        'for (start; condition; step) runs until condition is false',
        'let i = 0 starts the counter at 0',
        'i < 10 stops when i reaches 10 (runs 0 through 9)',
        'i++ increments i by 1 each iteration',
        'Loops can iterate over arrays using .length',
      ],
    },
    challenge: {
      prompt: 'How many times does this loop run?\n\nfor (let i = 0; i < 5; i++) {\n  simulatePlay();\n}',
      options: ['4 times', '5 times', '6 times', '0 times'],
      correctIndex: 1,
      explanation: 'The loop starts at i=0 and runs while i < 5. So it runs for i = 0, 1, 2, 3, 4 — that is exactly 5 times. A common beginner mistake is thinking it runs 4 times because it stops before reaching 5.',
      hint: 'Count the values i takes: 0, 1, 2, 3, 4...',
    },
    xpReward: 70,
    streakBonus: 14,
    concept: 'for_loops',
    difficulty: 1,
    tags: ['loops', 'for-loop', 'iteration', 'beginner'],
  },

  // ─── LEVEL 12: Predict — Loop Counter ────────────────────────
  {
    id: 'level_012',
    levelNumber: 12,
    world: 2,
    track: 'python_logic',
    title: 'Count the First Downs',
    subtitle: 'Follow a loop with a counter. Predict the final value.',
    type: 'predict',
    footballContext: "The stats engine counts first downs by looping over each play. Can you trace through the loop and predict how many first downs were earned?",
    lesson: {
      overview: 'Loops often accumulate a value — this is called an accumulator pattern.',
      explanation: 'A counter variable starts at 0 and the loop adds to it based on a condition. Trace through carefully.',
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'What is the value of firstDowns after this code runs?',
      code: `let plays = [12, 4, 7, 11, 3, 15];
let firstDowns = 0;

for (let i = 0; i < plays.length; i++) {
  if (plays[i] >= 10) {
    firstDowns++;
  }
}`,
      options: ['2', '3', '4', '6'],
      correctIndex: 1,
      explanation: 'The loop checks each play. Plays >= 10: 12 (yes), 4 (no), 7 (no), 11 (yes), 3 (no), 15 (yes). Three plays are >= 10, so firstDowns = 3.',
      hint: 'Go through each element: which ones are >= 10?',
    },
    xpReward: 70,
    streakBonus: 14,
    concept: 'loop_accumulator',
    difficulty: 2,
    tags: ['loops', 'counter', 'accumulator', 'predict'],
  },

  // ─── LEVEL 13: Learn — While Loops ────────────────────────────
  {
    id: 'level_013',
    levelNumber: 13,
    world: 2,
    track: 'python_logic',
    title: 'While Loops: Keep Playing Until It\'s Over',
    subtitle: 'Loop until a condition changes. Perfect for unknown repetitions.',
    type: 'learn',
    footballContext: "A game doesn't last exactly 60 plays — it lasts until time runs out. A while loop runs until a condition becomes false, no matter how many iterations that takes.",
    lesson: {
      overview: 'A while loop keeps running as long as a condition remains true — you don\'t need to know in advance how many times.',
      explanation: 'Use a for loop when you know how many iterations you need. Use a while loop when you keep going until something changes. Both are critical — they solve different problems. The most common mistake with while loops is forgetting to update the condition inside the loop, which causes an infinite loop.',
      codeExample: `// Keep playing until time runs out
let gameClock = 60; // seconds

while (gameClock > 0) {
  runPlay();
  gameClock = gameClock - 10; // each play takes 10 seconds
}
// Loop runs 6 times: 60, 50, 40, 30, 20, 10, then stops at 0

// Real use case: wait until we get the data we need
let attempts = 0;
let dataLoaded = false;

while (!dataLoaded && attempts < 3) {
  dataLoaded = tryFetchData();
  attempts++;
}`,
      keyPoints: [
        'while (condition) runs as long as condition is true',
        'MUST update something inside the loop or it runs forever',
        'Use while when you don\'t know how many iterations you need',
        'Use for when you do know the count in advance',
        '!dataLoaded means "while data is NOT loaded"',
      ],
    },
    challenge: {
      prompt: 'What is the value of score after this while loop finishes?',
      code: `let score = 0;
let quarter = 1;

while (quarter <= 4) {
  score = score + 7;
  quarter++;
}`,
      options: ['7', '21', '28', '35'],
      correctIndex: 2,
      explanation: 'The loop runs for quarter = 1, 2, 3, 4 (stops when quarter becomes 5). That is 4 iterations. Each adds 7 to score. 7 × 4 = 28.',
      hint: 'How many times does the loop run? What happens to score each time?',
    },
    xpReward: 70,
    streakBonus: 14,
    concept: 'while_loops',
    difficulty: 1,
    tags: ['loops', 'while-loop', 'iteration'],
  },

  // ─── LEVEL 14: Learn — Arrays ─────────────────────────────────
  {
    id: 'level_014',
    levelNumber: 14,
    world: 2,
    track: 'python_logic',
    title: 'Arrays: The Depth Chart',
    subtitle: 'Store many values in order. Access any by its position.',
    type: 'learn',
    footballContext: "A depth chart is an ordered list — QB1, QB2, QB3. In code, an ordered list is called an array. Each player is stored at a numbered position called an index. The first position is index 0, not 1.",
    lesson: {
      overview: 'An array stores multiple values in an ordered list. Each item has a numbered position called an index, starting at 0.',
      explanation: "Arrays are one of the most-used data structures in all of programming. They're how you store a list of anything: scores, players, API results, recruits. You access any item instantly using its index. The first item is always index 0 — this catches beginners off guard, so remember it well.",
      codeExample: `// Creating an array of QB depth chart
const qbDepthChart = ["Marcus Johnson", "Tyler Brooks", "Eli Carter"];

// Accessing items by index (starts at 0!)
console.log(qbDepthChart[0]); // "Marcus Johnson" (the starter)
console.log(qbDepthChart[1]); // "Tyler Brooks" (backup)
console.log(qbDepthChart[2]); // "Eli Carter" (third string)

// Array length
console.log(qbDepthChart.length); // 3

// Updating an item
qbDepthChart[1] = "Josh Williams"; // replacing backup

// Adding to the end
qbDepthChart.push("Devon Harris");`,
      keyPoints: [
        'Arrays store multiple values in an ordered list',
        'Indexes start at 0 — first item is array[0]',
        'array.length gives the total number of items',
        'array.push(item) adds an item to the end',
        'You can loop through arrays to process every item',
      ],
    },
    challenge: {
      prompt: 'What does this code print?\n\nconst receivers = ["Carter", "Davis", "Wilson"];\nconsole.log(receivers[1]);',
      options: ['"Carter"', '"Davis"', '"Wilson"', 'undefined'],
      correctIndex: 1,
      explanation: 'Array indexes start at 0. receivers[0] = "Carter", receivers[1] = "Davis", receivers[2] = "Wilson". So receivers[1] is "Davis".',
      hint: 'Remember: the first item is at index 0, not index 1.',
    },
    xpReward: 75,
    streakBonus: 15,
    concept: 'arrays',
    difficulty: 1,
    tags: ['arrays', 'indexing', 'data-structures', 'beginner'],
  },

  // ─── LEVEL 15: Predict — Array Indexing (UNLOCK) ──────────────
  {
    id: 'level_015',
    levelNumber: 15,
    world: 2,
    track: 'python_logic',
    title: "Who's First Off the Bench?",
    subtitle: 'Arrays, length, and the last-index trick.',
    type: 'predict',
    footballContext: "You need to find the last player on the depth chart — the emergency option. Predict what index to use to get the last item in any array.",
    lesson: {
      overview: 'The last index of an array is always length - 1.',
      explanation: 'If an array has 5 items, the indexes are 0, 1, 2, 3, 4. The last is 4, which equals 5 - 1.',
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'What does this code print?',
      code: `const depthChart = ["Jordan", "Marcus", "Eli", "Devon"];
const lastIndex = depthChart.length - 1;
console.log(depthChart[lastIndex]);`,
      options: ['"Jordan"', '"Eli"', '"Devon"', 'undefined'],
      correctIndex: 2,
      explanation: 'The array has 4 items, so length = 4. lastIndex = 4 - 1 = 3. depthChart[3] = "Devon". This pattern (length - 1) always gives the last element.',
      hint: 'First figure out what length is. Then subtract 1. Then look up that index.',
    },
    xpReward: 80,
    streakBonus: 16,
    unlockFeature: 'weekly_simulator',
    concept: 'array_indexing',
    difficulty: 2,
    tags: ['arrays', 'indexing', 'length', 'predict'],
  },

  // ─── LEVEL 16: Learn — Functions ──────────────────────────────
  {
    id: 'level_016',
    levelNumber: 16,
    world: 2,
    track: 'python_logic',
    title: 'Functions: The Playbook',
    subtitle: 'Name a block of code. Call it anywhere. Call it anytime.',
    type: 'learn',
    footballContext: "A play in the playbook has a name: '34 Power Right'. Call that name and the entire play executes. In code, a function gives a name to a block of logic you can call anywhere.",
    lesson: {
      overview: 'A function is a named, reusable block of code. Define it once. Call it anywhere.',
      explanation: "Functions solve the biggest problem in programming: repetition and complexity. Instead of copying the same 10 lines of code everywhere you need them, you write a function once and call its name. Functions can take inputs (called parameters) and return an output (called a return value).",
      codeExample: `// Define the function (write the play)
function simulateGame(ugaRating, oppRating) {
  const advantage = ugaRating - oppRating;
  if (advantage > 0) {
    return "UGA wins";
  } else {
    return "Upset";
  }
}

// Call the function (run the play)
let result1 = simulateGame(95, 80); // "UGA wins"
let result2 = simulateGame(70, 90); // "Upset"

// You can call it as many times as you want
for (let week = 1; week <= 14; week++) {
  let gameResult = simulateGame(ugaRating, schedule[week].rating);
}`,
      keyPoints: [
        'function name(params) { } defines a function',
        'Parameters are inputs — values passed in when you call the function',
        'return sends a value back to whoever called the function',
        'Call a function by writing its name followed by ()',
        'Functions make code reusable, readable, and testable',
      ],
    },
    challenge: {
      prompt: 'Which code correctly defines a function called getWinner that takes two parameters (teamA and teamB) and returns the one with the higher rating?',
      options: [
        `getWinner(teamA, teamB) {
  if (teamA.rating > teamB.rating) return teamA;
  return teamB;
}`,
        `function getWinner(teamA, teamB) {
  if (teamA.rating > teamB.rating) return teamA;
  return teamB;
}`,
        `function getWinner() {
  if (teamA.rating > teamB.rating) return teamA;
  return teamB;
}`,
        `function getWinner(teamA, teamB) {
  if (teamA.rating > teamB.rating) { teamA; }
  teamB;
}`,
      ],
      correctIndex: 1,
      explanation: 'Option B is correct. It has the `function` keyword, a name, parameters in parentheses, a body in braces, and uses `return` to send back the result. Option A is missing the `function` keyword. Option C is missing the parameters. Option D uses return incorrectly.',
      hint: 'A function definition needs: the `function` keyword, a name, parentheses with params, braces, and return.',
    },
    xpReward: 75,
    streakBonus: 15,
    concept: 'functions',
    difficulty: 1,
    tags: ['functions', 'parameters', 'return', 'reusability'],
  },

  // ─── LEVEL 17: Fix — The Broken Play ──────────────────────────
  {
    id: 'level_017',
    levelNumber: 17,
    world: 2,
    track: 'python_logic',
    title: 'The Broken Play',
    subtitle: 'The function exists but never runs. Find out why.',
    type: 'fix',
    footballContext: "The simulation function is defined correctly but the game never starts. The plays are written but nobody is calling them. Find the bug.",
    lesson: {
      overview: 'Defining a function does not run it. You must call it explicitly.',
      explanation: 'A common beginner mistake is writing a function and thinking it will automatically execute. It won\'t. You define it, then call it separately.',
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'The code below defines a function but the score is always 0. What is wrong?',
      code: `function addFieldGoal(score) {
  return score + 3;
}

let currentScore = 0;
// Three field goals scored
addFieldGoal(currentScore);
addFieldGoal(currentScore);
addFieldGoal(currentScore);

console.log(currentScore); // prints 0 — why?`,
      options: [
        'The function is named incorrectly',
        'addFieldGoal(currentScore) should be currentScore = addFieldGoal(currentScore)',
        'The function should use += instead of return',
        'score + 3 should be score + 3.0',
      ],
      correctIndex: 1,
      explanation: 'The function call returns a new value but nothing captures it. You must assign the return value back: `currentScore = addFieldGoal(currentScore)`. The function does not modify currentScore directly — it returns a new value.',
      hint: 'The function returns a value. Where does that value go if nobody captures it?',
    },
    xpReward: 75,
    streakBonus: 15,
    concept: 'function_calls_return',
    difficulty: 2,
    tags: ['functions', 'return', 'debugging', 'common-mistakes'],
  },

  // ─── LEVEL 18: Predict — Return Values ────────────────────────
  {
    id: 'level_018',
    levelNumber: 18,
    world: 2,
    track: 'python_logic',
    title: 'Run the Simulation',
    subtitle: 'Trace through a function call and predict what it returns.',
    type: 'predict',
    footballContext: "The game simulation engine runs. Can you trace through each function call and predict the final season record?",
    lesson: {
      overview: 'Functions can call other functions. Trace the return values carefully.',
      explanation: 'When functions call other functions, trace from the inside out.',
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'What does playGame return?',
      code: `function getAdvantage(ugaRating, oppRating) {
  return ugaRating - oppRating;
}

function playGame(ugaRating, oppRating) {
  let edge = getAdvantage(ugaRating, oppRating);
  if (edge > 5) {
    return "W";
  } else {
    return "L";
  }
}

let result = playGame(92, 84);`,
      options: ['"W"', '"L"', '8', 'undefined'],
      correctIndex: 0,
      explanation: 'getAdvantage(92, 84) returns 92 - 84 = 8. edge = 8. Is 8 > 5? Yes. So playGame returns "W".',
      hint: 'Trace from the inner function outward. What does getAdvantage return first?',
    },
    xpReward: 80,
    streakBonus: 16,
    concept: 'function_return_values',
    difficulty: 2,
    tags: ['functions', 'return', 'tracing', 'predict'],
  },

  // ─── LEVEL 19: Apply — Build the Week Simulator ───────────────
  {
    id: 'level_019',
    levelNumber: 19,
    world: 2,
    track: 'javascript',
    title: 'Apply: Build the Week Simulator',
    subtitle: 'Loops + arrays + functions together. A real feature.',
    type: 'apply',
    footballContext: "You're building the Weekly Simulator. It needs to loop over every game in the week, call simulateGame for each one, and collect the results in an array. Which code does this correctly?",
    lesson: {
      overview: 'Real features combine multiple concepts: loops iterate over arrays, functions process each item, new arrays collect results.',
      explanation: 'The array.map() method is a cleaner way to loop and transform — it calls a function on every element and returns a new array of results.',
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'Which code correctly simulates all games in a week and collects results?',
      options: [
        `for (let game of weekGames) {
  simulateGame(game);
}`,
        `const results = [];
for (let i = 0; i < weekGames.length; i++) {
  const result = simulateGame(weekGames[i]);
  results.push(result);
}`,
        `const results = simulateGame(weekGames);`,
        `for (let i = 0; i <= weekGames.length; i++) {
  results.push(simulateGame(weekGames[i]));
}`,
      ],
      correctIndex: 1,
      explanation: 'Option B correctly initializes an empty results array, loops over every game (using < not <=), calls simulateGame on each, and pushes the result into the array. Option A doesn\'t collect results. Option C passes the whole array to a function expecting one game. Option D uses <= which would access an undefined index.',
      hint: 'You need to: 1) create a results array 2) loop correctly 3) capture each result.',
    },
    xpReward: 90,
    streakBonus: 18,
    concept: 'loops_arrays_functions',
    difficulty: 2,
    tags: ['apply', 'loops', 'arrays', 'functions', 'weekly-simulator'],
  },

  // ─── LEVEL 20: BOSS — Redshirt Championship ───────────────────
  {
    id: 'level_020',
    levelNumber: 20,
    world: 2,
    track: 'javascript',
    title: '🏆 BOSS: Redshirt Championship',
    subtitle: 'Five challenges. Need 4 of 5. Earn your starting spot.',
    type: 'boss',
    footballContext: "Redshirt year is over. Prove you've mastered loops, arrays, and functions. 5 challenges — get 4 right to unlock World 3: Starter.",
    challenge: {
      parts: [
        {
          prompt: 'A for loop starts at 0 and uses condition i < 7. How many times does it run?',
          options: ['6', '7', '8', '0'],
          correctIndex: 1,
          explanation: 'i takes values 0, 1, 2, 3, 4, 5, 6 — that is 7 iterations. The loop stops before i reaches 7.',
        },
        {
          prompt: 'What does arrays[2] return if arrays = [10, 20, 30, 40]?',
          options: ['10', '20', '30', '40'],
          correctIndex: 2,
          explanation: 'Index 2 is the third element (remember: indexes start at 0). arrays[0]=10, arrays[1]=20, arrays[2]=30.',
        },
        {
          prompt: 'A while loop with `while (score < 100)` — when does it stop?',
          options: [
            'When score equals exactly 100',
            'When score is >= 100',
            'After 100 iterations',
            'When score equals 0',
          ],
          correctIndex: 1,
          explanation: 'The condition is `score < 100`. The loop runs while that is true. It stops when `score < 100` becomes false — i.e., when score is 100 or more.',
        },
        {
          prompt: 'Which line correctly calls a function called calcScore with arguments 88 and 75?',
          options: [
            'function calcScore(88, 75)',
            'calcScore = (88, 75)',
            'let result = calcScore(88, 75)',
            'run calcScore with 88, 75',
          ],
          correctIndex: 2,
          explanation: 'Option C correctly calls the function and captures its return value. You call a function by writing its name followed by (arguments). Using `let result =` captures the return value so you can use it.',
        },
        {
          prompt: 'What does array.push("newItem") do?',
          options: [
            'Removes the last item from the array',
            'Adds "newItem" to the beginning of the array',
            'Adds "newItem" to the end of the array',
            'Replaces the first item with "newItem"',
          ],
          correctIndex: 2,
          explanation: 'push() adds an item to the END of an array. Use unshift() to add to the beginning. pop() removes from the end. shift() removes from the beginning.',
        },
      ],
      passingScore: 4,
    },
    xpReward: 175,
    streakBonus: 35,
    unlockFeature: 'world_3',
    concept: 'world_2_mastery',
    difficulty: 2,
    tags: ['boss', 'world-2', 'loops', 'arrays', 'functions'],
    isWorldBoss: true,
  },
];
