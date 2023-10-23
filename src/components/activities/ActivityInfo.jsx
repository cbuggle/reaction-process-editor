import React, { useContext } from 'react'

import ActivityDecorator from '../../decorators/ActivityDecorator';
import ConditionTypeDecorator from '../../decorators/ConditionTypeDecorator';
import SamplesDecorator from '../../decorators/SamplesDecorator'

import { SelectOptions } from '../views/Reaction';
import { removeFormConditionTypeNames } from '../../constants/conditionTypes';

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
        infoTitle = ConditionTypeDecorator.infoLineValueWithUnit(workup.target_amount_value, workup.target_amount_unit)
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
          infoLines.push(ConditionTypeDecorator.infoLineValueWithUnit(workup.target_amount_value, workup.target_amount_unit))
        }
        infoLines.push(workup.location)
        break;
      case 'CONDITION':
        infoTitle = ''
        for (let [key, value] of Object.entries(workup)) {
          if (['TEMPERATURE', 'PRESSURE', 'PH', 'IRRADIATION', 'MOTION', 'EQUIPMENT'].includes(key)) {
            infoLines.push(ActivityDecorator.conditionInfo(key, value, selectOptions, preconditions[key]));
          }
        }
        break;
      case 'TRANSFER':
        if (action.sample) {
          infoTitle = action.intermediate_type + ' ' + (action.sample.name || action.sample.short_label)
        }
        if (workup.transfer_percentage) {
          infoLines.push(ConditionTypeDecorator.infoLineValueWithUnit(workup.transfer_percentage, 'PERCENT'))
        }
        infoLines.push("From: " + action.transfer_source_step_name)
        break;
      case 'REMOVE':
        infoTitle = action.sample_names

        for (let [key, value] of Object.entries(workup)) {
          if (removeFormConditionTypeNames.includes(key)) {
            infoLines.push(ActivityDecorator.conditionInfo(key, value, selectOptions));
          }
          // infoLines.push(action.sample.short_label)
        }
        break;
      case 'PURIFY':
        infoTitle = workup.purify_type
        infoLines.push(workup.purify_automation)
        infoLines.push(action.sample_names)
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

    infoLines.push(ActivityDecorator.infoLineEquipment(workup.equipment, selectOptions.equipment))

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
