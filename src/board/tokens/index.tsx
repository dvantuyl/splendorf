import React from 'react';
import { GameState, Clr } from '../../types';
import TokenComponent from './token';
import './tokens.css';

export default (props: {
  selectToken: (clr: Clr) => void;
  selectedTokens: Array<Clr>;
  G: GameState;
}) => {
  const tokenComponents = [Clr.bk, Clr.wh, Clr.re, Clr.bl, Clr.gr, Clr.go].map(
    (clr: Clr) => {
      const count =
        props.G.tokens[clr] -
        props.selectedTokens.filter((t) => t === clr).length;
      return (
        <TokenComponent
          key={clr}
          clr={clr}
          count={count}
          selectToken={props.selectToken}
        ></TokenComponent>
      );
    }
  );
  return <section id="tokens-component">{tokenComponents}</section>;
};
