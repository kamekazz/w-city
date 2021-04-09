import React from 'react';
import { Button, makeStyles, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  searchFrom: {
    maxWidth: 700,
    display: 'flex',
    padding: '1rem',
    '& > *': {
      width: '10rem',
      margin: theme.spacing(1),
    },
  },
  textInput: {
    fontSize: 30,
  },
  textInputIbm: {
    fontSize: 30,
    color: theme.palette.secondary.dark,
    letterSpacing: 3,
  },
  importantForm: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 700,
    '& > *': {
      width: '10rem',
      margin: theme.spacing(1),
    },
  },
  sizeForm: {
    maxWidth: 700,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    '& > *': {
      width: '10rem',
      margin: theme.spacing(1),
    },
  },
  statusForm: {
    padding: '1rem',
    maxWidth: 200,
  },
}));

export default function AddProductForm() {
  const classes = useStyles();
  const [value, setValue] = React.useState('Lodging');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <form className={classes.root} autoComplete="off">
      <Paper className={classes.searchFrom}>
        <TextField
          name="ibm"
          label="IBM"
          variant="outlined"
          autoFocus
          inputProps={{ size: 20 }}
          value={'123456'}
          InputProps={{
            classes: {
              input: classes.textInputIbm,
            },
          }}
        />
        <Button variant="contained">cancel</Button>
        <Button variant="contained" color="primary">
          add load
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ color: 'white' }}
        >
          add new product
        </Button>
      </Paper>
      <Paper className={classes.importantForm}>
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
      </Paper>
      <Paper className={classes.sizeForm}>
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
      </Paper>
      <Paper className={classes.statusForm}>
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Lodging"
            control={<Radio />}
            label="LODGING"
          />
          <FormControlLabel
            value="standby"
            control={<Radio />}
            label="STANDBY"
          />
          <FormControlLabel
            value="done"
            disabled
            control={<Radio />}
            label="DONE"
          />
        </RadioGroup>
      </Paper>
    </form>
  );
}
