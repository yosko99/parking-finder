import React from 'react';

import { Tooltip } from 'react-bootstrap';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

import getRandomColor from '../../functions/getRandomColor';

interface Props {
  data: any;
}

const CustomPieChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={'100%'} height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          isAnimationActive={true}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((_entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={getRandomColor()} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
