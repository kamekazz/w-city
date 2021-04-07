import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem',
    [theme.breakpoints.down('xs')]: {
      margin: '0',
    },
  },
  card: {
    color: theme.palette.common.white,
    fontWeight: 900,
    fontSize: '3rem',
    display: 'flex',
    maxWidth: 450,
    flexDirection: 'column',
    minWidth: 400,
  },
  ibm: {
    background: theme.palette.success.main,
    width: '50%',
    textAlign: 'center',
  },
  alias: {
    background: theme.palette.error.main,
    width: '50%',
    textAlign: 'center',
    fontSize: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    backgroundColor: theme.palette.common.grayBlue,
    width: '50%',
    textAlign: 'center',
  },
  partial: {
    backgroundColor: theme.palette.warning.dark,
    width: '50%',
    textAlign: 'center',
  },
  ti_hi: {
    backgroundColor: theme.palette.common.grayBlue,
    width: '50%',
    textAlign: 'center',
  },
  regularBox: {
    borderRight: `${theme.palette.primary.light} solid 1px`,
    backgroundColor: theme.palette.common.grayBlue,
    width: '50%',
    paddingLeft: '1rem',
  },
  row: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    borderBottom: `${theme.palette.primary.light} solid 1px`,
  },
  status: {
    fontWeight: 600,
    color: theme.palette.success.main,
    textAlign: 'center',
  },
}));
export default function ProductCard({
  ibm,
  alias,
  uof,
  count,
  ti,
  hi,
  partial,
  status,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        variant="h3"
        className={classes.status}
        style={{ color: status == 'DONE' && 'grey' }}
      >
        {status}
      </Typography>
      <Paper className={classes.card}>
        <div className={classes.row}>
          <div className={classes.regularBox}>Item#</div>
          <div className={classes.ibm}>{ibm}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.regularBox}>Alias#</div>
          <div className={classes.alias}>{alias.toUpperCase()}</div>
        </div>
        <div className={classes.row}>
          <div className={classes.regularBox}>Count</div>
          <div className={classes.count}>
            {uof}/{count}
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.regularBox}>TI-HI</div>
          <div className={classes.ti_hi}>
            {ti}/{hi}
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.regularBox}>Partial</div>
          <div className={classes.partial}>{partial}</div>
        </div>
      </Paper>
    </div>
  );
}
