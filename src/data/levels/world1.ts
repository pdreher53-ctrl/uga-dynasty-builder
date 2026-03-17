// ═══════════════════════════════════════════════════════════════
// WORLD 1: Walk-On Developer — Levels 1–10
// ═══════════════════════════════════════════════════════════════
//
// Concepts: Variables, Data Types, Conditionals, Booleans
// Track: python_logic
// Boss at Level 10 unlocks World 2
//
// ARCHITECTURE NOTE:
// These are plain data objects. No React, no logic, no imports of components.
// The LevelScreen reads these objects and routes to the correct template.
// To add level 11 you just add another object to this array.

import { Level } from '../../types/engine';

export const world1Levels: Level[] = [
  // ─── LEVEL 1: Learn — Variables ───────────────────────────────
  {
    id: 'level_001',
    levelNumber: 1,
    world: 1,
    track: 'python_logic',
    title: 'Variables: Team Ratings',
    subtitle: 'Store a value. Label it. Use it.',
    type: 'learn',
    footballContext: "Every team has a rating. To store it in code, you use a variable — a labeled box that holds a value. UGA's rating? Put it in a box called ugaRating.",
    lesson: {
      overview: 'A variable is a named container that stores a value. You create it once and use it anywhere.',
      explanation: "In programming, you can't work with numbers floating in the air — you give them names. `let ugaRating = 95` creates a box called ugaRating and puts the number 95 inside it. Later, when you need UGA's rating, you just say ugaRating and the program knows what you mean.",
      codeExample: `// Create variables to store team ratings
let ugaRating = 95;
let alabamaRating = 93;
let floridaRating = 80;

// Use the variable later
console.log(ugaRating); // outputs: 95

// Update the variable (the box now holds a new value)
ugaRating = 97;
console.log(ugaRating); // outputs: 97`,
      keyPoints: [
        'Variables store values so you can use them later',
        'Use let to create a variable that can change',
        'Use const for values that never change',
        'Variable names should describe what they hold',
        'You can update a variable by reassigning it',
      ],
    },
    challenge: {
      prompt: 'Which line of code correctly creates a variable named offense and stores the value 88 inside it?',
      options: [
        'offense = 88',
        'let offense = 88',
        'variable offense = 88',
        'int offense = 88',
      ],
      correctIndex: 1,
      explanation: '`let offense = 88` is the correct JavaScript/TypeScript syntax. `let` is the keyword to create a variable, `offense` is the name, and `88` is the value stored inside it.',
      hint: 'In modern JavaScript, you use the `let` keyword to declare a variable.',
    },
    xpReward: 50,
    streakBonus: 10,
    concept: 'variables',
    difficulty: 1,
    tags: ['variables', 'beginner', 'python', 'javascript', 'fundamentals'],
  },

  // ─── LEVEL 2: Predict — Variable Reassignment ─────────────────
  {
    id: 'level_002',
    levelNumber: 2,
    world: 1,
    track: 'python_logic',
    title: "What's in the Box?",
    subtitle: 'Variables change. Track the value.',
    type: 'predict',
    footballContext: "A team's rating changes as the season goes on. You update the variable that holds it. Can you track what value a variable holds after multiple changes?",
    lesson: {
      overview: 'Variables can be updated. When you reassign a variable, the old value is gone and the new value takes its place.',
      explanation: 'Reading code that updates variables is a core skill. You trace through line by line, updating your mental picture of what each variable holds at each moment.',
      codeExample: `let ugaRating = 90;
ugaRating = ugaRating + 5;
ugaRating = ugaRating - 3;
console.log(ugaRating); // What prints here?`,
      keyPoints: [],
    },
    challenge: {
      prompt: 'What does the last line print?',
      code: `let ugaRating = 90;
ugaRating = ugaRating + 5;
ugaRating = ugaRating - 3;
console.log(ugaRating);`,
      options: ['90', '95', '92', '87'],
      correctIndex: 2,
      explanation: 'Start at 90. Add 5 → 95. Subtract 3 → 92. The final value is 92. This is called "tracing" code — following each operation step by step.',
      hint: 'Trace through each line. What does ugaRating equal after each line?',
    },
    xpReward: 50,
    streakBonus: 10,
    concept: 'variables',
    difficulty: 1,
    tags: ['variables', 'reassignment', 'tracing', 'beginner'],
  },

  // ─── LEVEL 3: Learn — Conditionals ────────────────────────────
  {
    id: 'level_003',
    levelNumber: 3,
    world: 1,
    track: 'python_logic',
    title: 'Conditionals: The Kickoff Decision',
    subtitle: 'IF this, THEN that. The engine of all decisions.',
    type: 'learn',
    footballContext: "A coordinator doesn't run the same play every time. IF the defense is blitzing, run a quick pass. ELSE, run your base play. That's a conditional. Every decision in code works this way.",
    lesson: {
      overview: 'A conditional runs different code based on whether a condition is true or false.',
      explanation: 'The `if/else` statement is how code makes decisions. It evaluates a condition — something that is either true or false — and runs different code for each case. Every prediction, every game result, every unlock in this app uses conditionals under the hood.',
      codeExample: `let ugaRating = 95;
let alabamaRating = 93;

if (ugaRating > alabamaRating) {
  console.log("UGA wins!");
} else {
  console.log("Alabama wins!");
}
// Output: "UGA wins!" (95 > 93 is true)`,
      keyPoints: [
        'if (condition) runs the block only when the condition is true',
        'else runs when the condition is false',
        '> means "greater than", < means "less than", === means "exactly equal"',
        'The condition always evaluates to true or false',
        'You can chain conditions with else if',
      ],
    },
    challenge: {
      prompt: 'A team needs a rating of 85 or higher to be "championship caliber." Which code correctly checks this for a team with rating stored in teamRating?',
      options: [
        'if teamRating >= 85 { return true; }',
        'if (teamRating >= 85) { return true; }',
        'if (teamRating > 85) { return true; }',
        'when (teamRating >= 85) { return true; }',
      ],
      correctIndex: 1,
      explanation: '`if (teamRating >= 85)` is correct. The condition must be in parentheses, and >= means "greater than OR equal to." Option C uses > which would exclude teams with exactly 85.',
      hint: 'Conditions in if statements always go inside parentheses ( ).',
    },
    xpReward: 60,
    streakBonus: 12,
    concept: 'conditionals',
    difficulty: 1,
    tags: ['conditionals', 'if-else', 'decision', 'beginner'],
  },

  // ─── LEVEL 4: Predict — Who Wins? ─────────────────────────────
  {
    id: 'level_004',
    levelNumber: 4,
    world: 1,
    track: 'python_logic',
    title: "Who Wins This Game?",
    subtitle: 'Trace through an if/else. Predict the output.',
    type: 'predict',
    footballContext: "The simulation engine runs an if/else every time teams play. Can you read it and predict who wins before the game plays out?",
    lesson: {
      overview: 'To predict what code does, trace through it line by line.',
      explanation: 'Given specific variable values, an if/else always takes one specific path. Follow the logic like a flowchart.',
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'What gets printed?',
      code: `let ugaRating = 88;
let floridaRating = 80;
let venueFactor = 3;

let ugaEffective = ugaRating + venueFactor;

if (ugaEffective > floridaRating) {
  console.log("Dawgs by " + (ugaEffective - floridaRating));
} else {
  console.log("Florida upsets");
}`,
      options: [
        '"Dawgs by 8"',
        '"Dawgs by 11"',
        '"Florida upsets"',
        '"Dawgs by 3"',
      ],
      correctIndex: 1,
      explanation: 'ugaEffective = 88 + 3 = 91. Is 91 > 80? Yes. So we enter the if block. 91 - 80 = 11. The output is "Dawgs by 11".',
      hint: 'First figure out what ugaEffective equals. Then check the condition.',
    },
    xpReward: 60,
    streakBonus: 12,
    concept: 'conditionals',
    difficulty: 1,
    tags: ['conditionals', 'tracing', 'predict', 'arithmetic'],
  },

  // ─── LEVEL 5: Apply — Pick the Winner Logic ───────────────────
  {
    id: 'level_005',
    levelNumber: 5,
    world: 1,
    track: 'python_logic',
    title: 'Apply: Pick the Winner Logic',
    subtitle: 'Use variables and conditionals together in a real feature.',
    type: 'apply',
    footballContext: "You're building the Pick the Winner mini-game. The engine needs to decide who wins based on team ratings. Write the function that powers it.",
    lesson: {
      overview: 'Real features combine multiple concepts. Here, variables + conditionals = the pick-winner engine.',
      explanation: "The Pick the Winner game does exactly this: it stores two team ratings in variables, compares them with a conditional, and returns the winner. You're writing a real feature.",
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'Which function correctly determines the winner between two teams based on their ratings?',
      options: [
        `function pickWinner(ratingA, ratingB) {
  ratingA > ratingB;
}`,
        `function pickWinner(ratingA, ratingB) {
  if ratingA > ratingB {
    return "Team A";
  } else {
    return "Team B";
  }
}`,
        `function pickWinner(ratingA, ratingB) {
  if (ratingA > ratingB) {
    return "Team A";
  } else {
    return "Team B";
  }
}`,
        `function pickWinner(ratingA, ratingB) {
  return ratingA + ratingB;
}`,
      ],
      correctIndex: 2,
      explanation: 'Option C is correct. It has proper syntax (condition in parens), uses the right comparison operator, and returns the correct winner for each case. Option A forgets to return and has no conditional. Option B is missing the parentheses around the condition.',
      hint: 'The function must compare the ratings AND return a result.',
    },
    xpReward: 75,
    streakBonus: 15,
    unlockFeature: 'pick_the_winner',
    concept: 'variables_conditionals',
    difficulty: 1,
    tags: ['apply', 'functions', 'conditionals', 'variables', 'pick-the-winner'],
  },

  // ─── LEVEL 6: Fix — The Broken Scouting Report ────────────────
  {
    id: 'level_006',
    levelNumber: 6,
    world: 1,
    track: 'python_logic',
    title: 'The Broken Scouting Report',
    subtitle: 'Something is wrong. Find the bug. Fix it.',
    type: 'fix',
    footballContext: "Your scouting report code is broken. The coach can't get a recruit's eligibility status. Find the syntax error and fix it before the signing period ends.",
    lesson: {
      overview: 'Debugging is reading error messages and fixing broken code. It is one of the most important skills in programming.',
      explanation: 'Every developer writes buggy code. The skill is recognizing the error pattern and knowing how to fix it. Missing parentheses, wrong operators, and typos are the most common bugs.',
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'This code has a bug. Which option fixes it correctly?',
      code: `let gpa = 3.5;
let eligible;

if gpa >= 2.0 {
  eligible = true;
} else {
  eligible = false;
}`,
      options: [
        'Change `if gpa >= 2.0` to `if gpa > 2.0`',
        'Change `if gpa >= 2.0 {` to `if (gpa >= 2.0) {`',
        'Change `eligible = true` to `return true`',
        'Remove the else block entirely',
      ],
      correctIndex: 1,
      explanation: 'The bug is missing parentheses around the condition. JavaScript requires the condition in an if statement to be wrapped in parentheses: `if (condition) { ... }`.',
      hint: 'Look at how the if statement is written. What is required around the condition?',
    },
    xpReward: 65,
    streakBonus: 13,
    concept: 'debugging_syntax',
    difficulty: 1,
    tags: ['debugging', 'syntax', 'fix', 'conditionals'],
  },

  // ─── LEVEL 7: Learn — Booleans ────────────────────────────────
  {
    id: 'level_007',
    levelNumber: 7,
    world: 1,
    track: 'python_logic',
    title: 'Booleans: Is the Starter Healthy?',
    subtitle: 'True or false. The simplest data type. The most powerful.',
    type: 'learn',
    footballContext: "Before every game, you check: is the starter healthy? The answer is either true or false — never maybe. In code, this true/false value is called a boolean.",
    lesson: {
      overview: 'A boolean is a value that is exactly true or exactly false. Nothing else.',
      explanation: "Booleans are the foundation of all decision-making in code. When you write `if (ugaRating > 90)`, the condition `ugaRating > 90` evaluates to a boolean — true or false. You can also store booleans directly: `let isHealthy = true`. They're used everywhere: feature flags, user permissions, game states, form validation.",
      codeExample: `// Storing booleans directly
let isStarterHealthy = true;
let isRival = false;
let isHomeGame = true;

// Comparisons produce booleans
let ugaRating = 95;
let isElite = ugaRating >= 90; // true
let isUnbeaten = false;

// Booleans in conditionals
if (isStarterHealthy && isHomeGame) {
  console.log("Full strength at home — we're winning");
}`,
      keyPoints: [
        'true and false are the only two boolean values',
        'Comparisons (>, <, ===, >=, <=) always return a boolean',
        '&& means AND — both conditions must be true',
        '|| means OR — at least one condition must be true',
        '! means NOT — flips true to false and false to true',
      ],
    },
    challenge: {
      prompt: 'A team is considered "ready to play" if the starter is healthy AND it is not a bye week. Which code correctly checks this?',
      options: [
        'if (isHealthy = true && isByeWeek = false)',
        'if (isHealthy && !isByeWeek)',
        'if (isHealthy || !isByeWeek)',
        'if (isHealthy AND NOT isByeWeek)',
      ],
      correctIndex: 1,
      explanation: '`if (isHealthy && !isByeWeek)` is correct. The && operator means both must be true. The ! (NOT) operator flips isByeWeek: if it\'s true (it IS a bye week), !isByeWeek is false, so the whole condition fails.',
      hint: 'AND requires both to be true. NOT flips a boolean value.',
    },
    xpReward: 55,
    streakBonus: 11,
    concept: 'booleans',
    difficulty: 1,
    tags: ['booleans', 'and', 'or', 'not', 'logic'],
  },

  // ─── LEVEL 8: Predict — Boolean Expressions ───────────────────
  {
    id: 'level_008',
    levelNumber: 8,
    world: 1,
    track: 'python_logic',
    title: 'True or False in the Blitz Package',
    subtitle: 'Read a boolean expression. Predict the result.',
    type: 'predict',
    footballContext: "The defensive coordinator runs a complex check before calling the blitz: Is the offense heavy? Are we in our nickel package? Can you evaluate the logic tree?",
    lesson: {
      overview: 'Boolean expressions can be chained with &&, ||, and !. Evaluate them from the inside out.',
      explanation: 'Each part evaluates to true or false, then the operators combine them.',
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'What is the final value of canBlitz?',
      code: `let isHeavySet = true;
let isNickelPackage = false;
let pressureAllowed = true;

let canBlitz = isHeavySet && !isNickelPackage && pressureAllowed;`,
      options: ['true', 'false', 'undefined', 'null'],
      correctIndex: 0,
      explanation: 'isHeavySet = true. !isNickelPackage = !false = true. pressureAllowed = true. true && true && true = true. canBlitz is true.',
      hint: '! flips the boolean. Evaluate each part, then combine with &&.',
    },
    xpReward: 65,
    streakBonus: 13,
    concept: 'boolean_expressions',
    difficulty: 2,
    tags: ['booleans', 'and', 'not', 'predict', 'expressions'],
  },

  // ─── LEVEL 9: Fix — The Nested Check ─────────────────────────
  {
    id: 'level_009',
    levelNumber: 9,
    world: 1,
    track: 'python_logic',
    title: 'The Nested Check',
    subtitle: 'A bug is hiding inside a nested conditional. Hunt it down.',
    type: 'fix',
    footballContext: "The recruiting evaluator has nested checks: is the recruit 5-star AND from Georgia, or at least 4-star AND an in-state player? Something is wrong with the logic. Fix it.",
    lesson: {
      overview: 'Nested conditionals have multiple levels of if/else. Bugs often hide in the operator choice.',
      explanation: 'The most common bug in nested conditionals is using || when you mean && (or vice versa). One wrong operator changes the entire logic.',
      codeExample: '',
      keyPoints: [],
    },
    challenge: {
      prompt: 'The function should return true only if the recruit is 5-star AND from Georgia, OR if they are 4-star AND their state is "Georgia". What is wrong with the current code?',
      code: `function isTopTarget(stars, state) {
  if (stars === 5 || state === "Georgia") {
    return true;
  } else if (stars >= 4 && state === "Georgia") {
    return true;
  }
  return false;
}`,
      options: [
        'The else if should use || instead of &&',
        'The first condition uses || but should use && — it currently accepts ANY 5-star from anywhere',
        'The function is missing a return type',
        'The comparisons should use == instead of ===',
      ],
      correctIndex: 1,
      explanation: 'The bug is in the first condition. `stars === 5 || state === "Georgia"` means "5-star OR from Georgia" — but the requirement is "5-star AND from Georgia." A 5-star recruit from Ohio would pass this check incorrectly. Fix: change || to &&.',
      hint: 'What does the first condition actually say? Does it match what the requirement says?',
    },
    xpReward: 70,
    streakBonus: 14,
    concept: 'nested_conditionals',
    difficulty: 2,
    tags: ['debugging', 'nested', 'conditionals', 'logic-errors'],
  },

  // ─── LEVEL 10: BOSS — Walk-On Championship ────────────────────
  {
    id: 'level_010',
    levelNumber: 10,
    world: 1,
    track: 'python_logic',
    title: '🏆 BOSS: Walk-On Championship',
    subtitle: 'Five challenges. Need 4 of 5. Earn your scholarship.',
    type: 'boss',
    footballContext: "It's the Walk-On Championship. You've learned variables, conditionals, and booleans. Now prove it in 5 back-to-back challenges. Win 4 or more to unlock World 2.",
    challenge: {
      parts: [
        {
          prompt: 'What keyword creates a variable that CAN be reassigned?',
          options: ['var', 'let', 'const', 'def'],
          correctIndex: 1,
          explanation: '`let` creates a reassignable variable. `const` creates one that cannot be reassigned. `var` is old-style (still works). `def` is Python, not JavaScript.',
        },
        {
          prompt: 'What is the output of this code?\n\nlet x = 10;\nif (x > 5) {\n  x = x * 2;\n}\nconsole.log(x);',
          options: ['10', '5', '20', '15'],
          correctIndex: 2,
          explanation: 'x starts at 10. 10 > 5 is true, so the if block runs. x = 10 * 2 = 20. Output: 20.',
        },
        {
          prompt: 'What does `!true` evaluate to?',
          options: ['true', 'false', '0', 'null'],
          correctIndex: 1,
          explanation: 'The ! operator (NOT) flips a boolean. !true = false. !false = true.',
        },
        {
          prompt: 'Which comparison operator means "greater than OR equal to"?',
          options: ['>', '>=', '==', '=>'],
          correctIndex: 1,
          explanation: '>= means greater than or equal to. > means strictly greater than. == checks equality. => is arrow function syntax, not a comparison.',
        },
        {
          prompt: 'A rating is "elite" if it is 90 or above. Which condition is correct?',
          options: [
            'if (rating = 90)',
            'if (rating == 90)',
            'if (rating >= 90)',
            'if (rating =< 90)',
          ],
          correctIndex: 2,
          explanation: '`rating >= 90` means 90 or higher. Option A uses = which is assignment (not comparison). Option B checks for exactly 90 only. Option D is not valid syntax.',
        },
      ],
      passingScore: 4,
    },
    xpReward: 150,
    streakBonus: 30,
    unlockFeature: 'world_2',
    concept: 'world_1_mastery',
    difficulty: 2,
    tags: ['boss', 'world-1', 'variables', 'conditionals', 'booleans'],
    isWorldBoss: true,
  },
];
