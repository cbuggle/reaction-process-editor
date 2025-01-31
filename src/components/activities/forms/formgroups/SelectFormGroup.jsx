import React from 'react';
import Select from 'react-select'

import SingleLineFormGroup from './SingleLineFormGroup';
import OptionsDecorator from '../../../../decorators/OptionsDecorator';

import { tooltips } from '../../../../constants/translations';

const SelectFormGroup = (
  {
    name,
    value,
    options,
    label,
    onChange,
    isMulti,
    isClearable,
    includesCurrentOption = true,
    placeholder,
    disabled
  }) => {

  let displayOptions = options
  let selected = OptionsDecorator.optionForValue(value, displayOptions)

  if (value && includesCurrentOption) {
    if (Array.isArray(value)) {
      displayOptions = OptionsDecorator.appendValuesToOptions(value, displayOptions)
      selected = OptionsDecorator.optionsForValues(value, displayOptions)
    } else {
      displayOptions = OptionsDecorator.appendValueToOptions(value, displayOptions)
      selected = OptionsDecorator.optionForValue(value, displayOptions)
    }
  }

  let tooltip = selected?.unavailable && tooltips['selection_unmet_dependency']

  return (<>
    <SingleLineFormGroup
      label={label}
      tooltip={tooltip}>

      <Select
        className="react-select--overwrite"
        classNamePrefix="react-select"
        name={name}
        options={displayOptions}
        value={selected}
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

