import React, { useContext } from 'react'
import { Label, FormGroup } from 'reactstrap';
import Select from 'react-select'
import ChromatographyStepForm from "./ChromatographyStepForm";

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import CreateButton from "../../../../utilities/CreateButton";
import FormSection from '../../../../utilities/FormSection'
import MetricsInput from '../../../../utilities/MetricsInput';

import SingleLineFormGroup from '../../../../utilities/SingleLineFormGroup';
import WavelengthListForm from '../../../../utilities/WavelengthListForm';
import TextInputFormSet from '../../formsets/TextInputFormSet';

import OptionsDecorator from '../../../../../decorators/OptionsDecorator';

import { SelectOptions } from '../../../../../contexts/SelectOptions';

import withActivitySteps from '../../../../utilities/WithActivitySteps';
import MetricSubFormSet from '../../formsets/MetricSubFormSet';

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
    let selectedDetectorsValues = currentDetectors?.map((item) => item.value) || []
    return !!currentMethod?.detectors?.find((detector) =>
      selectedDetectorsValues.includes(detector.value) && detector.analysis_defaults?.[analysisType]
    )
  }

  const filterMethodsByDetectors = (methods, detectors) => {
    return methods?.filter((method) =>
      detectors.every(detector => method.detectors?.find(methodDetector => methodDetector.value === detector.value)
      )) || []
  }

  const filterMethodsByDetectorsOptions = (detectors) => {
    return detectors?.length > 100 ? filterMethodsByDetectors(currentDevice?.methods, detectors) : currentDevice?.methods
  }

  const hasStationaryPhaseAnalysisType = (analysisType) => !!currentStationaryPhase?.analysis_defaults?.[analysisType]

  const handleWorkupChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })

  const setDetectorAnalyisDefaults = (detector) => {
    let analysisTypes = Object.keys(detector.analysis_defaults)

    analysisTypes.forEach((analysisType) => {
      if (workup.detectors?.includes(detector.value)) {
        onWorkupChange({ name: analysisType, value: detector.analysis_defaults[analysisType] })
      } else {
        onWorkupChange({ name: analysisType, value: undefined })
      }
    })

  }

  const setMethodAnalysisDefaults = () => {
    currentMethod?.detectors?.forEach(detector => setDetectorAnalyisDefaults(detector))
  }

  const handleChangeAutomation = (automation) => {
    if (automation === "AUTOMATED") {
      setMethodAnalysisDefaults()
      setStationaryPhaseDefaults(workup.stationary_phase)
    }
    onWorkupChange({ name: 'automation', value: automation })
  }

  const handleChangeDevice = (selected) => {
    console.log(selected)
    onWorkupChange({ name: 'device', value: selected.value })
    handleChangeMethod(OptionsDecorator.optionForValue(currentMethod?.value, selected.methods ))
  }

  const handleChangeMethod = (method) => {
    onWorkupChange({ name: 'method', value: method?.value })
    onWorkupChange({ name: 'VOLUME', value: method?.default_volume })
    onWorkupChange({ name: 'mobile_phases', value: method?.mobile_phases })
    setMethodAnalysisDefaults()
  }

  const handleChangeDetectors = (selected) => {
    handleNoDetectorSetting(selected)
    setMethodAnalysisDefaults()
  }

  const handleNoDetectorSetting = (selected) => {
    // 'NO_DETECTOR' is a special case (setting on some chromatography devices) and needs to be the sole selection.
    // It is opposed to and not be mixed up with having none selected at all. cbuggle, 11.6.2024.
    if (selected.length > 1 && selected.find(el => el.value === 'NO_DETECTOR')) {
      onWorkupChange({ name: 'detectors', value: ['NO_DETECTOR'] })
    } else {
      onWorkupChange({ name: 'detectors', value: selected?.map(option => option.value) })
    }
  }

  const setStationaryPhaseDefaults = (phase) => {
    phase && onWorkupChange({ name: 'STATIONARY_PHASE_TEMPERATURE', value: phase.analysis_defaults?.['TEMPERATURE'] })
  }

  const handleChangeStationaryPhase = (phase) => {
    if (isAutomated || !workup['STATIONARY_PHASE_TEMPERATURE']) {
      setStationaryPhaseDefaults(phase)
    }
    onWorkupChange({ name: 'stationary_phase', value: phase?.value })
  }

  const renderAnalysisForms = () => {
    return <>
      {hasDetectorAnalysisType("TEMPERATURE") &&
        <MetricSubFormSet
          metricName={'TEMPERATURE'}
          label={'Detector Temperature'}
          amount={workup.TEMPERATURE}
          onSave={handleWorkupChange('TEMPERATURE')}
          disabled={isAutomated}
        />}
      {hasDetectorAnalysisType("MS_PARAMETER") &&
        <TextInputFormSet
          label="MS Parameter"
          value={workup.MS_PARAMETER}
          onSave={handleWorkupChange('MS_PARAMETER')}
          disabled={isAutomated}
          typeColor='action'
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
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="chromatography_type"
                  options={OptionsDecorator.inclusiveOptions(currentType, selectOptions.chromatography_types)}
                  value={currentType}
                  onChange={selected => onWorkupChange({ name: 'chromatography_type', value: selected.value })}
                />
              </SingleLineFormGroup>
              <SingleLineFormGroup label='Sub-Type'>
                <Select
                  key={currentType}
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="chromatography_subtype"
                  options={OptionsDecorator.inclusiveOptions(currentSubtype, currentType?.subtypes)}
                  value={currentSubtype}
                  onChange={selected => onWorkupChange({ name: 'chromatography_subtype', value: selected.value })}
                />
              </SingleLineFormGroup>
              <SingleLineFormGroup label='Device'>
                <Select
                  key={currentSubtype}
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="device"
                  options={OptionsDecorator.inclusiveOptions(currentDevice, currentSubtype?.devices)}
                  value={currentDevice}
                  onChange={handleChangeDevice}
                />
              </SingleLineFormGroup>
              <SingleLineFormGroup label='Detectors'>
                <Select
                  key={currentDevice}
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="detectors"
                  options={OptionsDecorator.inclusiveOptions(currentDetectors, currentDevice?.detectors)}
                  value={currentDetectors}
                  isMulti
                  isClearable={false}
                  onChange={handleChangeDetectors}
                />
              </SingleLineFormGroup>
              <SingleLineFormGroup label='Mobile Phases'>
                <Select
                  className="react-select--overwrite"
                  classNamePrefix="react-select"
                  name="mobile_phases"
                  options={OptionsDecorator.inclusiveOptionsForValues(workup.mobile_phases, currentMethod?.mobile_phases)}
                  value={workup.mobile_phases}
                  onChange={selected => onWorkupChange({ name: 'mobile_phases', value: selected })}
                  isMulti
                  isDisabled={isAutomated}
                  placeholder={isAutomated ? "Determined by Method" : undefined}
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
                      options={filterMethodsByDetectorsOptions(currentDetectors)}
                      value={currentMethod}
                      onChange={handleChangeMethod}
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
                  onChange={handleChangeStationaryPhase}
                />
              </SingleLineFormGroup>
              {hasStationaryPhaseAnalysisType("TEMPERATURE") &&
                <MetricsInput
                  label={'Stat. Phase Temp'}
                  metricName={"TEMPERATURE"}
                  amount={workup.STATIONARY_PHASE_TEMPERATURE}
                  onChange={handleWorkupChange('STATIONARY_PHASE_TEMPERATURE')}
                />}
              <SingleLineFormGroup label={'Inj. Volume'}>
                <MetricsInput
                  displayMultiLine
                  metricName={"VOLUME"}
                  amount={workup.VOLUME}
                  onChange={handleWorkupChange('VOLUME')}
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
          onChange={handleChangeAutomation} />
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

