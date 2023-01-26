import React, { useMemo } from 'react'
import Select from 'react-select'

import { Row, Col, ListGroupItem, Input, FormGroup, Label } from 'reactstrap'

import { purifyAutomationModeOptions } from '../../../constants/dropdownOptions/purifyOptions'

import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import ActionFormGroup from "./ActionFormGroup";


const PurifyForm = ({ action, onWorkupChange, processStep }) => {

  const purifySolventOptions = useMemo(() => { return processStep.materials_options['SOLVENT'] }, [])

  const actionPurifySolventIds = useMemo(() => { return action.workup['purify_solvent_sample_ids'] || [] })

  const filtrationModeKeepRetentate = useMemo(() => { return action.workup['filtration_mode'] == 'KEEP_RETENTATE' })

  const toggleFiltrationMode = () => {
    const inverseFiltrationMode = filtrationModeKeepRetentate ? 'KEEP_PERMEATE' : 'KEEP_RETENTATE'

    onWorkupChange({ name: 'filtration_mode', value: inverseFiltrationMode })
  }

  const renderFilterMethodButtonToggle = () => {
    if (action.workup['purify_type'] == 'FILTRATION') {
      return (
        <>
          <BootstrapSwitchButton
            width='200'
            checked={filtrationModeKeepRetentate}
            onlabel='Keep Retentate'
            onstyle='outline-secondary'
            offlabel='Keep Permeate'
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
          name="purify_automation"
          options={purifyAutomationModeOptions}
          value={purifyAutomationModeOptions.find(option => option.value === action.workup['purify_automation'])}
          onChange={selectedOption => onWorkupChange({ name: 'purify_automation', value: selectedOption.value })}
        />
      </FormGroup>
      <ActionFormGroup label='Solvents'>
        <Select
          isMulti
          name="purify_solvent_sample_ids"
          options={purifySolventOptions}
          value={purifySolventOptions.filter(option => actionPurifySolventIds.includes(option.value))}
          onChange={selectedOptions => onWorkupChange({ name: 'purify_solvent_sample_ids', value: selectedOptions.map(option => option.value) })}
        />
      </ActionFormGroup>
      <ActionFormGroup label='Ratio'>
        <Input
          type="textarea"
          value={action.workup['purify_ratio']}
          placeholder="Ratio"
          onChange={event => onWorkupChange({ name: 'purify_ratio', value: event.target.value })}
        />
      </ActionFormGroup>
    </>
  )
}

export default PurifyForm
