// @flow
import React from 'react';

type Props = {
  color: string,
}

const NetworkStatus = ({ color }: Props) => <div className={`round ${color}`} />;

export default NetworkStatus;
