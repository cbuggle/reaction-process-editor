import React, { useContext } from 'react';
import Select from 'react-select'

import SingleLineFormGroup from './SingleLineFormGroup';

import OntologiesDecorator from '../../../../decorators/OntologiesDecorator';
import StringDecorator from '../../../../decorators/StringDecorator';

import { tooltips } from '../../../../constants/translations';
import { SelectOptions } from '../../../../contexts/SelectOptions';

const OntologySelectFormGroup = (
  {
    roleName,
    workup,
    onChange,
    label,
    disabled,
    placeholder,
    tooltip,
    options
  }) => {

  let ontologies = useContext(SelectOptions).ontologies

  options ||= ontologies

  let value = workup[roleName]

  let selectableOptions = OntologiesDecorator.selectableOptions({ options: options, ontologies: ontologies, roleName: roleName, workup: workup, key: Math.random(10000) })

  // if (roleName === 'subtype') {
  //   console.log("OntologySelectFormGroup options " + roleName)
  //   console.log(value)
  //   console.log(options)
  //   console.log(selectableOptions)
  // }
  let selectedOption = OntologiesDecorator.findByOntologyId({ ontologyId: value, ontologies: selectableOptions })

  // tooltip ||= selectedOption && dependencyOptions && !dependencyOptions.includes(selectedOption) && tooltips['selection_unmet_dependency']
  tooltip ||= selectedOption?.unavailable && tooltips['selection_unavailable']
  tooltip ||= selectedOption?.inactive && tooltips['selection_inactive']
  tooltip ||= selectedOption?.unmetDependency && tooltips['selection_unmet_dependency']

  label ||= StringDecorator.toLabelSpelling(roleName) // || value

  // label = value
  return (<>
    <SingleLineFormGroup
      key={"form-group-" + roleName + "-" + value + Math.random(10000)}
      label={label}
      tooltip={tooltip}
    >
      <Select
        className="react-select--overwrite"
        classNamePrefix="react-select"
        name={roleName}
        options={selectableOptions}
        value={selectedOption}
        onChange={onChange}
        isClearable={true}
        placeholder={placeholder}
        isDisabled={disabled}
      />
    </SingleLineFormGroup>
  </>
  );
};

export default OntologySelectFormGroup;

