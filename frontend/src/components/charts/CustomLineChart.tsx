import React from 'react';

import { Tooltip } from 'react-bootstrap';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  YAxis
} from 'recharts';

import getRandomColor from '../../functions/getRandomColor';

interface Props {
  data: any;
  lines: string[];
}

const CustomLineChart = ({ data, lines }: Props) => {
  return (
    <ResponsiveContainer width={'100%'} height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line}
            name={line}
            stroke={getRandomColor()}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
