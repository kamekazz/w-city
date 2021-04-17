import api from '../utils/api';
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
const CHANGE_IS_NEW_OR_OLD = 'CHANGE_IS_NEW_OR_OLD';

export const acAddProduct = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/api/products', { ...formData });
    if (res.data === 'save') {
      dispatch({
        type: CHANGE_IS_NEW_OR_OLD,
        payload: false,
      });
      dispatch({
        type: 'OPEN_SNACK_BAR',
        payload: 'Save',
      });
    } else {
      dispatch({
        type: CHANGE_IS_NEW_OR_OLD,
        payload: true,
      });
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

export const acIsNewProduct = (formData) => async (dispatch) => {
  try {
    const res = await api.get(`/api/products/${formData}`);

    if (res.data === 'new') {
      dispatch({
        type: CHANGE_IS_NEW_OR_OLD,
        payload: true,
      });
    } else {
      dispatch({
        type: CHANGE_IS_NEW_OR_OLD,
        payload: false,
      });
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

export const acAddProductLoad = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/api/products/add_pallet_load', {
      ...formData,
    });
    if (res.data === 'loaded') {
      dispatch({
        type: 'OPEN_SNACK_BAR',
        payload: 'Load added',
      });
    } else {
      dispatch({
        type: 'OPEN_SNACK_BAR',
        payload: 'Load felid',
      });
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

export const acSaveUOM = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/api/products/update_product', {
      ...formData,
    });
    console.log('start');
    if (res.data.message === 'Update Product') {
      dispatch({
        type: 'OPEN_SNACK_BAR',
        payload: 'Update Product',
      });
    } else {
      dispatch({
        type: 'OPEN_SNACK_BAR',
        payload: 'Update Product felid',
      });
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
  isNewProduct: false,
};

function containerAdminReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_NEW_PRODUCT:
      return {
        ...state,
      };
    case CHANGE_IS_NEW_OR_OLD:
      return {
        ...state,
        isNewProduct: payload,
      };
    default:
      return state;
  }
}

export default containerAdminReducer;
