import Dashboard from '../components/Dashboard';
import AutoAddTitle from '../utils/AutoAddTitle';
import withAuthorization from '../components/higherOrderComponents/withAuthorization';

function DashboardPage() {
  return (
    <>
      <AutoAddTitle title="Dashboard" />
      <Dashboard></Dashboard>
    </>
  );
}
export default withAuthorization(DashboardPage);
