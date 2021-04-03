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
};

function toolReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TITLE_TO_NAVBAR:
      return {
        ...state,
        title: payload,
      };
    default:
      return state;
  }
}

export default toolReducer;
