import React, { useState, useEffect } from 'react'

import Select from 'react-select'
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap'

import { samplevolumeUnitOptions } from '../../../constants/dropdownOptions/samplesOptions'
import { saveSampleTypeOptions } from '../../../constants/dropdownOptions/transferOptions';

import TemperatureInput from '../../utilities/TemperatureInput';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


const SaveSampleForm = ({ action, onWorkupChange }) => {

  const [sampleForm, setSampleForm] = useState({})

  useEffect(() => {
    setSampleForm(action.workup['sample'])
  }, [action.workup['sample']])

  const onInputChange = (field) => {
    const { name, value } = field;
    onWorkupChange(({ name: 'sample', value: { ...action.workup['sample'], [name]: value } }
    ));
  }

  return (
    <Form>
      <FormGroup>
        <Label>Name (optional / autofill)</Label>
        <Input
          value={sampleForm.name}
          placeholder="Name"
          onChange={event => onInputChange({ name: 'name', value: event.target.value })}
        />
        <Label>Short Label (optional / autofill)</Label>
        <Input
          value={sampleForm.short_label}
          placeholder="Short Label"
          onChange={event => onInputChange({ name: 'short_label', value: event.target.value })}
        />
        <Label>Description</Label>
        <Input
          type="textarea"
          value={sampleForm.description}
          placeholder="Description"
          onChange={event => onInputChange({ name: 'description', value: event.target.value })}
        />
        <Row>
          <Col md={4}>
            <Label>Volume/Amount</Label>
            <Input
              value={sampleForm['target_amount_value']}
              placeholder="Amount"
              onChange={event => onInputChange({ name: 'target_amount_value', value: event.target.value })}
            />
          </Col>
          <Col md={4}>
            <Label>Unit</Label>
            <Select
              name="target_amount_unit"
              options={samplevolumeUnitOptions}
              value={samplevolumeUnitOptions.find(item => item.value === sampleForm['target_amount_unit'])}
              onChange={selectedOption => onInputChange({ name: 'target_amount_unit', value: selectedOption.value })}
            />
          </Col>
          <Col md={2}>
            <Label> Purity </Label>
            <br />
            <TemperatureInput
              name='purity'
              precision={2}
              step={0.01}
              value={sampleForm['purity']}
              min={0}
              max={1}
              onWorkupChange={onInputChange} />
          </Col>
        </Row>

        <Label>Location</Label>
        <Input
          type="textarea"
          value={sampleForm.location}
          placeholder="Location"
          onChange={event => onInputChange({ name: 'location', value: event.target.value })}
        />

      </FormGroup>
      <FormGroup input>
        <Row>
          <Col md="8">
            <Label input>
              Sample Type
            </Label>
            <Select
              name="intermediate_type"
              options={saveSampleTypeOptions}
              value={saveSampleTypeOptions.find(option => option.value === sampleForm['intermediate_type'])}
              onChange={selectedOption => onInputChange({ name: 'intermediate_type', value: selectedOption.value })}
            />
          </Col>
          <Col md={4}>
            <Label>
              Display in ELN
            </Label>
            <BootstrapSwitchButton
              width='200'
              checked={action.workup['hide_in_eln']}
              onlabel='Hide in ELN'
              onstyle='outline-danger'
              offlabel='Show in ELN'
              offstyle='outline-success'
              onChange={(checked) => {
                onWorkupChange({name: 'hide_in_eln', value: checked})
              }}
            />
          </Col>
        </Row>
      </FormGroup>
    </Form >
  )
}

export default SaveSampleForm
