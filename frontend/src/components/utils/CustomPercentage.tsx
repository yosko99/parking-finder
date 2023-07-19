import React from 'react';

import CountUp from 'react-countup';

interface Props {
  firstValue: number;
  secondValue: number;
}

const CustomPercentage = ({ firstValue, secondValue }: Props) => {
  const value1 = firstValue > 0 ? firstValue : 1;
  const value2 = secondValue > 0 ? secondValue : 1;

  return (
    <CountUp
      end={(value1 / value2) * 100}
      duration={1}
      decimals={2}
      suffix=" %"
      prefix={value1 > value2 ? '↑' : '↓'}
      className={value1 > value2 ? 'text-success' : 'text-danger'}
    />
  );
};

export default CustomPercentage;
