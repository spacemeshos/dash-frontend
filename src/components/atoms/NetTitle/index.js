// @flow
import React from 'react';

type Props = {
  title: string,
}

const NetTitle = (props: Props) => {
  const { title } = props;
  return (
    <div className="net-title">
      { title }
    </div>
  );
};

export default NetTitle;
