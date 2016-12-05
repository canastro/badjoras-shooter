import {
    GO_TO_APP_STEP,
    GO_TO_NEXT_APP_STEP,
    GO_TO_PREVIOUS_APP_STEP
} from '../actions/app';

const defaultState = {
    appStep: 0,
    stageX: 0,
    characterPosition: { x: 0, y: 0 }
};

const handleGoToGameState = (state, action) => ({
    ...defaultState,
    appStep: action.id
});

const handleGoToNextGameStep = state => ({
    ...defaultState,
    appStep: state.appStep + 1
});

const handleGoToPreviousGameStep = state => ({
    ...defaultState,
    appStep: state.appStep - 1
});

export default function appReducer(state = defaultState, action) {
    switch (action.type) {
    case GO_TO_NEXT_APP_STEP:
        return handleGoToNextGameStep(state);

    case GO_TO_PREVIOUS_APP_STEP:
        return handleGoToPreviousGameStep(state);

    case GO_TO_APP_STEP:
        return handleGoToGameState(state, action);

    default:
        return state;
    }
}
