import { Button, Paper } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1),
  },
  textFields: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  button: {
    margin: theme.spacing(1),
    width: '25ch',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  textFieldTransfers: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));
export default function AddProductToContainerForm() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const classes = useStyles();
  const [disabledAddButton, setDisabledAddButton] = useState(true);
  const [inputs, setInputs] = useState({
    ibm: '',
    alias: '',
    totalCount: 0,
  });

  const { disabledFormButton } = useSelector((state) => state.receivingReducer);

  function onChange(event) {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setInputs((prevState) => {
      return {
        ...prevState,
        [inputName]: newValue,
      };
    });
  }

  const handleChangeTransfer = (event) => {
    setTransfer(event.target.value);
  };

  const handleChangeIsTransfer = (event) => {
    setIsTransfer(event.target.value);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    let body = { ...inputs, isTransfer };
    if (isTransfer === 'yes') {
      body = { ...body, transfer };
    }
  };

  const clearInput = () => {
    setInputs({
      ibm: '',
      alias: '',
      totalCount: '',
    });
    inputRef.current.focus();
  };

  const addLoad = () => {
    // dispatch(acAddProductLoad(body));
    clearInput();
  };
  return (
    <Paper className={classes.root} component={'form'} onSubmit={handelSubmit}>
      <div className={classes.textFields}>
        <TextField
          name="ibm"
          label="IBM"
          variant="outlined"
          inputRef={inputRef}
          autoFocus
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 6);
          }}
          min={0}
          type="number"
          value={inputs.ibm}
          onChange={onChange}
          className={classes.textField}
          margin="dense"
          variant="filled"
        />
        <TextField
          name="alias"
          label="Alias"
          variant="outlined"
          className={classes.textField}
          type="text"
          value={inputs.alias}
          onChange={onChange}
          margin="dense"
          variant="filled"
        />
        <TextField
          name="totalCount"
          label="Total Count"
          variant="outlined"
          type="number"
          value={inputs.totalCount}
          onChange={onChange}
          margin="dense"
          variant="filled"
          className={classes.textField}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={disabledFormButton}
          onClick={addLoad}
          className={classes.button}
        >
          add load
        </Button>
        <Button
          variant="contained"
          onClick={clearInput}
          className={classes.button}
          disabled={disabledFormButton}
        >
          cancel
        </Button>
      </div>
    </Paper>
  );
}
