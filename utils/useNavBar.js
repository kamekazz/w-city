import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

const UseNavbar = ({ hideNavbar }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (hideNavbar) {
      dispatch({ type: 'HIDE_NAVBAR' });
    } else {
      dispatch({ type: 'SEE_NAVBAR' });
    }
  }, []);
  return null;
};

export default UseNavbar;
