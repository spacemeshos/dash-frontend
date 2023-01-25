// @flow
import * as React from 'react';

import Dropdown from 'react-dropdown';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useViewStore } from '../../../store/ViewStore';

const DropDown = () => {
  const viewStore = useViewStore();
  const networks = toJS(viewStore.networks);
  const currentNetwork = toJS(viewStore.currentNetwork);

  const onChange = ({ label }) => {
    // use label for find selectedNetwork from array of networks
    const selectedNetwork = networks.find((network) => (network.label === label));
    viewStore.selectNetwork(selectedNetwork);
  };

  return (
    <Dropdown
      options={networks}
      onChange={onChange}
      value={currentNetwork}
      placeholder="Select an option"
    />
  );
};

export default observer(DropDown);
