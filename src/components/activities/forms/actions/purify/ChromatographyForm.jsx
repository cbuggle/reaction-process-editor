import React, { useContext, useEffect, useState } from 'react'
import { Label, FormGroup } from 'reactstrap';
import Select from 'react-select'

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import CreateButton from "../../../../utilities/CreateButton";
import ChromatographyStepForm from "./ChromatographyStepForm";
import FormSection from '../../../../utilities/FormSection'
import MetricsInput from '../../../../utilities/MetricsInput';
import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup';
import WavelengthListForm from './WavelengthListForm';

import OptionsDecorator from '../../../../../decorators/OptionsDecorator';

import { SelectOptions } from '../../../../../contexts/SelectOptions';

import withActivitySteps from '../../../../utilities/WithActivitySteps';

const ChromatographyForm = (
  {
    workup,
    onWorkupChange,
    activitySteps,
    showNewStepForm,
    addStep,
    handleSaveStep,
    handleCancelStep,
    handleDeleteStep
  }) => {

  const selectOptions = useContext(SelectOptions).purify.CHROMATOGRAPHY
  const [currentColumnType, setCurrentColumnType] = useState(workup.column_type)

  useEffect(() => {
    workup.jar_material ||
      onWorkupChange({ name: 'jar_material', value: selectOptions.jar_materials[0].value })
    workup.device ||
      onWorkupChange({ name: 'device', value: selectOptions.devices[0].value })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    let selectable_column_type = OptionsDecorator.optionForKey(workup.column_type, selectOptions.column_types[workup.device])

    if (workup.column_type && !selectable_column_type) {
      onWorkupChange({ name: 'column_type', value: undefined })
    }
    setCurrentColumnType(selectable_column_type)
    // eslint-disable-next-line
  }, [workup, workup.device])

  const handleWorkupChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })

  const handleDetectorsChange = (selected) => {
    let detectors = selected.map(option => option.value)

    if (detectors.length > 1 && detectors.find(el => el === 'NO_DETECTOR')) {
      // 'NO_DETECTOR' is a setting / special case on some devices and needs to be the sole selection.
      // It is opposed to and not be mixed up with having none selected at all. cbuggle, 11.6.2024.
      onWorkupChange({ name: 'detectors', value: ['NO_DETECTOR'] })
    } else {
      onWorkupChange({ name: 'detectors', value: detectors })
    }
  }


  const renderAutomationToggle = () => {
    return (
      <>
        <Label>
          Automation
        </Label>
        <ButtonGroupToggle
          value={workup.automation}
          options={selectOptions.automation_modes}
          onChange={handleWorkupChange('automation')}
        />
      </>
    )
  }

  const renderAutomationSpecificFields = () => {
    switch (workup.automation) {
      case 'AUTOMATED':
      case 'SEMI_AUTOMATED':
        return (
          <>
            <FormSection>
              <SingleLineFormGroup label='Type'>
                <Select
                  key={'device-' + currentColumnType}
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="device"
                  options={selectOptions.devices}
                  value={OptionsDecorator.optionForKey(workup.device, selectOptions.devices)}
                  onChange={selected => onWorkupChange({ name: 'device', value: selected.value })}
                />
              </SingleLineFormGroup>
              <SingleLineFormGroup label='Column'>
                <Select
                  key={currentColumnType}
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="column_type"
                  options={selectOptions.column_types[workup.device]}
                  value={currentColumnType}
                  onChange={selected => onWorkupChange({ name: 'column_type', value: selected.value })}
                />
              </SingleLineFormGroup>
              <SingleLineFormGroup label='Detectors'>
                <Select
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="detectors"
                  options={selectOptions.detectors}
                  value={OptionsDecorator.optionsForKeys(workup.detectors, selectOptions.detectors)}
                  isMulti
                  isClearable={false}
                  onChange={handleDetectorsChange}
                />
              </SingleLineFormGroup>
            </FormSection>
            <WavelengthListForm
              wavelengths={workup.wavelengths}
              onChange={handleWorkupChange('wavelengths')}
            />
          </>)
      case 'MANUAL':
        return (
          <FormSection>
            <SingleLineFormGroup label='Material'>
              <Select
                className="react-select--overwrite"
                classNamePrefix="react-select"
                name="sample_id"
                options={selectOptions.jar_materials}
                value={OptionsDecorator.optionForKey(workup.jar_material, selectOptions.jar_materials)}
                onChange={selected => onWorkupChange({ name: 'jar_material', value: selected.value })}
              />
            </SingleLineFormGroup>
            <FormGroup>
              <MetricsInput
                metricName={'LENGTH'}
                label={'Diameter'}
                amount={workup.jar_diameter}
                onChange={handleWorkupChange('jar_diameter')}
              />
              <MetricsInput
                metricName={'LENGTH'}
                label={'Height'}
                amount={workup.jar_height}
                onChange={handleWorkupChange('jar_height')}
              />
            </FormGroup>
            <FormGroup>
              <MetricsInput
                metricName={'LENGTH'}
                label={'Filling Height'}
                amount={workup.jar_filling_height}
                max={workup.jar_height?.value}
                onChange={handleWorkupChange('jar_filling_height')}
              />
            </FormGroup>
          </FormSection>)
      default:
        break;
    }
  }

  return (
    <>
      <FormSection type='action'>
        {renderAutomationToggle()}
      </FormSection>
      {renderAutomationSpecificFields()}
      {activitySteps.map((step, idx) =>
        <ChromatographyStepForm
          index={idx}
          workup={step}
          onSave={handleSaveStep}
          onCancel={handleCancelStep}
          onDelete={handleDeleteStep}
          key={'chromatography-step-' + step.solvents.map(element => element.id).join() + '-' + idx}
          canDelete={activitySteps.length > 1}
        />
      )}
      {showNewStepForm &&
        <ChromatographyStepForm
          index={activitySteps.length}
          workup={activitySteps?.at(-1)}
          initialShowForm={true}
          onSave={handleSaveStep}
          onCancel={handleCancelStep}
        />
      }
      <FormSection type='action'>
        <CreateButton
          label='Chromatography Step'
          type='action'
          onClick={addStep}
          size='sm'
        />
      </FormSection>
    </>
  )
}

export default withActivitySteps(ChromatographyForm, 'purify_steps')

