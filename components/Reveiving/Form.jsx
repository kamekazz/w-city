import { Button, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const currencies = [
  {
    value: 'Door?',
    label: 'Door?',
  },
  {
    value: '51',
    label: '51',
  },
  {
    value: '50',
    label: '50',
  },
  {
    value: '49',
    label: '49',
  },
  {
    value: '48',
    label: '48',
  },
  {
    value: '47',
    label: '47',
  },
  {
    value: '46',
    label: '46',
  },
  {
    value: '45',
    label: '45',
  },
  {
    value: '44',
    label: '44',
  },
];
const transferOption = [
  {
    value: 'freeport',
    label: 'Freeport ',
  },
  {
    value: 'freeport/cranberry',
    label: 'Freeport/Cranberry',
  },
  {
    value: 'cranberry',
    label: 'Cranberry',
  },
];

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

export default function Form() {
  const classes = useStyles();
  const [transfer, setTransfer] = React.useState('freeport');
  const [isTransfer, setIsTransfer] = React.useState('no');
  const [inputs, setInputs] = useState({
    containerId: { value: '' },
    Size: { value: '24 ft' },
    door: { value: 'Door?' },
  });

  function onChange(event) {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setInputs((prevState) => {
      return {
        ...prevState,
        [inputName]: {
          ...prevState[inputName],
          value: newValue,
          dirty: true,
        },
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
    console.log(`submit`, body);
  };

  return (
    <Paper className={classes.root} component={'form'} onSubmit={handelSubmit}>
      <div className={classes.textFields}>
        <TextField
          label="Container"
          name="containerId"
          placeholder={`'xxxx123456'`}
          className={classes.textField}
          margin="dense"
          variant="filled"
          required
          onChange={onChange}
        />
        <TextField
          label="Size"
          name="size"
          defaultValue="24 ft"
          className={classes.textField}
          margin="dense"
          variant="filled"
          onChange={onChange}
        />
        <TextField
          select
          label="Door"
          value={inputs.door.value}
          className={classes.textField}
          onChange={onChange}
          margin="dense"
          variant="filled"
          name="door"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Forklift Driver"
          className={classes.textField}
          name="forkliftDriver"
          margin="dense"
          variant="filled"
          onChange={onChange}
        />
        <TextField
          label="Unloader Worker Admin"
          name="uwa"
          className={classes.textField}
          margin="dense"
          variant="filled"
          onChange={onChange}
        />
        <div className={classes.textFieldTransfers}>
          <div className={classes.textField} style={{ paddingTop: 6 }}>
            <FormLabel component="legend">Transfers</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
              value={isTransfer}
              onChange={handleChangeIsTransfer}
            >
              <FormControlLabel
                value="no"
                control={<Radio color="primary" />}
                label="NO"
              />
              <FormControlLabel
                value="yes"
                control={<Radio color="primary" />}
                label="Yes"
              />
            </RadioGroup>
          </div>
          {isTransfer === 'yes' && (
            <TextField
              select
              label="Transfers Locations"
              value={transfer}
              className={classes.textField}
              onChange={handleChangeTransfer}
              margin="dense"
              variant="filled"
            >
              {transferOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        </div>

        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          type="submit"
        >
          submit
        </Button>
      </div>
    </Paper>
  );
}
