import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '10rem',
    },
  },
  textInput: {
    fontSize: 30,
  },
}));

export default function AddProductForm() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Lodging');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        name="ibm"
        label="IBM"
        variant="outlined"
        autoFocus
        inputProps={{ size: 20 }}
        value={'123456'}
        InputProps={{
          classes: {
            input: classes.textInput,
          },
        }}
      />
      <TextField
        name="alias"
        label="Alias"
        variant="outlined"
        InputProps={{
          classes: {
            input: classes.textInput,
          },
        }}
      />
      <TextField
        name="Count"
        label="count"
        variant="outlined"
        InputProps={{
          classes: {
            input: classes.textInput,
          },
        }}
      />
      <TextField
        name="msCount"
        label="MS count"
        variant="outlined"
        InputProps={{
          classes: {
            input: classes.textInput,
          },
        }}
      />
      <TextField
        name="plCount"
        label="PL count"
        variant="outlined"
        InputProps={{
          classes: {
            input: classes.textInput,
          },
        }}
      />
      <TextField
        name="plTi"
        label="PL Ti"
        variant="outlined"
        InputProps={{
          classes: {
            input: classes.textInput,
          },
        }}
      />
      <TextField
        name="plHi"
        label="PL Hi"
        variant="outlined"
        InputProps={{
          classes: {
            input: classes.textInput,
          },
        }}
      />
      <TextField
        name="p1Count"
        label="P1 count"
        variant="outlined"
        InputProps={{
          classes: {
            input: classes.textInput,
          },
        }}
      />
      <TextField
        name="p1Ti"
        label="P1 Ti"
        variant="outlined"
        InputProps={{
          classes: {
            input: classes.textInput,
          },
        }}
      />
      <TextField
        name="p1Hi"
        label="P1 Hi"
        variant="outlined"
        InputProps={{
          classes: {
            input: classes.textInput,
          },
        }}
      />
      <FormLabel component="legend">Status</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="Lodging" control={<Radio />} label="LODGING" />
        <FormControlLabel value="standby" control={<Radio />} label="STANDBY" />
        <FormControlLabel
          value="done"
          disabled
          control={<Radio />}
          label="DONE"
        />
      </RadioGroup>
    </form>
  );
}
