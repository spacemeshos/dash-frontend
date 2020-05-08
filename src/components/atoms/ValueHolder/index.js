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
    <p className="value-holder">
     { value ? data : (<ClipLoader
       css={'margin-left: 15px'}
       size={150}
       color={"#65B042"}
       loading={true}
     />) }
    </p>
  );
};

export default ValueHolder;
