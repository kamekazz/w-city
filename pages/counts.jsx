import { Container } from '@material-ui/core';
import React from 'react';
import EzPartialCalculator from '../components/Counts/EzPartialCalculator';

export default function CountPage() {
  return (
    <Container style={{ paddingTop: '1rem' }}>
      <EzPartialCalculator />
    </Container>
  );
}
