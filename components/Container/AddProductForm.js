import React from 'react';
import { Button, Container, makeStyles, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  rootForm: {
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
  msContainer: {
    '& > *': {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      display: 'flex',
    },
  },
  BoxMeasure: {
    '& > *': {
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

  return (
    <Container className={classes.root}>
      <form autoComplete="off" className={classes.rootForm}>
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
      </form>
      <div className={classes.msContainer}>
        <BoxMeasure />
      </div>
    </Container>
  );
}

const BoxMeasure = () => {
  const classes = useStyles();
  return (
    <Paper component={'form'} className={classes.BoxMeasure}>
      <TextField name="msLength" label="MS Length" variant="outlined" />
      <TextField name="msWidth" label="MS Width" variant="outlined" />
      <TextField name="msHeight" label="MS Height" variant="outlined" />
      <Button variant="contained" color="primary">
        save
      </Button>
    </Paper>
  );
};