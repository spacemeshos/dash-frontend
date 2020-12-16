// @flow
import {
  observable,
  computed,
  action,
  makeAutoObservable,
} from 'mobx';
import { reMappingNetworkArray } from '../../helpers/mapping';

const DISCOVERY_SERVICE_URL = process.env.REACT_APP_DISCOVERY_SERVICE_URL;

class ViewStore {
  constructor(apiFetch: Object) {
    this.fetch = apiFetch;
    this.network = { value: null, label: null };
    this.networkList = [];

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

  setNetworks(data) {
    this.networkList = data;
  }

  setNetwork(data) {
    this.network = data;
  }

  get networks() {
    return this.networkList;
  }

  selectNetwork(data) {
    this.network = data;
  }

  async getConfigFile() {
    try {
      const response = await this.fetch(DISCOVERY_SERVICE_URL);
      const networks = reMappingNetworkArray(response);
      // TODO remove this after moving dash to discovery service
      networks.push({ value: 'wss://stage-dash.spacemesh.io/ws/dev-net', label: 'TweedleDee Open Testnet 122' });
      this.setNetworks(networks);
      this.setNetwork(networks[1]);
    } catch (e) {
      console.log('Error: ', e.message);
    }
  }
}

export default ViewStore;
