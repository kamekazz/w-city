import api from '../utils/api';
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
const CHANGE_IS_NEW_OR_OLD = 'CHANGE_IS_NEW_OR_OLD';
const PRODUCT_IS_NEW = 'PRODUCT_IS_NEW';
const PRODUCT_IS_OLD = 'PRODUCT_IS_OLD';
const GETTING_PALLET_CONFIG = 'GETTING_PALLET_CONFIG';
const FINCH_PALLET_CONFIG = 'FINCH_PALLET_CONFIG';

export const acAddProduct = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/api/products', { ...formData });
    if (res.data === 'save') {
      dispatch({
        type: PRODUCT_IS_OLD,
      });
      dispatch({
        type: 'OPEN_SNACK_BAR',
        payload: 'Save',
      });
    } else {
      dispatch({
        type: PRODUCT_IS_NEW,
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

    if (res.data.message === 'new') {
      dispatch({
        type: PRODUCT_IS_NEW,
      });
    } else {
      dispatch({
        type: PRODUCT_IS_OLD,
        payload: res.data.product,
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

export const acSaveUOM = (formData) => async (dispatch, getState) => {
  let ibm = getState().containerAdmin.stationProduct.ibm;
  let formDatePlusIBM = {
    ...formData,
    ibm,
  };
  try {
    const res = await api.post('/api/products/update_product', {
      ...formDatePlusIBM,
    });
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

export const acGetPalletConfig = (formData) => async (dispatch) => {
  dispatch({
    type: 'OPEN_SNACK_BAR',
    payload: 'Getting Pallet Config',
  });
  dispatch({
    type: GETTING_PALLET_CONFIG,
  });
  try {
    const res = await api.post('/api/products/get_pallet_config', {
      ...formData,
    });
    if (res.data.message === 'Pallet Config Completed') {
      dispatch({
        type: 'OPEN_SNACK_BAR',
        payload: res.data.message,
      });
      dispatch({
        type: 'PRODUCT_IS_OLD',
        payload: res.data.product,
      });
      dispatch({
        type: FINCH_PALLET_CONFIG,
      });
    } else {
      dispatch({
        type: 'OPEN_SNACK_BAR',
        payload: 'Pallet Config Felid',
      });
      dispatch({
        type: FINCH_PALLET_CONFIG,
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
    dispatch({
      type: FINCH_PALLET_CONFIG,
    });
  }
};

const initialState = {
  isNewProduct: false,
  stationProduct: {},
  scrapingImage: false,
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
    case PRODUCT_IS_NEW:
      return {
        ...state,
        isNewProduct: true,
        stationProduct: {},
      };
    case PRODUCT_IS_OLD:
      return {
        ...state,
        isNewProduct: false,
        stationProduct: payload,
      };
    case GETTING_PALLET_CONFIG:
      return {
        ...state,
        scrapingImage: true,
      };
    case FINCH_PALLET_CONFIG:
      return {
        ...state,
        scrapingImage: false,
      };
    default:
      return state;
  }
}

export default containerAdminReducer;
