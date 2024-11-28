export default class OntologiesDecorator {

  static filterByRole = ({ roleName, workup, options }) => {
    // console.log("filterByRole")
    // console.log(name)
    let filteredOptions = options.filter((option) => {
      let dependencies = option.roles[roleName]

      if (!dependencies) { return false }

      let fulfilled = dependencies.find(dependency => {
        let meets_dependencies = true
        Object.entries(dependency).forEach(([dependency_key, requirements]) => {
          // console.log(dependency_key + " " + requirements + ": " + requirements.includes(workup[dependency_key]))
          meets_dependencies &&= requirements.includes(workup[dependency_key])
        })
        return meets_dependencies
      })
      return !!fulfilled
    })
    return filteredOptions
  }

  static find_by = (chmo_id, options) => options.find(option => option.chmo_id === chmo_id)

  static find_all_by = (chmo_ids, options) => options.filter(option => chmo_ids?.includes(option.chmo_id))

  static filterByDependencies = (workup, options) => {
    options ||= []

    return options.filter((option) => {
      if (option.dependencies) {
        let meets_dependencies = false
        console.log("-----------" + option.label)
        console.log(option.dependencies)

        option.dependencies.forEach(dependency => {
          Object.entries(dependency).forEach(([dependency_key, requirements]) => {

            // console.log(dependency_key)
            // console.log(requirements)
            // console.log(requirements.includes(workup[dependency_key]))
            // console.log(dependency_key + " " + requirements + ": " + requirements.includes(workup[dependency_key]))
            meets_dependencies ||= requirements.includes(workup[dependency_key])
          })
        })
        return meets_dependencies
      } else {
        return true
      }
    })
  }

}
