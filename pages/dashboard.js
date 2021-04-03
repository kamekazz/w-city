import React from 'react';
import Dashboard from '../components/Dashboard';
import withAuthorization from '../components/higherOrderComponents/withAuthorization';
function DashboardPage() {
  return (
    <div>
      <Dashboard></Dashboard>
    </div>
  );
}
export default withAuthorization(DashboardPage);
