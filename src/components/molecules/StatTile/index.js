// @flow
import React from 'react';
import TileTitle from '../../atoms/TileTitle';
import ValueHolder from '../../atoms/ValueHolder';
import Chart from "../../atoms/Chart";

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
      <ValueHolder value={500}/>
      <Chart />
    </div>
  );
};

export default StatTile;
