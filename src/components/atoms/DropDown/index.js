// @flow
import * as React from 'react';

import Dropdown from 'react-dropdown';

const options = [
  { value: 'network1', label: 'TestNet 0.1 "TweedleDee"' }, { value: 'network2', label: 'TestNet 0.2 "TweedleDee"' },
];

const DropDown = () => {
  const onSelect = (e) => console.log('select', e);

  return (
    <Dropdown
      options={options}
      onChange={onSelect}
      value='TestNet 0.1 "TweedleDee"'
      placeholder="Select an option"
    />
  );
};

export default DropDown;
