import React from 'react';
import { Player, Clr, Board } from '../../../types';
import ResourceComponent from './resource';
import BuyHoldComponent from './buy-hold';
import './player.css';

interface IProps {
  i: number;
  player: Player;
  selectedTokens: Array<Clr>;
  board: Board;
  buyHold: (cardId: number) => void;
  returnToken: (token: Clr) => void;
}

interface IState {
  showBuyHold: boolean;
}

function BigTen(props: { totalNumTokens: number; isCurrentPlayer: boolean }) {
  if (props.totalNumTokens === 10 && props.isCurrentPlayer) {
    return <div className="big-ten">10</div>;
  } else {
    return null;
  }
}

export default class PlayerComponent extends React.Component<IProps, IState> {
  state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = { showBuyHold: false };
  }

  public toggleShowBuyHold = () => {
    this.setState({
      showBuyHold: !this.state.showBuyHold,
    });
  };

  public handleBuyHold = (cardId: number) => {
    this.setState({
      showBuyHold: false,
    });
    this.props.buyHold(cardId);
  };

  render() {
    const isCurrentPlayer =
      this.props.i === parseInt(this.props.board.ctx.currentPlayer);
    const id = `player-component-${this.props.i}`;
    const currentPlayer: Player = this.props.board.G.players[
      parseInt(this.props.board.ctx.currentPlayer)
    ];
    const totalNumTokens =
      this.props.selectedTokens.length +
      Object.values(currentPlayer.tokens).reduce((a, c) => a + c);
    const resourceComponents = [
      Clr.bk,
      Clr.wh,
      Clr.re,
      Clr.bl,
      Clr.gr,
      Clr.go,
    ].map((clr: Clr) => (
      <ResourceComponent
        clr={clr}
        player={this.props.player}
        isCurrentPlayer={isCurrentPlayer}
        selectedTokens={this.props.selectedTokens}
        returnToken={this.props.returnToken}
        toggleShowBuyHold={this.toggleShowBuyHold}
      />
    ));
    const className = `player-component ${isCurrentPlayer ? 'current' : ''} ${this.props.board.isActive ? 'active' : ''}`;
    return (
      <div
        id={id}
        className={className}
      >
        <div className="player-head">
          <div className="name">Player {this.props.i + 1}</div>
          <div className="score">{this.props.player.score}</div>
        </div>

        <div className="player-body">
          <div
            className={`resource-components ${
              this.state.showBuyHold ? 'hide' : 'show'
            }`}
          >
            {resourceComponents}
          </div>
          <BuyHoldComponent
            show={this.state.showBuyHold}
            player={this.props.player}
            isCurrentPlayer={isCurrentPlayer}
            selectedTokens={this.props.selectedTokens}
            returnToken={this.props.returnToken}
            buyHold={this.handleBuyHold}
            toggleShowBuyHold={this.toggleShowBuyHold}
            board={this.props.board}
          />
          <BigTen
            totalNumTokens={totalNumTokens}
            isCurrentPlayer={isCurrentPlayer}
          />
        </div>
      </div>
    );
  }
}
