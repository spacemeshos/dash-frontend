// @flow
import React from 'react';
import TileTitle from '../../atoms/TileTitle';

type Props = {
  title: string,
}

const StatTile = (props: Props) => {
  const { title } = props;
  return (
    <div className="statTitle-wrap">
      <TileTitle
        title={title}
        toolTipMessage="test"
      />
      <div className="chart-block" />
    </div>
  );
};

export default StatTile;
