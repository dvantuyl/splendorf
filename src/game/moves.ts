import { Ctx } from 'boardgame.io/dist/types/src/types';
import { Card, Clr, Player, Row, GameState, Tokens } from '../types';

export const selectTokens = (G: any, ctx: Ctx, tokens: Array<Clr>) => {
  const player = G.players[ctx.currentPlayer];

  tokens.forEach((t) => {
    G.tokens[t]--;
    player.tokens[t]++;
  });

  player.moves++;
};

export const buyCard = (G: GameState, ctx: Ctx, cardId: number) => {
  const player: Player = G.players[parseInt(ctx.currentPlayer)];
  const row: Row | undefined = G.rows.find((row: Row) =>
    row.reveal.some((c: Card | undefined) => c && c.id === cardId)
  );

  if (!row) return;

  const i: number = row.reveal.findIndex(
    (c: Card | undefined) => c && c.id === cardId
  );
  const card: Card | undefined = row.reveal[i];
  const topCard: Card | undefined = row.deck.pop();
  row.reveal[i] = topCard;

  if (!card) return;

  buy(player, card, G.tokens);

  player.moves++;
};

export const buyHold = (G: any, ctx: Ctx, id: number) => {
  const player: Player = G.players[ctx.currentPlayer];
  const card: Card | undefined = player.holds.find((c: Card) => c.id === id);

  if (!card) return;

  player.holds = player.holds.filter((c: Card) => c.id !== id);

  buy(player, card, G.tokens);

  player.moves++;
};

export const holdCard = (G: GameState, ctx: Ctx, cardId: number) => {
  const player: Player = G.players[parseInt(ctx.currentPlayer)];
  const row: Row | undefined = G.rows.find((row: Row) =>
    row.reveal.some((c: Card | undefined) => c && c.id === cardId)
  );

  if (!row) return;

  const i: number = row.reveal.findIndex(
    (c: Card | undefined) => c && c.id === cardId
  );
  const card: Card | undefined = row.reveal[i];
  const topCard: Card | undefined = row.deck.pop();
  row.reveal[i] = topCard;

  if (!card) return;

  player.holds.push(card);
  if (G.tokens[Clr.go] !== 0) {
    G.tokens[Clr.go]--;
    player.tokens[Clr.go]++;
  }

  player.moves++;
};

const buy = (player: Player, card: Card, tokens: Tokens) => {
  [Clr.bk, Clr.wh, Clr.re, Clr.bl, Clr.gr].forEach((clr: Clr) => {
    const cardCount = player.cards.filter((c) => c.clr === clr).length;
    const tokenCount = player.tokens[clr];
    const clrCount = tokenCount + cardCount;

    // Use gold if player token + cards are < cost
    if (clrCount < card.cost[clr]) {
      const costDelta = card.cost[clr] - clrCount;
      tokens.go += costDelta;
      tokens[clr] += player.tokens[clr];
      player.tokens.go -= costDelta;
      player.tokens[clr] = 0;

      // Use player tokens if player cards are < cost
    } else if (cardCount < card.cost[clr]) {
      const costDelta = card.cost[clr] - cardCount;
      player.tokens[clr] -= costDelta;
      tokens[clr] += costDelta;
    }
  });

  player.score += card.pts;
  player.cards.push(card);
};
