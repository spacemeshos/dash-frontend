// @flow
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

// Component
import NetworkName from '../../components/atoms/NetworkName';
import BarChartCustom from '../../components/atoms/BarChartCustom';
import RangeSlider from '../../components/atoms/RangeSlider';
import DataTile from '../../components/molecules/DataTile';
import Map from '../../components/molecules/Map';

// Icons
import ActiveSmashersIcon from '../../assets/icons/active-smashers.svg';
import AccountsIcon from '../../assets/icons/accounts.svg';
import SmashingRewardIcon from '../../assets/icons/smeshing-reward.svg';
import AgeIcon from '../../assets/icons/age.svg';
import LayerEpoch from '../../assets/icons/layer-epoch.svg';
import TxnsIcon from '../../assets/icons/txns.svg';
import CirculationIcon from '../../assets/icons/circulation.svg';
import SecurityIcon from '../../assets/icons/security.svg';
import TxnCapacityIcon from '../../assets/icons/txn-capacity.svg';
import DecentralizationRatio from '../../assets/icons/decentralization-ratio.svg';

const Home = () => {
// Rework and uncomment after backend add logic for getting data
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const [data, setData] = useState(false);

  const connect = () => {
    const socketClient = new W3CWebSocket(`${protocol}://127.0.0.0:8080/ws`);

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

  const networkName = data && data.network;

  const activeSmashers = data && data.smeshers[data.smeshers.length - 1];
  const activeSmashersChartData = data && data.smeshers;

  const accounts = data && data.accounts[data.accounts.length - 1];
  const accountsChartData = data && data.accounts;

  const smashingReward = data && data.rewards[data.rewards.length - 1];
  const smashingRewardChartData = data && data.rewards;

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
          <DataTile icon={ActiveSmashersIcon} title="Active smashers" value={activeSmashers && activeSmashers.amt} showValue>
            {data && <BarChartCustom data={activeSmashersChartData} />}
          </DataTile>
          <DataTile icon={AccountsIcon} title="Accounts" value={accounts && accounts.amt} showValue>
            {data && <BarChartCustom data={data && accountsChartData} />}
          </DataTile>
          <DataTile icon={SmashingRewardIcon} title="Smeshing rewards" showValue value={smashingReward && smashingReward.amt} valueUnit="SMH">
            {data && <BarChartCustom data={data && smashingRewardChartData} />}
          </DataTile>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6 pl-lg-0 pr-lg-1">
              <DataTile icon={AgeIcon} title="Age" showValue value={data && data.age} />
            </div>
            <div className="col-lg-6 pr-lg-0 pl-lg-1">
              <DataTile icon={LayerEpoch} title="Layer / Epoch" showValue value={data && `${data.layer}/${data.epoch}`} />
            </div>
          </div>
          <div className="row pb-2">
            <div className="col-lg-12 pl-lg-0 pr-lg-0">
              <Map geoMarkers={data && data.smeshersGeo} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 pl-lg-0 pr-lg-1">
              <DataTile icon={TxnCapacityIcon} title="Tx/S Capasity">
                <RangeSlider value={data && [data.capacity]} />
              </DataTile>
            </div>
            <div className="col-lg-6 pr-lg-0 pl-lg-1">
              <DataTile icon={DecentralizationRatio} title="Decentralization Ratio">
                <RangeSlider value={data && [data.decentral]} />
              </DataTile>
            </div>
          </div>
        </div>
        <div className="col-lg-3 pl-lg-2">
          <DataTile icon={TxnsIcon} title="Transactions" value={transactions && transactions.amt} showValue>
            {data && <BarChartCustom data={data && transactionsChartData} />}
          </DataTile>
          <DataTile icon={CirculationIcon} title="Circulation" value={circulation && circulation.amt} showValue>
            {data && <BarChartCustom data={data && circulationChartData} />}
          </DataTile>
          <DataTile icon={SecurityIcon} title="Security" value={security && security.amt} showValue valueUnit="SMH">
            {data && <BarChartCustom data={data && securityChartData} />}
          </DataTile>
        </div>
      </div>
    </div>
  );
};

export default Home;
