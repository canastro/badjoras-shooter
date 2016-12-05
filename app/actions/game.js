export const GO_TO_GAME_STEP = 'GO_TO_GAME_STEP';
export const GO_TO_NEXT_GAME_STEP = 'GO_TO_NEXT_GAME_STEP';
export const GO_TO_PREVIOUS_GAME_STEP = 'GO_TO_PREVIOUS_GAME_STEP';
export const GAME_TICK = 'GAME_TICK';

export const onTick = () => ({ type: GAME_TICK });

/**
 * Dispatches a action to change game state
 * @method  goToGameStep
 * @param   {Number} id
 * @returns {Object}
 */
export const goToGameStep = id => dispatch => dispatch({ type: GO_TO_GAME_STEP, id });

/**
 * Dispatches a action to go to next game state
 * @method  goToNextGameStep
 * @returns {Object}
 */
export const goToNextGameStep = () => dispatch => dispatch({ type: GO_TO_NEXT_GAME_STEP });

/**
 * Dispatches a action to go to previous game state
 * @method  goToNextGameStep
 * @returns {Object}
 */
export const goToPreviousGameStep = () => dispatch =>
    dispatch({ type: GO_TO_PREVIOUS_GAME_STEP });
