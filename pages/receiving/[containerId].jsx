import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { acGetOneContainer } from '../../redux/receivingReducer';

export default function ReceivingContainerPage() {
  const router = useRouter();
  const { containerId } = router.query;
  const dispatch = useDispatch();
  useEffect(() => {
    if (containerId) {
      dispatch(acGetOneContainer(containerId));
    }
    // return () => {};
  }, [containerId]);
  return <div></div>;
}

// This function gets called at build time
