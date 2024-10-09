export default class OptionsDecorator {
  // Avoid issues with numerical vs. string kay by using "==", not "===".
  // eslint-disable-next-line
  static optionForValue = (value, options) => value && options?.find(option => value == option.value)

  static optionsForValues = (values, options) => options?.filter(option => values?.includes(option.value))

  static labelForValue = (value, options) => this.optionForValue(value, options)?.label;

  static optionsArrayToLabel = (values, options) =>
    !!values && values.map((value) => this.labelForValue(value, options)).join(", ");

  static newOption = (value) => {
    return value && { value: value, label: value, unavailable: true }
  }

  static inclusiveOptionForValue = (value, options) =>
    this.optionForValue(value, options) || this.newOption(value)

  static inclusiveOptionsForValues = (values, options) => {
    return values ? Array.from(values).map((value) => this.inclusiveOptionForValue(value, options)) : options
  }

  static inclusiveOptions = (currentOptions, options) => {
    var newOptions = options?.slice() || []
    currentOptions && Array(currentOptions).forEach(currentOption => {
      if (currentOption.value && !this.optionForValue(currentOption.value, options)) {
        currentOption['unavailable'] = true
        newOptions?.push(currentOption)
      }
    })
    return newOptions || []
  }
}
