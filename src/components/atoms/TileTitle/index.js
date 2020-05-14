// @flow
import React from 'react';
import ReactTooltip from 'react-tooltip';

import tooltipIcon from '../../../assets/icons/question.svg';

type Props = {
  icon: string,
  title: string,
  toolTipMessage: string,
}

const TileTitle = (props: Props) => {
  const { title, toolTipMessage, icon } = props;
  const textClassName = title.length > 20 ? 'tileTitle-text short-letter-spacing' : 'tileTitle-text';

  return (
    <div className="tileTitle-wrap">
      <div className={textClassName}>
        { title }
      </div>
      <div className="tileTitle-icons">
        <img className="icon-tooltip" data-tip data-for="tile-tooltip" src={tooltipIcon} alt="" />
        <img className="icon-tile" src={icon} alt="" />
        <ReactTooltip id="tile-tooltip" aria-haspopup="true">
          <div style={{ width: '150px' }}>
            {toolTipMessage}
          </div>
        </ReactTooltip>
      </div>
    </div>
  );
};

export default TileTitle;
