// @flow
import {
  observable,
  computed,
  action,
  decorate,
} from 'mobx';

const mockedNetworks = [
  { value: 'wss://stage-dash.spacemesh.io/ws/dev-net', label: 'Dev-Net' },
  { value: 'wss://stage-dash.spacemesh.io/ws/tweedledee', label: 'TestNet 0.1 "TweedleDee"' },
];

class ViewStore {
  constructor() {
    this.network = mockedNetworks[0];
    this.networkList = mockedNetworks;
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

decorate(ViewStore, {
  currentNetwork: computed,
  networks: computed,
  network: observable,
  selectNetwork: action,
});

export default ViewStore;
