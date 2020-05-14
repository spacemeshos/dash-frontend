// @flow
import React from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';

// Colors
import * as colors from '../../../styles/utilities/_variables.scss';

type Props = {
  data: Array;
}

const BarChartCustom = (props: Props) => {
  const { data } = props;

  return (
    <ResponsiveContainer width="100%" height={124}>
      <BarChart data={data}>
        <Bar dataKey="uv" fill={colors.barChart} barSize={2} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartCustom;
