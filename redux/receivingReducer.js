import api from '../utils/api';
const DISABLED_FORM_BUTTON_ON_RECEIVING = 'DISABLED_FORM_BUTTON_ON_RECEIVING';
const ACTIVATE_FORM_BUTTON_ON_RECEIVING = 'ACTIVATE_FORM_BUTTON_ON_RECEIVING';
const ADD_ACTIVE_CONTAINER_LIST = 'ADD_ACTIVE_CONTAINER_LIST';
const ADD_STATION_CONTAINER = 'ADD_STATION_CONTAINER';
const REMOVE_STATION_CONTAINER = 'REMOVE_STATION_CONTAINER';
const RECEIVING_LODGINGS = 'RECEIVING_LODGINGS';

export const acAddContainer = (formData, router) => async (dispatch) => {
  dispatch({
    type: DISABLED_FORM_BUTTON_ON_RECEIVING,
  });
  console.log(`formData`, formData);
  try {
    const res = await api.post('/api/receiving_container', { ...formData });
    if (res.data.message === 'Saved') {
      router.push(`/receiving/${res.data.container.containerId}`);
      dispatch({
        type: ACTIVATE_FORM_BUTTON_ON_RECEIVING,
      });
    } else {
      dispatch({
        type: 'OPEN_SNACK_BAR',
        payload: res.data.message,
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

export const acGetAllActionContainer = () => async (dispatch) => {
  try {
    const res = await api.get('/api/receiving_container');
    if (res.data.message === 'List of Container') {
      dispatch({
        type: ADD_ACTIVE_CONTAINER_LIST,
        payload: res.data.containers,
      });
    } else {
      dispatch({
        type: 'OPEN_SNACK_BAR',
        payload: res.data.message,
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

export const acGetOneContainer = (containerId) => async (dispatch) => {
  dispatch({ type: RECEIVING_LODGINGS, payload: true });
  try {
    const res = await api.get(`/api/receiving_container${containerId}`);
    if (res.data.message === 'Container') {
      dispatch({
        type: ADD_STATION_CONTAINER,
        payload: res.data.container,
      });
      dispatch({ type: RECEIVING_LODGINGS, payload: false });
    } else {
      dispatch({
        type: 'OPEN_SNACK_BAR',
        payload: res.data.message,
      });
      dispatch({
        type: REMOVE_STATION_CONTAINER,
      });
      dispatch({ type: RECEIVING_LODGINGS, payload: false });
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
    dispatch({ type: RECEIVING_LODGINGS, payload: false });
  }
};

const initialState = {
  stationContainer: {},
  disabledFormButton: false,
  listOfActiveContainer: [],
  lodging: false,
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
    case ADD_ACTIVE_CONTAINER_LIST:
      return {
        ...state,
        listOfActiveContainer: payload,
      };
    case ADD_STATION_CONTAINER:
      return {
        ...state,
        stationContainer: payload,
      };
    case REMOVE_STATION_CONTAINER:
      return {
        ...state,
        stationContainer: {},
      };
    case RECEIVING_LODGINGS:
      return {
        ...state,
        lodging: payload,
      };
    default:
      return state;
  }
}

export default receivingReducer;
