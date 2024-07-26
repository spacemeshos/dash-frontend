// @flow
import React, {
  useState,
  useEffect,
} from 'react';
import { Helmet } from 'react-helmet';
import 'moment-duration-format';
import { observer } from 'mobx-react';

// Component
import NetworkName from '../../components/atoms/NetworkName';
import BarChartCustom from '../../components/atoms/BarChartCustom';
import RangeSlider from '../../components/atoms/RangeSlider';
import DataTile from '../../components/molecules/DataTile';
// import Map from '../../components/molecules/Map';
import TemporaryImage from '../../components/atoms/TemporaryImage';

// Icons
import ActiveSmeshersIcon from '../../assets/icons/active-smeshers.svg';
import SmeshingRewardIcon from '../../assets/icons/smeshing-reward.svg';
import LayerEpoch from '../../assets/icons/layer-epoch.svg';
import TxnsIcon from '../../assets/icons/txns.svg';
import CirculationIcon from '../../assets/icons/circulation.svg';
import SecurityIcon from '../../assets/icons/security.svg';
import DecentralizationRatio from '../../assets/icons/decentralization-ratio.svg';

// White Icons AccountsIconWhite
import ActiveSmeshersIconWhite from '../../assets/darkTheme/active-smeshers_white.svg';
import SmeshingRewardIconWhite from '../../assets/darkTheme/smeshing-reward_white.svg';
import LayerEpochWhite from '../../assets/darkTheme/layer-epoch_white.svg';
import TxnsIconWhite from '../../assets/darkTheme/txns_white.svg';
import CirculationIconWhite from '../../assets/darkTheme/circulation_white.svg';
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

  const [lastUpdatedTime, setLastUpdatedTime] = useState(0);

  const [currentLayer, setCurrentLayer] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [epochs, setEpochs] = useState({});
  const [circulation, setCirculation] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(`${viewStore.apiBaseUrl}/spacemesh.v2alpha1.NetworkService/Info`, {
        method: 'POST',
      });
      const netInfo = await res.json();

      res = await fetch(`${viewStore.statsApiUrl}/circulation`);
      const data = await res.json();
      setCirculation(data.circulation);

      res = await fetch(`${viewStore.apiBaseUrl}/spacemesh.v2alpha1.LayerService/List`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          limit: 1,
          sort_order: 1,
        }),
      });
      const layers = await res.json();

      const epochNums = Math.floor(layers.layers[0].number / netInfo.layersPerEpoch);
      setCurrentEpoch(epochNums);
      setCurrentLayer(layers.layers[0].number);

      const promises = [];
      for (let i = epochNums + 1; i >= 0; i--) {
        promises.push(fetch(`${viewStore.statsApiUrl}/epoch/${i}`).then((r) => r.json()).then((val) => ({
          number: i,
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

      Object.keys(epochsList).forEach((key) => {
        epochsList[parseInt(key, 10)].stats.transactions_count = key > 0
          ? epochsList[parseInt(key, 10)].stats.transactions_count + epochsList[parseInt(key, 10) - 1].stats.transactions_count
          : epochsList[parseInt(key, 10)].stats.transactions_count;

        epochsList[parseInt(key, 10)].stats.circulation = epochsList[parseInt(key, 10)].stats.rewards_sum;
        epochsList[parseInt(key, 10)].stats.circulation = key > 0
          ? epochsList[parseInt(key, 10)].stats.circulation + epochsList[parseInt(key, 10) - 1].stats.circulation
          : epochsList[parseInt(key, 10)].stats.circulation;
      });
      setEpochs(epochsList);
    };
    setLastUpdatedTime(0);
    fetchData();
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

  const epochDuration = 0;
  const layerDuration = 0;

  const networkName = 'test';
  const deployConfig = 'test';

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
            <BarChartCustom data={epochs} dataMeasure="Smeshers" dataKey="smeshers_count" />
          </DataTile>
          <DataTile
            icon={isLightTheme ? SmeshingRewardIcon : SmeshingRewardIconWhite}
            title="Smeshing Rewards"
            url={`${deployConfig.explorerUrl}rewards`}
            showValue
            value={epochs[currentEpoch] && formatSmidge(epochs[currentEpoch].stats.rewards_sum)}
            toolTipMess="The total amount of coins awarded to smeshers since genesis. The graph displays the total rewards amount awarded to smeshers at the end of previous epochs. Smeshers are rewarded for submitting blocks with transactions to the network, for participating in the Spacemesh consensus protocol and for publishing proof of space time proofs."
          >
            <BarChartCustom data={epochs} dataKey="rewards_sum" dataMeasure="" tooltipFilter={formatSmidge} />
          </DataTile>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6 pl-lg-0 pr-lg-1">
              <DataTile
                icon={isLightTheme ? SecurityIcon : SecurityIconWhite}
                title="Security"
                value={epochs[currentEpoch] && byteConverter(epochs[currentEpoch].stats.num_units * viewStore.postUnitSize)}
                toolTipMess="Security is measured by the total storage size committed to the network by smeshers. The bigger the number, the more storage is required by an adversary to attack the network. The number displays the amount of storage committed by all active smeshers in the previous epoch. The graph displays the amount of storage committed in previous epochs."
                showValue
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
                <RangeSlider value={0} />
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
            <BarChartCustom data={epochs} dataKey="transactions_count" dataMeasure="Transactions" />
          </DataTile>
          <DataTile
            icon={isLightTheme ? CirculationIcon : CirculationIconWhite}
            title="Circulation"
            value={formatSmidge(circulation)}
            toolTipMess="The total amount of Smesh coins currently in circulation. This is determined by the coin rewards awarded to Smeshers as well as genesis minted coins. The graph displays the total amount in circulation at the end of previous epochs."
            showValue
          >
            <BarChartCustom data={epochs} dataKey="circulation" dataMeasure="" tooltipFilter={formatSmidge} />
          </DataTile>
        </div>
      </div>
    </div>
  );
};

export default observer(Home);
