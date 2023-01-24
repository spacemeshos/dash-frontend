// @flow
import React from 'react';
import NetworkStatus from '../NetworkStatus';
import CustomTimeAgo from '../CustomTimeAgo';
import {useUiStore} from "../../../store/UiStore";

type Props = {
  name: string,
  age: number
}

const NetworkName = ({ name, age }: Props) => {
  const uiStore = useUiStore();
  const value = name || 'Loading Network...';

  return (
    <div className="network-name">
      <div className="network-name_title">
        <NetworkStatus color={uiStore.networkStatusColor} />
        <p>{value}</p>
      </div>
      <div className="network-name_time">
        Updated&nbsp;
        <CustomTimeAgo live time={age / 1000} />
      </div>
    </div>
  );
};

export default NetworkName;
