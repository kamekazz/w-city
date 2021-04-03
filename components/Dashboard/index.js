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
  cardContainer: {
    maxWidth: 200,
  },
}));

export const SolidGameCardDemo = React.memo(function SolidGameCard() {
  const classes = useGridStyles();

  return (
    <div>
      {listData.map((card) => (
        <div item key={card.title} className={classes.cardContainer}>
          <CustomCard
            title={card.title}
            subtitle={card.subtitle}
            image={card.image}
          />
        </div>
      ))}
    </div>
  );
});
export default SolidGameCardDemo;
