import React, { useContext } from 'react'
import { Label, FormGroup } from 'reactstrap';
import ChromatographyStepForm from "./ChromatographyStepForm";

import CreateButton from "../../../../utilities/CreateButton";
import FormSection from '../../../../utilities/FormSection'

import ButtonGroupToggle from "../../formgroups/ButtonGroupToggle";
import MetricsInputFormGroup from '../../formgroups/MetricsInputFormGroup';
import SelectFormGroup from '../../formgroups/SelectFormGroup';

import DetectorConditionsFormGroup from '../../formgroups/DetectorConditionsFormGroup';
import TextInputFormSet from '../../formsets/TextInputFormSet';

import OptionsDecorator from '../../../../../decorators/OptionsDecorator';
import OntologiesDecorator from '../../../../../decorators/OntologiesDecorator';

import { SelectOptions } from '../../../../../contexts/SelectOptions';

import withActivitySteps from '../../../../utilities/WithActivitySteps';

import { chmoId } from '../../../../../constants/chmoId'

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

  const isAutomated = workup.mode === chmoId.mode.automated

  const ontologieOptions = useContext(SelectOptions).ONTOLOGIES

  console.log(ontologieOptions)
  console.log("workup ChromatographyForm ")
  console.log(workup)

  const currentDeviceOption = OptionsDecorator.inclusiveOptionForValue(workup.device, ontologieOptions.device)
  const currentMethodOption = OptionsDecorator.inclusiveOptionForValue(workup.method, currentDeviceOption?.methods)

  // TODO: this was meant to us the options provided by device unless provided by method when automated.
  // The latest devices no longer carry mobile_phases, stationary_phases
  // let phases_scope = isAutomated ? currentMethodOption : currentDeviceOption
  // const currentMobilePhasesOptions = currentMethodOption?.mobile_phases
  // const currentStationaryPhasesOptions = currentMethodOption?.stationary_phases

  const currentStationaryPhaseOption = OptionsDecorator.inclusiveOptionForValue(workup.stationary_phases, currentMethodOption?.stationary_phases)

  const filterByDependencies = (options) => OntologiesDecorator.filterByDependencies(workup, options)

  const filterMethodsByDetectors = (detectors) => {
    // console.log("filterMethodsByDetectors")
    // console.log(detectors)
    // console.log(currentDeviceOption?.methods)

    if (detectors?.length > 0) {
      return currentDeviceOption?.methods?.filter((method) => {
        console.log(method)
        console.log(detectors.every(detector => method.detectors?.find(methodDetector => methodDetector.value === detector)))

        return detectors.every(detector => method.detectors?.find(methodDetector => methodDetector.value === detector)
        )
      }) || []
    } else {
      return currentDeviceOption?.methods || []
    }
  }

  const hasStationaryPhaseAnalysisType = (analysisType) => !!currentStationaryPhaseOption?.analysis_defaults?.[analysisType]

  const handleWorkupChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })
  const handleSelectChange = (workupKey) => (selected) => onWorkupChange({ name: workupKey, value: selected.value })

  const handleChangeType = (newType) => {
    console.log(workup)
    onWorkupChange({ name: 'type', value: newType.value })
    handleChangeSubType(OptionsDecorator.optionForValue(workup.subtype, filterByDependencies(ontologieOptions.subtype)))
  }

  const handleChangeSubType = (newSubType) => {
    console.log("change subtype")
    console.log(newSubType)
    onWorkupChange({ name: 'subtype', value: newSubType?.value })
    handleChangeDevice(OptionsDecorator.optionForValue(workup.device, filterByDependencies(ontologieOptions.device)))
  }

  const handleChangeAutomation = (automation) => {
    console.log("handleChangeAutomation")
    console.log(automation)
    if (automation === chmoId.mode.automated) {
      handleChangeDevice(currentDeviceOption)
      setMethodAnalysisDefaults(currentMethodOption)
      setStationaryPhaseDefaults(currentStationaryPhaseOption)
    } else {
      onWorkupChange({ name: 'method', value: undefined })
    }
    onWorkupChange({ name: 'mode', value: automation })
  }

  const handleChangeDevice = (device) => {
    console.log("change device")
    console.log(device)
    onWorkupChange({ name: 'device', value: device?.value })
    onWorkupChange({ name: 'detectors', value: device?.detectors })
    handleChangeMethod(OptionsDecorator.optionForValue(currentMethodOption?.value, device?.methods))
  }

  const handleChangeMethod = (method) => {
    console.log("change method")
    console.log(method)
    onWorkupChange({ name: 'method', value: method?.value })
    onWorkupChange({ name: 'VOLUME', value: method?.default_volume })
    onWorkupChange({ name: 'mobile_phases', value: method?.mobile_phases?.map(phase => phase.value) })
    onWorkupChange({ name: 'purification_steps', value: method?.steps })
    handleChangeStationaryPhase(method?.stationary_phases?.[0])
    isAutomated && setMethodAnalysisDefaults(method)
  }

  const handleChangeMobilePhases = (phases) => {
    onWorkupChange({ name: "mobile_phases", value: phases?.map(phase => phase.value) })
  }

  const handleChangeStationaryPhase = (phase) => {
    onWorkupChange({ name: 'stationary_phases', value: phase?.value })
    isAutomated && setStationaryPhaseDefaults(phase)
  }

  const handleChangeDetectors = (detectors) => {
    console.log("handleChangeDetectors")
    console.log(detectors)
    onWorkupChange({ name: 'detectors', value: detectors?.map(detector => detector.value) })
    isAutomated && setMethodAnalysisDefaults(currentMethodOption)
  }

  const setMethodAnalysisDefaults = (method) => {
    let newConditions = {}

    method?.detectors &&
      method.detectors
        .filter(d => workup.detectors?.includes(d.value))
        .filter(detector => !!detector.analysis_defaults)
        .forEach((detector) => {
          newConditions[detector.value] = {}
          detector.analysis_defaults.forEach(defaults => {
            newConditions[detector.value][defaults.metric_name] = defaults.values
          })
        })
    onWorkupChange({ name: 'detector_conditions', value: newConditions })
  }

  const setStationaryPhaseDefaults = (phase) => {
    phase && onWorkupChange({ name: 'STATIONARY_PHASE_TEMPERATURE', value: phase.analysis_defaults?.['TEMPERATURE'] })
  }

  const renderAutomationSpecificFields = () => {
    switch (workup.mode) {
      case chmoId.mode.automated:
      case chmoId.mode.semiAutomated:
        return (
          <>
            {workup.device}
            <SelectFormGroup
              key={"device" + workup.device}
              label={'Device'}
              options={filterByDependencies(ontologieOptions.device)}
              value={workup.device}
              onChange={handleChangeDevice}
            />
            <SelectFormGroup
              key={"detectors" + workup.detectors}
              label={"Detectors"}
              options={filterByDependencies(ontologieOptions.detector)}
              value={workup.detectors}
              onChange={handleChangeDetectors}
              isMulti
              isClearable={false}
            />
            <SelectFormGroup
              key={"mobile_phases" + workup.mobile_phases}
              label={"Mobile Phases"}
              options={currentMethodOption?.mobile_phases}
              value={workup.mobile_phases}
              onChange={handleChangeMobilePhases}
              isMulti
              disabled={isAutomated}
              placeholder={isAutomated ? "Depends on Method" : undefined}
            />
            {isAutomated &&
              <>
                <SelectFormGroup
                  key={"method" + workup.method}
                  label={"Method"}
                  options={filterMethodsByDetectors(workup.detectors)}
                  value={workup.method}
                  onChange={handleChangeMethod}
                />
                <FormGroup>
                  {currentMethodOption?.description}
                </FormGroup>
              </>}
            {isAutomated ?
              <TextInputFormSet
                label={"Stationary Phases"}
                value={workup.stationary_phases}
                disabled
                typeColor='action' />
              :
              <SelectFormGroup
                key={"stationary_phases" + workup.stationary_phases}
                label={"Stationary Phases"}
                options={filterByDependencies(currentMethodOption?.stationary_phases)}
                value={workup.stationary_phases}
                onChange={handleChangeStationaryPhase}
                disabled={isAutomated}
              />
            }
            {hasStationaryPhaseAnalysisType("TEMPERATURE") &&
              <FormSection>
                <MetricsInputFormGroup
                  label={'Stat. Phases Temp'}
                  metricName={"TEMPERATURE"}
                  amount={workup.STATIONARY_PHASE_TEMPERATURE}
                  onChange={handleWorkupChange('STATIONARY_PHASE_TEMPERATURE')}
                  disabled={isAutomated}
                />
              </FormSection>
            }
            <MetricsInputFormGroup
              label={'Inj. Volume'}
              metricName={"VOLUME"}
              amount={workup.VOLUME}
              onChange={handleWorkupChange('VOLUME')}
              disabled={isAutomated}
            />
            <DetectorConditionsFormGroup
              detectors={workup.detectors}
              methodDetectors={currentMethodOption?.detectors}
              conditions={workup.detector_conditions}
              onChange={handleWorkupChange('detector_conditions')}
              disabled={isAutomated}
            />
          </>)
      case chmoId.mode.manual:
        return (
          <>
            <SelectFormGroup
              label='Material'
              options={ontologieOptions.material_engineering}
              value={workup.engineering_material}
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
          </ >)
      default:
        break;
    }
  }

  return (
    <>
      <FormSection type='action'>
        <Label>Mode</Label>
        {workup.mode}
        <ButtonGroupToggle value={workup.mode} options={ontologieOptions.mode_usage}
          onChange={handleChangeAutomation} />
      </FormSection>

      <FormSection>
        {workup.type}
        <SelectFormGroup
          key={"device" + workup.type}
          label={'Type'}
          options={filterByDependencies(ontologieOptions.type)}
          value={workup.type}
          onChange={handleChangeType}
        />
        {workup.subtype}
        <SelectFormGroup
          key={"device" + workup.subtype}
          label={'Subtype'}
          options={filterByDependencies(ontologieOptions.subtype)}
          value={workup.subtype}
          onChange={handleChangeSubType}
        />
        {renderAutomationSpecificFields()}
      </FormSection>

      {activitySteps.map((step, idx) =>
        <ChromatographyStepForm
          key={'chromatography-step-' + idx + '-' + activitySteps.length}
          label={'Chromatography Step ' + (idx + 1)}
          workup={step}
          onSave={onSaveStep(idx)}
          onCancel={onCancelStep(idx)}
          onDelete={onDeleteStep(idx)}
          canDelete={activitySteps.length > 1}
          disabled={isAutomated}
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
      {!isAutomated &&
        <FormSection type='action'>
          <CreateButton
            label='Chromatography Step'
            type='action'
            onClick={addStep}
            size='sm'
          />
        </FormSection>
      }
    </>
  )
}

export default withActivitySteps(ChromatographyForm, 'purification_steps')

