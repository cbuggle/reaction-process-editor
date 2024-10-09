import React from 'react';

import Select from 'react-select'

import SingleLineFormGroup from './SingleLineFormGroup';
import { tooltips } from '../../../../constants/translations';

const SelectFormGroup = (
  {
    name,
    value,
    options,
    label,
    tooltipName,
    onChange,
    isMulti,
    isClearable,
    placeholder,
    disabled
  }) => {

  return (<>
    <SingleLineFormGroup
      label={label}
      tooltip={tooltips[tooltipName] || tooltipName}>

      <Select
        className="react-select--overwrite"
        classNamePrefix="react-select"
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        isMulti={isMulti}
        isClearable={isClearable}
        placeholder={placeholder}
        isDisabled={disabled}
      />
    </SingleLineFormGroup>
  </>
  );
};

export default SelectFormGroup;

