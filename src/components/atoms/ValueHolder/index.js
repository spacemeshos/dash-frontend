// @flow
import React from 'react';
import ClipLoader from "react-spinners/ScaleLoader";

type Props = {
  value: string,
  units?: string,
}

const ValueHolder = (props: Props) => {
  const { value, units } = props;
  const data = units ? `${value} / ${units}` : value;

  return (
    <div className="value-holder">
      { value ? data : (<ClipLoader
        size={150}
        color={"#65B042"}
        loading={true}
      />) }
    </div>
  );
};

export default ValueHolder;
