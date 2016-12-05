import {
    ACTIVATE_SHIELD,
    DISABLE_SHIELD,
    MOVE_HERO
} from '../actions/hero';

import { MOVE_LEFT, MOVE_RIGHT } from '../actions/game';

const defaultState = {
    heroState: 0,
    position: { x: 384, y: 384 },
    isShieldActivated: false,
    isShooting: false
};

const handleToggleShield = (state, isShieldActivated) => ({
    ...state,
    isShieldActivated
});

const handleMoveHero = (state, action) => {
    let heroState = 0;
    if (action.x > 0) {
        heroState = 3;
    } else if (action.x < 0) {
        heroState = 2;
    }

    return {
        ...state,
        position: {
            ...state.position,
            x: state.position.x + action.x,
            y: state.position.y + action.y
        },
        heroState
    };
};

export default function heroReducer(state = defaultState, action) {
    switch (action.type) {
    case ACTIVATE_SHIELD:
        return handleToggleShield(state, true);

    case DISABLE_SHIELD:
        return handleToggleShield(state, false);

    case MOVE_HERO:
        return handleMoveHero(state, action);

    case MOVE_LEFT:
        return handleMoveHero(state, { ...action, x: -10, y: 0 });
    case MOVE_RIGHT:
        return handleMoveHero(state, { ...action, x: 10, y: 0 });

    default:
        return state;
    }
}
