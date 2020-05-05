// @flow
import React from 'react';
import ReactTooltip from 'react-tooltip';

import tooltipIcon from '../../../assets/icons/question.svg';
import ASIcon from '../../../assets/icons/active-smashers.svg';

type Props = {
  title: string,
  toolTipMessage: string,
}

const TileTitle = (props: Props) => {
  const { title, toolTipMessage } = props;
  return (
    <div className="tileTitle-wrap">
      <div className="tileTitle-text">
        { title }
      </div>
      <div className="tileTitle-icons">
        <img data-tip data-for="tile-tooltip" src={tooltipIcon} alt="" />
        <img src={ASIcon} alt="" />
        <ReactTooltip id="tile-tooltip" aria-haspopup="true">
          {toolTipMessage}
        </ReactTooltip>
      </div>
    </div>
  );
};

export default TileTitle;
