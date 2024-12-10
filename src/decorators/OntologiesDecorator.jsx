export default class OntologiesDecorator {

  static filterByDependencies = ({ roleName, workup, options }) => {

    return options.filter((option) => {
      let roles = option.roles[roleName]

      return option.active && roles?.find(role => {
        return Object
          .entries(role)
          .every(([dependency_key, dependencies]) => dependencies.includes(workup[dependency_key]))
      })
    })
  }

  static find_by = (chmo_id, options) => options.find(option => option.chmo_id === chmo_id)
  static findAllByChmoId = (chmo_ids, options) => options.filter(option => chmo_ids?.includes(option.chmo_id))

  static find_all_by = (chmo_ids, options) => options.filter(option => chmo_ids?.includes(option.chmo_id))

}
