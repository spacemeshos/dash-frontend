// @flow
import * as React from 'react';
import loader from '../../../assets/loader.gif';

type Props = {
  size: number;
};

const Loader = ({ size }: Props) => {
  const loaderSize = size || 15;

  return (
    <span style={{ textAlign: 'center' }}>
      <img style={{ width: `${loaderSize}px` }} src={loader} alt="loading..." />
    </span>
  );
};

export default Loader;
