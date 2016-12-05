export const TOGGLE_EDITOR = 'TOGGLE_EDITOR';

/**
 * Dispatches a action to toggle editor visibility
 * @method  toggleEditor
 * @returns {Object}
 */
export const toggleEditor = () => dispatch => dispatch({ type: TOGGLE_EDITOR });
