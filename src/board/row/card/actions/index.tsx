import React, { MouseEvent } from 'react';
import { Board, Player, Card, Clr } from '../../../../types';
import './actions.scss';

const calcIfCanBuy = (player: Player, card: Card): boolean => {
  return (
    player.tokens.go >=
    [Clr.bk, Clr.wh, Clr.re, Clr.bl, Clr.gr]
      .map((clr: Clr) => {
        const cardCount = player.cards.filter((c) => c.clr === clr).length;
        const tokenCount = player.tokens[clr];
        const clrCount = tokenCount + cardCount;

        if (clrCount <= card.cost[clr]) {
          return card.cost[clr] - clrCount;
        } else {
          return 0;
        }
      })
      .reduce((a, c) => a + c)
  );
};

export default (props: {
  show: boolean;
  card: Card;
  board: Board;
  buyCard: (cardId: number) => void;
  holdCard?: (cardId: number) => void;
}) => {
  const currentPlayer: Player =
    props.board.G.players[parseInt(props.board.ctx.currentPlayer)];
  const canBuy = calcIfCanBuy(currentPlayer, props.card);
  const canHold = currentPlayer.holds.length < 3 && props.holdCard;
  const className = `card-actions-component ${props.show ? 'show' : ''}`;
  const classNameBuy = `btn buy-action ${canBuy ? 'show' : ''}`;
  const classNameHold = `btn hold-action ${
    canHold && props.show ? 'show' : ''
  }`;

  const buyAction = (event: MouseEvent) => {
    event.preventDefault();
    if (canBuy) {
      props.buyCard(props.card.id);
    }
  };

  const holdAction = (event: MouseEvent) => {
    event.preventDefault();
    if (canHold && props.holdCard) {
      props.holdCard(props.card.id);
    }
  };

  return (
    <div className={className}>
      <div className={classNameBuy} onClick={buyAction}>
        Buy
      </div>
      <div className={classNameHold} onClick={holdAction}>
        Hold
      </div>
    </div>
  );
};
