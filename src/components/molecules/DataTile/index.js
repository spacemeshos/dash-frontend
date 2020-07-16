// @flow
import React from 'react';

import TileTitle from '../../atoms/TileTitle';
import ValueHolder from '../../atoms/ValueHolder';

type Props = {
  title: string,
  icon: string,
  toolTipMess?: string,
  value?: string,
  showValue?: boolean;
  valueUnit?: string,
  delimiter?: string,
}

const DataTile = (props: Props) => {
  const { title, value, valueUnit, toolTipMess, showValue, children, icon, delimiter } = props;

  return (
    <div className="dataTitle-wrap">
      <TileTitle
        icon={icon}
        title={title}
        toolTipMessage={toolTipMess}
      />
      {showValue && (<ValueHolder value={value} delimiter={delimiter} units={valueUnit} />) }
      { children }
    </div>
  );
};

export default DataTile;
