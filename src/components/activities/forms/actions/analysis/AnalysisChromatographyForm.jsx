import React, { useContext } from 'react'
import { Input, Label, FormGroup } from 'reactstrap';

import AnalysisChromatographyStepForm from "./AnalysisChromatographyStepForm";

import ButtonGroupToggle from "../../formgroups/ButtonGroupToggle";
import DetectorConditionsFormGroup from '../../formgroups/DetectorConditionsFormGroup';
import MetricsInputFormGroup from '../../formgroups/MetricsInputFormGroup';
import SelectFormGroup from '../../formgroups/SelectFormGroup';
import SingleLineFormGroup from '../../formgroups/SingleLineFormGroup';

import CreateButton from "../../../../utilities/CreateButton";
import FormSection from '../../../../utilities/FormSection'

import OntologiesDecorator from '../../../../../decorators/OntologiesDecorator';
import OptionsDecorator from '../../../../../decorators/OptionsDecorator';

import { SelectOptions } from '../../../../../contexts/SelectOptions';

import withActivitySteps from '../../../../utilities/WithActivitySteps';

import { ontologyId } from '../../../../../constants/ontologyId'

const AnalysisChromatographyForm = (
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

  const isAutomated = workup.automation_mode === ontologyId.automation_modes.automated
  const ontologies = useContext(SelectOptions).ontologies

  const currentDeviceOption = OptionsDecorator.inclusiveOptionForValue(workup.device, ontologies)
  const currentMethodOption = OptionsDecorator.inclusiveOptionForValue(workup.method, currentDeviceOption?.methods)
  const currentStationaryPhaseOption = OptionsDecorator.inclusiveOptionForValue(workup.stationary_phase, currentMethodOption?.stationary_phase)

  const filteredOntologiesForRole = (roleName) => OntologiesDecorator.filterByDependencies({ roleName: roleName, options: ontologies, workup: workup })

  const filterMethodsByDetectors = (detectors, methods) => {
    if (!methods) { return [] }
    return (detectors?.length > 0) ?
      methods.filter((method) => method.detectors.every(method_detector => detectors.includes(method_detector.value)))
      :
      methods
  }
  const currentDetectorsOptions = OptionsDecorator.optionsForValues(workup.detectors, currentDeviceOption?.detectors)
  const filteredMethodOptions = filterMethodsByDetectors(workup.detectors, currentDeviceOption?.methods)
  const filteredDetectorOptions = OntologiesDecorator.findAllByontologyId(currentDeviceOption?.detectors?.map(d => d.value), ontologies)

  const hasStationaryPhaseAnalysisType = (analysisType) => !!currentStationaryPhaseOption?.analysis_defaults?.[analysisType]

  const handleWorkupChange = (workupKey) => (value) => onWorkupChange({ name: workupKey, value: value })

  const handleSelectChange = (workupKey) => (selected) => onWorkupChange({ name: workupKey, value: selected.value })

  const handleChangeType = (newType) => {
    if (newType?.value !== workup.type) {
      onWorkupChange({ name: 'type', value: newType?.value })
      handleChangeSubType({ value: undefined })
    }
  }

  const handleChangeSubType = (newSubType) => {
    if (newSubType?.value !== workup.subtype) {
      onWorkupChange({ name: 'subtype', value: newSubType?.value })
      handleChangeDevice({ value: undefined })
    }
  }

  const handleChangeAutomation = (automation) => {
    switch (automation) {
      case ontologyId.automation_modes.automated:
        handleChangeDevice(currentDeviceOption)
        setMethodAnalysisDefaults(currentMethodOption)
        setStationaryPhaseDefaults(currentStationaryPhaseOption)
        onWorkupChange({ name: 'mobile_phase', value: undefined })
        break;
      case ontologyId.automation_modes.semiAutomated:
        handleChangeDevice(currentDeviceOption)
        onWorkupChange({ name: 'method', value: undefined })
        onWorkupChange({ name: 'stationary_phase', value: undefined })
        break;
      case ontologyId.automation_modes.manual:
        handleChangeDevice(undefined)
        break;
      default:
    }
    onWorkupChange({ name: 'automation_mode', value: automation })
  }

  const handleChangeDevice = (device) => {
    onWorkupChange({ name: 'device', value: device?.value })
    if (device?.value !== workup.device) { handleChangeMethod(undefined) }
  }

  const handleChangeMethod = (method) => {
    onWorkupChange({ name: 'method', value: method?.value })
    onWorkupChange({ name: 'inject_volume', value: method?.default_inject_volume })
    onWorkupChange({ name: 'mobile_phase', value: method?.mobile_phase?.map(phase => phase.value) })
    onWorkupChange({ name: 'purification_steps', value: method?.steps })
    handleChangeStationaryPhase(method?.stationary_phase?.[0])
    isAutomated && setMethodAnalysisDefaults(method)

    workup.detectors?.length > 0 || onWorkupChange({ name: 'detectors', value: method?.detectors?.map(el => el.value) })
  }

  const handleChangeStationaryPhase = (phase) => {
    onWorkupChange({ name: 'stationary_phase', value: phase?.value })
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
    switch (workup.automation_mode) {
      case ontologyId.automation_modes.automated:
      case ontologyId.automation_modes.semiAutomated:
        return (
          <>
            <SelectFormGroup
              key={"device" + workup.device}
              // The key is required  when switching to automate else the selected engineering_material will be retained in the devices select!
              // Even though the label gets updated the selected value does not. React state handling facepalm.
              label={'Device'}
              options={filteredOntologiesForRole('device')}
              value={workup.device}
              onChange={handleChangeDevice}
            />
            <SelectFormGroup
              label={"Detectors"}
              options={filteredDetectorOptions}
              value={workup.detectors}
              onChange={handleChangeDetectors}
              isMulti
              isClearable={false}
            />
            <SelectFormGroup
              key={"mobile_phase" + workup.mobile_phase}
              label={"Mobile Phases"}
              options={currentMethodOption?.mobile_phase || filteredOntologiesForRole('mobile_phase')}
              value={workup.mobile_phase}
              onChange={handleSelectChange('mobile_phase')}
              isMulti
              placeholder={isAutomated ? "Depends on Method" : workup.device ? "Please Select" : "Depends on Device"}
              isClearable={false}
              disabled={isAutomated || !workup.device}
            />
            {isAutomated &&
              <>
                <SelectFormGroup
                  key={"method" + workup.method}
                  label={"Method"}
                  options={filteredMethodOptions}
                  value={workup.method}
                  onChange={handleChangeMethod}
                />
                <FormGroup>
                  {currentMethodOption?.description}
                </FormGroup>
              </>}
            {isAutomated ?
              <>{"Stationary Phases " + (workup.stationary_phase || "-")}</>
              :
              <SelectFormGroup
                key={"stationary_phase" + workup.stationary_phase}
                label={"Stationary Phases"}
                options={currentMethodOption?.stationary_phase || filteredOntologiesForRole('stationary_phase')}
                value={workup.stationary_phase}
                onChange={handleChangeStationaryPhase}
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
          </>)
      case ontologyId.automation_modes.manual:
        return (
          <>
            <SelectFormGroup
              key={"material" + workup.material_engineering}
              // The key is required when switching to manual else the selected device will be retained in the materials select!
              // Even though the label gets updated the selected value does not. React state handling facepalm.
              label='Material'
              options={filteredOntologiesForRole('material_engineering')}
              value={workup.engineering_material}
              onChange={handleSelectChange('jar_material')}
            />
            {filteredOntologiesForRole('stationary_phase')?.length > 0 ?
              <SelectFormGroup
                key={"stationary_phase" + workup.stationary_phase}
                label={"Stationary Phases"}
                options={currentMethodOption?.stationary_phase || filteredOntologiesForRole('stationary_phase')}
                value={workup.stationary_phase}
                onChange={handleChangeStationaryPhase}
              /> :
              <SingleLineFormGroup
                label={'Stationary Phase'}
              >
                <Input
                  type="textarea"
                  name="stationary_phase"
                  value={workup.stationary_phase}
                  onChange={(event) => onWorkupChange({ name: 'stationary_phase', value: event.target.value })}
                />
              </SingleLineFormGroup>
            }
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

  const renderDetectorFormSection = () => {
    return (
      <>
        <DetectorConditionsFormGroup
          detectorsOptions={currentDetectorsOptions}
          conditions={workup.detector_conditions}
          onChange={handleWorkupChange('detector_conditions')}
          disabled={isAutomated}
        />
      </>
    )
  }

  return (
    <>
      <FormSection type='action'>
        <Label>Mode</Label>
        <ButtonGroupToggle
          value={workup.automation_mode}
          options={filteredOntologiesForRole('automation_mode')}
          onChange={handleChangeAutomation} />
        <SelectFormGroup
          key={"type" + workup.type}
          label={'Type'}
          options={filteredOntologiesForRole('type')}
          value={workup.type}
          onChange={handleChangeType}
        />
        <SelectFormGroup
          key={"subtype" + workup.subtype}
          label={'Subtype'}
          options={filteredOntologiesForRole('subtype')}
          value={workup.subtype}
          onChange={handleChangeSubType}
        />
        {renderAutomationSpecificFields()}
      </FormSection>
      {renderDetectorFormSection()}

      {activitySteps.map((step, idx) =>
        <AnalysisChromatographyStepForm
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
        <AnalysisChromatographyStepForm
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

export default withActivitySteps(AnalysisChromatographyForm, 'purification_steps')

