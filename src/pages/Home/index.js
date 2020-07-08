// @flow
import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import { Helmet } from 'react-helmet';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

// Component
import NetworkName from '../../components/atoms/NetworkName';
import BarChartCustom from '../../components/atoms/BarChartCustom';
import RangeSlider from '../../components/atoms/RangeSlider';
import DataTile from '../../components/molecules/DataTile';
import Map from '../../components/molecules/Map';

// Icons
import ActiveSmeshersIcon from '../../assets/icons/active-smeshers.svg';
import AccountsIcon from '../../assets/icons/accounts.svg';
import SmeshingRewardIcon from '../../assets/icons/smeshing-reward.svg';
import AgeIcon from '../../assets/icons/age.svg';
import LayerEpoch from '../../assets/icons/layer-epoch.svg';
import TxnsIcon from '../../assets/icons/txns.svg';
import CirculationIcon from '../../assets/icons/circulation.svg';
import SecurityIcon from '../../assets/icons/security.svg';
import TxnCapacityIcon from '../../assets/icons/txn-capacity.svg';
import DecentralizationRatio from '../../assets/icons/decentralization-ratio.svg';

// White Icons AccountsIconWhite
import ActiveSmeshersIconWhite from '../../assets/darkTheme/active-smeshers_white.svg';
import AccountsIconWhite from '../../assets/darkTheme/accounts_white.svg';
import SmeshingRewardIconWhite from '../../assets/darkTheme/smeshing-reward_white.svg';
import AgeIconWhite from '../../assets/darkTheme/age_white.svg';
import LayerEpochWhite from '../../assets/darkTheme/layer-epoch_white.svg';
import TxnsIconWhite from '../../assets/darkTheme/txns_white.svg';
import CirculationIconWhite from '../../assets/darkTheme/circulation_white.svg';
import SecurityIconWhite from '../../assets/darkTheme/security_white.svg';
import TxnCapacityIconWhite from '../../assets/darkTheme/txn-capacity_white.svg';
import DecentralizationRatioWhite from '../../assets/darkTheme/decentralization-ratio_white.svg';

// Context providers
import { LayoutContext } from '../../contextProviders/layoutContext';

const Home = () => {
  const layoutContextData = useContext(LayoutContext);
  const { checkedTheme } = layoutContextData;
  const isLightTheme = checkedTheme === 'light';

  // Rework and uncomment after backend add logic for getting data
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const hostname = window.location.hostname === 'localhost' ? 'stage-dash.spacemesh.io' : window.location.hostname;
  const [data, setData] = useState(false);

  const connect = () => {
    const socketClient = new W3CWebSocket(`${protocol}://${hostname}:8080/ws`);

    socketClient.onmessage = (message) => setData(JSON.parse(message.data));

    socketClient.onclose = (e) => {
      console.log('connection is closed.', e.reason);
    };

    socketClient.onerror = (err) => {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => connect(), []);

  useEffect(() => {
    const color = localStorage.getItem('theme-color');
    if (color) {
      document.documentElement.classList.add(`theme-${color}`);
    } else {
      document.documentElement.classList.add('theme-light');
    }
  }, []);

  const networkName = data && data.network;

  const activeSmeshers = data && data.smeshers[data.smeshers.length - 1];
  const activeSmeshersChartData = data && data.smeshers;

  const accounts = data && data.accounts[data.accounts.length - 1];
  const accountsChartData = data && data.accounts;

  const smeshingReward = data && data.rewards[data.rewards.length - 1];
  const smeshingRewardChartData = data && data.rewards;

  const circulation = data && data.circulation[data.circulation.length - 1];
  const circulationChartData = data && data.circulation;

  const transactions = data && data.transactions[data.transactions.length - 1];
  const transactionsChartData = data && data.transactions;

  const security = data && data.security[data.security.length - 1];
  const securityChartData = data && data.security;

  return (
    <div className="wrap">
      <Helmet>
        <title>Spacemesh Dashboard</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="row pb-2">
        <div className="col-lg-12">
          <NetworkName name={networkName} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 pr-lg-2">
          <DataTile icon={isLightTheme ? ActiveSmeshersIcon : ActiveSmeshersIconWhite} title="Active smeshers" value={activeSmeshers && activeSmeshers.amt} showValue>
            <BarChartCustom data={activeSmeshersChartData} />
          </DataTile>
          <DataTile icon={isLightTheme ? AccountsIcon : AccountsIconWhite} title="Accounts" value={accounts && accounts.amt} showValue>
            <BarChartCustom data={data && accountsChartData} />
          </DataTile>
          <DataTile icon={isLightTheme ? SmeshingRewardIcon : SmeshingRewardIconWhite} title="Smeshing rewards" showValue value={smeshingReward && smeshingReward.amt} valueUnit="SMH">
            <BarChartCustom data={data && smeshingRewardChartData} />
          </DataTile>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6 pl-lg-0 pr-lg-1">
              <DataTile icon={isLightTheme ? AgeIcon : AgeIconWhite} title="Age" showValue value={data && data.age} />
            </div>
            <div className="col-lg-6 pr-lg-0 pl-lg-1">
              <DataTile icon={isLightTheme ? LayerEpoch : LayerEpochWhite} title="Layer / Epoch" showValue value={data && `${data.layer}/${data.epoch}`} />
            </div>
          </div>
          <div className="row pb-2">
            <div className="col-lg-12 pl-lg-0 pr-lg-0">
              <Map geoMarkers={data && data.smeshersGeo} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 pl-lg-0 pr-lg-1">
              <DataTile icon={isLightTheme ? TxnCapacityIcon : TxnCapacityIconWhite} title="Tx/S Capacity">
                <RangeSlider value={data && [data.capacity]} />
              </DataTile>
            </div>
            <div className="col-lg-6 pr-lg-0 pl-lg-1">
              <DataTile icon={isLightTheme ? DecentralizationRatio : DecentralizationRatioWhite} title="Decentralization Ratio">
                <RangeSlider value={data && [data.decentral]} />
              </DataTile>
            </div>
          </div>
        </div>
        <div className="col-lg-3 pl-lg-2">
          <DataTile icon={isLightTheme ? TxnsIcon : TxnsIconWhite} title="Transactions" value={transactions && transactions.amt} showValue>
            <BarChartCustom data={data && transactionsChartData} />
          </DataTile>
          <DataTile icon={isLightTheme ? CirculationIcon : CirculationIconWhite} valueUnit="SMH" title="Circulation" value={circulation && circulation.amt} showValue>
            <BarChartCustom data={data && circulationChartData} />
          </DataTile>
          <DataTile icon={isLightTheme ? SecurityIcon : SecurityIconWhite} title="Security" value={security && security.amt} showValue valueUnit="PB">
            <BarChartCustom data={data && securityChartData} />
          </DataTile>
        </div>
      </div>
    </div>
  );
};

export default Home;
