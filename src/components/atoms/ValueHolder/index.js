// @flow
import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

type Props = {
  value: string,
  units?: string,
}

const ValueHolder = (props: Props) => {
  const { value, units } = props;
  const data = units ? `${value} / ${units}` : value;

  return (
    value ? (
      <div className="value-holder">{data}</div>
    ) : (
      <ScaleLoader
        css="margin-left: 15px; height: 18px"
        size={150}
        color="#65B042"
        loading
      />
    ));
};

export default ValueHolder;
