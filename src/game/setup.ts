import { Ctx } from 'boardgame.io/dist/types/src/types';
import { GameState, Deck, Row } from '../types';
import player from './player';
import cards from './cards';
import cities from './cities';

export default (ctx: Ctx): GameState => {
  const players = [...new Array(ctx.numPlayers).fill(player)];
  const cardsShuffled = ctx.random?.Shuffle(cards) || [];
  const citiesShuffled = ctx.random?.Shuffle(cities) || [];
  const deck0: Deck = cardsShuffled.filter((c) => c.row === 0);
  const deck1: Deck = cardsShuffled.filter((c) => c.row === 1);
  const deck2: Deck = cardsShuffled.filter((c) => c.row === 2);
  const rows: Array<Row> = [
    {
      index: 0,
      reveal: deck0.splice(0, 4),
      deck: deck0,
    },
    {
      index: 1,
      reveal: deck1.splice(0, 4),
      deck: deck1,
    },
    {
      index: 2,
      reveal: deck2.splice(0, 4),
      deck: deck2,
    },
  ];
  const top = citiesShuffled.splice(0, 3);

  const numTokens = (numPlayers: number): number => {
    switch (numPlayers) {
      case 3:
        return 5;
      case 2:
        return 4;
      default:
        return 7;
    }
  };
  const tokens = {
    bk: numTokens(ctx.numPlayers),
    wh: numTokens(ctx.numPlayers),
    re: numTokens(ctx.numPlayers),
    bl: numTokens(ctx.numPlayers),
    gr: numTokens(ctx.numPlayers),
    go: 5,
  };

  return {
    tokens,
    players,
    top,
    rows,
  };
};
