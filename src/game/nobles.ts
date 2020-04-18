import { Noble } from '../types';

type nobleTableRow = [number, number, number, number, number, number, number];

const nobleTable: Array<nobleTableRow> = [
  [3, 0, 0, 4, 0, 4, 0],
  [3, 3, 3, 3, 0, 0, 0],
  [3, 0, 4, 0, 4, 0, 0],
  [3, 4, 4, 0, 0, 0, 0],
  [3, 0, 0, 0, 4, 4, 0],
  [3, 0, 0, 3, 3, 3, 0],
  [3, 0, 3, 0, 3, 3, 0],
  [3, 4, 0, 4, 0, 0, 0],
  [3, 3, 0, 3, 3, 0, 0],
  [3, 3, 0, 3, 0, 3, 0],
];

const createNoble = (
  id: number,
  pts: number,
  bk: number,
  wh: number,
  re: number,
  bl: number,
  gr: number,
  go: number
): Noble => {
  return {
    id,
    pts,
    cost: { bk, wh, re, bl, gr, go },
  };
};

export default nobleTable.map((n, i) => createNoble(i, ...n)) as Array<Noble>;
