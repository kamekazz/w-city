import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import CustomCard from './CustomCard';
import { listData } from './listData';

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
  cardList: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',

    justifyContent: 'space-between',
    [breakpoints.down('sm')]: {
      justifyContent: 'space-around',
    },
    [breakpoints.down('xs')]: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column ',
    },
  },
  cardContainer: {
    maxWidth: 300,
    margin: '1rem 1rem',
    [breakpoints.down('xs')]: {
      margin: ' 1rem 0',
    },
  },
}));

export const SolidGameCardDemo = React.memo(function SolidGameCard() {
  const classes = useGridStyles();

  return (
    <div className={classes.cardList}>
      {listData.map((card) => (
        <div key={card.title} className={classes.cardContainer}>
          <CustomCard
            title={card.title}
            subtitle={card.subtitle}
            image={card.image}
            to={card.to}
          />
        </div>
      ))}
    </div>
  );
});
export default SolidGameCardDemo;
