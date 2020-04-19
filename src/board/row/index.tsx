import React from 'react';
import { Row, Board, Clr } from '../../types';
import DeckComponent from './deck';
import CardComponent from './card';
import './row.css';

export default (props: {
  i: number;
  row: Row;
  board: Board;
  selectedTokens: Array<Clr>;
  buyCard: (cardId: number) => void;
  holdCard: (cardId: number) => void;
}) => {
  const id: string = `row-component-${props.i}`;
  const cardComponents = props.row.reveal
    .map((c, i) => (
      <CardComponent
        key={i}
        card={c}
        selectedTokens={props.selectedTokens}
        board={props.board}
        buyCard={props.buyCard}
        holdCard={props.holdCard}
      />
    ))
    .reverse();

  return (
    <section id={id} className="row-component">
      <DeckComponent i={props.i} board={props.board} />
      {cardComponents}
    </section>
  );
};
