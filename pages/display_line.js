import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListProduct from '../components/Container/ListProduct';
const useStyles = makeStyles((theme) => ({
  constrainer: {
    paddingTop: '1rem',
  },
}));
export default function DisplayLine() {
  const classes = useStyles();
  return (
    <div className={classes.constrainer}>
      <ListProduct />
    </div>
  );
}
