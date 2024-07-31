// @flow
import * as React from 'react';
import TimeAgo from 'timeago-react';

type Props = {
  time: number,
  live: boolean,
};

const CustomTimeAgo = ({ time, live }: Props) => {
  const jsDate = new Date(time * 1000);

  return (
    <span>
      <TimeAgo datetime={jsDate} live={live} />
    </span>
  );
};

export default CustomTimeAgo;
