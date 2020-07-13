// @flow
import React from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// Colors
import * as colors from '../../../styles/utilities/_variables.scss';

type Props = {
  data: Array;
  dataMeasure?: string,
  tooltipFilter?: Function,
}

const BarChartCustom = (props: Props) => {
  const { data, dataMeasure, tooltipFilter } = props;

  const customFormatter = (value) => {
    const unit = dataMeasure || 'data';
    const item = tooltipFilter ? tooltipFilter(value) : value;

    return [`${item}`, `${unit}`];
  };

  return (
    <ResponsiveContainer width="100%" height={124}>
      {data.length > 0
        ? (
          <BarChart data={data}>
            <Bar dataKey="amt" fill={colors.barChart} barSize={2} />
            <Tooltip formatter={(value) => customFormatter(value)} labelFormatter={() => undefined} />
          </BarChart>
        ) : (
          <div />
        )}
    </ResponsiveContainer>
  );
};

export default BarChartCustom;
