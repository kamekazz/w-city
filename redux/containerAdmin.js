import api from '../utils/api';
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';

const initialState = {};

export const acAddProduct = (formData) => async (dispatch) => {
  console.log(`start:###`);
  try {
    console.log(`ibm###`, formData);
    const res = await api.post('/api/products', { ...formData });
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

function containerAdminReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_NEW_PRODUCT:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default containerAdminReducer;
