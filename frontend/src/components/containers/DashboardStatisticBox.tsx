import React from 'react';

import CountUp from 'react-countup';

import CustomPercentage from '../utils/CustomPercentage';

interface Props {
  firstValue: number;
  secondValue: number;
  title: string;
}

const DashboardStatisticBox = ({ firstValue, secondValue, title }: Props) => {
  return (
    <div>
      <p className="mb-2">{title}</p>
      <p className="fs-4 mb-0" style={{ fontWeight: 'bold' }}>
        $ <CountUp end={firstValue} decimals={2} duration={1} />{' '}
        <span className="ms-2">
          <CustomPercentage firstValue={firstValue} secondValue={secondValue} />
        </span>
      </p>
      <hr className="m-0 my-1" />
      <p className="text-muted mb-2">Previous period</p>
      <p className="fs-4 mb-0 text-muted" style={{ fontWeight: 'bold' }}>
        $ <CountUp end={secondValue} decimals={2} duration={1} />
      </p>
    </div>
  );
};

export default DashboardStatisticBox;
