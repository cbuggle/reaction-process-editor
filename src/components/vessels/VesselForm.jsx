import React from 'react'
import Select from 'react-select';
import { Row, Col, FormGroup, Label, Input, ListGroupItem, ListGroup } from 'reactstrap';

import PropTypes from 'prop-types'

import VesselDecorator from './VesselDecorator';

const VesselForm = ({ vessel, vesselOptions, onInputChange }) => {

  return (
    <div className="vessel-form">
      <ListGroup>
        <ListGroupItem>
          <Row>
            <Col md={1}>
              <Label>
                {VesselDecorator.renderVesselTypeIcon(vessel)}
              </Label>
            </Col>
            <Col md={5}>
              <Label>Vessel Type</Label>
              <Select
                className="react-select--overwrite"
                classNamePrefix="react-select"
                name="vessel_type"
                options={vesselOptions.vessel_types}
                isSearchable={true}
                value={vesselOptions.vessel_types.find(item => item.value === vessel.vessel_type)}
                onChange={selectedOption => onInputChange({ name: 'vessel_type', value: selectedOption.value })}
              />
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label>Volume</Label>
                <Input
                  value={vessel.volume_amount}
                  placeholder="Amount"
                  onChange={event => onInputChange({ name: 'volume_amount', value: event.target.value })}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <Label>Unit</Label>
              <Select
                className="react-select--overwrite"
                classNamePrefix="react-select"
                name="volume_unit"
                options={vesselOptions.volume_units}
                value={vesselOptions.volume_units.find(item => item.value === vessel.volume_unit)}
                onChange={selectedOption => onInputChange({ name: 'volume_unit', value: selectedOption.value })}
              />
            </Col>
          </Row>
          <Row>
            {/* {vessel.vessel_preparation.map((preparation) =>
              <VesselPreparationForm preparation={preparation} onInputChange={updatePreparation} />
            )}

            <VesselPreparationForm preparation={newPreparation} onInputChange={createPreparation}/> */}
            {/* <Col md={5}>
              <Label>Vessel Preparation</Label>
              <Select
                className="react-select--overwrite"
                classNamePrefix="react-select"
                name="vessel_preparation"
                options={vesselOptions.vessel_preparations}
                isSearchable={true}
                value={vesselOptions.vessel_preparations.find(item => item.value === vessel.vessel_preparations)}
                onChange={selectedOption => onInputChange({ name: 'vessel_preparation', value: selectedOption.value })}
              />
            </Col> */}
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label>Vessel Details</Label>
                <Input
                  type="textarea"
                  value={vessel.details}
                  placeholder="Vessel Details"
                  onChange={event => onInputChange({ name: 'details', value: event.target.value })}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <Label>Material</Label>
              <Select
                className="react-select--overwrite"
                classNamePrefix="react-select"
                name="material_type"
                options={vesselOptions.material_types}
                value={vesselOptions.material_types.find(item => item.value === vessel.material_type)}
                onChange={selectedOption => onInputChange({ name: 'material_type', value: selectedOption.value })}
              />
            </Col>
            <Col md={7}>
              <FormGroup>
                <Label>Material Details</Label>
                <Input
                  type="textarea"
                  value={vessel.material_details}
                  placeholder="Material Details"
                  onChange={event => onInputChange({ name: 'material_details', value: event.target.value })}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={5}>
              <Label>Environment</Label>
              <Select
                className="react-select--overwrite"
                classNamePrefix="react-select"
                name="vessel_environment_type"
                options={vesselOptions.environment_types}
                value={vesselOptions.environment_types.find(item => item.value === vessel.environment_type)}
                onChange={selectedOption => onInputChange({ name: 'environment_type', value: selectedOption.value })}
              />
            </Col>
            <Col md={7}>
              <FormGroup>
                <Label>Details</Label>
                <Input
                  type="textarea"
                  value={vessel.environment_details}
                  placeholder="Environment Details"
                  onChange={event => onInputChange({ name: 'environment_details', value: event.target.value })}
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <Label>Automated</Label>
              <Select
                className="react-select--overwrite"
                classNamePrefix="react-select"
                name="vessel_automation_type"
                options={vesselOptions.automation_types}
                value={vesselOptions.automation_types.find(item => item.value === vessel.automation_type)}
                onChange={selectedOption => onInputChange({ name: 'automation_type', value: selectedOption.value })}
              />
            </Col>

            <Col md={7}>
              <FormGroup>
                <Label>Preparations</Label>
                <Input
                  type="textarea"
                  value={vessel.preparations}
                  placeholder="Preparations"
                  onChange={event => onInputChange({ name: 'preparations', value: event.target.value })}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>

                <Label>Attachments</Label>
                <Select
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  isMulti
                  name="vessel_attachments"
                  options={vesselOptions.attachments}
                  value={vesselOptions.attachments.filter(option => (vessel.attachments || []).includes(option.value))}
                  onChange={selectedOptions => onInputChange({ name: 'attachments', value: selectedOptions.map(option => option.value) })}
                />
              </FormGroup>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

VesselForm.propTypes = {
  vessel: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired
}

export default VesselForm
