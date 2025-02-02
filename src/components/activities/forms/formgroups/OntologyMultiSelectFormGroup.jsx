import React, { useContext } from 'react';
import Select from 'react-select'

import SingleLineFormGroup from './SingleLineFormGroup';
import OntologiesDecorator from '../../../../decorators/OntologiesDecorator';
import StringDecorator from '../../../../decorators/StringDecorator';

import { tooltips } from '../../../../constants/translations';
import { SelectOptions } from '../../../../contexts/SelectOptions';

const OntologyMultiSelectFormGroup = (
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

  let selectableOptions = OntologiesDecorator.selectableMultiOptions({ options: options, ontologies: ontologies, roleName: roleName, workup: workup })

  let selectedOptions = OntologiesDecorator.findAllByOntologyIds({ ontologyIds: value, ontologies: selectableOptions })

  const inactiveSelection = (selected) => selected.find(item => !item.active)
  const unavailableSelection = (selected) => selected.find(item => item.unavailable)
  const unmetDependencies = (selected) => selected.find(item => item.unmetDependency)

  tooltip = tooltip || ""

  if (unmetDependencies(selectedOptions)) {
    tooltip += tooltips['selection_unmet_dependency']
  }

  if (inactiveSelection(selectedOptions)) {
    tooltip += tooltips['selection_inactive']
  }
  if (unavailableSelection(selectedOptions)) {
    tooltip += tooltips['selection_unavailable']
  }

  label ||= StringDecorator.toLabelSpelling(roleName) // || value

  return (<>
    <SingleLineFormGroup
      label={label}
      tooltip={tooltip}
    >
      <Select
        className="react-select--overwrite"
        classNamePrefix="react-select"
        name={roleName}
        options={selectableOptions}
        value={selectedOptions}
        onChange={onChange}
        isClearable={false}
        placeholder={placeholder}
        isDisabled={disabled}
        isMulti
      />
    </SingleLineFormGroup>
  </>
  );
};

export default OntologyMultiSelectFormGroup;
