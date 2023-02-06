import React from 'react'

import SamplesDecorator from '../samples/SamplesDecorator'

import { samplevolumeUnitOptions } from '../../constants/dropdownOptions/samplesOptions'
import { conditionUnitOptions, conditionValueRanges } from '../../constants/dropdownOptions/conditionsOptions';
import { motionModeOptions, motionTypeOptions } from '../../constants/dropdownOptions/motionOptions'
import { analysisTypeOptions } from '../../constants/dropdownOptions/analysisTypeOptions'

// import ActionStartStopTimer from './ActionStartStopTimer'

const prettyMilliseconds = require('pretty-ms');

const ActivityInfo = ({ action }) => {
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
        infoTitle = [workup.sample_name, workup.target_amount_value, workup.target_amount_unit].join(' ')
        if(workup.add_sample_speed) {
          infoLines.push(
            workup.add_sample_speed + ' ml/min ' +
            workup.temperature_value ? workup.temperature_value + ' °C ' : '' +
            workup.pressure_value ? workup.pressure_value + ' mbar' : ''
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
        if(workup.sample.target_amount_value) {
          infoLines.push(workup.sample.target_amount_value + ' ' + workup.sample.target_amount_unit)
        }
        infoLines.push(workup.location)
        break;
      case 'EQUIP':
        infoTitle = workup.mount_action
        infoLines.push(workup.equipment)
        break;
      case 'CONDITION':
        if(workup.condition_type) {
          infoTitle =
            (workup.motion_type ? motionTypeOptions.find(option => option.value === workup.motion_type).label + ' ': '') +
            (workup.motion_mode ? motionModeOptions.find(option => option.value === workup.motion_mode).label + ' ': '') +
            (workup.motion_speed ? workup.motion_speed + ' ': '') +
            (workup.motion_unit ? workup.motion_unit : '')
        } else {
          infoTitle =
            workup.temperature_value ? workup.temperature_value + ' ' + conditionUnitOptions['TEMPERATURE'][0].label + ' ': '' +
            workup.pressure_value ? workup.pressure_value + ' ' + conditionUnitOptions['PRESSURE'][0].label + ' ': '' +
            workup.ph_value ? workup.ph_value + ' ' + conditionUnitOptions['PH'][0].label : ''
          infoLines.push(
            (workup.power_start_value || '') +
            (workup.power_is_ramp && ' - ' + workup.power_end_value) +
            (workup.power_start_value && ' W')
          )
        }
        break;
      case 'TRANSFER':
        if(action.sample) {
          infoTitle = action.sample.short_label
        }
        if(workup.transfer_percentage) {
          infoLines.push(workup.transfer_percentage + '%')
        }
        break;
      case 'REMOVE':
        infoTitle = action.sample_names
        if(action.medium) {
          infoLines.push(action.medium.short_label)
        }
        if(action.sample) {
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
        infoTitle = 'Error in Sample Info: Unknown ACTION TYPE:' + action.action_name + '***'
    }
    if (workup.apply_extra_equipment) {
      infoLines.push('Equipment: ' + workup.equipment.join(', '))
    }
    return (
      <>
        {infoImage && SamplesDecorator.sampleSvgFile(infoImage)}
        {(workup.description || infoTitle.length > 0 || infoLines.length > 0) &&
          <div className='activity-info__text_block'>
            {infoTitle.length > 0 &&
              <h6>{infoTitle}</h6>
            }
            {workup.description &&
              <p>{workup.description}</p>
            }
            {infoLines.length > 0 &&
              <p>
                {infoLines.map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < infoLines.length - 1 && <br/>}
                  </span>
                ))}
              </p>
            }
          </div>
        }
      </>
    )
  }

  return (
    <>
      {renderActionInfo()}
    </>
  )
}

export default ActivityInfo
