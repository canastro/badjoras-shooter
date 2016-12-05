import { FIRE, BULLET_DIE } from '../actions/hero';
import { GAME_TICK } from '../actions/game';

const defaultBullet = {
    health: -10,
    position: { x: 0, y: 0 },
    id: null
};

const initialState = {
    bullets: {}
};

const handleFire = (state, action) => {
    return {
        ...state,
        bullets: {
            ...state.bullets,
            [action.id]: {
                ...defaultBullet,
                id: action.id,
                position: action.position
            }
        }
    };
};

export default function bulletReducer(state = initialState, action) {
    switch (action.type) {
    case GAME_TICK: {
        const newState = { bullets: {} };

        Object.keys(state.bullets).forEach((key) => {
            const bullet = state.bullets[key];
            bullet.position.y -= 10;
            if (bullet.position.y < window.innerHeight) {
                newState.bullets[key] = bullet;
            }
        });

        return newState;
    }

    case BULLET_DIE: {
        const newState = Object.assign({}, state);
        newState.bullets = Object.assign({}, state.bullets);
        delete newState.bullets[action.id];
        return newState;
    }

    case FIRE:
        return handleFire(state, action);

    default:
        return state;
    }
}
