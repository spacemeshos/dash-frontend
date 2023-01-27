// @flow
import React from 'react';
import Loader from '../Loader';

type Props = {
  value: string,
  units?: string,
  delimiter: string,
}

const ValueHolder = ({ value, units, delimiter }: Props) => {
  const data = units ? `${value} ${delimiter || ''} ${units}` : value;

  return (
    (value || value === 0) ? (
      <div className="value-holder">{data}</div>
    ) : (
      <Loader size={25} />
    ));
};

export default ValueHolder;
