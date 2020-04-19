import React from 'react';
import { Clr, Board } from '../../types';
import PlayerComponent from './player';
import './players.css';

export default (props: {
  selectedTokens: Array<Clr>;
  returnToken: (token: Clr) => void;
  buyHold: (cardId: number) => void;
  board: Board;
}) => {
  const playerComponents = props.board.G.players.map((p, i) => {
    return (
      <PlayerComponent
        key={i}
        i={i}
        player={p}
        buyHold={props.buyHold}
        returnToken={props.returnToken}
        selectedTokens={props.selectedTokens}
        board={props.board}
      />
    );
  });
  return <section id="players-component">{playerComponents}</section>;
};
