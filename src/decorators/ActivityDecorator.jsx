import MetricsDecorator from './MetricsDecorator';
export default class ActivityDecorator {

  static toTitleCase = (str) => {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

  static cardTitle = (activity) => {
    let title = activity.action_name
    const workup = activity.workup

    if (workup && !!Object.keys(workup).length) {
      switch (activity.action_name) {
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

  static conditionInfo = (metricName, conditionWorkup, selectOptions, precondition) => {
    const equipmentOptions = selectOptions.action_type_equipment['CONDITION'][metricName] || []

    let info
    if (metricName === 'EQUIPMENT') {
      info = this.infoLineEquipment(conditionWorkup.value, equipmentOptions)
    } else {
      info = MetricsDecorator.infoLineValueWithUnit(conditionWorkup.value, conditionWorkup.unit)
      if (!!precondition) {
        let valueDiff = (Math.round((conditionWorkup.value - precondition.value) * 100) / 100).toString()
        if (valueDiff > 0) {
          valueDiff = '+' + valueDiff
        }
        info += ' (' + valueDiff + ')'
      }
    }
    if (metricName === 'MOTION') {
      info = [
        info,
        selectOptions.motion_types.find(option => option.value === conditionWorkup.motion_type).label,
        selectOptions.automation_modes.find(option => option.value === conditionWorkup.motion_mode).label
      ].toString()
    }
    return info;
  }

  static infoLineEquipment = (equipment, equipmentOptions) => {
    return equipment?.map((item) => (
      equipmentOptions.find((option) => option.value === item)?.label
    )).join(', ')
  }

  static addSampleConditionInfoLine = (workup) => {
    return ['add_sample_velocity', 'add_sample_temperature', 'add_sample_pressure'].map((metric) => {
      let metricValue = metric + '_value'
      let metricUnit = metric + '_unit'

      return (workup[metricValue] !== undefined)
        && MetricsDecorator.infoLineValueWithUnit(workup[metricValue], workup[metricUnit])
    }).filter((el) => el).join(', ')
  }
}
