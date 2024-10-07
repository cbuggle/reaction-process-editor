import React, { useContext, useEffect } from 'react'
import { Button, Col, Row, Label, FormGroup } from 'reactstrap';
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChromatographyStepForm from "./ChromatographyStepForm";

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import CreateButton from "../../../../utilities/CreateButton";
import FormSection from '../../../../utilities/FormSection'
import MetricsInput from '../../../../utilities/MetricsInput';
import MetricsListForm from '../../../../utilities/MetricsListForm';
import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup';
import WavelengthListForm from '../../../../utilities/WavelengthListForm';

import OptionalFormSet from '../../../../utilities/OptionalFormSet';
import OptionsDecorator from '../../../../../decorators/OptionsDecorator';
import MetricsDecorator from '../../../../../decorators/MetricsDecorator';

import { SelectOptions } from '../../../../../contexts/SelectOptions';

import withActivitySteps from '../../../../utilities/WithActivitySteps';
import MetricFormGroup from '../../conditions/MetricFormGroup';

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

  const selectOptions = useContext(SelectOptions).FORMS.PURIFICATION.CHROMATOGRAPHY

  const currentType = OptionsDecorator.inclusiveOptionForValue(workup.chromatography_type, selectOptions.chromatography_types)
  const currentSubtype = OptionsDecorator.inclusiveOptionForValue(workup.chromatography_subtype, currentType?.subtypes)
  const currentDevice = OptionsDecorator.inclusiveOptionForValue(workup.device, currentSubtype?.devices)
  const currentDetectors = OptionsDecorator.inclusiveOptionsForValues(workup.detectors, currentDevice?.detectors)

  const currentMethod = OptionsDecorator.inclusiveOptionForValue(workup.method, currentDevice?.methods)
  const currentStationaryPhase = OptionsDecorator.inclusiveOptionForValue(workup.stationary_phase, currentMethod?.stationary_phases)
  const isAutomated = workup.automation === "AUTOMATED"

  const hasDetectorAnalysisType = (analysisType) => {
    let selectedDetectorValues = currentDetectors?.map((item) => item.value) || []
    return !!currentMethod?.detectors?.find((detector) =>
      selectedDetectorValues.includes(detector.value) && detector.analysis_defaults?.[analysisType]
    )
  }

  const methodOptionsForDetectors = (detectors) => {
    return detectors && !!currentDevice?.methods ?
      currentDevice.methods.filter((method) => {
        let method_detector_values = method.detectors?.map((detector) => detector.value) || []
        return detectors.length < 1
          || detectors.every((detector) => method_detector_values.includes(detector.value)
          )
      })
      : []
  }

  const hasStationaryPhaseAnalysisType = (analysisType) => {
    return !!currentStationaryPhase?.analysis_defaults?.[analysisType]
  }

  const handleWorkupChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })

  const handleNoDetectorSetting = (detector_values) => {
    // 'NO_DETECTOR' is a special case (setting on some chromatography devices) and needs to be the sole selection.
    // It is opposed to and not be mixed up with having none selected at all. cbuggle, 11.6.2024.
    if (detector_values.length > 1 && detector_values.find(el => el === 'NO_DETECTOR')) {
      onWorkupChange({ name: 'detectors', value: ['NO_DETECTOR'] })
    } else {
      onWorkupChange({ name: 'detectors', value: detector_values })
    }
  }

  const setMethodAnalysisDefaults = (detectors) => {
    detectors?.forEach((detector) => {
      let analysisTypes = Object.keys(detector.analysis_defaults)

      analysisTypes.forEach((analysisType) => {
        if (workup.detectors?.includes(detector.value)) {
          onWorkupChange({ name: analysisType, value: detector.analysis_defaults[analysisType] })
        } else {
          onWorkupChange({ name: analysisType, value: undefined })
        }
      })
    }
    )
  }

  const handleDeviceChange = (selected) => {
    onWorkupChange({ name: 'device', value: selected.value })
  }

  const handleMethodChange = (selected) => {
    onWorkupChange({ name: 'method', value: selected.value })
    onWorkupChange({ name: 'volume', value: selected.default_volume })
    onWorkupChange({ name: 'mobile_phases', value: selected.mobile_phases })
    setMethodAnalysisDefaults(selected.detectors)
  }

  const handleDetectorsChange = (selected) => {
    let selected_detector_values = selected?.map(option => option.value)
    let detectors = currentMethod?.detectors?.filter((detector) => selected_detector_values.includes(detector.value))

    handleNoDetectorSetting(selected_detector_values)
    setMethodAnalysisDefaults(detectors)
  }

  const handleStationaryPhaseChange = (phase) => {
    onWorkupChange({ name: 'stationary_phase', value: phase.value })

    !workup['STATIONARY_PHASE_TEMPERATURE'] &&
      onWorkupChange({ name: 'STATIONARY_PHASE_TEMPERATURE', value: phase.analysis_defaults?.['TEMPERATURE'] })
  }

  const handleTemperatureChange = (value) => {
    onWorkupChange({ name: 'TEMPERATURE', value: value })
  }

  const handleStationaryPhaseTemperatureChange = (value) => {
    onWorkupChange({ name: 'STATIONARY_PHASE_TEMPERATURE', value: value })
  }

  const handleAnalysisChange = (key) => (event) => {
    console.log("handleAnalysisChange")
    console.log(key)
    console.log(event)
  }
  const resetAnalysis = (key) => (event) => {
    console.log("resetAnalysis")
    console.log(key)
    console.log(event)

  }

  const renderAnalysisForms = () => {
    return <>
      {hasDetectorAnalysisType("TEMPERATURE") &&
        <OptionalFormSet
          subFormLabel={"Detector Temperature"}
          valueSummary={MetricsDecorator.infoLineAmount(workup.TEMPERATURE)}
          onSave={handleAnalysisChange}
          onCancel={resetAnalysis}
          typeColor={"action"}
          disabled={isAutomated}
        >
          <OptionalFormSet.ExtraButton>
            <Button color="condition" onClick={resetAnalysis} outline>
              <FontAwesomeIcon icon="undo-alt" /> Reset
            </Button>
          </OptionalFormSet.ExtraButton>
          <Row className="gx-1 mb-3">
            <Col md={8}>
              <MetricsInput
                metricName={"TEMPERATURE"}
                amount={workup.TEMPERATURE}
                onChange={resetAnalysis}
                displayMultiLine={true}
              />
            </Col>
          </Row>
        </OptionalFormSet>}
      {hasDetectorAnalysisType("VOLTAGES") &&
        <MetricsListForm
          wavelengths={workup.VOLTAGES}
          onChange={handleWorkupChange('VOLTAGES')}
          disabled={isAutomated}
        />}
      {hasDetectorAnalysisType("WAVELENGTHS") &&
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
                  aria-errormessage="err ooh wrong"
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="chromatography_type"
                  options={OptionsDecorator.inclusiveOptionsForValues(currentType, selectOptions.chromatography_types)}
                  value={currentType}
                  onChange={selected => onWorkupChange({ name: 'chromatography_type', value: selected.value })}
                />
              </SingleLineFormGroup>
              <SingleLineFormGroup label='Sub-Type'>
                <Select
                  key={currentSubtype}
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="chromatography_subtype"
                  options={currentType?.subtypes}
                  value={currentSubtype}
                  onChange={selected => onWorkupChange({ name: 'chromatography_subtype', value: selected.value })}
                />
              </SingleLineFormGroup>
              <SingleLineFormGroup label='Device'>
                <Select
                  key={currentDevice}
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="device"
                  options={currentSubtype?.devices}
                  value={currentDevice}
                  onChange={handleDeviceChange}
                />
              </SingleLineFormGroup>
              <SingleLineFormGroup label='Detectors'>
                <Select
                  key={currentDevice}
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="detectors"
                  options={currentDevice?.detectors}
                  value={currentDetectors}
                  isMulti
                  isClearable={false}
                  onChange={handleDetectorsChange}
                />
              </SingleLineFormGroup>
              {hasStationaryPhaseAnalysisType("TEMPERATURE") &&
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
              {isAutomated &&
                <>
                  <SingleLineFormGroup label='Method'>
                    <Select
                      key={"chromatography-device-" + workup.device}
                      className="react-select--overwrite"
                      classNamePrefix="react-select"
                      name="method"
                      options={methodOptionsForDetectors(currentDetectors)}
                      value={currentMethod}
                      onChange={handleMethodChange}
                    />
                  </SingleLineFormGroup>
                  <FormGroup>
                    {currentMethod?.description}
                  </FormGroup>
                </>
              }
              <SingleLineFormGroup label='Stationary Phase'>
                <Select
                  key={currentStationaryPhase}
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="stationary_phase"
                  options={currentMethod?.stationary_phases}
                  value={currentStationaryPhase}
                  onChange={handleStationaryPhaseChange}
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
            {renderAnalysisForms()}
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
                value={OptionsDecorator.optionForValue(workup.jar_material, selectOptions.jar_materials)}
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
        <Label>Automation</Label>
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

export default withActivitySteps(ChromatographyForm, 'purification_steps')

