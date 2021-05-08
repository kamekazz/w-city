import api from '../utils/api';

export const acAddContainer = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/api/add_container', { ...formData });
    if (res.data.message === 'Saved') {
    } else {
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: 'OPEN_SNACK_BAR',
      payload: 'error',
    });
  }
};

const initialState = {
  stationContainer: {},
};

function receivingReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}

export default receivingReducer;
