export const MOVE_HERO = 'MOVE_HERO';

export const FIRE = 'FIRE';

export const ACTIVATE_SHIELD = 'ACTIVATE_SHIELD';
export const DISABLE_SHIELD = 'DISABLE_SHIELD';

let id = 0;
export const fire = position => (dispatch) => {
    dispatch({
        type: FIRE,
        id: `bullet${id += 1}`,
        position
    });
};

export const move = (x, y) => dispatch => dispatch({ type: MOVE_HERO, x, y });

export const setShield = isShieldActivated => dispatch => (
    dispatch({
        type: isShieldActivated ? ACTIVATE_SHIELD : DISABLE_SHIELD
    })
);
