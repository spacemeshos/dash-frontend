// @flow
import React from 'react';

type Props = {
  id: string,
  checked: boolean,
  onChange: Function,
}

const Switcher = ({ id, checked, onChange }: Props) => (
  <div className="m-checkbox switch">
    <input
      type="checkbox"
      className="m-checkbox__input m-checkbox--switch__input"
      checked={checked}
      id={id}
      onChange={onChange}
    />
  </div>
);

export default Switcher;
