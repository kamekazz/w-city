import Dashboard from '../components/Dashboard';
import withAuthorization from '../components/higherOrderComponents/withAuthorization';
import AutoAddTitle from '../utils/AutoAddTitle';

function DashboardPage() {
  return (
    <>
      <AutoAddTitle title="Dashboard" />
      <Dashboard />
    </>
  );
}
export default withAuthorization(DashboardPage);
