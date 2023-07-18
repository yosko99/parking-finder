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

interface Props {
  data: any;
}

const CustomLineChart = ({ data }: Props) => {
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
        <Line
          type="monotone"
          dataKey="value"
          name="sales"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
