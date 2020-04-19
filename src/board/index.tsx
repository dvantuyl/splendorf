import React from 'react';
import { Board, Clr, Player } from '../types';
import CitiesComponent from './cities';
import RowComponent from './row/';
import TokensComponent from './tokens/';
import PlayersComponent from './players';
import './board.css';

interface IState {
  selectedTokens: Array<Clr>;
}
export default class BoardComponent extends React.Component<Board, IState> {
  state: IState;

  constructor(props: Board) {
    super(props);
    this.state = { selectedTokens: [] };
  }

  public selectToken = (token: Clr) => {
    if (!this.props.isActive) return;

    const currentPlayer: Player = this.props.G.players[
      parseInt(this.props.ctx.currentPlayer)
    ];
    const selectedTokens: Array<Clr> = [
      ...this.state.selectedTokens.slice(),
      token,
    ];
    const totalPlayerTokens =
      Object.values(currentPlayer.tokens).reduce((a, c) => a + c) +
      selectedTokens.length;

    const oneTokenPotential = selectedTokens.length === 1;
    const twoTokenSelect =
      selectedTokens.length === 2 &&
      selectedTokens[0] === selectedTokens[1] &&
      this.props.G.tokens[token] >= 4;
    const twoTokenPotential =
      selectedTokens.length === 2 && selectedTokens[0] !== selectedTokens[1];
    const threeTokenSelect =
      selectedTokens.length === 3 &&
      selectedTokens[0] !== selectedTokens[1] &&
      selectedTokens[1] !== selectedTokens[2];

    if ((twoTokenSelect || threeTokenSelect) && totalPlayerTokens <= 10) {
      this.setState({
        selectedTokens: [],
      });
      this.props.moves.selectTokens(selectedTokens);
    } else if (
      oneTokenPotential ||
      twoTokenSelect ||
      twoTokenPotential ||
      threeTokenSelect
    ) {
      this.setState({ selectedTokens: selectedTokens });
    }
  };

  public returnToken = (token: Clr) => {
    if (!this.props.isActive) return;

    const currentPlayer: Player = this.props.G.players[
      parseInt(this.props.ctx.currentPlayer)
    ];
    const index = this.state.selectedTokens.indexOf(token);
    const selectedTokens = this.state.selectedTokens.filter(
      (_, i) => i !== index
    );
    const totalPlayerTokens =
      Object.values(currentPlayer.tokens).reduce((a, c) => a + c) +
      selectedTokens.length;

    const zeroTokenPotential = selectedTokens.length === 0;
    const oneTokenPotential = selectedTokens.length === 1;
    const twoTokenSelect =
      selectedTokens.length === 2 &&
      selectedTokens[0] === selectedTokens[1] &&
      this.props.G.tokens[token] >= 4;
    const twoTokenPotential =
      selectedTokens.length === 2 && selectedTokens[0] !== selectedTokens[1];
    const threeTokenSelect =
      selectedTokens.length === 3 &&
      selectedTokens[0] !== selectedTokens[1] &&
      selectedTokens[1] !== selectedTokens[2];

    if (
      (zeroTokenPotential ||
        oneTokenPotential ||
        twoTokenSelect ||
        twoTokenPotential ||
        threeTokenSelect) &&
      totalPlayerTokens === 10
    ) {
      this.setState({
        selectedTokens: [],
      });
      this.props.moves.selectTokens(selectedTokens);
    } else {
      this.setState({
        selectedTokens: selectedTokens,
      });
    }
  };

  public buyCard = (cardId: number) => {
    if (!this.props.isActive) return;
    this.props.moves.buyCard(cardId);
  };
  public buyHold = (cardId: number) => {
    if (!this.props.isActive) return;
    this.props.moves.buyHold(cardId);
  };
  public holdCard = (cardId: number) => {
    if (!this.props.isActive) return;
    this.props.moves.holdCard(cardId);
  };

  render() {
    const rowComponents = this.props.G.rows
      .map((r, i) => (
        <RowComponent
          key={i}
          i={i}
          row={r}
          board={this.props}
          buyCard={this.buyCard}
          holdCard={this.holdCard}
          selectedTokens={this.state.selectedTokens}
        />
      ))
      .reverse();

    return (
      <div id="board-component">
        <CitiesComponent {...this.props} />
        {rowComponents}
        <TokensComponent
          selectToken={this.selectToken}
          selectedTokens={this.state.selectedTokens}
          {...this.props}
        />

        <PlayersComponent
          selectedTokens={this.state.selectedTokens}
          buyHold={this.buyHold}
          returnToken={this.returnToken}
          board={this.props}
        />
      </div>
    );
  }
}
