// @flow
import React from 'react';

type Props = {
  status: string,
}

const NetworkStatus = (props: Props) => {
  const { status } = props;

  const circleColor = status === 'ok' ? 'green' : status === 'error' ? 'red' : 'orange';

  return <div className={`round ${status && circleColor}`} />;
};

export default NetworkStatus;
