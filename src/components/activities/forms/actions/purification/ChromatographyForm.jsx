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

  const isAutomated = workup.automation_mode === chmoId.automation_mode.automated
  const ontologies = useContext(SelectOptions).ontologies

  console.log(ontologies.filter(o => o.label))

  const currentDeviceOption = OptionsDecorator.inclusiveOptionForValue(workup.device, ontologies)
  const currentMethodOption = OptionsDecorator.inclusiveOptionForValue(workup.method, currentDeviceOption?.methods)
  const currentStationaryPhaseOption = OptionsDecorator.inclusiveOptionForValue(workup.stationary_phases, currentMethodOption?.stationary_phases)

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
  const filteredDetectorOptions = OntologiesDecorator.findAllByChmoId(currentDeviceOption?.detectors?.map(d => d.value), ontologies)

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
      case chmoId.automation_mode.automated:
        handleChangeDevice(currentDeviceOption)
        setMethodAnalysisDefaults(currentMethodOption)
        setStationaryPhaseDefaults(currentStationaryPhaseOption)
        break;
      case chmoId.automation_mode.semiAutomated:
        handleChangeDevice(currentDeviceOption)
        onWorkupChange({ name: 'method', value: undefined })
        onWorkupChange({ name: 'stationary_phases', value: undefined })
        break;
      case chmoId.automation_mode.manual:
        handleChangeDevice(undefined)
        break;
      default:
    }
    onWorkupChange({ name: 'automation_mode', value: automation })
  }

  const handleChangeDevice = (device) => {
    if (device?.value !== workup.device) {
      onWorkupChange({ name: 'device', value: device?.value })
      handleChangeMethod(undefined)
    }
    onWorkupChange({ name: 'detectors', value: device?.detectors?.map((detector) => detector.value) })
  }

  const handleChangeMethod = (method) => {
    onWorkupChange({ name: 'method', value: method?.value })
    onWorkupChange({ name: 'inject_volume', value: method?.default_inject_volume })
    onWorkupChange({ name: 'mobile_phases', value: method?.mobile_phases?.map(phase => phase.value) })
    onWorkupChange({ name: 'purification_steps', value: method?.steps })
    handleChangeStationaryPhase(method?.stationary_phases?.[0])
    isAutomated && setMethodAnalysisDefaults(method)

    workup.detectors?.length > 0 || onWorkupChange({ name: 'detectors', value: method?.detectors?.map(el => el.value) })
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
    switch (workup.automation_mode) {
      case chmoId.automation_mode.automated:
      case chmoId.automation_mode.semiAutomated:
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
              key={"mobile_phases" + workup.mobile_phases}
              label={"Mobile Phases"}
              options={currentMethodOption?.mobile_phases}
              value={workup.mobile_phases}
              onChange={handleSelectChange('mobile_phases')}
              isMulti
              disabled={isAutomated}
              placeholder={isAutomated ? "Depends on Method" : undefined}
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
          </>)
      case chmoId.automation_mode.manual:
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

