import React from 'react';

import CountUp from 'react-countup';

import CustomPercentage from '../utils/CustomPercentage';

interface Props {
  firstValue: number;
  secondValue: number;
  title: string;
  isPrice: boolean;
}

const DashboardStatisticBox = ({
  firstValue,
  secondValue,
  title,
  isPrice
}: Props) => {
  return (
    <div>
      <p className="mb-2">{title}</p>
      <p className="fs-4 mb-0" style={{ fontWeight: 'bold' }}>
        {isPrice && '$ '}
        <CountUp
          end={firstValue}
          decimals={isPrice ? 2 : 0}
          duration={1}
        />{' '}
        <span className="ms-2">
          <CustomPercentage firstValue={firstValue} secondValue={secondValue} />
        </span>
      </p>
      <hr className="m-0 my-1" />
      <p className="text-muted mb-2">Previous period</p>
      <p className="fs-4 mb-0 text-muted" style={{ fontWeight: 'bold' }}>
        {isPrice && '$ '}
        <CountUp end={secondValue} decimals={isPrice ? 2 : 0} duration={1} />
      </p>
    </div>
  );
};

export default DashboardStatisticBox;
