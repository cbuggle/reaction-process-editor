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
  // console.log("SelectFormGroup")
  // console.log(label)
  // console.log(value)
  // console.log(selected)
  // console.log(displayOptions)

  if (value && includesCurrentOption) {
    if (Array.isArray(value)) {
      // console.log("displayOptions append array")
      displayOptions = OptionsDecorator.appendValuesToOptions(value, displayOptions)
      // console.log(displayOptions)
      selected = OptionsDecorator.optionsForValues(value, displayOptions)
      // console.log("displayOptions append array end")
    } else {
      // console.log("displayOptions append")
      displayOptions = OptionsDecorator.appendValueToOptions(value, displayOptions)
      // console.log(displayOptions)
      selected = OptionsDecorator.optionForValue(value, displayOptions)
      // console.log("displayOptions append end")
    }
  }

  let tooltip = selected?.unavailable && tooltips['selection_unavailable']

  // console.log("SelectFormGroup " + label)
  // console.log(value)
  // console.log(options)
  // console.log(displayOptions)

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

