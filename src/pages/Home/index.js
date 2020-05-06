// @flow
import * as React from 'react';
import { Helmet } from 'react-helmet';
import StatTile from '../../components/molecules/StatTile';
import NetTitle from '../../components/atoms/NetTitle';
import BarChartCustom from '../../components/atoms/BarChartCustom';
import chartData from "../../utils";
import Map from "../../components/molecules/Map";

const Home = () => {
  const netTitle = 'TestNet 0.1';

  const data1 = chartData(50);
  const data2 = chartData(50);
  const data3 = chartData(50);

  return (
    <div className="wrap">
      <Helmet>
        <title>Spacemesh Dashboard</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="row pb-2">
        <div className="col-lg-12">
          <NetTitle title={netTitle} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3">
          <StatTile title="Active smashers" value={550} Chart={() => <BarChartCustom data={data1}/>} />
          <StatTile title="Accounts" value={250} Chart={() => <BarChartCustom data={data2}/>}  />
          <StatTile title="Smeshing rewards" value={523} valueUnit="SMH" Chart={() => <BarChartCustom data={data3}/>} />
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <StatTile title="Age" value="32d:5h"/>
            </div>
            <div className="col-lg-6">
              <StatTile title="Layer / Epoch" value="126812/13"/>
            </div>
          </div>
          <div className="row pb-2">
            <div className="col-lg-12">
              <Map />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <StatTile title="Tx/S Capasity" value="20%" />
            </div>
            <div className="col-lg-6">
              <StatTile title="Decentralization Ratio" value="50%" />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <StatTile title="Transactions" value={550} Chart={() => <BarChartCustom data={data1}/>} />
          <StatTile title="Circulation" value={250} Chart={() => <BarChartCustom data={data2}/>} />
          <StatTile title="Security" value={523} valueUnit="SMH" Chart={() => <BarChartCustom data={data3}/>}  />
        </div>
      </div>
    </div>
  );
};

export default Home;
