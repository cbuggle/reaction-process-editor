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

  static title = (activity) => {
    const workup = activity.workup

    switch (activity.action_name) {
      case 'EQUIP':
        return this.toTitleCase(workup.mount_action + ' ' + workup.equipment)
      case 'PURIFY':
        return workup.purify_type
      case 'CONDITION':
        return 'Change Condition'
      case 'ANALYSIS':
        return this.toTitleCase(activity.action_name + ' ' + workup.analysis_type)
      case 'ADD':
      case 'SAVE':
      case 'TRANSFER':
      case 'REMOVE':
        return this.toTitleCase(activity.action_name) + ' ' + activity.sample_names
      case 'PAUSE':
      case 'WAIT':
      default:
        return this.toTitleCase(activity.action_name)
    }
  }

  static conditionInfo = (type, value) => {
    let conditionDetails = []
    if(!!value.value) {
      conditionDetails.push(value.create_label + ': ' + value.value + ' ' + value.unit)
      if (type === 'MOTION') {
        conditionDetails.push(motionTypeOptions.find(option => option.value === value.motion_type).label)
        conditionDetails.push(motionModeOptions.find(option => option.value === value.motion_mode).label)
      }
    } else {
      conditionDetails.push(value.create_label + ': -')
    }
    return conditionDetails.toString()
  }
}
