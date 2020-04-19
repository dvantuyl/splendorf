import { GameConfig } from 'boardgame.io/dist/types/src/types';
import setup from './setup';
import { selectTokens, buyCard, holdCard, buyHold } from './moves';
import { cities as endIf } from './win-conditions';

export default {
  name: 'splendorf',
  setup,
  moves: {
    selectTokens,
    buyCard,
    holdCard,
    buyHold,
  },
  turn: {
    moveLimit: 1,
  },
  endIf,
} as GameConfig;
