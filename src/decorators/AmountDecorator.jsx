import {substanceUnitOptions} from "../constants/substanceUnitOptions";

export default class AmountDecorator {
  static validMeasurementTypes = substanceUnitOptions.filter(item => item.type !== 'unspecified')
  static measurementTypeObject = (typeName) => {
    return substanceUnitOptions.find(item => item.type === typeName)
  }
  static unitMeasurementType = (unitValue) => {
    return substanceUnitOptions.find(item => item.units.some(unit => unit.value === unitValue))
  }
  static unitScale = (unitValue) => {
    const measurementType = AmountDecorator.unitMeasurementType(unitValue)
    return measurementType.units.find(item => item.value === unitValue).scale
  }

  static sampleHasMaxAmounts = (sample) => {
    return !!sample?.unit_amounts[AmountDecorator.validMeasurementTypes[0].maxUnit]
  }
}
