import { motionTypeOptions, motionModeOptions } from '../constants/dropdownOptions/motionOptions';
import ConditionTypeDecorator from './ConditionTypeDecorator';
import { unitTypes } from '../constants/conditionTypes';
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
          if (workup.sample_name) {
            title += ' ' + workup.sample_name
          }
          break
        case 'PAUSE':
        case 'WAIT':
        default:
          return this.toTitleCase(title)
      }
    }
    return this.toTitleCase(title)
  }

  static conditionInfo = (type, conditionWorkup, equipmentOptions) => {
    let info
    if (type === 'EQUIPMENT') {
      info = conditionWorkup.value.map(value => {
        const matchingOption = equipmentOptions.find(option => option.value === value);
        return matchingOption ? matchingOption.label : null;
      }).toString()
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
