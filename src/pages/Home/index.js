// @flow
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
// import { w3cwebsocket as W3CWebSocket } from 'websocket';

// Component
import NetworkName from '../../components/atoms/NetworkName';
import BarChartCustom from '../../components/atoms/BarChartCustom';
import RangeSlider from '../../components/atoms/RangeSlider';
import DataTile from '../../components/molecules/DataTile';
import Map from '../../components/molecules/Map';

// Utils
import chartData from '../../utils';

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
//   const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
//   const [ws, setWs] = useState(null);
//
//   const connect = () => {
//     const socketClient = new W3CWebSocket(`${protocol}://localhost:3001/client`);
//
//     // websocket onopen event listener
//     socketClient.onopen = () => {
//       console.log('connected');
//       setWs(socketClient);
//     };
//
//     socketClient.onclose = (e) => {
//       console.log('Socket is closed.', e.reason);
//     };
//
//     socketClient.onerror = (err) => {
//       console.error('Socket encountered error: ', err.message, 'Closing socket');
//     };
//   };
//
//   useEffect(() => connect(), []);

  const networkName = 'TestNet 0.1';

  // Mock data for chart
  const data1 = chartData(50);
  const data2 = chartData(50);
  const data3 = chartData(50);

  const [activeSmashers, setActiveSmashers] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setActiveSmashers(250);
    }, 2000);
  }, []);

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
        <div className="col-lg-3">
          <DataTile icon={ActiveSmashersIcon} title="Active smashers" value={activeSmashers} showValue>
            <BarChartCustom data={data1} />
          </DataTile>
          <DataTile icon={AccountsIcon} title="Accounts" value={250} showValue>
            <BarChartCustom data={data2} />
          </DataTile>
          <DataTile icon={SmashingRewardIcon} title="Smeshing rewards" showValue value={523} valueUnit="SMH">
            <BarChartCustom data={data3} />
          </DataTile>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <DataTile icon={AgeIcon} title="Age" showValue value="32d:5h" />
            </div>
            <div className="col-lg-6">
              <DataTile icon={LayerEpoch} title="Layer / Epoch" showValue value="126812/13" />
            </div>
          </div>
          <div className="row pb-2">
            <div className="col-lg-12">
              <Map />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <DataTile icon={TxnCapacityIcon} title="Tx/S Capasity">
                <RangeSlider data={[20]} />
              </DataTile>
            </div>
            <div className="col-lg-6">
              <DataTile icon={DecentralizationRatio} title="Decentralization Ratio">
                <RangeSlider data={[64]} />
              </DataTile>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <DataTile icon={TxnsIcon} title="Transactions" value={550} showValue>
            <BarChartCustom data={data1} />
          </DataTile>
          <DataTile icon={CirculationIcon} title="Circulation" value={250} showValue>
            <BarChartCustom data={data2} />
          </DataTile>
          <DataTile icon={SecurityIcon} title="Security" value={523} showValue valueUnit="SMH">
            <BarChartCustom data={data3} />
          </DataTile>
        </div>
      </div>
    </div>
  );
};

export default Home;
