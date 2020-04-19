import React, { MouseEvent } from 'react';
import { Player, Clr, Board } from '../../../../../types';
import CardComponent from '../../../../row/card';
import './hold-viewer.css';

interface IProps {
  player: Player;
  isCurrentPlayer: boolean;
  selectedTokens: Array<Clr>;
  board: Board;
  buyHold: (cardId: number) => void;
  toggleShowBuyHold: () => void;
}

interface IState {
  cardIndex: number;
}

export default class HoldViewerComponent extends React.Component<
  IProps,
  IState
> {
  state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = { cardIndex: 0 };
  }

  private leftClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({
      cardIndex: this.state.cardIndex - 1,
    });
  };

  private rightClickHandler = (event: MouseEvent) => {
    event.preventDefault();

    if (this.state.cardIndex < this.props.player.holds.length - 1) {
      this.setState({
        cardIndex: this.state.cardIndex + 1,
      });
    } else {
      this.setState({
        cardIndex: 0,
      });
      this.props.toggleShowBuyHold();
    }
  };

  render() {
    const cardComponents = this.props.player.holds.map((c, i) => {
      return (
        <CardComponent
          key={i}
          card={c}
          board={this.props.board}
          selectedTokens={this.props.selectedTokens}
          buyCard={this.props.buyHold}
        />
      );
    });
    const leftArrowClassName = `left-arrow ${
      this.state.cardIndex > 0 ? 'show' : 'hide'
    }`;
    const rightArrowClassName = `right-arrow show`;
    return (
      <div className="hold-viewer-component">
        <div className={leftArrowClassName} onClick={this.leftClickHandler}>
          &#10151;
        </div>
        <div className="hold-collection-container">
          {cardComponents[this.state.cardIndex]}
        </div>
        <div className={rightArrowClassName} onClick={this.rightClickHandler}>
          &#10151;
        </div>
      </div>
    );
  }
}
