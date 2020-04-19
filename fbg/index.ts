const Thumbnail = require('./media/thumbnail.png?lqip-colors');
import { GameMode } from '../../../components/App/Game/GameModePicker';
import { IGameDef } from '../../../games';
import instructions from './instructions.md';

export const splendorfGameDef: IGameDef = {
  code: 'splendorf',
  name: 'Splendorf',
  imageURL: Thumbnail,
  modes: [{ mode: GameMode.OnlineFriend }, { mode: GameMode.LocalFriend }],
  minPlayers: 2,
  maxPlayers: 4,
  description: 'Classic game of Splendorf!',
  descriptionTag: `Splen all your dorf in the amazing world of Splendorf!`,
  instructions: {
    videoId: 'rue8-jvbc9I',
    text: instructions,
  },
  config: () => import('./config'),
};