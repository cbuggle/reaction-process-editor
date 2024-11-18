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

  const isAutomated = workup.mode_usage === "ChemASAP:0000003"

  const selectOptions = useContext(SelectOptions).FORMS.ANALYSIS.CHROMATOGRAPHY

  const ontologieOptions = selectOptions.ontologies

  console.log(ontologieOptions)

  const currentType = OptionsDecorator.inclusiveOptionForValue(workup.type, ontologieOptions.type)
  const currentSubtype = OptionsDecorator.inclusiveOptionForValue(workup.subtype, ontologieOptions.subtype)
  const currentDevice = OptionsDecorator.inclusiveOptionForValue(workup.device, ontologieOptions.device)
  const currentDetectors = OptionsDecorator.inclusiveOptionsForValues(workup.detectors, ontologieOptions.detector)

  const currentMethod = OptionsDecorator.inclusiveOptionForValue(workup.method, currentDevice?.methods)

  const currentMobilePhasesOptions = isAutomated ? currentMethod?.mobile_phases : currentDevice?.mobile_phases
  const currentStationaryPhasesOptions = isAutomated ? currentMethod?.stationary_phases : currentDevice?.stationary_phases

  const currentMobilePhases = OptionsDecorator.inclusiveOptionsForValues(workup.mobile_phases, currentMobilePhasesOptions)
  const currentStationaryPhase = OptionsDecorator.inclusiveOptionForValue(workup.stationary_phase, currentStationaryPhasesOptions)


  const filterbyDependencies = (currentOption, options) => {

    options.filter((option) => {
      let meets_dependencies = false
      if (option.dependencies) {
        Object.entries(option.dependencies).forEach(([dependency_key, dependencies]) => {
          console.log("Checking dependency")
          console.log(dependency_key + " " + dependencies)
          console.log(workup[dependency_key] + " " + dependencies.includes(workup[dependency_key]))

          // let value = workup[dependency_key]
          meets_dependencies &&= dependencies.includes(workup[dependency_key])
        })
      }
      return meets_dependencies
    })

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
    console.log(workup)
    onWorkupChange({ name: 'type', value: newType.value })
    handleChangeSubType(OptionsDecorator.optionForValue(workup.chromatography_subtype, newType.subtypes))
  }

  const handleChangeSubType = (newSubType) => {
    console.log("change subtype")
    console.log(newSubType)
    onWorkupChange({ name: 'subtype', value: newSubType?.value })
    handleChangeDevice(OptionsDecorator.optionForValue(workup.device, newSubType?.devices))
  }

  const handleChangeAutomation = (automation) => {
    if (automation === "AUTOMATED") {
      handleChangeDevice(currentDevice)
      setMethodAnalysisDefaults(currentMethod)
      setStationaryPhaseDefaults(currentStationaryPhase)
    } else {
      onWorkupChange({ name: 'method', value: undefined })
    }
    onWorkupChange({ name: 'mode_usage', value: automation })
  }

  const handleChangeDevice = (device) => {
    console.log("change device")
    console.log(device)
    onWorkupChange({ name: 'device', value: device?.value })
    // onWorkupChange({ name: 'detectors', value: device?.detectors?.map(option => option.value) })
    // handleChangeMethod(OptionsDecorator.optionForValue(currentMethod?.value, device?.methods))
  }

  const handleChangeMethod = (method) => {
    onWorkupChange({ name: 'method', value: method?.value })
    onWorkupChange({ name: 'VOLUME', value: method?.default_volume })
    onWorkupChange({ name: 'mobile_phases', value: method?.mobile_phases?.map(phase => phase.value) })
    onWorkupChange({ name: 'purification_steps', value: method?.steps })
    handleChangeStationaryPhase(method?.stationary_phases[0])
    isAutomated && setMethodAnalysisDefaults(method)
  }

  const handleChangeMobilePhases = (phases) => {
    onWorkupChange({ name: "mobile_phases", value: phases?.map(phase => phase.value) })
  }

  const handleChangeStationaryPhase = (phase) => {
    onWorkupChange({ name: 'stationary_phase', value: phase?.value })
    isAutomated && setStationaryPhaseDefaults(phase)
  }

  const handleChangeDetectors = (detectors) => {
    onWorkupChange({ name: 'detectors', value: detectors?.map(detector => detector.value) })
    isAutomated && setMethodAnalysisDefaults(currentMethod)
  }

  // const handleNoDetectorSetting = (detectors) => {
  //   // 'NO_DETECTOR' is a special case (setting on some chromatography devices) and needs to be the sole selection.
  //   // It is opposed to and not be mixed up with having none selected at all. cbuggle, 11.6.2024.
  //   if (detectors.length > 1 && detectors.find(detector => detector.value === 'NO_DETECTOR')) {
  //     onWorkupChange({ name: 'detectors', value: ['NO_DETECTOR'] })
  //   } else {
  //     onWorkupChange({ name: 'detectors', value: detectors?.map(detector => detector.value) })
  //   }
  // }

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
    switch (workup.mode_usage) {
      case 'ChemASAP:0000002':
      case 'ChemASAP:0000003':
        return (
          <>
            <FormSection>
              <SelectFormGroup
                label={'Type'}
                name={'chromatography_type'}
                options={OptionsDecorator.inclusiveOptions(currentType, ontologieOptions.type)}
                value={currentType}
                onChange={handleChangeType}
                tooltipName={currentType?.unavailable && 'selection_unavailable'}
              />
              <SelectFormGroup
                key={"subtype" + currentSubtype}
                label={'Sub-Type'}
                name={'chromatography_subtype'}
                options={OptionsDecorator.inclusiveOptions(currentSubtype, ontologieOptions.subtype)}
                value={currentSubtype}
                onChange={handleChangeSubType}
                tooltipName={currentSubtype?.unavailable && 'selection_unavailable'}
              />
              <SelectFormGroup
                key={"device" + currentDevice}
                label={'Device'}
                name={'device'}
                options={OptionsDecorator.inclusiveOptions(currentDevice, ontologieOptions.device)}
                value={currentDevice}
                onChange={handleChangeDevice}
                tooltipName={currentDevice?.unavailable && 'selection_unavailable'}
              />
              <SelectFormGroup
                key={"detectors" + currentDetectors}
                label="Detectors"
                name="detectors"
                options={filterbyDependencies(currentDetectors, ontologieOptions.detector)}
                value={currentDetectors}
                isMulti
                isClearable={false}
                onChange={handleChangeDetectors}
                tooltipName={currentDetectors?.find(det => det.unavailable) && 'selection_unavailable'}
              />
              <SelectFormGroup
                key={"mobile_phases" + currentMobilePhases}
                label="Mobile Phases"
                name="mobile_phases"
                options={OptionsDecorator.inclusiveOptions(currentMobilePhases, currentMobilePhasesOptions)}
                value={currentMobilePhases}
                onChange={handleChangeMobilePhases}
                isMulti
                disabled={isAutomated}
                placeholder={isAutomated ? "Depends on Method" : undefined}
                tooltipName={currentMobilePhases?.find(phase => phase.unavailable) && 'selection_unavailable'}
              />
              {isAutomated &&
                <>
                  <SelectFormGroup
                    key={"currentMethod" + currentMethod}
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
              {isAutomated ?
                <TextInputFormSet
                  label={"Stationary Phase"}
                  value={workup.stationary_phase}
                  disabled
                  typeColor='action' />
                :
                <SelectFormGroup
                  key={"stationary_phase" + currentStationaryPhase}
                  label={"Stationary Phase"}
                  name={"stationary_phase"}
                  options={OptionsDecorator.inclusiveOptions(currentStationaryPhase, currentStationaryPhasesOptions)}
                  value={currentStationaryPhase}
                  onChange={handleChangeStationaryPhase}
                  disabled={isAutomated}
                  tooltipName={currentStationaryPhase?.unavailable && 'selection_unavailable'}
                />
              }
              {hasStationaryPhaseAnalysisType("TEMPERATURE") &&
                <FormSection>
                  <MetricsInputFormGroup
                    label={'Stat. Phase Temp'}
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
            </FormSection>
            <DetectorConditionsFormGroup
              detectors={currentDetectors}
              methodDetectors={currentMethod?.detectors}
              conditions={workup.detector_conditions}
              onChange={handleWorkupChange('detector_conditions')}
              disabled={isAutomated}
            />
          </>)
      case 'ChemASAP:0000001':
        return (
          <FormSection>
            <SelectFormGroup
              label={'Type'}
              name={'chromatography_type'}
              options={OptionsDecorator.inclusiveOptions(currentType, ontologieOptions.type)}
              value={currentType}
              onChange={handleChangeType}
              tooltipName={currentType?.unavailable && 'selection_unavailable'}
            />
            <SelectFormGroup
              key={"subtype" + currentSubtype}
              label={'Sub-Type'}
              name={'chromatography_subtype'}
              options={OptionsDecorator.inclusiveOptions(currentSubtype, ontologieOptions.subtype)}
              value={currentSubtype}
              onChange={handleChangeSubType}
              tooltipName={currentSubtype?.unavailable && 'selection_unavailable'}
            />
            <SelectFormGroup
              label='Material'
              options={ontologieOptions.engineering_material}
              value={OptionsDecorator.optionForValue(workup.engineering_material, ontologieOptions.engineering_material)}
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
        <Label>Mode</Label>
        <ButtonGroupToggle value={workup.mode_usage} options={ontologieOptions.mode_usage}
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

