import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import Dashboard from '../components/Dashboard';
import withAuthorization from '../components/higherOrderComponents/withAuthorization';
import AutoAddTitle from '../utils/AutoAddTitle';
import UseNavBar from '../utils/useNavBar';

const useStyles = makeStyles((theme) => ({
  constrainer: {
    paddingTop: '1rem',
    height: 'calc(100vh - 4rem)',
  },
}));

function DashboardPage() {
  const classes = useStyles();
  return (
    <>
      <AutoAddTitle title="Dashboard" />
      <UseNavBar hideNavbar={false} />
      <Container component="main" className={classes.constrainer}>
        <Dashboard />
      </Container>
    </>
  );
}
export default withAuthorization(DashboardPage);
