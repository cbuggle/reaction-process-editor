import React, { useContext, useEffect, useState } from 'react'
import { Label, FormGroup } from 'reactstrap';
import Select from 'react-select'

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import CreateButton from "../../../../utilities/CreateButton";
import ChromatographyStepForm from "./ChromatographyStepForm";
import FormSection from '../../../../utilities/FormSection'
import MetricsInput from '../../../../utilities/MetricsInput';
import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup';

import { SelectOptions } from '../../../../../contexts/SelectOptions';
import ActivityFormStepDecorator from '../../../../../decorators/ActivityFormStepDecorator';

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

  const selectOptions = useContext(SelectOptions).purify.chromatography

  useEffect(() => {
    workup.jar_material ||
      onWorkupChange({ name: 'jar_material', value: selectOptions.jar_materials[0].value })
    workup.device ||
      onWorkupChange({ name: 'device', value: selectOptions.devices[0].value })
  }, [])

  const handleWorkupChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })

  const renderAutomationToggle = () => {
    return (
      <>
        <Label>
          Automation
        </Label>
        <ButtonGroupToggle
          value={workup.automation}
          options={selectOptions.automation_modes}
          onChange={selectedValue => onWorkupChange({ name: 'automation', value: selectedValue })}
        />
      </>
    )
  }

  const renderAutomationSpecificFields = () => {
    switch (workup.automation) {
      case 'AUTOMATED':
        return (<></>)
      case 'SEMI_AUTOMATED':
        return (<FormSection>
          <SingleLineFormGroup label='Device'>
            <Select
              className="react-select--overwrite"
              classNamePrefix="react-select"
              name="sample_id"
              options={selectOptions.devices}
              value={selectOptions.devices.find(option => option.value === workup.device)}
              onChange={selected => onWorkupChange({ name: 'device', value: selected.value })}
            />
          </SingleLineFormGroup>
          <SingleLineFormGroup label='Type Of Column'>
            <Select
              className="react-select--overwrite"
              classNamePrefix="react-select"
              name="sample_id"
              options={selectOptions.column_types}
              value={selectOptions.column_types.find(option => option.value === workup.column_type)}
              onChange={selected => onWorkupChange({ name: 'column_type', value: selected.value })}
            />
          </SingleLineFormGroup>
          <MetricsInput
            metricName={'VELOCITY'}
            amount={workup['flow_rate']}
            onChange={handleWorkupChange('flow_rate')}
          />
          <SingleLineFormGroup label='Detectors'>
            <Select
              className="react-select--overwrite"
              classNamePrefix="react-select"
              name="detector"
              options={selectOptions.detectors}
              value={selectOptions.detectors.filter(option => workup.detectors?.includes(option.value))}
              isMulti
              isClearable={false}
              onChange={selected => onWorkupChange({ name: 'detectors', value: selected.map(option => option.value) })}
            />
          </SingleLineFormGroup>
          <MetricsInput
            metricName={'WAVENUMBER'}
            amount={workup.wavelength}
            onChange={handleWorkupChange('wavelength')}
          />
        </FormSection>)
      case 'MANUAL':
        return (
          <FormSection>
            <SingleLineFormGroup label='Material'>
              <Select
                className="react-select--overwrite"
                classNamePrefix="react-select"
                name="sample_id"
                options={selectOptions.jar_materials}
                value={selectOptions.jar_materials.find(option => option.value === workup.jar_material)}
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
          key={'step-' + step.solvents.map(element => element.id).join() + '-' + idx}
          canDelete={activitySteps.length > 1}
        />
      )}
      {showNewStepForm &&
        <ChromatographyStepForm
          index={activitySteps?.length || 0}
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

export default ActivityFormStepDecorator(ChromatographyForm, 'chromatography_steps')

