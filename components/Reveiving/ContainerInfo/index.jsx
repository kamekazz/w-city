import React from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AddProductContainer from './addProduct';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tap: {
    '& .MuiBox-root': {
      padding: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1),
      },
    },
  },
}));

export default function ContainerInfoContainer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs">
          <Tab label="Add Product" {...a11yProps(0)} />
          <Tab label="container Information" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.tap}>
        <AddProductContainer />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tap}>
        df
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tap}>
        3
      </TabPanel>
    </div>
  );
}
