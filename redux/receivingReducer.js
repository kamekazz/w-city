import api from '../utils/api';
const DISABLED_FORM_BUTTON_ON_RECEIVING = 'DISABLED_FORM_BUTTON_ON_RECEIVING';
const ACTIVATE_FORM_BUTTON_ON_RECEIVING = 'ACTIVATE_FORM_BUTTON_ON_RECEIVING';

export const acAddContainer = (formData, router) => async (dispatch) => {
  dispatch({
    type: DISABLED_FORM_BUTTON_ON_RECEIVING,
  });
  console.log(`formData`, formData);
  try {
    const res = await api.post('/api/receiving_container', { ...formData });
    if (res.data.message === 'Saved') {
      router.push(`/container/${res.data.containerId}`);
      dispatch({
        type: ACTIVATE_FORM_BUTTON_ON_RECEIVING,
      });
    } else {
      dispatch({
        type: 'OPEN_SNACK_BAR',
        payload: 'Not Added Container',
      });
    }
    dispatch({
      type: ACTIVATE_FORM_BUTTON_ON_RECEIVING,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: 'OPEN_SNACK_BAR',
      payload: 'error',
    });
    dispatch({
      type: ACTIVATE_FORM_BUTTON_ON_RECEIVING,
    });
  }
};

const initialState = {
  stationContainer: {},
  disabledFormButton: false,
};

function receivingReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DISABLED_FORM_BUTTON_ON_RECEIVING:
      return {
        ...state,
        disabledFormButton: true,
      };
    case ACTIVATE_FORM_BUTTON_ON_RECEIVING:
      return {
        ...state,
        disabledFormButton: false,
      };
    default:
      return state;
  }
}

export default receivingReducer;
