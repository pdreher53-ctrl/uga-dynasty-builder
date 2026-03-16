export { CodeTypingExercise, type CodeTypingChallenge } from './CodeTyping';
export { DragDropExercise, type DragDropChallenge, type MatchPair } from './DragDropMatch';
export { FillInBlankExercise, type FillBlankChallenge } from './FillInBlank';
export { DebugChallengeExercise, type DebugChallengeData } from './DebugChallenge';

export type InteractiveChallenge =
  | import('./CodeTyping').CodeTypingChallenge
  | import('./DragDropMatch').DragDropChallenge
  | import('./FillInBlank').FillBlankChallenge
  | import('./DebugChallenge').DebugChallengeData;
