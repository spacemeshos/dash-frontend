// @flow
import React from 'react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

type Props = {
  data: Array;
}

const BarChartCustom = (props: Props) => {
  const { data } = props;

  return (
    <ResponsiveContainer width='100%' height={130}>
      <BarChart data={data}>
        <Bar dataKey="uv" fill="#C4C4C4" barSize={2}/>
      </BarChart>
    </ResponsiveContainer>
  )
};

export default BarChartCustom;
