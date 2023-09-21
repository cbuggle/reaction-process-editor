import { conditionTypes, unitTypes } from '../constants/conditionTypes.jsx';

export default class ConditionTypeDecorator {
  static conditionType = (typeName) => {
    return conditionTypes[typeName]
  }
  static label = (typeName) => {
    return this.conditionType(typeName).label
  }
  static unitLabel = (unit) => {
    return unitTypes[unit].label
  }
  // Hardcoded defaultUnit until we implement unit switching.
  static defaultUnit = (typeName) => {
    return this.conditionType(typeName).defaultUnit
  }
  // Hardcoded defaultValue in defaultUnit until we implement unit switching.
  static defaultValueInDefaultUnit = (typeName) => {
    return this.defaultValue(this.defaultUnit(typeName))
  }
  static defaultUnitType = (typeName) => {
    return unitTypes[this.defaultUnit(typeName)]
  }
  // This is actually UnitType decoration but as long as it's just 1
  static defaultValue = (unit) => {
    return unitTypes[unit].inputRange.default
  }
}
