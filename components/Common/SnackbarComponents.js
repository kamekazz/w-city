import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';

export default function SimpleSnackbar() {
  const { openSnackBar, textSnackBar } = useSelector(
    (state) => state.snackbarReducer
  );
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: 'CLOSE_SNACK_BAR' });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={textSnackBar}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
}
