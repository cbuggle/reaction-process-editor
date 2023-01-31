import { motionTypeOptions, motionModeOptions } from '../constants/dropdownOptions/motionOptions';
import { conditionUnitOptions } from '../constants/dropdownOptions/conditionsOptions';

export default class ActivityDecorator {

  static toTitleCase = (str) => {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

  static numberedTitle = (activity) => {
    return this.numberPrefix(activity) + ' ' + this.title(activity)
  }

  static numberPrefix = (activity) => {
    switch (activity.action_name) {
      case 'CONDITION':
        return activity.activity_number + ">"
      case 'CONDITION_END':
        return '<' + activity.activity_number
      default:
        return activity.activity_number
    }
  }

  static title = (activity) => {
    return this.toTitleCase(this.rawTitle(activity) || 'NONE')
  }

  static rawTitle = (activity) => {
    const workup = activity.workup

    switch (activity.action_name) {
      case 'EQUIP':
        return workup.mount_action + ' ' + workup.equipment
      case 'PURIFY':
        return workup.purify_type
      case 'CONDITION':
        return this.conditionTitle(activity)
      case 'CONDITION_END':
        return ' '
      case 'ANALYSIS':
        return activity.action_name + ' ' + workup.analysis_type
      case 'ADD':
      case 'SAVE':
      case 'TRANSFER':
      case 'REMOVE':
        return activity.action_name + ' ' + activity.sample_names
      case 'PAUSE':
      case 'WAIT':
      default:
        return activity.action_name
    }
  }

  static conditionTitle = (activity) => {
    const workup = activity.workup

    switch (workup.condition_type) {
      case 'MOTION':
        return ' ' + motionTypeOptions.find(option => option.value === workup.motion_type).label + ' ' + workup.motion_speed + ' ' + workup.motion_unit
      default:
        return this.conditionInfo(activity)
    }
  }

  static conditionInfo = (activity) => {
    const workup = activity.workup

    let conditionDetails = []
    switch (workup.condition_type) {
      case 'MOTION':
        conditionDetails.push(motionTypeOptions.find(option => option.value === workup.motion_type).label)
        conditionDetails.push(motionModeOptions.find(option => option.value === workup.motion_mode).label)
        conditionDetails.push(workup.motion_speed)
        conditionDetails.push(workup.motion_unit)
        break;
      default:
        if (workup.temperature_value) {
          conditionDetails.push(workup.temperature_value + ' ' + conditionUnitOptions['TEMPERATURE'][0].label)
        }
        if (workup.pressure_value) {
          conditionDetails.push(workup.pressure_value + ' ' + conditionUnitOptions['PRESSURE'][0].label)
        }
        if (workup.ph_value) {
          conditionDetails.push(workup.ph_value + ' ' + conditionUnitOptions['PH'][0].label)
        }
    }
    return conditionDetails.toString()
  }
}
