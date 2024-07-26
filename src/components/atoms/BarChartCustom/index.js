// @flow
import React from 'react';
import {
  BarChart,
  Bar,
  ResponsiveContainer, Tooltip,
} from 'recharts';
import CustomTimeAgo from '../CustomTimeAgo';

type Props = {
  data: Array;
  dataMeasure?: string,
  tooltipFilter?: Function,
}

const CustomizedTooltip = ({ active, payload, tooltipFilter, dataMeasure }) => {
  if (active) {
    const dataValue = tooltipFilter ? tooltipFilter(payload[0].value) : payload[0].value;

    return (
      active && (
      <div className="custom-tooltip">
        <p className="custom-tooltip_label">{`${dataValue} ${dataMeasure}`}</p>
        <p className="custom-tooltip_label">
          <CustomTimeAgo live={false} time={0} />
        </p>
        <p className="custom-tooltip_label">
          Epoch&nbsp;
          {payload[0].payload}
        </p>
      </div>
      )
    );
  }
};

const BarChartCustom = ({ data, dataKey, tooltipFilter, dataMeasure }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={124}>
      {Object.keys(data).length > 0
        ? (
          <BarChart data={Object.keys(data)}>
            <Bar dataKey={(key) => data[parseInt(key, 10)].stats[dataKey]} barSize={2} />
            <Tooltip content={<CustomizedTooltip tooltipFilter={tooltipFilter} dataMeasure={dataMeasure} />} />
          </BarChart>
        ) : (
          <div />
        )}
    </ResponsiveContainer>
  );
};

export default BarChartCustom;
