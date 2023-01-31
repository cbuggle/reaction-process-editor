import React from 'react'

import SamplesDecorator from '../samples/SamplesDecorator'

import { samplevolumeUnitOptions } from '../../constants/dropdownOptions/samplesOptions'
import { conditionUnitOptions, conditionValueRanges } from '../../constants/dropdownOptions/conditionsOptions';
import { motionModeOptions, motionTypeOptions } from '../../constants/dropdownOptions/motionOptions'
import { analysisTypeOptions } from '../../constants/dropdownOptions/analysisTypeOptions'

// import ActionStartStopTimer from './ActionStartStopTimer'

const prettyMilliseconds = require('pretty-ms');

const ActivityInfo = ({ action }) => {

  const workup = action.workup

  const renderConditionInfo = () => {
    switch (workup.condition_type) {
      case "MOTION":
        return (
          <>
            <div>{workup.motion_type && motionTypeOptions.find(option => option.value === workup.motion_type).label}
              {' '}
              {workup.motion_mode && motionModeOptions.find(option => option.value === workup.motion_mode).label}
              {' '}
              {workup.motion_speed}
              {' '}
              {workup.motion_unit}</div>
          </>
        )
      default:
        return (
          <>
            <div>{workup.temperature_value && workup.temperature_value + ' ' + conditionUnitOptions['TEMPERATURE'][0].label}</div>
            <div>{workup.pressure_value && workup.pressure_value + ' ' + conditionUnitOptions['PRESSURE'][0].label}</div>
            <div>{workup.ph_value && workup.ph_value + ' ' + conditionUnitOptions['PH'][0].label}</div>

            <div>
              {workup.power_start_value || ''}
              {workup.power_is_ramp && ' - ' + workup.power_end_value}
              {workup.power_start_value && ' W'}
            </div>
          </>
        )
    }
  }

  const renderActionInfo = () => {
    switch (action.action_name) {
      case "ADD":
        return (
          <>
            {workup.acts_as === "SAMPLE" && SamplesDecorator.sampleSvgFile(action.sample)}
            <div>
              {workup.sample_name}
              {' '}
              {workup.target_amount_value}
              {' '}
              {workup.target_amount_unit}
            </div>

            {/* We work with only a single set of units for now */}
            <div>{workup.add_sample_speed && workup.add_sample_speed + ' ml/min'}
              {' '}
              {workup.temperature_value && workup.temperature_value + ' °C'}
              {' '}
              {workup.pressure_value && workup.pressure_value + ' mbar'}</div>
            <div>
              {workup.acts_as === "SOLVENT" &&
                (workup.is_waterfree_solvent ? "waterfree" : "not waterfree")
              }
            </div>
          </>
        )
      case "SAVE":
        return (
          <>
            <div>{workup.sample.intermediate_type}</div>
            <div>{workup.description}</div>
            <div>{workup.sample.name}</div>
            <div>{workup.sample.description}</div>
            <div>{workup.sample.short_label}</div>
            <div>{workup.sample.target_amount_value && workup.sample.target_amount_value + ' ' + workup.sample.target_amount_unit}</div>
            <div>{workup.location}</div>
          </>
        )
      case "EQUIP":
        return (
          <>
            <div>{workup.mount_action}</div>
            <div>{workup.equipment}</div>
          </>
        )
      case "CONDITION":
        return renderConditionInfo()
      case "TRANSFER":
        return (
          <>
            <div>{action.sample && (action.sample.preferred_label || action.sample.short_label)}</div>
            <div>{workup.transfer_percentage || workup.transfer_percentage}%</div>
          </>
        )
      case "REMOVE":
        return (
          <>
            {action.sample_names}
            {action.medium && action.medium.short_label}
            {action.sample && action.sample.short_label}
            {action.medium && action.medium.preferred_label}
            {action.sample && action.sample.preferred_label}
          </>
        )
      case "PURIFY":
        return (
          <>
            <div>{workup.purify_type}</div>
            <div>{workup.purify_automation}</div>
            <div>{action.sample_names}</div>
          </>
        )
      case "ANALYSIS":
        return (
          <>
            <div>
              {analysisTypeOptions.find(option => option.value === workup.analysis_type).label}
            </div>
          </>
        )
      case 'PAUSE':
      case "WAIT":
        return (<div></div>)
      default:
        return (<div>Error in Sample Info: Unknown ACTION TYPE: {action.action_name} ***</div>)
    }
  }

  const renderExtraEquipment = () => {
    if (workup.add_extra_equipment) {
      return (
        <>
          {(workup.equipment || 'noEquip').toString()}
        </>
      )
    }
  }

  return (
    <div>
      <div>{workup.description}</div>
      <div><strong>{renderActionInfo()}</strong></div>
      <div><strong>{renderExtraEquipment()}</strong></div>
    </div>
  )
}

export default ActivityInfo
