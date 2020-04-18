import { Ctx } from 'boardgame.io/dist/types/src/types';

export type Deck = Array<Card | undefined>;

export enum Clr {
  bk = 'bk',
  wh = 'wh',
  re = 're',
  bl = 'bl',
  gr = 'gr',
  go = 'go',
}

export type Colors = [Clr.bk, Clr.wh, Clr.re, Clr.bl, Clr.gr, Clr.go];

export type Tokens = {
  bk: number;
  wh: number;
  re: number;
  bl: number;
  gr: number;
  go: number;
};

export interface Player {
  tokens: Tokens;
  cards: Array<Card>;
  holds: Array<Card>;
  nobles: Array<Noble>;
  score: number;
  moves: number;
}

export interface Row {
  index: number;
  deck: Deck;
  reveal: Deck;
}

export interface Card {
  id: number;
  row: number;
  clr: Clr;
  pts: number;
  cost: Tokens;
}

export interface Noble {
  id: number;
  pts: number;
  cost: Tokens;
}

export interface City {
  id: number;
  pts: number;
  kind: number;
  clr: {
    bk: number;
    wh: number;
    re: number;
    bl: number;
    gr: number;
    go: number;
  };
}

export interface GameState {
  players: Array<Player>;
  rows: Array<Row>;
  top: Array<City>;
  tokens: Tokens;
}

export interface Board {
  moves: any;
  events: any;
  isActive: boolean;
  G: GameState;
  ctx: Ctx;
}
