export default class OptionsDecorator {
  // Avoid issues with numerical vs. string kay by using "==", not "===".
  // eslint-disable-next-line
  static optionForValue = (value, options) => value && options?.find(option => value == option.value)

  static optionsForValues = (values, options) => options?.filter(option => values?.includes(option.value))

  static labelForValue = (value, options) => this.optionForValue(value, options)?.label;

  static optionsArrayToLabel = (values, options) =>
    !!values && values.map((value) => this.labelForValue(value, options)).join(", ");

  static inclusiveOptionForValue = (value, options) =>
    this.optionForValue(value, options) || { value: value, label: value }

  static inclusiveOptionsForValues = (values, options) => {
    return values ? Array.from(values).map((value) => this.inclusiveOptionForValue(value, options)) : options
  }

  static inclusiveOptions = (currentOption, options) => {
    if (currentOption?.value && !this.optionForValue(currentOption.value, options)) {
      options?.push(currentOption)
    }
    return options
  }

}
