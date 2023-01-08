import React, { useMemo } from 'react'
import Select from 'react-select'

import { Row, Col, ListGroupItem, Input, FormGroup, Label } from 'reactstrap'

import { purifyModeOptions, purifyTypeOptions } from '../../../constants/dropdownOptions/purifyOptions'

import BootstrapSwitchButton from 'bootstrap-switch-button-react'


const PurifyForm = ({ action, onWorkupChange, processStep }) => {

  const purifySolventOptions = useMemo(() => { return processStep.materials_options['SOLVENT'] }, [])

  const actionPurifySolventIds = useMemo(() => { return action.workup['purify_solvent_sample_ids'] || [] })

  const filtrationModeKeepRetentate = useMemo(() => { return action.workup['filtration_mode'] == 'KEEP_RETENTATE' })

  const toggleFiltrationMode = () => {
    const inverseFiltrationMode = filtrationModeKeepRetentate ? 'KEEP_PERMEATE' : 'KEEP_RETENTATE'

    onWorkupChange({ name: 'filtration_mode', value: inverseFiltrationMode })
  }

  const renderFilterMethodButtontToggle = () => {
    if (action.workup['purify_type'] == 'FILTRATION') {
      return (
        <Col md={4}>
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
        </Col>
      )
    }
  }

  return (
    <>
      <ListGroupItem>
        <Row>
          <Col md={8}>
            <Select
              name="purify_type"
              options={purifyTypeOptions}
              value={purifyTypeOptions.find(option => option.value === action.workup['purify_type'])}
              onChange={selectedOption => onWorkupChange({ name: 'purify_type', value: selectedOption.value })}
            />
          </Col>
          {renderFilterMethodButtontToggle()}
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        <Select
          name="purify_automation"
          options={purifyModeOptions}
          value={purifyModeOptions.find(option => option.value === action.workup['purify_automation'])}
          onChange={selectedOption => onWorkupChange({ name: 'purify_automation', value: selectedOption.value })}
        />
      </ListGroupItem>
      <ListGroupItem>
        <Label>Solvents</Label>
        <Select
          isMulti
          name="purify_solvent_sample_ids"
          options={purifySolventOptions}
          value={purifySolventOptions.filter(option => actionPurifySolventIds.includes(option.value))}
          onChange={selectedOptions => onWorkupChange({ name: 'purify_solvent_sample_ids', value: selectedOptions.map(option => option.value) })}
        />
      </ListGroupItem>
      <ListGroupItem>
        <FormGroup>
          <Label>Ratio</Label>
          <Input
            type="textarea"
            value={action.workup['purify_ratio']}
            placeholder="Ratio"
            onChange={event => onWorkupChange({ name: 'purify_ratio', value: event.target.value })}
          />
        </FormGroup>
      </ListGroupItem>
    </>
  )
}

export default PurifyForm
