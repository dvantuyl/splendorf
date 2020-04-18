import React from 'react';
import { Board } from '../../../types';
import './deck.scss';

export default (props: { i: number; board: Board }) => {
  const id = `deck-component-${props.i}`;
  const numdots = Array.from(Array(props.i + 1)).map((x, i) => (
    <div key={i} className="dot" />
  ));
  const count = props.board.G.rows[props.i].deck.length;
  const className = `deck-component ${count === 0 ? 'hide' : ''}`;
  return (
    <section id={id} className={className}>
      {props.board.G.rows[props.i].deck.length}
      <div className="deck-dots">{numdots}</div>
    </section>
  );
};
