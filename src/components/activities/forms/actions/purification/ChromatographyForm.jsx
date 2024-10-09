import React, { useContext } from 'react'
import { Label, FormGroup } from 'reactstrap';
import ChromatographyStepForm from "./ChromatographyStepForm";

import CreateButton from "../../../../utilities/CreateButton";
import FormSection from '../../../../utilities/FormSection'

import ButtonGroupToggle from "../../formgroups/ButtonGroupToggle";
import MetricsInputFormGroup from '../../formgroups/MetricsInputFormGroup';
import SelectFormGroup from '../../formgroups/SelectFormGroup';

import MetricSubFormSet from '../../formsets/MetricSubFormSet';
import TextInputFormSet from '../../formsets/TextInputFormSet';
import WavelengthListFormSet from '../../formsets/WavelengthListFormSet';

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

  const selectOptions = useContext(SelectOptions).FORMS.PURIFICATION.CHROMATOGRAPHY

  const currentType = OptionsDecorator.inclusiveOptionForValue(workup.chromatography_type, selectOptions.chromatography_types)
  const currentSubtype = OptionsDecorator.inclusiveOptionForValue(workup.chromatography_subtype, currentType?.subtypes)
  const currentDevice = OptionsDecorator.inclusiveOptionForValue(workup.device, currentSubtype?.devices)
  const currentDetectors = OptionsDecorator.inclusiveOptionsForValues(workup.detectors, currentDevice?.detectors)

  const currentMethod = OptionsDecorator.inclusiveOptionForValue(workup.method, currentDevice?.methods)
  const currentMobilePhases = OptionsDecorator.inclusiveOptionsForValues(workup.mobile_phases, currentMethod?.mobile_phases)
  const currentStationaryPhase = OptionsDecorator.inclusiveOptionForValue(workup.stationary_phase, [currentMethod?.stationary_phase])
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
    return detectors?.length > 0 ? filterMethodsByDetectors(currentDevice?.methods, detectors) : currentDevice?.methods
  }

  const hasStationaryPhaseAnalysisType = (analysisType) => !!currentStationaryPhase?.analysis_defaults?.[analysisType]

  const handleWorkupChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })
  const handleSelectChange = (workupKey) => (selected) => onWorkupChange({ name: workupKey, value: selected.value })

  const handleChangeType = (newType) => {
    onWorkupChange({ name: 'chromatography_type', value: newType.value })
    handleChangeSubType(OptionsDecorator.optionForValue(workup.chromatography_subtype, newType.subtypes))
  }

  const handleChangeSubType = (newSubType) => {
    onWorkupChange({ name: 'chromatography_subtype', value: newSubType?.value })
    handleChangeDevice(OptionsDecorator.optionForValue(workup.device, newSubType?.devices))
  }

  const handleChangeAutomation = (automation) => {
    if (automation === "AUTOMATED") {
      setMethodAnalysisDefaults()
      setStationaryPhaseDefaults(workup.stationary_phase)
    }
    onWorkupChange({ name: 'automation', value: automation })
  }

  const handleChangeDevice = (device) => {
    onWorkupChange({ name: 'device', value: device?.value })
    onWorkupChange({ name: 'detectors', value: device?.detectors?.map(option => option.value) })
    handleChangeMethod(OptionsDecorator.optionForValue(currentMethod?.value, device?.methods))
  }

  const handleChangeMethod = (method) => {
    onWorkupChange({ name: 'method', value: method?.value })
    onWorkupChange({ name: 'VOLUME', value: method?.default_volume })
    onWorkupChange({ name: 'mobile_phases', value: method?.mobile_phases?.map(phase => phase.value) })
    handleChangeStationaryPhase(method?.stationary_phase)
    method?.detectors?.forEach(detector => setDetectorAnalyisDefaults(detector))
  }

  const handleChangeMobilePhases = (phases) => {
    onWorkupChange({ name: "mobile_phases", value: phases?.map(phase => phase.value) })
  }

  const handleChangeStationaryPhase = (phase) => {
    if (isAutomated) {
      setStationaryPhaseDefaults(phase)
    }
    onWorkupChange({ name: 'stationary_phase', value: phase?.value })
  }


  const handleChangeDetectors = (detectors) => {
    handleNoDetectorSetting(detectors)
    setMethodAnalysisDefaults()
  }

  const handleNoDetectorSetting = (detectors) => {
    // 'NO_DETECTOR' is a special case (setting on some chromatography devices) and needs to be the sole selection.
    // It is opposed to and not be mixed up with having none selected at all. cbuggle, 11.6.2024.
    if (detectors.length > 1 && detectors.find(detector => detector.value === 'NO_DETECTOR')) {
      onWorkupChange({ name: 'detectors', value: ['NO_DETECTOR'] })
    } else {
      onWorkupChange({ name: 'detectors', value: detectors?.map(detector => detector.value) })
    }
  }

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
    isAutomated && currentMethod?.detectors?.forEach(detector => setDetectorAnalyisDefaults(detector))
  }

  const setStationaryPhaseDefaults = (phase) => {
    phase && onWorkupChange({ name: 'STATIONARY_PHASE_TEMPERATURE', value: phase.analysis_defaults?.['TEMPERATURE'] })
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
        <WavelengthListFormSet
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
              <SelectFormGroup
                label={'Type'}
                name={'chromatography_type'}
                options={OptionsDecorator.inclusiveOptions(currentType, selectOptions.chromatography_types)}
                value={currentType}
                onChange={handleChangeType}
                tooltipName={currentType?.unavailable && 'selection_unavailable'}
              />
              <SelectFormGroup
                key={"subtype" + currentSubtype}
                label={'Sub-Type'}
                name={'chromatography_subtype'}
                options={OptionsDecorator.inclusiveOptions(currentSubtype, currentType?.subtypes)}
                value={currentSubtype}
                onChange={handleChangeSubType}
                tooltipName={currentSubtype?.unavailable && 'selection_unavailable'}
              />
              <SelectFormGroup
                key={"device" + currentDevice}
                label={'Device'}
                name={'device'}
                options={OptionsDecorator.inclusiveOptions(currentDevice, currentSubtype?.devices)}
                value={currentDevice}
                onChange={handleChangeDevice}
                tooltipName={currentDevice?.unavailable && 'selection_unavailable'}
              />
              <SelectFormGroup
                key={currentDetectors}
                label="Detectors"
                name="detectors"
                options={OptionsDecorator.inclusiveOptions(currentDetectors, currentDevice?.detectors)}
                value={currentDetectors}
                isMulti
                isClearable={false}
                onChange={handleChangeDetectors}
                tooltipName={currentDetectors?.find(det => det.unavailable) && 'selection_unavailable'}
              />
              <SelectFormGroup
                key={currentMethod}
                label="Mobile Phases"
                name="mobile_phases"
                options={OptionsDecorator.inclusiveOptionsForValues(currentMobilePhases, currentMethod?.mobile_phases)}
                value={currentMobilePhases}
                onChange={handleChangeMobilePhases}
                isMulti
                disabled={isAutomated}
                placeholder={isAutomated ? "Depends on Method" : undefined}
                tooltipName={workup.mobile_phases?.find(phase => phase.unavailable) && 'selection_unavailable'}
              />
              {isAutomated &&
                <>
                  <SelectFormGroup
                    key={currentMethod}
                    label="Method"
                    name="method"
                    options={OptionsDecorator.inclusiveOptions(currentMethod, filterMethodsByDetectorsOptions(currentDetectors))}
                    value={currentMethod}
                    onChange={handleChangeMethod}
                    tooltipName={currentMethod?.unavailable && 'selection_unavailable'}

                  />
                  <FormGroup>
                    {currentMethod?.description}
                  </FormGroup>
                </>}
              <SelectFormGroup
                key={"stationary_phase" + currentStationaryPhase}
                label="Stationary Phase"
                name="stationary_phase"
                options={OptionsDecorator.inclusiveOptions(currentStationaryPhase, [currentMethod?.stationary_phase])}
                value={currentStationaryPhase}
                onChange={handleChangeStationaryPhase}
                disabled={isAutomated}
                tooltipName={currentStationaryPhase?.unavailable && 'selection_unavailable'}
              />
              {hasStationaryPhaseAnalysisType("TEMPERATURE") &&
                <MetricsInputFormGroup
                  label={'Stat. Phase Temp'}
                  metricName={"TEMPERATURE"}
                  amount={workup.STATIONARY_PHASE_TEMPERATURE}
                  onChange={handleWorkupChange('STATIONARY_PHASE_TEMPERATURE')}
                  disabled={isAutomated}
                />}
              <MetricsInputFormGroup
                label={'Inj. Volume'}
                metricName={"VOLUME"}
                amount={workup.VOLUME}
                onChange={handleWorkupChange('VOLUME')}
                disabled={isAutomated}
              />
            </FormSection>
            {renderAnalysisForms()}
          </>)
      case 'MANUAL':
        return (
          <FormSection>
            <SelectFormGroup
              label='Material'
              name="sample_id"
              options={selectOptions.jar_materials}
              value={OptionsDecorator.optionForValue(workup.jar_material, selectOptions.jar_materials)}
              onChange={handleSelectChange('jar_material')}
            />
            <MetricsInputFormGroup
              metricName={'LENGTH'}
              label={'Diameter'}
              amount={workup.jar_diameter}
              onChange={handleWorkupChange('jar_diameter')}
            />
            <MetricsInputFormGroup
              metricName={'LENGTH'}
              label={'Height'}
              amount={workup.jar_height}
              onChange={handleWorkupChange('jar_height')}
            />
            <MetricsInputFormGroup
              metricName={'LENGTH'}
              label={'Filling Height'}
              amount={workup.jar_filling_height}
              max={workup.jar_height?.value}
              onChange={handleWorkupChange('jar_filling_height')}
            />
          </FormSection >)
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

