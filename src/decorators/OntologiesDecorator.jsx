export default class OntologiesDecorator {
  static filterByDependencies = (workup, options) => {
    options ||= []

    return options.filter((option) => {
      if (option.dependencies) {
        let meets_dependencies = false
        // console.log("-----------" + option.label)

        Object.entries(option.dependencies).forEach(([dependency_key, dependencies]) => {

          // console.log(dependency_key + " " + dependencies + ": " + dependencies.includes(workup[dependency_key]))
          meets_dependencies ||= dependencies.every(dependency => Array(workup[dependency_key]).includes(dependency))
        })
        return meets_dependencies
      } else {
        return true
      }
    })
  }

}
