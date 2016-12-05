import { TOGGLE_EDITOR } from '../actions/editor';

const defaultState = {
    isVisible: false
};

const handleToggleEditor = state => ({
    ...defaultState,
    isVisible: !state.isVisible
});

export default function editorReducer(state = defaultState, action) {
    switch (action.type) {
    case TOGGLE_EDITOR:
        return handleToggleEditor(state);

    default:
        return state;
    }
}
