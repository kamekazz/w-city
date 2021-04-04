import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import AutoAddTitle from '../utils/AutoAddTitle';
import UseNavBar from '../utils/useNavBar';
import LosPageContainer from '../components/404/404Container';
const useStyles = makeStyles((theme) => ({
  constrainer: {
    paddingTop: '1rem',
    height: '100vh',
    backgroundColor: '#007aff',
  },
}));
function LosPage() {
  const classes = useStyles();
  return (
    <>
      <AutoAddTitle title="404" />
      <UseNavBar hideNavbar={true} />
      <Container component="main" className={classes.constrainer}>
        <LosPageContainer />
      </Container>
    </>
  );
}

export default LosPage;
