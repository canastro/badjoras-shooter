export const GO_TO_APP_STEP = 'GO_TO_APP_STEP';
export const GO_TO_NEXT_APP_STEP = 'GO_TO_NEXT_APP_STEP';
export const GO_TO_PREVIOUS_APP_STEP = 'GO_TO_PREVIOUS_APP_STEP';

/**
 * Dispatches a action to change game state
 * @method  goToAppStep
 * @param   {Number} id
 * @returns {Object}
 */
export const goToAppStep = id => dispatch => dispatch({ type: GO_TO_APP_STEP, id });

/**
 * Dispatches a action to go to next game state
 * @method  goToNextAppStep
 * @returns {Object}
 */
export const goToNextAppStep = () => dispatch => dispatch({ type: GO_TO_NEXT_APP_STEP });

/**
 * Dispatches a action to go to previous game state
 * @method  goToNextAppStep
 * @returns {Object}
 */
export const goToPreviousAppStep = () => dispatch =>
    dispatch({ type: GO_TO_PREVIOUS_APP_STEP });
