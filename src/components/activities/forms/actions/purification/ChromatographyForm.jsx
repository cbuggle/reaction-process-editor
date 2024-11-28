import React, { useContext } from 'react'
import { Label, FormGroup } from 'reactstrap';

import ChromatographyStepForm from "./ChromatographyStepForm";

import ButtonGroupToggle from "../../formgroups/ButtonGroupToggle";
import DetectorConditionsFormGroup from '../../formgroups/DetectorConditionsFormGroup';
import MetricsInputFormGroup from '../../formgroups/MetricsInputFormGroup';
import SelectFormGroup from '../../formgroups/SelectFormGroup';

import CreateButton from "../../../../utilities/CreateButton";
import FormSection from '../../../../utilities/FormSection'

import OntologiesDecorator from '../../../../../decorators/OntologiesDecorator';
import OptionsDecorator from '../../../../../decorators/OptionsDecorator';

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
  const ontologies = useContext(SelectOptions).ontologies

  const currentDeviceOption = OptionsDecorator.inclusiveOptionForValue(workup.device, ontologies)
  const currentMethodOption = OptionsDecorator.inclusiveOptionForValue(workup.method, currentDeviceOption?.methods)

  const currentStationaryPhaseOption = OptionsDecorator.inclusiveOptionForValue(workup.stationary_phases, currentMethodOption?.stationary_phases)

  const filteredOntologiesForRole = (roleName) => OntologiesDecorator.filterByRole({ roleName: roleName, options: ontologies, workup: workup })

  const filterMethodsByDetectors = (detectors, methods) => {
    if (!methods) { return [] }
    return (detectors?.length > 0) ?
      methods.filter((method) => method.detectors.every(method_detector => detectors.includes(method_detector.value)))
      :
      methods
  }

  const hasStationaryPhaseAnalysisType = (analysisType) => !!currentStationaryPhaseOption?.analysis_defaults?.[analysisType]

  const handleWorkupChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })

  const handleSelectChange = (workupKey) => (selected) => onWorkupChange({ name: workupKey, value: selected.value })

  const handleChangeType = (newType) => {
    onWorkupChange({ name: 'type', value: newType.value })
    handleChangeSubType(OptionsDecorator.optionForValue(workup.subtype, filteredOntologiesForRole('subtype')))
  }

  const handleChangeSubType = (newSubType) => {
    onWorkupChange({ name: 'subtype', value: newSubType?.value })
    handleChangeDevice(OptionsDecorator.optionForValue(workup.device, filteredOntologiesForRole('device')))
  }

  const handleChangeAutomation = (automation) => {
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
    onWorkupChange({ name: 'device', value: device?.value })
    onWorkupChange({ name: 'detectors', value: device?.detectors?.map((detector) => detector.value) })
    handleChangeMethod(OptionsDecorator.optionForValue(currentMethodOption?.value, device?.methods))
  }

  const handleChangeMethod = (method) => {
    onWorkupChange({ name: 'method', value: method?.value })
    onWorkupChange({ name: 'inject_volume', value: method?.default_inject_volume })
    onWorkupChange({ name: 'mobile_phases', value: method?.mobile_phases?.map(phase => phase.value) })
    onWorkupChange({ name: 'purification_steps', value: method?.steps })
    handleChangeStationaryPhase(method?.stationary_phases?.[0])
    isAutomated && setMethodAnalysisDefaults(method)

    workup.detectors?.length > 0 || onWorkupChange({ name: 'detectors', value: method.detectors?.map(el => el.value) })
  }

  const handleChangeMobilePhases = (phases) => {
    onWorkupChange({ name: "mobile_phases", value: phases?.map(phase => phase.value) })
  }

  const handleChangeStationaryPhase = (phase) => {
    onWorkupChange({ name: 'stationary_phases', value: phase?.value })
    isAutomated && setStationaryPhaseDefaults(phase)
  }

  const handleChangeDetectors = (detectors) => {
    onWorkupChange({ name: 'detectors', value: detectors?.map(detector => detector.value) })
    isAutomated && setMethodAnalysisDefaults(currentMethodOption)
  }

  const setMethodAnalysisDefaults = (method) => {
    let newConditions = {}

    method?.detectors &&
      method.detectors
        .filter(detector => workup.detectors?.includes(detector.value))
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
    onWorkupChange({ name: 'STATIONARY_PHASE_TEMPERATURE', value: phase?.analysis_defaults?.['TEMPERATURE'] })
  }

  const renderAutomationSpecificFields = () => {
    switch (workup.mode) {
      case chmoId.mode.automated:
      case chmoId.mode.semiAutomated:
        return (
          <>
            <SelectFormGroup
              key={"device" + workup.device}
              label={'Device'}
              options={filteredOntologiesForRole('device')}
              value={workup.device}
              onChange={handleChangeDevice}
            />
            <SelectFormGroup
              key={"detectors" + workup.detectors}
              label={"Detectors"}
              options={filteredOntologiesForRole('detector')}
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
                  options={filterMethodsByDetectors(workup.detectors, currentDeviceOption?.methods)}
                  value={workup.method}
                  onChange={handleChangeMethod}
                />
                <FormGroup>
                  {currentMethodOption?.description}
                </FormGroup>
              </>}
            {isAutomated ?
              <>{"Stationary Phases " + (workup.stationary_phases || "-")}</>
              :
              <SelectFormGroup
                key={"stationary_phases" + workup.stationary_phases}
                label={"Stationary Phases"}
                options={currentMethodOption?.stationary_phases}
                value={workup.stationary_phases}
                onChange={handleChangeStationaryPhase}
                disabled={isAutomated}
              />
            }
            {hasStationaryPhaseAnalysisType("TEMPERATURE") &&
              <MetricsInputFormGroup
                label={'Stat. Phases Temp'}
                metricName={"TEMPERATURE"}
                amount={workup.STATIONARY_PHASE_TEMPERATURE}
                onChange={handleWorkupChange('STATIONARY_PHASE_TEMPERATURE')}
                disabled={isAutomated}
              />
            }
            <MetricsInputFormGroup
              label={'Inj. Volume'}
              metricName={"VOLUME"}
              amount={workup.inject_volume}
              onChange={handleWorkupChange('inject_volume')}
              disabled={isAutomated}
            />
            <DetectorConditionsFormGroup
              detectorsOptions={OptionsDecorator.optionsForValues(workup.detectors, currentDeviceOption?.detectors)}
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
              options={filteredOntologiesForRole('material_engineering')}
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
        <ButtonGroupToggle
          value={workup.mode}
          options={filteredOntologiesForRole('mode_usage')}
          onChange={handleChangeAutomation} />
        <SelectFormGroup
          key={"type" + workup.type}
          label={'Type'}
          options={filteredOntologiesForRole('type')}
          value={workup.type}
          onChange={handleChangeType}
        />
        <SelectFormGroup
          key={"device" + workup.subtype}
          label={'Subtype'}
          options={filteredOntologiesForRole('subtype')}
          value={workup.subtype}
          onChange={handleChangeSubType}
        />
      </FormSection>
      {renderAutomationSpecificFields()}

      {activitySteps.map((step, idx) =>
        <ChromatographyStepForm
          key={'chromatography-step-' + idx + '-' + activitySteps.length}
          label={'Chromatography Step ' + (idx + 1)}
          workup={step}
          solventOptions={filteredOntologiesForRole('solvent')}
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
          solventOptions={filteredOntologiesForRole('solvent')}
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

