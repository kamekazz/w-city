import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';

const AutoAddTitle = ({ title }) => {
  const dispatch = useDispatch();
  const toolState = useSelector((state) => state.toolReducer);

  useEffect(() => {
    dispatch({ type: 'ADD_TITLE_TO_NAVBAR', payload: title });
  }, []);
  return (
    <Head>
      <title>{toolState.title}</title>
    </Head>
  );
};

export default AutoAddTitle;
