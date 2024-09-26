import React, { useContext, useEffect } from 'react'
import { Label, FormGroup } from 'reactstrap';
import Select from 'react-select'

import ChromatographyStepForm from "./ChromatographyStepForm";

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import CreateButton from "../../../../utilities/CreateButton";
import FormSection from '../../../../utilities/FormSection'
import MetricsInput from '../../../../utilities/MetricsInput';
import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup';
import WavelengthListForm from '../../../../utilities/WavelengthListForm';

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
    onSaveStep,
    onCancelStep,
    onDeleteStep
  }) => {

  const selectOptions = useContext(SelectOptions).purify.CHROMATOGRAPHY

  const currentDevice = OptionsDecorator.optionForKey(workup.device, selectOptions.devices)
  const currentMethod = OptionsDecorator.optionForKey(workup.method, currentDevice?.methods)
  const currentDetectors = OptionsDecorator.optionsForKeys(workup.detectors, currentMethod?.detectors)
  const currentStationaryPhase = OptionsDecorator.optionForKey(workup.stationary_phase, currentMethod?.stationary_phases)

  useEffect(() => {
    console.log(selectOptions.devices)
    workup.jar_material || onWorkupChange({ name: 'jar_material', value: selectOptions.jar_materials[0].value })
    workup.chromatography_type || onWorkupChange({ name: 'chromatography_type', value: selectOptions.chromatography_types[0].value })

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    workup.device || onWorkupChange({ name: 'device', value: selectOptions.devices[0]?.value })
    workup.method || onWorkupChange({ name: 'method', value: currentDevice?.methods?.[0] })
    workup.volume || onWorkupChange({ name: 'volume', value: currentMethod?.default_volume })
    // eslint-disable-next-line
  }, [workup, workup.chromatography_type])


  const hasDetectorMeasurementType = (measurementType) => {
    console.log("currentDetectors")
    console.log(currentDetectors)
    return !!currentDetectors?.find((detector) => detector.measurement_defaults[measurementType])
  }

  const hasStationaryPhaseMeasurementType = (measurementType) => {
    console.log("currentStationaryPhase")
    console.log(currentStationaryPhase)
    return !!currentStationaryPhase?.measurement_defaults?.[measurementType]
  }

  const handleWorkupChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })

  const handleNoDetectorSetting = (detectors) => {
    if (detectors.length > 1 && detectors.find(el => el === 'NO_DETECTOR')) {
      // 'NO_DETECTOR' is a special case (setting on some chromatography devices) and needs to be the sole selection.
      // It is opposed to and not be mixed up with having none selected at all. cbuggle, 11.6.2024.
      onWorkupChange({ name: 'detectors', value: ['NO_DETECTOR'] })
    } else {
      onWorkupChange({ name: 'detectors', value: detectors })
    }
  }

  const setDetectorMeasurementDefaults = (detectors) => {
    console.log("detectors")
    console.log(detectors)

    detectors?.forEach((detector) => {

      let measurementTypes = Object.keys(detector.measurement_defaults)

      measurementTypes.forEach((measurementType) => {
        !workup[measurementType] &&
          onWorkupChange({ name: measurementType, value: detector.measurement_defaults[measurementType] })
      })
    }
    )
  }

  const handleDetectorsChange = (selected) => {
    let detectors = selected.map(option => option.value)
    handleNoDetectorSetting(detectors)
    setDetectorMeasurementDefaults(selected)
  }

  const handleDeviceChange = (selected) => {
    onWorkupChange({ name: 'method', value: undefined })
    onWorkupChange({ name: 'device', value: selected.value })

  }

  const handleMethodChange = (selected) => {
    onWorkupChange({ name: 'volume', value: selected.default_volume })
    onWorkupChange({ name: 'method', value: selected.value })
  }

  const handleStationaryPhaseChange = (phase) => {
    onWorkupChange({ name: 'stationary_phase', value: phase.value })
    console.log("handleStationaryPhaseChange")
    console.log(phase)
    console.log(workup)

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

            {/* <MetricFormGroup
            metricName={"TEMPERATURE"}
            label={'Detector Temperature'}
            preconditions={workup.TEMPERATURE}
            workup={workup}
            onWorkupChange={onWorkupChange}
            typeColor='action'

          /> */}
            <MetricsInput
              label={'Detector Temp'}
              metricName={"TEMPERATURE"}
              amount={workup.TEMPERATURE}
              onChange={handleTemperatureChange}
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
        />}
      {hasDetectorMeasurementType("WAVELENGTHS") &&
        <WavelengthListForm
          wavelengths={workup.WAVELENGTHS}
          onChange={handleWorkupChange('WAVELENGTHS')}
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
              {workup.automation === "AUTOMATED" &&
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
              <SingleLineFormGroup label='Mobile Phases'>
                <Select
                  isMulti
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="mobile_phases"
                  options={currentMethod?.mobile_phases}
                  value={workup.mobile_phases}
                  onChange={selected => onWorkupChange({ name: 'mobile_phases', value: selected })}
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
              <SingleLineFormGroup label={'Inj. Volume'}>
                <MetricsInput
                  displayMultiLine
                  metricName={"VOLUME"}
                  amount={workup.volume}
                  onChange={handleWorkupChange('volume')}
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
        <ButtonGroupToggle value={workup.automation} options={selectOptions.automation_modes}
          onChange={handleWorkupChange('automation')} />
      </FormSection>
      {renderAutomationSpecificFields()}
      {activitySteps.map((step, idx) =>
        <ChromatographyStepForm
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
        <ChromatographyStepForm
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

export default withActivitySteps(ChromatographyForm, 'purify_steps')

