import {
    ACTIVATE_SHIELD,
    DISABLE_SHIELD,
    MOVE_HERO
} from '../actions/hero';

const defaultState = {
    position: { x: 384, y: 384 },
    isShieldActivated: false,
    isShooting: false
};

const handleToggleShield = (state, isShieldActivated) => ({
    ...state,
    isShieldActivated
});

const handleMoveHero = (state, action) => ({
    ...state,
    position: {
        ...state.position,
        x: state.position.x + action.x,
        y: state.position.y + action.y
    }
});

export default function heroReducer(state = defaultState, action) {
    switch (action.type) {
    case ACTIVATE_SHIELD:
        return handleToggleShield(state, true);

    case DISABLE_SHIELD:
        return handleToggleShield(state, false);

    case MOVE_HERO:
        return handleMoveHero(state, action);

    default:
        return state;
    }
}
