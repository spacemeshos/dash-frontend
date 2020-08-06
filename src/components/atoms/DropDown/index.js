// @flow
import * as React from 'react';

import Dropdown from 'react-dropdown';

const options = [
  { value: 'network1', label: 'DevNet' }, { value: 'network2', label: 'TestNet 0.1 "TweedleDee"' },
];

const DropDown = () => {
  const onSelect = (e) => console.log('select', e);

  return (
    <Dropdown
      options={options}
      onChange={onSelect}
      value="DevNet"
      placeholder="Select an option"
    />
  );
};

export default DropDown;
