import React, { useContext } from 'react'

import ActivityDecorator from '../../decorators/ActivityDecorator';
import MetricsDecorator from '../../decorators/MetricsDecorator';
import SamplesDecorator from '../../decorators/SamplesDecorator'

import { removeFormMetricNames, conditionFormMetricNames } from '../../constants/metrics';
import { SelectOptions } from '../../contexts/SelectOptions';

const ActivityInfo = (
  {
    action,
    preconditions
  }) => {

  const selectOptions = useContext(SelectOptions)

  const infoLines = []
  let imageSample
  let infoTitle
  const workup = action.workup

  const renderActivityInfo = () => {
    switch (action.action_name) {
      case 'ADD':
        if (workup.acts_as === 'SAMPLE') {
          imageSample = action.sample
        }
        infoTitle = MetricsDecorator.infoLineAmount(workup.target_amount)
        infoLines.push(ActivityDecorator.addSampleConditionInfoLine(workup))

        if (workup.acts_as === 'SOLVENT') {
          infoLines.push(workup.is_waterfree_solvent ? 'waterfree' : 'not waterfree')
        }
        break;
      case 'SAVE':
        infoTitle = (workup.intermediate_type || '- Obsolete Data. Please edit & resave - ') + ' ' + workup.short_label
        infoLines.push(workup.name)
        infoLines.push(workup.short_label)
        infoLines.push(workup.description)
        if (workup.target_amount) {
          infoLines.push(MetricsDecorator.infoLineAmount(workup.target_amount))
        }
        infoLines.push(workup.location)
        break;
      case 'CONDITION':
        infoTitle = ''
        for (let [metricName, conditionWorkup] of Object.entries(workup)) {
          if (conditionFormMetricNames.includes(metricName)) {
            // The EQUIPMENT will be appended globally for all Activity type; we avoid duplicating it.
            metricName !== 'EQUIPMENT' &&
              infoLines.push(
                ActivityDecorator.conditionInfo(metricName, conditionWorkup, preconditions[metricName], selectOptions))
          }
        }
        break;
      case 'TRANSFER':
        if (action.sample) {
          infoTitle = action.intermediate_type + ' ' + (action.sample.name || action.sample.short_label)
        }

        infoLines.push(MetricsDecorator.infoLineAmountWithPercentage(workup.target_amount))

        infoLines.push("From: " + action.transfer_source_step_name)
        break;
      case 'REMOVE':
        infoTitle = action.sample_names

        for (let [key, removeWorkup] of Object.entries(workup)) {
          if (removeFormMetricNames.includes(key)) {
            infoLines.push(ActivityDecorator.conditionInfo(removeWorkup, selectOptions));
          }
        }
        break;
      case 'PURIFY':
        const steps = workup.filtration_steps
        infoTitle = ''
        if (steps) {
          infoTitle += workup.filtration_steps.length + ' Steps '
        }
        infoTitle += selectOptions.automation_modes.find(option => option.value === workup.automation)?.label
        if (workup.filtration_mode) {
          infoTitle += ' Keep ' + selectOptions.purify.filtration_modes.find(option => option.value === workup.filtration_mode)?.label
        }
        if (steps && selectOptions.materials['SOLVENT']) {
          for (let i = 0; i < steps.length; i++) {
            infoLines.push('Step ' + (i + 1))
            infoLines.push(ActivityDecorator.filtrationStepInfo(steps[i], selectOptions.materials['SOLVENT']))
          }
        }
        break;
      case 'ANALYSIS':
        infoTitle = selectOptions.analysis_types.find(option => option.value === workup.analysis_type).label
        break;
      case 'PAUSE':
      case 'WAIT':
        infoTitle = '...'
        break;
      default:
        infoTitle = 'Error in Sample Info. Unknown ACTION TYPE:' + action.action_name + '***'
    }

    infoLines.push(ActivityDecorator.infoLineEquipment(workup.EQUIPMENT, selectOptions.equipment))

    return (
      <>
        {SamplesDecorator.sampleSvgImg(imageSample)}
        {(workup.description || infoTitle?.length > 0 || infoLines?.length > 0) &&
          <div className='activity-info__text-block'>
            {infoTitle?.length > 0 &&
              <h6>{infoTitle}</h6>
            }
            {infoLines?.length > 0 &&
              <p>
                {infoLines.map((line, index) => (
                  <span key={index} className='procedure-card__info-line'>
                    {line}
                  </span>
                ))}
              </p>
            }
            {workup.description &&
              <p className='activity-info__description'>{workup.description}</p>
            }
          </div>
        }
      </>
    )
  }

  return renderActivityInfo()
}

export default ActivityInfo
