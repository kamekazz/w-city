const OPEN_SNACK_BAR = 'OPEN_SNACK_BAR';
const CLOSE_SNACK_BAR = 'CLOSE_SNACK_BAR';

const initialState = {
  openSnackBar: false,
  textSnackBar: '',
};

export const logout = (text) => ({ type: OPEN_SNACK_BAR, payload: text });

function snackBarReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_SNACK_BAR:
      return {
        ...state,
        openSnackBar: true,
        textSnackBar: payload,
      };
    case CLOSE_SNACK_BAR:
      return {
        ...state,
        openSnackBar: false,
        textSnackBar: '',
      };
    default:
      return state;
  }
}

export default snackBarReducer;
