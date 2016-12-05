import { GO_TO_GAME_STEP, GO_TO_NEXT_GAME_STEP } from '../actions/game';

const defaultState = {
    gameStep: 0,
    level: 1
};

const handleGoToGameStep = (state, action) => ({
    ...defaultState,
    gameStep: action.id
});

const handleGoToNextGameStep = state => ({
    ...defaultState,
    gameStep: state.gameStep + 1
});

export default function appReducer(state = defaultState, action) {
    switch (action.type) {
    case GO_TO_NEXT_GAME_STEP:
        return handleGoToNextGameStep(state);

    case GO_TO_GAME_STEP:
        return handleGoToGameStep(state, action);

    default:
        return state;
    }
}
