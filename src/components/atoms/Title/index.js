import React from 'react';

const Title = (props) => {
  const { text } = props;
  return (
    <div className="title-text">{text}</div>
  );
};

export default Title;
