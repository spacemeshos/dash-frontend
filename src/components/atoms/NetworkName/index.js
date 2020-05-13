// @flow
import React from 'react';

type Props = {
  name: string,
}

const NetworkName = (props: Props) => {
  const { name } = props;
  const value = name || 'Loading Network...';

  return (
    <div className="network-name">
      <p className="heading-2">{value}</p>
    </div>
  );
};

export default NetworkName;
