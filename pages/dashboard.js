import Dashboard from '../components/Dashboard';
import withAuthorization from '../components/higherOrderComponents/withAuthorization';
import AutoAddTitle from '../utils/AutoAddTitle';
import UseNavBar from '../utils/useNavBar';

function DashboardPage() {
  return (
    <>
      <AutoAddTitle title="Dashboard" />
      <UseNavBar hideNavbar={false} />
      <Dashboard />
    </>
  );
}
export default withAuthorization(DashboardPage);
