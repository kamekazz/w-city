import React, { useEffect, useRef, useState } from 'react';
import { Button, makeStyles, Paper, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1rem',
    maxWidth: 500,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  from: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      alignItems: 'center',
      marginBottom: '1rem',
    },
  },
  display: {
    width: '50%',
    paddingLeft: '1rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      paddingLeft: 0,
    },
  },
  displayCard: {
    width: '100%',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex',
  },
  displayName: {
    color: theme.palette.primary.main,
    fontSize: '2rem',
  },
  displayValue: {
    color: theme.palette.secondary.main,
    fontSize: '2rem',
    fontWeight: 900,
    overflow: 'hidden',
  },
}));

export default function EzPartialCalculator() {
  const classes = useStyles();
  const inputRef = useRef();
  const [inputs, setInputs] = useState({
    totalAmount: { value: 0 },
    plUOM: { value: 0 },
    msUOM: { value: 0 },
  });
  const [displayInfo, setDisplayInfo] = useState({
    plCount: 0,
    partialPallet: 0,
    msInPl: 0,
  });

  function getTotalPlAndPlPartial() {
    let totalPl;
    let partial;
    let msInPl;
    let totalAmount = inputs.totalAmount.value;
    let plUOM = inputs.plUOM.value;
    let msUOM = inputs.msUOM.value;
    totalPl = totalAmount / plUOM;
    totalPl = Math.floor(totalPl);
    partial = totalAmount % plUOM;
    partial = partial / msUOM;
    msInPl = plUOM / msUOM;
    if (isNaN(totalPl)) {
      totalPl = 0;
    }
    if (!isFinite(totalPl)) {
      totalPl = 0;
    }
    if (isNaN(msInPl)) {
      msInPl = 0;
    }
    if (isNaN(partial)) {
      partial = 0;
    }

    if (!Number.isInteger(msInPl)) {
      msInPl = 0;
    }
    if (!Number.isInteger(partial)) {
      partial = 0;
    }

    return { totalPl, partial, msInPl };
  }

  useEffect(() => {
    let { totalPl, partial, msInPl } = getTotalPlAndPlPartial();
    setDisplayInfo({
      plCount: totalPl,
      partialPallet: partial,
      msInPl,
    });
  }, [inputs]);

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
  const clearInput = () => {
    setInputs({
      totalAmount: { value: 0 },
      plUOM: { value: 0 },
      msUOM: { value: 0 },
    });
    inputRef.current.focus();
  };
  return (
    <Paper className={classes.root}>
      <div className={classes.from}>
        <TextField
          name="totalAmount"
          label="Total"
          variant="outlined"
          inputRef={inputRef}
          autoFocus
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 10);
          }}
          min={0}
          type="number"
          value={inputs.totalAmount.value}
          onChange={onChange}
          style={{ paddingBottom: '1rem' }}
          fullWidth
        />
        <TextField
          name="plUOM"
          label="PL QTY"
          variant="outlined"
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 10);
          }}
          min={0}
          type="number"
          value={inputs.plUOM.value}
          onChange={onChange}
          style={{ paddingBottom: '1rem' }}
          fullWidth
        />
        <TextField
          name="msUOM"
          label="MS QTY"
          variant="outlined"
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 10);
          }}
          min={0}
          type="number"
          value={inputs.msUOM.value}
          onChange={onChange}
          fullWidth
          style={{ marginBottom: '1rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={clearInput}
          style={{ width: '100%' }}
        >
          reset
        </Button>
      </div>
      <div className={classes.display}>
        <div className={classes.displayCard}>
          <span className={classes.displayName}>Total PL</span>
          <span className={classes.displayValue}>{displayInfo.plCount}</span>
        </div>
        <div className={classes.displayCard}>
          <span className={classes.displayName}>MS in a Pallet</span>
          <span className={classes.displayValue}>
            {displayInfo.msInPl + ' MS'}
          </span>
        </div>
        <div className={classes.displayCard}>
          <span className={classes.displayName}>Partial Pallet</span>
          <span className={classes.displayValue}>
            {displayInfo.partialPallet + ' MS'}
          </span>
        </div>
      </div>
    </Paper>
  );
}
