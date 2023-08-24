import React from 'react'

import SamplesDecorator from '../samples/SamplesDecorator'
import { analysisTypeOptions } from '../../constants/dropdownOptions/analysisTypeOptions'
import ActivityDecorator from "../../decorators/ActivityDecorator";

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
        if (workup.add_sample_speed) {
          infoLines.push(
            workup.add_sample_speed + ' ml/min ' +
              workup.add_sample_temperature ? workup.add_sample_temperature + ' °C ' : '' +
                workup.add_sample_pressure ? workup.add_sample_pressure + ' mbar' : ''
          )
        }
        if (workup.acts_as === 'SOLVENT') {
          infoLines.push(workup.is_waterfree_solvent ? 'waterfree' : 'not waterfree')
        }
        break;
      case 'SAVE':
        infoTitle = workup.sample.intermediate_type
        infoLines.push(workup.description)
        infoLines.push(workup.sample.name)
        infoLines.push(workup.sample.description)
        infoLines.push(workup.sample.short_label)
        if (workup.sample.target_amount_value) {
          infoLines.push(workup.sample.target_amount_value + ' ' + workup.sample.target_amount_unit)
        }
        infoLines.push(workup.location)
        break;
      case 'EQUIP':
        infoTitle = workup.mount_action
        infoLines.push(workup.equipment)
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
          infoTitle = action.sample.short_label
        }
        if (workup.transfer_percentage) {
          infoLines.push(workup.transfer_percentage + '%')
        }
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
    if (workup.apply_extra_equipment) {
      infoLines.push('Equipment: ' + workup.equipment.join(', '))
    }
    return (
      <>
        {infoImage && SamplesDecorator.sampleSvgFile(infoImage)}
        {(workup.description || infoTitle.length > 0 || infoLines.length > 0) &&
          <div className='activity-info__text-block'>
            {infoTitle.length > 0 &&
              <h6>{infoTitle}</h6>
            }
            {workup.description &&
              <p className='activity-info__description'>{'Description: ' + workup.description}</p>
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
          </div>
        }
      </>
    )
  }

  return renderActionInfo()
}

export default ActivityInfo
