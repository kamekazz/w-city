import React from 'react';
import ReceivingDashboard from '../../components/Reveiving';
import { Container } from '@material-ui/core';
import withAuthorization from '../../components/higherOrderComponents/withAuthorization';

function ReceivingPage() {
  return (
    <Container style={{ paddingTop: '1rem' }}>
      <ReceivingDashboard />
    </Container>
  );
}

export default withAuthorization(ReceivingPage);
