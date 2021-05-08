import { Button, Paper } from '@material-ui/core';
import React from 'react';
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
    height: 70,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
}));

export default function Form() {
  const classes = useStyles();

  const [door, setDoor] = React.useState('Door?');
  const [transfer, setTransfer] = React.useState('freeport');

  const handleChange = (event) => {
    setDoor(event.target.value);
  };
  const handleChangeTransfer = (event) => {
    setTransfer(event.target.value);
  };
  return (
    <Paper className={classes.root}>
      <div className={classes.textFields}>
        <TextField
          label="Container"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="dense"
          variant="filled"
        />
        <TextField
          label="Size"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="dense"
          variant="filled"
        />
        <TextField
          select
          label="Select"
          value={door}
          className={classes.textField}
          onChange={handleChange}
          helperText="Please select your currency"
          margin="dense"
          variant="filled"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Forklift Driver"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="dense"
          variant="filled"
        />
        <TextField
          label="unloader worker admin"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="dense"
          variant="filled"
        />
        <div className={classes.textField} style={{ paddingTop: '1rem' }}>
          <FormLabel component="legend">labelPlacement</FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
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
        <TextField
          select
          label="Transfers"
          value={transfer}
          className={classes.textField}
          onChange={handleChangeTransfer}
          helperText="Please select your currency"
          margin="dense"
          variant="filled"
        >
          {transferOption.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
        >
          Summit
        </Button>
      </div>
    </Paper>
  );
}
