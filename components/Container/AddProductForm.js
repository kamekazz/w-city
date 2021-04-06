import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
}));
export default function AddProductForm() {
  const classes = useStyles();
  return <div className={classes.root}>AddProductForm</div>;
}
