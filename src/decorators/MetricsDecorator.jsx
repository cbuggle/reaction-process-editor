import { metrics, unitTypes } from '../constants/metrics.jsx';

export default class MetricsDecorator {
  static metric = (typeName) => metrics[typeName]

  static label = (typeName) => this.metric(typeName).label

  static unitLabel = (unit) => {
    const label = unitTypes[unit] && unitTypes[unit].label
    // The `|| unit` is for PH only which has no unit label but we want to display something
    return label || unit
  }
  // Hardcoded defaultUnit until we implement unit switching.
  static defaultUnit = (typeName) => this.metric(typeName).defaultUnit

  // Hardcoded defaultValue in defaultUnit until we implement unit switching.
  static defaultValueInDefaultUnit = (typeName) => this.defaultValueForUnitType(this.defaultUnitType(typeName))

  static defaultUnitType = (typeName) => unitTypes[this.defaultUnit(typeName)]

  static defaultValueForUnitType = (unitType) => unitType.inputRange.default

  static infoLineValueWithUnit(value, unit) {
    if (value > 0) {
      value = parseFloat(value).toPrecision(12) / 1
      return value + ' ' + this.unitLabel(unit)
    }
  }
}
