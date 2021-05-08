import React from 'react';
import ReceivingDashboard from '../../components/Reveiving';
import { Container } from '@material-ui/core';

export default function ReceivingPage() {
  return (
    <Container style={{ paddingTop: '1rem' }}>
      <ReceivingDashboard />
    </Container>
  );
}
