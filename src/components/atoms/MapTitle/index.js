// @flow
import React from 'react';
import ReactTooltip from 'react-tooltip';

import tooltipIcon from '../../../assets/icons/question.svg';

type Props = {
  title: string,
  toolTipMessage: string,
}

const MapTitle = (props: Props) => {
  const { title, toolTipMessage } = props;
  return (
    <div className="mapTitle-wrap">
      <div className="mapTitle-text">
        { title }
      </div>
      <div className="mapTitle-icons">
        <img data-tip data-for="map-tooltip" src={tooltipIcon} alt="" />
        <ReactTooltip id="map-tooltip" aria-haspopup="true">
          <div style={{ width: '150px' }}>
            {toolTipMessage}
          </div>
        </ReactTooltip>
      </div>
    </div>
  );
};

export default MapTitle;
