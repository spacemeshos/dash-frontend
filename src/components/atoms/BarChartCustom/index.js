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
  if (active && payload && payload.length) {
    const dataValue = tooltipFilter ? tooltipFilter(payload[0].value) : payload[0].value;

    return (
      active && (
      <div className="custom-tooltip">
        <p className="custom-tooltip_label">{`${dataValue} ${dataMeasure}`}</p>
        <p className="custom-tooltip_label">
          <CustomTimeAgo live={false} time={payload[0].payload.timestamp} />
        </p>
        <p className="custom-tooltip_label">
          Epoch&nbsp;
          {payload[0].payload.number}
        </p>
      </div>
      )
    );
  }
};

const BarChartCustom = ({ data, dataKey, tooltipFilter, dataMeasure }: Props) => {
  const d = Object.keys(data).map((key) => ({
    ...data[key],
  }));
  return (
    <ResponsiveContainer width="100%" height={124}>
      {Object.keys(data).length > 0
        ? (
          <BarChart data={d}>
            <Bar dataKey={dataKey} barSize={2} />
            <Tooltip content={<CustomizedTooltip tooltipFilter={tooltipFilter} dataMeasure={dataMeasure} />} />
          </BarChart>
        ) : (
          <div />
        )}
    </ResponsiveContainer>
  );
};

export default BarChartCustom;
