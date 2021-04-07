import React from 'react';
import ProductCard from './ProductCard';
import { makeStyles } from '@material-ui/core';
import { itemPalletInfoList } from './itemPalletInfoList';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}));
export default function ListProduct() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {itemPalletInfoList.map((card) => {
        return (
          <ProductCard
            key={card._id}
            ibm={card.ibm}
            alias={card.alias}
            uof={card.uof}
            count={card.count}
            ti={card.ti}
            hi={card.hi}
            partial={card.partial}
            status={card.status}
          />
        );
      })}
    </div>
  );
}
