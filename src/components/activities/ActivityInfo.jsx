import React from 'react'

import { analysisTypeOptions } from '../../constants/dropdownOptions/analysisTypeOptions'
import ActivityDecorator from '../../decorators/ActivityDecorator';
import ConditionTypeDecorator from '../../decorators/ConditionTypeDecorator';
import SamplesDecorator from '../../decorators/SamplesDecorator'

const ActivityInfo = ({ action, equipmentOptions }) => {
  const infoLines = []
  let infoImage = undefined
  let infoTitle
  const workup = action.workup

  const renderActionInfo = () => {
    switch (action.action_name) {
      case 'ADD':
        if (workup.acts_as === 'SAMPLE') {
          infoImage = action.sample
        }
        infoTitle = [workup.target_amount_value, workup.target_amount_unit].join(' ')
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
        if (workup.target_amount_value) {
          infoLines.push(workup.target_amount_value + ' ' + ConditionTypeDecorator.unitLabel(workup.target_amount_unit))
        }
        infoLines.push(workup.location)
        break;
      case 'CONDITION':
        infoTitle = ''
        for (let [key, value] of Object.entries(workup)) {
          if (['TEMPERATURE', 'PRESSURE', 'PH', 'IRRADIATION', 'MOTION', 'EQUIPMENT'].includes(key)) {
            infoLines.push(ActivityDecorator.conditionInfo(key, value, equipmentOptions));
          }
        }
        break;
      case 'TRANSFER':
        if (action.sample) {
          infoTitle = action.intermediate_type + ' ' + (action.sample.name || action.sample.short_label)
        }
        if (workup.transfer_percentage) {
          infoLines.push(workup.transfer_percentage + '%')
        }
        infoLines.push("From: " + action.source_step_name)
        break;
      case 'REMOVE':
        infoTitle = action.sample_names
        if (action.medium) {
          infoLines.push(action.medium.short_label)
        }
        if (action.sample) {
          infoLines.push(action.sample.short_label)
        }
        break;
      case 'PURIFY':
        infoTitle = workup.purify_type
        infoLines.push(workup.purify_automation)
        infoLines.push(action.sample_names)
        break;
      case 'ANALYSIS':
        infoTitle = analysisTypeOptions.find(option => option.value === workup.analysis_type).label
        break;
      case 'PAUSE':
      case 'WAIT':
        infoTitle = '...'
        break;
      default:
        infoTitle = 'Error in Sample Info. Unknown ACTION TYPE:' + action.action_name + '***'
    }

    infoLines.push(ActivityDecorator.equipmentInfoLine(workup.equipment, equipmentOptions))

    return (
      <>
        {infoImage && SamplesDecorator.sampleSvgImg(infoImage)}
        {(workup.description || infoTitle.length > 0 || infoLines.length > 0) &&
          <div className='activity-info__text-block'>
            {infoTitle.length > 0 &&
              <h6>{infoTitle}</h6>
            }
            {infoLines.length > 0 &&
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

  return renderActionInfo()
}

export default ActivityInfo
