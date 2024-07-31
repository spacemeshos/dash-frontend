// @flow
import {
  observable,
  computed,
  action,
  makeAutoObservable,
} from 'mobx';
import React from 'react';

const DISCOVERY_SERVICE_URL = process.env.REACT_APP_DISCOVERY_SERVICE_URL || 'https://configs.spacemesh.network/networks.json';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://mainnet-api.spacemesh.network';
const STATS_API_URL = process.env.REACT_APP_STATS_API_URL || 'https://mainnet-stats-api.spacemesh.network';
const BITS_PER_LABEL = process.env.REACT_APP_BITS_PER_LABEL || 128;
const LABELS_PER_UNIT = process.env.REACT_APP_LABELS_PER_UNIT || 1024;
const EPOCH_NUM_LAYERS = process.env.REACT_APP_EPOCH_NUM_LAYERS || 288;

export default class ViewStore {
  constructor() {
    this.network = { value: null, label: null, explorer: null };
    this.networkList = [];
    this.postUnitSize = (BITS_PER_LABEL * LABELS_PER_UNIT) / 8;
    this.statsApiUrl = STATS_API_URL;
    this.apiBaseUrl = API_BASE_URL;
    this.epochNumLayers = EPOCH_NUM_LAYERS;

    makeAutoObservable(this, {
      currentNetwork: computed,
      networks: computed,
      network: observable,
      statsApiUrl: observable,
      apiBaseUrl: observable,
      postUnitSize: observable,
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
    this.network = this.networks.find((item) => item.value === data.value);
  }

  get networks() {
    return this.networkList;
  }

  selectNetwork(data) {
    if (this.network.value !== data.value) {
      this.network = data;
    }
  }

  async getConfigFile() {
    try {
      const response = await fetch(DISCOVERY_SERVICE_URL);
      const data = await response.json();
      const networks = data.map((network) => (
        {
          value: network.dashAPI,
          label: network.netName,
          explorer: network.explorer,
        }
      ));
      this.setNetworks(networks);
      this.setNetwork(networks[0]);
    } catch (e) {
      console.log('Error: ', e.message);
    }
  }
}

const ViewStoreContext = React.createContext();

export const ViewStoreProvider = ({ children, store }) => (
  <ViewStoreContext.Provider value={store}>{children}</ViewStoreContext.Provider>
);

export const useViewStore = () => React.useContext(ViewStoreContext);
