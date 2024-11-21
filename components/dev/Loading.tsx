import React from 'react';
import type { NextPage } from 'next';
import ToucanLoader from '../info/ToucanLoader';

const DevLoading: NextPage = () => {
  return (
    <>
      <h2>Loader</h2>
      <ToucanLoader />
    </>
  );
};

export default DevLoading;
