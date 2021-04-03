import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import CustomCard from './CustomCard';
import { listData } from './listData';

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
}));

export const SolidGameCardDemo = React.memo(function SolidGameCard() {
  const gridStyles = useGridStyles();

  return (
    <>
      <Grid classes={gridStyles} container spacing={4} wrap={'nowrap'}>
        {listData.map((card) => (
          <Grid item key={card.title}>
            <CustomCard
              title={card.title}
              subtitle={card.subtitle}
              image={card.image}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
});
export default SolidGameCardDemo;
