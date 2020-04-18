import { Ctx } from 'boardgame.io/dist/types/src/types';
import { GameState, Player, City, Clr, Card } from '../types';

export const original = (G: GameState, ctx: Ctx): any => {
  if (parseInt(ctx.currentPlayer) !== ctx.numPlayers - 1) return;

  if (G.players.some((p: Player) => p.score >= 15)) {
    return G.players.sort((p: Player) => p.score).reverse();
  }
};

export const cities = (G: GameState, ctx: Ctx): any => {
  const playerMoves = G.players
    .map((p) => p.moves)
    .filter((v, i, s) => s.indexOf(v) === i);
  if (playerMoves.length !== 1 || playerMoves[0] === 0) return false;

  const winners = G.players.filter((pl: Player) => {
    return G.top.some((city: City) => {
      // Check points
      if (pl.score < city.pts) return false;

      // Check colors
      if (
        [Clr.bk, Clr.wh, Clr.re, Clr.bl, Clr.gr].some((clr: Clr) => {
          const pCards = pl.cards.filter((card: Card) => card.clr === clr)
            .length;
          return pCards < city.clr[clr];
        })
      )
        return false;

      // Check any-of-a-kind
      return (
        city.kind === 0 ||
        [Clr.bk, Clr.wh, Clr.re, Clr.bl, Clr.gr].some((clr: Clr) => {
          const pCards = pl.cards.filter((card: Card) => card.clr === clr)
            .length;
          return pCards >= city.kind && city.clr[clr] === 0;
        })
      );
    });
  });

  return winners.sort((a, b) => a.cards.length - b.cards.length)[0];
};
