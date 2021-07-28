import React from 'react';
import worldDark from '../../../assets/world-dark.svg';
import worldLight from '../../../assets/world-light.svg';

const TemporaryImage = (props) => {
  const { themeColor } = props;
  return (
    <div className="map-wrap">
      <div className="mapTitle-wrap">
        <div className="mapTitle-text">SmeSHER DASH</div>
      </div>
      <div className="world-wrap">
        <img src={themeColor === 'dark' ? worldLight : worldDark} alt="world" className="world" />
      </div>

    </div>
  );
};

export default TemporaryImage;
