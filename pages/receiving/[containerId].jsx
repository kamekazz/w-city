import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { acGetOneContainer } from '../../redux/receivingReducer';
import withAuthorization from '../../components/higherOrderComponents/withAuthorization';

function ReceivingContainerPage() {
  const router = useRouter();
  const { containerId } = router.query;
  const dispatch = useDispatch();
  const { stationContainer } = useSelector((state) => state.receivingReducer);
  useEffect(() => {
    if (containerId) {
      dispatch(acGetOneContainer(containerId));
    }
    return () => {
      dispatch({ type: 'REMOVE_STATION_CONTAINER' });
    };
  }, [containerId]);
  if (!stationContainer) {
    return <div>lodging</div>;
  } else {
    return <div>{stationContainer.containerId}</div>;
  }
}
export default withAuthorization(ReceivingContainerPage);
// This function gets called at build time
