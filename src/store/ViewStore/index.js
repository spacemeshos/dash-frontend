// @flow
import {
  observable,
  computed,
  action,
  makeAutoObservable,
} from 'mobx';

const mockedNetworks = [
  { value: 'wss://stage-dash.spacemesh.io/ws/dev-net', label: 'TweedleDee Open Testnet 122' },
  // { value: 'wss://stage-dash.spacemesh.io/ws/tweedledee', label: 'TweedleDee Open Testnet 122' },
];

class ViewStore {
  constructor() {
    this.network = mockedNetworks[0];
    this.networkList = mockedNetworks;

    makeAutoObservable(this, {
      currentNetwork: computed,
      networks: computed,
      network: observable,
      selectNetwork: action,
    });
  }

  get currentNetwork() {
    return this.network;
  }

  get networks() {
    return this.networkList;
  }

  selectNetwork(data) {
    this.network = data;
  }
}

export default ViewStore;
