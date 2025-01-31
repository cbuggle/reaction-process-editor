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
    restrictedOptions
  }) => {

  let ontologies = useContext(SelectOptions).ontologies

  restrictedOptions = restrictedOptions?.length > 1 ? restrictedOptions : ontologies

  let value = workup[roleName]

  let dependencyOptions = OntologiesDecorator.activeOptionsMeetingDependencies({ options: restrictedOptions, roleName: roleName, workup: workup })
  let selectableOptions = OntologiesDecorator.selectableMultiOptions({ ontologies: restrictedOptions, roleName: roleName, workup: workup })

  let selectedOptions = OntologiesDecorator.findAllByOntologyIds({ ontologyIds: value, ontologies: ontologies })

  const inactiveSelection = (selected) => selected.find(item => item.inactive)
  const unavailableSelection = (selected) => selected.find(item => item.unavailable)

  tooltip = tooltip || ""

  // Temporarily commented; Actual Lab data has some detector settings that would always trigger dependency warning,
  // to my understanding as they represent two different labs. cbuggle, 29.01.2025.
  //
  const violatesDependencies = (selected, dependencies) => {
    let depValues = dependencies.map(dep => dep.value)
    return selected.find(item => !depValues.includes(item.value))
  }

  if (violatesDependencies(selectedOptions, dependencyOptions)) {
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
        isMulti={true}
      />
    </SingleLineFormGroup>
  </>
  );
};

export default OntologyMultiSelectFormGroup;
