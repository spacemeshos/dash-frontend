// @flow
import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

type Props = {
  value: string,
  units?: string,
  delimiter: string,
}

const ValueHolder = (props: Props) => {
  const { value, units, delimiter } = props;
  const data = units ? `${value} ${delimiter || ''} ${units}` : value;

  return (
    (value || value === 0) ? (
      <div className="value-holder">{data}</div>
    ) : (
      <ScaleLoader
        css="margin-left: 10px; height: 18px"
        size={150}
        color="#65B042"
        loading
      />
    ));
};

export default ValueHolder;
