// @flow
import React from 'react';

import mapImage from '../../../assets/map.svg';
import MapTitle from '../../atoms/MapTitle';

const Map = () => {

  return (
    <div className="map-wrap">
      <MapTitle title="Live Smeshers" toolTipMessage="test"/>
      <img src={mapImage} alt="" />
    </div>
  );
};

export default Map;
