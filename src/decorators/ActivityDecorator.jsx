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
    let title = activity.action_name

    switch (activity.action_name) {
      case 'EQUIP':
        title = workup.mount_action + ' '
        title += workup.equipment ? workup.equipment : 'Equipment'
        break
      case 'PURIFY':
        title = workup.purify_type
        break
      case 'CONDITION':
        title = 'Change Condition'
        break
      case 'ANALYSIS':
        if (workup.analysis_type) {
          title +=  ' ' + workup.analysis_type
        }
        break
      case 'ADD':
      case 'REMOVE':
        title +=  ' '
        if (workup.sample_names) {
          title +=  workup.sample_names
        } else {
          title += workup.acts_as === 'DIVERSE_SOLVENT' ? 'Solvent' : workup.acts_as
        }
        break
      case 'TRANSFER':
      case 'SAVE':
        if (workup.sample_names) {
          title +=  ' ' + workup.sample_names
        }
        break
      case 'PAUSE':
      case 'WAIT':
      default:
        return this.toTitleCase(title)
    }
    return this.toTitleCase(title)
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
