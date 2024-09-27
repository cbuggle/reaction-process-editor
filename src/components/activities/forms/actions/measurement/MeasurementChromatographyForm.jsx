import React, { useContext, useEffect } from 'react'
import { Label, FormGroup } from 'reactstrap';
import Select from 'react-select'

import MeasurementChromatographyStepForm from "./MeasurementChromatographyStepForm";

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import CreateButton from "../../../../utilities/CreateButton";
import FormSection from '../../../../utilities/FormSection'
import MetricsInput from '../../../../utilities/MetricsInput';
import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup';
import WavelengthListForm from '../../../../utilities/WavelengthListForm';

import OptionsDecorator from '../../../../../decorators/OptionsDecorator';

import { SelectOptions } from '../../../../../contexts/SelectOptions';

import withActivitySteps from '../../../../utilities/WithActivitySteps';

const MeasurementChromatographyForm = (
  {
    workup,
    onWorkupChange,
    activitySteps,
    showNewStepForm,
    addStep,
    onSaveStep,
    onCancelStep,
    onDeleteStep
  }) => {

  const selectOptions = useContext(SelectOptions).purify.CHROMATOGRAPHY

  const currentDevice = OptionsDecorator.optionForKey(workup.device, selectOptions.devices)
  const currentMethod = OptionsDecorator.optionForKey(workup.method, currentDevice?.methods)
  const currentDetectors = OptionsDecorator.optionsForKeys(workup.detectors, currentMethod?.detectors)
  const currentStationaryPhase = OptionsDecorator.optionForKey(workup.stationary_phase, currentMethod?.stationary_phases)
  const isAutomated = workup.automation === "AUTOMATED"

  useEffect(() => {
    workup.chromatography_type || onWorkupChange({ name: 'chromatography_type', value: selectOptions.chromatography_types[0].value })
    workup.device || handleDeviceChange(selectOptions.devices[0])
    workup.jar_material || onWorkupChange({ name: 'jar_material', value: selectOptions.jar_materials[0].value })

    // eslint-disable-next-line
  }, [])

  const hasDetectorMeasurementType = (measurementType) => {
    return !!currentDetectors?.find((detector) => detector.measurement_defaults[measurementType])
  }

  const hasStationaryPhaseMeasurementType = (measurementType) => {
    return !!currentStationaryPhase?.measurement_defaults?.[measurementType]
  }

  const handleWorkupChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })

  const handleNoDetectorSetting = (detectors) => {
    // 'NO_DETECTOR' is a special case (setting on some chromatography devices) and needs to be the sole selection.
    // It is opposed to and not be mixed up with having none selected at all. cbuggle, 11.6.2024.
    if (detectors.length > 1 && detectors.find(el => el === 'NO_DETECTOR')) {
      onWorkupChange({ name: 'detectors', value: ['NO_DETECTOR'] })
    } else {
      onWorkupChange({ name: 'detectors', value: detectors })
    }
  }

  const setDetectorsMeasurementDefaults = (detectors) => {
    detectors?.forEach((detector) => {
      let measurementTypes = Object.keys(detector.measurement_defaults)

      measurementTypes.forEach((measurementType) => {
        !workup[measurementType] &&
          onWorkupChange({ name: measurementType, value: detector.measurement_defaults[measurementType] })
      })
    }
    )
  }

  const handleDeviceChange = (selected) => {
    onWorkupChange({ name: 'device', value: selected.value })
    handleMethodChange(selected.methods?.[0])
  }

  const handleMethodChange = (selected) => {
    onWorkupChange({ name: 'method', value: selected.value })
    onWorkupChange({ name: 'volume', value: selected.default_volume })
    handleDetectorsChange(selected.detectors)
    onWorkupChange({ name: 'mobile_phases', value: selected.mobile_phases })
    handleStationaryPhaseChange(selected.stationary_phases?.[0])
  }

  const handleDetectorsChange = (selected) => {
    let detectors = selected?.map(option => option.value)
    handleNoDetectorSetting(detectors)
    setDetectorsMeasurementDefaults(selected)
  }

  const handleStationaryPhaseChange = (phase) => {
    onWorkupChange({ name: 'stationary_phase', value: phase.value })

    !workup['STATIONARY_PHASE_TEMPERATURE'] &&
      onWorkupChange({ name: 'STATIONARY_PHASE_TEMPERATURE', value: phase.measurement_defaults?.['TEMPERATURE'] })
  }

  const handleTemperatureChange = (value) => {
    onWorkupChange({ name: 'TEMPERATURE', value: value })
  }

  const handleStationaryPhaseTemperatureChange = (value) => {
    onWorkupChange({ name: 'STATIONARY_PHASE_TEMPERATURE', value: value })
  }

  const handleVoltageChange = (value) => {
    onWorkupChange({ name: 'VOLTAGE', value: value })
  }

  const renderMeasurementForms = () => {
    return <>
      {hasDetectorMeasurementType("TEMPERATURE") &&
        <>
          <FormGroup>
            <MetricsInput
              label={'Detector Temp'}
              metricName={"TEMPERATURE"}
              amount={workup.TEMPERATURE}
              onChange={handleTemperatureChange}
              disabled={isAutomated}
            />
          </FormGroup>
        </>
      }
      {hasDetectorMeasurementType("VOLTAGE") &&
        <MetricsInput
          label={'Detector Voltage'}
          metricName={"VOLTAGE"}
          amount={workup.VOLTAGE}
          onChange={handleVoltageChange}
          disabled={isAutomated}
        />}
      {hasDetectorMeasurementType("WAVELENGTHS") &&
        <WavelengthListForm
          wavelengths={workup.WAVELENGTHS}
          onChange={handleWorkupChange('WAVELENGTHS')}
          disabled={isAutomated}
        />}
    </>
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
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="chromatography_type"
                  options={selectOptions.chromatography_types}
                  value={OptionsDecorator.optionForKey(workup.chromatography_type, selectOptions.chromatography_types)}
                  onChange={selected => onWorkupChange({ name: 'chromatography_type', value: selected.value })}
                />
              </SingleLineFormGroup>
              <SingleLineFormGroup label='Device'>
                <Select
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="device"
                  options={selectOptions.devices}
                  value={OptionsDecorator.optionForKey(workup.device, selectOptions.devices)}
                  onChange={handleDeviceChange}
                />
              </SingleLineFormGroup>
              {isAutomated ?
                <>
                  <SingleLineFormGroup label='Method'>
                    <Select
                      key={"chromatography-device-" + workup.device}
                      className="react-select--overwrite"
                      classNamePrefix="react-select"
                      name="method"
                      options={currentDevice?.methods}
                      value={currentMethod}
                      onChange={handleMethodChange}
                    />
                  </SingleLineFormGroup>
                  <FormGroup>
                    {currentMethod?.description}
                  </FormGroup>
                </> :
                <>
                  <SingleLineFormGroup />
                  <SingleLineFormGroup />
                  <SingleLineFormGroup />
                  <SingleLineFormGroup />
                </>
              }

              <SingleLineFormGroup label='Detectors'>
                <Select
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="detectors"
                  options={currentMethod?.detectors}
                  value={currentDetectors}
                  isMulti
                  isClearable={false}
                  onChange={handleDetectorsChange}
                />
              </SingleLineFormGroup>
              <SingleLineFormGroup label='Stationary Phase'>
                <Select
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="stationary_phase"
                  options={currentMethod?.stationary_phases}
                  value={currentStationaryPhase}
                  onChange={handleStationaryPhaseChange}
                />
              </SingleLineFormGroup>
              {hasStationaryPhaseMeasurementType("TEMPERATURE") &&
                <MetricsInput
                  label={'Stat. Phase Temp'}
                  metricName={"TEMPERATURE"}
                  amount={workup.STATIONARY_PHASE_TEMPERATURE}
                  onChange={handleStationaryPhaseTemperatureChange}
                />}
              <SingleLineFormGroup label='Mobile Phases'>
                <Select
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="mobile_phases"
                  options={currentMethod?.mobile_phases}
                  value={workup.mobile_phases}
                  onChange={selected => onWorkupChange({ name: 'mobile_phases', value: selected })}
                  isMulti
                  isDisabled={isAutomated}
                />
              </SingleLineFormGroup>
              <SingleLineFormGroup label={'Inj. Volume'}>
                <MetricsInput
                  displayMultiLine
                  metricName={"VOLUME"}
                  amount={workup.volume}
                  onChange={handleWorkupChange('volume')}
                  disabled={isAutomated}
                />
              </SingleLineFormGroup>
            </FormSection>
            {renderMeasurementForms()}
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
        <Label> Automation </Label>
        <ButtonGroupToggle value={workup.automation} options={selectOptions.measurement_automation_modes}
          onChange={handleWorkupChange('automation')} />
      </FormSection>
      {renderAutomationSpecificFields()}
      {activitySteps.map((step, idx) =>
        <MeasurementChromatographyStepForm
          key={'chromatography-step-' + idx + '-' + activitySteps.length}
          label={'Chromatography Step ' + (idx + 1)}
          workup={step}
          onSave={onSaveStep(idx)}
          onCancel={onCancelStep(idx)}
          onDelete={onDeleteStep(idx)}
          canDelete={activitySteps.length > 1}
        />
      )}
      {showNewStepForm &&
        <MeasurementChromatographyStepForm
          label={'Chromatography Step ' + (activitySteps.length + 1)}
          workup={activitySteps.at(-1) || {}}
          initialShowForm={true}
          onSave={onSaveStep(activitySteps.length)}
          onCancel={onCancelStep(activitySteps.length)}
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

export default withActivitySteps(MeasurementChromatographyForm, 'purify_steps')

