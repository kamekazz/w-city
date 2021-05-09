import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

export default function ReceivingContainerPage() {
  const router = useRouter();
  const { containerId } = router.query;

  return <div>{containerId}</div>;
}

// This function gets called at build time
