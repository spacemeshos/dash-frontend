// @flow
import * as React from 'react';
import TimeAgo from 'timeago-react';

type Props = {
  time: number,
  live: boolean,
};

const CustomTimeAgo = (props: Props) => {
  const { time, live } = props;
  const now = new Date().getTime().toString();

  const currentTimestamp = now.substring(0, now.length - 3);
  const jsDate = new Date((+currentTimestamp - (time)) * 1000);

  return (
    <span>
      <TimeAgo datetime={jsDate} live={live} />
    </span>
  );
};

export default CustomTimeAgo;
