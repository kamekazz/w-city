import React from 'react';
import { useRouter } from 'next/router';

export default function ReceivingContainerPage() {
  const router = useRouter();
  const { containerId } = router.query;

  return <div>{containerId}</div>;
}

// This function gets called at build time
