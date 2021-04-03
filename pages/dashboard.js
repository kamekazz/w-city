import React from 'react';
import withAuthorization from '../components/higherOrderComponents/withAuthorization';
function DashboardPage() {
  return <div>dashboard</div>;
}
export default withAuthorization(DashboardPage);
