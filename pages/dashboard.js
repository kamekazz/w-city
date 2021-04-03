import { Container } from '@material-ui/core';
import Dashboard from '../components/Dashboard';
import withAuthorization from '../components/higherOrderComponents/withAuthorization';
import AutoAddTitle from '../utils/AutoAddTitle';
import UseNavBar from '../utils/useNavBar';

function DashboardPage() {
  return (
    <>
      <AutoAddTitle title="Dashboard" />
      <UseNavBar hideNavbar={false} />
      <Container>
        <Dashboard />
      </Container>
    </>
  );
}
export default withAuthorization(DashboardPage);
