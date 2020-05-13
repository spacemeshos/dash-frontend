// @flow
import React from 'react';

import TileTitle from '../../atoms/TileTitle';
import ValueHolder from '../../atoms/ValueHolder';

type Props = {
  title: string,
  icon: string,
  value?: string,
  showValue?: boolean;
  valueUnit?: string,
}

const DataTile = (props: Props) => {
  const { title, value, valueUnit, showValue, children, icon } = props;

  return (
    <div className="statTitle-wrap">
      <TileTitle
        icon={icon}
        title={title}
        toolTipMessage="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. "
      />
      {showValue && (<ValueHolder value={value} units={valueUnit} />) }
      { children }
    </div>
  );
};

export default DataTile;
