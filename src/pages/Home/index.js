// @flow
import React, {
  useState,
  useEffect,
} from 'react';
import { Helmet } from 'react-helmet';
import 'moment-duration-format';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

// Component
import moment from 'moment';
import NetworkName from '../../components/atoms/NetworkName';
import BarChartCustom from '../../components/atoms/BarChartCustom';
import RangeSlider from '../../components/atoms/RangeSlider';
import DataTile from '../../components/molecules/DataTile';
import TemporaryImage from '../../components/atoms/TemporaryImage';

// Icons
import AgeIcon from '../../assets/icons/age.svg';
import ActiveSmeshersIcon from '../../assets/icons/active-smeshers.svg';
import AccountsIcon from '../../assets/icons/accounts.svg';
import SmeshingRewardIcon from '../../assets/icons/smeshing-reward.svg';
import LayerEpoch from '../../assets/icons/layer-epoch.svg';
import TxnsIcon from '../../assets/icons/txns.svg';
import CirculationIcon from '../../assets/icons/circulation.svg';
import SecurityIcon from '../../assets/icons/security.svg';
import DecentralizationRatio from '../../assets/icons/decentralization-ratio.svg';

// White Icons AccountsIconWhite
import AccountsIconWhite from '../../assets/darkTheme/accounts_white.svg';
import ActiveSmeshersIconWhite from '../../assets/darkTheme/active-smeshers_white.svg';
import SmeshingRewardIconWhite from '../../assets/darkTheme/smeshing-reward_white.svg';
import LayerEpochWhite from '../../assets/darkTheme/layer-epoch_white.svg';
import TxnsIconWhite from '../../assets/darkTheme/txns_white.svg';
import CirculationIconWhite from '../../assets/darkTheme/circulation_white.svg';
import AgeIconWhite from '../../assets/darkTheme/age_white.svg';
import SecurityIconWhite from '../../assets/darkTheme/security_white.svg';
import DecentralizationRatioWhite from '../../assets/darkTheme/decentralization-ratio_white.svg';

import { byteConverter, formatSmidge } from '../../helpers/converter';
import { useUiStore } from '../../store/UiStore';
import { useViewStore } from '../../store/ViewStore';

const Home = () => {
  const uiStore = useUiStore();
  const viewStore = useViewStore();
  const { checkedTheme } = uiStore;
  const isLightTheme = checkedTheme === 'light';
  const network = toJS(viewStore.currentNetwork);

  const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date().getTime());

  const [currentLayer, setCurrentLayer] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [epochs, setEpochs] = useState({});
  const [circulation, setCirculation] = useState(0);
  const [decentral, setDecentral] = useState(0);
  const [layerDuration, setLayerDuration] = useState(0);
  const [epochDuration, setEpochDuration] = useState(0);

  const fetchData = async () => {
    setLastUpdatedTime(new Date().getTime());
    // network info
    let res = await fetch(`${viewStore.apiBaseUrl}/spacemesh.v2alpha1.NetworkService/Info`, {
      method: 'POST',
    });
    const netInfo = await res.json();
    setLayerDuration(netInfo.layerDuration);
    setEpochDuration((viewStore.epochNumLayers * netInfo.layerDuration) / 60);
    const genesisTime = new Date(netInfo.genesisTime);
    const durationMs = parseInt(netInfo.layerDuration, 10);

    // node status
    res = await fetch(`${viewStore.apiBaseUrl}/spacemesh.v2alpha1.NodeService/Status`, {
      method: 'POST',
    });
    const nodeInfo = await res.json();
    uiStore.setNetworkStatus(nodeInfo.status);

    const epochNums = Math.floor(nodeInfo.latestLayer / netInfo.layersPerEpoch) - 1;
    setCurrentEpoch(epochNums + 1);
    setCurrentLayer(nodeInfo.latestLayer);

    // circulation
    res = await fetch(`${viewStore.statsApiUrl}/circulation`);
    const data = await res.json();
    setCirculation(data.circulation);

    // decentral
    res = await fetch(`${viewStore.statsApiUrl}/epoch/${epochNums}/decentral`);
    const dec = await res.json();
    setDecentral(dec.decentral);

    // query epoch statistics
    const promises = [];
    for (let i = epochNums + 1; i >= 0; i--) {
      promises.push(fetch(`${viewStore.statsApiUrl}/epoch/${i}`).then((r) => r.json()).then((val) => ({
        number: i,
        timestamp: (genesisTime.getTime() / 1000 + (i * netInfo.layersPerEpoch * durationMs) + durationMs) - 1,
        layers: netInfo.layersPerEpoch,
        startLayer: i * netInfo.layersPerEpoch,
        endLayer: i * netInfo.layersPerEpoch + netInfo.layersPerEpoch - 1,
        stats: val,
      })));
    }

    const epochsList = {};
    const epochData = await Promise.all(promises);
    epochData.forEach((epoch) => {
      epochsList[epoch.number] = epoch;
    });

    // calculate cumulative values
    Object.keys(epochsList).forEach((key) => {
      if (epochsList[parseInt(key, 10)].stats.security === undefined) {
        epochsList[parseInt(key, 10)].stats.security = 0;
      }
      epochsList[parseInt(key, 10)].stats.security = epochsList[parseInt(key, 10)].stats.num_units * viewStore.postUnitSize;
      if (epochsList[parseInt(key, 10)].stats.transactions_count === undefined) {
        epochsList[parseInt(key, 10)].stats.transactions_count = 0;
      }
      epochsList[parseInt(key, 10)].stats.transactions_count = key > 0
        ? epochsList[parseInt(key, 10)].stats.transactions_count + epochsList[parseInt(key, 10) - 1].stats.transactions_count
        : epochsList[parseInt(key, 10)].stats.transactions_count;

      if (epochsList[parseInt(key, 10)].stats.rewards_sum === undefined) {
        epochsList[parseInt(key, 10)].stats.rewards_sum = 0;
      }
      if (epochsList[parseInt(key, 10)].stats.vested_amount === undefined) {
        epochsList[parseInt(key, 10)].stats.vested_amount = 0;
      }
      epochsList[parseInt(key, 10)].stats.circulation = epochsList[parseInt(key, 10)].stats.rewards_sum
        + epochsList[parseInt(key, 10)].stats.vested_amount;
      epochsList[parseInt(key, 10)].stats.circulation = key > 0
        ? epochsList[parseInt(key, 10)].stats.circulation + epochsList[parseInt(key, 10) - 1].stats.circulation
        : epochsList[parseInt(key, 10)].stats.circulation;
    });
    setEpochs(epochsList);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [viewStore.apiBaseUrl, viewStore.statsApiUrl]);

  useEffect(() => {
    async function fetchConfig() {
      await viewStore.getConfigFile();
      const color = localStorage.getItem('theme');
      if (color !== 'null' && color) {
        document.documentElement.classList.add(`theme-${color}`);
      } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.add('theme-light');
      }
    }

    fetchConfig();
  }, []);

  const networkName = network?.label;
  const deployConfig = {
    explorerUrl: network?.explorer,
  };

  return (
    <div className="wrap">
      <Helmet>
        <title>Spacemesh Dashboard</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="row pb-2">
        <div className="col-lg-12">
          <NetworkName name={networkName} age={lastUpdatedTime} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 pr-lg-2">
          <DataTile
            icon={isLightTheme ? ActiveSmeshersIcon : ActiveSmeshersIconWhite}
            title="Activations"
            url={`${deployConfig.explorerUrl}smeshers`}
            value={epochs[currentEpoch] && epochs[currentEpoch].stats.smeshers_count}
            toolTipMess="Total number of activations in the most recent epoch. Miners with one or more activations participate in the Spacemesh consensus protocol and submit blocks with transactions to the network."
            showValue
          >
            <BarChartCustom data={epochs} dataMeasure="Smeshers" dataKey="stats.smeshers_count" />
          </DataTile>
          <DataTile
            icon={isLightTheme ? AccountsIcon : AccountsIconWhite}
            title="Accounts"
            url={`${deployConfig.explorerUrl}accounts`}
            value={epochs[currentEpoch] && epochs[currentEpoch].stats.accounts_count}
            toolTipMess="Current total of number of user coin accounts on the network with a non-zero coin balance. The graph displays the total number of accounts in previous epochs."
            showValue
          >
            <BarChartCustom data={epochs} dataMeasure="Accounts" dataKey="stats.accounts_count" />
          </DataTile>
          <DataTile
            icon={isLightTheme ? SmeshingRewardIcon : SmeshingRewardIconWhite}
            title="Smeshing Rewards"
            url={`${deployConfig.explorerUrl}rewards`}
            showValue
            value={epochs[currentEpoch] && formatSmidge(epochs[currentEpoch].stats.rewards_sum)}
            toolTipMess="The total amount of coins awarded to smeshers since genesis. The graph displays the total rewards amount awarded to smeshers at the end of previous epochs. Smeshers are rewarded for submitting blocks with transactions to the network, for participating in the Spacemesh consensus protocol and for publishing proof of space time proofs."
          >
            <BarChartCustom data={epochs} dataKey="stats.rewards_sum" dataMeasure="" tooltipFilter={formatSmidge} />
          </DataTile>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6 pl-lg-0 pr-lg-1">
              <DataTile
                icon={isLightTheme ? AgeIcon : AgeIconWhite}
                title="Age"
                showValue
                value={viewStore.config && moment.duration(moment().diff(moment(viewStore.config.genesis['genesis-time']), 'seconds'), 'seconds').format('d[d]:h[h]', { trim: 'small' })}
                toolTipMess="The network age is the time which passed from the network went online (genesis time) until the current time."
              />
            </div>
            <div className="col-lg-6 pr-lg-0 pl-lg-1">
              <DataTile
                icon={isLightTheme ? LayerEpoch : LayerEpochWhite}
                title="Layer / Epoch"
                url={`${deployConfig.explorerUrl}`}
                showValue
                value={`${currentLayer} / ${currentEpoch}`}
                toolTipMess={`The current layer number and the current epoch number. One layer's duration is ${layerDuration} seconds and one epoch's duration is ${epochDuration} minutes`}
              />
            </div>
          </div>
          <div className="row pb-2">
            <div className="col-lg-12 pl-lg-0 pr-lg-0">
              <TemporaryImage themeColor={isLightTheme} />
              {/* <Map geoMarkers={data && data.smeshersGeo} activeSmeshers={activeSmeshers && activeSmeshers.amt} /> */}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 pr-lg-0 pl-lg-1">
              <DataTile
                icon={isLightTheme ? DecentralizationRatio : DecentralizationRatioWhite}
                title="Decentralization Ratio"
                toolTipMess="The network degree of decentralization where 100 is highly decentralized and 0 is highly centralized. This measure factors in both the overall number of smeshers and the amount of space committed by each. A network is more decentralized if the long tail of smeshers is longer and the ratio of space committed by whales is low compared to the amount of space committed by home smeshers."
              >
                <RangeSlider value={decentral} />
              </DataTile>
            </div>
          </div>
        </div>
        <div className="col-lg-3 pl-lg-2">
          <DataTile
            icon={isLightTheme ? TxnsIcon : TxnsIconWhite}
            title="Transactions"
            url={`${deployConfig.explorerUrl}txs`}
            value={epochs[currentEpoch] && epochs[currentEpoch].stats.transactions_count}
            toolTipMess="The total number of transactions processed by the network since it went online (genesis time). The graph displays the total number of transactions processed by the network up to the end of previous epochs."
            showValue
          >
            <BarChartCustom data={epochs} dataKey="stats.transactions_count" dataMeasure="Transactions" />
          </DataTile>
          <DataTile
            icon={isLightTheme ? CirculationIcon : CirculationIconWhite}
            title="Circulation"
            value={formatSmidge(circulation)}
            toolTipMess="The total amount of Smesh coins currently in circulation. This is determined by the coin rewards awarded to Smeshers as well as genesis minted coins. The graph displays the total amount in circulation at the end of previous epochs."
            showValue
          >
            <BarChartCustom data={epochs} dataKey="stats.circulation" dataMeasure="" tooltipFilter={formatSmidge} />
          </DataTile>
          <DataTile
            icon={isLightTheme ? SecurityIcon : SecurityIconWhite}
            title="Security"
            value={epochs[currentEpoch] && byteConverter(epochs[currentEpoch].stats.security)}
            toolTipMess="Security is measured by the total storage size committed to the network by smeshers. The bigger the number, the more storage is required by an adversary to attack the network. The number displays the amount of storage committed by all active smeshers in the previous epoch. The graph displays the amount of storage committed in previous epochs."
            showValue
          >
            <BarChartCustom data={epochs} dataKey="stats.security" dataMeasure="Security" tooltipFilter={byteConverter} />
          </DataTile>
        </div>
      </div>
    </div>
  );
};

export default observer(Home);
