// @flow
import React from 'react';

type Props = {
  color: string,
}

const NetworkStatus = (props: Props) => {
  const { color } = props;
  return <div className={`round ${color}`} />;
};

export default NetworkStatus;
