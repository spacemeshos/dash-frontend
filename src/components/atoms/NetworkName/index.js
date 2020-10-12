// @flow
import React from 'react';
import NetworkStatus from '../NetworkStatus';
import CustomTimeAgo from '../CustomTimeAgo';

type Props = {
  name: string,
  age: number,
}

const NetworkName = (props: Props) => {
  const { name, age } = props;
  const value = name || 'Loading Network...';

  return (
    <div className="network-name">
      <div className="network-name_title">
        <NetworkStatus status={name ? 'ok' : null} />
        <p>{value}</p>
      </div>
      <div className="network-name_time">
        Updated&nbsp;
        <CustomTimeAgo live time={age} />
      </div>
    </div>
  );
};

export default NetworkName;
