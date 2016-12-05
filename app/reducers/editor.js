import { STORE_CODE } from '../actions/editor';
import { GET_NEXT_ACTION } from '../actions/game';

const defaultState = {
    actions: {},
    nextActionId: null
};

const handleStoreCode = (state, action) => ({
    ...state,
    actions: action.actions,
    nextActionId: 0
});

const handleGetNextAction = (state) => {
    console.log('handleGetNextAction');

    const nextActionId = state.nextActionId + 1;

    return {
        ...state,
        nextActionId: Object.keys(state.actions).length > nextActionId ? nextActionId : 0
    };
};

export const getNextAction = state => state.editor.actions[state.editor.nextActionId];

export default function editorReducer(state = defaultState, action) {
    switch (action.type) {
    case STORE_CODE:
        return handleStoreCode(state, action);

    case GET_NEXT_ACTION:
        return handleGetNextAction(state);

    default:
        return state;
    }
}
