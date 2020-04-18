import React from 'react';
import { Card, Clr, Board } from '../../../types';
import ActionsComponent from './actions';
import './card.scss';

type Token = { clr: Clr; cost: number };
interface IProps {
  card: Card | undefined;
  board: Board;
  selectedTokens: Array<Clr>;
  buyCard: (cardId: number) => void;
  holdCard?: (cardId: number) => void;
}
interface IState {
  showActions: boolean;
}
export default class CardComponent extends React.Component<IProps, IState> {
  state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = { showActions: false };
  }

  onMouseEnter() {
    this.setState({
      showActions:
        this.props.board.isActive && this.props.selectedTokens.length === 0,
    });
  }

  onMouseLeave() {
    this.setState({
      showActions: false,
    });
  }

  render() {
    const card: Card | undefined = this.props.card;

    if (!card) {
      return <div className="card-component hide"></div>;
    } else {
      const costs = [Clr.bk, Clr.wh, Clr.re, Clr.gr, Clr.bl]
        .map(
          (clr): Token => {
            return { clr: clr, cost: card.cost[clr] };
          }
        )
        .filter((token: Token) => token.cost > 0)
        .sort((a: Token, b: Token) => b.cost - a.cost)
        .map((token: Token) => {
          const className = `token ${token.clr}`;
          return (
            <div key={token.clr} className={className}>
              <div className="count">{token.cost}</div>
            </div>
          );
        });

      return (
        <div
          className="card-component"
          onMouseEnter={() => this.onMouseEnter()}
          onMouseLeave={() => this.onMouseLeave()}
        >
          <div
            className={`background-image-container ${card.clr}-${card.row}`}
          ></div>
          <div className={`card-container card-${card.clr}`}>
            <div className="card-head">
              <div className="card-pts">{card.pts === 0 ? '' : card.pts}</div>
              <div className={`card-jewel ${card.clr}`} />
            </div>
            <div className="card-body">{costs}</div>
          </div>
          <ActionsComponent
            show={this.state.showActions}
            card={card}
            board={this.props.board}
            buyCard={this.props.buyCard}
            holdCard={this.props.holdCard}
          />
        </div>
      );
    }
  }
}
