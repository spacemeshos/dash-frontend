// @flow
import React from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import CustomTimeAgo from '../CustomTimeAgo';

type Props = {
    data: Array;
    dataMeasure?: string,
    tooltipFilter?: Function,
}

const CustomizedTooltip = ({ active, payload, tooltipFilter, dataMeasure }) => {
  if (active) {
    const { epoch, age } = payload[0].payload;
    const dataValue = tooltipFilter ? tooltipFilter(payload[0].value) : payload[0].value;

    return (
      active && (
      <div className="custom-tooltip">
        <p className="custom-tooltip_label">{`${dataValue} ${dataMeasure}`}</p>
        <p className="custom-tooltip_label">
          <CustomTimeAgo live={false} time={age} />
        </p>
        <p className="custom-tooltip_label">
          Epoch&nbsp;
          {epoch}
        </p>
      </div>
      )
    );
  }
};

const BarChartCustom = ({ data, dataMeasure, tooltipFilter }: Props) => (
  <ResponsiveContainer width="100%" height={124}>
    {data.length > 0
      ? (
        <BarChart data={data}>
          <Bar dataKey="amt" barSize={2} />
          <Tooltip content={<CustomizedTooltip tooltipFilter={tooltipFilter} dataMeasure={dataMeasure} />} />
        </BarChart>
      ) : (
        <div />
      )}
  </ResponsiveContainer>
);

export default BarChartCustom;
