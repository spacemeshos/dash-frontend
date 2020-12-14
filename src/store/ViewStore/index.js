// @flow
import {
  observable,
  computed,
  action,
  makeAutoObservable,
} from 'mobx';

const mockedNetworks = [
  { value: 'wss://stage-dash.spacemesh.io/ws/dev-net', label: 'Dev-Net' },
  { value: 'wss://stage-dash.spacemesh.io/ws/tweedledee', label: 'TestNet 0.1 "TweedleDee"' },
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
