// @flow
import React from 'react';

import TileTitle from '../../atoms/TileTitle';
import ValueHolder from '../../atoms/ValueHolder';

type Props = {
  title: string,
  value?: string,
  showValue?: boolean;
  valueUnit?: string,
  Chart?: React.Node,
}

const StatTile = (props: Props) => {
  const { title, value, valueUnit, Chart, showValue } = props;

  return (
    <div className="statTitle-wrap">
      <TileTitle
        title={title}
        toolTipMessage="test"
      />
      {showValue && (<ValueHolder value={value} units={valueUnit}/>) }
      {Chart && (<Chart/>)}
    </div>
  );
};

export default StatTile;
