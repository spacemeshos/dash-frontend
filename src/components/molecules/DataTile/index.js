import React from 'react';

import TileTitle from '../../atoms/TileTitle';
import ValueHolder from '../../atoms/ValueHolder';

type Props = {
  title: string,
  icon: string,
  url?: string,
  toolTipMess?: string,
  value?: string,
  showValue?: boolean;
  valueUnit?: string,
  delimiter?: string,
}

const DataTile = ({ title, value, valueUnit, toolTipMess, showValue, children, icon, delimiter, url }: Props) => (
  <div className="dataTitle-wrap">
    <TileTitle
      icon={icon}
      title={title}
      url={url}
      toolTipMessage={toolTipMess}
    />
    {showValue && (<ValueHolder value={value} delimiter={delimiter} units={valueUnit} />) }
    { children }
  </div>
);

export default DataTile;
