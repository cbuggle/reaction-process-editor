import React, { useContext } from 'react'

import ActivityInfoDecorator from '../../decorators/ActivityInfoDecorator';
import MetricsDecorator from '../../decorators/MetricsDecorator';
import SamplesDecorator from '../../decorators/SamplesDecorator'

import { removeFormMetricNames, conditionFormMetricNames } from '../../constants/metrics';
import { SelectOptions } from '../../contexts/SelectOptions';

const ActivityInfo = (
  {
    activity,
    preconditions
  }) => {

  const selectOptions = useContext(SelectOptions)

  const infoLines = []
  let imageSample
  let infoTitle
  const workup = activity.workup

  const renderActivityInfo = () => {
    switch (activity.activity_name) {
      case 'ADD':
        if (workup.acts_as === 'SAMPLE') {
          imageSample = activity.sample
        }
        infoTitle = MetricsDecorator.infoLineAmount(workup.target_amount)
        infoLines.push(ActivityInfoDecorator.addSampleConditionInfoLine(workup))

        if (workup.acts_as === 'SOLVENT') {
          infoLines.push(workup.is_waterfree_solvent ? 'waterfree' : 'not waterfree')
        }
        break;
      case 'SAVE':
        infoTitle = workup.intermediate_type + ' ' + workup.short_label
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
                ActivityInfoDecorator.conditionInfo(metricName, conditionWorkup, preconditions[metricName], selectOptions))
          }
        }
        break;
      case 'TRANSFER':
        if (activity.sample) {
          infoTitle = activity.intermediate_type + ' ' + (activity.sample.name || activity.sample.short_label)
        }

        infoLines.push(MetricsDecorator.infoLineAmountWithPercentage(workup.target_amount))

        infoLines.push("From: " + activity.transfer_source_step_name)
        break;
      case 'REMOVE':
        infoTitle = activity.sample_names

        for (let [key, removeWorkup] of Object.entries(workup)) {
          if (removeFormMetricNames.includes(key)) {
            infoLines.push(ActivityInfoDecorator.conditionInfo(removeWorkup, selectOptions));
          }
        }
        break;
      case 'PURIFY':
        const steps = workup[workup.purify_type.toLowerCase() + '_steps']
        infoTitle = ''
        if (steps) {
          infoTitle += steps.length + ' Step'
          if (steps.length > 1) {
            infoTitle += 's'
          }
          infoTitle += ' '
        }
        // chromatograpy.automation_modes extends regular automation_modes thus can be used without case distinction.
        infoTitle += selectOptions.purify.chromatography.automation_modes.find(option => option.value === workup.automation)?.label
        if (workup.filtration_mode) {
          infoTitle += ' Keep ' + selectOptions.purify.filtration.modes.find(option => option.value === workup.filtration_mode)?.label
        }
        if (steps && selectOptions.materials['SOLVENT']) {
          for (let i = 0; i < steps.length; i++) {
            if (steps.length > 1) {
              infoLines.push('Step ' + (i + 1))
            }
            infoLines.push(ActivityInfoDecorator.filtrationStepInfo(steps[i], selectOptions.materials['SOLVENT']))
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
        infoTitle = 'Error in Sample Info. Unknown ACTION TYPE:' + activity.activity_name + '***'
    }

    infoLines.push(ActivityInfoDecorator.infoLineEquipment(workup.EQUIPMENT, selectOptions.equipment))

    return (
      <>
        <div className='d-flex'>
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
        </div>
      </>
    )
  }

  return renderActivityInfo()
}

export default ActivityInfo
