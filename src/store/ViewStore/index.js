// @flow
import {
  observable,
  computed,
  action,
  makeAutoObservable,
} from 'mobx';
import React from 'react';

const DISCOVERY_SERVICE_URL = process.env.REACT_APP_DISCOVERY_SERVICE_URL || 'https://configs.spacemesh.network/networks.json';
const BITS_PER_LABEL = 128;
const LABELS_PER_UNIT = process.env.REACT_APP_LABELS_PER_UNIT || 1024;
const PUBLIC_API = process.env.REACT_APP_PUBLIC_API || null;
const STATS_API = process.env.REACT_APP_STATS_API || null;

export default class ViewStore {
  constructor() {
    this.network = { value: null, label: null, explorer: null };
    this.config = null;
    this.networkList = [];
    this.postUnitSize = (BITS_PER_LABEL * LABELS_PER_UNIT) / 8;
    this.statsApiUrl = null;
    this.publicApiUrl = null;

    makeAutoObservable(this, {
      currentNetwork: computed,
      networks: computed,
      network: observable,
      statsApiUrl: observable,
      publicApiUrl: observable,
      postUnitSize: observable,
      selectNetwork: action,
      config: observable,
      setConfig: action,
      setPublicApiUrl: action,
      setStatsApiUrl: action,
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

  setConfig(data) {
    this.config = data;
  }

  setStatsApiUrl(url) {
    this.statsApiUrl = url;
  }

  setPublicApiUrl(url) {
    this.publicApiUrl = url;
  }

  async getConfigFile() {
    try {
      let response = await fetch(DISCOVERY_SERVICE_URL);
      let data = await response.json();
      const networks = data.map((network) => (
        {
          value: network.dashAPI,
          label: network.netName,
          conf: network.conf,
          explorer: network.explorer,
          statsAPI: network.statsAPI,
          grpcAPI: network.grpcAPI,
        }
      ));
      this.setNetworks(networks);
      this.setNetwork(networks[0]);

      if (PUBLIC_API === null) {
        this.setPublicApiUrl(networks[0].grpcAPI.replace(/\/$/, ''));
      } else {
        this.setPublicApiUrl(PUBLIC_API.replace(/\/$/, ''));
      }

      if (STATS_API === null) {
        this.setStatsApiUrl(networks[0].statsAPI.replace(/\/$/, ''));
      } else {
        this.setStatsApiUrl(STATS_API.replace(/\/$/, ''));
      }

      response = await fetch(networks[0].conf);
      data = await response.json();
      this.setConfig(data);
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
