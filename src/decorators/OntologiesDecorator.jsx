export default class OntologiesDecorator {
  static filterByDependencies = (workup, options) => {
    options ||= []

    return options.filter((option) => {
      if (option.dependencies) {
        let meets_dependencies = false
        console.log("-----------" + option.label)

        Object.entries(option.dependencies).forEach(([dependency_key, dependencies]) => {
          console.log(dependency_key + " " + dependencies + ": " + dependencies.includes(workup[dependency_key]))
          // let value = workup[dependency_key]
          meets_dependencies ||= dependencies.includes(workup[dependency_key])
        })
        return meets_dependencies
      } else {
        return true
      }
    })
  }

}
