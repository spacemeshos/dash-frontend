// @flow
import * as React from 'react';
import TimeAgo from 'timeago-react';

type Props = {
  time: number
};

const CustomTimeAgo = (props: Props) => {
  const { time } = props;
  const now = new Date().getTime().toString();

  const currentTimestamp = now.substring(0, now.length - 3);
  const jsDate = new Date((+currentTimestamp - (time / 1000)) * 1000);

  return (
    <span>
      <TimeAgo datetime={jsDate} />
    </span>
  );
};

export default CustomTimeAgo;
