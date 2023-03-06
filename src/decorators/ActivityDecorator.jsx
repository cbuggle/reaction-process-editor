import { motionTypeOptions, motionModeOptions } from '../constants/dropdownOptions/motionOptions';

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

  static conditionInfo = (type, conditionWorkup) => {
    let conditionDetails = []
    if (!!conditionWorkup.value) {
      conditionDetails.push(conditionWorkup.create_label + ': ' + conditionWorkup.value + ' ' + conditionWorkup.unit)
      if (type === 'MOTION') {
        conditionDetails.push(motionTypeOptions.find(option => option.value === conditionWorkup.motion_type).label)
        conditionDetails.push(motionModeOptions.find(option => option.value === conditionWorkup.motion_mode).label)
      }
    } else {
      conditionDetails.push(conditionWorkup.create_label + ': -')
    }
    return conditionDetails.toString()
  }
}
