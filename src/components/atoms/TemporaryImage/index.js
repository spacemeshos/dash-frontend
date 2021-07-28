import React from 'react';
import worldDark from '../../../assets/w-dark.png';
import worldLight from '../../../assets/w-light.png';

const TemporaryImage = (props) => {
  const { themeColor } = props;

  return (
    <div className="map-wrap">
      <div className="mapTitle-wrap">
        <div className="mapTitle-text">SMESHER DASH</div>
      </div>
      <div className="world-wrap">
        <img src={themeColor ? worldLight : worldDark} alt="world" className="world" />
      </div>
    </div>
  );
};

export default TemporaryImage;
