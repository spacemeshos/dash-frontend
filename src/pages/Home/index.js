// @flow
import * as React from 'react';
import { Helmet } from 'react-helmet';
import StatTile from '../../components/molecules/StatTile';
import NetTitle from '../../components/atoms/NetTitle';

const Home = () => {
  const netTitle = 'TestNet 0.1';

  return (
    <div className="wrap">
      <Helmet>
        <title>Spacemesh Dashboard</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="row">
        <div className="col-lg-12">
          <NetTitle title={netTitle} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3">
          <StatTile title="Active smashers" />
          <StatTile title="Accounts" />
          <StatTile title="Smeshing rewards" />
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <StatTile title="Age" />
            </div>
            <div className="col-lg-6">
              <StatTile title="Layer / Epoch" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">Map</div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <StatTile title="Tx/S Capasity" />
            </div>
            <div className="col-lg-6">
              <StatTile title="Decentralization Ratio" />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <StatTile title="Transactions" />
          <StatTile title="Circulation" />
          <StatTile title="Security" />
        </div>
      </div>
    </div>
  );
};

export default Home;
