// @flow
import React from 'react';

type Props = {
  value: string,
  units?: string,
}

const ValueHolder = (props: Props) => {
  const { value, units } = props;
  const data = units ? `${value} / ${units}` : value;

  return (
    <p className="value-holder">
      { data }
    </p>
  );
};

export default ValueHolder;
