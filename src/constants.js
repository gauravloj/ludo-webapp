const COLORS = {
  lime: "bg-lime-600",
  cyan: "bg-cyan-400",
  rose: "bg-rose-600",
  purple: "bg-purple-600",
  white: "bg-white",
};

const COLORS_HEX = {
  lime: "#65A30D",
  cyan: "#22D3EE",
  rose: "#E11D48",
  purple: "#9333EA",
  white: "#FFFFFF",
  black: "#000000",
  [COLORS.lime]: "#65A30D",
  [COLORS.cyan]: "#22D3EE",
  [COLORS.rose]: "#E11D48",
  [COLORS.purple]: "#9333EA",
  [COLORS.white]: "#FFFFFF",
};

const COLOR_SEQUENCE = [COLORS.lime, COLORS.cyan, COLORS.rose, COLORS.purple];

const CORNER_INDICES = {
  1: "common",
  2: "common",
  3: "common",
  4: "common",
  5: "top_right",
  6: "top_right",
  7: "top_right",
  8: "top_right",
  9: "common",
  10: "common",
  11: "top_right",
  12: "common",
  13: "common",
  14: "top_right",
  15: "common",
  16: "common",
  17: "top_right",
  18: "common",
  19: "common",
  20: "top_left",
  21: "common",
  22: "common",
  23: "common",
  24: "common",
  28: "bottom_right",
  29: "common",
  30: "common",
  31: "common",
  32: "top_left",
  33: "top_left",
  34: "top_left",
  35: "top_left",
  36: "top_left",
  37: "bottom_right",
  38: "bottom_right",
  39: "bottom_right",
  40: "bottom_right",
  41: "bottom_right",
  42: "common",
  43: "common",
  44: "common",
  45: "top_left",
  46: "common",
  47: "common",
  48: "common",
  49: "common",
  50: "common",
  51: "common",
  52: "common",
  53: "bottom_right",
  54: "common",
  58: "common",
  59: "common",
  60: "common",
  61: "common",
  62: "bottom_right",
  63: "common",
  64: "common",
  65: "bottom_left",
  66: "common",
  67: "common",
  68: "bottom_left",
  69: "common",
  70: "common",
  71: "bottom_left",
  72: "common",
  73: "common",
  74: "bottom_left",
  75: "bottom_left",
  76: "bottom_left",
  77: "bottom_left",
  78: "common",
  79: "common",
  80: "common",
  81: "common",
};

const PLAYER_CONSTANTS = {
  startBoxIndex: 0,
  endBoxIndex: 50,
  winningPath: [-666, 77, 74, 71, 68, 65, -666], // TODO: Change last value to 666
};

const NEMESIS_CONSTANTS = {
  startBoxIndex: 26,
  endBoxIndex: 24,
  winningPath: [-666, 5, 8, 11, 14, 17, -666],
};

const MINION_ONE_CONSTANTS = {
  startBoxIndex: 13,
  endBoxIndex: 11,
  winningPath: [-666, 32, 33, 34, 35, 36, -666],
};

const MINION_TOO_CONSTANTS = {
  startBoxIndex: 39,
  endBoxIndex: 37,
  winningPath: [-666, 41, 40, 39, 38, 37, -666],
};

const REGULAR_PATH = [
  76, 73, 70, 67, 64, 48, 47, 46, 45, 44, 43, 31, 19, 20, 21, 22, 23, 24, 16,
  13, 10, 7, 4, 1, 2, 3, 6, 9, 12, 15, 18, 25, 26, 27, 28, 29, 30, 42, 54, 53,
  52, 51, 50, 49, 66, 69, 72, 75, 78, 81, 80, 79,
];

const USER_STATES = {
  pendingDiceRoll: "pendingDiceRoll",
  pendingPieceSelection: "pendingPieceSelection",
  pendingNemesisTurn: "pendingNemesisTurn",
  pendingSecondNemesisTurn: "pendingSecondNemesisTurn",
  gameOver: "gameOver",
};

export const all_constants = {
  COLORS,
  COLORS_HEX,
  COLOR_SEQUENCE,
  CORNER_INDICES,
  MINION_ONE_CONSTANTS,
  MINION_TOO_CONSTANTS,
  NEMESIS_CONSTANTS,
  PLAYER_CONSTANTS,
  REGULAR_PATH,
  USER_STATES,
};
