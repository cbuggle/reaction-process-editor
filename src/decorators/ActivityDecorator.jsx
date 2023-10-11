import { motionTypeOptions, motionModeOptions } from '../constants/dropdownOptions/motionOptions';
import ConditionTypeDecorator from './ConditionTypeDecorator';
export default class ActivityDecorator {

  static toTitleCase = (str) => {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

  static title = (actionName, workup) => {
    let title = actionName

    if (workup && !!Object.keys(workup).length) {
      switch (actionName) {
        case 'PURIFY':
          title = workup.purify_type
          break
        case 'CONDITION':
          title = 'Change Condition'
          break
        case 'ANALYSIS':
          if (workup.analysis_type) {
            title += ' ' + workup.analysis_type
          }
          break
        case 'ADD':
        case 'REMOVE':
          title += ' '
          if (workup.sample_name) {
            title += workup.sample_name
          } else {
            title += workup.acts_as === 'DIVERSE_SOLVENT' ? 'Solvent' : workup.acts_as
          }
          break
        case 'TRANSFER':
        case 'SAVE':
        case 'PAUSE':
        case 'WAIT':
        default:
          break
      }
    }
    return this.toTitleCase(title)
  }

  static conditionInfo = (type, conditionWorkup, equipmentOptions) => {
    let info
    if (type === 'EQUIPMENT') {
      info = this.equipmentInfoLine(conditionWorkup.value, equipmentOptions)
    } else {
      info = (conditionWorkup.value + ' ' + ConditionTypeDecorator.unitLabel(conditionWorkup.unit))
    }
    if (type === 'MOTION') {
      info = [
        info,
        motionTypeOptions.find(option => option.value === conditionWorkup.motion_type).label,
        motionModeOptions.find(option => option.value === conditionWorkup.motion_mode).label
      ].toString()
    }
    return info;
  }

  static equipmentInfoLine = (equipments, equipmentOptions) => {
    return equipments && equipments.map((equipmentValue) => {
      let matchingOption = equipmentOptions.find((option) => option.value === equipmentValue)
      return matchingOption ? matchingOption.label : ''
    }).join(', ')
  }

  static addSampleConditionInfoLine = (workup) => {
    let info = ''
    if (workup.add_sample_velocity_value) {
      info = info.concat(workup.add_sample_velocity_value + ' ')
      info = info.concat(ConditionTypeDecorator.unitLabel(workup.add_sample_velocity_unit) + ', ')
    }
    if (workup.add_sample_temperature_value) {
      info = info.concat(workup.add_sample_temperature_value + ' ')
      info = info.concat(ConditionTypeDecorator.unitLabel(workup.add_sample_temperature_unit) + ', ')
    }
    if (workup.add_sample_pressure_value) {
      info = info.concat(workup.add_sample_pressure_value + ' ')
      info = info.concat(ConditionTypeDecorator.unitLabel(workup.add_sample_pressure_unit) + ' ')
    }
    return info;
  }
}
