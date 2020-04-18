import React, { MouseEvent } from 'react';
import { Player, Clr, Board } from '../../../../types';
import ResourceComponent from '../resource';
import HoldViewerComponent from './hold-viewer';
import './buy-hold.scss';

interface IProps {
  show: boolean;
  player: Player;
  isCurrentPlayer: boolean;
  selectedTokens: Array<Clr>;
  board: Board;
  returnToken: (token: Clr) => void;
  toggleShowBuyHold: () => void;
  buyHold: (cardId: number) => void;
}

interface IState {}

export default class BuyHoldComponent extends React.Component<IProps, IState> {
  state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  private handleResourceComponentsClick = (event: MouseEvent) => {
    event.preventDefault();
    this.props.toggleShowBuyHold();
  };

  render() {
    const resourceComponents = [
      Clr.bk,
      Clr.wh,
      Clr.re,
      Clr.bl,
      Clr.gr,
    ].map((clr: Clr) => (
      <ResourceComponent
        clr={clr}
        flexRow={true}
        player={this.props.player}
        isCurrentPlayer={this.props.isCurrentPlayer}
        selectedTokens={this.props.selectedTokens}
        returnToken={this.props.returnToken}
        toggleShowBuyHold={this.props.toggleShowBuyHold}
      />
    ));
    return (
      <div
        className={`buy-hold-component ${this.props.show ? 'show' : 'hide'}`}
      >
        <div
          className="resource-components-mini"
          onClick={this.handleResourceComponentsClick}
        >
          {resourceComponents}
        </div>
        <HoldViewerComponent {...this.props} />
      </div>
    );
  }
}
