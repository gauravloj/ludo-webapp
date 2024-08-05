import { all_constants } from "./constants";
import { getInitialPieceInfo } from "./gameplay";
function initializeAllPlayers(player_color) {
  const player_color_index = all_constants.COLOR_SEQUENCE.indexOf(player_color);
  return {
    // bottom left
    player: getInitialPieceInfo(
      player_color,
      all_constants.PLAYER_CONSTANTS.startBoxIndex,
      all_constants.PLAYER_CONSTANTS.endBoxIndex,
      all_constants.PLAYER_CONSTANTS.winningPath,
    ),
    // bottom right
    minion_one: getInitialPieceInfo(
      all_constants.COLOR_SEQUENCE[(player_color_index + 1) % 4],
      all_constants.MINION_ONE_CONSTANTS.startBoxIndex,
      all_constants.MINION_ONE_CONSTANTS.endBoxIndex,
      all_constants.MINION_ONE_CONSTANTS.winningPath,
    ),
    // top right
    nemesis: getInitialPieceInfo(
      all_constants.COLOR_SEQUENCE[(player_color_index + 2) % 4],
      all_constants.NEMESIS_CONSTANTS.startBoxIndex,
      all_constants.NEMESIS_CONSTANTS.endBoxIndex,
      all_constants.NEMESIS_CONSTANTS.winningPath,
    ),
    // top left
    minion_too: getInitialPieceInfo(
      all_constants.COLOR_SEQUENCE[(player_color_index + 3) % 4],
      all_constants.MINION_TOO_CONSTANTS.startBoxIndex,
      all_constants.MINION_TOO_CONSTANTS.endBoxIndex,
      all_constants.MINION_TOO_CONSTANTS.winningPath,
    ),
  };
}

export const helperFunction = { initializeAllPlayers };
