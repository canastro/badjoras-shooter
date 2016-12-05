import { combineReducers } from 'redux';

import app from './app';
import bullets from './bullets';
import editor from './editor';
import game from './game';
import hero from './hero';

export default combineReducers({
    app,
    bullets,
    editor,
    hero,
    game
});
