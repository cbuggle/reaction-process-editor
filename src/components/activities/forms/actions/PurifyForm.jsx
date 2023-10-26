import React from 'react'
import { Input, FormGroup } from 'reactstrap'
import Select from 'react-select'

import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";

import { SelectOptions } from '../../../../contexts/SelectOptions';
import { useContext } from 'react';

const PurifyForm = (
  {
    activity,
    onWorkupChange
  }) => {

  const selectOptions = useContext(SelectOptions)
  const purifySolventOptions = selectOptions.materials['SOLVENT']

  const actionPurifySolventIds = activity.workup['purify_solvent_sample_ids'] || []
  const filtrationModeKeepRetentate = activity.workup['filtration_mode'] === 'KEEP_RETENTATE'

  const toggleFiltrationMode = () => {
    const inverseFiltrationMode = filtrationModeKeepRetentate ? 'KEEP_PERMEATE' : 'KEEP_RETENTATE'
    onWorkupChange({ name: 'filtration_mode', value: inverseFiltrationMode })
  }

  const renderFilterMethodButtonToggle = () => {
    if (activity.workup['purify_type'] === 'FILTRATION') {
      return (
        <>
          <BootstrapSwitchButton
            width='200'
            checked={filtrationModeKeepRetentate}
            onlabel='Keep Retentate'
            offlabel='Keep Permeate'
            onstyle='outline-secondary'
            offstyle='outline-info'
            onChange={() => {
              toggleFiltrationMode()
            }}
          />
        </>
      )
    }
  }

  return (
    <>
      <FormGroup>
        {renderFilterMethodButtonToggle()}
      </FormGroup>
      <FormGroup>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="automation_mode"
          options={selectOptions.automation_modes}
          value={selectOptions.automation_modes.find(option => option.value === activity.workup['purify_automation'])}
          onChange={selectedOption => onWorkupChange({ name: 'purify_automation', value: selectedOption.value })}
        />
      </FormGroup>
      <SingleLineFormGroup label='Solvents'>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          isMulti
          name="purify_solvent_sample_ids"
          options={purifySolventOptions}
          value={purifySolventOptions.filter(option => actionPurifySolventIds.includes(option.value))}
          onChange={selectedOptions => onWorkupChange({ name: 'purify_solvent_sample_ids', value: selectedOptions.map(option => option.value) })}
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label='Ratio'>
        <Input
          type="textarea"
          value={activity.workup['purify_ratio']}
          placeholder="Ratio"
          onChange={event => onWorkupChange({ name: 'purify_ratio', value: event.target.value })}
        />
      </SingleLineFormGroup>
    </>
  )
}

export default PurifyForm
