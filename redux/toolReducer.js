const SEE_NAVBAR = 'SEE_NAVBAR';
const HIDE_NAVBAR = 'HIDE_NAVBAR';
const ADD_TITLE_TO_NAVBAR = 'ADD_TITLE_TO_NAVBAR';

// ADD_TITLE_TO_NAVBAR
export const addTitleToNavBar = (text) => (dispatch) => {
  dispatch({
    type: ADD_TITLE_TO_NAVBAR,
    payload: text,
  });
};

const initialState = {
  title: 'W-City',
  hideNavbar: false,
};

function toolReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TITLE_TO_NAVBAR:
      return {
        ...state,
        title: payload,
      };
    case HIDE_NAVBAR:
      return {
        ...state,
        hideNavbar: true,
      };
    case SEE_NAVBAR:
      return {
        ...state,
        hideNavbar: false,
      };
    default:
      return state;
  }
}

export default toolReducer;
