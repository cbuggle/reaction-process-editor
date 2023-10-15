import { conditionTypes, unitTypes } from '../constants/conditionTypes.jsx';

export default class ConditionTypeDecorator {
  static conditionType = (typeName) => conditionTypes[typeName]

  static label = (typeName) => this.conditionType(typeName).label

  static unitLabel = (unit) => {
    const label = unitTypes[unit] && unitTypes[unit].label
    // The `|| unit` is for PH only which has no unit label but we want to display something
    return label || unit
  }
  // Hardcoded defaultUnit until we implement unit switching.
  static defaultUnit = (typeName) => this.conditionType(typeName).defaultUnit

  // Hardcoded defaultValue in defaultUnit until we implement unit switching.
  static defaultValueInDefaultUnit = (typeName) => this.defaultValueForUnitType(this.defaultUnitType(typeName))

  static defaultUnitType = (typeName) => unitTypes[this.defaultUnit(typeName)]

  // This is actually UnitType decoration but as long as it's just this one we can keep it here.
  static defaultValueForUnitType = (unitType) => unitType.inputRange.default

  static infoLineValueWithUnit(value, unit) {
    // toPrecision() removes float artefacts, dividing by 1 removes trailing `0` (essentially equalling parseFloat)
    value = parseFloat(value).toPrecision(12) / 1
    return value + ' ' + this.unitLabel(unit)
  }
}
