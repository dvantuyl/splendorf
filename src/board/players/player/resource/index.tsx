import React, { MouseEvent } from 'react';
import { Player, Clr } from '../../../../types';
import './resource.css';

export default (props: {
  clr: Clr;
  flexRow?: boolean;
  player: Player;
  isCurrentPlayer: boolean;
  selectedTokens: Array<Clr>;
  returnToken: (token: Clr) => void;
  toggleShowBuyHold: () => void;
}) => {
  const selectedTokensClrLength = props.selectedTokens.filter(
    (t) => t === props.clr
  ).length;
  const tokenCount = props.isCurrentPlayer
    ? props.player.tokens[props.clr] + selectedTokensClrLength
    : props.player.tokens[props.clr];

  const className = `resource-component ${
    props.flexRow ? 'flex-row' : 'flex-col'
  }`;
  const cardCount =
    props.clr === Clr.go
      ? props.player.holds.length
      : props.player.cards.filter((c) => c.clr === props.clr).length;

  const tokenClassName = `token 
    ${props.clr} ${tokenCount === 0 ? 'hide' : ''}
    ${selectedTokensClrLength > 0 && props.isCurrentPlayer ? 'selectable' : ''}
    ${
      Object.values(props.player.tokens).reduce((a, c) => a + c) +
        props.selectedTokens.length >
      10
        ? 'warn'
        : ''
    }`;

  const cardClassName = `card ${props.clr} ${cardCount === 0 ? 'hide' : ''}`;

  const handleCardClick = (event: MouseEvent) => {
    event.preventDefault();
    if (props.clr === Clr.go) {
      props.toggleShowBuyHold();
    }
  };

  return (
    <div key={props.clr} className={className}>
      <div
        className={tokenClassName}
        onClick={() => {
          props.returnToken(props.clr);
        }}
      >
        <div className="count">{tokenCount}</div>
      </div>
      <div className={cardClassName} onClick={handleCardClick}>
        <div className="count">{cardCount}</div>
      </div>
    </div>
  );
};
