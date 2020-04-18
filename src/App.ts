import { Client } from 'boardgame.io/react';
import game from './game';
import board from './board';

const App = Client({
  game,
  board,
  debug: false, //process.env.NODE_ENV === 'development',
  numPlayers: 2,
});

export default App;
